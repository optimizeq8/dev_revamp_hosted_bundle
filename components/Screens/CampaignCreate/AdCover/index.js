//Components
import React, { Component } from "react";
import {
  ImagePicker,
  Permissions,
  Video,
  FileSystem,
  Segment,
  ImageManipulator,
  Linking,
  WebBrowser,
  BlurView,
  LinearGradient,
  MediaLibrary
} from "expo";
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
        logo: "blank",
        headline: "",
        cover: ""
      },
      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      image: "blank",
      loaded: 0,
      type: "",
      iosVideoUploaded: false,
      formatted: null,
      brand_nameError: "",
      headlineError: "",
      orientationError: "",
      imageError: "",
      swipeUpError: "",
      isVisible: false,
      mediaModalVisible: false,
      imageLoading: false,
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
        headline: !this.props.data
          ? this.rejected
            ? this.params.headline
            : "Headline"
          : this.props.data.headlineCover
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
      let swipeUpError = null;
      if (
        this.state.objective !== "BRAND_AWARENESS" &&
        this.state.campaignInfo.attachment === "BLANK" &&
        this.state.campaignInfo.call_to_action.label === "BLANK"
      ) {
        swipeUpError = "Choose A Swipe Up Destination";
      } else {
        swipeUpError = null;
      }
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
        image: rep.image,
        type: rep.type,
        objective: rep.objective,
        iosVideoUploaded: rep.ios_upload === "1" || rep.iosVideoUploaded,
        swipeUpError
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.objective !== "BRAND_AWARENESS" &&
      ((prevState.campaignInfo.attachment === "BLANK" &&
        this.state.campaignInfo.attachment !== "BLANK") ||
        (prevState.campaignInfo.call_to_action.label === "BLANK" &&
          this.state.campaignInfo.call_to_action.label !== "BLANK"))
    ) {
      this.setState({
        swipeUpError: null
      });
    }
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

  changeHeadline = headline => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        headline
      }
    });
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
    console.log(logo);
    let correctLogo = logo.width === 993 && logo.height === 284;

    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        logo: correctLogo ? logo.uri : "blank"
      },
      logoError: correctLogo
    });
    showMessage({
      message: correctLogo
        ? "Logo selected successfully"
        : "Logo must be exactly 993px by 284px",
      description: correctLogo
        ? ""
        : "In .png format and transparent background.",
      position: "top",
      duration: 10000,
      type: correctLogo ? "success" : "warning"
    });

    this.props.save_campaign_info({
      logo: logo.uri
    });
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
                compress: 1
              }
            )
              .then(manipResult => {
                // console.log("promise", manipResult);
                // const newSize = await FileSystem.getInfoAsync(manipResult.uri, {
                //   size: true
                // });
                // const oldSize = await FileSystem.getInfoAsync(result.uri, {
                //   size: true
                // });
                console.log("width:", manipResult.width);
                console.log("height:", manipResult.height);
                // console.log("new result: ", newSize.size);
                // console.log("old result: ", oldSize.size);

                this.setState({
                  directory: "/ImageManipulator/"
                });
                result.uri = manipResult.uri;
                result.height = manipResult.height;
                result.width = manipResult.width;

                console.log(manipResult.height, manipResult.width);
              })
              .then(() => {
                this.setState({
                  image: result.uri,
                  type: result.type.toUpperCase(),
                  imageError: null,
                  result: result.uri
                });
                this.onToggleModal(false);
                showMessage({
                  message: "Image has been selected successfully ",
                  position: "top",
                  type: "success"
                });
                this.props.save_campaign_info({
                  image: result.uri,
                  type: result.type.toUpperCase()
                });
              })
              .catch(error => {
                this.onToggleModal(false);
                showMessage({
                  message: "Please choose an image",
                  position: "top",
                  type: "warning"
                });
                console.log("ImageManipulator err", error);
                return;
              });
            return;
          } else if (file.size > 2000000) {
            this.setState({
              image: "blank"
            });
            this.onToggleModal(false);
            showMessage({
              message: "Image must be less than 2 MBs",
              position: "top",
              type: "warning"
            });
            this.props.save_campaign_info({
              image: "blank",
              type: ""
            });
            return;
          } else if (
            Math.floor(result.width / 3) !== Math.floor(result.height / 5) ||
            result.width < 360 ||
            result.height < 600
          ) {
            this.setState({
              image: "blank",
              type: ""
            });
            this.props.save_campaign_info({
              image: "blank",
              type: ""
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
              image: result.uri,
              type: result.type.toUpperCase(),
              imageError: null,
              result: result.uri
            });
            this.onToggleModal(false);
            showMessage({
              message: "Image has been selected successfully ",
              position: "top",
              type: "success"
            });

            this.props.save_campaign_info({
              image: result.uri,
              type: result.type.toUpperCase()
            });
            return;
          }
        }
      } else if (!result.cancelled && isNull(this.state.image)) {
        showMessage({
          message: "Please choose a media file.",
          position: "top",
          type: "warning"
        });
        this.setState({
          image: "blank"
        });
        this.props.save_campaign_info({
          image: "blank",
          type: ""
        });
        this.onToggleModal(false);
        return;
      } else if (result.cancelled) {
        this.onToggleModal(false);
        return;
      }
    } catch (error) {
      this.onToggleModal(false);
      console.log("error image pick", error);
    }
  };

  formatMedia() {
    var body = new FormData();
    if (!this.state.iosVideoUploaded) {
      let res = this.state.image.split(
        this.state.image.includes("/ImageManipulator/")
          ? "/ImageManipulator/"
          : this.state.directory
      );
      let format = res[1].split(".");

      var photo = {
        uri: this.state.image,
        type: this.state.type + "/" + format[1],
        name: res[1]
      };
      body.append("media", photo);
      body.append("media_type", this.state.type);
    }
    if (this.state.longformvideo_media) {
      let resVideo = this.state.longformvideo_media.split("/ImagePicker/");
      let formatVideo = resVideo[1].split(".");
      var video = {
        uri: this.state.longformvideo_media,
        type: this.state.longformvideo_media_type + "/" + formatVideo[1],
        name: resVideo[1]
      };

      body.append("longformvideo_media", video);
      body.append(
        "longformvideo_media_type",
        this.state.longformvideo_media_type
      );
    }

    if (this.state.campaignInfo.insta_handle) {
      body.append("insta_handle", this.state.campaignInfo.insta_handle);
      body.append("weburl", this.state.campaignInfo.attachment.url);
      body.append("whatsappnumber", this.state.campaignInfo.whatsappnumber);
      body.append("callnumber", this.state.campaignInfo.callnumber);
    }
    body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);
    body.append("businessid", this.props.mainBusiness.businessid);
    body.append("campaign_id", this.props.campaign_id);
    body.append("campaign_name", this.props.data.name);
    if (!this.rejected) {
      body.append("brand_name", this.state.campaignInfo.brand_name);
      body.append("headline", this.state.campaignInfo.headline);
    }
    body.append("destination", this.state.campaignInfo.destination);
    body.append("call_to_action", this.state.campaignInfo.call_to_action.value);
    body.append(
      "attachment",
      this.state.campaignInfo.attachment === "BLANK"
        ? this.state.campaignInfo.attachment
        : JSON.stringify(this.state.campaignInfo.attachment)
    );
    body.append(
      "ios_upload",
      Platform.OS === "ios" && this.state.iosVideoUploaded ? 1 : 0
    );
    this.setState({
      formatted: body
    });
  }

  validator = () => {
    const brand_nameError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.brand_name
    );
    const headlineError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.headline
    );
    const imageError = validateWrapper("mandatory", this.state.image);

    let swipeUpError = null;
    if (
      this.state.objective !== "BRAND_AWARENESS" &&
      this.state.campaignInfo.attachment === "BLANK" &&
      this.state.campaignInfo.call_to_action.label === "BLANK"
    ) {
      swipeUpError = "Choose A Swipe Up Destination";
    } else {
      swipeUpError = null;
    }

    this.setState({
      brand_nameError,
      headlineError,
      imageError,
      swipeUpError
    });
  };
  _handleSubmission = async () => {
    await this.validator();
    if (
      !this.state.brand_nameError &&
      !this.state.headlineError &&
      !this.state.swipeUpError &&
      !this.state.imageError
    ) {
      Segment.trackWithProperties("Ad Design Submitted", {
        business_name: this.props.mainBusiness.businessname
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        checkout_id: this.props.campaign_id,
        step: 3,
        business_name: this.props.mainBusiness.businessname
      });
      await this.formatMedia();
      await this.handleUpload();
      if (
        !this.props.data.hasOwnProperty("formatted") ||
        JSON.stringify(this.props.data.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        if (!this.props.loading) {
          await this.props.ad_design(
            this.state.formatted,
            this._getUploadState,
            this.props.navigation,
            this.onToggleModal,
            this.state.appChoice,
            this.rejected,
            this.state.signal,
            this.state.longformvideo_media &&
              this.state.longformvideo_media_type === "VIDEO",
            {
              iosUploaded: this.state.iosVideoUploaded,
              image: this.state.image
            }
          );
        }
      } else {
        this.props.navigation.push("AdDetails");
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
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };
  render() {
    let { image } = this.state;
    let { headline } = this.state.campaignInfo;

    let inputFields = (
      <PenIconBrand
        data={this.props.data}
        changeBusinessName={this.changeBusinessName}
        changeHeadline={this.changeHeadline}
        headline={headline}
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
            <Transition style={styles.transition} shared="image">
              <View style={styles.buttonN}>
                <View style={styles.placeholder}>
                  <Image
                    style={styles.placeholder1}
                    source={{ uri: image }}
                    resizeMode="cover"
                  />
                  <Button
                    transparent
                    onPress={() => this._pickLogo()}
                    style={{
                      position: "absolute",
                      top: 20,
                      alignSelf: "center"
                    }}
                  >
                    <PenIcon fill={"#FF9D00"} />
                    <Text style={{ color: "#fff" }}>Your Logo</Text>
                    <Image
                      source={{ uri: this.state.campaignInfo.logo }}
                      style={{ height: 100, width: 100 }}
                    />
                  </Button>
                  {inputFields}
                  <MediaButton
                    _pickImage={this._pickImage}
                    image={this.state.image}
                  />
                </View>
              </View>
            </Transition>
            <Text style={styles.subText}>
              The cover shows on the Discover page mong subscriptions and
              trending content
            </Text>
            {!this.state.imageError ? null : (
              <Text style={styles.errorMsg}>
                {!this.state.imageError.includes("blank")
                  ? this.state.imageError
                  : "Please choose an image or video"}
              </Text>
            )}
            {!this.state.swipeUpError ? null : (
              <Text style={styles.swipeUpErrorText}>
                {this.state.swipeUpError}
              </Text>
            )}
          </Content>

          <Footer style={styles.footerStyle}>
            {image ? (
              <View style={styles.footerButtonsContainer}>
                {this.state.objective === "BRAND_AWARENESS" && (
                  <TouchableOpacity
                    onPress={this._handleSubmission}
                    style={styles.button}
                  >
                    <ForwardButton width={wp(24)} height={hp(8)} />
                  </TouchableOpacity>
                )}
                {this.state.objective !== "BRAND_AWARENESS" &&
                  isNull(this.state.swipeUpError) && (
                    <TouchableOpacity
                      onPress={this._handleSubmission}
                      style={styles.button}
                    >
                      <ForwardButton width={wp(24)} height={hp(8)} />
                    </TouchableOpacity>
                  )}
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                Please add media to proceed
              </Text>
            )}
          </Footer>
        </Container>

        <Modal
          visible={
            this.props.videoUrlLoading ||
            this.props.loading ||
            this.state.isVisible
          }
          onDismiss={() => this.onToggleModal(false)}
          animationType={"slide"}
        >
          <BlurView intensity={95} tint="dark">
            <SafeAreaView
              forceInset={{ top: "always" }}
              style={styles.loadingSafeArea}
            >
              {this.props.loading && (
                <CustomHeader
                  closeButton={true}
                  actionButton={() => this.cancelUpload()}
                  title="Uploading Image"
                />
              )}
              {!this.props.loading && (
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
              {this.props.loading && (
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
  loading: state.campaignC.loadingDesign,
  videoUrlLoading: state.campaignC.videoUrlLoading,
  videoUrl: state.campaignC.videoUrl
});

const mapDispatchToProps = dispatch => ({
  ad_design: (
    info,
    loading,
    navigation,
    onToggleModal,
    appChoice,
    rejected,
    cancelUpload,
    longVideo,
    iosUplaod
  ) =>
    dispatch(
      actionCreators.ad_design(
        info,
        loading,
        navigation,
        onToggleModal,
        appChoice,
        rejected,
        cancelUpload,
        longVideo,
        iosUplaod
      )
    ),
  getVideoUploadUrl: (campaign_id, openBrowser) =>
    dispatch(actionCreators.getVideoUploadUrl(campaign_id, openBrowser)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdCover);
