//Components
import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import {
  View,
  Animated,
  TouchableOpacity,
  BackHandler,
  Image as RNImage,
  Text,
  FlatList,
} from "react-native";
import analytics from "@segment/analytics-react-native";

import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

// Style
import styles from "../../styles/adDesign.styles";
import previewStyles from "../../styles/adFeedReview.styles";

import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";
import LowerButton from "../../../../MiniComponents/LowerButton";
import GradientButton from "../../../../MiniComponents/GradientButton";

import { heightPercentageToDP } from "react-native-responsive-screen";

//ICONS

import ArchiveOutline from "../../../../../assets/SVGs/ArchiveOutline";
import CommentOutline from "../../../../../assets/SVGs/CommentOutline";
import SendArrowOutline from "../../../../../assets/SVGs/SendArrowOutline";
import HeartOutline from "../../../../../assets/SVGs/HeartOutline";
import ArrowUp from "../../../../../assets/SVGs/ArrowUp";
import { globalColors } from "../../../../../GlobalStyles";

class InstagramAdDesignExistingPost extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        media_option: "single", // Oneof[ "single, carousel"]
        destination: "BLANK",
        link: "",
        call_to_action: { label: "BLANK", value: "BLANK" },
        attachment: "BLANK",
        message: "",
        media_type: "",
      },
      showPreview: false,
      selectedPost: {},
      fileReadyToUpload: false,
      carouselAdCards: {
        carouselAdSelected: false,
        selectedCarouselAd: { media: "//", call_to_action: {} },
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
      media_type: "",
      formatted: null,
      messageError: null,
      mediaError: "Add media",
      swipeUpError: "",
      isVisible: false,
      expanded: false,
      animation: new Animated.Value(100),
      isVideoLoading: false,
      mediaModalVisible: false,
      uneditedImageUri: "",
      serialization: null,
    };
  }

  componentWillUnmount() {
    //Switched handleBackButton to toggleAdSelection
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.toggleAdSelection
    );
  }
  componentDidMount() {
    this.props.getInstagramExistingPost(this.props.mainBusiness.businessid);
    if (this.props.data) {
      let {
        media_option = "single",
        link,
        call_to_action,
        attachment,
        message = "",
        media_type,
        media = "//",
        fileReadyToUpload,
      } = this.props.data;
      let destination = "";
      if (
        this.props.data.destination &&
        this.props.data.destination !== "BLANK"
      ) {
        destination = this.props.data.destination;
      } else {
        switch (this.props.data.objective) {
          case "BRAND_AWARENESS":
            destination = "BLANK";
            break;
          case "LINK_CLICKS":
            destination = "link";
            break;
          case "LEAD_GENERATION":
            destination = "link";
            break;
          case "APP_INSTALLS":
            destination = "app_install";
            break;
          case "VIDEO_VIEWS":
            destination = "BLANK";
            break;
          default:
            destination = "BLANK";
        }
      }
      this.setState({
        campaignInfo: {
          ...this.props.data,
          media_option, // Oneof[ "single, caraousel"]
          destination,
          link,
          call_to_action,
          attachment,
          message,
          media_type,
        },
        media_type,
        media,
        fileReadyToUpload,
      });
      this.props.save_campaign_info_instagram({
        destination,
      });
    }
  }
  toggle = () => {
    Animated.timing(this.state.animation, {
      toValue: !this.state.expanded ? 100 : 1,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
  };
  selectImageOption = (media_option) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        media_option,
      },
    });
    this.props.save_campaign_info_instagram({
      media_option,
    });
  };
  setTheState = (state) => {
    this.setState({ ...state });
  };
  videoIsLoading = (value) => {
    this.setState({
      isVideoLoading: value,
    });
  };
  _getUploadState = (loading) => {
    this.setState({
      loaded: loading,
    });
  };

  validator = () => {
    const { translate } = this.props.screenProps;
    const messageError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.message
    );

    const mediaError =
      this.state.campaignInfo.media_option === "single" &&
      this.state.media === "//";

    let swipeUpError = null;
    if (
      this.props.data.objective !== "BRAND_AWARENESS" &&
      this.props.data.objective !== "VIDEO_VIEWS" &&
      this.props.data &&
      this.props.data.call_to_action &&
      this.props.data.call_to_action.label === "BLANK"
    ) {
      showMessage({
        message: translate("Choose A Swipe Up Destination"),
        position: "top",
        type: "warning",
      });
      swipeUpError = "Choose A Swipe Up Destination";
    }

    if (messageError) {
      showMessage({
        message: translate("Please add caption to proceed"),
        position: "top",
        type: "warning",
      });
    }
    if (mediaError) {
      showMessage({
        message: translate("Please add media to proceed"),
        position: "top",
        type: "warning",
      });
    }

    this.setState({
      messageError,
      mediaError,
      swipeUpError,
    });

    return !mediaError && !swipeUpError && !messageError;
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };
  finalSubmission = async () => {
    await this.validator();
    if (
      !this.state.mediaError &&
      !this.state.messageError &&
      !this.state.swipeUpError
    ) {
      await formatMedia(
        this.state.media,
        this.state.media_type,
        this.props.mainBusiness,
        this.state.campaignInfo,
        this.props.data,
        this.setTheState,
        this.props.data.objective,
        this.props.carouselAdsArray,
        false,
        this.state.fileReadyToUpload
      );
      await this.handleUpload();

      if (
        (this.props.data && !this.props.data.hasOwnProperty("formatted")) ||
        JSON.stringify(this.props.data.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        const segmentInfo = {
          campaign_channel: "instagram",
          campaign_ad_type: "InstagramFeedAd",
          campaign_id: this.props.data.campaign_id,
          campaign_business_name: this.state.campaignInfo.brand_name,
          campaign_caption: this.state.campaignInfo.headline,
          campaign_attachment: this.state.campaignInfo.attachment,
          campaign_swipe_up_CTA: this.state.campaignInfo.call_to_action,
          campaign_swipe_up_destination: this.state.campaignInfo.destination,
          campaign_media: this.state.media,
          campaign_media_type: this.state.type,
          // campaign_appChoice: this.state.appChoice,
        };
        if (!this.props.loading) {
          await this.props.saveBrandMediaInstagram(
            "InstagramFeedAdTargetting",
            this.state.formatted,
            this._getUploadState,
            this.onToggleModal,
            this.state.signal,
            segmentInfo
          );
        }
      } else {
        this.props.navigation.navigate("InstagramFeedAdTargetting", {
          source: "ad_design",
          source_action: "a_submit_ad_design",
        });
      }
    }
  };
  handleCaptionExpand = (value) => {
    analytics.track(`instagram_caption`, {
      visibile: value,
      source: "ad_design",
      source_action: "a_toggle_caption",
    });
    this.setState(
      {
        expanded: value,
      },
      () => {
        this.toggle();
      }
    );
  };
  handleReview = async () => {
    const noError = this.validator();

    analytics.track(`a_preview_ad`, {
      source: "ad_design",
      source_action: "a_preview_ad",
      action_status: noError ? "success" : "failure",
      campaign_channel: "instagram",
      campaign_ad_type: "InstagramFeedAd",
    });
    if (noError) {
      this.props.navigation.navigate("AdFeedDesignReview", {
        source: "ad_objective",
        source_action: "a_preview_ad",
      });
    }
  };
  _handlecarouselAdCards = (card) => {
    this.setState({ sourceChanging: true });
    this.setState({
      ...this.state,
      carouselAdCards: {
        ...this.state.carouselAdCards,
        carouselAdSelected: true,
        selectedCarouselAd: { ...card },
      },
      type: card.media_type,
      sourceChanging: false,
    });
    this.setMediaModalVisible(true);
  };

  setMediaModalVisible = (visibile) => {
    this.setState({ mediaModalVisible: visibile });
  };

  adDesignPickImage = (mediaTypes, mediaEditor, editImage) => {
    if (this.props.data.objective === "VIDEO_VIEWS") {
      mediaTypes = "Videos";
    }
    _pickImage(
      mediaTypes,
      this.props.save_campaign_info_instagram,
      this.setTheState,
      this.props.screenProps,
      this.setMediaModalVisible,
      mediaEditor,
      editImage,
      this.videoIsLoading,
      this.state.carouselAdCards,
      this.props.carouselAdsArray,
      this.state.campaignInfo.media_option
      // this.adType,
      // this.rejected,
    );
  };
  renderEachPost = (item) => {
    const product = item.item;
    return (
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          // borderWidth: 2,
          margin: 5,
          borderRadius: 20,
          overflow: "hidden",
        }}
        onPress={() => {
          this.setState({
            selectedPost: item.item,
            showPreview: true,
          });
        }}
      >
        <RNImage
          style={{
            width: 70,
            height: 70,
          }}
          source={{ uri: product.full_picture }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  };
  onDidFocus = () => {
    if (!this.props.currentCampaignSteps.includes("InstagramFeedAdDetails")) {
      this.props.saveCampaignSteps([
        "Dashboard",
        "InstagramFeedAdObjective",
        "InstagramAdDesignExistingPost",
      ]);
    }
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    analytics.track(`ad_design`, {
      source,
      source_action,
      campaign_channel: "instagram",
      campaign_ad_type: "InstagramFeedAd",
      campaign_name: this.props.data.name,
      campaign_id: this.props.data.campaign_id,
      campaign_objective: this.props.data.objective,
      campaign_duration:
        Math.ceil(
          (new Date(this.props.data.end_time) -
            new Date(this.props.data.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_start_date: this.props.data.start_time,
      campaign_end_date: this.props.data.end_time,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    console.log("paging", this.props.paging);
    var { media, mediaModalVisible, media_type, carouselAdCards } = this.state;
    //Added checking for data becuase when going to successRedirect, data turns to null and crashs the app on this screen
    if (
      this.props.data &&
      this.props.data.media &&
      this.props.data.media !== "//"
    ) {
      media = this.props.data.media;
    }
    console.log("slectpost", this.state.selectedPost);
    return (
      <View style={styles.safeAreaView}>
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <TopStepsHeader
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "Instagram Feed Ad Design Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "ad_design",
            source_action: "a_go_back",
          }}
          icon="instagram"
          currentScreen="Compose"
          navigation={this.props.navigation}
          title={"Compose"}
        />
        {!this.state.showPreview && (
          <View
            style={{
              height: heightPercentageToDP(70),
              backgroundColor: "rgba(0,0,0,0.16)",
              marginHorizontal: 15,
              borderRadius: 20,
              marginVertical: 15,
            }}
          >
            <View style={styles.profileBsnNameView}>
              <RNImage
                style={styles.businessProfilePic}
                source={{
                  uri: this.state.campaignInfo.instagram_profile_pic,
                }}
              />
              <View style={styles.bsnNameView}>
                <Text style={styles.businessNameText}>
                  {translate("Business Name")}
                </Text>
                <Text style={styles.businessName}>
                  {this.state.campaignInfo.instagram_business_name}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                fontFamily: "montserrat-regular",
                paddingHorizontal: 20,
              }}
            >
              Select a post to promote
            </Text>
            <FlatList
              data={this.props.instagramExistingPost}
              renderItem={this.renderEachPost}
              numColumns={4}
              style={
                {
                  // alignItems: "center",
                }
              }
              contentContainerStyle={{
                display: "flex",
                marginBottom: heightPercentageToDP(20),
                justifyContent: "space-around",
                alignItems: "center",
              }}
            />
            <TouchableOpacity>
              <Text> LOAD MORE</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.showPreview && (
          <View>
            <View style={previewStyles.container}>
              <View style={previewStyles.profilePicView}>
                <RNImage
                  style={{ borderRadius: 20 }}
                  width={32}
                  height={32}
                  source={{
                    uri: this.state.campaignInfo.instagram_profile_pic,
                  }}
                />
                <View style={previewStyles.detailProfileView}>
                  <Text style={previewStyles.instagramBusinessName}>
                    {this.state.campaignInfo.instagram_business_name}
                  </Text>
                  <Text style={previewStyles.sponsoredText}>
                    {translate("Sponsored")}
                  </Text>
                </View>
                <View style={previewStyles.dotView}>
                  <Text style={previewStyles.dot}>.</Text>
                  <Text style={previewStyles.dot}>.</Text>
                  <Text style={previewStyles.dot}>.</Text>
                </View>
              </View>
              <View style={previewStyles.mediaViewExist}>
                <RNImage
                  style={previewStyles.imagePreview}
                  source={{
                    uri: this.state.selectedPost.full_picture,
                  }}
                />
              </View>
              {/* {(call_to_action.value || call_to_action) !== "BLANK" && (
              <View style={previewStyles.swipeUpView}>
                <Text style={previewStyles.callToActionText}>
                  {call_to_action.hasOwnProperty("label")
                    ? translate(call_to_action.label)
                    : translate(call_to_action.replace("_", " "))}
                </Text>
                <ArrowBlueForward
                  style={[previewStyles.icon, previewStyles.archiveIcon, previewStyles.forwadIcon]}
                />
              </View>
            )} */}
              <View style={previewStyles.iconView}>
                <HeartOutline style={previewStyles.icon} />
                <CommentOutline style={previewStyles.icon} />
                <SendArrowOutline style={previewStyles.icon} />
                {/* {this.state.media_option === "carousel" && (
                <Pagination
                  containerStyle={previewStyles.paginationContainerStyle}
                  dotsLength={carouselAdsArray.length}
                  activeDotIndex={this.state.activeSlide}
                  dotStyle={previewStyles.paginationDotStyle}
                  dotColor={"#0095f6"}
                  inactiveDotColor={"rgba(0, 0, 0, 0.2)"}
                  inactiveDotOpacity={1}
                  inactiveDotScale={1}
                />
              )} */}
                <ArchiveOutline
                  style={[previewStyles.icon, previewStyles.archiveIcon]}
                />
              </View>
              {/* <View style={previewStyles.likeView}>
              <HeartFilled style={previewStyles.icon} /> */}
              <Text style={[previewStyles.likeView, previewStyles.likeText]}>
                508 likes
              </Text>
              {/* </View> */}
              <Text
                style={[
                  previewStyles.businessNameText,
                  previewStyles.captionTextExist,
                ]}
              >
                {this.state.campaignInfo.instagram_business_name}

                <Text style={[previewStyles.captionText]}>
                  {` `}
                  {this.state.selectedPost.message}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("InstagramSwipeUpDestination", {
                  source: "ad_objective",
                  source_action: "a_swipe_up_destination",
                })
              }
              style={styles.destinationView}
              disabled={this.props.loading}
            >
              <ArrowUp stroke={globalColors.orange} />
              <Text style={styles.destinationText}>
                {this.props.data &&
                this.props.data.link &&
                this.props.data.link !== "BLANK" &&
                ["link", "BLANK", "app_install"].includes(
                  this.state.campaignInfo.destination
                )
                  ? this.state.campaignInfo.destination === "link" ||
                    (this.props.data.objective === "BRAND_AWARENESS" &&
                      this.state.campaignInfo.destination === "BLANK")
                    ? translate("Website")
                    : this.state.campaignInfo.destination === "app_install"
                    ? translate("App Installs")
                    : this.props.data.objective === "VIDEO_VIEWS"
                    ? translate("Video Views")
                    : translate("Click destination")
                  : translate("Click destination")}
              </Text>
              {this.props.data &&
              this.props.data.link &&
              this.props.data.link !== "BLANK" &&
              (this.state.campaignInfo.destination === "link" ||
                this.state.campaignInfo.destination === "BLANK") ? (
                <Text style={styles.websiteLink}>{this.props.data.link}</Text>
              ) : null}
            </TouchableOpacity>

            <View style={styles.lowerBtn}>
              {this.props.loading ? (
                <View
                  style={{
                    width: "45%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.uploadingText}>
                    {translate("Uploading")}
                  </Text>
                  <View>
                    <AnimatedCircularProgress
                      size={50}
                      width={5}
                      fill={Math.round(this.state.loaded)}
                      rotation={360}
                      lineCap="round"
                      tintColor={globalColors.orange}
                      backgroundColor="rgba(255,255,255,0.3)"
                      adDetails={false}
                    />
                    <Text style={styles.uplaodPercentageText}>
                      {Math.round(this.state.loaded, 2)}
                      <Text style={styles.percentage}>%</Text>
                    </Text>
                  </View>
                </View>
              ) : (
                <LowerButton
                  screenProps={this.props.screenProps}
                  text={"Next"}
                  width={12}
                  height={12}
                  style={styles.lowerBtnWidth}
                  function={() =>
                    _handleSubmission(
                      this.state.campaignInfo.media_option,
                      this.props.carouselAdsArray,
                      this.state.carouselAdCards,
                      formatCarouselAd,
                      this.validator,
                      this.finalSubmission,
                      this.setTheState,
                      {
                        //for formatCarouselAd
                        campaignInfo: this.state.campaignInfo,
                        // selectedCampaign: this.selectedCampaign,
                        campaign_id: this.props.campaign_id,
                        // rejected: this.rejected,
                        handleUpload: this.handleUpload,
                        signal: this.state.signal,
                        uploadCarouselAdCard: this.props.uploadCarouselAdCard,
                      },
                      this.props.screenProps
                    )
                  }
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  loading: state.instagramAds.loadingDesign,
  videoUrlLoading: state.instagramAds.videoUrlLoading,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  admin: state.login.admin,
  rejCampaign: state.dashboard.rejCampaign,
  carouselAdsArray: state.instagramAds.carouselAdsArray,
  loadingCarouselAdsArray: state.instagramAds.loadingCarouselAdsArray,
  instagramExistingPost: state.instagramAds.instagramExistingPost,
  paging: state.instagramAds.paging,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  saveBrandMediaInstagram: (
    naigationPath,
    info,
    loading,
    onToggleModal,
    cancelUpload,
    segmentInfo
  ) =>
    dispatch(
      actionCreators.saveBrandMediaInstagram(
        naigationPath,
        info,
        loading,
        onToggleModal,
        cancelUpload,
        segmentInfo
      )
    ),
  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),
  uploadCarouselAdCard: (
    info,
    card,
    cancelUpload,
    iosUploadVideo,
    rejected,
    finalSubmission
  ) =>
    dispatch(
      actionCreators.uploadCarouselAdCard(
        info,
        card,
        cancelUpload,
        iosUploadVideo,
        rejected,
        finalSubmission
      )
    ),
  getInstagramExistingPost: (businessid) =>
    dispatch(actionCreators.getInstagramExistingPost(businessid)),
  saveInstgramExistpost: (
    path,
    info,
    loading,
    onToggleModal,
    cancelUpload,
    segmentInfo
  ) =>
    dispatch(
      actionCreators.saveInstgramExistpost(
        path,
        info,
        loading,
        onToggleModal,
        cancelUpload,
        segmentInfo
      )
    ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramAdDesignExistingPost);
