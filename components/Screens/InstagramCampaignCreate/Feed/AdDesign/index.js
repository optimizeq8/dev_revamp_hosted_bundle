//Components
import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import {
  View,
  TouchableOpacity,
  Platform,
  BackHandler,
  Image as RNImage,
  I18nManager
} from "react-native";
import * as Segment from "expo-analytics-segment";
import { Content, Text, Container, Footer, Button } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

//icons
// import EyeIcon from "../../../../assets/SVGs/Eye";
// import ForwardButton from "../../../../assets/SVGs/ForwardButton";
// import InfoIcon from "../../../../assets/SVGs/InfoIcon";
// import BackButton from "../../../../assets/SVGs/BackButton";

// Style
import styles from "../../styles/adDesign.styles";

//Functions
import isEqual from "lodash/isEqual";
// import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToDP
} from "react-native-responsive-screen";
// import {
//   _handleSubmission,
//   formatMedia,
//   _changeDestination
// } from "./Functions/index";

class AdDesign extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        brand_name: "",
        headline: "",
        destination: "BLANK",
        call_to_action: { label: "BLANK", value: "BLANK" },
        attachment: "BLANK"
      },
      storyAdCards: {
        storyAdSelected: false,
        selectedStoryAd: { media: "//", call_to_action: {} }
        // numOfAds: 0
      },
      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      media: "//",
      loaded: 0,
      type: "",
      iosVideoUploaded: false,
      formatted: null,
      brand_nameError: "",
      headlineError: "",
      orientationError: "",
      mediaError: "Add media",
      swipeUpError: "",
      isVisible: false,
      mediaModalVisible: false,
      videoIsLoading: false,
      heightComponent: 0,
      creativeVideoUrl: "",
      sourceChanging: false,
      fileReadyToUpload: false,
      tempImage: "",
      tempImageloading: false,
      storyAdAttachChanged: false,
      uploadMediaDifferentDeviceModal: false,
      uploadMediaNotification: {},
      downloadMediaModal: false
    };
    this.adType = this.props.adType;
    this.selectedCampaign = this.props.rejCampaign;
    this.rejected = this.props.navigation.getParam("rejected", false);
  }

  componentWillUnmount() {
    //Switched handleBackButton to toggleAdSelection
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.toggleAdSelection
    );
  }
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.mainSafeArea}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            if (
              !this.props.currentCampaignSteps.includes(
                "InstagramFeedAdDetails"
              )
            ) {
              this.props.saveCampaignSteps([
                "Dashboard",
                "InstagramFeedAdObjective",
                "InstagramFeedAdDesign"
              ]);
            }
            Segment.screenWithProperties("Instagram Feed Ad Design", {
              category: "Campaign Creation",
              channel: "instagram"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              checkout_id: this.props.campaign_id,
              step: 3,
              business_name: this.props.mainBusiness.businessname
            });
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.instagramAds.campaign_id,
  adType: state.instagramAds.adType,
  storyAdsArray: state.instagramAds.storyAdsArray,
  loadingStoryAdsArray: state.instagramAds.loadingStoryAdsArray,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  loading: state.instagramAds.loadingDesign,
  videoUrlLoading: state.instagramAds.videoUrlLoading,
  videoUrl: state.instagramAds.videoUrl,
  collectionAdLinkForm: state.instagramAds.collectionAdLinkForm,
  adType: state.instagramAds.adType,
  collectionAdMedia: state.instagramAds.collectionAdMedia,
  storyAdAttachment: state.instagramAds.storyAdAttachment,
  mediaTypeWebLink: state.instagramAds.mediaTypeWebLink,
  mediaWebLink: state.instagramAds.mediaWebLink,
  webUploadLinkMediaLoading: state.instagramAds.webUploadLinkMediaLoading,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  admin: state.login.admin,
  collAttachment: state.instagramAds.collAttachment,
  collectionMainMediaWebLink: state.instagramAds.collectionMainMediaWebLink,
  collectionMainMediaTypeWebLink:
    state.instagramAds.collectionMainMediaTypeWebLink,
  rejCampaign: state.dashboard.rejCampaign
});

const mapDispatchToProps = dispatch => ({
  save_campaign_info_instagram: info =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),

  saveCampaignSteps: step =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDesign);
