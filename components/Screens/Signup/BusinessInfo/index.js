import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
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
  H1,
  Badge,
  Icon
} from "native-base";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";

// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../../store/actions";

class BusinessInfo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        ...this.props.userInfo,
        businessname: "",
        businesstype: "",
        country: "",
        usertype: "1"
      },

      data: [
        {
          label: "Individual",
          value: "1"
        },
        {
          label: "Business",
          value: "2"
        }
      ],
      items: [
        {
          label: "Home Business",
          value: "1"
        },
        {
          label: "Tech Business",
          value: "2"
        }
      ],
      countries: [
        {
          label: "Kuwait",
          value: "Kuwait"
        },
        {
          label: "UAE",
          value: "UAE"
        },
        {
          label: "KSA",
          value: "KSA"
        },
        {
          label: "Bahrain",
          value: "Bahrain"
        },
        {
          label: "Qatar",
          value: "Qatar"
        },
        {
          label: "Oman",
          value: "Oman"
        }
      ]
    };
  }

  render() {
    console.log("form", this.state.userInfo);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Business Info</Text>
          <View
            style={{
              bottom: 30,
              paddingHorizontal: 50,
              alignSelf: "center",
              height: 50
            }}
          >
            <RadioGroup
              flexDirection="row"
              color="#5F5F5F"
              radioButtons={this.state.data}
              onPress={value => {
                var data = value.find(data => data.selected === true);
                this.setState({
                  userInfo: { ...this.state.userInfo, usertype: data.value }
                });
              }}
            />
          </View>
          <View style={{ marginTop: 0 }}>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder={
                  this.state.userInfo.usertype === "1"
                    ? "Your Name"
                    : "Company Name"
                }
                onChangeText={value => {
                  this.setState({
                    userInfo: {
                      ...this.state.userInfo,
                      businessname: value
                    }
                  });
                }}
              />
            </Item>

            <RNPickerSelect
              items={this.state.countries}
              placeholder={{}}
              onValueChange={value => {
                this.setState({
                  userInfo: { ...this.state.userInfo, country: value }
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
                      color: "rgb(113,113,113)"
                    }
                  ]}
                >
                  {this.state.userInfo.country === ""
                    ? this.state.userInfo.usertype === "1"
                      ? "Where do you live?"
                      : "Country"
                    : this.state.userInfo.country}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                />
              </Item>
            </RNPickerSelect>

            <RNPickerSelect
              items={this.state.items}
              onValueChange={value => {
                this.setState({
                  userInfo: { ...this.state.userInfo, businesstype: value }
                });
              }}
            >
              <Item style={styles.input}>
                <Text
                  placeholder={
                    this.state.userInfo.businesstype !== ""
                      ? this.state.userInfo.businesstype
                      : ""
                  }
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
                  {this.state.userInfo.businesstype === ""
                    ? this.state.userInfo.usertype === "1"
                      ? "What do you do?"
                      : "Business Type"
                    : this.state.items.find(
                        i => i.value === this.state.userInfo.businesstype
                      ).label}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                />
              </Item>
            </RNPickerSelect>
          </View>
        </View>
        <View
          style={{
            bottom: 50
          }}
        >
          <Text style={[styles.text, { marginBottom: 0 }]}>
            By tapping the button below you {"\n"}
            Agree to the Terms & Conditions
          </Text>
          <Button
            block
            dark
            style={styles.button}
            onPress={() => {
              this.props.registerUser(
                this.state.userInfo,
                this.props.navigation
              );
            }}
          >
            <Text style={styles.buttontext}>CREATE ACCOUNT</Text>
          </Button>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userInfo, navigation) =>
    dispatch(actionCreators.registerUser(userInfo, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfo);
