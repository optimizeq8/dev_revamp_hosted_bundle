//Self not error handling for the msg
// disply the msg but with a resend button

import axios from "axios";
import * as actionTypes from "./actionTypes";
import isNull from "lodash/isNull";

instance = axios.create({
  baseURL: "https://www.optimizeapp.io/"
});

// send the id of the user
// will return the user object
export const connect_user_to_intercom = user_id => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSENGER,
      payload: true
    });
    instance
      .get(`get-user/${user_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.code === "not_found") {
          var user = getState().auth.userInfo;
          var bus = getState().account.mainBusiness;
          var body = {
            user_id: user.userid,
            email: user.email,
            phone: user.mobile,
            name: `${user.firstname} ${user.lastname}`,
            companies: [
              {
                company_id: bus.businessid,
                name: bus.businessname
              }
            ]
          };
          dispatch(create_user_on_intercom(body));
        } else {
          dispatch(get_conversation(user_id));
          return dispatch({
            type: actionTypes.SET_CURRENT_MESSENGER,
            payload: data
          });
        }
      })
      .catch(err => {
        console.log("get_user", err.message || err.response);
      });
  };
};

// Signup user on intercom database
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

export const create_user_on_intercom = user => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSENGER,
      payload: true
    });
    instance
      .post("/create-user", user)
      .then(res => {
        console.log("created", res.data);
        dispatch(get_conversation(res.data.user_id));

        return dispatch({
          type: actionTypes.SET_CURRENT_MESSENGER,
          payload: res.data
        });
      })
      .catch(err => {
        console.log("create_user_on_intercom", err.message || err.response);
      });
  };
};

// get conversation array with messages

export const get_conversation = user_id => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_CON,
      payload: true
    });
    instance
      .get(`get-conversation/${user_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (isNull(data.conversation_id)) {
          return dispatch({
            type: actionTypes.SET_CONVERSATION_AS_OPEN,
            payload: false
          });
        } else {
          return dispatch({
            type: actionTypes.SET_CONVERSATION,
            payload: data
          });
        }
      })
      .then(() => {
        dispatch(get_conversatusion_read_status());
        // if (!isNull(getState().messenger.conversation_id))
        //   dispatch(set_as_seen());
      })
      .catch(err => {
        console.log("get_conversation", err.message || err.response);
      });
  };
};

//start a conversation from user side
//API only called once if there is
//no conversations prevously
// {
//   "from": {
//     "type": "user",
//     "user_id": "45"
//   },
//   "body": "Hey"
// }
export const start_conversation = message => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSAGE,
      payload: true
    });

    instance
      .post("/start-conversation", {
        from: {
          type: "user",
          user_id: getState().auth.userInfo.userid
        },
        body: message
      })
      .then(response => {
        return dispatch({
          type: actionTypes.SET_CONVERSATION,
          payload: response.data
        });
      })
      .catch(err => {
        console.log("start_conversation", err.message || err.response);
      });
  };
};

// reply to the conversation
// {
// "user_id": "5",
// "body": "GREAT IT WORKS",
// "message_type": "comment",
// "type": "user"
// }

export const reply = message => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSAGE,
      payload: true
    });
    instance
      .post("/reply", {
        user_id: getState().auth.userInfo.userid,
        body: message,
        message_type: "comment",
        type: "user"
      })
      .then(response => {
        return dispatch({
          type: actionTypes.ADD_MESSAGE,
          payload: response.data
        });
      })
      .catch(err => {
        console.log("reply", err.message || err.response);
      });
  };
};

//recived admin response
export const admin_response = message => {
  return (dispatch, getState) => {
    // dispatch(set_as_seen(true));

    return dispatch({
      type: actionTypes.ADD_MESSAGE,
      payload: message
    });
  };
};

//get status if conversation was seen

export const get_conversatusion_read_status = () => {
  return (dispatch, getState) => {
    axios
      .get("https://optimizekwtestingserver.com/optimize/public/chatLink")
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log("data", data.intercom_chat_link);
        console.log(
          "an",
          getState().messenger.messages.length === data.intercom_chat_link
        );

        return dispatch({
          type: actionTypes.SET_CONVERSATION_STATUS,
          payload:
            getState().messenger.messages.length === data.intercom_chat_link
        });
      })
      .catch(err => {
        console.log(
          "get_conversatusion_read_status err",
          err.message || err.response
        );
      });
  };
};

export const update_conversatusion_read_status = () => {
  return (dispatch, getState) => {
    axios
      .post("https://optimizekwtestingserver.com/optimize/public/chatLink", {
        intercom_chat_link: getState().messenger.messages.length
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log("data", data);

        return dispatch({
          type: actionTypes.SET_CONVERSATION_STATUS,
          payload: true
          // getState().messenger.messages.length === data.intercom_chat_link
        });
      })
      .catch(err => {
        console.log(
          "update_conversatusion_read_status err",
          err.message || err.response
        );
      });
  };
};

// export const set_as_seen
export const set_as_seen = check => {
  //   console.log("set_as_seen log");
  return (dispatch, getState) => {
    // console.log("log please???");
    // console.log("????", getState().messenger.conversation_id);
    if (check)
      instance
        .get(`read/${getState().messenger.conversation_id}`)
        .then(res => {
          return res.data;
        })
        .then(data => {
          return dispatch({
            type: actionTypes.SET_AS_SEEN,
            payload: check
          });
        })
        .catch(err => {
          console.log("set_as_seen err", err.message || err.response);
        });
    else {
      return dispatch({
        type: actionTypes.SET_AS_SEEN,
        payload: false
      });
    }
  };
};

// call when the user closes the msg screen ?
export const update_last_seen = () => {
  return (dispatch, getState) => {
    instance
      .get(`update-last-seen/${getState().auth.userInfo.userid}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log("last seen", data);

        return dispatch({
          type: actionTypes.UPDATE_LAST_SEEN,
          payload: data
        });
      })
      .catch(err => {
        console.log("update_last_seen", err.message || err.response);
      });
  };
};

export const subscribe = socket => {
  return (dispatch, getState) => {
    socket.emit("subscribe", getState().auth.userInfo.userid);
    return dispatch({
      type: actionTypes.SET_AS_SUBSCRIBED
    });
  };
};
