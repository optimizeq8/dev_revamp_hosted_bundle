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
import { LinearGradient } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { Modal } from "react-native-paper";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";

// Style
import styles, { colors } from "./styles";

export default class DateFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        start_time: "",
        end_time: ""
      },
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
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
  showStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () =>
    this.setState({
      startDateTimePickerVisible: false,
      start_timeError: validateWrapper("mandatory", this.props.start_time)
    });

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
  hideEndDateTimePicker = () =>
    this.setState({
      endDateTimePickerVisible: false,
      startDateTimePickerVisible: false,
      end_timeError: validateWrapper("mandatory", this.props.end_time)
    });

  render() {
    return (
      <View>
        <Item
          rounded
          style={[
            styles.input,
            {
              borderColor: this.state.start_timeError ? "red" : "#D9D9D9"
            }
          ]}
          onPress={this.showStartDateTimePicker}
        >
          <Text
            style={[
              styles.inputtext,
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                color: "rgb(113,113,113)"
              }
            ]}
          >
            {this.props.start_time === ""
              ? "Set your start date..."
              : this.props.start_time.split("T")[0]}
          </Text>
          <Icon
            type="AntDesign"
            name="down"
            style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
          />
          <DateTimePicker
            minimumDate={new Date()}
            maximumDate={
              this.props.end_time !== "" ? new Date(this.props.end_time) : null
            }
            isVisible={this.state.startDateTimePickerVisible}
            onConfirm={this.props.handleStartDatePicked}
            onCancel={this.hideStartDateTimePicker}
            mode="date"
            onHideAfterConfirm={() =>
              this.setState({
                start_timeError: validateWrapper(
                  "mandatory",
                  this.props.start_time
                )
              })
            }
          />
        </Item>

        <Item
          rounded
          style={[
            styles.input,
            {
              borderColor: this.state.end_timeError ? "red" : "#D9D9D9"
            }
          ]}
          onPress={this.showEndDateTimePicker}
        >
          <Text
            style={[
              styles.inputtext,
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                color: "rgb(113,113,113)"
              }
            ]}
          >
            {this.props.end_time === ""
              ? "Set your end date..."
              : this.props.end_time.split("T")[0]}
          </Text>
          <Icon
            type="AntDesign"
            name="down"
            style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
          />
          <DateTimePicker
            isVisible={this.state.endDateTimePickerVisible}
            minimumDate={
              this.props.start_time !== ""
                ? new Date(this.props.start_time)
                : new Date()
            }
            onConfirm={this.props.handleEndDatePicked}
            onCancel={this.hideEndDateTimePicker}
            mode="date"
            onHideAfterConfirm={() =>
              this.setState({
                end_timeError: validateWrapper("mandatory", this.props.end_time)
              })
            }
          />
        </Item>
      </View>
    );
  }
}
