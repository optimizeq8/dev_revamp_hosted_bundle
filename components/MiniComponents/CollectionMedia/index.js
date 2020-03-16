import React, { Component } from "react";
import { Linking } from "expo";
import { BlurView } from "expo-blur";
import * as ImageManipulator from "expo-image-manipulator";
import * as Segment from "expo-analytics-segment";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler,
  ScrollView,
  I18nManager
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
import * as Animatable from "react-native-animatable";
import Axios from "axios";
import { Modal } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import CustomHeader from "../Header";
import KeyboardShift from "../KeyboardShift";
import CameraLoading from "../CameraLoading";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import CameraEdit from "../../../assets/SVGs/CameraCircleOutline";

// Style
import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";

//Data
import { netLoc } from "../../Data/callactions.data";

//Functions
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import isNull from "lodash/isNull";
import split from "lodash/split";
import segmentEventTrack from "../../segmentEventTrack";
import LowerButton from "../LowerButton";
import { PESDK, Configuration } from "react-native-photoeditorsdk";
import PhotoEditorConfiguration from "../../Functions/PhotoEditorConfiguration";

class CollectionMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {
        collection_id: "",
        collection_name: "",
        collection_destination:
          this.props.collectionAdLinkForm === 1
            ? "REMOTE_WEBPAGE"
            : "DEEP_LINK",
        collection_attachment: "",
        collection_media: null,
        collection_order: 0
      },
      urlError: "",
      networkString: "http://",
      netLoc: netLoc,
      loaded: 0,
      isVisible: false,
      signal: null,
      imageError: null,
      directory: "/ImagePicker/",
      type: "",
      formatted: null,
      localUri: null,
      deep_link_uriError: "",
      rejectionColUpload: false
    };
  }

  async componentDidMount() {
    Segment.screen("Collection Media");
    let order = this.props.navigation.getParam("collection_order");
    const { translate } = this.props.screenProps;
    await this.setState({
      collection: {
        ...this.state.collection,
        collection_order: order,
        collection_name: this.props.collectionAdMedia[order]
          ? this.props.collectionAdMedia[order].name
          : this.props.data.name + "_" + order
      }
    });

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        // this.onToggleModal();
        const pkg = Constants.manifest.releaseChannel
          ? Constants.manifest.android.package // When published, considered as using standalone build
          : "host.exp.exponent"; // In expo client mode

        showMessage({
          message: translate(
            "Please allow access to the gallery to upload media"
          ),
          position: "top",
          type: "warning",
          onPress: () =>
            Platform.OS === "ios"
              ? Linking.openURL("app-settings:")
              : Platform.OS === "android" &&
                IntentLauncher.startActivityAsync(
                  IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                  { data: "package:" + pkg }
                ),
          duration: 5000,
          description: translate("Press here to open settings")
        });
      }
    }
    let collAds = this.props.collectionAdMedia;
    if (
      Object.keys(this.state.collection)
        .map(key => {
          if (collAds[order] && collAds[order].hasOwnProperty(key)) return true;
        })
        .includes(true)
    ) {
      if (collAds[order].collection_attachment === "BLANK") {
        this.setState({
          collection: {
            ...this.state.collection,

            ...collAds[order],
            collection_attachment: "",
            collection_media:
              collAds[order][collAds[order].localUri ? "localUri" : "media"]
          },
          localUri:
            collAds[order][collAds[order].localUri ? "localUri" : "media"],
          rejectionColUpload: true
        });
      } else if (
        (this.props.collectionAdLinkForm === 1 &&
          collAds[order].collection_destination === "REMOTE_WEBPAGE") ||
        (this.props.collectionAdLinkForm === 2 &&
          collAds[order].collection_destination === "DEEP_LINK") ||
        collAds[order].interaction_type
      ) {
        if (
          this.props.collectionAdLinkForm === 1 ||
          collAds[order].interaction_type === "WEB_VIEW"
        ) {
          const url = split(
            JSON.parse(
              collAds[order][
                collAds[order].collection_attachment
                  ? "collection_attachment"
                  : "attachment_properties"
              ]
            ).url,
            "://"
          );
          this.setState({
            collection: {
              ...this.state.collection,
              ...collAds[order],
              collection_attachment: url[1].includes("?utm_source")
                ? url[1].split("?utm_source")[0]
                : url[1],
              collection_media:
                collAds[order][collAds[order].localUri ? "localUri" : "media"]
            },
            networkString: url[0] + "://",
            localUri:
              collAds[order][collAds[order].localUri ? "localUri" : "media"]
          });
        } else {
          const deep_link_uri = JSON.parse(
            collAds[order][
              collAds[order].collection_attachment
                ? "collection_attachment"
                : "attachment_properties"
            ]
          ).deep_link_uri;
          this.setState({
            collection: {
              ...this.state.collection,

              ...collAds[order],
              collection_attachment: deep_link_uri,
              collection_media:
                collAds[order][collAds[order].localUri ? "localUri" : "media"]
            },
            localUri:
              collAds[order][collAds[order].localUri ? "localUri" : "media"]
          });
        }
      }
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  validateImage = () => {
    const { translate } = this.props.screenProps;
    const imageError = validateWrapper(
      "mandatory",
      this.state.collection.collection_media
    );
    this.setState({
      imageError
    });
    if (imageError) {
      showMessage({
        message: translate("Please choose an image"),
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };

  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const urlError = validateWrapper(
      "website",
      this.state.networkString + this.state.collection.collection_attachment
    );
    this.setState({
      urlError
    });
    if (urlError) {
      showMessage({
        message: translate("Please enter a valid URL"),
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };

  onToggleModal = visibile => {
    this.setState({ isVisible: visibile });
  };

  _getUploadState = loading => {
    this.setState({
      loaded: loading
    });
  };

  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };

  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };

  pick = async () => {
    let status = await this.askForPermssion();
    this.onToggleModal(true);
    let result = "";
    if (status === "granted") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        base64: false,
        exif: false,
        quality: 0.8
      });
    }

    return result;
  };

  _pickImage = async () => {
    try {
      const { translate } = this.props.screenProps;
      let result = await this.pick();
      let configuration = PhotoEditorConfiguration({ width: 1, height: 1 });
      let file = {};
      if (result) {
        file = await FileSystem.getInfoAsync(result.uri, {
          size: true
        });
        this.setState({ directory: "/ImagePicker/" });
        await this.validateImage();
      }
      if (result && !result.cancelled) {
        if (result.width >= 160 && result.height >= 160) {
          PESDK.openEditor(result.uri, configuration)
            .then(async manipResult => {
              let newDimensions = await ImageManipulator.manipulateAsync(
                manipResult.image
              );
              if (newDimensions.width !== newDimensions.height) {
                //incase the user undos the cropping of 1:1
                this.setState({
                  imageError:
                    "Image's aspect ratio must be 1:1\nwith a minimum size of 160px x 160px.",
                  collection: {
                    ...this.state.collection,
                    collection_media: null
                  }
                });
                segmentEventTrack("Error Collection Ad Media", {
                  campaign_error_collection_media_image:
                    "User undid the cropping,Image's aspect ratio must be 1:1\nwith a minimum size of 160px x 160px"
                });
                this.onToggleModal(false);

                return Promise.reject({
                  wrongAspect: true,
                  message: "Image's aspect ratio must be 1:1"
                });
              }
              if (newDimensions.width > 1200) {
                //resize image to be less than 2 MB
                newDimensions = await ImageManipulator.manipulateAsync(
                  newDimensions.uri,
                  [{ resize: { width: 1200, height: 1200 } }]
                );
              }
              this.setState({
                directory: "/ImageManipulator/"
              });
              result.uri = newDimensions.uri;
              result.height = newDimensions.height;
              result.width = newDimensions.width;
            })
            .then(async () => {
              file = await FileSystem.getInfoAsync(result.uri, {
                size: true
              });
              if (file.size > 2000000) {
                this.setState({
                  imageError: "Image must be less than 2 MBs.",
                  collection: {
                    ...this.state.collection,
                    collection_media: null
                  }
                });
                segmentEventTrack("Error Collection Ad Media", {
                  campaign_error_collection_media_image:
                    "Image must be less than 2 MBs"
                });
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
              } else {
                this.setState({
                  type: result.type.toUpperCase(),
                  imageError: null,
                  collection: {
                    ...this.state.collection,
                    collection_media: result.uri
                  },
                  localUri: result.uri,
                  rejectionColUpload: true
                });
                segmentEventTrack("Selected Collection Ad Image successfully");
                segmentEventTrack(
                  "Selected Collection Ad Image serialization",
                  {
                    ...serialization
                  }
                );
                this.onToggleModal(false);
                showMessage({
                  message: translate("Image has been selected successfully"),
                  position: "top",
                  type: "success"
                });
              }
            })
            .catch(error => {
              // console.log(error);
              segmentEventTrack("Error Collection Ad Media", {
                campaign_error_collection_media_image:
                  "Please choose another image"
              });
              this.onToggleModal(false);
              showMessage({
                message: error.wrongAspect
                  ? error.message
                  : translate("Please choose another image"),
                position: "top",
                type: "warning"
              });
              return;
            });
          return;
        } else if (result.width < 160 || result.height < 160) {
          this.setState({
            imageError:
              "Image's aspect ratio must be 1:1\nwith a minimum size of 160px x 160px.",
            collection: {
              ...this.state.collection,
              collection_media: null
            }
          });
          segmentEventTrack("Error Collection Ad Media", {
            campaign_error_collection_media_image:
              "Image's aspect ratio must be 1:1\nwith a minimum size of 160px x 160px"
          });
          this.onToggleModal(false);
          showMessage({
            message: translate(
              "Image's aspect ratio must be 1:1\nwith a minimum size of 160px x 160px"
            ),
            position: "top",
            type: "warning"
          });
          return;
        }
      } else if (
        result &&
        !result.cancelled &&
        isNull(this.state.collection.collection_media)
      ) {
        segmentEventTrack("Error Collection Ad Media", {
          campaign_error_collection_media_image: "Please choose a media file"
        });
        showMessage({
          message: translate("Please choose a media file"),
          position: "top",
          type: "warning"
        });
        this.setState({
          imageError: "Please choose a media file.",
          collection: {
            ...this.state.collection,
            collection_media: null
          }
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

  askForPermssion = async () => {
    const { translate } = this.props.screenProps;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      this.onToggleModal(false);
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.android.package // When published, considered as using standalone build
        : "host.exp.exponent"; // In expo client mode

      showMessage({
        message: translate(
          "Please allow access to the gallery to upload media"
        ),
        position: "top",
        type: "warning",
        onPress: () =>
          Platform.OS === "ios"
            ? Linking.openURL("app-settings:")
            : Platform.OS === "android" &&
              IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                { data: "package:" + pkg }
              ),
        duration: 5000,
        description: translate("Press here to open settings")
      });
    }
    return status;
  };

  formatMedia() {
    var body = new FormData();

    let res = this.state.localUri.split("/");
    res = res[res.length - 1];
    let format = res.split(".");

    var photo = {
      uri: this.state.localUri,
      type: "IMAGE" + "/" + format[1],
      name: res
    };
    body.append("collection_name", this.state.collection.collection_name);
    body.append(
      "collection_destination",
      this.props.collectionAdLinkForm === 1 ? "REMOTE_WEBPAGE" : "DEEP_LINK"
    );
    if (this.props.collectionAdLinkForm === 1) {
      body.append(
        "collection_attachment",
        JSON.stringify({
          url:
            this.state.networkString +
            this.state.collection.collection_attachment
        })
      );
    } else {
      body.append(
        "collection_attachment",
        JSON.stringify({
          deep_link_uri: this.state.collection.collection_attachment
        })
      );
    }
    body.append("collection_order", this.state.collection.collection_order);
    body.append("collection_media", photo);
    body.append(
      "campaign_id",
      this.props.navigation.getParam("rejected", false)
        ? this.props.navigation.getParam("selectedCampaign", {}).campaign_id
        : this.props.campaign_id
    );
    body.append(
      "campaign_name",
      this.props.navigation.getParam("rejected", false)
        ? this.props.navigation.getParam("selectedCampaign", {}).name
        : this.props.data.name
    );
    // body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);

    if (this.state.collection.collection_id !== "") {
      body.append("collection_id", this.state.collection.collection_id);
    }
    body.append(
      "collection_media_upload",
      this.state.rejectionColUpload ? 1 : 0
    );

    this.setState({
      formatted: body
    });
  }

  _handleSubmission = async () => {
    if (this.state.rejectionColUpload) {
      const validImage = await this.validateImage();
      if (this.props.collectionAdLinkForm === 1) {
        const validUrl = await this.validateUrl();
        if (!validUrl || !validImage) {
          segmentEventTrack("Error Collection Media Submit", {
            campaign_error_collection_media_image: this.state.imageError,
            campaign_error_collection_ad_website_url: this.state.urlError
          });
        }
        if (validUrl && validImage) {
          await this.formatMedia();
          await this.handleUpload();
          this.props.save_collection_media(
            this.state.formatted,
            this.state.localUri,
            this._getUploadState,
            this.props.navigation,
            this.state.signal,
            this.onToggleModal
          );
        }
      } else {
        const validDeepLinkURL = await this.validateDeepLinkUrl();
        if (!validDeepLinkURL || !validImage) {
          segmentEventTrack("Error Collection Media Submit", {
            campaign_error_collection_media_image: this.state.imageError,
            campaign_error_collection_media_deeplink_url: this.state
              .deep_link_uriError
          });
        }
        if (validDeepLinkURL && validImage) {
          await this.formatMedia();
          await this.handleUpload();
          this.props.save_collection_media(
            this.state.formatted,
            this.state.localUri,
            this._getUploadState,
            this.props.navigation,
            this.state.signal,
            this.onToggleModal
          );
        }
      }
    } else {
      this.props.navigation.goBack();
    }
  };

  validateDeepLinkUrl = () => {
    const { translate } = this.props.screenProps;
    const deep_link_uriError = validateWrapper(
      "deepLink",
      this.state.collection.collection_attachment
    );
    this.setState({
      deep_link_uriError
    });
    if (deep_link_uriError) {
      showMessage({
        message: translate("Invalid deep link URL"),
        description: translate(
          "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://urlcom'"
        ),
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };

  renderMediaButton = () => {
    const { translate } = this.props.screenProps;
    if (this.state.collection.collection_media) {
      return (
        <TouchableOpacity
          style={styles.inputMiddleButtonEdit}
          onPress={() => {
            segmentEventTrack("Opened Gallery to select Collection Ad media");
            this._pickImage();
          }}
        >
          <CameraEdit width={70} height={70} />
          <Text style={styles.mediaButtonMsg1}>{translate("Edit Image")}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.inputMiddleButton}
          onPress={() => {
            segmentEventTrack("Opened Gallery to select Collection Ad media");
            this._pickImage();
          }}
        >
          <Icon style={styles.icon} name="camera" />
          <Text style={styles.mediaButtonMsg}>{translate("Add Image")}</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "always", top: "always" }}
      >
        <Container style={styles.container}>
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Go Back from Collection Media Upload",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title={"Compose Collection Ad"}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <KeyboardShift style={{}}>
              {() => (
                <View style={styles.mainView}>
                  <View style={styles.imageView}>
                    <Text style={styles.productText}>
                      {`${translate("Product")} ${parseInt(
                        this.state.collection.collection_order
                      ) + 1}`}
                    </Text>
                  </View>
                  {isNull(this.state.collection.collection_media) ? (
                    <View style={styles.placeholder}>
                      <View style={styles.blankView} />
                      {this.renderMediaButton()}
                    </View>
                  ) : (
                    <View style={styles.placeholder}>
                      <Image
                        style={styles.imagePlaceholder}
                        source={{ uri: this.state.localUri }}
                        resizeMode="cover"
                      />
                      {this.renderMediaButton()}
                    </View>
                  )}
                  {!this.state.imageError ? null : (
                    <Text style={styles.errorMsg}>
                      {!this.state.imageError.includes("blank")
                        ? this.state.imageError
                        : translate("Please choose an image or video")}
                    </Text>
                  )}

                  {this.props.collectionAdLinkForm === 2 ? (
                    <Animatable.View
                      onAnimationEnd={() =>
                        this.setState({ deep_link_uriError: null })
                      }
                      duration={200}
                      easing={"ease"}
                      animation={!this.state.deep_link_uriError ? "" : "shake"}
                      style={{ marginVertical: 30 }}
                    >
                      <View style={styles.deepLinkLabelView}>
                        <Text uppercase style={styles.inputLabel}>
                          {translate("Deep Link URL")}
                        </Text>
                      </View>
                      <Item
                        style={[
                          styles.input
                          // this.state.deep_link_uriError
                          //   ? GlobalStyles.redBorderColor
                          //   : GlobalStyles.transparentBorderColor
                        ]}
                      >
                        <Input
                          value={this.state.collection.collection_attachment}
                          style={styles.inputtext}
                          placeholder={translate("Enter Deep Link URL")}
                          placeholderTextColor="white"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              collection: {
                                ...this.state.collection,
                                collection_attachment: value
                              }
                            });
                          }}
                          onBlur={async () => {
                            segmentEventTrack(
                              "Changed Collection Media deep link url Attachment",
                              {
                                campaign_collection_attachment: this.state
                                  .collection.collection_attachment
                              }
                            );
                            const valid = await this.validateDeepLinkUrl();
                            if (!valid) {
                              segmentEventTrack(
                                "Error Collection on blur deep link url",
                                {
                                  campaign_error_collection_deeplink_url: this
                                    .state.deep_link_uriError
                                }
                              );
                            }
                          }}
                        />
                      </Item>
                    </Animatable.View>
                  ) : (
                    <View style={styles.topContainer}>
                      <View style={styles.inputContainer}>
                        <View style={styles.websiteView}>
                          <View style={[styles.websiteLabelView]}>
                            <Text uppercase style={[styles.inputLabel]}>
                              {translate("Website")}
                            </Text>
                          </View>
                          <Item
                            style={[
                              styles.input
                              // this.state.urlError
                              //     ? GlobalStyles.redBorderColor
                              //     : GlobalStyles.transparentBorderColor
                            ]}
                          >
                            <TouchableOpacity
                              style={[
                                GlobalStyles.orangeBackgroundColor,
                                {
                                  borderRadius: 30,
                                  width: 54,
                                  height: 54,
                                  alignItems: "center",
                                  justifyContent: "center"
                                }
                              ]}
                              onPress={() => {
                                if (this.state.networkString === "https://") {
                                  segmentEventTrack(
                                    "Changed Collection Media Website url Network String",
                                    {
                                      campaign_collection_ad_website_network_string:
                                        "http://"
                                    }
                                  );
                                  this.setState({
                                    networkString: "http://"
                                  });
                                } else {
                                  segmentEventTrack(
                                    "Changed Collection Media Website url Network String",
                                    {
                                      campaign_collection_ad_website_network_string:
                                        "https://"
                                    }
                                  );
                                  this.setState({
                                    networkString: "https://"
                                  });
                                }
                              }}
                            >
                              <Text uppercase style={styles.networkLabel}>
                                {this.state.networkString === "https://"
                                  ? "https"
                                  : "http"}
                              </Text>
                              <Text uppercase style={styles.networkLabel}>
                                {`< >`}
                              </Text>
                            </TouchableOpacity>
                            <Input
                              style={[
                                styles.inputtext,
                                I18nManager.isRTL
                                  ? { textAlign: "right" }
                                  : { textAlign: "left" }
                              ]}
                              placeholder={translate(
                                "Enter your website's URL"
                              )}
                              placeholderTextColor={globalColors.white}
                              value={
                                this.state.collection.collection_attachment
                              }
                              autoCorrect={false}
                              autoCapitalize="none"
                              onChangeText={value =>
                                this.setState({
                                  collection: {
                                    ...this.state.collection,
                                    collection_attachment: value
                                  },
                                  rejectionColUpload: true
                                })
                              }
                              onBlur={async () => {
                                segmentEventTrack(
                                  "Changed Collection Media Website url",
                                  {
                                    campaign_collection_ad_website_url: this
                                      .state.collection.collection_attachment
                                  }
                                );
                                const valid = await this.validateUrl();
                                if (!valid) {
                                  segmentEventTrack(
                                    "Error on Blur Collection Ad Website URL ",
                                    {
                                      campaign_error_collection_ad_website_url: this
                                        .state.urlError
                                    }
                                  );
                                }
                              }}
                            />
                          </Item>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </KeyboardShift>
          </ScrollView>
          <View style={styles.footerStyle}>
            {this.state.collection.collection_media ? (
              <View style={styles.footerButtonsContainer}>
                <LowerButton
                  function={this._handleSubmission}
                  style={styles.button}
                  checkmark
                />
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                {translate("Please add media and link to proceed")}
              </Text>
            )}
          </View>
        </Container>
        <Modal
          visible={this.props.loading || this.state.isVisible}
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
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => this.cancelUpload()}
                  title={"Uploading Image"}
                />
              )}
              {!this.props.loading && (
                <CustomHeader
                  screenProps={this.props.screenProps}
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
  loading: state.campaignC.collectionLoader,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType,
  collectionAdMedia: state.campaignC.collectionAdMedia,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm
});

const mapDispatchToProps = dispatch => ({
  save_collection_media: (
    media,
    localUri,
    loading,
    navigation,
    cancelUplaod,
    onToggleModal
  ) =>
    dispatch(
      actionCreators.save_collection_media(
        media,
        localUri,
        loading,
        navigation,
        cancelUplaod,
        onToggleModal
      )
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(CollectionMedia);
