import * as actionTypes from "../actions/actionTypes";

const initialState = {
  transactionList: [],
  filteredTransactions: [],
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

      if (action.payload.dateRange && action.payload.dateRange[0] !== "") {
        let startSearch = Date.parse(action.payload.dateRange[0]);
        let endSearch = Date.parse(action.payload.dateRange[1]);

        filtered = filtered.filter(transaction => {
          if (
            startSearch <= Date.parse(transaction.start_time) &&
            endSearch >= Date.parse(transaction.end_time)
          )
            return transaction;
        });
      }
      return {
        ...state,
        filterValue: action.payload.value,
        filteredTransactions: filtered
      };
    default:
      return state;
  }
};

export default reducer;
