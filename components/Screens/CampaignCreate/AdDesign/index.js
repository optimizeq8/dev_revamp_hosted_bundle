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
import MediaModal from "./MediaModal";
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
import isUndefined from "lodash/isUndefined";

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
  _changeDestination = (destination, call_to_action, attachment, appChoice) => {
    let newData = {};
    if (attachment.hasOwnProperty("longformvideo_media")) {
      newData = {
        campaignInfo: {
          ...this.state.campaignInfo,
          destination,
          call_to_action: call_to_action
        },

        [Object.keys(attachment)[0]]: attachment.longformvideo_media,
        [Object.keys(attachment)[1]]: attachment.longformvideo_media_type
      };
      this.setState(newData);

      this.props.save_campaign_info({
        ...newData.campaignInfo,
        [Object.keys(attachment)[0]]: attachment.longformvideo_media,
        [Object.keys(attachment)[1]]: attachment.longformvideo_media_type
      });
    } else {
      newData = {
        campaignInfo: {
          ...this.state.campaignInfo,
          destination,
          call_to_action,
          attachment
        },
        appChoice
      };
      this.setState(newData);
      this.props.save_campaign_info({ ...newData.campaignInfo, appChoice });
    }
  };

  changeBusinessName = brand_name => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        brand_name
      }
    });
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
      //Platform.OS === "ios" ? "Images" : "All",
      base64: false,
      exif: false,
      quality: 0.1
    });

    // console.log("after picker", result);

    this.onToggleModal(true);

    return result;
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
          if (result.width >= 1080 && result.height >= 1920) {
            if (result.width >= Math.floor((result.height / 16) * 9)) {
              newWidth = Math.floor((result.height / 16) * 9);
            } else if (result.height >= Math.floor((result.width * 16) / 9)) {
              newHeight = Math.floor((result.width * 16) / 9);
            } else {
              newWidth = 1080;
              newHeight = 1920;
            }
            console.log("image res:", result);
            console.log("width:", newWidth);
            console.log("height:", newHeight);
            ImageManipulator.manipulateAsync(
              result.uri,
              [
                {
                  // resize: { width: newWidth },
                  crop: {
                    originX: (result.width - newWidth) / 2,
                    originY: (result.height - newHeight) / 2,
                    width: newWidth,
                    height: newHeight
                  }
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
                // console.log("width:", manipResult.width);
                // console.log("height:", manipResult.height);
                // console.log("new result: ", newSize.size);
                // console.log("old result: ", oldSize.size);

                MediaLibrary.createAssetAsync(manipResult.uri)
                  .then(imageAsset => {
                    console.log("OptimizeApp", imageAsset.uri);
                    MediaLibrary.getAlbumAsync("OptimizeApp")
                      .then(res => {
                        if (isNull(res)) {
                          MediaLibrary.createAlbumAsync(
                            "OptimizeApp",
                            imageAsset
                          )
                            .then(() => {
                              MediaLibrary.getAssetInfoAsync(imageAsset)
                                .then(res =>
                                  console.log("image:", res.localUri)
                                )
                                .catch(error => {
                                  console.log("album should exist but,", error);
                                });
                            })
                            .catch(error => {
                              console.log("err", error);
                            });
                        } else {
                          MediaLibrary.addAssetsToAlbumAsync(
                            [imageAsset],
                            res,
                            true
                          )
                            .then(res => {
                              console.log("addAssetsToAlbumAsync", res);

                              MediaLibrary.getAssetInfoAsync(imageAsset).then(
                                res => console.log("image:", res.localUri)
                              );
                            })
                            .catch(error => {
                              console.log("err", error);
                            });
                        }
                      })
                      .catch(error => {
                        console.log("getAlbumAsync err", error);
                      });
                  })
                  .catch(error => {
                    console.log("getAlbumAsync err", error);
                  });
                this.setState({
                  directory: "/ImageManipulator/"
                });
                result.uri = manipResult.uri;
                result.height = manipResult.height;
                result.width = manipResult.width;
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
                  message: "Please choose an image not ",
                  position: "top",
                  type: "warning"
                });
                console.log("ImageManipulator err", error);
                return;
              });
            return;
          } else if (file.size > 5000000) {
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
            this.props.save_campaign_info({
              image: null,
              type: ""
            });
            return;
          } else if (
            Math.floor(result.width / 9) !== Math.floor(result.height / 16)
          ) {
            this.setState({
              imageError:
                "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px.",
              image: null,
              type: ""
              // videoIsLoading: false
            });
            this.props.save_campaign_info({
              image: null,
              type: ""
            });
            this.onToggleModal(false);
            showMessage({
              message:
                "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px.",
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
        } else if (result.type === "video") {
          if (result.duration > 10999) {
            this.setState({
              imageError: "Allowed video durations is up to 10 seconds.",
              image: null
            });
            this.props.save_campaign_info({
              image: null,
              type: ""
            });
            showMessage({
              message: "Allowed video durations is up to 10 seconds.",
              position: "top",
              type: "warning"
            });
            this.onToggleModal(false);
            return;
          } else if (file.size > 32000000) {
            this.setState({
              imageError: "Allowed video size is up to 32 MBs.",
              image: null
            });
            this.props.save_campaign_info({
              image: null,
              type: ""
            });
            showMessage({
              message: "Allowed video size is up to 32 MBs.",
              position: "top",
              type: "warning"
            });
            this.onToggleModal(false);
            return;
          } else if (
            Math.floor(result.width / 9) === Math.floor(result.height / 16) ||
            Math.floor(result.height / 9) === Math.floor(result.width / 16)
          ) {
            this.setState({
              image: result.uri,
              type: result.type.toUpperCase(),
              imageError: null,
              result: result.uri
            });
            this.onToggleModal(false);
            showMessage({
              message: "Video has been selected successfully ",
              position: "top",
              type: "success"
            });
            this.props.save_campaign_info({
              image: result.uri,
              type: result.type.toUpperCase()
            });
            return;
          } else {
            this.setState({
              imageError:
                "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
              image: null
            });
            this.props.save_campaign_info({
              image: null,
              type: ""
            });
            this.onToggleModal(false);
            showMessage({
              message:
                "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
              position: "top",
              type: "warning"
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
          imageError: "Please choose a media file.",
          image: null
        });
        this.props.save_campaign_info({
          image: null,
          type: ""
        });
        this.onToggleModal(false);
        return;
      } else {
        this.onToggleModal(false);
        return;
      }
    } catch (error) {
      this.onToggleModal(false);
      console.log("error image pick", error);
    }

    //   } else if (result.width < 1080 || result.height < 1920) {
    //     showMessage({
    //       message:
    //         "Media minimum size is 1080 x 1920 and 9:16 aspect ratio.\nAndroid's maximum image size is for height 2000.",
    //       position: "top",
    //       type: "warning"
    //     });
    //     this.setState({
    //       imageError:
    //         "Media minimum size is 1080 x 1920 \nand 9:16 aspect ratio.",
    //       image: null
    //     });
    //     this.onToggleModal(false);

    //     return;
    //   }
    // }
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

    body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);
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
  getVideoUploadUrl = () => {
    this.setMediaModalVisible(false);
    this.props.getVideoUploadUrl(this.props.campaign_id, this.openUploadVideo);
  };
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
    this.props.save_campaign_info({
      image: data.queryParams.media,
      iosVideoUploaded: true,
      type: "VIDEO"
    });
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
        brand_name: this.state.campaignInfo.brand_name,
        destination: this.state.campaignInfo.destination,
        icon_media_url: this.state.campaignInfo.attachment.icon_media_url
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

    let swipeUpError = null;
    if (
      this.props.adType === "CollectionAd" &&
      this.state.campaignInfo.attachment === "BLANK" &&
      this.state.campaignInfo.call_to_action.label === "BLANK"
    ) {
      showMessage({
        message: "Choose A Swipe Up Destination",
        position: "top",
        type: "warning"
      });
      swipeUpError = "Choose A Swipe Up Destination";
    } else if (
      this.props.adType === "SnapAd" &&
      this.state.objective !== "BRAND_AWARENESS" &&
      this.state.campaignInfo.attachment === "BLANK" &&
      this.state.campaignInfo.call_to_action.label === "BLANK"
    ) {
      showMessage({
        message: "Choose A Swipe Up Destination",
        position: "top",
        type: "warning"
      });
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
    // console.log("toggle off");

    this.setState({ isVisible: visibile });
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };

  collectionComp = i => {
    // console.log("i", this.props.collectionAdMedia[i]);

    return (
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          alignSelf: "center",
          width: "24%",
          height: hp(9.5),
          borderRadius: 20,
          paddingVertical: 2,
          paddingHorizontal: 2,
          justifyContent: "center"
        }}
        onPress={() => {
          this.props.navigation.push("CollectionMedia", {
            collection_order: i
          });
        }}
      >
        {!isUndefined(this.props.collectionAdMedia[i]) && (
          <Image
            style={{
              borderRadius: 20,
              overflow: "hidden",
              alignSelf: "center",
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 0,
              justifyContent: "center"
            }}
            source={{ uri: this.props.collectionAdMedia[i].localUri }}
            resizeMode="cover"
          />
        )}
        <Text
          style={{
            color: "#fff",
            fontSize: 9,
            fontFamily: "montserrat-medium",
            textAlign: "center"
          }}
        >
          Add{"\n"}Product
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    let { image } = this.state;
    let {
      brand_name,
      headline,
      destination,
      attachment
    } = this.state.campaignInfo;

    let inputFields = ["Business Name", "Headline"].map(field => (
      <PenIconBrand
        data={this.props.data}
        changeBusinessName={this.changeBusinessName}
        changeHeadline={this.changeHeadline}
        brand_name={brand_name}
        headline={headline}
        key={field}
        field={field}
        mainBusiness={this.props.mainBusiness}
      />
    ));

    let swipeUpComp =
      this.props.adType === "SnapAd" ? (
        !["BRAND_AWARENESS", "reach"].find(
          obj => this.state.objective.toLowerCase() === obj.toLowerCase()
        ) && (
          <SwipeUpComponent
            _changeDestination={this._changeDestination}
            navigation={this.props.navigation}
            objective={this.state.campaignInfo.objective}
            destination={destination}
            attachment={attachment}
            collectionAdLinkForm={this.props.collectionAdLinkForm}
            adType={this.props.adType}
            image={image}
          />
        )
      ) : (
        <SwipeUpComponent
          _changeDestination={this._changeDestination}
          navigation={this.props.navigation}
          objective={this.state.campaignInfo.objective}
          destination={destination}
          attachment={attachment}
          collectionAdLinkForm={this.props.collectionAdLinkForm}
          adType={this.props.adType}
        />
      );

    let collection = (
      <View
        style={{
          alignContent: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          bottom: "10%",
          flex: 1,
          position: "absolute",
          height: hp(13),
          width: "100%",
          bottom: 0,
          paddingHorizontal: 8
        }}
      >
        {this.collectionComp(0)}
        {this.collectionComp(1)}
        {this.collectionComp(2)}
        {this.collectionComp(3)}
      </View>
    );

    let blankView = <View style={styles.blankView} />;

    let submitButton = () => {
      // console.log("arra: ", this.props.collectionAdMedia);
      // console.log(
      //   "??: ",
      //   this.props.collectionAdMedia.some(c => isUndefined(c))
      // );
      // console.log(
      //   "condi",

      //   !isUndefined(this.props.collectionAdMedia.find(c => isUndefined(c)))
      // );
      if (this.props.adType === "CollectionAd") {
        if (
          this.props.collectionAdMedia.length === 4 &&
          !this.props.collectionAdMedia.some(c => isUndefined(c))
        ) {
          return (
            <TouchableOpacity
              onPress={this._handleSubmission}
              style={styles.button}
            >
              <ForwardButton width={wp(24)} height={hp(8)} />
            </TouchableOpacity>
          );
        }
        return;
      } else {
        if (this.state.objective === "BRAND_AWARENESS") {
          return (
            <TouchableOpacity
              onPress={this._handleSubmission}
              style={styles.button}
            >
              <ForwardButton width={wp(24)} height={hp(8)} />
            </TouchableOpacity>
          );
        } else if (
          this.state.objective !== "BRAND_AWARENESS" &&
          isNull(this.state.swipeUpError)
        ) {
          return (
            <TouchableOpacity
              onPress={this._handleSubmission}
              style={styles.button}
            >
              <ForwardButton width={wp(24)} height={hp(8)} />
            </TouchableOpacity>
          );
        }
      }
      return;
    };
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
                {this.state.type === "VIDEO" ? (
                  <View style={styles.placeholder}>
                    {this.state.videoIsLoading ? (
                      <CameraLoading dash={true} />
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

                    {inputFields}
                    <MediaButton
                      setMediaModalVisible={this.setMediaModalVisible}
                      image={this.state.image}
                    />
                    {swipeUpComp}
                  </View>
                ) : !image ? (
                  <View style={styles.placeholder}>
                    {blankView}

                    {inputFields}
                    <MediaButton
                      setMediaModalVisible={this.setMediaModalVisible}
                      image={this.state.image}
                    />
                    {swipeUpComp}
                    {this.props.adType === "CollectionAd" && collection}
                  </View>
                ) : (
                  <View style={styles.placeholder}>
                    <Image
                      style={styles.placeholder1}
                      source={{ uri: image }}
                      resizeMode="cover"
                    />

                    {inputFields}
                    <MediaButton
                      setMediaModalVisible={this.setMediaModalVisible}
                      image={this.state.image}
                    />
                    {swipeUpComp}

                    {this.props.adType === "CollectionAd" && collection}
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
                {submitButton()}
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                Please add media to proceed
              </Text>
            )}
          </Footer>
        </Container>
        <MediaModal
          getVideoUploadUrl={this.getVideoUploadUrl}
          _pickImage={this._pickImage}
          mediaModalVisible={this.state.mediaModalVisible}
          setMediaModalVisible={this.setMediaModalVisible}
        />
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
  videoUrl: state.campaignC.videoUrl,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType,
  collectionAdMedia: state.campaignC.collectionAdMedia
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
)(AdDesign);
