import React, { Component } from "react";
import { connect } from "react-redux";
import LowerButton from "../../../MiniComponents/LowerButton";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

import styles from "./styles";
import { View, Text } from "react-native";
import { globalColors } from "../../../../GlobalStyles";
class SubmitButton extends Component {
  submitButton = () => {
    if (this.props.adType === "CollectionAd") {
      if (
        (this.props.collectionAdMedia.length === 4 &&
          !this.props.collectionAdMedia.includes(undefined)) ||
        true //left as true to check for validation when they submit instead of hiding it
      ) {
        return (
          <LowerButton
            width={12}
            height={12}
            screenProps={this.props.screenProps}
            text={"Next"}
            function={this.props._handleSubmission}
            style={styles.proceedButtonRTL}
          />
        );
      }
    } else {
      if (this.props.objective === "BRAND_AWARENESS") {
        return (
          <LowerButton
            screenProps={this.props.screenProps}
            text={"Next"}
            width={12}
            height={12}
            function={this.props._handleSubmission}
            style={styles.proceedButtonRTL}
          />
        );
      } else if (
        this.props.objective !== "BRAND_AWARENESS" &&
        !this.props.swipeUpError
      ) {
        return (
          <LowerButton
            width={15}
            height={15}
            screenProps={this.props.screenProps}
            text={"Next"}
            function={this.props._handleSubmission}
            style={styles.proceedButtonRTL}
          />
        );
      }
    }
    return;
  };
  render() {
    const { translate } = this.props.screenProps;
    if (this.props.loading && this.props.loaded) {
      return (
        <View
          style={{
            bottom: 3,
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.uploadingText}>{translate("Uploading")}</Text>
          <AnimatedCircularProgress
            size={50}
            width={5}
            fill={Math.round(this.props.loaded)}
            rotation={360}
            lineCap="round"
            tintColor={globalColors.orange}
            backgroundColor="rgba(255,255,255,0.3)"
            adDetails={false}
          />
          <Text style={styles.uplaodPercentageText}>{Math.round(10, 2)} %</Text>
        </View>
      );
    }
    return (
      <View style={{ bottom: 3, width: "45%" }}>{this.submitButton()}</View>
    );
  }
}
const mapStateToProps = (state) => ({
  collectionAdMedia: state.campaignC.collectionAdMedia,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
