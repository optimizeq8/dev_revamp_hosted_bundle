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

class PhoneNo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      valid: true,
      type: "",
      value: "+965",
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
  componentDidUpdate(prevProps) {
    if (
      prevProps.message !== this.props.message &&
      prevProps.mobileNo !== this.state.value
    ) {
      this.setState({
        numExists:
          this.props.message && this.props.message.includes("registered")
            ? this.props.message
            : ""
      });
    }
  }

  _handleSubmission = () => {
    this.props.resetMessages();
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue(),
      numExists: !this.phone.isValidNumber() && ""
    });

    if (this.phone.isValidNumber() && this.phone.getNumberType() === "MOBILE") {
      this.props.sendMobileNo({
        country_code: this.phone.getCountryCode(),
        mobile: this.phone.getValue().split(this.phone.getCountryCode())[1]
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
        {this.state.numExists !== "" ? (
          <View style={styles.info}>
            <Text style={styles.errorText}>{this.state.numExists}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container]}>
          {!this.props.invite && (
            <Text style={styles.text}>
              Please Provide your {"\n"}
              Mobile Number
            </Text>
          )}
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
            <View
              style={{
                width: 60,
                height: 30,
                position: "absolute",
                borderWidth: 0.3,
                borderColor: this.props.invite ? "#000" : "#fff",
                borderRadius: 5,
                left: 4
              }}
            />
            <Icon
              name="arrow-drop-down"
              type="MaterialIcons"
              style={{
                color: this.props.invite ? "#000" : "#fff",
                marginRight: -30,
                left: -5
              }}
            />
            <PhoneInput
              style={{ width: widthPercentageToDP(70) }}
              textStyle={{
                ...styles.input,
                color: this.props.invite ? "#fff" : "#000",
                borderBottomColor: this.state.valid ? "#5F5F5F" : "red"
              }}
              flagStyle={{
                left: 15,
                zIndex: 5
              }}
              textProps={{
                autoFocus: false,
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
                      mobile: this.phone
                        .getValue()
                        .split(this.phone.getCountryCode())[1],
                      valid: this.phone.isValidNumber()
                    });
                  }
                }
              }}
              ref={ref => {
                this.phone = ref;
              }}
              // onChangePhoneNumber={this.onChangePhoneNumber}
              onPressFlag={this.onPressFlag}
              initialCountry="kw"
              countriesList={require("./countries.json")}
              value={this.state.value}
              offset={10}
            />
          </Item>
          <CountryModal
            ref={ref => {
              this.myCountryPicker = ref;
            }}
            data={this.state.pickerData}
            onChange={country => {
              this.selectCountry(country);
            }}
            cancelText="Cancel"
          />
          {this.renderInfo()}
          {!this.props.invite && (
            <LowerButton
              function={() => this._handleSubmission()}
              bottom={heightPercentageToDP(0.1)}
            />
          )}
          {/* <Button onPress={this.updateInfo} style={styles.button}>
            <Icon style={styles.icon} name="arrow-forward" />
          </Button> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  message: state.auth.message,
  verified: state.auth.verified
});

const mapDispatchToProps = dispatch => ({
  sendMobileNo: mobileNo => dispatch(actionCreators.sendMobileNo(mobileNo)),
  resetMessages: () => dispatch(actionCreators.resetMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNo);
