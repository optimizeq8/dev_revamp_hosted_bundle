import * as actionTypes from "../actions/actionTypes";

const initialState = {
  wallet: 0,
  transactionList: [],
  filteredTransactions: [],
  transactionValue: "",
  tranStartSearch: "",
  tranEndSearch: "",
  wallet_amount_applied: null,
  wallet_balance_amount: null,
  campaign_balance_amount: 0,
  campaign_balance_amount_kwd: 0,
  walletUsed: false,
  walletAmountInKwd: 0,
  message: "",
  payment_data: null,
  loading: false,
  errorTransactionList: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTION_LIST:
      return {
        ...state,
        transactionList: action.payload.data,
        filteredTransactions: action.payload.data,
        loading: false,
        message: action.payload.message
      };
    case actionTypes.ERROR_SET_TRANSACTION_LIST:
      return {
        ...state,
        loading: false,
        errorTransactionList: true
      };
    case actionTypes.SET_WALLET_AMOUNT:
      return {
        ...state,
        wallet: action.payload.walletamount,
        loading: false,
        message: action.payload.message
      };
    case actionTypes.ERROR_SET_WALLET_AMOUNT:
      return {
        ...state,
        loading: false
      };
    case actionTypes.ADD_WALLET_AMOUNT:
      return {
        ...state,
        payment_data: action.payload,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_GET_WALLET_AMOUNT_IN_KWD:
      return {
        ...state,

        loading: false
      };
    case actionTypes.GET_WALLET_AMOUNT_IN_KWD:
      return {
        ...state,
        walletAmountInKwd: action.payload.kdamount,
        loading: false
      };
    case actionTypes.ERROR_ADD_WALLET_AMOUNT:
      return {
        ...state,
        loading: false
      };
    case actionTypes.USE_WALLET_AMOUNT:
      return {
        ...state,
        wallet_amount_applied: action.payload.wallet_amount_applied,
        wallet_balance_amount: action.payload.wallet_balance_amount,
        campaign_balance_amount: action.payload.campaign_balance_amount,
        campaign_balance_amount_kwd: action.payload.campaign_balance_amount_kwd,
        walletUsed: action.payload.success,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_USE_WALLET_AMOUNT:
      return {
        ...state,
        loading: false
      };
    case actionTypes.REMOVE_WALLET_AMOUNT:
      return {
        ...state,
        message: action.payload.message,
        walletUsed: !action.payload.success,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_REMOVE_WALLET_AMOUNT:
      return {
        ...state,
        loading: false
      };
    case actionTypes.CHECKOUT_WITH_WALLET:
      return {
        ...state,
        walletUsed: false,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_CHECKOUT_WITH_WALLET:
      return {
        ...state,
        loading: !false
      };
    case actionTypes.SET_TRAN_LOADING:
      return {
        ...state,
        loading: action.payload,
        errorTransactionList: false
      };
    case actionTypes.FILTER_TRANSACTION:
      let filtered = state.transactionList.filter(
        transaction =>
          transaction.campaign_name
            .toLowerCase()
            .includes(action.payload.value.toLowerCase()) ||
          transaction.reference_id
            .toLowerCase()
            .includes(action.payload.value.toLowerCase()) ||
          transaction.payment_type
            .toLowerCase()
            .includes(action.payload.value.toLowerCase()) ||
          transaction.total_amount
            .toLowerCase()
            .includes(action.payload.value.toLowerCase())
      );
      let startSearch = "";
      let endSearch = "";
      if (action.payload.dateRange && action.payload.dateRange[0] !== "") {
        startSearch = Date.parse(action.payload.dateRange[0]);
        endSearch = Date.parse(action.payload.dateRange[1]);

        filtered = filtered.filter(transaction => {
          if (
            startSearch <= Date.parse(transaction.payment_date.split(" ")[0]) &&
            endSearch >= Date.parse(transaction.payment_date.split(" ")[0])
          )
            return transaction;
        });
      }
      return {
        ...state,
        transactionValue: action.payload.value,
        filteredTransactions: filtered,
        tranStartSearch: action.payload.dateRange[0],
        tranEndSearch: action.payload.dateRange[1]
      };
    case actionTypes.ERROR_FILTER_TRANSACTION:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
