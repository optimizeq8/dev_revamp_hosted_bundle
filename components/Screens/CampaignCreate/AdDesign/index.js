//Components
import React, { Component } from "react";
import {
  LinearGradient,
  ImagePicker,
  Permissions,
  Video,
  FileSystem,
  Segment
} from "expo";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import {
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../../MiniComponents/BackButton";
//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//icons
import PenIcon from "../../../../assets/SVGs/Pen.svg";
// import BackButton from "../../../../assets/SVGs/BackButton";
import EyeIcon from "../../../../assets/SVGs/Eye";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";

// Style
import styles from "./styles";
import globalStyles from "../../../../Global Styles/";
import { colors } from "../../../GradiantColors/colors";

//Validator
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { Transition } from "react-navigation-fluid-transitions";
import Modal from "react-native-modal";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

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
      result: "",
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      image: null,
      loaded: 0,
      type: "",
      formatted: null,
      brand_nameError: "",
      headlineError: "",
      orientationError: "",
      imageError: "",
      swipeUpError: "",
      isVisible: false,
      imageLoading: false
    };
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
        campaign_id: this.props.campaign_id,
        brand_name: this.props.mainBusiness.businessname,
        headline: !this.props.data ? "Headline" : this.props.data.name
      },
      objective: this.props.data ? this.props.data.objective : "REACH"
    });

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }

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
  pick = () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: "All",
      base64: false,
      exif: false,
      quality: 0.9,
      aspect: [9, 16],
      allowsEditing: Platform.OS === "android"
    });

    this.onToggleModal();

    return result;
  };
  _pickImage = async () => {
    let result = await this.pick();

    if (
      Math.floor(result.width / 9) === Math.floor(result.height / 16) ||
      Math.floor(result.width / 16) === Math.floor(result.height / 9)
    ) {
      if (!result.cancelled) {
        FileSystem.getInfoAsync(result.uri, { size: true }).then(file => {
          if (result.type === "video" && file.size > 32000000) {
            this.setState({
              imageError: "Video must be less than 32 MBs",
              image: null
            });
            this.onToggleModal();
          } else if (result.type === "image" && file.size > 5000000) {
            this.setState({
              imageError: "Image must be less than 5 MBs",
              image: null
            });
            this.onToggleModal();
          } else {
            this.setState({
              image: result.uri,
              type: result.type.toUpperCase(),
              imageError: null,
              result: result.uri
            });
            this.formatMedia();
            this.onToggleModal();
          }
        });
      }
    } else {
      this.setState({
        imageError: "Media size must be in 9:16 aspect ratio",
        image: null
      });
      this.onToggleModal();
    }
  };

  formatMedia() {
    var body = new FormData();

    let res = this.state.image.split("/ImagePicker/");
    let format = res[1].split(".");
    let mime = "application/octet-stream";
    var photo = {
      uri: this.state.image,
      type: this.state.type + "/" + format[1],
      name: res[1]
    };
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

    body.append("media", photo);
    body.append("media_type", this.state.type);
    body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);
    body.append("campaign_id", this.state.campaignInfo.campaign_id);
    body.append("brand_name", this.state.campaignInfo.brand_name);
    body.append("headline", this.state.campaignInfo.headline);
    body.append("destination", this.state.campaignInfo.destination);
    body.append("call_to_action", this.state.campaignInfo.call_to_action.value);

    this.setState({
      formatted: body
    });
  }

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
      this.state.objective !== "REACH" &&
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
      let t = await this.formatMedia();
      Segment.trackWithProperties("Select Ad Design Button", {
        business_name: this.props.mainBusiness.businessname
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        checkout_id: this.props.campaign_id,
        step: 3,
        business_name: this.props.mainBusiness.businessname
      });
      !this.props.loading &&
        this.props.ad_design(
          this.state.formatted,
          this._getUploadState,
          this.props.navigation,
          this.onToggleModal,
          this.state.appChoice
        );
      // this.props.navigation.navigate("AdDetails");
    }
  };
  onToggleModal = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };
  render() {
    let { image } = this.state;
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <View style={[styles.mainCard]}>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              {/* <TouchableOpacity
                onPress={() => this.props.navigation.pop()}
                style={globalStyles.backButton}
              >
                <BackButton />
              </TouchableOpacity> */}
              <BackButton
                screenname="Ad Design"
                businessname={this.props.mainBusiness.businessname}
                navigation={this.props.navigation.goBack}
              />

              <Text style={styles.title}>Compose Ad</Text>
            </View>
            <Transition style={{ height: "100%" }} shared="image">
              <View style={styles.buttonN}>
                {this.state.type === "VIDEO" ? (
                  <View style={[styles.placeholder]}>
                    <Video
                      source={{
                        uri: image
                      }}
                      onReadyForDisplay={info =>
                        this._handleLandscapeVideos(info)
                      }
                      shouldPlay
                      isLooping
                      isMuted
                      resizeMode="cover"
                      style={[
                        {
                          width: "100%",
                          height: "100%"
                        }
                      ]}
                    />
                  </View>
                ) : !image ? (
                  <View style={styles.placeholder} />
                ) : (
                  <Image
                    style={styles.placeholder}
                    source={{ uri: image }}
                    resizeMode="cover"
                  />
                )}
                <Item
                  style={[
                    styles.inputBrand,
                    {
                      borderColor: "transparent"
                    }
                  ]}
                >
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
                    style={styles.inputtext}
                    defaultValue={
                      this.props.mainBusiness.businessname
                        ? this.props.mainBusiness.businessname
                        : "Brand Name"
                    }
                    placeholderLabel={styles.inputtext}
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
                <Item
                  style={[
                    styles.inputHeadline,
                    {
                      borderColor: "transparent"
                    }
                  ]}
                >
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
                    style={styles.inputtext}
                    defaultValue={
                      !this.props.data ? "Headline" : this.props.data.name
                    }
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
                <Button
                  style={[
                    styles.inputMiddleButton,
                    { flexDirection: "column" }
                  ]}
                  onPress={() => {
                    this._pickImage();
                  }}
                >
                  <Icon
                    style={[styles.icon, { fontSize: 50, paddingTop: 12 }]}
                    name="camera"
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      paddingTop: 23,
                      fontFamily: "montserrat-medium",
                      fontSize: 14,
                      width: 150,
                      color: "#FF9D00"
                    }}
                  >
                    {image ? "Edit Media" : "Add Media"}
                  </Text>
                </Button>
                {!["BRAND_AWARENESS", "reach"].find(
                  obj =>
                    this.state.objective.toLowerCase() === obj.toLowerCase()
                ) && (
                  <TouchableOpacity
                    style={styles.swipeUp}
                    onPress={() => {
                      this.state.objective.toLowerCase() === "traffic"
                        ? this.props.navigation.navigate("SwipeUpDestination", {
                            _changeDestination: this._changeDestination
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
                        : this.state.campaignInfo.destination ===
                          "REMOTE_WEBPAGE"
                        ? "Website"
                        : "Swipe Up destination"}
                    </Text>
                    <Icon
                      type="MaterialIcons"
                      name="arrow-drop-down"
                      style={{ color: "orange" }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </Transition>
            {!this.state.imageError ? null : (
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "montserrat-medium",
                  fontSize: heightPercentageToDP(1.7),
                  marginBottom: -heightPercentageToDP("2")
                }}
              >
                {!this.state.imageError.includes("blank")
                  ? this.state.imageError
                  : "Please choose an image or video"}
              </Text>
            )}
            {!this.state.swipeUpError ? null : (
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  paddingTop: 10,
                  fontFamily: "montserrat-medium",
                  fontSize: heightPercentageToDP(1.7),
                  marginBottom: -20
                }}
              >
                {this.state.swipeUpError}
              </Text>
            )}
            {/* {<Text> {Math.round(this.state.loaded, 2)} %</Text>} */}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignSelf: "center"
              }}
            >
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => this.perviewHandler()}
              >
                <EyeIcon
                  width={widthPercentageToDP(25)}
                  height={heightPercentageToDP(10)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._handleSubmission}
                style={styles.button}
              >
                <ForwardButton
                  width={widthPercentageToDP(25)}
                  height={heightPercentageToDP(10)}
                />
              </TouchableOpacity>
            </View>
            <Modal isVisible={this.props.loading || this.state.isVisible}>
              <>
                <LoadingScreen top={50} />
                <Text
                  style={[
                    styles.title,
                    { top: heightPercentageToDP(50), left: "5%" }
                  ]}
                >
                  {Math.round(this.state.loaded, 2)}%
                </Text>
              </>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  loading: state.campaignC.loadingDesign
});

const mapDispatchToProps = dispatch => ({
  ad_design: (info, loading, navigation, onToggleModal, appChoice) =>
    dispatch(
      actionCreators.ad_design(
        info,
        loading,
        navigation,
        onToggleModal,
        appChoice
      )
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDesign);
