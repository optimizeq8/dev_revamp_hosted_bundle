import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
import { BlurView } from "expo";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { Modal } from "react-native-paper";
import DateRangePicker from "./DateRangePicker";
import CustomHeader from "../Header";
import { SafeAreaView } from "react-navigation";
// Style
import styles from "../../Screens/CampaignCreate/AdDetails/styles";

//icons
import CloseIcon from "../../../assets/SVGs/Close.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import CalenderkIcon from "../../../assets/SVGs/Calender.svg";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class DateFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      start_choice: false,
      end_choice: false,

      start_timeError: "",
      endt_time: ""
    };
  }

  componentDidMount() {
    this.props.onRef(this);
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

  render() {
    return (
      <View
        style={[
          styles.dateModal,
          this.state.modalVisible ? { zIndex: 100 } : { zIndex: -1 },
          this.props.filterMenu && {
            marginLeft: -80,
            marginTop: -hp(6)
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
              this.props.filterMenu && {
                paddingLeft: wp("20"),
                paddingTop: hp(6)
              }
            ]}
          >
            <SafeAreaView
              style={{ height: "100%", backgroundColor: "#0000" }}
              forceInset={{ bottom: "never" }}
            >
              <CustomHeader
                closeButton={true}
                actionButton={() => {
                  this.setState({ modalVisible: false });
                }}
                title="Duration"
              />
              <View
                style={{
                  flexDirection: "row",
                  // alignSelf: "center",
                  justifyContent: "space-around"
                }}
              >
                {/* <Button
                transparent
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
                style={styles.btnClose}
              >
                <CloseIcon width={20} height={20} />
              </Button>
              <Text style={styles.title}>Duration</Text> */}
                <Text
                  style={[styles.textModal, { fontFamily: "montserrat-light" }]}
                  onPress={() =>
                    this.setState({
                      start_choice: false,
                      end_choice: false,

                      start_timeError: "",
                      endt_time: ""
                    })
                  }
                >
                  {" "}
                </Text>
              </View>
              <Text style={styles.textModal}>
                {this.props.filterMenu
                  ? "Select a date range to filter from"
                  : "Please select your ad launch and end dates"}
              </Text>
              <CalenderkIcon
                width={hp(5) < 30 ? 30 : 60}
                height={hp(5) < 30 ? 30 : 60}
                style={styles.icon}
              />
              <Text style={[styles.textModal, { color: "#FF9D00" }]}>
                Select the{" "}
                {!this.state.start_choice ? "Start Date" : "End Date"}
              </Text>
              <DateRangePicker
                filterMenu={this.props.filterMenu}
                startDatePicked={this.startDatePicked}
                endDatePicked={this.endDatePicked}
                // initialRange={[this.props.start_time, this.props.end_time]}
                onSuccess={async (s, e) => {
                  this.endDatePicked();
                  this.setState({
                    start_date: s,
                    end_date: e
                  });
                }}
                theme={{ markColor: "#FF9D00", markTextColor: "white" }}
              />

              {this.state.end_choice ? (
                <Button
                  style={styles.button}
                  onPress={async () => {
                    if (!this.props.filterMenu) {
                      let timeDiff = Math.round(
                        Math.abs(
                          (new Date(this.state.start_date).getTime() -
                            new Date(this.state.end_date).getTime()) /
                            86400000
                        )
                      );
                      this.props.getMinimumCash(timeDiff + 1);
                      await this.props.handleStartDatePicked(
                        this.state.start_date
                      );
                      await this.props.handleEndDatePicked(this.state.end_date);
                    } else {
                      await this.props.handleStartDatePicked(
                        this.state.start_date
                      );
                      await this.props.handleEndDatePicked(this.state.end_date);
                    }
                    this.setState({
                      modalVisible: false,
                      start_choice: false,
                      end_choice: false
                    });
                  }}
                >
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
