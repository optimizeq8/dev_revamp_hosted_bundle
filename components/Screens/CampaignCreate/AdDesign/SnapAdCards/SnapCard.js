import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button, Icon } from "native-base";
import { Video } from 'expo-av';
import styles from "../styles";
import MediaButton from "../MediaButton";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";
import { globalColors } from "../../../../../GlobalStyles";
import PenIcon from "../../../../../assets/SVGs/Pen.svg";

class SnapCard extends Component {
  state = { uploading: false };
  render() {
    let {
      snapCardInfo,
      removeSnapCard,
      _handleStoryAdCards,
      video
    } = this.props;
    // snapCardInfo.index === 0 && console.log(this.props);

    return (
      <View style={styles.SnapAdCard}>
        <View
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 15,
            overflow: "hidden",
            opacity: 0.5,
            position: "absolute"
          }}
        >
          <Image
            source={{
              uri:
                !this.props.loadingStoryAdsArray[snapCardInfo.index] &&
                snapCardInfo.item.uploaded
                  ? snapCardInfo.item.image
                  : "snapCardInfo.item.image"
            }}
            style={{ height: "100%", width: "100%", position: "absolute" }}
          />
        </View>
        <View
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: globalColors.orange,
            bottom: "10%"
          }}
        >
          <Text style={{ color: "#fff" }}>{snapCardInfo.index + 1}</Text>
        </View>
        {!this.props.loadingStoryAdsArray[snapCardInfo.index] ? (
          !snapCardInfo.item.uploaded ? (
            <MediaButton
              _handleStoryAdCards={_handleStoryAdCards}
              snapAdCard={true}
              snapCardInfo={snapCardInfo}
            />
          ) : (
            <TouchableOpacity
              onPress={() =>
                _handleStoryAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item
                })
              }
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                height: "100%",
                position: "absolute",
                bottom: 0,
                paddingBottom: 10
              }}
            >
              <Text
                style={[
                  styles.mediaButtonMsg,
                  { fontSize: 11, width: 65, textAlign: "left", top: 0 }
                ]}
              >
                Edit Media
              </Text>
              <PenIcon width={15} height={15} />
            </TouchableOpacity>
          )
        ) : (
          <ActivityIndicator color={globalColors.orange} />
        )}
        {snapCardInfo.index > 2 && (
          <Icon
            onPress={() => {
              //   this.props.cancelUpload();

              !this.props.loadingStoryAdsArray[snapCardInfo.index] &&
                this.props.deleteStoryAdCard(
                  snapCardInfo.item.story_id,
                  snapCardInfo,
                  removeSnapCard
                );
            }}
            name="close"
            type="MaterialCommunityIcons"
            style={{ bottom: "15%", color: "#fff", alignSelf: "flex-start" }}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  storyAdsArray: state.campaignC.storyAdsArray,
  loadingStoryAdsArray: state.campaignC.loadingStoryAdsArray
});

const mapDispatchToProps = dispatch => ({
  deleteStoryAdCard: (story_id, card, removeCard) =>
    dispatch(actionCreators.deleteStoryAdCard(story_id, card, removeCard))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapCard);
