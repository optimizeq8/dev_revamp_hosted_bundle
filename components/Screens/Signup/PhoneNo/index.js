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
import { Button, Icon } from "native-base";
import CountryModal from "./CountryModal";
import { Segment } from "expo";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";
import LowerButton from "../../../MiniComponents/LowerButton";
import { heightPercentageToDP } from "react-native-responsive-screen";

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

    this.phone.focus();
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

  updateInfo = () => {
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
        <View style={styles.container}>
          <Text style={styles.text}>
            Please Provide your {"\n"}
            Mobile Number
          </Text>
          <PhoneInput
            textStyle={{
              ...styles.input,
              borderBottomColor: this.state.valid ? "#5F5F5F" : "red"
            }}
            flagStyle={{
              left: 40,
              top: 5
            }}
            ref={ref => {
              this.phone = ref;
            }}
            onPressFlag={this.onPressFlag}
            initialCountry="kw"
            countriesList={require("./countries.json")}
            value="965"
            offset={15}
          />
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
          <LowerButton
            function={() => this.updateInfo()}
            bottom={heightPercentageToDP(0.1)}
          />
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
