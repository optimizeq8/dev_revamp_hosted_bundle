import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { Modal } from "react-native-paper";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CloseIcon from "../../../../assets/SVGs/Close.svg";
import CheckmarkIcon from "../../../../assets/SVGs/Checkmark.svg";
import CalenderkIcon from "../../../../assets/SVGs/Calender.svg";
import DateRangePicker from "./DateRangePicker";
// Style
import styles, { colors } from "./styles";

export default class DateFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
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
      start_choice: true
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
          this.state.modalVisible ? { zIndex: 100 } : { zIndex: -1 }
        ]}
      >
        <Modal
          onDismiss={() => this.setState({ modalVisible: false })}
          onRequestClose={() => this.setState({ modalVisible: false })}
          visible={this.state.modalVisible}
        >
          <BlurView tint="dark" intensity={95} style={styles.BlurView}>
            <View
              style={{
                flexDirection: "row",
                // alignSelf: "center",
                justifyContent: "space-around"
              }}
            >
              <Button
                transparent
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
                style={styles.btnClose}
              >
                <CloseIcon width={20} height={20} />
              </Button>
              <Text style={styles.title}>Duration</Text>
              <Text
                style={[styles.textModal, { fontFamily: "montserrat-light" }]}
              >
                Reset
              </Text>
            </View>
            <Text style={styles.textModal}>
              Please select your ad launch and end dates
            </Text>
            <CalenderkIcon width={60} height={60} style={styles.icon} />
            <Text style={[styles.textModal, { color: "#FF9D00" }]}>
              Select the {!this.state.start_choice ? "Start Date" : "End Date"}
            </Text>
            <DateRangePicker
              startDatePicked={this.startDatePicked}
              endDatePicked={this.endDatePicked}
              initialRange={[this.props.start_time, this.props.end_time]}
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
                  await this.props.handleStartDatePicked(this.state.start_date);
                  await this.props.handleEndDatePicked(this.state.end_date);
                  this.setState({
                    modalVisible: false
                  });
                }}
              >
                <CheckmarkIcon width={53} height={53} />
              </Button>
            ) : null}
          </BlurView>
        </Modal>
      </View>
    );
  }
}
