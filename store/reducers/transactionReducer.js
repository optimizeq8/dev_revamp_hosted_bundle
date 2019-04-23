import * as actionTypes from "../actions/actionTypes";

const initialState = {
  transactionList: [],
  filteredTransactions: [],
  transactionValue: "",
  tranStartSearch: "",
  tranEndSearch: "",
  message: "",
  loading: false
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
    case actionTypes.SET_TRAN_LOADING:
      return {
        ...state,
        loading: action.payload
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
    default:
      return state;
  }
};

export default reducer;
