import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ImagePicker, Permissions, LinearGradient } from "expo";

import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
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
import list from "./callactions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppConfirm from "../../../MiniComponents/AppConfirm";
import AppChoice from "../../../MiniComponents/AppChoice";

//Icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

export default class Deep_Link extends Component {
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
        deep_link_url: "",
        icon_media_url: ""
      },
      firstStepDone: false,
      data: [],
      androidData: [],
      image: "",
      callaction: list[3].call_to_action_list[0],
      callactions: list[3].call_to_action_list,
      nameError: "",
      appError: "",
      android_app_urlError: "",
      deep_link_urlError: "",
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
    console.log(attachment);

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

  _handleSubmission = async deep_link_url => {
    await this.setState({
      attachment: { ...this.state.attachment, deep_link_url }
    });

    this.props._changeDestination(
      "DEEP_LINK",
      this.state.callaction,
      this.state.attachment
    );
    this.props.navigation.navigate("AdDesign");

    console.log(
      "APP_INSTALL",
      this.state.callaction.label,
      this.state.attachment
    );
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
            <View style={{ flexDirection: "column", paddingTop: 10 }}>
              <AppInstallIcon style={styles.icon} />
              <View style={styles.textcontainer}>
                <Text style={[styles.titletext]}>Deep Link</Text>
                <Text style={[styles.subtext, { marginBottom: 0 }]}>
                  The user will be taken to a specific page in your app or
                  website
                </Text>
              </View>
            </View>
            {!this.state.firstStepDone ? (
              <AppChoice renderNextStep={this.renderNextStep} listNum={3} />
            ) : (
              <AppConfirm
                icon_media_url={this.state.attachment.icon_media_url}
                app_name={this.state.attachment.app_name}
                ios_app_id={this.state.attachment.ios_app_id}
                android_app_url={this.state.attachment.android_app_url}
                _handleSubmission={this._handleSubmission}
                renderPreviousStep={this.renderPreviousStep}
                deepLink={true}
              />
            )}
          </KeyboardAwareScrollView>
        </ScrollView>
      </Container>
    );
  }
}
