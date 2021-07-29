import React, { Component } from "react";
import {
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
// import { BlurView } from "@react-native-community/blur";
import SafeAreaView from "react-native-safe-area-view";

import { Video } from "expo-av";
import { RFValue } from "react-native-responsive-fontsize";

//icons
// import CameraIcon from "../../../../assets/SVGs/Camera";
// import CloseCircle from "../../../../assets/SVGs/CloseCircle";

import CustomHeader from "../../../../MiniComponents/Header";
import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";
// import LoadingScreen from "../../../MiniComponents/LoadingScreen";

//styles
// import LowerButton from "../../../MiniComponents/LowerButton";
import { globalColors } from "../../../../../GlobalStyles";

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
    const { instagramExistingMediaListLoading, instagramExistingMediaList } =
      this.props;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.props.existingMediaModal}
        style={{ margin: 0 }}
      >
        <View style={styles.popupOverlay}>
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          />
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            actionButton={() => {
              this.props.setExistingMediaModal(false);
            }}
            segment={{
              source: "InstagramFeedExistingMediaModal",
              source_action: "a_go_back",
            }}
            title={"Media Library"}
          />

          <FlatList
            keyExtractor={(item, index) => index}
            data={instagramExistingMediaList}
            renderItem={this.renderMedia}
            numColumns={4}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </Modal>
    );
  }
}

export default ExistingMediaModal;

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
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  popupOverlay: {
    height: "100%",
  },
  safeAreaView: {
    backgroundColor: "#0000",
  },
});
