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

// Style
import styles, { colors } from "./styles";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: "",
        callaction: list[0].call_to_action_list[0].value
      },

      callactions: list[0].call_to_action_list
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <View style={{ flexDirection: "column", paddingTop: 30 }}>
            <Icon
              type="MaterialCommunityIcons"
              name="web"
              style={styles.icon}
            />
            <View style={styles.textcontainer}>
              <Text style={[styles.titletext]}>Website</Text>
              <Text style={[styles.subtext]}>
                The user will be taken to your website
              </Text>
            </View>
            <RNPickerSelect
              items={this.state.callactions}
              placeholder={{}}
              onValueChange={value => {
                this.setState({
                  campaignInfo: {
                    ...this.state.campaignInfo,
                    callaction: value
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
                        c => this.state.campaignInfo.callaction === c.value
                      ).label}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#fff", fontSize: 20, left: 25 }}
                />
              </Item>
            </RNPickerSelect>
            <Item rounded style={styles.input}>
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
              />
            </Item>
          </View>
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
