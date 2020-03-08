import React, { Component } from "react";
import { connect } from "react-redux";
import LowerButton from "../../../MiniComponents/LowerButton";

import styles from "./styles";
import { View } from "react-native";
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
    return <View style={{ bottom: 3 }}>{this.submitButton()}</View>;
  }
}
const mapStateToProps = state => ({
  collectionAdMedia: state.campaignC.collectionAdMedia
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
