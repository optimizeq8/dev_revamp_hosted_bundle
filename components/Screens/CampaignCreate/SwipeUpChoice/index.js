import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  BackHandler,
  SafeAreaView
} from "react-native";
import {
  Card,
  Button,
  Content,
  Header,
  Left,
  Body,
  Right,
  Text,
  CardItem,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
import BackButton from "../../../MiniComponents/BackButton";

import { LinearGradient } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
// import list from "./callactions";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     campaignInfo: {
  //       attachment: "",
  //       callaction: list[0].call_to_action_list[0]
  //     },

  //     callactions: list[0].call_to_action_list,
  //     urlError: ""
  //   };
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Container style={[styles.container]}>
          <Header transparent noShadow iosBarStyle={"light-content"}>
            <Left
              style={{
                alignItems: "center",
                alignSelf: "center",
                flex: 0,
                paddingLeft: 10
              }}
            >
              <BackButton
                navigation={this.props.navigation.goBack}
                style={{ top: 0, left: 0 }}
              />
            </Left>
            <Body />
            <Right />
          </Header>
          <Content
            // padder
            contentContainerStyle={{
              flex: 1
            }}
          >
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1
              }}
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
              {this.props.navigation.state.params.objective ===
                "VIDEO_VIEWS" && (
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
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeUpChoice);
