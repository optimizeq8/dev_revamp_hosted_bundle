import * as actionTypes from "../actions/actionTypes";
import reverse from "lodash/reverse";
const initialState = {
  user: null,
  conversation_id: "",
  seen: false,
  last_seen: null,
  loading: false,
  loading_msg: false,
  loading_con: false,
  failed_msg: [],
  messages: [],
  subscribed: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_MESSENGER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case actionTypes.ADD_MESSAGE:
      // console.log("message add", action.payload);
      const messageArr = state.messages;
      messageArr.unshift(action.payload);
      console.log("messageArr len", messageArr.length);
      return {
        ...state,
        messages: [...messageArr],
        loading_msg: false
      };
    case actionTypes.SET_CONVERSATION:
      // console.log("con: ", action.payload);
      const reverseMessages = reverse(action.payload.messages);
      return {
        ...state,
        conversation_id: action.payload.conversation_id,
        messages: reverseMessages,
        loading_con: false
      };
    case actionTypes.SET_AS_SEEN:
      return {
        ...state,
        seen: true
      };
    case actionTypes.SET_LAST_SEEN:
      return {
        ...state,
        last_seen: action.payload
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_LOADING_MESSAGE:
      return {
        ...state,
        loading_msg: action.payload
      };
    case actionTypes.SET_LOADING_CON:
      return {
        ...state,
        loading_con: action.payload
      };
    case actionTypes.SET_UNSEEN_YET:
      return {
        ...state,
        seen: false
      };
    case actionTypes.SET_AS_SUBSCRIBED:
      return {
        ...state,
        subscribed: true
      };
    default:
      return state;
  }
};

export default reducer;
