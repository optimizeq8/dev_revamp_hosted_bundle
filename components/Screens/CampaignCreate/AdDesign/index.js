//Components
import React, { Component } from "react";
import { Linking } from "expo";
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
  Platform,
  BackHandler,
  Image as RNImage
} from "react-native";
import { Content, Text, Container, Footer, Button } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { Modal, ActivityIndicator } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import CustomHeader from "../../../MiniComponents/Header";
import CameraLoading from "../../../MiniComponents/CameraLoading";
import MediaModal from "./MediaModal";
import SnapAds from "./SnapAdCards/SnapAds";
const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import PenIcon from "../../../../assets/SVGs/Pen.svg";
import EyeIcon from "../../../../assets/SVGs/Eye";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";
import PlusCircle from "../../../../assets/SVGs/PlusCircle.svg";

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
import { globalColors } from "../../../../GlobalStyles";
import isUndefined from "lodash/isUndefined";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";

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
        selectedStoryAd: { media: "//" },
        numOfAds: 0
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
      mediaError: "",
      swipeUpError: "",
      isVisible: false,
      mediaModalVisible: false,
      videoIsLoading: false,
      heightComponent: 0,
      creativeVideoUrl: "",
      sourceChanging: false,
      rejectionUpload: false,
      tempImage: "",
      tempImageloading: false
    };
    this.adType = this.props.adType;
    this.params = this.props.navigation.state.params;
    this.selectedCampaign = this.props.navigation.getParam(
      "selectedCampaign",
      false
    );
    this.rejected = this.props.navigation.getParam("rejected", false);
  }

  handleBackButton = () => {
    if (this.state.storyAdCards.storyAdSelected) {
      this.setState({
        ...this.state,
        storyAdCards: { ...this.state.storyAdCards, storyAdSelected: false }
      });
    } else this.props.navigation.goBack();
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
        brand_name: this.rejected
          ? this.selectedCampaign.brand_name
          : this.props.mainBusiness.businessname,
        headline: this.rejected
          ? this.selectedCampaign.headline
          : this.props.data
          ? this.props.data.name
          : ""
      },
      objective: this.rejected
        ? this.selectedCampaign.objective
        : this.props.data
        ? this.props.data.objective
        : "TRAFFIC"
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
    let swipeUpError = null;
    if (
      this.adType !== "StoryAd" &&
      this.state.objective !== "BRAND_AWARENESS" &&
      this.state.campaignInfo.attachment === "BLANK" &&
      this.state.campaignInfo.call_to_action.label === "BLANK"
    ) {
      swipeUpError = "Choose A Swipe Up Destination";
    } else {
      swipeUpError = null;
    }
    if (this.rejected && this.selectedCampaign) {
      if (this.adType === "StoryAd") {
        this.downloadStoryMedia();
        this.props.setRejectedStoryAds(this.selectedCampaign.story_creatives);
      } else if (this.adType === "CollectionAd") {
        this.setState({ media: this.selectedCampaign.media });
        this.props.setRejectedCollectionAds(
          this.selectedCampaign.collection_creatives
        );
      } else {
        return;
      }
    } else if (
      (this.props.data &&
        Object.keys(this.state.campaignInfo)
          .map(key => {
            if (this.props.data.hasOwnProperty(key)) return true;
          })
          .includes(true)) ||
      this.props.data.hasOwnProperty("media")
    ) {
      let rep = this.state.campaignInfo;

      rep = {
        ...this.state.campaignInfo,
        call_to_action: this.props.data.call_to_action,
        attachment: this.props.data.attachment,
        destination: this.props.data.destination
      };

      this.setState({
        ...this.state,
        campaignInfo: {
          ...rep
        },
        media: this.adType !== "StoryAd" && rep.media ? rep.media : "//",
        ...this.props.data,
        campaignInfo: rep,
        image:
          this.props.adType !== "StoryAd" && this.props.data.image
            ? this.props.data.image
            : "//",
        swipeUpError
      });
    }

    //----keep for later---//

    // if (this.props.navigation.state.params) {
    //   this._handleRedirect(this.props.navigation.state.params);
    // }
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

  downloadStoryMedia = () => {
    this.setState({ tempImageloading: true });
    FileSystem.downloadAsync(
      this.selectedCampaign.story_creatives[0].media,
      FileSystem.cacheDirectory +
        this.selectedCampaign.story_creatives[0].media.split("/")[
          this.selectedCampaign.story_creatives[0].media.split("/").length - 1
        ]
    ).then(media => {
      FileSystem.getInfoAsync(media.uri, { md5: true }).then(info => {
        this.setState({
          ...this.state,
          tempImage: media.uri,
          tempImageloading: false,
          tempType: ["MKV", "AVI", "MP4", "MPEG"].some(el =>
            media.uri.includes(el.toLowerCase())
          )
            ? "VIDEO"
            : "IMAGE"
        });
      });
    });
  };
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
  _changeDestination = (
    destination,
    call_to_action,
    attachment,
    appChoice = null,
    whatsAppCampaign = null
  ) => {
    let newData = {};
    if (this.adType === "StoryAd") {
      let cards = this.props.storyAdsArray;
      let card = this.props.storyAdsArray[
        this.state.storyAdCards.selectedStoryAd.index
      ];
      if (attachment.hasOwnProperty("longformvideo_media")) {
        card = {
          ...card,
          index: this.state.storyAdCards.selectedStoryAd.index,
          destination,
          call_to_action,
          uploaded: false,
          attachment: { label: "BLANK", value: "BLANK" },
          [Object.keys(attachment)[0]]: attachment.longformvideo_media,
          [Object.keys(attachment)[1]]: attachment.longformvideo_media_type,
          rejectionLongVidUpload: true
        };
      } else
        card = {
          ...card,
          index: this.state.storyAdCards.selectedStoryAd.index,
          destination,
          call_to_action,
          attachment
        };

      cards[this.state.storyAdCards.selectedStoryAd.index] = card;
      this.setState({
        storyAdCards: {
          ...this.state.storyAdCards,
          // storyAdSelected: false,
          selectedStoryAd: {
            ...card
          }
        },
        swipeUpError: null
      });
    } else if (attachment.hasOwnProperty("longformvideo_media")) {
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
      if (whatsAppCampaign) {
        newData = {
          ...newData,
          campaignInfo: {
            ...newData.campaignInfo,
            insta_handle: whatsAppCampaign.insta_handle,
            whatsappnumber: whatsAppCampaign.whatsappnumber,
            weburl: whatsAppCampaign.weburl,
            callnumber: whatsAppCampaign.callnumber
          }
        };
        this.props.save_campaign_info({
          insta_handle: whatsAppCampaign.insta_handle,
          whatsappnumber: whatsAppCampaign.whatsappnumber,
          weburl: whatsAppCampaign.weburl,
          callnumber: whatsAppCampaign.callnumber
        });
      }
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
    this.props.save_campaign_info({ brand_name });
  };
  changeHeadline = headline => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        headline
      }
    });
    this.props.save_campaign_info({ headline });
  };
  pick = async mediaTypes => {
    await this.askForPermssion();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes,
      //Platform.OS === "ios" ? "Images" : "All",
      base64: false,
      exif: false,
      quality: 0.8
    });

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
      // await this.validator();

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
            ImageManipulator.manipulateAsync(
              result.uri,
              [
                {
                  // resize: { width: newWidth },
                  resize:
                    result.width >= (result.height / 16) * 9
                      ? {
                          height: 1920
                        }
                      : {
                          width: 1080
                        }
                }
              ],
              {
                compress: 1
              }
            )
              .then(async manipResult => {
                manipResult = await ImageManipulator.manipulateAsync(
                  manipResult.uri,
                  [
                    {
                      crop: {
                        originX: Math.floor((manipResult.width - 1080) / 2),
                        originY: Math.floor((manipResult.height - 1920) / 2),
                        width: 1080,
                        height: 1920
                      }
                    }
                  ],
                  {
                    compress: 1
                  }
                );
                this.setState({
                  directory: "/ImageManipulator/"
                });
                result.uri = manipResult.uri;
                result.height = manipResult.height;
                result.width = manipResult.width;
              })
              .then(() => {
                if (
                  this.adType === "StoryAd" &&
                  this.state.storyAdCards.storyAdSelected
                ) {
                  let cards = this.props.storyAdsArray;
                  let card = this.props.storyAdsArray[
                    this.state.storyAdCards.selectedStoryAd.index
                  ];

                  card = {
                    ...card,
                    index: this.state.storyAdCards.selectedStoryAd.index,
                    media: result.uri,
                    uploaded: false,
                    media_type: result.type.toUpperCase(),
                    iosVideoUploaded: false,
                    rejectionUpload: true
                  };

                  cards[this.state.storyAdCards.selectedStoryAd.index] = card;
                  this.setState({
                    storyAdCards: {
                      ...this.state.storyAdCards,
                      // storyAdSelected: false,
                      selectedStoryAd: {
                        ...card
                      }
                    },
                    type: result.type.toUpperCase()
                  });
                  this.props.save_campaign_info({
                    media: result.uri,
                    type: result.type.toUpperCase()
                  });
                  this.onToggleModal(false);
                } else {
                  this.setState({
                    media: result.uri,
                    type: result.type.toUpperCase(),
                    mediaError: null,
                    result: result.uri,
                    iosVideoUploaded: false,
                    rejectionUpload: true
                  });

                  this.onToggleModal(false);
                  showMessage({
                    message: "Image has been selected successfully ",
                    position: "top",
                    type: "success"
                  });
                  this.props.save_campaign_info({
                    media: result.uri,
                    type: result.type.toUpperCase()
                  });
                }
              })
              .catch(error => {
                // console.log(error);

                this.onToggleModal(false);
                showMessage({
                  message: "Please choose an image not ",
                  position: "top",
                  type: "warning"
                });
              });
            return;
          } else if (file.size > 5000000) {
            this.setState({
              mediaError: "Image must be less than 5 MBs",
              media: "//"
            });
            this.onToggleModal(false);
            showMessage({
              message: "Image must be less than 5 MBs",
              position: "top",
              type: "warning"
            });
            this.props.save_campaign_info({
              media: "//",
              type: ""
            });
            return;
          } else if (
            Math.floor(result.width / 9) !== Math.floor(result.height / 16)
          ) {
            this.setState({
              mediaError:
                "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px.",
              media: "//",
              type: ""
              // videoIsLoading: false
            });
            this.props.save_campaign_info({
              media: "//",
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
              media: result.uri,
              type: result.type.toUpperCase(),
              mediaError: null,
              result: result.uri,
              iosVideoUploaded: false
            });
            this.onToggleModal(false);
            showMessage({
              message: "Image has been selected successfully ",
              position: "top",
              type: "success"
            });
            this.props.save_campaign_info({
              media: result.uri,
              type: result.type.toUpperCase()
            });
            return;
          }
        } else if (result.type === "video") {
          if (result.duration > 10999) {
            this.setState({
              mediaError: "Allowed video durations is up to 10 seconds.",
              media: "//"
            });
            this.props.save_campaign_info({
              media: "//",
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
              mediaError: "Allowed video size is up to 32 MBs.",
              media: "//"
            });
            this.props.save_campaign_info({
              media: "//",
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
            result.width >= 1080 &&
            result.height >= 1920 &&
            Math.floor(result.width / 9) === Math.floor(result.height / 16)
          ) {
            if (
              this.adType === "StoryAd" &&
              this.state.storyAdCards.storyAdSelected
            ) {
              let cards = this.props.storyAdsArray;
              let card = this.props.storyAdsArray[
                this.state.storyAdCards.selectedStoryAd.index
              ];

              card = {
                ...card,
                uploaded: false,
                index: this.state.storyAdCards.selectedStoryAd.index,
                media: result.uri,
                media_type: result.type.toUpperCase()
              };

              cards[this.state.storyAdCards.selectedStoryAd.index] = card;
              this.setState({
                storyAdCards: {
                  ...this.state.storyAdCards,
                  // storyAdSelected: false,
                  selectedStoryAd: {
                    ...card
                  }
                },
                type: result.type.toUpperCase()
              });
              this.props.save_campaign_info({
                media: result.uri,
                type: result.type.toUpperCase()
              });
              this.onToggleModal(false);
            } else {
              this.setState({
                media: result.uri,
                type: result.type.toUpperCase(),
                mediaError: null,
                result: result.uri,
                iosVideoUploaded: false
              });
              this.onToggleModal(false);
              showMessage({
                message: "Video has been selected successfully ",
                position: "top",
                type: "success"
              });
            }
            this.props.save_campaign_info({
              media: result.uri,
              type: result.type.toUpperCase()
            });
            return;
          } else {
            this.setState({
              mediaError:
                "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
              media: "//"
            });
            this.props.save_campaign_info({
              media: "//",
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
      } else if (!result.cancelled && isNull(this.state.media)) {
        showMessage({
          message: "Please choose a media file.",
          position: "top",
          type: "warning"
        });
        this.setState({
          mediaError: "Please choose a media file.",
          media: "//"
        });
        this.props.save_campaign_info({
          media: "//",
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
      // console.log("error image pick", error);
    }
  };

  getVideoUploadUrl = () => {
    this.setMediaModalVisible(false);
    if (this.adType === "StoryAd") {
      let story_id = this.state.storyAdCards.selectedStoryAd.hasOwnProperty(
        "story_id"
      )
        ? "&" + this.state.storyAdCards.selectedStoryAd.story_id
        : "";
      this.setState(
        {
          creativeVideoUrl:
            "https://www.optimizekwtestingserver.com/optimize/fileupload/uploadCreative?" +
            this.props.campaign_id +
            story_id
        },
        () => this.openUploadVideo()
      );
    } else
      this.props.getVideoUploadUrl(
        this.props.campaign_id,
        this.openUploadVideo
      );
  };
  openUploadVideo = async () => {
    try {
      this._addLinkingListener();
      // this.props.navigation.replace("WebView", {
      //   url:
      //     this.adType === "StoryAd"
      //       ? this.state.creativeVideoUrl
      //       : this.props.videoUrl,
      //   title: "Upload Video"
      // });
      await WebBrowser.openBrowserAsync(
        this.adType === "StoryAd"
          ? this.state.creativeVideoUrl
          : this.props.videoUrl
      );
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
    if (this.adType === "StoryAd") {
      let cards = this.props.storyAdsArray;
      let card = this.props.storyAdsArray[
        this.state.storyAdCards.selectedStoryAd.index
      ];
      let selectedImage = this.state.storyAdCards.selectedStoryAd;
      selectedImage.image = "//";
      // this.setState({
      //   videoIsLoading: true,
      //   media: "//",
      //   type: "VIDEO",
      //   storyAdCards: {
      //     ...this.state.storyAdCards,
      //     selectedStoryAd: selectedImage
      //   }
      // });
      card = {
        ...card,
        index: this.state.storyAdCards.selectedStoryAd.index,
        story_id: data.queryParams.story_id,
        media: data.queryParams.media,
        iosVideoUploaded: true,
        media_type: "VIDEO",
        uploaded: true
      };
      cards[this.state.storyAdCards.selectedStoryAd.index] = card;
      this.setState({
        storyAdCards: {
          ...this.state.storyAdCards,
          selectedStoryAd: {
            ...card
          }
        },
        videoIsLoading: false,
        iosVideoUploaded: true,
        type: "VIDEO"
      });
      this.props.save_campaign_info({
        selectedStoryAd: card,
        iosVideoUploaded: true,
        type: "VIDEO"
      });
      // FileSystem.downloadAsync(
      //   data.queryParams.media,
      //   FileSystem.cacheDirectory +
      //     data.queryParams.media.split("/")[
      //       data.queryParams.media.split("/").length - 1
      //     ]
      // )
      //   .then(({ uri }) => {
      //     card = {
      //       ...card,
      //       index: this.state.storyAdCards.selectedStoryAd.index,
      //       story_id: data.queryParams.story_id,
      //       media: uri,
      //       iosVideoUploaded: true,
      //       media_type: "VIDEO",
      //       uploaded: true
      //     };
      //     cards[this.state.storyAdCards.selectedStoryAd.index] = card;
      //     this.setState({
      //       storyAdCards: {
      //         ...this.state.storyAdCards,
      //         // storyAdSelected: false,
      //         selectedStoryAd: {
      //           ...card
      //         }
      //       },
      //       videoIsLoading: false,
      //       iosVideoUploaded: true,
      //       type: "VIDEO"
      //     });
      //     this.props.save_campaign_info({
      //       selectedStoryAd: card,
      //       iosVideoUploaded: true,
      //       type: "VIDEO"
      //     });
      //   })
      //   .catch(error => {
      //     this.setState({
      //       videoIsLoading: false
      //     });
      //     // console.error(error);
      //     showMessage({
      //       message: "Something went wrong!",
      //       type: "warning",
      //       position: "top",
      //       description: "Please try again later. " + error
      //     });
      //   });
    } else {
      // this.setState({ videoIsLoading: true, media: "//", type: "VIDEO" });
      this.setState({
        ...this.state,
        media: data.queryParams.media,
        iosVideoUploaded: true,
        type: "VIDEO",
        videoIsLoading: false
      });
      this.props.save_campaign_info({
        media: data.queryParams.media,
        iosVideoUploaded: true,
        type: "VIDEO"
      });
      // FileSystem.downloadAsync(
      //   data.queryParams.media,
      //   FileSystem.cacheDirectory + data.queryParams.media.split("/")[5]
      // )
      //   .then(({ uri }) => {
      //     this.setState({
      //       ...this.state,
      //       media: uri,
      //       iosVideoUploaded: true,
      //       type: "VIDEO",
      //       videoIsLoading: false
      //     });
      //     this.props.save_campaign_info({
      //       media: uri,
      //       iosVideoUploaded: true,
      //       type: "VIDEO"
      //     });
      //   })
      //   .catch(error => {
      //     console.error(error);
      //     showMessage({
      //       message: "Something went wrong!",
      //       type: "warning",
      //       position: "top",
      //       description: "Please try again later. " + error
      //     });
      //   });
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
      !this.props.loadingStoryAdsArray.includes(true) &&
      !this.state.brand_nameError &&
      !this.state.headlineError &&
      !this.state.mediaError
    ) {
      let media =
        this.adType !== "StoryAd"
          ? { media: this.state.media }
          : {
              cover: this.rejected
                ? this.selectedCampaign.story_preview_media
                : this.props.data.cover,
              logo: this.rejected
                ? this.selectedCampaign.story_logo_media
                : this.props.data.logo
            };
      this.props.navigation.push(
        this.adType === "StoryAd" ? "StoryAdDesignReview" : "AdDesignReview",
        {
          ...media,
          type: this.state.type,
          call_to_action: this.state.campaignInfo.call_to_action.label,
          headline: this.state.campaignInfo.headline,
          brand_name: this.state.campaignInfo.brand_name,
          destination: this.state.campaignInfo.destination,
          icon_media_url: this.state.campaignInfo.attachment.icon_media_url,
          coverHeadline: this.rejected
            ? this.selectedCampaign.story_headline
            : this.props.data.coverHeadline,
          storyAdsArray: this.rejected
            ? this.selectedCampaign.story_creatives
            : this.props.storyAdsArray,
          collectionAdMedia: this.props.collectionAdMedia,
          campaignDetails: this.rejected,
          adDesign: true
        }
      );
    }
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
    const mediaError = validateWrapper(
      "mandatory",
      this.adType === "StoryAd"
        ? this.state.storyAdCards.selectedStoryAd.media
        : this.state.media
    );

    let swipeUpError = null;
    if (
      // !this.rejected &&
      this.adType === "CollectionAd" &&
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
      // !this.rejected &&
      this.adType === "SnapAd" &&
      this.state.objective !== "BRAND_AWARENESS" &&
      ((this.state.campaignInfo.attachment === "BLANK" &&
        this.state.campaignInfo.call_to_action.label === "BLANK") ||
        this.props.storyAdsArray.forEach(ad =>
          ad.hasOwnProperty("destination")
        ))
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
      mediaError,
      swipeUpError
    });
  };

  _handleStoryAdCards = card => {
    this.setState({ sourceChanging: true });
    this.setState({
      ...this.state,
      storyAdCards: {
        ...this.state.storyAdCards,
        storyAdSelected: true,
        selectedStoryAd: { ...card }
      },
      type: card.media_type,
      sourceChanging: false
    });
  };

  formatStoryAd = async () => {
    var storyBody = new FormData();
    let card = this.props.storyAdsArray[
      this.state.storyAdCards.selectedStoryAd.index
    ];
    if (
      !this.state.storyAdCards.selectedStoryAd.iosVideoUploaded &&
      card.rejectionUpload
    ) {
      let res = card.media.split("/");
      res = res[res.length - 1];

      let format = res.split(".")[1];
      var photo = {
        uri: card.media,
        type: card.media_type + "/" + format,
        name: res
      };
      storyBody.append("story_media", photo);
      storyBody.append("story_media_type", card.media_type);
    }
    if (
      card.hasOwnProperty("longformvideo_media" && card.rejectionLongVidUpload)
    ) {
      let resVideo = card.longformvideo_media.split("/ImagePicker/");
      let formatVideo = resVideo[1].split(".");
      var video = {
        uri: card.longformvideo_media,
        type: card.longformvideo_media_type + "/" + formatVideo[1],
        name: resVideo[1]
      };

      storyBody.append("story_longformvideo_media", video);
      storyBody.append(
        "story_longformvideo_media_type",
        card.longformvideo_media_type
      );
    }
    storyBody.append(
      "story_longformvideo_media_upload",
      card.rejectionLongVidUpload ? 1 : 0
    );
    storyBody.append(
      "story_name",
      this.rejected
        ? card.name
        : this.state.campaignInfo.brand_name + " " + card.index
    );
    storyBody.append(
      "story_destination",
      card.destination ? card.destination : "BLANK"
    );
    storyBody.append(
      "campaign_id",
      this.selectedCampaign
        ? this.selectedCampaign.campaign_id
        : this.props.campaign_id
    );
    storyBody.append(
      "story_order",
      this.rejected ? this.state.storyAdCards.selectedStoryAd.index : card.index
    );
    storyBody.append(
      "story_call_to_action",
      card.call_to_action ? card.call_to_action.value : "BLANK"
    );
    storyBody.append(
      "story_attachment",
      card.attachment !== "BLANK" ? JSON.stringify(card.attachment) : "BLANK"
    );

    card.story_id && storyBody.append("story_id", card.story_id);
    storyBody.append(
      "ios_upload",
      Platform.OS === "ios" && card.iosVideoUploaded ? 1 : 0
    );
    storyBody.append("story_media_upload", card.rejectionUpload ? 1 : 0);

    await this.handleUpload();
    await this.props.uploadStoryAdCard(
      storyBody,
      card,
      this.state.signal,
      this.rejected
    );
    this.setState({
      storyAdCards: {
        ...this.state.storyAdCards,
        storyAdSelected: false,

        numOfAds: this.state.storyAdCards.numOfAds + 1
      }
    });
    return;
  };
  formatMedia() {
    var body = new FormData();
    if (!this.state.iosVideoUploaded || this.adType === "StoryAd") {
      let storyAd = this.props.storyAdsArray.find(
        card =>
          card !== undefined && card.media && !card.media.includes("https://")
      );
      if (storyAd.media === "//") {
        storyAd.media = this.state.tempImage;
        storyAd.media_type = this.state.tempType;
      }

      let res = (this.adType !== "StoryAd"
        ? this.state.media
        : storyAd.media
      ).split("/");
      res = res[res.length - 1];

      let format = res.split(".")[1];

      var photo = {
        uri: this.adType !== "StoryAd" ? this.state.media : storyAd.media,
        type:
          (this.adType !== "StoryAd" ? this.state.type : storyAd.media_type) +
          "/" +
          format,
        name: res
      };
      body.append("media", photo);
      body.append(
        "media_type",
        this.adType !== "StoryAd" ? this.state.type : storyAd.media_type
      );
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
      body.append("weburl", this.state.campaignInfo.weburl);
      body.append("whatsappnumber", this.state.campaignInfo.whatsappnumber);
      body.append("callnumber", this.state.campaignInfo.callnumber);
    }
    body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);
    body.append("businessid", this.props.mainBusiness.businessid);
    body.append("campaign_id", this.state.campaignInfo.campaign_id);
    body.append(
      "campaign_name",
      this.rejected ? this.state.campaignInfo.headline : this.props.data.name
    );

    body.append("brand_name", this.state.campaignInfo.brand_name);
    body.append("headline", this.state.campaignInfo.headline);

    body.append("media_upload", this.state.rejectionUpload ? 1 : 0);

    body.append(
      "destination",
      this.adType !== "StoryAd" ? this.state.campaignInfo.destination : "STORY"
    );
    body.append("call_to_action", this.state.campaignInfo.call_to_action.value);
    body.append(
      "attachment",
      this.state.campaignInfo.attachment === "BLANK"
        ? this.state.campaignInfo.attachment
        : JSON.stringify(this.state.campaignInfo.attachment)
    );
    body.append(
      "ios_upload",
      Platform.OS === "ios" &&
        this.state.iosVideoUploaded &&
        this.adType !== "StoryAd"
        ? 1
        : 0
    );

    this.setState({
      formatted: body
    });
  }
  _handleSubmission = async () => {
    if (this.adType === "StoryAd" && this.state.storyAdCards.storyAdSelected) {
      this.formatStoryAd();
      return;
    }
    await this.validator();
    if (
      !this.props.loadingStoryAdsArray.includes(true) &&
      !this.state.brand_nameError &&
      !this.state.headlineError &&
      !this.state.swipeUpError &&
      !this.state.mediaError
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
        (this.props.data && !this.props.data.hasOwnProperty("formatted")) ||
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
              media: this.state.media
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

  toggleAdSelection = () => {
    this.state.storyAdCards.storyAdSelected
      ? this.setState({
          ...this.state,
          storyAdCards: {
            ...this.state.storyAdCards,
            storyAdSelected: false
          }
        })
      : this.props.navigation.goBack();
  };

  collectionComp = i => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#FF9D00",
            width: hp(5) < 30 ? 60 : 72,
            // width: 70,
            paddingVertical: 5,
            paddingHorizontal: 5,
            height: 25,
            borderRadius: 20,
            marginBottom: -15,
            zIndex: 1,
            alignItems: "center"
            // flex: 1
          }}
        >
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              width: "100%",
              fontFamily: "montserrat-bold",
              color: "#FFF"
            }}
          >
            {`Product ${i + 1}`}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: this.props.collectionAdMedia[i]
              ? ""
              : "rgba(0, 0, 0, 0.75)",
            alignSelf: "center",
            borderColor: "#FF9D00",
            borderWidth: 2,
            // width: 72,
            width: hp(5) < 30 ? 60 : 72,
            height: hp(5) < 30 ? 60 : 72,
            // height: hp(9.5),
            borderRadius: 20,
            // paddingVertical: 2,
            // paddingHorizontal: 2,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            this.props.navigation.push("CollectionMedia", {
              collection_order: i,
              rejected: this.rejected,
              selectedCampaign: this.selectedCampaign
            });
          }}
        >
          {!isUndefined(this.props.collectionAdMedia[i]) ? (
            <RNImageOrCacheImage
              style={{
                borderRadius: 20,
                alignSelf: "center",
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "center"
              }}
              media={
                this.props.collectionAdMedia[i][
                  this.props.collectionAdMedia[i].localUri
                    ? "localUri"
                    : "media"
                ]
              }
            />
          ) : (
            <Button
              style={{
                width: hp(5) < 30 ? 20 : 30,
                height: hp(5) < 30 ? 20 : 30,
                alignSelf: "center",
                borderRadius: hp(5) < 30 ? 20 : 30,
                backgroundColor: "#FF9D00"
              }}
              onPress={() => {
                this.props.navigation.push("CollectionMedia", {
                  collection_order: i,
                  rejected: this.rejected,
                  selectedCampaign: this.selectedCampaign
                });
              }}
            >
              <PlusCircle
                width={hp(5) < 30 ? 20 : 30}
                height={hp(5) < 30 ? 35 : 30}
              />
            </Button>
          )}
          {!isUndefined(this.props.collectionAdMedia[i]) && (
            <View style={{ position: "absolute", bottom: 6, right: 6 }}>
              <PenIcon width={15} height={15} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let { media, storyAdCards } = this.state;
    let validCards =
      this.adType === "StoryAd"
        ? this.rejected
          ? this.selectedCampaign.story_creatives.filter(ad => ad.story_id)
          : this.props.storyAdsArray.filter(ad => ad.uploaded)
        : 3;
    let showContinueBtn =
      this.adType === "SnapAd" ||
      (this.adType === "StoryAd" &&
        ((!this.state.storyAdCards.storyAdSelected && validCards.length >= 3) ||
          (this.state.storyAdCards.storyAdSelected &&
            storyAdCards.selectedStoryAd.media !== "//")));
    let {
      brand_name,
      headline,
      destination,
      attachment,
      call_to_action
    } = this.state.campaignInfo;

    let inputFields = ["Business Name", "Headline"].map(field => (
      <PenIconBrand
        rejected={this.rejected}
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
      this.adType === "SnapAd" ? (
        // !this.rejected &&
        "BRAND_AWARENESS" !== this.state.objective && (
          <SwipeUpComponent
            _changeDestination={this._changeDestination}
            navigation={this.props.navigation}
            objective={this.state.objective}
            destination={destination}
            attachment={attachment}
            collectionAdLinkForm={this.props.collectionAdLinkForm}
            adType={this.adType}
            media={media}
            call_to_action_label={call_to_action.label}
          />
        )
      ) : this.adType === "CollectionAd" ? (
        <SwipeUpComponent
          _changeDestination={this._changeDestination}
          navigation={this.props.navigation}
          objective={this.state.objective}
          destination={destination}
          attachment={attachment}
          collectionAdLinkForm={this.props.collectionAdLinkForm}
          adType={this.adType}
          call_to_action_label={call_to_action.label}
        />
      ) : (
        this.adType === "StoryAd" &&
        this.state.storyAdCards.storyAdSelected && (
          <SwipeUpComponent
            _changeDestination={this._changeDestination}
            navigation={this.props.navigation}
            objective={this.state.objective}
            destination={storyAdCards.selectedStoryAd.destination}
            attachment={storyAdCards.selectedStoryAd.attachment}
            adType={this.adType}
            media={storyAdCards.selectedStoryAd.media}
            call_to_action_label={
              storyAdCards.selectedStoryAd.call_to_action.label
            }
          />
        )
      );

    let collection = (
      <View style={styles.collectionView}>
        {this.collectionComp(0)}
        {this.collectionComp(1)}
        {this.collectionComp(2)}
        {this.collectionComp(3)}
      </View>
    );

    let blankView = <View style={styles.blankView} />;

    let videoPlayer = this.state.sourceChanging ? null : (
      <Video
        onLoadStart={() =>
          storyAdCards.selectedStoryAd.media &&
          this.state.storyAdCards.storyAdSelected &&
          this.setState({ videoIsLoading: true })
        }
        onLoad={() => this.setState({ videoIsLoading: false })}
        source={{
          uri:
            media !== "//" && !this.state.storyAdCards.storyAdSelected
              ? media
              : storyAdCards.selectedStoryAd.media &&
                storyAdCards.storyAdSelected
              ? storyAdCards.selectedStoryAd.media
              : "//"
        }}
        shouldPlay
        isLooping
        isMuted
        resizeMode={"stretch"}
        style={styles.video}
      />
    );

    let submitButton = () => {
      if (this.adType === "CollectionAd") {
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
          !this.state.swipeUpError
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
            actionButton={this.toggleAdSelection}
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
                    {videoPlayer}
                    {inputFields}
                    {this.adType === "StoryAd" &&
                    !this.state.storyAdCards.storyAdSelected ? (
                      <SnapAds
                        rejected={this.rejected}
                        video={true}
                        openUploadVideo={this.openUploadVideo}
                        selectedStoryAd={storyAdCards.selectedStoryAd}
                        snapAdsCards={this.props.storyAdsArray}
                        _handleStoryAdCards={this._handleStoryAdCards}
                      />
                    ) : (
                      <MediaButton
                        media={
                          media !== "//"
                            ? media
                            : storyAdCards.selectedStoryAd.media
                        }
                        setMediaModalVisible={this.setMediaModalVisible}
                      />
                    )}
                    {this.state.videoIsLoading ? <CameraLoading /> : null}
                    {swipeUpComp}
                    {this.adType === "CollectionAd" && collection}
                  </View>
                ) : (this.adType !== "StoryAd" && !media) ||
                  (this.adType === "StoryAd" &&
                    !this.state.storyAdCards.storyAdSelected) ? (
                  <View style={styles.placeholder}>
                    {blankView}

                    {inputFields}
                    {this.adType === "StoryAd" &&
                    !this.state.storyAdCards.storyAdSelected ? (
                      <SnapAds
                        rejected={this.rejected}
                        openUploadVideo={this.openUploadVideo}
                        selectedStoryAd={storyAdCards.selectedStoryAd}
                        cancelUpload={this.cancelUpload}
                        snapAdsCards={this.props.storyAdsArray}
                        _handleStoryAdCards={this._handleStoryAdCards}
                      />
                    ) : (
                      <MediaButton
                        setMediaModalVisible={this.setMediaModalVisible}
                        media={
                          media === "//"
                            ? media
                            : storyAdCards.selectedStoryAd.media
                        }
                      />
                    )}

                    {swipeUpComp}
                    {this.adType === "CollectionAd" && collection}
                  </View>
                ) : (
                  <View style={styles.placeholder}>
                    <RNImageOrCacheImage
                      media={
                        media !== "//"
                          ? media
                          : storyAdCards.selectedStoryAd.media
                          ? storyAdCards.selectedStoryAd.media
                          : ""
                      }
                      style={styles.placeholder1}
                    />

                    {inputFields}
                    {this.adType === "StoryAd" &&
                    !this.state.storyAdCards.storyAdSelected ? (
                      <SnapAds
                        rejected={this.rejected}
                        numOfAds={this.state.storyAdCards.numOfAds}
                        openUploadVideo={this.openUploadVideo}
                        selectedStoryAd={storyAdCards.selectedStoryAd}
                        cancelUpload={this.cancelUpload}
                        snapAdsCards={this.props.storyAdsArray}
                        _handleStoryAdCards={this._handleStoryAdCards}
                      />
                    ) : (
                      <MediaButton
                        setMediaModalVisible={this.setMediaModalVisible}
                        media={
                          media !== "//"
                            ? media
                            : storyAdCards.selectedStoryAd.media
                        }
                      />
                    )}
                    {swipeUpComp}

                    {this.adType === "CollectionAd" && collection}
                  </View>
                )}
              </View>
            </Transition>

            {/* {!this.state.imageError ? null : (
              <Text style={styles.errorMsg}>
                {!this.state.mediaError.includes("blank")
                  ? this.state.mediaError
                  : "Please choose an image or video"}
              </Text>
            )} */}
            {!this.state.swipeUpError ? null : (
              <Text style={styles.swipeUpErrorText}>
                {this.state.swipeUpError}
              </Text>
            )}
          </Content>

          <Footer style={styles.footerStyle}>
            {(this.adType !== "StoryAd" && media !== "//") ||
            (this.state.storyAdCards.storyAdSelected &&
              this.state.storyAdCards.selectedStoryAd.media !== "//" &&
              !this.state.videoIsLoading) ||
            validCards.length >= 3 ? (
              <View style={styles.footerButtonsContainer}>
                {this.adType === "StoryAd" ? (
                  !this.state.storyAdCards.storyAdSelected && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.perviewHandler()}
                    >
                      {this.props.loadingStoryAdsArray.includes(true) ? (
                        <Button rounded style={styles.loadingButtons}>
                          <ActivityIndicator />
                        </Button>
                      ) : (
                        <EyeIcon width={wp(24)} height={hp(8)} />
                      )}
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.perviewHandler()}
                  >
                    <EyeIcon width={wp(24)} height={hp(8)} />
                  </TouchableOpacity>
                )}

                {this.adType === "StoryAd" ? (
                  showContinueBtn ? (
                    <TouchableOpacity
                      onPress={this._handleSubmission}
                      style={styles.button}
                    >
                      {(this.props.loadingStoryAdsArray.includes(true) ||
                        this.state.tempImageloading) &&
                      !this.state.storyAdCards.storyAdSelected ? (
                        <Button
                          rounded
                          style={[
                            styles.loadingButtons,
                            { backgroundColor: globalColors.orange }
                          ]}
                        >
                          <ActivityIndicator />
                        </Button>
                      ) : (
                        <ForwardButton width={wp(24)} height={hp(8)} />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.footerTextStyle}>
                      {this.adType === "StoryAd"
                        ? this.state.videoIsLoading
                          ? "Please wait while the video is downloading"
                          : "Please add minimum of 3 medias to proceed"
                        : "Please add media to proceed"}
                    </Text>
                  )
                ) : (
                  submitButton()
                )}
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                {this.adType === "StoryAd"
                  ? this.state.videoIsLoading
                    ? "Please wait while the video is downloading"
                    : "Please add minimum of 3 medias to proceed"
                  : "Please add media to proceed"}
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

              <CameraLoading center={true} />
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
  adType: state.campaignC.adType,
  storyAdsArray: state.campaignC.storyAdsArray,
  loadingStoryAdsArray: state.campaignC.loadingStoryAdsArray,
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
  uploadStoryAdCard: (info, card, cancelUpload, iosUploadVideo, rejected) =>
    dispatch(
      actionCreators.uploadStoryAdCard(
        info,
        card,
        cancelUpload,
        iosUploadVideo,
        rejected
      )
    ),
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
  setRejectedStoryAds: data =>
    dispatch(actionCreators.setRejectedStoryAds(data)),
  setRejectedCollectionAds: data =>
    dispatch(actionCreators.setRejectedCollectionAds(data)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDesign);
