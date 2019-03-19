import React, { Component } from "react";
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
import list from "./callactions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
// Style
import styles, { colors } from "./styles";
export default class Website extends Component {
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
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  _handleSubmission = () => {
    const urlError = validateWrapper(
      "website",
      this.state.campaignInfo.attachment
    );
    this.setState({
      urlError
    });
    if (!urlError) {
      this.props._changeDestination(
        "REMOTE_WEBPAGE",
        this.state.campaignInfo.callaction.label,
        { url: this.state.campaignInfo.attachment }
      );
      this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    return (
      <View>
        <View style={{ flexDirection: "column", paddingTop: 30 }}>
          <Icon type="MaterialCommunityIcons" name="web" style={styles.icon} />
          <View style={styles.textcontainer}>
            <Text style={[styles.titletext]}>Website</Text>
            <Text style={[styles.subtext]}>
              The user will be taken to your website
            </Text>
          </View>
          <RNPickerSelect
            items={this.state.callactions}
            placeholder={{}}
            onValueChange={(value, index) => {
              this.setState({
                campaignInfo: {
                  ...this.state.campaignInfo,
                  callaction: {
                    label: list[0].call_to_action_list[index].label,
                    value
                  }
                }
              });
            }}
          >
            <Item rounded style={styles.input}>
              <Text
                style={[
                  styles.inputtext,
                  {
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "#fff"
                  }
                ]}
              >
                {this.state.campaignInfo.callaction === ""
                  ? this.state.callactions[0].label
                  : this.state.callactions.find(
                      c => this.state.campaignInfo.callaction.value === c.value
                    ).label}
              </Text>
              <Icon
                type="AntDesign"
                name="down"
                style={{ color: "#fff", fontSize: 20, left: 25 }}
              />
            </Item>
          </RNPickerSelect>
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.urlError ? "red" : "transparent"
              }
            ]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Ad Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  campaignInfo: {
                    ...this.state.campaignInfo,
                    attachment: value
                  }
                })
              }
              onBlur={() => {
                this.setState({
                  urlError: validateWrapper(
                    "website",
                    this.state.campaignInfo.attachment
                  )
                });
              }}
            />
          </Item>
        </View>
        <TouchableOpacity onPress={this._handleSubmission}>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/button.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
