import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
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
import list from "./callactions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import Website from "./Website";
import App_Install from "./App_Install";
import Deep_Link from "./Deep_Link";
import Long_Form_Video from "./Long_Form_Video";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: "",
        callaction: list[0].call_to_action_list[0]
      },

      callactions: list[0].call_to_action_list,
      urlError: ""
    };
  }

  render() {
    console.log(this.props.navigation.state.params.objective);

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          {(this.props.navigation.state.params.objective === "website" ||
            this.props.navigation.state.params.objective ===
              "LEAD_GENERATION") && (
            <Website
              objective={this.props.navigation.state.params.objective}
              _changeDestination={
                this.props.navigation.state.params._changeDestination
              }
              navigation={this.props.navigation}
            />
          )}
          {this.props.navigation.state.params.objective === "deep link" && (
            <Deep_Link
              _changeDestination={
                this.props.navigation.state.params._changeDestination
              }
              navigation={this.props.navigation}
            />
          )}
          {this.props.navigation.state.params.objective === "VIDEO_VIEWS" && (
            <Long_Form_Video
              _changeDestination={
                this.props.navigation.state.params._changeDestination
              }
              navigation={this.props.navigation}
            />
          )}
          {this.props.navigation.state.params.objective
            .toLowerCase()
            .includes("app") && (
            <App_Install
              _changeDestination={
                this.props.navigation.state.params._changeDestination
              }
              navigation={this.props.navigation}
            />
          )}
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeUpChoice);
