//// components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Item, Input } from "native-base";
import analytics from "@segment/analytics-react-native";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaView from "react-native-safe-area-view";
import Intercom from "react-native-intercom";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import LowerButton from "../../MiniComponents/LowerButton";
import CustomHeader from "../../MiniComponents/Header";

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Validation
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";

//icons
import Logo from "../../../assets/images/Optimize_Logo_transparent.png";

import Exclamation from "../../../assets/SVGs/ExclamationMarkTransparent.svg";

class ForgotPassword extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailError: "",
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  componentDidMount() {
    analytics.track(`forget_password`, {
      source: this.props.navigation.getParam(
        "source",
        this.props.screenProps.prevAppState
      ),
      source_action: this.props.navigation.getParam(
        "source_action",
        this.props.screenProps.prevAppState
      ),
    });
  }

  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.email);
    this.setState({
      emailError: emailError,
    });
    if (!emailError) {
      this.props.forgotPassword(this.state.email, this.props.navigation);
    } else {
      analytics.track(`a_error_form`, {
        source: "forget_password",
        error_page: "forget_password",
        source_action: "a_forget_password",
        error_description: emailError,
        email: this.state.email,
      });
    }
  };
  openSupport = () => {
    Intercom.registerUnidentifiedUser()
      .then(() => {
        analytics.track(`a_help`, {
          source: "forgot_password",
          source_action: "a_help",
          support_type: "intercom",
          action_status: "success",
        });
        Intercom.displayMessageComposer();
      })
      .catch((err) => {
        analytics.track(`a_help`, {
          source: "forgot_password",
          source_action: "a_help",
          support_type: "intercom",
          action_status: "failure",
        });
      });
  };
  render() {
    const { translate } = this.props.screenProps;
    const { forgotPasswordMessage, temp_exist } = this.props;
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        {/* <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        /> */}
        <CustomHeader
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          closeButton={true}
          segment={{
            source: "forgot_password",
            source_action: "a_go_back",
          }}
        />
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.mainCard}>
            <View>
              <Image
                source={Logo}
                resizeMode="contain"
                style={{
                  width: widthPercentageToDP(55),
                  height: heightPercentageToDP(12),
                  alignSelf: "center",
                }}
              />
            </View>

            <Text style={styles.text}>{translate("Password Reset")}</Text>

            <Text style={styles.link}>
              {translate("Please enter your email address")}
            </Text>

            <Item
              rounded
              style={[
                styles.input,
                this.state.emailError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor,
              ]}
            >
              <Input
                placeholderTextColor="#fff"
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.inputText}
                onChangeText={(value) => {
                  this.setState({
                    email: value,
                  });
                }}
                onBlur={() => {
                  this.setState({
                    emailError: validateWrapper("email", this.state.email),
                  });
                }}
                placeholder={translate("Email")}
              />
            </Item>
            {temp_exist ? (
              <View style={styles.messageView}>
                <View style={styles.exclamation}>
                  <Exclamation height={20} fill={"#FFFFFF"} />
                </View>
                <TouchableOpacity
                  style={styles.forgotPasswordMessageView}
                  onPress={this.openSupport}
                >
                  <Text style={styles.forgotPasswordMessage}>
                    {translate(forgotPasswordMessage)}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <LowerButton
              screenProps={this.props.screenProps}
              style={styles.proceedButtonRTL}
              function={() => this._handleSubmission()}
              //   bottom={-heightPercentageToDP(1.8)}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  forgotPasswordMessage: state.login.forgotPasswordMessage,
  forgotPasswordSuccess: state.login.forgotPasswordSuccess,
  temp_exist: state.login.temp_exist,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email, navigation) =>
    dispatch(actionCreators.forgotPassword(email, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
