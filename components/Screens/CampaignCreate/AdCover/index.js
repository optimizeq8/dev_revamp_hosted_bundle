//Components
import React, { Component } from "react";
import { Linking } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as ImageManipulator from "expo-image-manipulator";
import * as Segment from "expo-analytics-segment";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { View, TouchableOpacity, Platform, BackHandler } from "react-native";
import { Content, Text, Container, Footer } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Modal } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import CustomHeader from "../../../MiniComponents/Header";
import CameraLoading from "../../../MiniComponents/CameraLoading";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import PlusAddIcon from "../../../../assets/SVGs/PlusAdd";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";
import InfoIcon from "../../../../assets/SVGs/InfoIcon";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import isNull from "lodash/isNull";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import PenIconBrand from "./PenIconBrand";
import MediaButton from "../AdDesign/MediaButton";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";
import { globalColors } from "../../../../GlobalStyles";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";

class AdCover extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        logo: "//",
        coverHeadline: ""
      },
      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      cover: "//",
      loaded: 0,
      type: "",
      iosVideoUploaded: false,
      formattedCover: null,
      coverHeadlineError: "",
      orientationError: "",
      coverError: "",
      swipeUpError: "",
      isVisible: false,
      mediaModalVisible: false,
      coverLoading: false,
      videoIsLoading: false,
      heightComponent: 0,
      coverRejectionUpload: false,
      logoRejectionUpload: false,
      headlineRejectionUpload: false
    };
    this.params = this.props.navigation.state.params;
    this.selectedCampaign = this.props.navigation.getParam(
      "selectedCampaign",
      false
    );
    this.rejected = this.props.navigation.getParam("rejected", false);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  async componentDidMount() {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.rejected
          ? this.selectedCampaign.campaign_id
          : this.props.campaign_id,
        coverHeadline: this.rejected
          ? this.selectedCampaign.story_headline
          : !this.props.data
          ? "Headline"
          : this.props.data.coverHeadline
      },
      objective: this.props.data
        ? this.props.data.objective
        : this.rejected
        ? this.selectedCampaign.objective
        : ""
    });
    const { translate } = this.props.screenProps;
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        // this.onToggleModal();
        showMessage({
          message: translate(
            "Please allow access to the gallery to upload media"
          ),
          position: "top",
          type: "warning"
        });
      }
    }

    // let rep = this.state.campaignInfo;
    if (this.rejected) {
      this.setState({
        ...this.state,
        campaignInfo: {
          logo: this.selectedCampaign.story_logo_media,
          coverHeadline: this.selectedCampaign.story_headline,
          story_preview_media: this.selectedCampaign.story_preview_media
        },
        cover: this.selectedCampaign.story_preview_media
      });
    } else if (
      this.props.data &&
      Object.keys(this.state.campaignInfo)
        .map(key => {
          if (this.props.data.hasOwnProperty(key)) return true;
        })
        .includes(true)
    ) {
      let rep = { ...this.state.campaignInfo, ...this.props.data };

      this.setState({
        ...this.state,
        ...this.props.data,
        campaignInfo: {
          ...this.state.campaignInfo,
          logo: this.props.data.logo,
          coverHeadline: this.props.data.coverHeadline
        }
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  askForPermssion = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { translate } = this.props.screenProps;
    if (status !== "granted") {
      this.onToggleModal(false);
      showMessage({
        message: translate(
          "Please allow access to the gallery to upload media"
        ),
        position: "top",
        type: "warning"
      });
      Platform.OS === "ios" && Linking.openURL("app-settings:");
    }
  };

  setMediaModalVisible = visible => {
    this.setState({ mediaModalVisible: visible });
  };

  changeHeadline = coverHeadline => {
    this.setState(
      {
        campaignInfo: {
          ...this.state.campaignInfo,
          coverHeadline
        },
        coverHeadlineError: validateWrapper("mandatory", coverHeadline),
        headlineRejectionUpload: true
      },
      this.props.save_campaign_info({
        coverHeadline,
        headlineRejectionUpload: true
      })
    );
  };
  pick = async mediaTypes => {
    await this.askForPermssion();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes,
      base64: false,
      exif: false,
      quality: 0.8
    });

    // this.onToggleModal(true);
    return result;
  };

  _pickLogo = async () => {
    let logo = await this.pick("Images");
    const { translate } = this.props.screenProps;
    if (!logo.cancelled) {
      let correctLogo = logo.width === 993 && logo.height === 284;
      let logoFormat =
        logo.uri.split("/ImagePicker/")[1].split(".")[1] === "png";
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          logo: correctLogo && logoFormat ? logo.uri : ""
        },
        logoError: correctLogo || logoFormat,
        logoRejectionUpload: correctLogo && logoFormat
      });
      showMessage({
        message:
          correctLogo && logoFormat
            ? translate("Logo selected successfully")
            : translate("Logo must be exactly 993px by 284px"),
        description:
          correctLogo && logoFormat
            ? ""
            : translate("In png format and transparent background"),
        position: "top",
        duration: correctLogo ? 2000 : 10000,
        type: correctLogo ? "success" : "warning"
      });

      this.props.save_campaign_info({
        logo: correctLogo && logoFormat ? logo.uri : "",
        logoRejectionUpload: correctLogo && logoFormat
      });
    }
  };

  _pickImage = async (mediaTypes = "All") => {
    try {
      const { translate } = this.props.screenProps;
      let result = await this.pick(mediaTypes);
      let file = await FileSystem.getInfoAsync(result.uri, {
        size: true
      });
      this.setMediaModalVisible(false);
      this.setState({ directory: "/ImagePicker/" });
      if (!result.cancelled) {
        if (result.type === "image") {
          if (result.width > 360 && result.height > 600) {
            ImageManipulator.manipulateAsync(
              result.uri,
              [
                {
                  resize:
                    result.width >= (result.height / 5) * 3
                      ? {
                          height: 600
                        }
                      : {
                          width: 360
                        }
                }
              ],
              {
                compress: 1,
                format: "png"
              }
            )
              .then(async manipResult => {
                manipResult = await ImageManipulator.manipulateAsync(
                  manipResult.uri,
                  [
                    {
                      crop: {
                        originX: Math.floor((manipResult.width - 360) / 2),
                        originY: Math.floor((manipResult.height - 600) / 2),
                        width: 360,
                        height: 600
                      }
                    }
                  ],
                  {
                    compress: 1,
                    format: "png"
                  }
                );

                this.setState({
                  directory: "/ImageManipulator/"
                });
                result.uri = manipResult.uri;
                result.height = manipResult.height;
                result.width = manipResult.width;
                file = await FileSystem.getInfoAsync(result.uri, {
                  size: true
                });
              })
              .then(() => {
                if (file.size > 2000000) {
                  this.onToggleModal(false);
                  showMessage({
                    message: translate(
                      "Image must be less than {{fileSize}} MBs",
                      { fileSize: 2 }
                    ),
                    position: "top",
                    type: "warning"
                  });

                  return;
                }
                this.setState({
                  cover: result.uri,
                  type: result.type.toUpperCase(),
                  coverError: null,
                  result: result.uri,
                  coverRejectionUpload: true
                });
                this.onToggleModal(false);
                showMessage({
                  message: translate("Image has been selected successfully"),
                  position: "top",
                  type: "success"
                });
                this.props.save_campaign_info({
                  cover: result.uri,
                  coverRejectionUpload: true
                });
              })
              .catch(error => {
                this.onToggleModal(false);
                showMessage({
                  message: translate("Please choose an image"),
                  position: "top",
                  type: "warning"
                });
                // console.log("ImageManipulator err", error);
                return;
              });
            return;
          } else if (file.size > 2000000) {
            this.onToggleModal(false);
            showMessage({
              message: translate("Image must be less than {{fileSize}} MBs", {
                fileSize: 2
              }),
              position: "top",
              type: "warning"
            });
            return;
          } else if (
            Math.floor(result.width / 3) !== Math.floor(result.height / 5) ||
            result.width < 360 ||
            result.height < 600
          ) {
            this.onToggleModal(false);
            showMessage({
              message: translate(
                "Image's aspect ratio must be 3:5 with a minimum size of 360px by 600px"
              ),
              position: "top",
              type: "warning"
            });
            return;
          } else {
            this.setState({
              ...this.state,
              cover: result.uri,
              type: result.type.toUpperCase(),
              coverError: null,
              result: result.uri
            });
            this.onToggleModal(false);
            showMessage({
              message: translate("Image has been selected successfully"),
              position: "top",
              type: "success"
            });
            this.props.save_campaign_info({
              cover: result.uri
            });
            return;
          }
        } else {
          showMessage({
            message: translate("Please make sure the image is in png format"),
            position: "top",
            type: "warning"
          });
        }
      } else if (!result.cancelled && isNull(this.state.cover)) {
        showMessage({
          message: translate("Please choose a media file"),
          position: "top",
          type: "warning"
        });
        this.onToggleModal(false);
        return;
      } else if (result.cancelled) {
        this.onToggleModal(false);
        return;
      }
    } catch (error) {
      this.onToggleModal(false);
      // console.log("error cover pick", error);
    }
  };

  formatMedia() {
    var body = new FormData();
    if (this.state.coverRejectionUpload) {
      let res = this.state.cover.split("/");
      res = res[res.length - 1];
      let format = res.split(".");
      var cover = {
        uri: this.state.cover,
        type: "IMAGE" + "/" + format[1],
        name: res
      };
      body.append("preview_media", cover);
    }
    if (this.state.logoRejectionUpload) {
      let logoRes = this.state.campaignInfo.logo.split("/");
      logoRes = logoRes[logoRes.length - 1];
      let formatLogo = logoRes.split(".");
      var logo = {
        uri: this.state.campaignInfo.logo,
        type: "IMAGE" + "/" + formatLogo[1],
        name: logoRes
      };
      body.append("logo_media", logo);
    }
    body.append(
      "campaign_id",
      this.props.campaign_id || this.selectedCampaign.campaign_id
    );

    body.append("headline", this.state.campaignInfo.coverHeadline);
    body.append(
      "preview_media_upload",
      this.state.coverRejectionUpload ? 1 : 0
    );
    body.append("logo_media_upload", this.state.logoRejectionUpload ? 1 : 0);

    this.rejected &&
      this.selectedCampaign &&
      body.append("preview_media_id", this.selectedCampaign.story_preview_id);

    this.setState({
      formattedCover: body
    });
  }

  validator = () => {
    const coverHeadlineError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.coverHeadline
    );
    const coverError = validateWrapper("mandatory", this.state.cover);
    const logoError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.logo
    );
    const { translate } = this.props.screenProps;
    (coverError || logoError) &&
      showMessage({
        message: coverError
          ? translate("Please add a cover image")
          : logoError
          ? translate("Please add a logo")
          : "",
        type: coverError || logoError ? "warning" : "",
        position: "top"
      });
    this.setState({
      coverHeadlineError,
      coverError,
      logoError
    });
  };

  _getUploadState = loading => {
    this.setState({
      loaded: loading
    });
  };
  _handleSubmission = async () => {
    await this.validator();

    if (
      !this.state.coverHeadlineError &&
      !this.state.logoError &&
      !this.state.coverError
    ) {
      Segment.trackWithProperties("Ad Cover Submitted", {
        business_name: this.props.mainBusiness.businessname
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        checkout_id: this.props.campaign_id,
        step: 2,
        business_name: this.props.mainBusiness.businessname
      });
      await this.handleUpload();
      await this.formatMedia();
      if (
        (this.rejected &&
          (this.state.logoRejectionUpload ||
            this.state.coverRejectionUpload ||
            this.state.headlineRejectionUpload)) ||
        (!this.rejected &&
          this.props.data &&
          (!this.props.data.hasOwnProperty("formattedCover") ||
            JSON.stringify(this.props.data.formattedCover) !==
              JSON.stringify(this.state.formattedCover)))
      ) {
        if (!this.props.coverLoading) {
          await this.props.uploadStoryAdCover(
            this.state.formattedCover,
            this._getUploadState,
            this.props.navigation,
            this.onToggleModal,
            this.rejected,
            this.state.signal,
            this.selectedCampaign
          );
        }
      } else {
        this.props.navigation.push("AdDesign", {
          rejected: this.rejected,
          selectedCampaign: this.selectedCampaign
        });
      }
    }
  };
  onToggleModal = visibile => {
    this.setState({ isVisible: visibile });
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) {
      this.state.signal.cancel("Upload Cancelled");
    }
  };
  handleSupportPage = () => {
    const { translate } = this.props.screenProps;
    this.props.navigation.push("WebView", {
      url: "https://www.optimizeapp.com/support",
      title: "Support"
    });
  };
  render() {
    let { cover, coverHeadlineError, formattedCover } = this.state;

    let { coverHeadline, logo } = this.state.campaignInfo;
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.mainSafeArea}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            if (!this.props.currentCampaignSteps.includes("AdDesign")) {
              this.props.saveCampaignSteps([
                "Dashboard",
                "AdObjective",
                "AdCover"
              ]);
            }
            Segment.screenWithProperties("Snap Ad Design", {
              category: "Campaign Creation"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              checkout_id: this.props.campaign_id,
              step: 3,
              business_name: this.props.mainBusiness.businessname
            });
          }}
        />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <Container style={styles.container}>
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Ad Design Back Button",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title={"Compose Ad"}
          />
          <Content contentContainerStyle={styles.contentContainer} padder>
            <KeyboardShift>
              {() => (
                <>
                  <View style={styles.buttonN}>
                    <View style={styles.placeholder}>
                      <RNImageOrCacheImage
                        media={cover}
                        style={styles.placeholder1}
                        resizeMode="cover"
                      />

                      {logo ? (
                        <TouchableOpacity
                          onPress={() => this._pickLogo()}
                          style={styles.changeLogoStyle}
                        >
                          <RNImageOrCacheImage
                            media={logo}
                            style={{
                              height: "100%",
                              width: "100%",
                              alignSelf: "center"
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            style={{
                              color: globalColors.orange,
                              fontFamily: "montserrat-medium",
                              alignSelf: "center",
                              marginTop: 10
                            }}
                          >
                            {translate("Edit logo")}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => this._pickLogo()}
                          style={styles.addLogoStyle}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center"
                            }}
                          >
                            <PlusAddIcon />
                            <Text
                              style={{
                                color: globalColors.orange,
                                fontFamily: "montserrat-bold"
                              }}
                            >
                              {translate("Your Logo")}
                            </Text>
                            <Text style={styles.addLogoTextStyle}>
                              {translate(
                                "Must be 993px by 284px and transparent"
                              )}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={this.handleSupportPage}
                          style={{
                            position: "absolute",
                            right: "5%",
                            bottom: 15
                          }}
                        >
                          <InfoIcon />
                        </TouchableOpacity>
                        <PenIconBrand
                          style={{ justifyContent: "flex-start" }}
                          data={this.props.data}
                          coverHeadlineError={coverHeadlineError}
                          changeHeadline={this.changeHeadline}
                          coverHeadline={coverHeadline}
                          field={"Headline"}
                          mainBusiness={this.props.mainBusiness}
                          rejected={this.rejected}
                          screenProps={this.props.screenProps}
                        />
                      </View>
                      <MediaButton
                        type={"cover"}
                        cover={true}
                        _pickImage={this._pickImage}
                        image={this.state.cover}
                        media={this.state.cover}
                        screenProps={this.props.screenProps}
                      />
                    </View>
                  </View>
                </>
              )}
            </KeyboardShift>
            <Text
              style={[
                styles.subText,
                {
                  // bottom: -10
                }
              ]}
            >
              {translate(
                "The cover shows on the\nDiscover page among\nsubscriptions and trending content"
              )}
            </Text>
          </Content>

          <Footer style={styles.footerStyle}>
            {cover ? (
              <View style={styles.footerButtonsContainer}>
                <TouchableOpacity
                  onPress={this._handleSubmission}
                  style={styles.button}
                >
                  <ForwardButton width={wp(24)} height={hp(8)} />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                {translate("Please add media to proceed")}
              </Text>
            )}
          </Footer>
        </Container>

        <Modal
          visible={this.props.coverLoading || this.state.isVisible}
          onDismiss={() => this.onToggleModal(false)}
          animationType={"slide"}
        >
          <BlurView intensity={95} tint="dark">
            <SafeAreaView
              forceInset={{ top: "always" }}
              style={styles.loadingSafeArea}
            >
              {this.props.coverLoading && (
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => this.cancelUpload()}
                  title={"Uploading Image"}
                />
              )}
              {!this.props.coverLoading && (
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => this.onToggleModal(false)}
                />
              )}

              <CameraLoading center={true} />
              {this.props.coverLoading && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.uplaodPercentage}>
                    {Math.round(this.state.loaded, 2)}%
                  </Text>

                  <Text style={styles.uplaodText}>
                    {translate(
                      "Please make sure not to close the app or lock the phone while uploading"
                    )}
                  </Text>
                </View>
              )}
            </SafeAreaView>
          </BlurView>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  storyAdCover: state.campaignC.storyAdCover,
  coverLoading: state.campaignC.coverLoading,
  currentCampaignSteps: state.campaignC.currentCampaignSteps
});

const mapDispatchToProps = dispatch => ({
  uploadStoryAdCover: (
    info,
    loading,
    navigation,
    onToggleModal,
    rejected,
    cancelUpload,
    selectedCampaign
  ) =>
    dispatch(
      actionCreators.uploadStoryAdCover(
        info,
        loading,
        navigation,
        onToggleModal,
        rejected,
        cancelUpload,
        selectedCampaign
      )
    ),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  saveCampaignSteps: step => dispatch(actionCreators.saveCampaignSteps(step))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdCover);
