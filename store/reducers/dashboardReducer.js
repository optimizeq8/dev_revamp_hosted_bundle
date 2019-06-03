import * as actionTypes from "../actions/actionTypes";

const initialState = {
  campaignList: [],
  filteredCampaigns: [],
  fetching_from_server: false,
  isListEnd: false,
  loading: false,
  selectedCampaign: null,
  campaignStats: [],
  filterValue: "",
  filterStatus: null,
  campaignStartSearch: "",
  campaignEndSearch: "",
  loadingCampaignDetails: false,
  loadingCampaignStats: false
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
    case actionTypes.ERROR_SET_CAMPAIGN_LIST:
      return {
        ...state,
        fetching_from_server: action.payload.fetching_from_server,
        isListEnd: action.payload.isListEnd,
        loading: action.payload.loading
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
    case actionTypes.ERROR_UPDATE_CAMPAIGN_LIST:
      return {
        ...state,
        fetching_from_server: action.payload.fetching_from_server,
        isListEnd: action.payload.isListEnd
      };

    case actionTypes.SET_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload.data,
        loadingCampaignDetails: action.payload.loading
      };
    case actionTypes.ERROR_SET_CAMPAIGN:
      return {
        ...state,
        loadingCampaignDetails: action.payload.loading,
        loading: action.payload.loading
      };
    case actionTypes.SET_CAMPAIGN_STATS:
      return {
        ...state,
        selectedCampaign: {
          ...state.selectedCampaign,
          avg_spend_per_day: action.payload.data.avg_spend_per_day,
          highest_spend_per_day: action.payload.data.highest_spend_per_day,
          highest_spend_date: action.payload.data.highest_spend_date
        },
        campaignStats:
          action.payload.data.timeseries_stats[0].timeseries_stat.timeseries,
        loadingCampaignStats: action.payload.loading
      };
    case actionTypes.SET_STATS_LOADING:
      return {
        ...state,
        loadingCampaignStats: action.payload
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
