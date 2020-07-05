import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import CustomHeader from "../Header";
import { heightPercentageToDP } from "react-native-responsive-screen";
import RNImageOrCacheImage from "../RNImageOrCacheImage";

export default class LoadingModal extends Component {
  render() {
    let {
      isVisible,
      onToggleModal,
      cancelUpload,
      title,
      source,
      source_action,
      description,
      media = "https://optimizekwtestingserver.com/optimize/static-media/ad_cover_en.svg",
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Modal
        visible={isVisible}
        onDismiss={() => onToggleModal(false)}
        animationType={"slide"}
      >
        <SafeAreaView
          forceInset={{ top: "always" }}
          style={styles.loadingSafeArea}
        />
        <BlurView intensity={100} tint="dark">
          <View style={styles.container}>
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={true}
              actionButton={() => cancelUpload()}
              title={title}
              segment={{
                source: source,
                source_action: source_action,
              }}
            />
            <Text style={styles.descText}>{description}</Text>
            <Image
              onLoadStart={() => {
                console.log("loading");
              }}
              onLoadEnd={() => {
                console.log("loadEnd");
              }}
              source={{ uri: media }}
              style={styles.review}
            />
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  descText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  loadingSafeArea: {
    flex: 1,
  },
  review: {
    width: "100%",
    height: "50%",
    zIndex: 2,

    borderWidth: 4,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  uplaodPercentage: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "montserrat-bold",
  },
  uplaodText: {
    justifyContent: "center",
    fontSize: 12,
    color: "white",
    fontFamily: "montserrat-medium",
    alignSelf: "center",
    paddingTop: 10,
    textAlign: "center",
  },
});
