//Components
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Text,
  Item,
  Input,
  Container,
  Badge,
  Icon,
  Label
} from "native-base";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";

// Style
import styles, { colors } from "./styles";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

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
        businesscategory: "",
        country: "",
        businesstype: "1"
      },
      inputT: false,
      inputN: false,
      inputC: false,
      nameError: "",
      countryError: "",
      businesscategoryError: "",
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
  _verifyBusinessName(businesstype, name) {
    if (businesstype === "2" && name !== "") {
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
    const businesscategoryError = validateWrapper(
      "mandatory",
      this.state.userInfo.businesscategory
    );
    this.setState({
      nameError,
      countryError,
      businesscategoryError
    });
    if (
      !this.state.nameError &&
      !this.state.countryError &&
      !this.state.businesscategoryError
    ) {
      this.props.registerUser(this.state.userInfo, this.props.navigation);
    }
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: "#751AFF",
          flex: 1
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: 380,
            backgroundColor: "#751AFF",
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center"
          }}
        >
          <Button
            block
            dark
            style={[
              this.state.userInfo.businesstype === "1"
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
                userInfo: { ...this.state.userInfo, businesstype: "1" }
              });
            }}
          >
            <Text style={{ textAlign: "center" }}>
              <Icon
                type="AntDesign"
                name="down"
                style={{
                  color: "#5F5F5F",
                  fontSize: 12,
                  left: 25
                }}
              />
              {"\n"}An Individual
            </Text>
          </Button>
          <Button
            dark
            style={[
              this.state.userInfo.businesstype === "2"
                ? styles.activebutton
                : styles.button,
              {
                borderTopStartRadius: 0,
                borderBottomStartRadius: 0,
                borderBottomEndRadius: 15,
                borderTopEndRadius: 15
              }
            ]}
            onPress={() => {
              this.setState({
                userInfo: { ...this.state.userInfo, businesstype: "2" }
              });
            }}
          >
            <Text style={{ textAlign: "center" }}>
              <Icon
                type="AntDesign"
                name="down"
                style={{
                  color: "#5F5F5F",
                  fontSize: 12,
                  left: 25
                }}
              />
              {"\n"}A Company
            </Text>
          </Button>
          {
            // <RadioGroup
            //   flexDirection="row"
            //   color="#5F5F5F"
            //   radioButtons={this.state.data}
            //   onPress={value => {
            //     var data = value.find(data => data.selected === true);
            //     this.setState({
            //       userInfo: { ...this.state.userInfo, businesstype: data.value }
            //     });
            //   }}
            // />
          }
        </View>
        <View style={styles.container}>
          <Item
            floatingLabel
            style={[
              styles.input,
              {
                borderColor: this.state.inputN
                  ? "#7039FF"
                  : this.state.nameError
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
              {this.state.userInfo.businesstype === "1"
                ? "Your Name"
                : "Company Name"}
            </Label>
            <Input
              style={styles.inputtext}
              onChangeText={value => {
                this.setState({
                  userInfo: {
                    ...this.state.userInfo,
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
                  this.state.userInfo.businesstype,
                  this.state.userInfo.businessname
                );
              }}
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
            onOpen={() => {
              this.setState({ inputC: true });
            }}
            onClose={() => {
              this.setState({ inputC: false });
              this.setState({
                countryError: validateWrapper(
                  "mandatory",
                  this.state.userInfo.country
                )
              });
            }}
            onValueChange={value => {
              this.setState({
                userInfo: { ...this.state.userInfo, country: value }
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
                {this.state.userInfo.country === ""
                  ? this.state.userInfo.businesstype === "1"
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
            onOpen={() => {
              this.setState({ inputT: true });
            }}
            onClose={() => {
              this.setState({ inputT: false });
              this.setState({
                businesscategoryError: validateWrapper(
                  "mandatory",
                  this.state.userInfo.businesscategory
                )
              });
            }}
            onValueChange={value => {
              this.setState({
                userInfo: { ...this.state.userInfo, businesscategory: value }
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
                  this.state.userInfo.businesscategory !== ""
                    ? this.state.userInfo.businesscategory
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
                {this.state.userInfo.businesscategory === ""
                  ? this.state.userInfo.businesstype === "1"
                    ? "What do you do?"
                    : "Business Type"
                  : this.state.items.find(
                      i => i.value === this.state.userInfo.businesscategory
                    ).label}
              </Text>
              <Icon
                type="AntDesign"
                name="down"
                style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
              />
            </Item>
          </RNPickerSelect>
          <Text style={[styles.link, { marginBottom: 10 }]}>
            By tapping the button below you {"\n"}
            Agree to the Terms & Conditions
          </Text>
        </View>
        <Button
          block
          dark
          style={[styles.bottomCard, { justifyContent: "flex-end" }]}
          onPress={() => {
            this._handleSubmission();
          }}
        >
          <Text style={styles.buttontext}>CREATE ACCOUNT</Text>
        </Button>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  message: state.auth.message,
  successName: state.auth.successName
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
