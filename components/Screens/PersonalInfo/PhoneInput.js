import React, { Component } from "react";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import { Item, Icon } from "native-base";
import PhoneInput from "react-native-phone-input";
import countriesMobileData from "../../Data/countries.mobilephone";

import styles from "./styles";
import globalStyles from "../../../GlobalStyles";
import CountryModal from "../Signup/PhoneNo/CountryModal";
import { showMessage } from "react-native-flash-message";
import find from "lodash/find";
// added a new component for phone field with different styling
export default class PhoneNoField extends Component {
  state = { pickerData: null, country: "kw", dialCode: "+965", number: "" };
  componentDidMount() {
    this.setState({ pickerData: this.phone.getPickerData() });
  }

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  selectCountry = (country) => {
    this.setState({
      country: country,
      dialCode: country.dialCode,
      number: "",
    });
    this.phone.selectCountry(country.iso2);
    this.props.changeNo(
      this.state.number,
      null,
      null,
      this.phone.isValidNumber()
    );
  };

  onChangePhoneNumber = (number) => {
    this.setState({ number });
    if (this.phone.isValidNumber()) {
      this.props.changeNo(
        number,
        this.phone.getCountryCode(),
        this.phone.getNumberType(),
        this.phone.isValidNumber()
      );
    } else {
      this.props.changeNo(number, null, null, this.phone.isValidNumber());
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    const { height = 15, fontSize = 12 } = this.props;
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <Item rounded style={[styles.phoneInput]}>
          <TouchableOpacity
            style={styles.flagTouchableArea}
            onPress={this.onPressFlag}
          />
          <Icon
            name="keyboard-arrow-down"
            type="MaterialIcons"
            style={[styles.flagIcon, globalStyles.grayTextColor]}
          />
          <PhoneInput
            disabled={this.props.disabled}
            textStyle={{
              fontSize: fontSize,
              height: height,
              color: "#4b4b4b",
              fontFamily: "montserrat-regular-english",
              textAlign: I18nManager.isRTL ? "right" : "left",
              borderBottomColor: this.props.valid ? "transparent" : "red",
            }}
            flagStyle={styles.flagStyle}
            textProps={{
              autoFocus: false,
              maxLength: 14,
              onBlur: () => {
                let country_name = "";
                if (!this.phone.isValidNumber()) {
                  showMessage({
                    message: translate("Please enter a valid number!"),
                    type: "warning",
                    position: "top",
                  });
                }
                if (this.phone.isValidNumber()) {
                  country_name = find(
                    this.phone.getAllCountries(),
                    (country) =>
                      country.dialCode === this.phone.getCountryCode()
                  ).name;
                }
              },
            }}
            ref={(ref) => {
              this.phone = ref;
            }}
            onChangePhoneNumber={(number) => this.onChangePhoneNumber(number)}
            onPressFlag={this.onPressFlag}
            initialCountry={this.state.country.iso2}
            countriesList={countriesMobileData}
            value={
              this.props.phoneNum ? this.props.phoneNum : this.state.dialCode
            }
            // offset={10}
          />
        </Item>
        <CountryModal
          ref={(ref) => {
            this.myCountryPicker = ref;
          }}
          optionTextStyle={styles.optionTextStyle}
          data={this.state.pickerData}
          onChange={(country) => {
            this.selectCountry(country);
          }}
          cancelText="Cancel"
        />
      </View>
    );
  }
}
