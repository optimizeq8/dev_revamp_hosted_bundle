import React, { Component } from "react";
import { Text, View } from "react-native";
import SwipeUpComponent from "./SwipeUpComponent";
import { connect } from "react-redux";
class SwipeCompCondition extends Component {
  swipeUpComp = () =>
    this.props.adType === "SnapAd" ? (
      // !this.props.rejected &&
      "BRAND_AWARENESS" !== this.props.objective && (
        <SwipeUpComponent
          screenProps={this.props.screenProps}
          _changeDestination={this.props._changeDestination}
          navigation={this.props.navigation}
          objective={this.props.objective}
          destination={this.props.destination}
          attachment={this.props.attachment}
          collectionAdLinkForm={this.props.collectionAdLinkForm}
          adType={this.props.adType}
          media={this.props.media}
          call_to_action_label={this.props.call_to_action.label}
        />
      )
    ) : this.props.adType === "CollectionAd" ? (
      <SwipeUpComponent
        screenProps={this.props.screenProps}
        _changeDestination={this.props._changeDestination}
        navigation={this.props.navigation}
        objective={this.props.objective}
        destination={this.props.destination}
        attachment={this.props.attachment}
        collectionAdLinkForm={this.props.collectionAdLinkForm}
        adType={this.props.adType}
        call_to_action_label={this.props.call_to_action.label}
      />
    ) : this.props.adType === "StoryAd" &&
      this.props.objective !== "WEB_CONVERSION" &&
      this.props.objective !== "WEB_CONVERSION_INSTAGRAM" &&
      this.props.storyAdCards.storyAdSelected ? (
      <SwipeUpComponent
        screenProps={this.props.screenProps}
        _changeDestination={this.props._changeDestination}
        navigation={this.props.navigation}
        objective={this.props.objective}
        destination={this.props.storyAdAttachment.destination}
        attachment={this.props.storyAdAttachment.attachment}
        adType={this.props.adType}
        media={this.props.storyAdCards.selectedStoryAd.media}
        call_to_action_label={this.props.storyAdAttachment.call_to_action.label}
      />
    ) : (
      this.props.adType === "StoryAd" &&
      this.props.objective === "WEB_CONVERSION" &&
      !this.props.storyAdCards.storyAdSelected && (
        <SwipeUpComponent
          screenProps={this.props.screenProps}
          _changeDestination={this.props._changeDestination}
          navigation={this.props.navigation}
          objective={this.props.objective}
          destination={this.props.storyAdAttachment.destination}
          attachment={this.props.storyAdAttachment.attachment}
          adType={this.props.adType}
          media={this.props.storyAdCards.selectedStoryAd.media}
          call_to_action_label={
            this.props.storyAdAttachment.call_to_action.label
          }
        />
      )
    );
  render() {
    return <>{this.swipeUpComp()}</>;
  }
}
const mapStateToProps = state => ({
  storyAdAttachment: state.campaignC.storyAdAttachment,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeCompCondition);
