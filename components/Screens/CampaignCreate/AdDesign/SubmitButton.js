import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";

import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
class SubmitButton extends Component {
  submitButton = () => {
    if (this.props.adType === "CollectionAd") {
      if (
        this.props.collectionAdMedia.length === 4 &&
        !this.props.collectionAdMedia.includes(undefined)
      ) {
        return (
          <TouchableOpacity
            onPress={this.props_handleSubmission}
            style={styles.button}
          >
            <ForwardButton width={wp(24)} height={hp(8)} />
          </TouchableOpacity>
        );
      }
      return;
    } else {
      if (this.props.objective === "BRAND_AWARENESS") {
        return (
          <TouchableOpacity
            onPress={this.props._handleSubmission}
            style={styles.button}
          >
            <ForwardButton width={wp(24)} height={hp(8)} />
          </TouchableOpacity>
        );
      } else if (
        this.props.objective !== "BRAND_AWARENESS" &&
        !this.props.swipeUpError
      ) {
        return (
          <TouchableOpacity
            onPress={this.props._handleSubmission}
            style={styles.button}
          >
            <ForwardButton width={wp(24)} height={hp(8)} />
          </TouchableOpacity>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitButton);
