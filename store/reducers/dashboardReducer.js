import * as actionTypes from "../actions/actionTypes";
import isUndefined from "lodash/isUndefined";
import analytics from "@segment/analytics-react-native";
const initialState = {
  campaignList: null,
  filteredCampaigns: [],
  fetching_from_server: false,
  isListEnd: false,
  loading: false,
  selectedCampaign: null,
  campaignStats: [],
  filterValue: "",
  filterStatus: null,
  campaignStartSearch: "",
  granularity: "DAY",
  campaignEndSearch: "",
  loadingCampaignDetails: false,
  loadingCampaignStats: false,
  campaignError: false,
  rejCampaign: null,
  campaignMetrics: [],
  googleCampaignStats: [],
  googleCampaignOverall: {},
  smeMetrics: [],
  loadingCampaigns: false
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
        loadingCampaigns: false
      };
    case actionTypes.ERROR_SET_CAMPAIGN_LIST:
      return {
        ...state,
        fetching_from_server: action.payload.fetching_from_server,
        isListEnd: action.payload.isListEnd,
        loadingCampaigns: action.payload.loadingCampaigns
      };
    case actionTypes.GOT_ALL_CAMPAIGNS:
      return {
        ...state,
        fetching_from_server: action.payload.fetching_from_server,
        isListEnd: action.payload.isListEnd,
        loadingCampaigns: action.payload.loadingCampaigns
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
    case actionTypes.SET_CAMPAIGN_LOADING:
      return {
        ...state,
        selectedCampaign: action.payload.data,
        loadingCampaignDetails: action.payload.loading,
        campaignError: false
      };
    case actionTypes.SET_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload.data,
        googleCampaignStats: isUndefined(action.payload.data.stats)
          ? []
          : action.payload.data.stats,
        googleCampaignOverall: isUndefined(action.payload.data.overall)
          ? {}
          : action.payload.data.overall,
        loadingCampaignDetails: action.payload.loading,
        campaignError: false
      };
    case actionTypes.ERROR_SET_CAMPAIGN:
      return {
        ...state,
        loadingCampaignDetails: action.payload.loading,
        loading: action.payload.loading,
        campaignError: true
      };
    case actionTypes.SET_CAMPAIGN_STATS:
      let campStats = action.payload.data;
      let err = action.payload.err;
      let campaignMetrics = [];
      let smeMetrics = [];
      if (!err) {
        Object.keys(campStats).map((metric, i) => {
          if (
            ![
              "debug_message",
              "display_message",
              "error_code",
              "request_id",
              "request_status",
              "call_clicks",
              "instagram_clicks",
              "location_clicks",
              "whatsapp_clicks",
              "youtube_clicks",
              "total_installs",
              "timeseries_stats"
            ].includes(metric)
          ) {
            campaignMetrics.push({
              metric: metric.replace("_", " "),
              metricValue: campStats[metric]
            });
          }
          if (
            [
              "call_clicks",
              "instagram_clicks",
              "location_clicks",
              "whatsapp_clicks",
              "youtube_clicks"
            ].includes(metric)
          ) {
            smeMetrics.push({
              metric: metric.replace("_", " "),
              metricValue: campStats[metric]
            });
          }
        });
        if (state.selectedCampaign.objective === "BRAND_AWARENESS") {
          campaignMetrics.push({
            metric: "cpm",
            metricValue: state.selectedCampaign.cpm
          });
        }
      }
      return {
        ...state,
        selectedCampaign: {
          ...state.selectedCampaign,
          swipes: !err ? campStats.swipes : 0,
          spends: !err ? campStats.spend : 0,
          impressions: !err ? campStats.impressions : 0,

          total_installs: !err ? campStats.total_installs : 0,
          video_views: !err ? campStats.video_views : 0,
          eCPV: !err ? campStats.eCPV : 0,
          eCPI: !err ? campStats.eCPI : 0,
          eCPSU: !err ? campStats.eCPSU : 0
        },
        smeMetrics: smeMetrics,
        campaignMetrics: campaignMetrics,
        granularity: action.payload.data.hasOwnProperty("timeseries_stats")
          ? action.payload.data.timeseries_stats[0].timeseries_stat.granularity
          : "DAY",
        campaignStats: action.payload.data.hasOwnProperty("timeseries_stats")
          ? action.payload.data.timeseries_stats[0].timeseries_stat.timeseries
          : [],
        loadingCampaignStats: action.payload.loading
      };
    case actionTypes.SET_STATS_LOADING:
      return {
        ...state,
        loadingCampaignStats: action.payload
      };
    case actionTypes.FILTER_CAMPAIGNS:
      let filtered =
        state.campaignList &&
        state.campaignList.filter(campaign =>
          campaign.name
            .toLowerCase()
            .includes(action.payload.value.toLowerCase())
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
      analytics.track(`a_filter`, {
        source: "dashboard",
        source_action: "a_filter",
        no_of_results: filtered && filtered.length,
        filter_type: "campaigns",
        keywords: action.payload.value,
        start_date: startSearch,
        end_date: endSearch,
        campaign_status: action.payload.selected
      });
      return {
        ...state,
        filterValue: action.payload.value,
        filteredCampaigns: filtered,
        filterStatus: action.payload.selected,
        campaignStartSearch: action.payload.dateRange[0],
        campaignEndSearch: action.payload.dateRange[1]
      };
    case actionTypes.SET_REJECTED_CAMPAIGN:
      let rejCampaign = action.payload;
      //Since we receive call_to_action as "ORDER_NOW" for example from campaignDetails,
      //Turn it to an object so that the process for re-uploading is the same as normal
      if (typeof rejCampaign.call_to_action === "string") {
        rejCampaign.call_to_action = {
          label: rejCampaign.call_to_action.replace("_", " "),
          value: rejCampaign.call_to_action
        };
      }

      //Same thing, attachment comes in as a string from campaignDetails,
      if (rejCampaign.hasOwnProperty("attachment")) {
        let rejCampaignAttacment = rejCampaign.attachment;
        //if its a string and not "BLANK" then parse it
        rejCampaignAttacment =
          typeof rejCampaignAttacment === "string" &&
          rejCampaignAttacment !== "BLANK"
            ? JSON.parse(rejCampaignAttacment)
            : rejCampaignAttacment;
        //Sometimes attachemnts have utm parameters, they are deleted so that
        //if sent back they will be added from the backend
        if (rejCampaignAttacment.hasOwnProperty("block_preload")) {
          delete rejCampaignAttacment.block_preload;
          if (rejCampaignAttacment.url.includes("?utm_source")) {
            rejCampaignAttacment.url = rejCampaignAttacment.url.split(
              "?utm_source"
            )[0];
          }
        }
        rejCampaign.attachment = rejCampaignAttacment;
      }
      return { ...state, rejCampaign };
    case actionTypes.RESET_REJECTED_CAMPAIGN:
      return { ...state, rejCampaign: null };

    case actionTypes.SET_GOOGLE_CAMPAIGN_STATS:
      return {
        ...state,
        loadingCampaignStats: action.payload.loading,
        googleCampaignOverall: action.payload.data.overall,
        googleCampaignStats: action.payload.data.stats
      };
    case actionTypes.UPDATE_GOOGLE_CAMPAIGN_STATUS:
      return {
        ...state,
        selectedCampaign: {
          ...state.selectedCampaign,
          campaign: {
            ...state.selectedCampaign.campaign,
            status: action.payload.status
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
