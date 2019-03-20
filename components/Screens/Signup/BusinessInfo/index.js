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
      userInfo: {
        ...this.props.userInfo,
        businessname: "",
        businesstype: "",
        country: "",
        usertype: "1",
        country_code: this.props.countryCode
      },
      nameError: "",
      countryError: "",
      businesstypeError: "",
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
  componentDidMount() {
    this.props.resetMessages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      if (this.props.message === "Business name already exist") {
        console.log(this.props.message);

        this.setState({
          nameError: this.props.message ? this.props.message : null
        });
      } else {
        this.setState({
          nameError: null
        });
      }
    }
  }
  _verifyBusinessName(userType, name) {
    if (userType === "2" && name !== "") {
      this.props.resetMessages();
      this.props.verifyBusinessName(name);

      this.setState({
        nameError: validateWrapper(
          "mandatory",
          this.state.userInfo.businessname
        )
      });
    } else {
      this.props.resetMessages();
      this.setState({
        nameError: validateWrapper(
          "mandatory",
          this.state.userInfo.businessname
        )
      });
    }
  }
  _handleSubmission = () => {
    const nameError = validateWrapper(
      "mandatory",
      this.state.userInfo.businessname
    );
    const countryError = validateWrapper(
      "mandatory",
      this.state.userInfo.country
    );
    const businesstypeError = validateWrapper(
      "mandatory",
      this.state.userInfo.businesstype
    );
    this.setState({
      nameError,
      countryError,
      businesstypeError
    });
    if (
      !this.state.nameError &&
      !this.state.countryError &&
      !this.state.businesstypeError
    ) {
      this.props.registerUser(this.state.userInfo, this.props.navigation);
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
            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.state.nameError ? "red" : "#D9D9D9"
                }
              ]}
            >
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
                onBlur={() =>
                  this._verifyBusinessName(
                    this.state.userInfo.usertype,
                    this.state.userInfo.businessname
                  )
                }
              />
            </Item>
            {this.state.nameError !== "" && this.state.nameError && (
              <Text
                style={[
                  styles.text,
                  { paddingTop: 0, marginBottom: 0, bottom: 20 }
                ]}
              >
                {this.state.nameError}
              </Text>
            )}

            <RNPickerSelect
              items={this.state.countries}
              placeholder={{ label: "Select a country", value: "" }}
              onClose={() =>
                this.setState({
                  countryError: validateWrapper(
                    "mandatory",
                    this.state.userInfo.country
                  )
                })
              }
              onValueChange={value => {
                this.setState({
                  userInfo: { ...this.state.userInfo, country: value }
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
              placeholder={{ label: "Select a business type", value: "" }}
              onClose={() =>
                this.setState({
                  businesstypeError: validateWrapper(
                    "mandatory",
                    this.state.userInfo.businesstype
                  )
                })
              }
              onValueChange={value => {
                this.setState({
                  userInfo: { ...this.state.userInfo, businesstype: value }
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
  userInfo: state.auth.userInfo,
  message: state.auth.message,
  successName: state.auth.successName,
  countryCode: state.auth.countryCode
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userInfo, navigation) =>
    dispatch(actionCreators.registerUser(userInfo, navigation)),
  verifyBusinessName: businessName =>
    dispatch(actionCreators.verifyBusinessName(businessName)),
  resetMessages: () => dispatch(actionCreators.resetMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfo);
