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
            function={this.props._handleSubmission}
            style={[styles.proceedButtonRTL]}
          />
        );
      }
    } else {
      if (this.props.objective === "BRAND_AWARENESS") {
        return (
          <LowerButton
            function={this.props._handleSubmission}
            style={[styles.proceedButtonRTL]}
          />
        );
      } else if (
        this.props.objective !== "BRAND_AWARENESS" &&
        !this.props.swipeUpError
      ) {
        return (
          <LowerButton
            function={this.props._handleSubmission}
            style={[styles.proceedButtonRTL]}
          />
        );
      }
    }
    return;
  };
  render() {
    if (this.props.loading && this.props.loaded) {
      return (
        <View style={{ bottom: 3, position: "relative" }}>
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
          <Text style={styles.uplaodPercentageText}>
            {Math.round(this.props.loaded, 2)} %
          </Text>
        </View>
      );
    }
    return <View style={{ bottom: 3 }}>{this.submitButton()}</View>;
  }
}
const mapStateToProps = (state) => ({
  collectionAdMedia: state.campaignC.collectionAdMedia,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
