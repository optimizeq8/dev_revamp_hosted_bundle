import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  data: null,
  campaign_id: "",
  adType: "",
  average_reach: 0,
  kdamount: 0,
  minValueBudget: 0,
  maxValueBudget: 0,
  total_reach: 0,
  interests: null,
  deviceBrands: null,
  isoVersions: null,
  androidVersions: null,
  loadingObj: false,
  loadingDesign: false,
  loadingDetail: false,
  loading: false,
  payment_data: null,
  languagesList: [],
  videoUrl: "",
  videoUrlLoading: "",
  media: "",
  countryName: "",
  interestNames: [],
  regionNames: [],
  campaignEnded: false,
  storyAdsArray: [
    {
      id: 0,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK"
    },
    {
      id: 1,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK"
    },
    {
      id: 2,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK"
    },
    {
      id: 3,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK"
    }
  ],
  loadingStoryAdsArray: [],
  coverLoading: false,
  storyAdCover: null,
  adType: "SnapAd",
  collectionAdLinkForm: 0,
  collectionLoader: false,
  collectionAdMedia: [],
  weburlAvalible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AD_TYPE:
      return {
        ...state,
        adType: action.payload
      };
    case actionTypes.SET_COLLECTION_AD_LINK_FORM:
      return {
        ...state,
        collectionAdLinkForm: action.payload
      };
    case actionTypes.SET_AD_OBJECTIVE:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        loadingObj: false
      };
    case actionTypes.SET_MINIMUN_CASH:
      return {
        ...state,
        minValueBudget: action.payload.minValueBudget,
        maxValueBudget: action.payload.maxValueBudget
      };
    case actionTypes.ERROR_SET_AD_OBJECTIVE:
      return {
        ...state,
        loadingObj: false
      };
    case actionTypes.SET_AD_LOADING_COLLECTION_MEDIA:
      return {
        ...state,
        collectionLoader: action.payload
      };
    case actionTypes.SET_AD_COLLECTION_MEDIA:
      let arr = state.collectionAdMedia;
      arr[action.payload.collection_order] = action.payload;
      return {
        ...state,
        collectionLoader: false,
        collectionAdMedia: [...arr]
      };
    case actionTypes.ERROR_SET_AD_COLLECTION_MEDIA:
      return {
        ...state,
        collectionLoader: false
      };
    case actionTypes.SET_AD_DESIGN:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
          call_to_action: {
            value: action.payload.data.call_to_action,
            label: action.payload.data.call_to_action.replace(/_/g, " ")
          },
          attachment:
            action.payload.data.attachment !== "BLANK"
              ? JSON.parse(action.payload.data.attachment)
              : action.payload.data.attachment,
          media: state.data.media
        },
        message: action.payload.message,

        loadingDesign: false
      };
    case actionTypes.SAVE_CAMPAIGN_INFO:
      let resetSwipeUps = {};
      if (action.payload.reset) {
        resetSwipeUps = {
          attachment: "BLANK",
          call_to_action: {
            label: "BLANK",
            value: "BLANK"
          },
          destination: "BLANK",
          reset: false
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps
        }
      };
    case actionTypes.ERROR_SET_AD_DESIGN:
      return {
        ...state,
        loadingDesign: false
      };

    case actionTypes.SET_VIDEO_URL:
      return {
        ...state,
        videoUrl: action.payload.media_upload_url,
        videoUrlLoading: !action.payload.success
      };
    // case actionTypes.HANDLE_STORY_VIDEO:
    //   let videoStoryAds = state.storyAdsArray;
    //   let ad = videoStoryAds.find(
    //     storyAd => action.payload.card.story_id === storyAd.story_id
    //   );
    //   ad = { ...ad, ...action.payload.card };
    //   videoStoryAds[action.payload.card.story_order] = {
    //     ...action.payload.data,
    //     ...action.payload.card,
    //     uploaded: true
    //   };
    //   // let loadingAr = state.loadingStoryAdsArray;
    //   // loadingAr[action.payload.data.story_order] = false;

    //   return {
    //     ...state,
    //     // loadingStoryAdsArray: [...loadingAr],
    //     storyAdsArray: [...videoStoryAds]
    //   };
    case actionTypes.GET_VIDEO_URL_LOADING:
      return {
        ...state,
        videoUrlLoading: action.payload
      };
    case actionTypes.SET_AD_DETAILS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data.data },
        media: action.payload.media,
        countryName: action.payload.names.countryName,
        interestNames: action.payload.names.interestNames,
        regionNames: action.payload.names.regionNames,
        message: action.payload.data.message,
        kdamount: action.payload.data.kdamount,
        loadingDetail: false
      };
    case actionTypes.ERROR_SET_AD_DETAILS:
      return {
        ...state,
        loadingDetail: false
      };

    case actionTypes.UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        kdamount: action.payload.kdamount
      };
    case actionTypes.ERROR_UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state
      };
    case actionTypes.END_CAMPAIGN:
      return {
        ...state,
        campaignEnded: action.payload
      };
    case actionTypes.SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: action.payload.average_reach
      };
    case actionTypes.ERROR_SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: 0
      };

    case actionTypes.SET_SNAP_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: (state.average_reach / action.payload.average_reach) * 100
      };
    case actionTypes.ERROR_SET_SNAP_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: 0
      };

    case actionTypes.PAYMENT_REQUEST_URL:
      return {
        ...state,
        payment_data: action.payload,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_PAYMENT_REQUEST_URL:
      return {
        ...state,
        payment_data: null,
        loading: false
      };

    case actionTypes.SET_INTERESTS:
      return {
        ...state,
        interests: action.payload
      };
    case actionTypes.ERROR_SET_INTERESTS:
      return {
        ...state
      };

    case actionTypes.SET_DEVICE_MAKES:
      return {
        ...state,
        deviceBrands: action.payload
      };
    case actionTypes.ERROR_SET_DEVICE_MAKES:
      return {
        ...state
      };

    case actionTypes.SET_IOS_VERSIONS:
      return {
        ...state,
        isoVersions: action.payload
      };
    case actionTypes.ERROR_SET_IOS_VERSIONS:
      return {
        ...state
      };

    case actionTypes.SET_ANDROID_VERSIONS:
      return {
        ...state,
        androidVersions: action.payload
      };
    case actionTypes.ERROR_SET_ANDROID_VERSIONS:
      return {
        ...state
      };

    case actionTypes.SET_AD_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_AD_LOADING_OBJ:
      return {
        ...state,
        loadingObj: action.payload
      };
    case actionTypes.SET_AD_LOADING_DESIGN:
      return {
        ...state,
        loadingDesign: action.payload
      };
    case actionTypes.SET_AD_LOADING_DETAIL:
      return {
        ...state,
        loadingDetail: action.payload
      };
    case actionTypes.SET_COVER_LOADING_DESIGN:
      return {
        ...state,
        coverLoading: action.payload
      };
    case actionTypes.ERROR_SET_COVER_DESIGN:
      return {
        ...state,
        coverLoading: false
      };
    case actionTypes.SET_COVER_DESIGN:
      return {
        ...state,
        storyAdCover: {
          ...action.payload.data,
          preview_media_id: action.payload.preview_media_id
        },
        coverLoading: false
      };
    case actionTypes.ADD_SNAP_CARD:
      let newSnapCard = {
        id: state.storyAdsArray[state.storyAdsArray.length - 1].id + 1,
        call_to_action: { label: "BLANK", value: "BLANK" },
        media: "//",
        destination: "BLANK",
        attachment: "BLANK"
      };
      let newStoryAdsArray = state.storyAdsArray;
      newStoryAdsArray.push(newSnapCard);
      return {
        ...state,
        storyAdsArray: [...newStoryAdsArray]
      };
    case actionTypes.SET_STORYADMEDIA_DESIGN:
      let storyAds = state.storyAdsArray;
      storyAds[action.payload.data.story_order] = {
        ...action.payload.data,
        ...action.payload.card,
        uploaded: true
      };
      let loadingAr = state.loadingStoryAdsArray;
      loadingAr[action.payload.data.story_order] = false;

      return {
        ...state,
        loadingStoryAdsArray: [...loadingAr],
        storyAdsArray: [...storyAds]
      };
    case actionTypes.SET_STORYADMEDIA_DESIGN_UPLOADED:
      let storyAdsUploaded = state.storyAdsArray;
      storyAdsUploaded[action.payload.card.index] = {
        ...action.payload.card,
        uploaded: false
      };
      return {
        ...state,
        storyAdsArray: [...storyAdsUploaded]
      };
    case actionTypes.DELETE_STORY_AD_CARD:
      let deleteStoryAds = state.storyAdsArray;

      deleteStoryAds = deleteStoryAds.filter(ad => {
        if (
          (action.payload.card.hasOwnProperty("item") &&
            action.payload.card.item.id !== ad.id) ||
          (action.payload.hasOwnProperty("data") &&
            ad.story_id !== action.payload.data.story_id)
        )
          return ad;
      });

      let deletedLoadingAr = state.loadingStoryAdsArray;
      deletedLoadingAr[action.payload.card.index] = false;

      return {
        ...state,
        loadingStoryAdsArray: [...deletedLoadingAr],
        storyAdsArray: [...deleteStoryAds]
      };
    case actionTypes.SET_STORYADCARD_LOADING_DESIGN:
      let ar = state.loadingStoryAdsArray;
      ar[action.payload.index] = action.payload.uploading;
      return {
        ...state,
        loadingStoryAdsArray: [...ar]
      };
    case actionTypes.SET_DELETE_CARD_LOADING:
      let deleteLoadAr = state.loadingStoryAdsArray;
      deleteLoadAr[action.payload.index] = action.payload.deleteing;
      return {
        ...state,
        loadingStoryAdsArray: [...deleteLoadAr]
      };
    case actionTypes.SET_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: action.payload
      };
    case actionTypes.ERROR_SET_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: []
      };
    case actionTypes.RESET_COLLECTIONS:
      return {
        ...state,
        collectionLoader: false,
        collectionAdMedia: []
      };
    case actionTypes.RESET_CAMPAING_INFO:
      return {
        ...state,
        campaign_id: "",
        data: null,
        average_reach: 0,
        total_reach: 0,
        media: "",
        minValueBudget: 0,
        adType: "",
        maxValueBudget: 0,
        countryName: "",
        interestNames: [],
        regionNames: [],
        storyAdsArray: [
          {
            id: 0,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK"
          },
          {
            id: 1,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK"
          },
          {
            id: 2,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK"
          },
          {
            id: 3,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK"
          }
        ],
        loadingStoryAdsArray: [],
        coverLoading: false,
        storyAdCover: null,
        collectionAdLinkForm: 0,
        collectionLoader: false,
        collectionAdMedia: []
      };
    case actionTypes.VERIFY_BUSINESSURL:
      return {
        ...state,
        weburlAvalible: action.payload.success
      };
    case actionTypes.SET_REJECTED_STORYADS:
      let rejAds = action.payload;
      let oldStoryAdsArray = state.storyAdsArray;

      oldStoryAdsArray = rejAds.map((ad, i) => {
        let atch =
          ad.attachment !== "BLANK" ? JSON.parse(ad.attachment) : ad.attachment;
        if (atch.hasOwnProperty("block_preload")) {
          delete atch.block_preload;
          if (atch.url.includes("?utm_source")) {
            atch.url = atch.url.split("?utm_source")[0];
          }
        }
        return {
          ...ad,
          id: ad.story_id,
          call_to_action: {
            label: ad.call_to_action.replace("_", " "),
            value: ad.call_to_action
          },
          attachment: atch
        };
      });
      oldStoryAdsArray = [
        ...oldStoryAdsArray,
        {
          id:
            parseInt(oldStoryAdsArray[oldStoryAdsArray.length - 1].story_id) +
            1,
          call_to_action: { label: "BLANK", value: "BLANK" },
          media: "//",
          destination: "BLANK",
          attachment: "BLANK"
        }
      ];
      return {
        ...state,
        storyAdsArray: oldStoryAdsArray
      };
    case actionTypes.SET_REJECTED_COLLECTIONADS:
      let rejColAds = action.payload;
      return {
        ...state,
        collectionAdMedia: rejColAds,
        collectionAdLinkForm:
          action.payload[0].interaction_type === "WEB_VIEW" ? 1 : 2
      };
    case actionTypes.SET_REJECTED_ADTYPE:
      return {
        ...state,
        adType: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
