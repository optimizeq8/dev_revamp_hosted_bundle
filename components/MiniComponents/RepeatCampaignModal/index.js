import React, { Component } from "react";
import { Modal, TouchableOpacity, View, BackHandler } from "react-native";
import DateFields from "../DatePickerRedesigned/DateFields";
import analytics from "@segment/analytics-react-native";
import RepeatCampaignBudget from "../RepeatCampaignBudget";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import CustomHeader from "../Header";
import { globalColors } from "../../../GlobalStyles";
import SafeAreaView from "react-native-safe-area-view";
import { heightPercentageToDP } from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import Loading from "../LoadingScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class RepeatCampaignModal extends Component {
  state = {
    start_time: "",
    end_time: "",
    showDatePicker: false,
    showBudgetSelector: false,
    duration: 7,
    switchComponent: false,
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
      source: "repeat_campaign_modal",
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
      source: "repeat_campaign_modal",
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
    analytics.track(`a_repeat_duration`, {
      source: "repeat_campaign_modal",
      source_action: "a_repeat_duration",
      campaign_end_date: end_time,
      campaign_duration: duration,
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

  handleSwitch = (value) => {
    this.setState({ switchComponent: value });
    analytics.track("a_toggle_date_modal", {
      source: "repeat_campaign_modal",
      source_action: "a_toggle_date_modal",
      visible: value,
      campaign_channel: this.props.campaign.channel,
    });
    if (!value) {
      this.dateField.showModal();
    } else {
      this.dateField.hideModal();
    }
  };
  handleDateSubmition = () => {
    let { campaign } = this.props;
    let repeatCampaignAction =
      campaign.channel === "instagram"
        ? this.props.repeatInstaCampagin
        : this.props.repeatSnapCampagin;
    repeatCampaignAction(
      {
        previous_campaign_id: campaign.campaign_id,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        duration: this.state.duration,
      },
      this.handleSwitch
    );
  };
  render() {
    let {
      showRepeatModal = true,
      screenProps,
      handleRepeatModal,
      campaign,
    } = this.props;
    let { switchComponent } = this.state;
    return (
      <Modal
        visible={showRepeatModal}
        animationType="fade"
        transparent
        hardwareAccelerated={true}
        onRequestClose={() => {
          handleRepeatModal(false);
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "20%",
            position: "absolute",
          }}
          onPress={() => handleRepeatModal(false)}
          activeOpacity={1}
        ></TouchableOpacity>
        <View style={{ backgroundColor: "#0007", height: "100%" }}>
          <Animatable.View
            duration={700}
            easing={"ease"}
            animation={switchComponent ? "slideInUp" : "slideOutDown"}
          >
            <KeyboardAwareScrollView
              contentContainerStyle={{
                width: "100%",
                height: "100%",
                paddingBottom: RFValue(100, 414),
              }}
              extraScrollHeight={30}
            >
              <View
                style={[
                  styles.datePickerContainer,
                  !this.dateField && { backgroundColor: "#0000" },
                  switchComponent && { top: RFValue(220, 414) },
                ]}
              >
                {this.dateField && (
                  <CustomHeader
                    screenProps={screenProps}
                    closeButton={false}
                    segment={{
                      str: "Ad Details Back Button",
                      source: "repeat_campaign_modal",
                      source_action: "a_go_back",
                    }}
                    actionButton={() => this.handleSwitch(false)}
                    titleStyle={{ color: globalColors.rum }}
                    iconColor={globalColors.rum}
                    navigation={undefined}
                    title={"Repeat Campaign"}
                    containerStyle={{ padding: RFValue(30, 414) }}
                  />
                )}

                <RepeatCampaignBudget
                  screenProps={screenProps}
                  start_time={this.state.start_time}
                  end_time={this.state.start_time}
                  handleRepeatModal={handleRepeatModal}
                  campaign={campaign}
                />
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
                  handleDateSubmition={this.handleDateSubmition}
                  repeatCampaignLoading={
                    campaign.channel === "instagram"
                      ? this.props.repeatInstaCampaignLoading
                      : this.props.repeatCampaignLoading
                  }
                />
              </View>
            </KeyboardAwareScrollView>
          </Animatable.View>
          {this.props.repeatCampaignLoading && <Loading dash={true} />}
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  repeatCampaignLoading: state.campaignC.repeatCampaignLoading,
  repeatInstaCampaignLoading: state.instagramAds.repeatInstaCampaignLoading,
});
const mapDispatchToProps = (dispatch) => ({
  repeatSnapCampagin: (campaignInfo, handleSwitch) =>
    dispatch(actionCreators.repeatSnapCampagin(campaignInfo, handleSwitch)),
  repeatInstaCampagin: (campaignInfo, handleSwitch) =>
    dispatch(actionCreators.repeatInstaCampagin(campaignInfo, handleSwitch)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatCampaignModal);