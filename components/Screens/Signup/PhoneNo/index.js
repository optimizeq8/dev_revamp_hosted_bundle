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
import { Button, Icon, Item } from "native-base";
import CountryModal from "./CountryModal";
import { Segment } from "expo";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";
import LowerButton from "../../../MiniComponents/LowerButton";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { showMessage } from "react-native-flash-message";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

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
        {
          backgroundColor: this.props.invite
            ? "rgba(0, 0, 0, 0.5)"
            : "transparent"
        }
      ]}
    >
      <TouchableOpacity
        style={{
          width: 60,
          height: 30,
          position: "absolute",
          borderWidth: 0.3,
          borderColor: "transparent",
          borderRadius: 5,
          left: 4,
          zIndex: 5
        }}
        onPress={this.onPressFlag}
      />
      <Icon
        name="arrow-drop-down"
        type="MaterialIcons"
        style={{
          color: this.props.invite ? "#fff" : "#000",
          marginRight: -30,
          left: -5
        }}
      />
      <PhoneInput
        style={{ width: widthPercentageToDP(70) }}
        textStyle={{
          ...styles.input,
          color: this.props.invite ? "#fff" : "#000",
          borderBottomColor: this.props.invite
            ? "#0000"
            : this.state.valid
            ? "#5F5F5F"
            : "red",
          left: "3%"
        }}
        flagStyle={{
          left: 14,
          zIndex: 5
        }}
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
        countriesList={require("./countries.json")}
        value="+965"
        offset={10}
      />
    </Item>
  );
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flex: !this.props.invite ? 1 : 0,
            justifyContent: "space-around"
          }}
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
              <KeyboardShift
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {() => this.phoneInputRender()}
              </KeyboardShift>
            )}
            {this.props.invite && this.phoneInputRender()}
            <CountryModal
              ref={ref => {
                this.myCountryPicker = ref;
              }}
              optionTextStyle={{ alignSelf: "flex-start" }}
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
