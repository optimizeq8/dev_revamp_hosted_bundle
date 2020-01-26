//// components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  I18nManager
} from "react-native";
import { Text, Item, Input } from "native-base";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-navigation";
import { heightPercentageToDP } from "react-native-responsive-screen";
import LowerButton from "../../MiniComponents/LowerButton";
import KeyboardShift from "../../MiniComponents/KeyboardShift";
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
import Logo from "../../../assets/SVGs/Optimize";

class ForgotPassword extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  componentDidMount() {
    Segment.screenWithProperties("Forgot Password", {
      category: "Sign In"
    });
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.message !== this.props.message) {
  //     this.setState({
  //       emailError:
  //         this.props.message.includes("Email") && this.props.message
  //           ? "Invalid Email"
  //           : "",
  //       passwordError:
  //         this.props.message.includes("Password") && this.props.message
  //           ? "Invalid Password "
  //           : ""
  //     });
  //   }
  // }

  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.email);
    this.setState({
      emailError: emailError
    });
    if (!emailError) {
      this.props.forgotPassword(this.state.email, this.props.navigation);
    }
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <CustomHeader
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          closeButton={true}
        />
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.mainCard}>
            <View>
              <Logo
                style={styles.logo}
                width={heightPercentageToDP(12)}
                height={heightPercentageToDP(12)}
              />
              <Text style={styles.logoText}>Optimize</Text>
            </View>
            <KeyboardShift>
              {() => (
                <>
                  <Text style={styles.text}>{translate("Password Reset")}</Text>

                  <Text style={styles.link}>
                    {translate("Please enter your email address")}
                  </Text>

                  <View style={styles.mainView}>
                    <Item
                      rounded
                      style={[
                        styles.input,
                        this.state.emailError
                          ? globalStyles.redBorderColor
                          : globalStyles.transparentBorderColor
                      ]}
                    >
                      <Input
                        placeholderTextColor="#fff"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={styles.inputText}
                        onChangeText={value => {
                          this.setState({
                            email: value
                          });
                        }}
                        onBlur={() => {
                          this.setState({
                            emailError: validateWrapper(
                              "email",
                              this.state.email
                            )
                          });
                        }}
                        placeholder={translate("Email")}
                      />
                    </Item>
                  </View>
                  <LowerButton
                    style={styles.proceedButtonRTL}
                    function={() => this._handleSubmission()}
                    bottom={-heightPercentageToDP(1.8)}
                  />
                </>
              )}
            </KeyboardShift>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  forgotPassword: (email, navigation) =>
    dispatch(actionCreators.forgotPassword(email, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
