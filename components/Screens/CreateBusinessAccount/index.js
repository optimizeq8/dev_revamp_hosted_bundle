//Components
import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Button, Text, Item, Input, Container, Icon, Label } from "native-base";
import { LinearGradient } from "expo";
import RNPickerSelect from "react-native-picker-select";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Validator
import validateWrapper from "../../../Validation Functions/ValidateWrapper";

class CreateBusinessAccount extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      businessAccount: {
        businessname: "",
        businesscategory: "",
        country: "",
        businesstype: "1",
        businessemail: ""
      },
      inputT: false,
      inputN: false,
      inputC: false,
      inputE: false,
      businessnameError: "",
      businessemailError: "",
      businesscategoryError: "",
      countryError: "",
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

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      if (this.props.message === "Business name already exist") {
        console.log(this.props.message);

        this.setState({
          businessnameError: this.props.message ? this.props.message : null
        });
      } else {
        this.setState({
          nameError: null
        });
      }
    }
  }
  async _verifyBusinessName(businesstype, name) {
    if (businesstype === "2" && name !== "") {
      this.props.resetMessages();
      await this.props.verifyBusinessName(name);

      this.setState({
        businessnameError: validateWrapper(
          "mandatory",
          this.state.businessAccount.businessname
        )
      });
    } else {
      this.props.resetMessages();
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
    const businesscategoryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businesscategory
    );
    const countryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.country
    );
    this.setState({
      businessnameError,
      businessemailError,
      businesscategoryError,
      countryError
    });
    this._verifyBusinessName(
      this.state.businessAccount.businesstype,
      this.state.businessAccount.businessname
    );
    if (
      !businessnameError &&
      !this.state.businessnameError &&
      !businessemailError &&
      !businesscategoryError &&
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
      <Container style={styles.maincontainer}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Button
          transparent
          onPress={() => this.props.navigation.goBack()}
          style={{
            marginLeft: 10
          }}
        >
          <Icon
            style={{
              fontSize: 40,
              color: "#fff"
            }}
            name="close"
          />
        </Button>
        <Text style={styles.title}>New Business</Text>
        <Text style={styles.subtitle}>
          You can create a new Business under you!
        </Text>
        <View
          style={{
            paddingVertical: 10,
            alignSelf: "center",
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center"
          }}
        >
          <Button
            block
            dark
            style={[
              this.state.businessAccount.businesstype === "1"
                ? styles.activebutton
                : styles.button,
              {
                borderBottomEndRadius: 0,
                borderTopEndRadius: 0,
                borderBottomStartRadius: 15,
                borderTopStartRadius: 15
              }
            ]}
            onPress={() => {
              this.setState({
                businessAccount: {
                  ...this.state.businessAccount,
                  businesstype: "1"
                }
              });
            }}
          >
            <Text
              style={[
                this.state.businessAccount.businesstype === "1"
                  ? styles.activetext
                  : styles.inactivetext,
                { textAlign: "center" }
              ]}
            >
              <Icon
                type="AntDesign"
                name="down"
                style={[
                  this.state.businessAccount.businesstype === "1"
                    ? styles.activetext
                    : styles.inactivetext,
                  {
                    left: 25
                  }
                ]}
              />
              {"\n"}An Individual
            </Text>
          </Button>
          <Button
            dark
            style={[
              this.state.businessAccount.businesstype === "2"
                ? styles.activebutton
                : styles.button,
              {
                borderTopStartRadius: 0,
                borderBottomStartRadius: 0,
                borderBottomEndRadius: 15,
                borderTopEndRadius: 15
              }
            ]}
            onPress={async () => {
              await this.setState({
                businessAccount: {
                  ...this.state.businessAccount,
                  businesstype: "2"
                }
              });
              this._verifyBusinessName(
                this.state.businessAccount.businesstype,
                this.state.businessAccount.businessname
              );
            }}
          >
            <Text
              style={[
                this.state.businessAccount.businesstype === "2"
                  ? styles.activetext
                  : styles.inactivetext,
                { textAlign: "center" }
              ]}
            >
              <Icon
                type="AntDesign"
                name="down"
                style={[
                  this.state.businessAccount.businesstype === "2"
                    ? styles.activetext
                    : styles.inactivetext,
                  {
                    left: 25
                  }
                ]}
              />
              {"\n"}A Company
            </Text>
          </Button>
        </View>
        <View style={[styles.mainCard]}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.container}>
              <Item
                floatingLabel
                style={[
                  styles.input,
                  {
                    borderColor: this.state.inputN
                      ? "#7039FF"
                      : this.state.businessnameError
                      ? "red"
                      : "#D9D9D9"
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      flexDirection: "column",
                      color: this.state.inputN ? "#FF9D00" : "#717171"
                    }
                  ]}
                >
                  <Icon
                    style={{
                      fontSize: 20,
                      color: this.state.inputN ? "#FF9D00" : "#717171"
                    }}
                    name="person"
                  />
                  {"  "}
                  {this.state.businessAccount.businesstype === "1"
                    ? "Your Name"
                    : "Company Name"}
                </Label>
                <Input
                  style={styles.inputtext}
                  onChangeText={value => {
                    this.setState({
                      businessAccount: {
                        ...this.state.businessAccount,
                        businessname: value
                      }
                    });
                  }}
                  onFocus={() => {
                    this.setState({ inputN: true });
                  }}
                  onBlur={() => {
                    this.setState({ inputN: false });
                    this._verifyBusinessName(
                      this.state.businessAccount.businesstype,
                      this.state.businessAccount.businessname
                    );
                  }}
                />
              </Item>
              {this.state.businessnameError !== "" &&
                this.state.businessnameError &&
                !this.state.businessnameError.includes("blank") && (
                  <Text
                    style={[
                      styles.text,
                      { paddingTop: 0, marginBottom: 0, bottom: 20 }
                    ]}
                  >
                    {this.state.businessnameError}
                  </Text>
                )}

              <Item
                ref={r => {
                  this._textInputRef = r;
                }}
                floatingLabel
                style={[
                  styles.input,
                  {
                    borderColor: this.state.inputE
                      ? "#7039FF"
                      : this.state.businessemailError
                      ? "red"
                      : "#D9D9D9"
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      bottom: 5,
                      flexDirection: "row",
                      color: this.state.inputE ? "#FF9D00" : "#717171"
                    }
                  ]}
                >
                  <Icon
                    style={{
                      fontSize: 20,
                      color: this.state.inputE ? "#FF9D00" : "#717171"
                    }}
                    name="mail"
                  />
                  {"  "}
                  Email
                </Label>

                <Input
                  style={styles.inputtext}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      businessAccount: {
                        ...this.state.businessAccount,
                        businessemail: value
                      }
                    })
                  }
                  onFocus={() => {
                    this.setState({ inputE: true });
                  }}
                  onBlur={() => {
                    this.setState({ inputE: false });
                    this.setState({
                      businessemailError: validateWrapper(
                        "email",
                        this.state.businessAccount.businessemail
                      )
                    });
                  }}
                />
              </Item>
              {this.state.businessemailError ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#717171",
                    fontFamily: "benton-sans-regular",
                    fontSize: 15
                  }}
                >
                  {this.state.businessemailError}
                </Text>
              ) : null}

              <RNPickerSelect
                items={this.state.countries}
                placeholder={{ label: "Select a country", value: "" }}
                onOpen={() => {
                  this.setState({ inputC: true });
                }}
                onClose={() => {
                  this.setState({ inputC: false });
                  this.setState({
                    countryError: validateWrapper(
                      "mandatory",
                      this.state.businessAccount.country
                    )
                  });
                }}
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
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputC
                        ? "#7039FF"
                        : this.state.countryError
                        ? "red"
                        : "#D9D9D9"
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
                      ? this.state.businessAccount.businesstype === "1"
                        ? "Where do you live?"
                        : "Country"
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
                placeholder={{ label: "Select a business type", value: "" }}
                onOpen={() => {
                  this.setState({ inputT: true });
                }}
                onClose={() => {
                  this.setState({ inputT: false });
                  this.setState({
                    businesscategoryError: validateWrapper(
                      "mandatory",
                      this.state.businessAccount.businesscategory
                    )
                  });
                }}
                onValueChange={value => {
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      businesscategory: value
                    }
                  });
                }}
              >
                <Item
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputT
                        ? "#7039FF"
                        : this.state.businesscategoryError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                >
                  <Text
                    placeholder={
                      this.state.businessAccount.businesscategory !== ""
                        ? this.state.businessAccount.businesscategory
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
                    {this.state.businessAccount.businesscategory === ""
                      ? this.state.businessAccount.businesstype === "1"
                        ? "What do you do?"
                        : "Business Type"
                      : this.state.items.find(
                          i =>
                            i.value ===
                            this.state.businessAccount.businesscategory
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
          </TouchableWithoutFeedback>
          <View style={{ backgroundColor: "#fff" }}>
            <Button
              block
              dark
              style={[styles.bottomCard, { justifyContent: "center" }]}
              onPress={() => {
                this._handleSubmission();
              }}
            >
              <Text style={styles.buttontext}>CREATE NEW BUSINESS</Text>
            </Button>
          </View>
        </View>
      </Container>
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
)(CreateBusinessAccount);
