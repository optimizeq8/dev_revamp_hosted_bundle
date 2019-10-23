import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Content, Text } from "native-base";
import { Modal } from "react-native-paper";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-navigation";
import { Video } from "expo-av";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import CameraIcon from "../../../../assets/SVGs/Camera";
import CloseCircle from "../../../../assets/SVGs/CloseCircle";
import CheckmarkIcon from "../../../../assets/SVGs/Checkmark";

import CustomHeader from "../../../MiniComponents/Header";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

//styles
import styles from "./styles";

class DownloadMediaFromDifferentDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoIsLoading: false
    };
  }
  //   componentDidUpdate(prevProps) {
  //     if (
  //       !prevProps.uploadMediaDifferentDeviceModal &&
  //       this.props.uploadMediaDifferentDeviceModal
  //     ) {
  //       this.props.getMediaUploadUrl(this.props.campaign_id);
  //     }
  //   }
  render() {
    // console.log("media", this.props.mediaWebLink);
    const { translate } = this.props.screenProps;
    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onRequestClose={() => this.props.setDownloadMediaModal(false)}
        onDismiss={() => this.props.setDownloadMediaModal(false)}
        visible={this.props.downloadMediaModal}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setDownloadMediaModal(false);
                }}
                title={"DOWNLOAD MEDIA"}
              />
              {this.props.webUploadLinkMediaLoading ? (
                <LoadingScreen top={50} />
              ) : (
                <>
                  <View
                    style={[
                      styles.downloadMediaTopView,
                      {
                        flex: this.props.mediaWebLink !== "" ? 0 : 1
                      }
                    ]}
                  >
                    <CameraIcon height={60} width={60} fill={"#FFF"} />
                    <Text style={styles.downloadMediaHeaderText}>
                      {this.props.mediaWebLink !== ""
                        ? translate(
                            "Media has been uploaded from a different device"
                          )
                        : translate(
                            "No Media has been uploaded from different Device"
                          )}
                    </Text>
                  </View>
                  {this.props.mediaWebLink !== "" && (
                    <View
                      style={{
                        flex: 1,
                        paddingHorizontal: 40,
                        paddingVertical: 10
                        //   height: 350
                      }}
                    >
                      {this.props.mediaTypeWebLink === "VIDEO" ? (
                        <>
                          <Video
                            //   onLoadStart={() =>
                            //     this.setState({ videoIsLoading: true })
                            //   }
                            //   onLoad={() => this.setState({ videoIsLoading: false })}
                            source={{
                              uri: this.props.mediaWebLink
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
                        onPress={() => this.props.setDownloadMediaModal(false)}
                        // onPress={() => this.props.handleDownloadMedia("//", "")}
                      />
                      <CheckmarkIcon
                        onPress={() =>
                          this.props.handleDownloadMedia(
                            this.props.mediaWebLink,
                            this.props.mediaTypeWebLink
                          )
                        }
                        style={styles.marginH20}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMediaUploadUrl: campaign_id =>
    dispatch(actionCreators.getMediaUploadUrl(campaign_id))
});
const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  adType: state.campaignC.adType,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  uploadMediaDifferentDeviceURL: state.campaignC.uploadMediaDifferentDeviceURL,
  uploadMediaDifferentDeviceAccessCode:
    state.campaignC.uploadMediaDifferentDeviceAccessCode,
  errorUploadMediaDiffernetDevice:
    state.campaignC.errorUploadMediaDiffernetDevice
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadMediaFromDifferentDevice);
