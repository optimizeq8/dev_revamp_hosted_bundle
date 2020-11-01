import React, { Component } from "react";
import { View, Platform, ScrollView, Text } from "react-native";
import { Modal } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import { SafeAreaView } from "react-navigation";
import { Video } from "expo-av";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import CameraIcon from "../../../../assets/SVGs/Camera";
import CloseCircle from "../../../../assets/SVGs/CloseCircle";

import CustomHeader from "../../../MiniComponents/Header";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

//styles
import styles from "./styles";
import LowerButton from "../../../MiniComponents/LowerButton";

class DownloadMediaFromDifferentDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoIsLoading: false,
    };
  }

  render() {
    // console.log("media", this.props.mediaWebLink);
    // console.log('collectionAdMediaLinks', this.props.collectionAdMediaLinks);
    // console.log('this.props.adType', this.props.adType);
    const { translate } = this.props.screenProps;
    let screen;
    switch (this.props.adType) {
      case "SnapAd":
        screen = (
          <>
            <View
              style={[
                styles.downloadMediaTopView,
                {
                  flex: this.props.mediaWebLink !== "" ? 0 : 1,
                },
              ]}
            >
              <CameraIcon height={60} width={60} fill={"#FFF"} />
              <Text style={styles.downloadMediaHeaderText}>
                {this.props.mediaWebLink !== ""
                  ? translate("Media has been uploaded from a different device")
                  : translate(
                      "No Media has been uploaded from different Device"
                    )}
              </Text>
            </View>
            {this.props.mediaWebLink !== "" && (
              <View style={styles.snapAdDownloadView}>
                {this.props.mediaTypeWebLink === "VIDEO" ? (
                  <>
                    <Video
                      source={{
                        uri: this.props.mediaWebLink,
                      }}
                      shouldPlay
                      isLooping
                      resizeMode="stretch"
                      style={styles.placeholderDownloadMedia}

                      //   style={styles.video}
                    />
                  </>
                ) : (
                  <RNImageOrCacheImage
                    media={this.props.mediaWebLink}
                    style={styles.placeholderDownloadMedia}
                  />
                )}
              </View>
            )}
            {this.props.mediaWebLink !== "" && (
              <View style={styles.downloadMediaBottomContainer}>
                <CloseCircle
                  style={styles.marginH20}
                  fill={"#FFF"}
                  onPress={() => {
                    this.props.setDownloadMediaModal(false);
                  }}
                  // onPress={() => this.props.handleDownloadMedia("//", "")}
                />
                <LowerButton
                  screenProps={this.props.screenProps}
                  checkmark={true}
                  function={() => {
                    this.props.handleDownloadMedia(
                      this.props.mediaWebLink,
                      this.props.mediaTypeWebLink
                    );
                  }}
                  style={[styles.marginH20, { width: 55, height: 55 }]}
                />
              </View>
            )}
          </>
        );
        break;
      case "StoryAd":
        screen = (
          <>
            <View
              style={[
                styles.downloadMediaTopView,
                {
                  flex:
                    this.props.mediaStoryAdsDifferentDevice &&
                    this.props.mediaStoryAdsDifferentDevice.length > 0
                      ? 0
                      : 1,
                },
              ]}
            >
              <CameraIcon height={60} width={60} fill={"#FFF"} />
              <Text style={styles.downloadMediaHeaderText}>
                {this.props.mediaStoryAdsDifferentDevice &&
                this.props.mediaStoryAdsDifferentDevice.length > 0
                  ? translate("Media has been uploaded from a different device")
                  : translate(
                      "No Media has been uploaded from different Device"
                    )}
              </Text>
            </View>
            <ScrollView
              scrollEnabled={true}
              contentContainerStyle={[styles.scrollViewStoryDownloadMedia]}
            >
              {this.props.mediaStoryAdsDifferentDevice &&
                this.props.mediaStoryAdsDifferentDevice.map(
                  (storyMedia, index) => {
                    return (
                      <View
                        key={storyMedia.story_id}
                        style={styles.storyAdIndividual}
                      >
                        <View style={styles.storyAdIndexView}>
                          <Text style={styles.storyAdTextNum}>{index + 1}</Text>
                        </View>
                        {storyMedia.media_type === "VIDEO" ? (
                          <>
                            <Video
                              source={{
                                uri: storyMedia.media,
                              }}
                              shouldPlay
                              isLooping
                              resizeMode="stretch"
                              style={styles.placeholderDownloadMedia}
                            />
                          </>
                        ) : (
                          <RNImageOrCacheImage
                            media={storyMedia.media}
                            style={styles.placeholderDownloadMedia}
                          />
                        )}
                      </View>
                    );
                  }
                )}
            </ScrollView>
            {this.props.mediaStoryAdsDifferentDevice &&
              this.props.mediaStoryAdsDifferentDevice.length > 0 && (
                <View style={styles.downloadMediaBottomContainer}>
                  <CloseCircle
                    style={styles.marginH20}
                    fill={"#FFF"}
                    onPress={() => {
                      this.props.setDownloadMediaModal(false);
                    }}
                    // onPress={() => this.props.handleDownloadMedia("//", "")}
                  />
                  <LowerButton
                    screenProps={this.props.screenProps}
                    checkmark
                    function={() => {
                      this.props.handleDownloadMediaStoryAds(
                        this.props.mediaStoryAdsDifferentDevice
                      );
                    }}
                    style={[styles.marginH20, { width: 55, height: 55 }]}
                  />
                </View>
              )}
          </>
        );
        break;

      case "CollectionAd":
        screen = (
          <>
            <View
              style={[
                styles.downloadMediaTopView,
                {
                  flex:
                    this.props.collectionMainMediaWebLink &&
                    this.props.collectionMainMediaWebLink !== "" &&
                    this.props.collectionAdMediaLinks &&
                    this.props.collectionAdMediaLinks.length > 0
                      ? 0
                      : 1,
                },
              ]}
            >
              <CameraIcon height={60} width={60} fill={"#FFF"} />
              <Text style={styles.downloadMediaHeaderText}>
                {this.props.collectionMainMediaWebLink &&
                this.props.collectionMainMediaWebLink !== ""
                  ? translate("Media has been uploaded from a different device")
                  : translate(
                      "No Media has been uploaded from different Device"
                    )}
              </Text>
            </View>
            <ScrollView
              scrollEnabled={true}
              contentContainerStyle={[styles.collectionScrollViewContainer]}
            >
              {this.props.collectionMainMediaWebLink !== "" && (
                <View style={styles.collectionAdDownloadView}>
                  {this.props.collectionMainMediaTypeWebLink === "VIDEO" ? (
                    <>
                      <Video
                        source={{
                          uri: this.props.collectionMainMediaWebLink,
                        }}
                        shouldPlay
                        isLooping
                        resizeMode="stretch"
                        style={styles.placeholderDownloadMedia}
                      />
                    </>
                  ) : (
                    <RNImageOrCacheImage
                      media={this.props.collectionMainMediaWebLink}
                      style={styles.collectionAdMainMediaImage}
                    />
                  )}
                </View>
              )}
              <View style={styles.collectionAdDownloadPreviewContainer}>
                {this.props.collectionAdMediaLinks &&
                  this.props.collectionAdMediaLinks.map(
                    (collectionMedia, index) => {
                      return (
                        <View
                          key={collectionMedia.collection_id}
                          style={styles.collectionAdDownloadPreview}
                        >
                          <View style={styles.collectionAdIndexView}>
                            <Text style={styles.collectionAdTextNum}>
                              Product {index + 1}
                            </Text>
                          </View>
                          <RNImageOrCacheImage
                            media={collectionMedia.media}
                            style={styles.placeholderDownloadMedia}
                          />
                        </View>
                      );
                    }
                  )}
              </View>
            </ScrollView>
            {
              // this.props.collectionMainMediaWebLink &&
              this.props.collectionAdMediaLinks &&
                this.props.collectionAdMediaLinks.length > 0 && (
                  <View style={styles.downloadMediaBottomContainer}>
                    <CloseCircle
                      style={styles.marginH20}
                      fill={"#FFF"}
                      onPress={() => {
                        this.props.setDownloadMediaModal(false);
                      }}
                      // onPress={() => this.props.handleDownloadMedia("//", "")}
                    />
                    <LowerButton
                      screenProps={this.props.screenProps}
                      checkmark
                      function={() => {
                        this.props.handleDownloadMediaCollectionAds(
                          this.props.collectionMainMediaWebLink,
                          this.props.collectionMainMediaTypeWebLink,
                          this.props.collectionAdMediaLinks
                        );
                      }}
                      style={styles.marginH20}
                    />
                  </View>
                )
            }
          </>
        );
        break;
      default:
        screen = null;
        break;
    }

    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onRequestClose={() => this.props.setDownloadMediaModal(false)}
        onDismiss={() => this.props.setDownloadMediaModal(false)}
        visible={this.props.downloadMediaModal}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView forceInset={{ bottom: "never", top: "always" }}>
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setDownloadMediaModal(false);
                }}
                segment={{
                  source: "download_media_modal",
                  source_action: "a_go_back",
                }}
                title={"DOWNLOAD MEDIA"}
              />
              {this.props.webUploadLinkMediaLoading ? (
                <LoadingScreen top={50} />
              ) : (
                screen
              )}
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMediaUploadUrl: (campaign_id) =>
    dispatch(actionCreators.getMediaUploadUrl(campaign_id)),
});
const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  adType: state.campaignC.adType,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  uploadMediaDifferentDeviceURL: state.campaignC.uploadMediaDifferentDeviceURL,
  uploadMediaDifferentDeviceAccessCode:
    state.campaignC.uploadMediaDifferentDeviceAccessCode,
  errorUploadMediaDiffernetDevice:
    state.campaignC.errorUploadMediaDiffernetDevice,
  mediaStoryAdsDifferentDevice: state.campaignC.mediaStoryAdsDifferentDevice,
  collectionMainMediaWebLink: state.campaignC.collectionMainMediaWebLink,
  collectionMainMediaTypeWebLink:
    state.campaignC.collectionMainMediaTypeWebLink,
  collectionAdMediaLinks: state.campaignC.collectionAdMediaLinks,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadMediaFromDifferentDevice);
