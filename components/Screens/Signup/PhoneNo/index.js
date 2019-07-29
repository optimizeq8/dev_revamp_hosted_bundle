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
import * as Segment from "expo-analytics-segment";
import { Icon, Item } from "native-base";
import { showMessage } from "react-native-flash-message";
import CountryModal from "./CountryModal";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";
import PhoneNoField from "./PhoneNoField";
//Data
import countriesMobileData from "../../../Data/countries.mobilephone";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import LowerButton from "../../../MiniComponents/LowerButton";

//Functions
import { heightPercentageToDP } from "react-native-responsive-screen";
import find from "lodash/find";

class PhoneNo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      valid: true,
      type: "",
      countryCode: "",
      value: "",
      numExists: "",
      pickerData: null
    };
  }

  componentDidMount() {
    Segment.screenWithProperties("Phone No. Registration", {
      category: "Sign Up"
    });
  }

  handlePickerData = data => {
    this.setState({
      pickerData: data
    });
  };

  _handleSubmission = () => {
    if (this.state.valid && this.state.type === "MOBILE") {
      this.props.sendMobileNo({
        country_code: this.state.countryCode,
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

  changeNo = (number, countryCode, type, valid) => {
    if (number.toString().length > 3 && valid) {
      this.setState({
        value: number.split(countryCode)[1],
        countryCode: countryCode,
        valid,
        type
      });
    }
    this.props.changeFunction && this.props.changeFunction(number, valid);
  };

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
                {() => (
                  <PhoneNoField
                    {...this.props}
                    handlePickerData={this.handlePickerData}
                    valid={this.state.valid}
                    type={this.state.type}
                    onPressFlag={this.onPressFlag}
                    changeNo={this.changeNo}
                  />
                )}
              </KeyboardShift>
            )}
            {this.props.invite && (
              <PhoneNoField
                {...this.props}
                handlePickerData={this.handlePickerData}
                valid={this.state.valid}
                type={this.state.type}
                onPressFlag={this.onPressFlag}
                changeNo={this.changeNo}
              />
            )}

            {this.renderInfo()}

            {/* <Button onPress={this.updateInfo} style={styles.button}>
            <Icon style={styles.icon} name="arrow-forward" />
          </Button> */}
          </View>
          {!this.props.invite && !this.props.info && (
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
