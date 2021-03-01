import React, { Component } from "react";
import { Modal, Text, View } from "react-native";
import DateFields from "../DatePickerRedesigned/DateFields";
import analytics from "@segment/analytics-react-native";

import styles from "./styles";
import CampaignDuration from "../CampaignDurationField";
export default class RepeatCampaignModal extends Component {
  state = {
    start_time: "",
    end_time: "",
    showDatePicker: false,
    showBudgetSelector: false,
    duration: 7,
  };
  componentDidMount() {
    if (this.props.showRepeatModal) {
      this.dateField && this.dateField.showModal();
    }
    let start_time = new Date();
    start_time.setDate(start_time.getDate() + 1);
    let end_time = new Date(start_time);
    end_time.setDate(end_time.getDate() + this.state.duration - 1);
    this.setState({
      start_time: start_time.toISOString().split("T")[0],
      end_time: end_time.toISOString().split("T")[0],
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.showRepeatModal !== this.props.showRepeatModal &&
      this.props.showRepeatModal
    ) {
      this.dateField && this.dateField.showModal();
    }
  }
  handleStartDatePicked = (date) => {
    this.setState({
      start_time: date,
    });
    analytics.track(`a_repeat_ad_start_date`, {
      source: "snapcaht_campaign_card",
      source_action: "a_repeat_ad_start_date",
      campaign_start_date: date,
    });
  };
  handleEndDatePicked = (date) => {
    let end_time = new Date(date);
    end_time.setDate(end_time.getDate() + this.state.duration - 1);
    this.setState({
      end_time: end_time.toISOString().split("T")[0],
    });
    analytics.track(`a_ad_end_date`, {
      campaign_end_date: date,
      source: "ad_objective",
      source_action: "a_ad_end_date",
    });
  };
  handleDuration = (subtract = false, onePress = false, time = 1) => {
    let minimumDuration = 3;
    let duration = subtract
      ? this.state.duration - 1 > minimumDuration
        ? this.state.duration - 1
        : minimumDuration
      : this.state.duration + 1;

    let end_time = new Date(this.state.start_time.split("T")[0]);
    end_time.setDate(end_time.getDate() + duration - 1);
    this.setState({
      end_time: end_time.toISOString().split("T")[0],
      duration,
    });

    if (!onePress) {
      this.timer = setTimeout(
        () => this.handleDuration(subtract, null, time + 1),
        time > 10 ? 50 : 150 //to increase the speed when pressing for a longer time
      );
    }
  };
  stopTimer = () => {
    if (this.timer) clearTimeout(this.timer);
  };
  render() {
    let { showRepeatModal = true, screenProps, handleRepeatModal } = this.props;
    return (
      <Modal visible={showRepeatModal} transparent>
        <View style={styles.datePickerContainer}>
          <DateFields
            screenProps={screenProps}
            handleRepeatModal={handleRepeatModal}
            onRef={(ref) => (this.dateField = ref)}
            handleStartDatePicked={this.handleStartDatePicked}
            handleEndDatePicked={this.handleEndDatePicked}
            start_time={this.state.start_time}
            end_time={this.state.start_time}
            showDurationSelector={true}
            stopTimer={this.stopTimer}
            handleDuration={this.handleDuration}
            duration={this.state.duration}
            disabled={this.state.duration === 3}
          />
        </View>
      </Modal>
    );
  }
}
