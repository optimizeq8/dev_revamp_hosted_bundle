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
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
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
      businessnameError: "",
      businessemailError: "",
      businesstypeError: "",
      countryError: "",
      items: [
        {
          label: "Agriculure",
          value: "0"
        },
        {
          label: "Automotive",
          value: "3"
        },
        {
          label: "Construstion",
          value: "4"
        },
        {
          label: "Defense",
          value: "5"
        },
        {
          label: "Education",
          value: "6"
        },
        {
          label: "Finance",
          value: "7"
        },
        {
          label: "Food & Bevrage",
          value: "8"
        },
        {
          label: "Government",
          value: "9"
        },
        {
          label: "Health Care",
          value: "10"
        },
        {
          label: "Home Business",
          value: "1"
        },
        {
          label: "Insurance",
          value: "11"
        },
        {
          label: "Mass Media",
          value: "12"
        },
        {
          label: "Oil & Gas",
          value: "13"
        },
        {
          label: "Real Estate",
          value: "14"
        },
        {
          label: "Retail",
          value: "15"
        },
        {
          label: "Tech Business",
          value: "2"
        },
        {
          label: "Telecommunications",
          value: "16"
        },
        {
          label: "Transport",
          value: "17"
        },
        {
          label: "Wholesale",
          value: "18"
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
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        nameError: this.props.message ? this.props.message : null
      });
    }
  }
  _verifyBusinessName(name) {
    if (name !== "") {
      this.props.resetMessages();
      this.props.verifyBusinessName(name);
    } else {
      this.setState({
        businessnameError: validateWrapper(
          "mandatory",
          this.state.businessAccount.businessname
        )
      });
    }
  }
  _handleSubmission = () => {
    const businessnameError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businessname
    );
    const businessemailError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businessemail
    );
    const businesstypeError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businesstype
    );
    const countryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.country
    );

    this.setState({
      businessnameError,
      businessemailError,
      businesstypeError,
      countryError
    });
    if (
      !businessnameError &&
      !businessemailError &&
      !businesstypeError &&
      !countryError
    ) {
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
            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.state.businessnameError ? "red" : "#D9D9D9"
                }
              ]}
            >
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
                onBlur={() => {
                  this._verifyBusinessName(
                    this.state.businessAccount.businessname
                  );
                }}
              />
            </Item>
            {this.state.nameError && (
              <Text
                style={[
                  styles.text,
                  { paddingTop: 0, marginBottom: 0, bottom: 20 }
                ]}
              >
                {this.state.nameError}
              </Text>
            )}

            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.state.businessemailError ? "red" : "#D9D9D9"
                }
              ]}
            >
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
                onBlur={() => {
                  this.setState({
                    businessemailError: validateWrapper(
                      "mandatory",
                      this.state.businessAccount.businessemail
                    )
                  });
                }}
              />
            </Item>

            <RNPickerSelect
              items={this.state.countries}
              placeholder={{ label: "Select a country", value: "" }}
              onClose={() =>
                this.setState({
                  countryError: validateWrapper(
                    "mandatory",
                    this.state.businessAccount.country
                  )
                })
              }
              onValueChange={value => {
                this.setState({
                  businessAccount: {
                    ...this.state.businessAccount,
                    country: value
                  }
                });
              }}
            >
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.countryError ? "red" : "#D9D9D9"
                  }
                ]}
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
              placeholder={{ label: "Select a bussiness type", value: "" }}
              value={this.state.businessAccount.businesstype}
              onClose={() =>
                this.setState({
                  businesstypeError: validateWrapper(
                    "mandatory",
                    this.state.businessAccount.businesstype
                  )
                })
              }
              onValueChange={value => {
                this.setState({
                  businessAccount: {
                    ...this.state.businessAccount,
                    businesstype: value
                  }
                });
              }}
            >
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.businesstypeError
                      ? "red"
                      : "#D9D9D9"
                  }
                ]}
              >
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
    dispatch(actionCreators.createBusinessAccount(account, navigation)),
  verifyBusinessName: businessName =>
    dispatch(actionCreators.verifyBusinessName(businessName)),
  resetMessages: () => dispatch(actionCreators.resetMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfo);
