import * as actionTypes from "../actions/actionTypes";

const initialState = {
  campaignList: [],
  filteredCampaigns: [],
  fetching_from_server: false,
  isListEnd: false,
  loading: false,
  selectedCampaign: null,
  filterValue: "",
  filterStatus: "A",
  campaignStartSearch: "",
  campaignEndSearch: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CAMPAIGN_LIST:
      return {
        ...state,
        campaignList: action.payload.data,
        filteredCampaigns: action.payload.data,
        fetching_from_server: false,
        isListEnd: false,
        loading: false
      };
    case actionTypes.GOT_ALL_CAMPAIGNS:
      return {
        ...state,
        fetching_from_server: action.payload.fetching_from_server,
        isListEnd: action.payload.isListEnd,
        loading: action.payload.loading
      };
    case actionTypes.UPDATE_CAMPAIGN_LIST:
      return {
        ...state,
        campaignList: [...state.campaignList, ...action.payload.data],
        filteredCampaigns: [...state.filteredCampaigns, ...action.payload.data],
        fetching_from_server: action.payload.fetching_from_server
      };
    case actionTypes.SET_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload.data,
        loading: action.payload.loading
      };
    case actionTypes.FILTER_CAMPAIGNS:
      let filtered = state.campaignList.filter(campaign =>
        campaign.name.toLowerCase().includes(action.payload.value.toLowerCase())
      );

      if (action.payload.selected !== "A")
        filtered = filtered.filter(campaign =>
          campaign.status.includes(action.payload.selected)
        );
      let startSearch = "";
      let endSearch = "";
      if (action.payload.dateRange && action.payload.dateRange[0] !== "") {
        startSearch = Date.parse(action.payload.dateRange[0]);
        endSearch = Date.parse(action.payload.dateRange[1]);

        filtered = filtered.filter(campaign => {
          if (
            startSearch <= Date.parse(campaign.start_time.split("T")[0]) &&
            endSearch >= Date.parse(campaign.end_time.split("T")[0])
          )
            return campaign;
        });
      }
      return {
        ...state,
        filterValue: action.payload.value,
        filteredCampaigns: filtered,
        filterStatus: action.payload.selected,
        campaignStartSearch: action.payload.dateRange[0],
        campaignEndSearch: action.payload.dateRange[1]
      };
    default:
      return state;
  }
};

export default reducer;
