//Self not error handling for the msg
// disply the msg but with a resend button

import axios from "axios";
import * as actionTypes from "./actionTypes";
import isNull from "lodash/isNull";
import { showMessage } from "react-native-flash-message";
import { send_push_notification } from "./loginActions";
import { update_app_status_chat_notification } from "./genericActions";

NodeBackendURL = () =>
  axios.create({
    baseURL: "https://www.optimizeapp.io/",
  });

/**
 * sends a request to get user object from intercom
 * if it doesn't find one it makes a request to create another
 *
 * @method
 * @param {string} user_id
 * @returns {Function} dispatch action with user information if found
 */
export const connect_user_to_intercom = (user_id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: true,
    });
    NodeBackendURL()
      .get(`get-user/${user_id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.code === "not_found") {
          return dispatch(create_user_on_intercom());
        } else {
          dispatch(get_conversation(user_id));
          return dispatch({
            type: actionTypes.SET_CURRENT_MESSENGER,
            payload: data,
          });
        }
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });

        return dispatch({
          type: actionTypes.ERROR_SET_CURRENT_MESSENGER,
        });
      });
  };
};

// {
//     "user_id": "5",
//     "email": "heedll@oo.co",
//     "phone": "00971569028443",
//     "name": "HEloo SiR",
//         "companies": [
//             {
//                 "company_id": "3",
//                 "name": "businiess name"
//             }
//         ]
// }

/**
 * Creates a user on intercom
 *
 * @method
 * @param {object} user
 * @param {string} user.user_id
 * @param {string} user.email
 * @param {string} user.phone
 * @param {string} user.name includes both the first and last name in one string
 * @param {array} user.companies includes objects of company id and name
 * @returns {Function} dispatch action with user information
 */
export const create_user_on_intercom = () => {
  return (dispatch, getState) => {
    var user = getState().auth.userInfo;
    var bus = getState().account.mainBusiness;
    var body = {
      user_id: user.userid,
      email: user.email,
      phone: user.mobile,
      name: `${user.firstname} ${user.lastname}`,
    };

    body["companies"] = getState().account.businessAccounts.map((bus) => {
      return { company_id: bus.businessid, name: bus.businessname };
    });

    dispatch({
      type: actionTypes.SET_LOADING_MESSENGER,
      payload: true,
    });

    NodeBackendURL()
      .post("/create-user", body)
      .then((res) => {
        dispatch(get_conversation(res.data.user_id));
        return dispatch({
          type: actionTypes.SET_CURRENT_MESSENGER,
          payload: res.data,
        });
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

/**
 * Gets conversation array with messages
 *
 * @method
 * @param {string} user_id
 * @returns {Function} if the conversation id exists returns a dispatch action with the messages array
 */
export const get_conversation = (user_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_CON,
      payload: true,
    });
    NodeBackendURL()
      .get(`get-conversation/${user_id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (isNull(data.conversation_id)) {
          return dispatch({
            type: actionTypes.SET_CONVERSATION_AS_OPEN,
            payload: false,
          });
        } else {

          return dispatch({
            type: actionTypes.SET_CONVERSATION,
            payload: data,
          });
        }
      })
      .then(() => {
        dispatch(get_conversatusion_read_status());
        dispatch(update_app_status_chat_notification(true));
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });

        return dispatch({
          type: actionTypes.ERROR_SET_CONVERSATION,
        });
      });
  };
};

// {
//   "from": {
//     "type": "user",
//     "user_id": "45"
//   },
//   "body": "Hey"
// }

/**
 * start a conversation from user side
 * This API is only called once if there is no conversations prevously
 *
 * @method
 * @param {string} message
 * @returns {Function}  dispatch with the conversation part of the same message from the axois request
 */
export const start_conversation = (message, callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSAGE,
      payload: true,
    });

    NodeBackendURL()
      .post("/start-conversation", {
        from: {
          type: "user",
          user_id: getState().auth.userInfo.userid,
        },
        body: message,
      })
      .then((response) => {
        return dispatch({
          type: actionTypes.SET_CONVERSATION,
          payload: response.data,
        });
      })
      .then(() => dispatch(callback()))
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

// {
// "user_id": "5",
// "body": "GREAT IT WORKS",
// "message_type": "comment",
// "type": "user"
// }

/**
 * reply to the existing conversation
 *
 * @method
 * @param {string} message
 * @param {array} upload has the links of the uploaded images
 * @returns {Function} dispatch witht the conversation part of the same message from the axios request
 */
export const reply = (message, upload) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSAGE,
      payload: true,
    });
    NodeBackendURL()
      .post("/reply", {
        user_id: getState().auth.userInfo.userid,
        body: message,
        message_type: "comment",
        type: "user",
        attachment_urls: upload,
      })
      .then((response) => {
        dispatch(send_push_notification());
        return dispatch({
          type: actionTypes.ADD_MESSAGE,
          payload: response.data,
        });
      })
      .then(() => dispatch(update_conversatusion_read_status()))
      .catch((err) => {
        dispatch({
          type: actionTypes.SET_LOADING_MESSAGE,
          payload: false,
        });
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

/**
 * recived admin response from socket
 *
 * @method
 * @param {object} message
 * @returns {Function} dispatch with the conversation object of the admin
 */
export const admin_response = (message) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: actionTypes.ADD_MESSAGE,
      payload: message,
    });

    dispatch(update_conversatusion_read_status());
  };
};

