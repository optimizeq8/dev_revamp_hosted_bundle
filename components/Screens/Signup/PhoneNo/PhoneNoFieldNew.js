import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Item, Icon } from "native-base";
import PhoneInput from "react-native-phone-input";
import countriesMobileData from "../../../Data/countries.mobilephone";

import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";
import CountryModal from "./CountryModal";
import { showMessage } from "react-native-flash-message";
import PhoneOutline from "../../../../assets/SVGs/PhoneOutline1";
import find from "lodash/find";
export default class PhoneNoField extends Component {
  state = { pickerData: null, country: "kw", dialCode: "+965", number: "" };
  componentDidMount() {
    this.setState({ pickerData: this.phone.getPickerData() });
  }

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  selectCountry = country => {
    this.setState({
      country: country,
      dialCode: country.dialCode,
      number: ""
    });
    this.phone.selectCountry(country.iso2);
    this.props.changeNo(
      this.state.number,
      null,
      null,
      this.phone.isValidNumber()
    );
  };

  onChangePhoneNumber = number => {
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
    const { label } = this.props;
    return (
      <View style={styles.phoneView}>
        <Item
          style={[
            styles.phoneInputNew
            // this.props.invite
            //   ? this.props.whatsApp
            // ?

            //   : { backgroundColor: "rgba(0,0,0,0.5)" }
            // : globalStyles.transparentBackgroundColor,
            // this.props.invite ? { opacity: 0.6 } : { opacity: 1 }
          ]}
        >
          <PhoneOutline />
          <TouchableOpacity
            style={styles.flagTouchableArea}
            onPress={this.onPressFlag}
          />
          <Icon
            name="keyboard-arrow-down"
            type="MaterialIcons"
            style={[styles.flagIcon, globalStyles.orangeTextColor]}
          />
          <View style={{ marginLeft: 13 }}>
            <Text style={[styles.inputLabelNew]}>{translate(label)}</Text>

            <PhoneInput
              style={styles.phoneInputStyle}
              textStyle={{
                //   backgroundColor: this.props.invite ? "#000000" : "#0000",

                color:
                  //  this.props.invite ?
                  "#FFFF",
                // : "#000",
                ...styles.phoneInputTextStyle,
                ...styles.input,

                borderBottomColor: this.props.invite
                  ? "#0000"
                  : this.props.valid
                  ? "transparent"
                  : "red",
                opacity: this.props.disabled ? 0.5 : 1
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
                      message: translate("Please enter a valid number!"),
                      type: "warning",
                      position: "top"
                    });
                  }
                  if (this.props.invite && this.phone.isValidNumber()) {
                    country_name = find(
                      this.phone.getAllCountries(),
                      country =>
                        country.dialCode === this.phone.getCountryCode()
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
              onChangePhoneNumber={number => this.onChangePhoneNumber(number)}
              onPressFlag={this.onPressFlag}
              initialCountry={this.state.country.iso2}
              countriesList={countriesMobileData}
              value={
                this.props.phoneNum ? this.props.phoneNum : this.state.dialCode
              }
              offset={10}
            />
          </View>
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
      </View>
    );
  }
}