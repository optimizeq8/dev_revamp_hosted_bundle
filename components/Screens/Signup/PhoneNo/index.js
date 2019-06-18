//Components
import React, { Component } from "react";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { Segment } from "expo";

import { Icon, Item } from "native-base";
import { showMessage } from "react-native-flash-message";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

import CountryModal from "./CountryModal";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

import countriesMobileData from "../../../Data/countries.mobilephone";
// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import LowerButton from "../../../MiniComponents/LowerButton";

class PhoneNo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      valid: true,
      type: "",

      value: "",
      numExists: "",
      pickerData: null
    };
  }

  componentDidMount() {
    Segment.screen("Signup Enter Phone No. Screen");

    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }

  _handleSubmission = () => {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      //   value: this.phone.getValue(),
      numExists: !this.phone.isValidNumber() && ""
    });

    if (this.phone.isValidNumber() && this.phone.getNumberType() === "MOBILE") {
      this.props.sendMobileNo({
        country_code: this.phone.getCountryCode(),
        mobile: this.state.value.trim()
      });
    }
  };

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  selectCountry = country => {
    this.phone.selectCountry(country.iso2);
  };

  // onChangePhoneNumber = newNumber => {
  //   console.log(newNumber);

  //   // let value =
  //   //   this.phone.getCountryCode() +
  //   //   " " +
  //   //   newNumber.split(this.phone.getCountryCode())[1];
  //   this.setState({
  //     value
  //   });
  // };

  renderInfo = () => {
    return (
      <View>
        {this.state.type !== "MOBILE" &&
          this.state.type !== "" &&
          this.state.type !== "UNKNOWN" && (
            <View style={styles.info}>
              <Text style={styles.errorText}>
                Please Enter a valid Mobile number.
              </Text>
            </View>
          )}
        {!this.state.valid ? (
          <View style={styles.info}>
            <Text style={styles.errorText}>
              Please Enter a valid Mobile number.
            </Text>
          </View>
        ) : null}
      </View>
    );
  };
  phoneInputRender = () => (
    <Item
      rounded
      style={[
        styles.phoneInput,
        this.props.invite
          ? globalStyles.blackBackgroundColor
          : globalStyles.transparentBackgroundColor,
        this.props.invite ? { opacity: 0.5 } : { opacity: 0 }
      ]}
    >
      <TouchableOpacity
        style={styles.flagTouchableArea}
        onPress={this.onPressFlag}
      />
      <Icon
        name="arrow-drop-down"
        type="MaterialIcons"
        style={[
          styles.flagIcon,
          this.props.invite
            ? globalStyles.whiteTextColor
            : globalStyles.transparentTextColor
        ]}
      />
      <PhoneInput

        style={styles.phoneInputStyle}
        textStyle={{
          color: this.props.invite ? "#FFF" : "#0000",
          ...styles.phoneInputTextStyle,
          ...styles.input,

          borderBottomColor: this.props.invite
            ? "#0000"
            : this.state.valid
            ? "#5F5F5F"
            : "red"
        }}
        flagStyle={styles.flagStyle}
        textProps={{
          autoFocus: false,
          maxLength: 14,
          onBlur: () => {
            if (!this.phone.isValidNumber()) {
              showMessage({
                message: "Please enter a valid number!",
                type: "warning",
                position: "top"
              });
            }
            if (this.props.invite) {
              this.props._getMobile({
                country_code: this.phone.getCountryCode(),
                mobile: this.state.value,
                valid: this.phone.isValidNumber()
              });
            }
          }
        }}
        ref={ref => {
          this.phone = ref;
        }}
        onChangePhoneNumber={number => {
          //   console.log('mobile value', number.split(this.phone.getCountryCode())[1])
          if (number.toString().length > 3 && this.phone.isValidNumber()) {
            this.setState({
              value: number.split(this.phone.getCountryCode())[1]
            });
          }
        }}
        onPressFlag={this.onPressFlag}
        initialCountry="kw"
        countriesList={countriesMobileData}
        value="+965"
        offset={10}
      />
    </Item>
  );
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[
            {
              flex: !this.props.invite ? 1 : 0
            },
            styles.phoneViewContainer
          ]}
        >
          <View
            style={[styles.container, { flex: !this.props.invite ? 1 : 0 }]}
          >
            {!this.props.invite && (
              <Text style={styles.text}>
                Please enter your {"\n"}
                Mobile Number
              </Text>
            )}
            {!this.props.invite && (
              <KeyboardShift style={styles.keyboardArea}>
                {() => this.phoneInputRender()}
              </KeyboardShift>
            )}
            {this.props.invite && this.phoneInputRender()}
            <CountryModal
              ref={ref => {
                this.myCountryPicker = ref;
              }}
              optionTextStyle={styles.optionTextStyle}
              data={this.state.pickerData}
              onChange={country => {
                this.selectCountry(country);
              }}
              cancelText="Cancel"
            />
            {this.renderInfo()}

            {/* <Button onPress={this.updateInfo} style={styles.button}>
            <Icon style={styles.icon} name="arrow-forward" />
          </Button> */}
          </View>
          {!this.props.invite && (
            <LowerButton
              function={() => this._handleSubmission()}
              bottom={heightPercentageToDP(0.2)}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  verified: state.register.verified
});

const mapDispatchToProps = dispatch => ({
  sendMobileNo: mobileNo => dispatch(actionCreators.sendMobileNo(mobileNo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNo);
