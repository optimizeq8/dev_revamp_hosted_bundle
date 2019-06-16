//Components
import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
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
import { Segment } from "expo";
//icons
import HomeBussinesIcon from "../../../../assets/SVGs/Person";
import CompanyIcon from "../../../../assets/SVGs/Group";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";
import BusinessCategoryList from "../../CreateBusinessAccount/BusinessCategoriesList";

//Validator
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

class BusinessInfo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        ...props.userInfo,
        businessname: "",
        businesscategory: "",
        country: "",
        businesstype: "1",
        country_code: this.props.countryCode
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
      items: BusinessCategoryList,
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
    Segment.screen("Signup Enter BusinessInfo Screen");
  }

  async _verifyBusinessName(businesstype, name) {
    if (businesstype === "2" && name !== "") {
      await this.props.verifyBusinessName(name);

      this.setState({
        nameError: validateWrapper(
          "mandatory",
          this.state.userInfo.businessname
        )
      });
    } else {
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
    this._verifyBusinessName(
      this.state.userInfo.businesstype,
      this.state.userInfo.businessname
    );
    if (
      !this.state.nameError &&
      !nameError &&
      !this.state.countryError &&
      !this.state.businesscategoryError
    ) {
      this.props.registerUser(this.state.userInfo, this.props.navigation);
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.touchableViewContainer}>
          <View style={styles.block1}>
            <Button
              block
              dark
              style={[
                this.state.userInfo.businesstype === "1"
                  ? styles.activebutton
                  : styles.button,
                styles.block1ButtonLeft
              ]}
              onPress={() => {
                this.setState({
                  userInfo: { ...this.state.userInfo, businesstype: "1" }
                });
              }}
            >
              <Text
                style={[
                  this.state.userInfo.businesstype === "1"
                    ? styles.activetext
                    : styles.inactivetext,
                  styles.textCenter
                ]}
              >
                {/* <Icon
                  type="AntDesign"
                  name="down"
                  style={[
                    this.state.userInfo.businesstype === "1"
                      ? styles.activetext
                      : styles.inactivetext,
                    {
                      left: 25
                    }
                  ]}
                /> */}
                <HomeBussinesIcon />
                {"\n"}An Individual
              </Text>
            </Button>
            <Button
              dark
              style={[
                this.state.userInfo.businesstype === "2"
                  ? styles.activebutton
                  : styles.button,
                styles.block1ButtonRight
              ]}
              onPress={async () => {
                await this.setState({
                  userInfo: { ...this.state.userInfo, businesstype: "2" }
                });
                this._verifyBusinessName(
                  this.state.userInfo.businesstype,
                  this.state.userInfo.businessname
                );
              }}
            >
              <Text
                style={[
                  this.state.userInfo.businesstype === "2"
                    ? styles.activetext
                    : styles.inactivetext,
                  styles.textCenter
                ]}
              >
                <Icon
                  type="AntDesign"
                  name="down"
                  style={[
                    this.state.userInfo.businesstype === "2"
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.left25
                  ]}
                />
                {"\n"}A Company
              </Text>
            </Button>
          </View>
          <View style={styles.block2}>
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
                  this.state.inputN
                    ? globalStyles.orangeTextColor
                    : globalStyles.darkGrayTextColor,
                  {
                    flexDirection: "column"
                  }
                ]}
              >
                <Icon
                  style={[
                    styles.iconSize,
                    this.state.inputN
                      ? globalStyles.orangeTextColor
                      : globalStyles.darkGrayTextColor
                  ]}
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
            {this.state.nameError !== "" &&
              this.state.nameError &&
              !this.state.nameError.includes("blank") && (
                <Text style={[styles.text, styles.nameErrorText]}>
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
                  this.state.inputC
                    ? globalStyles.purpleBorderColor
                    : this.state.countryError
                    ? globalStyles.redBorderColor
                    : globalStyles.lightGrayBorderColor
                ]}
              >
                <Text style={[styles.inputtext, styles.pickerInputText]}>
                  {this.state.userInfo.country === ""
                    ? this.state.userInfo.businesstype === "1"
                      ? "Where do you live?"
                      : "Country"
                    : this.state.userInfo.country}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={styles.iconDownCountry}
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
                  this.state.inputT
                    ? globalStyles.purpleBorderColor
                    : this.state.businesscategoryError
                    ? globalStyles.redBorderColor
                    : globalStyles.lightGrayBorderColor
                ]}
              >
                <Text
                  placeholder={
                    this.state.userInfo.businesscategory !== ""
                      ? this.state.userInfo.businesscategory
                      : ""
                  }
                  style={[styles.inputtext, styles.pickerInputText]}
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
                  style={styles.iconDownCountry}
                />
              </Item>
            </RNPickerSelect>
            <Text style={[styles.link]}>
              By tapping the button below you {"\n"}
              Agree to the Terms & Conditions
            </Text>
          </View>
          <View style={styles.block3}>
            <Button
              block
              dark
              style={[styles.bottomCard]}
              onPress={() => {
                this._handleSubmission();
              }}
            >
              <Text style={styles.buttontext}>CREATE ACCOUNT</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.register.userInfo,
  successName: state.register.successName,
  countryCode: state.register.countryCode
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userInfo, navigation) =>
    dispatch(actionCreators.registerUser(userInfo, navigation)),
  verifyBusinessName: businessName =>
    dispatch(actionCreators.verifyBusinessName(businessName))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfo);
