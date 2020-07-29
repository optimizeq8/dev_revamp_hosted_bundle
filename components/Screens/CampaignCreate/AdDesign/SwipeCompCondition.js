import React, { Component } from "react";
import { Text, View } from "react-native";
import SwipeUpComponent from "./SwipeUpComponent";
import { connect } from "react-redux";
class SwipeCompCondition extends Component {
  savedObjective = this.props.rejCampaign.hasOwnProperty("savedObjective")
    ? this.props.rejCampaign.savedObjective
    : this.props.savedObjective;
  swipeUpComp = () =>
    this.props.adType === "SnapAd" ? (
      // !this.props.rejected &&
      "BRAND_AWARENESS" !== this.props.objective && (
        <SwipeUpComponent
          swipeUpMaxHeight={this.props.swipeUpMaxHeight}
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
          disabled={this.props.disabled}
          savedObjective={this.savedObjective}
        />
      )
    ) : this.props.adType === "CollectionAd" ? (
      <SwipeUpComponent
        swipeUpMaxHeight={this.props.swipeUpMaxHeight}
        screenProps={this.props.screenProps}
        _changeDestination={this.props._changeDestination}
        navigation={this.props.navigation}
        objective={this.props.objective}
        destination={this.props.destination}
        attachment={this.props.attachment}
        collectionAdLinkForm={this.props.collectionAdLinkForm}
        adType={this.props.adType}
        call_to_action_label={this.props.call_to_action.label}
        disabled={this.props.disabled}
        savedObjective={this.savedObjective}
      />
    ) : this.props.adType === "StoryAd" &&
      this.props.objective !== "WEB_CONVERSION" ? (
      <SwipeUpComponent
        swipeUpMaxHeight={this.props.swipeUpMaxHeight}
        screenProps={this.props.screenProps}
        _changeDestination={this.props._changeDestination}
        navigation={this.props.navigation}
        objective={this.props.objective}
        destination={this.props.storyAdAttachment.destination}
        attachment={this.props.storyAdAttachment.attachment}
        adType={this.props.adType}
        media={this.props.storyAdCards.selectedStoryAd.media}
        call_to_action_label={this.props.storyAdAttachment.call_to_action.label}
        disabled={this.props.disabled}
        savedObjective={this.savedObjective}
      />
    ) : (
      this.props.adType === "StoryAd" &&
      this.props.objective === "WEB_CONVERSION" && (
        <SwipeUpComponent
          swipeUpMaxHeight={this.props.swipeUpMaxHeight}
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
          disabled={this.props.disabled}
          savedObjective={this.savedObjective}
        />
      )
    );
  render() {
    return <>{this.swipeUpComp()}</>;
  }
}
const mapStateToProps = (state) => ({
  storyAdAttachment: state.campaignC.storyAdAttachment,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  savedObjective: state.campaignC.savedObjective,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SwipeCompCondition);
