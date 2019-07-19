//Components
import React, { Component } from "react";
import { Linking } from "expo";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as WebBrowser from "expo-web-browser";
import * as ImageManipulator from "expo-image-manipulator";
import * as Segment from "expo-analytics-segment";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler
} from "react-native";
import {
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Footer,
  Icon
} from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { Modal } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import CustomHeader from "../../../MiniComponents/Header";
import CameraLoading from "../../../MiniComponents/CameraLoading";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import MediaModal from "../AdDesign/MediaModal";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import PenIcon from "../../../../assets/SVGs/Pen.svg";
import EyeIcon from "../../../../assets/SVGs/Eye";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";
const transparentImage = require("../../../../assets/images/emptyPlaceHolder.png");
// Style
import styles from "./styles";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import isNull from "lodash/isNull";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToDP
} from "react-native-responsive-screen";
import PenIconBrand from "./PenIconBrand";
import SwipeUpComponent from "./SwipeUpComponent";
import MediaButton from "./MediaButton";

class AdCover extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        logo: "",
        coverHeadline: ""
      },
      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      cover: "",
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
      heightComponent: 0
    };
    this.params = this.props.navigation.state.params;
    this.rejected =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.rejected;
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
          ? this.params.campaign_id
          : this.props.campaign_id,
        coverHeadline: !this.props.data
          ? this.rejected
            ? this.params.coverHeadline
            : "Headline"
          : this.props.data.coverHeadline
      },
      objective: this.props.data
        ? this.props.data.objective
        : this.rejected
        ? this.params.objective
        : ""
    });

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        // this.onToggleModal();
        showMessage({
          message: "Please allow access to the gallary to upload media.",
          position: "top",
          type: "warning"
        });
      }
    }
    let rep = this.state.campaignInfo;
    if (
      Object.keys(this.state.campaignInfo)
        .map(key => {
          if (this.props.data.hasOwnProperty(key)) return true;
        })
        .includes(true)
    ) {
      rep = { ...this.state.campaignInfo, ...this.props.data };

      this.setState({
        ...this.state,
        campaignInfo: {
          // ...this.state.campaignInfo,
          // brand_name: this.props.data.brand_name,
          // headline: this.props.data.headline,
          // destination: rep.destination ? rep.destination : "BLANK",
          // call_to_action: rep.call_to_action,
          // attachment: rep.attachment
          ...rep
        },
        cover: rep.cover,
        objective: rep.objective
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  askForPermssion = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      this.onToggleModal(false);
      showMessage({
        message: "Please allow access to the gallary to upload media.",
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
        coverHeadlineError: validateWrapper("mandatory", coverHeadline)
      },
      this.props.save_campaign_info({ coverHeadline })
    );
  };
  pick = async mediaTypes => {
    await this.askForPermssion();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes,
      base64: false,
      exif: false,
      quality: 0.1
    });

    // this.onToggleModal(true);
    return result;
  };

  _pickLogo = async () => {
    let logo = await this.pick("Images");

    if (!logo.cancelled) {
      let correctLogo = logo.width === 993 && logo.height === 284;
      let logoFormat =
        logo.uri.split("/ImagePicker/")[1].split(".")[1] === "png";
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          logo: correctLogo && logoFormat ? logo.uri : ""
        },
        logoError: correctLogo || logoFormat
      });
      showMessage({
        message:
          correctLogo && logoFormat
            ? "Logo selected successfully"
            : "Logo must be exactly 993px by 284px",
        description:
          correctLogo && logoFormat
            ? ""
            : "In .png format and transparent background.",
        position: "top",
        duration: correctLogo ? 2000 : 10000,
        type: correctLogo ? "success" : "warning"
      });

      this.props.save_campaign_info({
        logo: correctLogo && logoFormat ? logo.uri : ""
      });
    }
  };

  _pickImage = async (mediaTypes = "All") => {
    try {
      let result = await this.pick(mediaTypes);
      let file = await FileSystem.getInfoAsync(result.uri, {
        size: true
      });
      this.setMediaModalVisible(false);
      this.setState({ directory: "/ImagePicker/" });
      let newWidth = result.width;
      let newHeight = result.height;
      await this.validator();

      if (!result.cancelled) {
        if (result.type === "image") {
          // console.log("oineboin", result.uri);

          if (result.width > 360 && result.height > 600) {
            if (result.width >= Math.floor((result.height / 5) * 3)) {
              newWidth = Math.floor((result.height / 5) * 3);
            } else if (result.height >= Math.floor((result.width * 5) / 3)) {
              newHeight = Math.floor((result.width * 5) / 3);
            } else {
              newWidth = 360;
              newHeight = 600;
            }
            // console.log("image res:", result);
            // console.log("width:", newWidth);
            // console.log("height:", newHeight);
            ImageManipulator.manipulateAsync(
              result.uri,
              [
                {
                  crop: {
                    originX: (result.width - newWidth) / 2,
                    originY: (result.height - newHeight) / 2,
                    width: newWidth,
                    height: newHeight
                  }
                  // resize: {
                  //   width: Math.floor((result.width / result.height) * 600)
                  //   // height: Math.floor((result.height / result.width) * 360)
                  // }
                }
              ],
              {
                compress: 1,
                format: "png"
              }
            )
              .then(async manipResult => {
                // console.log("promise", manipResult);
                // const newSize = await FileSystem.getInfoAsync(manipResult.uri, {
                //   size: true
                // });
                // const oldSize = await FileSystem.getInfoAsync(result.uri, {
                //   size: true
                // });
                // console.log("mani:", manipResult);
                // console.log("height:", manipResult.height);
                // console.log("new result: ", newSize.size);
                // console.log("old result: ", oldSize.size);

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
                  this.setState({
                    cover: ""
                  });
                  this.onToggleModal(false);
                  showMessage({
                    message: "Image must be less than 2 MBs",
                    position: "top",
                    type: "warning"
                  });
                  this.props.save_campaign_info({
                    cover: ""
                  });
                  return;
                }
                this.setState({
                  cover: result.uri,
                  type: result.type.toUpperCase(),
                  coverError: null,
                  result: result.uri
                });
                this.onToggleModal(false);
                showMessage({
                  message: "Image has been selected successfully ",
                  position: "top",
                  type: "success"
                });
                this.props.save_campaign_info({
                  cover: result.uri
                });
              })
              .catch(error => {
                this.onToggleModal(false);
                showMessage({
                  message: "Please choose an image",
                  position: "top",
                  type: "warning"
                });
                // console.log("ImageManipulator err", error);
                return;
              });
            return;
          } else if (file.size > 2000000) {
            this.setState({
              cover: ""
            });
            this.onToggleModal(false);
            showMessage({
              message: "Image must be less than 2 MBs",
              position: "top",
              type: "warning"
            });
            this.props.save_campaign_info({
              cover: ""
            });
            return;
          } else if (
            Math.floor(result.width / 3) !== Math.floor(result.height / 5) ||
            result.width < 360 ||
            result.height < 600
          ) {
            this.setState({
              cover: "",
              type: ""
            });
            this.props.save_campaign_info({
              cover: ""
            });
            this.onToggleModal(false);
            showMessage({
              message:
                "Image's aspect ratio must be 3:5\nwith a minimum size of 360px by 600px.",
              position: "top",
              type: "warning"
            });

            return;
          } else {
            this.setState({
              cover: result.uri,
              type: result.type.toUpperCase(),
              coverError: null,
              result: result.uri
            });
            this.onToggleModal(false);
            showMessage({
              message: "Image has been selected successfully ",
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
            message: "Please make sure the image is in .png format.",
            position: "top",
            type: "warning"
          });
          this.setState({
            cover: ""
          });
          this.props.save_campaign_info({
            cover: ""
          });
        }
      } else if (!result.cancelled && isNull(this.state.cover)) {
        showMessage({
          message: "Please choose a media file.",
          position: "top",
          type: "warning"
        });
        this.setState({
          cover: ""
        });
        this.props.save_campaign_info({
          cover: ""
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
    let res = this.state.cover.split(
      this.state.cover.includes("/ImageManipulator/")
        ? "/ImageManipulator/"
        : "/ImagePicker/"
    );
    let format = res[1].split(".");
    var cover = {
      uri: this.state.cover,
      type: "IMAGE" + "/" + format[1],
      name: res[1]
    };
    let logoRes = this.state.campaignInfo.logo.split(
      this.state.campaignInfo.logo.includes("/ImageManipulator/")
        ? "/ImageManipulator/"
        : "/ImagePicker/"
    );
    let formatLogo = logoRes[1].split(".");
    var logo = {
      uri: this.state.campaignInfo.logo,
      type: "IMAGE" + "/" + formatLogo[1],
      name: logoRes[1]
    };
    body.append("logo_media", logo);
    body.append("preview_media", cover);
    body.append("campaign_id", this.props.campaign_id);
    if (!this.rejected) {
      body.append("headline", this.state.campaignInfo.coverHeadline);
    }
    this.props.storyAdCover &&
      body.append("preview_media_id", this.props.storyAdCover.preview_media_id);

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

    (coverError || logoError) &&
      showMessage({
        message: coverError
          ? "Please add a cover image"
          : logoError
          ? "Please add a logo"
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
      await this.formatMedia();
      await this.handleUpload();
      if (
        !this.props.data.hasOwnProperty("formattedCover") ||
        JSON.stringify(this.props.data.formattedCover) !==
          JSON.stringify(this.state.formattedCover)
      ) {
        if (!this.props.coverLoading) {
          await this.props.uploadStoryAdCover(
            this.state.formattedCover,
            this._getUploadState,
            this.props.navigation,
            this.onToggleModal,
            this.rejected,
            this.state.signal
          );
        }
      } else {
        this.props.navigation.push("AdDesign");
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
  render() {
    let { cover, coverHeadlineError, logoError } = this.state;
    let { coverHeadline } = this.state.campaignInfo;
    let inputFields = (
      <PenIconBrand
        data={this.props.data}
        coverHeadlineError={coverHeadlineError}
        changeHeadline={this.changeHeadline}
        headline={coverHeadline}
        field={"Headline"}
        mainBusiness={this.props.mainBusiness}
      />
    );

    return (
      <SafeAreaView
        style={styles.mainSafeArea}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
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
          colors={["#751AFF", "#6268FF"]}
          locations={[0.3, 1]}
          style={styles.gradient}
        />
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Ad Design Back Button",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title="Compose Ad"
          />
          <Content
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            padder
          >
            <Transition style={styles.transition} shared="cover">
              <View style={styles.buttonN}>
                <View style={styles.placeholder}>
                  <Image
                    style={styles.placeholder1}
                    source={cover !== "" ? { uri: cover } : transparentImage}
                    resizeMode="cover"
                  />
                  <Image
                    source={
                      this.state.campaignInfo.logo !== ""
                        ? { uri: this.state.campaignInfo.logo }
                        : transparentImage
                    }
                    style={{
                      height: "15%",
                      width: "90%",
                      position: "absolute",
                      top: 40,
                      alignSelf: "center"
                    }}
                  />
                  <Button
                    transparent
                    onPress={() => this._pickLogo()}
                    style={{
                      position: "absolute",
                      top: 0,
                      alignSelf: "center"
                    }}
                  >
                    <Icon
                      name="plus"
                      type="MaterialCommunityIcons"
                      style={{
                        color: logoError ? "red" : "#FF9D00",
                        marginRight: -10
                      }}
                    />
                    <Text
                      style={{ color: "#fff", fontFamily: "montserrat-light" }}
                    >
                      Your Logo
                    </Text>
                  </Button>

                  {inputFields}
                  <MediaButton
                    _pickImage={this._pickImage}
                    image={this.state.cover}
                  />
                </View>
              </View>
            </Transition>
            <Text style={styles.subText}>
              The cover shows on the Discover page mong subscriptions and
              trending content
            </Text>
            {/* {!this.state.imageError ? null : (
              <Text style={styles.errorMsg}>
                {!this.state.imageError.includes(transparentImage)
                  ? this.state.imageError
                  : "Please choose an image or video"}
              </Text>
            )}
            {!this.state.swipeUpError ? null : (
              <Text style={styles.swipeUpErrorText}>
                {this.state.swipeUpError}
              </Text>
            )} */}
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
                Please add media to proceed
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
                  closeButton={true}
                  actionButton={() => this.cancelUpload()}
                  title="Uploading Image"
                />
              )}
              {!this.props.coverLoading && (
                <CustomHeader
                  closeButton={true}
                  actionButton={() => this.onToggleModal(false)}
                />
              )}

              <CameraLoading
                style={{ width: 110, height: 110 }}
                //   styles={{ width: hp(30), height: hp(30) }}
                // top={"50%"}
                // left={"55%"}
              />
              {this.props.coverLoading && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.uplaodPercentage}>
                    {Math.round(this.state.loaded, 2)}%
                  </Text>

                  <Text style={styles.uplaodText}>
                    Please make sure not to close {"\n"}the app or lock the
                    phone while uploading.
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
  coverLoading: state.campaignC.coverLoading
});

const mapDispatchToProps = dispatch => ({
  uploadStoryAdCover: (
    info,
    loading,
    navigation,
    onToggleModal,
    rejected,
    cancelUpload
  ) =>
    dispatch(
      actionCreators.uploadStoryAdCover(
        info,
        loading,
        navigation,
        onToggleModal,
        rejected,
        cancelUpload
      )
    ),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdCover);
