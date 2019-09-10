import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import PenIcon from "../../../../assets/SVGs/Pen.svg";
import PlusCircle from "../../../../assets/SVGs/PlusCircle.svg";

import styles from "./styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
class CollectionComp extends Component {
  render() {
    let {
      collIdx,
      collectionAdMedia,
      rejected,
      selectedCampaign,
      navigation
    } = this.props;
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
            {`Product ${collIdx + 1}`}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: collectionAdMedia[collIdx]
              ? ""
              : "rgba(0, 0, 0, 0.75)",
            alignSelf: "center",
            borderColor: "#FF9D00",
            borderWidth: 2,
            width: hp(5) < 30 ? 60 : 72,
            height: hp(5) < 30 ? 60 : 72,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            navigation.push("CollectionMedia", {
              collection_order: collIdx,
              rejected: rejected,
              selectedCampaign: selectedCampaign
            });
          }}
        >
          {collectionAdMedia[collIdx] ? (
            <RNImageOrCacheImage
              style={{
                borderRadius: 18,
                alignSelf: "center",
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "center"
              }}
              media={
                collectionAdMedia[collIdx][
                  collectionAdMedia[collIdx].localUri ? "localUri" : "media"
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
                navigation.push("CollectionMedia", {
                  collection_order: collIdx,
                  rejected: rejected,
                  selectedCampaign: selectedCampaign
                });
              }}
            >
              <PlusCircle
                width={hp(5) < 30 ? 20 : 30}
                height={hp(5) < 30 ? 35 : 30}
              />
            </Button>
          )}
          {collectionAdMedia[collIdx] && (
            <View style={{ position: "absolute", bottom: 6, right: 6 }}>
              <PenIcon width={15} height={15} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  collectionAdMedia: state.campaignC.collectionAdMedia
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionComp);