/**
 * Gets the last value of the message array size
 * to compare it with the current array length
 *
 * @method
 * @returns {Function} dispatch action with a boolean to diplay notifications icon according
 */
export const get_conversatusion_read_status = () => {
  return (dispatch, getState) => {
    axios
      .get(
        // getState().login.admin
        //   ?
        "https://optimizekwtestingserver.com/optimize/public/chatLink"
        // : "https://www.optimizeapp.com/optimize/public/chatLink"
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_CONVERSATION_STATUS,
          payload:
getState().messenger.messages.length - data.intercom_chat_link,
        });
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

/**
 * updates the database with current size of the message array
 *
 * @method
 * @returns {Function} dispatch action with a true boolean to set off the notification after update
 */
export const update_conversatusion_read_status = () => {
  return (dispatch, getState) => {
    axios
      .post(
        // getState().login.admin
        //   ?
        "https://optimizekwtestingserver.com/optimize/public/chatLink",
        //   : "https://www.optimizeapp.com/optimize/public/chatLink",

        {
          intercom_chat_link: getState().messenger.messages.length,
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_CONVERSATION_STATUS,
         payload: {	
            unread_converstaion: 0,
          }
        });
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

/**
 * update the conversation as read from the user's side
 *
 * @method
 * @param {boolean} check
 * @returns {Function} dispatch action with the check boolean
 */
export const set_as_seen = (check) => {
  return (dispatch, getState) => {
    if (check)
      NodeBackendURL()
        .get(`read/${getState().messenger.conversation_id}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          return dispatch({
            type: actionTypes.SET_AS_SEEN,
            payload: check,
          });
        })
        .catch((err) => {
          showMessage({
            message:
              err.message ||
              err.response ||
              "Something went wrong, please try again.",
            type: "danger",
            position: "top",
          });
        });
    else {
      return dispatch({
        type: actionTypes.SET_AS_SEEN,
        payload: false,
      });
    }
  };
};

/**
 * call when the user closes the msg screen to update their last seen
 *
 * @method
 * @returns {Function} dispatch action with the a data object
 */
export const update_last_seen = () => {
  return (dispatch, getState) => {
    NodeBackendURL()
      .get(`update-last-seen/${getState().auth.userInfo.userid}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.UPDATE_LAST_SEEN,
          payload: data,
        });
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

/**
 * upload an image attechment
 *
 * @method
 * @param {FormData} media
 * @returns {Function} dispatch action to send a reply with the image link
 */
export const upload_media = (media) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSAGE,
      payload: true,
    });
    axios
      .post(
        getState().login.admin
          ? "https://optimizekwtestingserver.com/optimize/public/uploadChatMedia"
          : "https://www.optimizeapp.com/optimize/public/uploadChatMedia",

        media
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.success) {
          if (getState().messenger.open_conversation) {
            return dispatch(reply(null, [data.media_link]));
          } else {
            dispatch(
              start_conversation("Sending an attachment", () =>
                reply(null, [data.media_link])
              )
            );
          }
        } else {
          showMessage({
            message: data.message || "Something went wrong, please try again.",
            type: "danger",
            position: "top",
          });
          return dispatch({
            type: actionTypes.SET_LOADING_MESSAGE,
            payload: false,
          });
        }
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.SET_LOADING_MESSAGE,
          payload: false,
        });
      });
  };
};

/**
 * subscribe the user to the chat room to recieve admin replies
 *
 * @method
 * @param {socket} socket
 * @returns {Function} dispatch action for subscription
 */
export const subscribe = (socket) => {
  return (dispatch, getState) => {
    socket.emit("subscribe", getState().auth.userInfo.userid);
    return dispatch({
      type: actionTypes.SET_AS_SUBSCRIBED,
    });
  };
};

// {
//     "user_id": "5",
//     "email": "heedll@oo.co",
//     "phone": "00971569028443",
//     "name": "HEloo SiR",
//         "companies": [
//             {
//                 "company_id": "3",
//                 "name": "businiess name"
//             }
//         ]
// }

/**
 * Creates a user on intercom
 *
 * @method
 * @param {object} user
 * @param {string} user.user_id
 * @param {string} user.email
 * @param {string} user.phone
 * @param {string} user.name includes both the first and last name in one string
 * @param {array} user.companies includes objects of company id and name
 * @returns {Function} dispatch action with user information
 */
export const update_user_on_intercom = (body) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSENGER,
      payload: true,
    });
    NodeBackendURL()
      .post("/update-user", body)
      .then((res) => {
        dispatch(get_conversation(res.data.user_id));
        return dispatch({
          type: actionTypes.SET_CURRENT_MESSENGER,
          payload: res.data,
        });
      })
      .catch((err) => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};
