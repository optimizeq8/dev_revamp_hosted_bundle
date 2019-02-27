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
  Icon,
  Toast
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
      businessAccount: {
        businessname: "",
        businesstype: "",
        country: "",
        businessemail: ""
      },
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
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  _handleSubmission = () => {
    let message = [];
    if (this.state.businessAccount.businessname === "") {
      message.push("Please enter your Business Name.");
    }
    if (this.state.businessAccount.businessemail === "") {
      message.push("Please enter your Business Email.");
    }
    if (this.state.businessAccount.businesstype === "") {
      message.push("Please select your type of Business.");
    }
    if (this.state.businessAccount.country === "") {
      message.push("Please select your country.");
    }

    if (message.length !== 0) {
      message.forEach(m => {
        console.log(m);
        Toast.show({
          text: m,
          buttonText: "Okay",
          duration: 3000,
          type: "danger",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: {
            backgroundColor: "#717171",
            alignSelf: "center"
          }
        });
      });
    } else {
      this.props.createBusinessAccount(
        this.state.businessAccount,
        this.props.navigation
      );
    }
  };
  render() {
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

          <View style={{ marginTop: 0 }}>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder={"Business Name"}
                onChangeText={value => {
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      businessname: value
                    }
                  });
                }}
              />
            </Item>

            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder={"Business Email"}
                onChangeText={value => {
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      businessemail: value
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
                  businessAccount: {
                    ...this.state.businessAccount,
                    country: value
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
                      color: "rgb(113,113,113)"
                    }
                  ]}
                >
                  {this.state.businessAccount.country === ""
                    ? "Country"
                    : this.state.businessAccount.country}
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
                  businessAccount: {
                    ...this.state.businessAccount,
                    businesstype: value
                  }
                });
              }}
            >
              <Item style={styles.input}>
                <Text
                  placeholder={
                    this.state.businessAccount.businesstype !== ""
                      ? this.state.businessAccount.businesstype
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
                  {this.state.businessAccount.businesstype === ""
                    ? "Business Type"
                    : this.state.items.find(
                        i => i.value === this.state.businessAccount.businesstype
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
              this._handleSubmission();
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
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  createBusinessAccount: (account, navigation) =>
    dispatch(actionCreators.createBusinessAccount(account, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfo);
