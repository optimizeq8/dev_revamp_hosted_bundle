import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import { Button, Text } from "native-base";
import { BlurView } from "expo-blur";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { Modal } from "react-native-paper";
import DateRangePicker from "./DateRangePicker";
import CustomHeader from "../Header";
import { SafeAreaView } from "react-navigation";
import dateFormat from "dateformat";

// Style
import styles from "./styles";

//icons
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";
import CalenderkIcon from "../../../assets/SVGs/Calender";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { showMessage } from "react-native-flash-message";

export default class DateFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      start_choice: false,
      end_choice: false,
      reset: false,
      start_timeError: "",
      end_date: "",
      start_date: ""
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    this.setState({
      end_date: this.props.end_time,
      start_date: this.props.start_time
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getErrors = () => {
    this.setState({
      start_timeError: validateWrapper("mandatory", this.props.start_time),
      end_timeError: validateWrapper("mandatory", this.props.end_time)
    });
    return {
      end_timeError: validateWrapper("mandatory", this.props.end_time),
      start_timeError: validateWrapper("mandatory", this.props.end_time)
    };
  };

  startDatePicked = () => {
    this.setState({
      start_choice: true,
      end_choice: false
    });
  };
  endDatePicked = () => {
    this.setState({
      end_choice: true
    });
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  handleDate = async () => {
    let timeDiff = Math.round(
      Math.abs(
        (new Date(this.state.start_date).getTime() -
          new Date(this.state.end_date).getTime()) /
          86400000
      )
    );
    if (!this.props.filterMenu && !this.props.chartRange) {
      await this.props.getMinimumCash(timeDiff + 1);
      await this.props.handleStartDatePicked(this.state.start_date);
      await this.props.handleEndDatePicked(this.state.end_date);
    } else if (this.props.filterMenu) {
      await this.props.handleStartDatePicked(this.state.start_date);
      await this.props.handleEndDatePicked(this.state.end_date);
    } else if (this.props.chartRange) {
      this.props.durationChange(this.state.start_date, this.state.end_date);
    }
    this.setState({
      modalVisible: false,
      start_choice: false,
      end_choice: false
    });
  };

  handleReset = () => {
    if (this.props.chartRange) {
      this.setState({
        start_choice: false,
        end_choice: false,
        start_timeError: "",
        modalVisible: false,
        start_date: "",
        end_date: ""
      });
      this.setState({ modalVisible: false });
      this.props.durationChange(
        this.props.selectedCampaign.start_time,
        this.props.selectedCampaign.end_time
        // "2019-05-09",
        // "2019-05-25"
      );
    } else {
      this.setState({
        start_choice: false,
        end_choice: false,
        start_timeError: "",
        start_date: "",
        end_date: "",
        reset: true
      });
    }
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <View
        style={[
          styles.dateModal,
          this.state.modalVisible ? { zIndex: 100 } : { zIndex: -1 },
          this.props.filterMenu &&
            !I18nManager.isRTL && {
              marginLeft: -80,
              marginTop: -hp(6)
            },
          this.props.filterMenu &&
            I18nManager.isRTL && {
              // marginLeft: 0,
              marginTop: -hp(6),
              marginLeft: 0,
              marginRight: -10
            }
        ]}
      >
        <Modal
          onDismiss={() => this.setState({ modalVisible: false })}
          onRequestClose={() => this.setState({ modalVisible: false })}
          visible={
            this.props.filterMenu
              ? this.state.modalVisible && this.props.open
              : this.state.modalVisible
          }
        >
          <BlurView
            tint="dark"
            intensity={95}
            style={[
              styles.BlurView,
              this.props.filterMenu &&
                !I18nManager.isRTL && {
                  paddingLeft: wp("20"),
                  paddingTop: hp(6)
                },
              this.props.filterMenu &&
                I18nManager.isRTL && {
                  paddingLeft: wp("2"),
                  paddingRight: wp("8"),
                  paddingTop: hp(6)
                }
            ]}
          >
            <SafeAreaView
              style={styles.safeArea}
              forceInset={{ bottom: "never", top: "always" }}
            >
              <View style={{ alignItems: "center" }}>
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => {
                    this.setState({ modalVisible: false });
                  }}
                  topRightButtonText={translate("Reset")}
                  topRightButtonFunction={this.handleReset}
                  showTopRightButton={
                    this.state.start_date || this.props.chartRange
                  }
                  title={"Duration"}
                />
              </View>
              <Text style={styles.textModal}>
                {this.props.filterMenu
                  ? translate("Select a date range to filter from")
                  : translate("Please select your ad launch and end dates")}
              </Text>
              <CalenderkIcon
                width={hp(5) < 30 ? 30 : 60}
                height={hp(5) < 30 ? 30 : 60}
                style={styles.icon}
              />
              <Text style={styles.textModalOrange}>
                {translate(
                  `Select the ${
                    !this.state.start_choice ? "Start Date" : "End Date"
                  }`
                )}
              </Text>
              <View style={{ height: "55%" }}>
                <DateRangePicker
                  initialRange={
                    this.props.start_time
                      ? [this.props.start_time, this.props.end_time]
                      : ["", ""]
                  }
                  filterMenu={this.props.filterMenu}
                  reset={this.state.reset}
                  chartRange={this.props.chartRange}
                  selectedCampaign={this.props.selectedCampaign}
                  startDatePicked={this.startDatePicked}
                  endDatePicked={this.endDatePicked}
                  // initialRange={[this.props.start_time, this.props.end_time]}
                  onSuccess={async (s, e) => {
                    this.endDatePicked();
                    this.setState({
                      start_date: s,
                      end_date: e,
                      reset: false
                    });
                  }}
                  theme={{ markColor: "#FF9D00", markTextColor: "white" }}
                />
              </View>

              {this.state.end_choice ||
              (this.props.start_time && !this.state.reset) ? (
                <Button style={styles.button} onPress={() => this.handleDate()}>
                  <CheckmarkIcon
                    width={hp(5) < 30 ? 40 : 53}
                    height={hp(5) < 30 ? 40 : 53}
                  />
                </Button>
              ) : null}
            </SafeAreaView>
          </BlurView>
        </Modal>
      </View>
    );
  }
}
