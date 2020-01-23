import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import PenIcon from "../../../../assets/SVGs/Pen";
import PlusCircle from "../../../../assets/SVGs/PlusCircle";

import styles from "./collectionComponentStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import segmentEventTrack from "../../../segmentEventTrack";
class CollectionComp extends Component {
  render() {
    let {
      collIdx,
      collectionAdMedia,
      rejected,
      selectedCampaign,
      navigation
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.block}>
        <View style={styles.headingBlock}>
          <Text style={styles.productText}>
            {`${translate("Product")} ${collIdx + 1}`}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: collectionAdMedia[collIdx]
                ? ""
                : "rgba(0, 0, 0, 0.75)"
            },
            styles.touchViewBlock
          ]}
          onPress={() => {
            segmentEventTrack("Button clicked to go to Collection Media");
            navigation.push("CollectionMedia", {
              collection_order: collIdx,
              rejected: rejected,
              selectedCampaign: selectedCampaign
            });
          }}
        >
          {collectionAdMedia[collIdx] ? (
            <RNImageOrCacheImage
              style={styles.imageCache}
              media={
                collectionAdMedia[collIdx][
                  collectionAdMedia[collIdx].localUri ? "localUri" : "media"
                ]
              }
            />
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                segmentEventTrack("Button clicked to go to Collection Media");
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
            </TouchableOpacity>
          )}
          {collectionAdMedia[collIdx] && (
            <View style={styles.penView}>
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
export default connect(mapStateToProps, mapDispatchToProps)(CollectionComp);
