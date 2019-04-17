import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ImagePicker, Permissions, LinearGradient } from "expo";

import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Input, Container, Icon } from "native-base";

import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import LowerButton from "../../../MiniComponents/LowerButton";
import AppSearch from "../../../MiniComponents/AppSearch";
import AppConfirm from "../../../MiniComponents/AppConfirm";
import AppChoice from "../../../MiniComponents/AppChoice";

//icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class App_Install extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        icon_media_url: ""
      },
      firstStepDone: false,
      data: [],
      nameError: "",
      callActionError: "",
      appError: "",
      android_app_urlError: "",
      showList: false
    };
  }

  handleCallAction = value => {
    this.setState({
      callaction: {
        label: list[1].call_to_action_list[index - 1 > 0 ? index - 1 : 0].label,
        value
      }
    });
  };

  renderNextStep = (nameError, callActionError, attachment, callaction) => {
    if (!nameError && !callActionError) {
      this.setState({
        attachment,
        callaction,
        firstStepDone: true
      });
    }
  };

  renderPreviousStep = () => {
    this.setState({ firstStepDone: false });
  };

  _handleSubmission = () => {
    const appError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id || this.state.attachment.android_app_url
    );

    this.setState({
      appError
    });

    if (!appError) {
      this.props._changeDestination(
        "APP_INSTALL",
        this.state.callaction,
        this.state.attachment
      );
      this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <ScrollView
          style={{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <View
              style={{
                flexDirection: "column",
                paddingTop: 30
              }}
            >
              <AppInstallIcon style={styles.icon} />
              <View style={styles.textcontainer}>
                <Text style={[styles.titletext]}>App Install</Text>
                <Text style={[styles.subtext]}>
                  The user will be taken to download your app
                </Text>
              </View>
              {!this.state.firstStepDone ? (
                // <AppSearch renderNextStep={this.renderNextStep} />
                <AppChoice renderNextStep={this.renderNextStep} />
              ) : (
                <AppConfirm
                  icon_media_url={this.state.attachment.icon_media_url}
                  app_name={this.state.attachment.app_name}
                  ios_app_id={this.state.attachment.ios_app_id}
                  android_app_url={this.state.attachment.android_app_url}
                  _handleSubmission={this._handleSubmission}
                  renderPreviousStep={this.renderPreviousStep}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </Container>
    );
  }
}
