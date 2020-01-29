import React, { Component } from "react";
import { I18nManager } from "react-native";
import { connect } from "react-redux";
import LowerButton from "../../../MiniComponents/LowerButton";

import styles from "./styles";
class SubmitButton extends Component {
  submitButton = () => {
    if (this.props.adType === "CollectionAd") {
      if (
        (this.props.collectionAdMedia.length === 4 &&
          !this.props.collectionAdMedia.includes(undefined)) ||
        true
      ) {
        return (
          <LowerButton
            function={this.props._handleSubmission}
            style={[styles.proceedButtonRTL]}
            isRTL={I18nManager.isRTL}
          />
        );
      }
      return;
    } else {
      if (this.props.objective === "BRAND_AWARENESS") {
        return (
          <LowerButton
            function={this.props._handleSubmission}
            style={[styles.proceedButtonRTL]}
            isRTL={I18nManager.isRTL}
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
            isRTL={I18nManager.isRTL}
          />
        );
      }
    }
    return;
  };
  render() {
    return <>{this.submitButton()}</>;
  }
}
const mapStateToProps = state => ({
  collectionAdMedia: state.campaignC.collectionAdMedia
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
