import React, { Component } from "react";
import {
  View,
  Platform,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Modal } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import SafeAreaView from "react-native-safe-area-view";

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
import { globalColors } from "../../../../GlobalStyles";

class ExistingMediaModal extends React.Component {
  renderMedia = ({ item }) => {
    let { media, media_type, media_url } = item;
    const { existing_media_url } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            marginHorizontal: 10,
            marginVertical: 8,
            borderWidth: 5,
            borderColor: "#0000",
            borderRadius: 10,
          },
          existing_media_url === media_url && {
            borderColor: globalColors.orange,
          },
        ]}
        onPress={() => this.props.setExistingMediaUrl(item)}
      >
        {media_type === "IMAGE" && (
          <Image
            onLoadStart={() => {
              console.log("1");
            }}
            onLoadEnd={() => {
              console.log("end");
            }}
            source={{
              uri: media_url,
            }}
            style={{
              width: 70,
              height: 110,
              borderRadius: 10,
            }}
            width={70}
            height={110}
          />
        )}
        {media_type === "VIDEO" && (
          <Video
            source={{
              uri: media_url,
            }}
            style={{
              width: 70,
              height: 110,
              borderRadius: 10,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };
  render() {
    const {
      snapchatExistingMediaListLoading,
      snapchatExistingMediaList,
    } = this.props;

    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onRequestClose={() => this.props.setExistingMediaModal(false)}
        onDismiss={() => this.props.setExistingMediaModal(false)}
        visible={this.props.existingMediaModal}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView forceInset={{ bottom: "never", top: "always" }}>
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setExistingMediaModal(false);
                }}
                segment={{
                  source: "media_library_modal",
                  source_action: "a_go_back",
                }}
                title={"Media Library"}
              />
              <FlatList
                keyExtractor={(item) => item.media_url}
                data={snapchatExistingMediaList}
                renderItem={this.renderMedia}
                numColumns={4}
                contentContainerStyle={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExistingMediaModal);
