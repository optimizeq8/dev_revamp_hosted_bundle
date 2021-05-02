import React, { Component } from "react";
import {
  View,
  Platform,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modal } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import SafeAreaView from "react-native-safe-area-view";

import { Video } from "expo-av";
import { RFValue } from "react-native-responsive-fontsize";

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
import LowerButton from "../../../MiniComponents/LowerButton";
import { globalColors } from "../../../../GlobalStyles";

class ExistingMediaModal extends React.Component {
  renderMedia = ({ item }) => {
    let { media_type, media_url } = item;
    const { existing_media_url } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.mediaView,
          existing_media_url === media_url && {
            borderColor: globalColors.orange,
          },
        ]}
        onPress={() => this.props.setExistingMediaUrl(item)}
      >
        {media_type === "IMAGE" && (
          <RNImageOrCacheImage
            media={media_url}
            style={styles.image}
            width={70}
            height={110}
          />
        )}
        {media_type === "VIDEO" && (
          <Video
            source={{
              uri: media_url,
            }}
            style={styles.video}
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
          <View style={styles.popupOverlay}>
            <SafeAreaView forceInset={{ bottom: "never", top: "always" }} />

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
              keyExtractor={(item, index) => index}
              data={snapchatExistingMediaList}
              renderItem={this.renderMedia}
              numColumns={4}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
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

const styles = StyleSheet.create({
  mediaView: {
    marginHorizontal: RFValue(5, 414),
    marginVertical: RFValue(4, 414),
    borderWidth: RFValue(2.5, 414),
    borderColor: "#0000",
    borderRadius: RFValue(5, 414),
  },
  image: {
    width: RFValue(35, 414),
    height: RFValue(55, 414),
    borderRadius: RFValue(5, 414),
  },
  video: {
    width: RFValue(35, 414),
    height: RFValue(55, 414),
    borderRadius: RFValue(5, 414),
  },
  flatListContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  popupOverlay: {
    height: "100%",
  },
});
