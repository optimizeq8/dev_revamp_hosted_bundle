//// components
import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
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
import CloseIcon from "../../../assets/SVGs/Close";

//Validation
import validateWrapper from "../../../Validation Functions/ValidateWrapper";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

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
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <CloseButton navigation={() => this.props.navigation.goBack()} />
        {/* <Button
          iconLeft
          large
          transparent
          onPress={() => this.props.navigation.goBack()}
          style={{
            marginLeft: widthPercentageToDP("6")
          }}
        >
          <CloseIcon
            style={{
              top: 25,
              fontSize: 60,
              color: "#fff"
            }}
          />
        </Button> */}

        <View style={{ marginTop: "10%" }}>
          <Logo
            style={{ alignSelf: "center" }}
            width={heightPercentageToDP(20)}
            height={heightPercentageToDP(20)}
          />
          <Text style={styles.logotext}>Optimize</Text>
        </View>
        <Text style={styles.text}>Password Reset</Text>

        <Text style={styles.link}>Please enter your email address.</Text>

        <View style={styles.mainView}>
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.emailError ? "red" : "rgba(0, 0, 0, 0)"
              }
            ]}
          >
            <Input
              placeholderTextColor="#fff"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.inputtext}
              onChangeText={value => {
                this.setState({
                  email: value
                });
              }}
              onBlur={() => {
                this.setState({
                  emailError: validateWrapper("email", this.state.email)
                });
              }}
              placeholder="Email"
            />
          </Item>
          <LowerButton
            function={() => this._handleSubmission()}
            bottom={-heightPercentageToDP(1.5)}
          />
          {/* <Button
            style={styles.button}
            onPress={() => {
              this._handleSubmission();
            }}
          >
            <Icon style={styles.icon} name="arrow-forward" />
          </Button> */}
        </View>
      </Container>
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
