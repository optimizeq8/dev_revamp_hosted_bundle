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
  ScrollView
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import Axios from "axios";
import { Modal } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import CustomHeader from "../Header";
import KeyboardShift from "../KeyboardShift";
import CameraLoading from "../CameraLoading";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import Checkmark from "../../../assets/SVGs/Checkmark";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

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
      deep_link_urlError: "",
      rejectionColUpload: false
    };
  }

  async componentDidMount() {
    let order = this.props.navigation.getParam("collection_order");

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
        showMessage({
          message: "Please allow access to the gallary to upload media.",
          position: "top",
          type: "warning"
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
      if (
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
              collection_attachment: deep_link_uri
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
    const imageError = validateWrapper(
      "mandatory",
      this.state.collection.collection_media
    );
    this.setState({
      imageError
    });
    if (imageError) {
      showMessage({
        message: "Please choose an image",
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
    const urlError = validateWrapper(
      "website",
      this.state.networkString + this.state.collection.collection_attachment
    );
    this.setState({
      urlError
    });
    if (urlError) {
      showMessage({
        message: "Please enter a vaild url",
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
    await this.askForPermssion();
    this.onToggleModal(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      base64: false,
      exif: false,
      quality: 0.8
    });

    return result;
  };

  _pickImage = async () => {
    try {
      let result = await this.pick();

      let file = await FileSystem.getInfoAsync(result.uri, {
        size: true
      });
      this.setState({ directory: "/ImagePicker/" });
      let newWidth = result.width;
      let newHeight = result.height;
      await this.validateImage();

      if (!result.cancelled) {
        if (result.width >= 160 && result.height >= 160) {
          newWidth = 160;
          newHeight = 160;
          ImageManipulator.manipulateAsync(
            result.uri,
            [
              {
                resize:
                  result.height < result.width
                    ? { height: newHeight }
                    : { width: newWidth }
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
                      originX: (manipResult.width - 160) / 2,
                      originY: (manipResult.height - 160) / 2,
                      width: 160,
                      height: 160
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
                this.onToggleModal(false);
                showMessage({
                  message: "Image must be less than 2 MBs.",
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
                this.onToggleModal(false);
                showMessage({
                  message: "Image has been selected successfully ",
                  position: "top",
                  type: "success"
                });
              }
            })
            .catch(error => {
              console.log(error);

              this.onToggleModal(false);
              showMessage({
                message: "Please choose another image",
                position: "top",
                type: "warning"
              });
              return;
            });
          return;
        } else if (result.width < 160 || result.height < 160) {
          this.setState({
            imageError:
              "Image's aspect ratio must be 1:1\nwith a size of 160px x 160px.",
            collection: {
              ...this.state.collection,
              collection_media: null
            }
          });
          this.onToggleModal(false);
          showMessage({
            message:
              "Image's aspect ratio must be 1:1\nwith a size of 160px x 160px.",
            position: "top",
            type: "warning"
          });
          return;
        } else if (file.size > 2000000) {
          this.setState({
            imageError: "Image must be less than 2 MBs.",
            collection: {
              ...this.state.collection,
              collection_media: null
            }
          });
          this.onToggleModal(false);
          showMessage({
            message: "Image must be less than 2 MBs.",
            position: "top",
            type: "warning"
          });

          return;
        } else {
          this.setState({
            collection: {
              ...this.state.collection,
              collection_media: result.uri
            },
            type: result.type.toUpperCase(),
            imageError: null
          });
          this.onToggleModal(false);
          showMessage({
            message: "Image has been selected successfully ",
            position: "top",
            type: "success"
          });
          return;
        }
      } else if (
        !result.cancelled &&
        isNull(this.state.collection.collection_media)
      ) {
        showMessage({
          message: "Please choose a media file.",
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
      if (this.props.collectionAdLinkForm === 1) {
        if (this.validateUrl() && this.validateImage()) {
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
        if (this.validateDeepLinkUrl() && this.validateImage()) {
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
    const deep_link_urlError = validateWrapper(
      "deepLink",
      this.state.collection.collection_attachment
    );
    this.setState({
      deep_link_urlError
    });
    if (deep_link_urlError) {
      showMessage({
        message: "Invalid deep link url.",
        description:
          "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://url.com'",
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
    if (this.state.collection.collection_media) {
      return (
        <TouchableOpacity
          style={styles.inputMiddleButtonEdit}
          onPress={() => {
            this._pickImage();
          }}
        >
          <CameraEdit width={70} height={70} />
          <Text style={styles.mediaButtonMsg1}>{"Edit Image"}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Button
          style={styles.inputMiddleButton}
          onPress={() => {
            this._pickImage();
          }}
        >
          <Icon style={styles.icon} name="camera" />
          <Text style={styles.mediaButtonMsg}>
            {this.state.collection.collection_media
              ? "Edit Image"
              : "Add Image"}
          </Text>
        </Button>
      );
    }
  };

  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "always", top: "always" }}
      >
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Go Back from Collection Media Upload",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title="Compose Collection Ad"
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <KeyboardShift style={{}}>
              {() => (
                <View style={styles.mainView}>
                  <View style={styles.imageView}>
                    <Text style={styles.productText}>
                      {`Product ${parseInt(
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
                        : "Please choose an image or video"}
                    </Text>
                  )}

                  {this.props.collectionAdLinkForm === 2 ? (
                    <Animatable.View
                      onAnimationEnd={() =>
                        this.setState({ deep_link_urlError: null })
                      }
                      duration={200}
                      easing={"ease"}
                      animation={!this.state.deep_link_urlError ? "" : "shake"}
                      style={{ marginVertical: 30 }}
                    >
                      <View style={styles.deepLinkLabelView}>
                        <Text uppercase style={styles.inputLabel}>
                          deeplink url
                        </Text>
                      </View>
                      <Item
                        style={[
                          styles.input
                          // this.state.deep_link_urlError
                          //   ? GlobalStyles.redBorderColor
                          //   : GlobalStyles.transparentBorderColor
                        ]}
                      >
                        <Input
                          value={this.state.collection.collection_attachment}
                          style={styles.inputtext}
                          placeholder="Enter Deeplink URL"
                          placeholderTextColor="white"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value =>
                            this.setState({
                              collection: {
                                ...this.state.collection,
                                collection_attachment: value
                              }
                            })
                          }
                          onBlur={() => {
                            this.validateDeepLinkUrl();
                          }}
                        />
                      </Item>
                    </Animatable.View>
                  ) : (
                    <View>
                      <View style={styles.topContainer}>
                        <Button
                          // block
                          // dark
                          style={[
                            this.state.networkString === "http://"
                              ? styles.activeButton
                              : styles.button2,
                            styles.collectionAdLinkForm1
                          ]}
                          onPress={() => {
                            this.setState({
                              networkString: "http://"
                            });
                          }}
                        >
                          <Text
                            style={[
                              this.state.networkString === "http://"
                                ? styles.activeText
                                : styles.inactiveText
                            ]}
                          >
                            http://
                          </Text>
                        </Button>
                        <Button
                          // block
                          // dark
                          style={[
                            this.state.networkString === "https://"
                              ? styles.activeButton
                              : styles.button2,
                            styles.collectionAdLinkForm2
                          ]}
                          onPress={() => {
                            this.setState({
                              networkString: "https://"
                            });
                          }}
                        >
                          <Text
                            style={[
                              this.state.networkString === "https://"
                                ? styles.activeText
                                : styles.inactiveText
                            ]}
                          >
                            https://
                          </Text>
                        </Button>
                      </View>
                      <View style={styles.inputContainer}>
                        <View style={styles.websiteView}>
                          <View style={[styles.websiteLabelView]}>
                            <Text uppercase style={[styles.inputLabel]}>
                              website
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
                            <Text style={styles.networkLabel}>
                              {this.state.networkString}
                            </Text>
                            <Input
                              style={[styles.inputtext, { textAlign: "left" }]}
                              placeholder="Enter your website's URL"
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
                              onBlur={() => this.validateUrl()}
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
                <TouchableOpacity
                  onPress={this._handleSubmission}
                  style={styles.button}
                >
                  <Checkmark width={wp(24)} height={hp(8)} />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                Please add media and link to proceed
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionMedia);
