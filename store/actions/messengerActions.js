//Self not error handling for the msg
// disply the msg but with a resend button

import axios from "axios";
import * as actionTypes from "./actionTypes";

instance = axios.create({
  baseURL: "https://intercom-react.glitch.me/"
});

// send the id of the user
// will return the user object
export const connect_user_to_intercom = (user_id, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSENGER,
      payload: true
    });
    instance
      .get(`get-user/${user_id}`)
      .then(res => {
        console.log("get_user", res.data);

        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_CURRENT_MESSENGER,
          payload: data
        });
      })
      .then(() => navigation.push("Chat"))
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

export const create_user_on_intercom = (user, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSENGER,
      payload: true
    });
    instance
      .post("/create-user", user)
      .then(response => {
        return dispatch({
          type: actionTypes.SET_CURRENT_MESSENGER,
          payload: response.data
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
    // set_as_seen();

    // dispatch(() => set_as_seen());
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
        return dispatch({
          type: actionTypes.SET_CONVERSATION,
          payload: data
        });
      })
      .then(() => {
        dispatch(set_as_seen());
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
export const start_conversation = (message, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_MESSAGE,
      payload: true
    });
    instance
      .post("/start-conversation", message)
      .then(response => {
        return dispatch({
          type: actionTypes.ADD_MESSAGE,
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
        user_id: getState().msg.user.user_id,
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
    dispatch(set_as_seen());

    return dispatch({
      type: actionTypes.ADD_MESSAGE,
      payload: message
    });
  };
};

// export const set_as_seen
export const set_as_seen = () => {
  console.log("set_as_seen log");

  return (dispatch, getState) => {
    console.log("log please???");

    console.log("????", getState().msg.conversation_id);

    instance
      .get(`read/${getState().msg.conversation_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AS_SEEN,
          payload: data
        });
      })
      .catch(err => {
        console.log("set_as_seen err", err.message || err.response);
      });
  };
};

// call when the user closes the msg screen ?
export const update_last_seen = (user_id, navigation) => {
  return dispatch => {
    instance
      .get(`update-last-seen/${user_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
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
    socket.emit("subscribe", getState().msg.user.user_id);
    return dispatch({
      type: actionTypes.SET_AS_SUBSCRIBED
    });
  };
};
