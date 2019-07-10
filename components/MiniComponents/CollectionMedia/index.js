import React, { Component } from "react";
import {
  ImagePicker,
  Permissions,
  FileSystem,
  Segment,
  ImageManipulator,
  Linking,
  BlurView
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
import Axios from "axios";
import { Modal } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import CustomHeader from "../Header";
import CameraLoading from "../CameraLoading";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import ForwardButton from "../../../assets/SVGs/ForwardButton";

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
      deep_link_urlError: ""
    };
  }

  async componentDidMount() {
    let order = this.props.navigation.getParam("collection_order");

    await this.setState({
      collection: {
        ...this.state.collection,
        collection_order: order,
        collection_name: this.props.data.name + "_" + order
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
    if (
      Object.keys(this.state.collection)
        .map(key => {
          console.log("key", key);

          if (
            this.props.collectionAdMedia[order] &&
            this.props.collectionAdMedia[order].hasOwnProperty(key)
          )
            return true;
        })
        .includes(true)
    ) {
      if (
        (this.props.collectionAdLinkForm === 1 &&
          this.props.collectionAdMedia[order].collection_destination ===
            "REMOTE_WEBPAGE") ||
        (this.props.collectionAdLinkForm === 2 &&
          this.props.collectionAdMedia[order].collection_destination ===
            "DEEP_LINK")
      ) {
        if (this.props.collectionAdLinkForm === 1) {
          const url = split(
            JSON.parse(
              this.props.collectionAdMedia[order].collection_attachment
            ).url,
            "://"
          );
          this.setState({
            collection: {
              ...this.props.collectionAdMedia[order],
              collection_attachment: url[1]
            },
            networkString: url[0] + "://",
            localUri: this.props.collectionAdMedia[order].localUri
          });
        } else {
          const deep_link_uri = JSON.parse(
            this.props.collectionAdMedia[order].collection_attachment
          ).deep_link_uri;
          this.setState({
            collection: {
              ...this.props.collectionAdMedia[order],
              collection_attachment: deep_link_uri
            },
            localUri: this.props.collectionAdMedia[order].localUri
          });
        }
      }

      // this.setState({
      //   collection: {
      //     ...this.state.collection
      //   },

      // });

      // collection = {
      //   ...this.state.collection,
      //   ...this.props.collectionAdMedia[order]
      // };
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
      quality: 0.5
    });

    // console.log("after picker", result);

    return result;
  };

  _pickImage = async () => {
    try {
      let result = await this.pick();
      // console.log(result.uri);

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
                  localUri: result.uri
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
      console.log("error image pick", error);
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
    // console.log("URI: ", this.state.localUri);

    let res = this.state.localUri.split(
      this.state.localUri.includes("/ImageManipulator/")
        ? "/ImageManipulator/"
        : this.state.directory
    );

    // console.log("URI colle: ", this.state.collection.collection_media);

    let format = res[1].split(".");
    // console.log("URI: ", this.state.localUri);

    var photo = {
      uri: this.state.localUri,
      type: "IMAGE" + "/" + format[1],
      name: res[1]
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
    body.append("campaign_id", this.props.campaign_id);
    body.append("campaign_name", this.props.data.name);
    // body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);

    if (this.state.collection.collection_id !== "") {
      body.append("collection_id", this.state.collection.collection_id);
    }

    this.setState(
      {
        formatted: body
      },
      () => {
        console.log("formatted", this.state.formatted);
      }
    );
  }

  _handleSubmission = async () => {
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

  render() {
    let mediaButton = (
      <Button
        style={styles.inputMiddleButton}
        onPress={() => {
          this._pickImage();
        }}
      >
        <Icon style={styles.icon} name="camera" />
        <Text style={styles.mediaButtonMsg}>
          {this.state.collection.collection_media ? "Edit Image" : "Add Image"}
        </Text>
      </Button>
    );

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
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
          <Content
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            padder
          >
            <View style={styles.mainView}>
              {isNull(this.state.collection.collection_media) ? (
                <View style={styles.placeholder}>
                  <View style={styles.blankView} />
                  {mediaButton}
                </View>
              ) : (
                <View style={styles.placeholder}>
                  <Image
                    style={styles.imagePlaceholder}
                    source={{ uri: this.state.localUri }}
                    resizeMode="cover"
                  />
                  {mediaButton}
                </View>
              )}
              {!this.state.imageError ? null : (
                <Text style={styles.errorMsg}>
                  {!this.state.imageError.includes("blank")
                    ? this.state.imageError
                    : "Please choose an image or video"}
                </Text>
              )}
            </View>
            {this.props.collectionAdLinkForm === 2 ? (
              <View style={{ marginVertical: 15 }}>
                <Item
                  rounded
                  style={[
                    styles.input,
                    this.state.deep_link_urlError
                      ? GlobalStyles.redBorderColor
                      : GlobalStyles.transparentBorderColor
                  ]}
                >
                  <Input
                    value={this.state.collection.collection_attachment}
                    style={styles.inputtext}
                    placeholder="Deep Link URL"
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
              </View>
            ) : (
              <View>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={styles.optionsRowContainer}
                    onPress={() => {
                      this.setState({
                        networkString: "http://"
                      });
                    }}
                  >
                    <Icon
                      type="MaterialCommunityIcons"
                      name={
                        this.state.networkString === "http://"
                          ? "circle"
                          : "circle-outline"
                      }
                      style={[
                        this.state.networkString === "http://"
                          ? styles.activetext
                          : styles.inactivetext,
                        styles.optionsIconSize
                      ]}
                    />
                    <Text
                      style={[styles.inactivetext, styles.optionsTextContainer]}
                    >
                      http://
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionsRowContainer}
                    onPress={() => {
                      this.setState({
                        networkString: "https://"
                      });
                    }}
                  >
                    <Icon
                      type="MaterialCommunityIcons"
                      name={
                        this.state.networkString === "https://"
                          ? "circle"
                          : "circle-outline"
                      }
                      style={[
                        this.state.networkString === "https://"
                          ? styles.activetext
                          : styles.inactivetext,
                        styles.optionsIconSize
                      ]}
                    />
                    <Text
                      style={[styles.inactivetext, styles.optionsTextContainer]}
                    >
                      https://
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Item rounded style={styles.netLocStyle}>
                    <Text style={styles.networkLabel}>
                      {this.state.networkString}
                    </Text>
                  </Item>
                  <Item
                    rounded
                    style={[
                      styles.input,
                      this.state.urlError
                        ? GlobalStyles.redBorderColor
                        : GlobalStyles.transparentBorderColor
                    ]}
                  >
                    <Input
                      style={styles.inputtext}
                      placeholder="Enter your website's URL"
                      placeholderTextColor={globalColors.white}
                      value={this.state.collection.collection_attachment}
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
                      onBlur={() => this.validateUrl()}
                    />
                  </Item>
                </View>
              </View>
            )}

            <Footer style={styles.footerStyle}>
              {this.state.collection.collection_media ? (
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
                  Please add media and link to proceed
                </Text>
              )}
            </Footer>
          </Content>
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

              <CameraLoading style={{ width: 110, height: 110 }} />
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
