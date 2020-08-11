import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  data: null,
  campaign_id: "",
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
      id: -1,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 0,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 1,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 2,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 3,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 4,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 5,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 6,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 7,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 8,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 9,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 10,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 11,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },

    {
      id: 12,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },

    {
      id: 13,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 14,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 15,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },

    {
      id: 16,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 17,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 18,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 19,
      call_to_action: { label: "BLANK", value: "BLANK" },
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
  ],
  loadingStoryAdsArray: [],
  coverLoading: false,
  storyAdCover: null,
  adType: "SnapAd",
  collectionAdLinkForm: 0,
  collectionLoader: false,
  collectionAdMedia: [],
  weburlAvalible: false,
  instagramPostLoading: false,
  instagramPostList: [],
  errorInstaHandle: true,
  errorInstaHandleMessage: null,
  savingWebProducts: false,
  selectedInstagramProducts: [],
  productInfoId: null,
  errorGetWebProducts: false,
  getWebProductsLoading: false,
  businessLogo: "",
  storyAdAttachment: {
    destination: "BLANK",
    call_to_action: { labe: "BLANK", value: "BLANK" },
    attachment: "BLANK",
  },
  uploadMediaDifferentDeviceURL: "",
  uploadMediaDifferentDeviceAccessCode: "",
  errorUploadMediaDiffernetDevice: "",
  mediaWebLink: "",
  mediaTypeWebLink: "",
  webUploadLinkMediaLoading: false,
  incompleteCampaign: false,
  campaignProgressStarted: false,
  currentCampaignSteps: [],
  instaHandleId: null,
  instaHasNextPage: null,
  instaEndCursor: null,
  mediaStoryAdsDifferentDevice: [],
  loadingMoreInstaPost: false,
  collectionMainMediaWebLink: "",
  collectionMainMediaTypeWebLink: "",
  collectionAdMediaLinks: [],
  oldTempAdType: "",
  oldTempData: null,
  languagesListLoading: false,
  languagesListError: false,
  savedObjective: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AD_TYPE:
      return {
        ...state,
        adType: action.payload,
      };
    case actionTypes.SET_COLLECTION_AD_LINK_FORM:
      return {
        ...state,
        collectionAdLinkForm: action.payload,
      };
    case actionTypes.SET_AD_OBJECTIVE:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        loadingObj: false,
        incompleteCampaign: true,
        //saves this part just in case anything is changed in AdObjective and not submitting
        oldTempData: { ...state.data, ...action.payload.data },
        oldTempAdType: state.adType,
        savedObjective: action.payload.savedObjective,
      };
    case actionTypes.SET_MINIMUN_CASH:
      return {
        ...state,
        minValueBudget: action.payload.minValueBudget,
        maxValueBudget: action.payload.maxValueBudget,
      };
    case actionTypes.ERROR_SET_AD_OBJECTIVE:
      return {
        ...state,
        loadingObj: false,
      };
    case actionTypes.SET_AD_LOADING_COLLECTION_MEDIA:
      return {
        ...state,
        collectionLoader: action.payload,
      };
    case actionTypes.SET_AD_COLLECTION_MEDIA:
      let arr = state.collectionAdMedia;
      arr[action.payload.collection_order] = action.payload;
      return {
        ...state,
        collectionLoader: false,
        collectionAdMedia: [...arr],
      };
    case actionTypes.ERROR_SET_AD_COLLECTION_MEDIA:
      return {
        ...state,
        collectionLoader: false,
      };
    case actionTypes.SET_AD_DESIGN:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
          call_to_action: {
            value: action.payload.data.call_to_action,
            label: action.payload.data.call_to_action.replace(/_/g, " "),
          },
          attachment:
            action.payload.data.attachment !== "BLANK"
              ? JSON.parse(action.payload.data.attachment)
              : action.payload.data.attachment,
          //added checking if data is not null becuase it was throwing an error for
          //re-uploading for rejected ads
          media: state.data && state.data.media,
        },
        message: action.payload.message,

        loadingDesign: false,
      };
    case actionTypes.SAVE_CAMPAIGN_INFO:
      let resetSwipeUps = {};
      if (action.payload.reset) {
        resetSwipeUps = {
          attachment: "BLANK",
          call_to_action: {
            label: "BLANK",
            value: "BLANK",
          },
          destination: "BLANK",
          reset: false,
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps,
        },
        storyAdAttachment: { ...state.storyAdAttachment, ...resetSwipeUps },
        currentCampaignSteps: action.payload.reset
          ? state.currentCampaignSteps.length > 0
            ? //If objective is changed then AdDesign should be the current step again to set the swipe ups
              state.currentCampaignSteps.filter(
                (step) => step !== "AdDetails" && step !== "AdPaymentReview"
              )
            : []
          : state.currentCampaignSteps,
        oldTempData: {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps,
        },
      };
    case actionTypes.ERROR_SET_AD_DESIGN:
      return {
        ...state,
        loadingDesign: false,
      };

    case actionTypes.SET_VIDEO_URL:
      return {
        ...state,
        videoUrl: action.payload.media_upload_url,
        videoUrlLoading: !action.payload.success,
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
        videoUrlLoading: action.payload,
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
        loadingDetail: false,
      };
    case actionTypes.ERROR_SET_AD_DETAILS:
      return {
        ...state,
        loadingDetail: false,
      };

    case actionTypes.UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        kdamount: action.payload.kdamount,
      };
    case actionTypes.ERROR_UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state,
      };
    case actionTypes.END_CAMPAIGN:
      return {
        ...state,
        campaignEnded: action.payload,
      };
    case actionTypes.SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: action.payload.average_reach,
      };
    case actionTypes.ERROR_SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: 0,
      };

    case actionTypes.SET_SNAP_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: (state.average_reach / action.payload.average_reach) * 100,
      };
    case actionTypes.ERROR_SET_SNAP_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: 0,
      };
    case actionTypes.SET_INTERESTS:
      return {
        ...state,
        interests: action.payload,
      };
    case actionTypes.ERROR_SET_INTERESTS:
      return {
        ...state,
      };
    case actionTypes.SET_DEVICE_MAKES:
      return {
        ...state,
        deviceBrands: action.payload,
      };
    case actionTypes.ERROR_SET_DEVICE_MAKES:
      return {
        ...state,
      };
    case actionTypes.SET_IOS_VERSIONS:
      return {
        ...state,
        isoVersions: action.payload,
      };
    case actionTypes.ERROR_SET_IOS_VERSIONS:
      return {
        ...state,
      };
    case actionTypes.SET_ANDROID_VERSIONS:
      return {
        ...state,
        androidVersions: action.payload,
      };
    case actionTypes.ERROR_SET_ANDROID_VERSIONS:
      return {
        ...state,
      };
    case actionTypes.SET_AD_LOADING_OBJ:
      return {
        ...state,
        loadingObj: action.payload,
      };
    case actionTypes.SET_AD_LOADING_DESIGN:
      return {
        ...state,
        loadingDesign: action.payload,
      };
    case actionTypes.SET_AD_LOADING_DETAIL:
      return {
        ...state,
        loadingDetail: action.payload,
      };
    case actionTypes.SET_COVER_LOADING_DESIGN:
      return {
        ...state,
        coverLoading: action.payload,
      };
    case actionTypes.ERROR_SET_COVER_DESIGN:
      return {
        ...state,
        coverLoading: false,
      };
    case actionTypes.SET_COVER_DESIGN:
      return {
        ...state,
        storyAdCover: {
          ...action.payload.data,
          preview_media_id: action.payload.preview_media_id,
        },
        coverLoading: false,
      };
    case actionTypes.ADD_SNAP_CARD:
      let newSnapCard = {
        id: state.storyAdsArray[state.storyAdsArray.length - 1].id + 1,
        call_to_action: { label: "BLANK", value: "BLANK" },
        media: "//",
        destination: "BLANK",
        attachment: "BLANK",
      };

      let newStoryAdsArray = state.storyAdsArray;
      newStoryAdsArray.push(newSnapCard);
      return {
        ...state,
        storyAdsArray: [...newStoryAdsArray],
      };
    case actionTypes.SET_STORYADMEDIA_DESIGN:
      let storyAds = state.storyAdsArray;
      storyAds[action.payload.data.story_order] = {
        ...storyAds[action.payload.data.story_order],
        ...action.payload.data,
        ...action.payload.card,
        uploaded: true,
      };
      let loadingAr = state.loadingStoryAdsArray;
      loadingAr[action.payload.data.story_order] = false;

      return {
        ...state,
        loadingStoryAdsArray: [...loadingAr],
        storyAdsArray: [...storyAds],
      };
    case actionTypes.SET_STORYADMEDIA_DESIGN_UPLOADED:
      let storyAdsUploaded = state.storyAdsArray;
      storyAdsUploaded[action.payload.card.index] = {
        ...action.payload.card,
        uploaded: false,
      };
      return {
        ...state,
        storyAdsArray: [...storyAdsUploaded],
      };
    case actionTypes.DELETE_STORY_AD_CARD:
      let deleteStoryAds = state.storyAdsArray;
      deleteStoryAds = deleteStoryAds.map((ad, index) => {
        if (
          (action.payload.card.hasOwnProperty("item") &&
            action.payload.card.item.id !== ad.id) ||
          (action.payload.hasOwnProperty("data") &&
            ad.story_id !== action.payload.data.story_id)
        ) {
          return ad;
        } else {
          return {
            id: index,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          };
        }
      });
      let deletedLoadingAr = state.loadingStoryAdsArray;
      deletedLoadingAr[action.payload.card.index] = false;
      return {
        ...state,
        loadingStoryAdsArray: [...deletedLoadingAr],
        storyAdsArray: [...deleteStoryAds],
        currentCampaignSteps: ["Dashboard", "AdObjective", "AdDesign"],
      };
    case actionTypes.SET_STORYADCARD_LOADING_DESIGN:
      let ar = state.loadingStoryAdsArray;
      let storyPro = state.storyAdsArray;
      storyPro[action.payload.index] = {
        ...storyPro[action.payload.index],
        progress: action.payload.progress,
      };
      ar[action.payload.index] = action.payload.uploading;
      return {
        ...state,
        loadingStoryAdsArray: [...ar],
        storyAdsArray: [...storyPro],
      };
    case actionTypes.SET_DELETE_CARD_LOADING:
      let deleteLoadAr = state.loadingStoryAdsArray;
      deleteLoadAr[action.payload.index] = action.payload.deleteing;
      return {
        ...state,
        loadingStoryAdsArray: [...deleteLoadAr],
      };
    case actionTypes.SET_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: action.payload.data,
        languagesListLoading: action.payload.loading,
      };
    case actionTypes.ERROR_SET_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: [],
        languagesListLoading: false,
        languagesListError: true,
      };
    case actionTypes.RESET_COLLECTIONS:
      return {
        ...state,
        collectionLoader: false,
        collectionAdMedia: [],
      };
    case actionTypes.RESET_CAMPAING_INFO:
      let resetAdType = action.payload;
      let adType = "SnapAd";
      let data = null;
      let campaign_id = "";
      let countryName = "";
      let interestNames = [];
      let regionNames = [];
      let minValueBudget = 0;
      let maxValueBudget = 0;
      let incompleteCampaign = false;
      let currentCampaignSteps = [];
      if (resetAdType && state.incompleteCampaign) {
        currentCampaignSteps = state.currentCampaignSteps;
        incompleteCampaign = state.incompleteCampaign;
        adType = state.adType;
        campaign_id = state.campaign_id;
        data = state.data ? state.data : {};
        minValueBudget = state.minValueBudget;
        maxValueBudget = state.maxValueBudget;
        countryName = state.countryName;
        interestNames = state.interestNames;
        regionNames = state.regionNames;
        if (data) {
          delete data.media;
          delete data.media_type;
          delete data.media_upload;
          delete data.ios_upload;
          delete data.formatted;
          delete data.objective;
          delete data.objectiveLabel;
        }
        //overwrite any old campaign data with the reseted campaign data if user submits a rejected ad
        if (state.oldTempData) {
          data = { ...data, ...state.oldTempData };
        }
      }

      return {
        ...state,
        campaign_id: campaign_id,
        data: data,
        average_reach: 0,
        total_reach: 0,
        media: "",
        minValueBudget: minValueBudget,
        adType: adType,
        maxValueBudget: maxValueBudget,
        countryName: countryName,
        interestNames: interestNames,
        regionNames: regionNames,
        storyAdsArray: [
          {
            id: -1,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 0,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 1,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 2,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 3,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 4,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 5,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 6,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 7,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 8,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 9,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 10,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 11,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },

          {
            id: 12,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },

          {
            id: 13,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 14,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 15,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },

          {
            id: 16,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 17,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 18,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
          {
            id: 19,
            call_to_action: { label: "BLANK", value: "BLANK" },
            media: "//",
            destination: "BLANK",
            attachment: "BLANK",
          },
        ],
        loadingStoryAdsArray: [],
        coverLoading: false,
        storyAdCover: null,
        collectionAdLinkForm: 0,
        collectionLoader: false,
        collectionAdMedia: [],
        storyAdAttachment: {
          destination: "BLANK",
          call_to_action: { labe: "BLANK", value: "BLANK" },
          attachment: "BLANK",
        },
        incompleteCampaign: incompleteCampaign,
        currentCampaignSteps: currentCampaignSteps,
      };
    case actionTypes.VERIFY_BUSINESSURL:
      return {
        ...state,
        weburlAvalible: action.payload.success,
      };
    case actionTypes.SET_REJECTED_STORYADS:
      let rejAds = action.payload;
      let oldStoryAdsArray = state.storyAdsArray;
      let oldStoryAdAttachment = state.storyAdAttachment;
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
          index: ad.story_order,
          id: ad.story_id,
          call_to_action: {
            label: ad.call_to_action.replace("_", " "),
            value: ad.call_to_action,
          },
          attachment: atch,
        };
      });
      oldStoryAdAttachment = {
        attachment: oldStoryAdsArray[0].attachment,
        call_to_action: oldStoryAdsArray[0].call_to_action,
        destination: oldStoryAdsArray[0].destination,
      };
      oldStoryAdsArray = [
        ...oldStoryAdsArray,
        {
          id:
            parseInt(oldStoryAdsArray[oldStoryAdsArray.length - 1].story_id) +
            1,
          call_to_action: { label: "BLANK", value: "BLANK" },
          media: "//",
          destination: "BLANK",
          attachment: "BLANK",
        },
      ];
      return {
        ...state,
        storyAdsArray: oldStoryAdsArray,
        storyAdAttachment: oldStoryAdAttachment,
      };
    case actionTypes.SET_REJECTED_COLLECTIONADS:
      let rejColAds = action.payload.collectionAdMedia;
      let rejColCalltoAction = action.payload.call_to_action;
      let atch = rejColAds[0].attachment_properties
        ? JSON.parse(rejColAds[0].attachment_properties)
        : rejColAds[0].attachment_properties;
      if (atch.hasOwnProperty("block_preload")) {
        delete atch.block_preload;
        if (atch.url.includes("?utm_source")) {
          atch.url = atch.url.split("?utm_source")[0];
        }
      }
      let oldData = state.data;
      let collCall_to_action = rejColCalltoAction;

      oldData = {
        ...oldData,
        attachment: atch,
        call_to_action: collCall_to_action,
      };
      return {
        ...state,
        collectionAdMedia: rejColAds,
        collectionAdLinkForm:
          rejColAds[0].interaction_type === "WEB_VIEW" ? 1 : 2,
        data: oldData,
      };
    case actionTypes.SET_REJECTED_ADTYPE:
      return {
        ...state,
        adType: action.payload,
      };
    case actionTypes.SET_INSTAGRAM_POST_LOADING:
      return {
        ...state,
        instagramPostLoading: action.payload,
        // errorInstaHandle: !action.payload.error,
        // errorInstaHandleMessage: action.payload.errorMessage,
        instagramPostList: [],
        businessLogo: "",
        instaHandleId: null,
        instaHasNextPage: null,
        instaEndCursor: null,
      };
    case actionTypes.SET_INSTAGRAM_POST:
      return {
        ...state,
        instagramPostList: action.payload.imagesList,
        businessLogo: action.payload.businessLogo,
        instagramPostLoading: false,
        instaHandleId: action.payload.instaHandleId,
        instaHasNextPage: action.payload.instaHasNextPage,
        instaEndCursor: action.payload.instaEndCursor,
      };
    case actionTypes.ERROR_GET_INSTAGRAM_POST:
      return {
        ...state,
        instagramPostList: [],
        businessLogo: "",
        instaHandleId: null,
        instaHasNextPage: null,
        instaEndCursor: null,
        // errorInstaHandle: true,
        errorInstaHandle: action.payload.error,
        instagramPostLoading: false,
        errorInstaHandleMessage: action.payload.errorMessage,
      };
    case actionTypes.SAVE_WEB_PRODUCTS_LOADING:
      return {
        ...state,
        savingWebProducts: action.payload,
      };
    case actionTypes.SUCCESS_SAVE_WEB_PRODUCTS:
      return {
        ...state,
        // savingWebProducts: false,
        productInfoId: action.payload.id,
        selectedInstagramProducts: action.payload.webproducts,
      };
    case actionTypes.ERROR_SAVE_WEB_PRODUCTS:
      return {
        ...state,
        savingWebProducts: false,
      };
    case actionTypes.GET_WEB_PRODUCTS:
      return {
        ...state,
        getWebProductsLoading: false,
        selectedInstagramProducts: JSON.parse(action.payload.webproducts),
        productInfoId: action.payload.id,
        errorGetWebProducts: false,
      };
    case actionTypes.ERROR_GET_WEB_PRODUCTS:
      return {
        ...state,
        selectedInstagramProducts: action.payload.webproducts,
        productInfoId: action.payload.id,
        errorGetWebProducts: action.payload.error,
        getWebProductsLoading: false,
      };

    case actionTypes.GET_WEB_PRODUCTS_LOADING: {
      return {
        ...state,
        getWebProductsLoading: action.payload,
      };
    }
    case actionTypes.STORYAD_ATTACHMENT:
      let sAttachment = {};
      if (action.payload.attachment.hasOwnProperty("longformvideo_media")) {
        sAttachment = {
          ...action.payload,
          uploaded: false,
          attachment: { label: "BLANK", value: "BLANK" },
          [Object.keys(action.payload.attachment)[0]]:
            action.payload.attachment.longformvideo_media,
          [Object.keys(action.payload.attachment)[1]]:
            action.payload.attachment.longformvideo_media_type,
          rejectionLongVidUpload: true,
        };
      } else {
        sAttachment = { ...action.payload };
      }
      return {
        ...state,
        storyAdAttachment: sAttachment,
      };
    case actionTypes.GET_UPLOAD_MEDIA_DIFFERENT_DEVICE_URL_ACCESS_CODE:
      return {
        ...state,
        uploadMediaDifferentDeviceURL: action.payload.weblink,
        uploadMediaDifferentDeviceAccessCode: action.payload.accessCode,
      };
    case actionTypes.ERROR_GET_UPLOAD_MEDIA_DIFFERENT_DEVICE_URL_ACCESS_CODE:
      return {
        ...state,
        uploadMediaDifferentDeviceURL: action.payload.weblink,
        uploadMediaDifferentDeviceAccessCode: action.payload.accessCode,
        errorUploadMediaDiffernetDevice: action.payload.error,
      };
    case actionTypes.GET_WEB_UPLOAD_LINK_MEDIA:
      return {
        ...state,
        // data: {
        //   ...state.data,
        //   media: action.payload.mediaWebLink,
        //   type: action.payload.mediaTypeWebLink
        // },
        mediaWebLink: action.payload.mediaWebLink,
        mediaTypeWebLink: action.payload.mediaTypeWebLink,
      };
    case actionTypes.ERROR_GET_WEB_UPLOAD_LINK_MEDIA:
      return {
        ...state,
        mediaWebLink: "",
        mediaTypeWebLink: "",
        webUploadLinkMediaLoading: false,
      };
    case actionTypes.GET_WEB_UPLOAD_LINK_MEDIA_LOADING:
      return {
        ...state,
        webUploadLinkMediaLoading: action.payload,
      };
    case actionTypes.SAVE_CAMPAIGN_STEP:
      return {
        ...state,
        currentCampaignSteps: action.payload,
      };
    case actionTypes.SET_CAMPAIGN_IN_PROGRESS:
      return {
        ...state,
        campaignProgressStarted: action.payload,
      };
    case actionTypes.GET_MORE_INSTAGRAM_POST:
      const list = [...state.instagramPostList, ...action.payload.imagesList];
      return {
        ...state,
        instaHasNextPage: action.payload.instaHasNextPage,
        instaEndCursor: action.payload.instaEndCursor,
        instagramPostList: list,
        loadingMoreInstaPost: false,
      };
    case actionTypes.ERROR_GET_MORE_INSTAGRAM_POST:
      return {
        ...state,
        instaHasNextPage: null,
        instaEndCursor: null,
        loadingMoreInstaPost: false,
      };
    case actionTypes.LOADING_MORE_INSTAGRAM_POST: {
      return {
        ...state,
        loadingMoreInstaPost: action.payload,
      };
    }
    case actionTypes.GET_WEB_UPLOAD_LINK_MEDIA_STORY_ADS: {
      return {
        ...state,
        mediaStoryAdsDifferentDevice: [...action.payload.adsArray],
      };
    }
    case actionTypes.UPDATE_STORY_ADS_ARRAY: {
      return {
        ...state,
        storyAdsArray: [...action.payload],
      };
    }
    case actionTypes.GET_WEB_UPLOAD_LINK_MEDIA_COLLECTION_ADS: {
      return {
        ...state,
        collectionAdMediaLinks: [...action.payload.collectionMediaArray],
        collectionMainMediaTypeWebLink:
          action.payload.collectionMainMediaTypeWebLink,
        collectionMainMediaWebLink: action.payload.collectionMainMediaWebLink,
      };
    }
    case actionTypes.SET_COLLECTION_AD_ARRAY: {
      return {
        ...state,
        collectionAdMedia: [...action.payload],
      };
    }
    case actionTypes.OVERWRITE_OBJ_DATA:
      return {
        ...state,
        data: { ...state.data, ...state.oldTempData, ...action.payload },
      };
    case actionTypes.GET_LANGUAGES_LOADING: {
      return {
        ...state,
        languagesList: [],
        languagesListLoading: action.payload,
        languagesListError: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
