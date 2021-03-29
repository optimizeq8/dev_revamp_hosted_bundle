import React, { Component } from "react";
import { Modal, TouchableOpacity, View, BackHandler, Text } from "react-native";
import DateFields from "../DatePickerRedesigned/DateFields";
import analytics from "@segment/analytics-react-native";
import ExtendCampaignBudget from "../ExtendCampaignBudget";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import CustomHeader from "../Header";
import { globalColors } from "../../../GlobalStyles";
import SafeAreaView from "react-native-safe-area-view";
import { heightPercentageToDP } from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import Loading from "../LoadingScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CampaignDuration from "../CampaignDurationField";
import LowerButton from "../LowerButton";

class ExtendCampaignModal extends Component {
  state = {
    start_time: "",
    end_time: "",
    showDatePicker: false,
    showBudgetSelector: false,
    duration: 7,
    switchComponent: false,
  };
  componentDidMount() {
    if (this.props.campaign) {
      let end_time = new Date(this.props.campaign.end_time.split("T")[0]);
      end_time.setDate(end_time.getDate() + this.state.duration - 1);
      this.setState({
        end_time: end_time.toISOString().split("T")[0],
      });
    }
  }

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

  handleSwitch = (value) => {
    this.setState({ switchComponent: value });
  };
  handleDateSubmition = () => {
    let { campaign } = this.props;
    let extendCampaignAction =
      campaign.channel === "instagram"
        ? this.props.extendInstaCampagin
        : this.props.extendSnapCampagin;
    extendCampaignAction(
      {
        campaign_id: campaign.campaign_id,
        end_time: this.state.end_time,
        duration: this.state.duration,
      },
      this.handleSwitch
    );
  };
  handleDuration = (subtract = false, onePress = false, time = 1) => {
    let duration = subtract ? this.state.duration - 1 : this.state.duration + 1;

    let end_time = new Date(this.props.campaign.end_time.split("T")[0]);
    end_time.setDate(end_time.getDate() + (duration - 1));
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
    let {
      showRepeatModal = true,
      screenProps,
      handleExtendModal,
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
          handleExtendModal(false);
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "20%",
            position: "absolute",
          }}
          onPress={() => handleExtendModal(false)}
          activeOpacity={1}
        ></TouchableOpacity>
        <View style={{ backgroundColor: "#0007", height: "100%" }}>
          <Animatable.View
            duration={700}
            easing={"ease"}
            animation={"slideInUp"}
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
                  { top: RFValue(!switchComponent ? 330 : 250, 414) },
                ]}
              >
                <CustomHeader
                  screenProps={screenProps}
                  closeButton={!switchComponent}
                  segment={{
                    str: "Ad Details Back Button",
                    source: "ad_targeting",
                    source_action: "a_go_back",
                  }}
                  actionButton={() =>
                    !switchComponent
                      ? handleExtendModal(false)
                      : this.handleSwitch(false)
                  }
                  titleStyle={{ color: globalColors.rum }}
                  iconColor={globalColors.rum}
                  navigation={undefined}
                  title={"Extend Campaign"}
                  containerStyle={{ padding: RFValue(30, 414) }}
                />
                {!switchComponent && (
                  <Animatable.View
                    duration={700}
                    easing={"ease"}
                    animation={
                      !switchComponent ? "slideInLeft" : "slideOutLeft"
                    }
                  >
                    <View style={styles.dateContainer}>
                      <Text style={styles.titleStyle}>{"End date"}:</Text>
                      <Text style={[styles.titleStyle, styles.dateStyle]}>
                        {"  " + campaign.end_time.split("T")[0]}
                      </Text>
                    </View>
                    <Text style={[styles.descStyle]}>
                      Choose how many days you want to extend the campaign by
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <CampaignDuration
                        screenProps={this.props.screenProps}
                        stopTimer={this.stopTimer}
                        handleDuration={this.handleDuration}
                        duration={this.state.duration}
                        disabled={this.state.duration === 3}
                        customContainerStyle={
                          styles.campaignDurationContainerStyle
                        }
                        customTextColor={{ color: "#808080" }}
                        buttonsCustomColor={{
                          backgroundColor: globalColors.purple,
                        }}
                      />
                      <LowerButton
                        screenProps={this.props.screenProps}
                        function={() => this.handleDateSubmition()}
                        purpleViolet={true}
                        style={{ alignSelf: "flex-end", bottom: 20 }}
                      />
                    </View>
                  </Animatable.View>
                )}
                <Animatable.View
                  duration={700}
                  easing={"ease"}
                  animation={switchComponent ? "slideInRight" : "slideOutLeft"}
                >
                  <ExtendCampaignBudget
                    screenProps={screenProps}
                    start_time={this.state.start_time}
                    end_time={this.state.start_time}
                    handleExtendModal={handleExtendModal}
                    campaign={campaign}
                  />
                </Animatable.View>
              </View>
            </KeyboardAwareScrollView>
          </Animatable.View>
          {this.props.extendCampaignLoading && <Loading dash={true} />}
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  extendCampaignLoading: state.campaignC.extendCampaignLoading,
  extendInstaCampaignLoading: state.instagramAds.extendInstaCampaignLoading,
});
const mapDispatchToProps = (dispatch) => ({
  extendSnapCampagin: (campaignInfo, handleSwitch) =>
    dispatch(actionCreators.extendSnapCampagin(campaignInfo, handleSwitch)),
  extendInstaCampagin: (campaignInfo, handleSwitch) =>
    dispatch(actionCreators.extendInstaCampagin(campaignInfo, handleSwitch)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtendCampaignModal);
