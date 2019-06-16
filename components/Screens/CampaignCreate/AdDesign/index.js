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
  LinearGradient
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
import CustomHeader from "../../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//icons
import PenIcon from "../../../../assets/SVGs/Pen.svg";
import EyeIcon from "../../../../assets/SVGs/Eye";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";

// Style
import styles from "./styles";

//Validator
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Transition } from "react-navigation-fluid-transitions";
import { Modal } from "react-native-paper";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import isNull from "lodash/isNull";

class AdDesign extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        campaign_id: "",
        brand_name: "",
        headline: "",
        destination: "BLANK",
        call_to_action: { label: "BLANK", value: "BLANK" },
        attachment: "BLANK",
        media_type: ""
      },
      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      image: null,
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
    Segment.screen("Design Ad Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      checkout_id: this.props.campaign_id,
      step: 3,
      business_name: this.props.mainBusiness.businessname
    });
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.rejected
          ? this.params.campaign_id
          : this.props.campaign_id,
        brand_name: this.props.mainBusiness.businessname,
        headline: !this.props.data
          ? this.rejected
            ? this.params.headline
            : "Headline"
          : this.props.data.name
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

  _changeDestination = (destination, call_to_action, attachment, appChoice) => {
    if (attachment.hasOwnProperty("longformvideo_media")) {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          destination,
          call_to_action: call_to_action
        },

        [Object.keys(attachment)[0]]: attachment.longformvideo_media,
        [Object.keys(attachment)[1]]: attachment.longformvideo_media_type
      });
    } else {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          destination,
          call_to_action: call_to_action,
          attachment
        },
        appChoice
      });
    }
  };
  pick = async () => {
    await this.askForPermssion();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: Platform.OS === "ios" ? "Images" : "All",
      base64: false,
      exif: false,
      quality: 1
    });

    console.log("after picker", result);

    this.onToggleModal(true);

    return result;
  };

  _pickImage = async () => {
    try {
      let result = await this.pick();
      this.setState({ directory: "/ImagePicker/" });
      let newWidth = result.width;
      let newHeight = result.height;

      if (result.type === "image") {
        if (result.width >= 1080 && result.height >= 1920) {
          if (result.width >= Math.floor((result.height / 16) * 9)) {
            newWidth = Math.floor((result.height / 16) * 9);
          } else if (result.height >= Math.floor((result.width * 16) / 9)) {
            newHeight = Math.floor((result.width * 16) / 9);
          } else {
            newWidth = 1080;
            newHeight = 1920;
          }
          console.log("width:", newWidth);
          console.log("height:", newHeight);

          const manipResult = await ImageManipulator.manipulateAsync(
            result.uri,
            [
              {
                // resize: { width: newWidth },
                crop: {
                  originX: result.width / 2 - newWidth / 2,
                  originY: result.height / 2 - newHeight / 2,
                  width: newWidth,
                  height: newHeight
                }
              }
            ]
          );
          console.log("promise", manipResult);

          const newSize = await FileSystem.getInfoAsync(manipResult.uri, {
            size: true
          });
          const oldSize = await FileSystem.getInfoAsync(result.uri, {
            size: true
          });
          console.log("width:", manipResult.width);
          console.log("height:", manipResult.height);
          console.log("new result: ", newSize.size);
          console.log("old result: ", oldSize.size);

          this.setState({
            directory: "/ImageManipulator/"
          });
          result.uri = manipResult.uri;
          result.height = manipResult.height;
          result.width = manipResult.width;
        } else if (result.width < 1080 || result.height < 1920) {
          showMessage({
            message:
              "Media minimum size is 1080 x 1920 and 9:16 aspect ratio.\nAndroid's maximum image size is for height 2000.",
            position: "top",
            type: "warning"
          });
          this.setState({
            imageError:
              "Media minimum size is 1080 x 1920 \nand 9:16 aspect ratio.",
            image: null
          });
          this.onToggleModal(false);

          return;
        }
      }

      if (!result.cancelled) {
        if (
          Math.floor(result.width / 9) === Math.floor(result.height / 16) ||
          Math.floor(result.width / 16) === Math.floor(result.height / 9)
        ) {
          FileSystem.getInfoAsync(result.uri, { size: true }).then(file => {
            if (
              (result.type === "video" && file.size > 32000000) ||
              result.duration > 10999
            ) {
              this.setState({
                imageError:
                  "Video must be less than 32 MBs and less than 10 seconds.",
                image: null
              });
              showMessage({
                message:
                  "Video must be less than 32 MBs and less than 10 seconds.",
                position: "top",
                type: "warning"
              });
              this.onToggleModal(false);
              return;
            } else if (result.type === "image" && file.size > 5000000) {
              this.setState({
                imageError: "Image must be less than 5 MBs",
                image: null
              });
              this.onToggleModal(false);
              showMessage({
                message: "Image must be less than 5 MBs",
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
              return;
            }
          });
        } else {
          this.setState({
            imageError:
              "Media minimum size is 1080 x 1920 \nand 9:16 aspect ratio.",
            image: null
          });
          this.onToggleModal(false);
          showMessage({
            message: "Media minimum size is 1080 x 1920 and 9:16 aspect ratio.",
            position: "top",
            type: "warning"
          });
          return;
        }
      } else if (!result.cancelled && isNull(this.state.image)) {
        showMessage({
          message: "Please choose a media file.",
          position: "top",
          type: "warning"
        });
        this.setState({
          imageError: "Please choose a media file.",
          image: null
        });
        this.onToggleModal(false);
        return;
      } else {
        this.onToggleModal(false);
        return;
      }
    } catch (error) {
      console.log("error image pick", error);
    }
  };

  formatMedia() {
    var body = new FormData();
    if (!this.state.iosVideoUploaded) {
      let res = this.state.image.split(this.state.directory);
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
      let resVideo = this.state.longformvideo_media;
      this.state.longformvideo_media.split("/ImagePicker/");

      let formatVideo = resVideo[1].split(".");
      var video = {
        uri: this.state.longformvideo_media,
        type: this.state.longformvideo_media_type + "/" + formatVideo[1],
        name: resVideo[1]
      };
      body.append(
        "attachment",
        JSON.stringify(this.state.campaignInfo.attachment)
      );
      body.append("longformvideo_media", video);
      body.append(
        "longformvideo_media_type",
        this.state.longformvideo_media_type
      );
    }

    body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);
    body.append("campaign_id", this.state.campaignInfo.campaign_id);
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

  openUploadVideo = async () => {
    try {
      this._addLinkingListener();
      if (this.props.videoUrl)
        await WebBrowser.openBrowserAsync(this.props.videoUrl);
      this._removeLinkingListener();
    } catch (error) {
      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: "Please try again later."
      });
    }
  };

  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };

  _handleRedirect = event => {
    WebBrowser.dismissBrowser();

    let data = Linking.parse(event.url);

    this.setState({
      image: data.queryParams.media,
      iosVideoUploaded: true,
      type: "VIDEO"
    });
  };
  _handleLandscapeVideos = info => {
    if (info.naturalSize.orientation === "landscape") {
      this.setState({
        image: "null",
        imageError: "Landscape videos are not supported"
      });
    } else {
      this.setState({
        image: this.state.result,
        imageError: null
      });
    }
  };
  _getUploadState = loading => {
    this.setState({
      loaded: loading
    });
  };
  perviewHandler = async () => {
    await this.validator();
    if (
      !this.state.brand_nameError &&
      !this.state.headlineError &&
      !this.state.imageError
    )
      this.props.navigation.push("AdDesignReview", {
        image: this.state.image,
        type: this.state.type,
        call_to_action: this.state.campaignInfo.call_to_action.label,
        headline: this.state.campaignInfo.headline,
        brand_name: this.state.campaignInfo.brand_name
      });
  };

  _onLayoutEvent = event => {
    const h = event.nativeEvent.layout.height;

    this.setState({ heightComponent: h - 40 });
  };
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

    let swipeUpError = "";
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
      Segment.trackWithProperties("Select Ad Design Button", {
        business_name: this.props.mainBusiness.businessname
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        checkout_id: this.props.campaign_id,
        step: 3,
        business_name: this.props.mainBusiness.businessname
      });
      this.formatMedia();
      this.handleUpload();
      !this.props.loading &&
        this.props.ad_design(
          this.state.formatted,
          this._getUploadState,
          this.props.navigation,
          this.onToggleModal,
          this.state.appChoice,
          this.rejected,
          this.state.signal,
          this.state.longformvideo_media &&
            this.state.longformvideo_media_type === "VIDEO",
          { iosUploaded: this.state.iosVideoUploaded, image: this.state.image }
        );
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
    const penIconBrand = (
      <Item style={styles.inputBrand}>
        <PenIcon
          fill={
            this.state.inputB
              ? "#FF9D00"
              : this.state.brand_nameError
              ? "red"
              : "#fff"
          }
        />
        <Input
          style={styles.inputText}
          defaultValue={
            this.props.mainBusiness.businessname
              ? this.props.mainBusiness.businessname
              : "Brand Name"
          }
          placeholderLabel={styles.inputText}
          placeholderTextColor="white"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={value =>
            this.setState({
              campaignInfo: {
                ...this.state.campaignInfo,
                brand_name: value
              }
            })
          }
          onFocus={() => {
            this.setState({ inputB: true });
          }}
          onBlur={() => {
            this.setState({ inputB: false });
            this.setState({
              brand_nameError: validateWrapper(
                "mandatory",
                this.state.campaignInfo.brand_name
              )
            });
          }}
        />
      </Item>
    );

    const penIconHeadLine = (
      <Item style={styles.inputHeadline}>
        <PenIcon
          fill={
            this.state.inputH
              ? "#FF9D00"
              : this.state.headlineError
              ? "red"
              : "#fff"
          }
        />
        <Input
          style={styles.inputText}
          defaultValue={!this.props.data ? "Headline" : this.props.data.name}
          placeholderTextColor="white"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={value =>
            this.setState({
              campaignInfo: {
                ...this.state.campaignInfo,
                headline: value
              }
            })
          }
          onFocus={() => {
            this.setState({ inputH: true });
          }}
          onBlur={() => {
            this.setState({ inputH: false });
            this.setState({
              headlineError: validateWrapper(
                "mandatory",
                this.state.campaignInfo.headline
              )
            });
          }}
        />
      </Item>
    );
    const mediaButton = (
      <>
        <Button
          style={styles.inputMiddleButton}
          onPress={() => {
            this._pickImage();
          }}
        >
          <Icon style={styles.icon} name="camera" />
          <Text style={styles.mediaButtonMsg}>
            {image
              ? Platform.OS === "ios"
                ? "Edit Photo"
                : "Edit Photo"
              : Platform.OS === "ios"
              ? "Add Photo"
              : "Add Media"}
          </Text>
        </Button>
        {Platform.OS === "ios" && (
          <Text
            style={styles.title}
            onPress={() =>
              this.props.getVideoUploadUrl(
                this.props.campaign_id,
                this.openUploadVideo
              )
            }
          >
            Upload Video
          </Text>
        )}
      </>
    );

    let swipeDestination = (
      <TouchableOpacity
        style={styles.swipeUp}
        onPress={() => {
          this.state.objective.toLowerCase() === "traffic"
            ? this.props.navigation.push("SwipeUpDestination", {
                _changeDestination: this._changeDestination,
                image: this.state.image
              })
            : this.props.navigation.navigate("SwipeUpChoice", {
                _changeDestination: this._changeDestination,
                objective: this.state.objective
              });
        }}
      >
        <Text style={styles.swipeUpText}>
          {this.state.campaignInfo.destination !== "BLANK" &&
          this.state.campaignInfo.destination !== "REMOTE_WEBPAGE"
            ? this.state.campaignInfo.destination
            : this.state.campaignInfo.destination === "REMOTE_WEBPAGE"
            ? "Website"
            : "Swipe Up destination"}
        </Text>
        <Icon
          type="MaterialIcons"
          name="arrow-drop-down"
          style={{ color: "orange" }}
        />
      </TouchableOpacity>
    );

    let blankView = <View style={styles.blankView} />;
    return (
      <SafeAreaView
        style={styles.mainSafeArea}
        forceInset={{ bottom: "never" }}
      >
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
                {this.state.type === "VIDEO" ? (
                  <View style={styles.placeholder}>
                    {this.state.videoIsLoading ? (
                      <LoadingScreen dash={true} />
                    ) : null}
                    <Video
                      onLoadStart={() =>
                        this.setState({ videoIsLoading: true })
                      }
                      onLoad={() => this.setState({ videoIsLoading: false })}
                      source={{
                        uri: image ? image : ""
                      }}
                      shouldPlay
                      isLooping
                      isMuted
                      resizeMode={"stretch"}
                      style={styles.video}
                    />

                    {penIconBrand}
                    {penIconHeadLine}
                    {mediaButton}
                    {!["BRAND_AWARENESS", "reach"].find(
                      obj =>
                        this.state.objective.toLowerCase() === obj.toLowerCase()
                    ) && swipeDestination}
                  </View>
                ) : !image ? (
                  <View style={styles.placeholder}>
                    {blankView}
                    {penIconBrand}
                    {penIconHeadLine}
                    {mediaButton}
                    {!["BRAND_AWARENESS", "reach"].find(
                      obj =>
                        this.state.objective.toLowerCase() === obj.toLowerCase()
                    ) && swipeDestination}
                  </View>
                ) : (
                  <View style={styles.placeholder}>
                    <Image
                      style={styles.placeholder1}
                      source={{ uri: image }}
                      resizeMode="cover"
                    />
                    {penIconBrand}
                    {penIconHeadLine}
                    {mediaButton}
                    {!["BRAND_AWARENESS", "reach"].find(
                      obj =>
                        this.state.objective.toLowerCase() === obj.toLowerCase()
                    ) && swipeDestination}
                  </View>
                )}
              </View>
            </Transition>

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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.perviewHandler()}
                >
                  <EyeIcon width={wp(24)} height={hp(8)} />
                </TouchableOpacity>
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
          visible={
            this.props.videoUrlLoading ||
            this.props.loading ||
            this.state.isVisible
          }
          onDismiss={() => this.onToggleModal(false)}
          animationType={"slide"}
        >
          <BlurView intensity={95} tint="dark">
            <SafeAreaView style={styles.loadingSafeArea}>
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
              <LoadingScreen top={50} />
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
    dispatch(actionCreators.getVideoUploadUrl(campaign_id, openBrowser))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDesign);
