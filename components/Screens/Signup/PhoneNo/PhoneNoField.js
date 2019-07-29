import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Item, Icon } from "native-base";
import PhoneInput from "react-native-phone-input";
import countriesMobileData from "../../../Data/countries.mobilephone";

import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";
import CountryModal from "./CountryModal";
import { showMessage } from "react-native-flash-message";
import find from "lodash/find";
export default class PhoneNoField extends Component {
  state = { pickerData: null };
  componentDidMount() {
    this.setState({ pickerData: this.phone.getPickerData() });
  }

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  selectCountry = country => {
    this.phone.selectCountry(country.iso2);
  };
  render() {
    return (
      <>
        <Item
          rounded
          style={[
            styles.phoneInput,
            this.props.invite
              ? this.props.whatsApp
                ? { backgroundColor: "rgba(0,0,0,0.3)" }
                : globalStyles.blackBackgroundColor
              : globalStyles.transparentBackgroundColor,
            this.props.invite ? { opacity: 0.6 } : { opacity: 1 }
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
              //   backgroundColor: this.props.invite ? "#000000" : "#0000",

              color: this.props.invite ? "#FFFF" : "#000",
              ...styles.phoneInputTextStyle,
              ...styles.input,

              borderBottomColor: this.props.invite
                ? "#0000"
                : this.props.valid
                ? "#5F5F5F"
                : "red",
              opacity: this.props.disabled ? 0.5 : 0
            }}
            disabled={this.props.disabled}
            flagStyle={styles.flagStyle}
            textProps={{
              autoFocus: false,
              maxLength: 14,
              onBlur: () => {
                let country_name = "";

                if (!this.phone.isValidNumber()) {
                  showMessage({
                    message: "Please enter a valid number!",
                    type: "warning",
                    position: "top"
                  });
                }
                if (this.props.invite && this.phone.isValidNumber()) {
                  country_name = find(
                    this.phone.getAllCountries(),
                    country => country.dialCode === this.phone.getCountryCode()
                  ).name;

                  this.props._getMobile &&
                    this.props._getMobile({
                      country_code: this.phone.getCountryCode(),
                      mobile: this.phone
                        .getValue()
                        .split(this.phone.getCountryCode())[1],
                      valid: this.phone.isValidNumber(),
                      country_name
                    });
                }
              }
            }}
            ref={ref => {
              this.phone = ref;
            }}
            onChangePhoneNumber={number =>
              this.props.changeNo(
                number,
                this.phone.getCountryCode(),
                this.phone.getNumberType(),
                this.phone.isValidNumber()
              )
            }
            onPressFlag={this.props.onPressFlag}
            initialCountry="kw"
            countriesList={countriesMobileData}
            value={this.props.phoneNum ? this.props.phoneNum : "+965"}
            offset={10}
          />
        </Item>
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
      </>
    );
  }
}
