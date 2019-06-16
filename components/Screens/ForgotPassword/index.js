//// components
import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon
} from "native-base";
import { LinearGradient, Segment } from "expo";
import { SafeAreaView } from "react-navigation";
import CloseIcon from "../../../assets/SVGs/Close";

//Validation
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";

//icons
import Logo from "../../../assets/SVGs/Optimize";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import LowerButton from "../../MiniComponents/LowerButton";
import CloseButton from "../../MiniComponents/CloseButton";
import KeyboardShift from "../../MiniComponents/KeyboardShift";
import CustomHeader from "../../MiniComponents/Header";

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
    Segment.screen("Forgot Password Screen");
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
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: "never" }}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <CustomHeader navigation={this.props.navigation} closeButton={true} />
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.mainCard}>
            <View>
              <Logo
                style={styles.logo}
                width={heightPercentageToDP(15)}
                height={heightPercentageToDP(15)}
              />
              <Text style={styles.logoText}>Optimize</Text>
            </View>
            <KeyboardShift>
              {() => (
                <>
                  <Text style={styles.text}>Password Reset</Text>

                  <Text style={styles.link}>
                    Please enter your email address.
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
                        placeholder="Email"
                      />
                    </Item>
                  </View>
                  <LowerButton
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
