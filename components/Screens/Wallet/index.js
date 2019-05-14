import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import LowerButton from "../../MiniComponents/LowerButton";
//icons
import ChangePassIcon from "../../../assets/SVGs/MenuIcons/ChangePassIcon";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";
// Style
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";

class Wallet extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      topUp: false,
      inputA: false,
      amountError: ""
    };
  }

  _handleSubmission = () => {
    const amountError = validateWrapper("Budget", this.state.amount);
    this.setState({ amountError });
    if (!amountError)
      this.props.navigation.navigate("PaymentForm", {
        amount: this.state.amount,
        addingCredits: true
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={globalStyles.backButton}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Wallet</Text>
        <WalletIcon
          style={{
            alignSelf: "center"
          }}
          width={85}
          height={85}
        />
        <Text style={[globalStyles.numbers, { fontSize: 40 }]}>
          {this.props.wallet}
          <Text style={styles.dollar}>$</Text>
        </Text>

        <Text style={styles.text}>Avalible Balance</Text>

        <View style={styles.mainCard}>
          <KeyboardAwareScrollView contentContainerStyle={{ height: "100%" }}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <KeyboardShift>
                {() => (
                  <>
                    <Text style={[styles.mainText]}>
                      Your wallet can be used to purchase ads or to resume
                      paused ads immedeatly.
                    </Text>

                    <Button
                      full
                      style={styles.button}
                      onPress={() => {
                        this.setState({ topUp: true });
                      }}
                    >
                      <Text style={styles.buttontext}>Top up wallet </Text>
                    </Button>
                    <Button
                      full
                      style={styles.button}
                      onPress={() => {
                        // this._handleSubmission();
                      }}
                    >
                      <Text style={styles.buttontext}>Request Refund</Text>
                    </Button>
                    <View style={styles.contentContainer}>
                      {this.state.topUp && (
                        <Animatable.View
                          style={{
                            height: "20%"
                          }}
                          animation={"slideInUp"}
                        >
                          <Animatable.View
                            style={{
                              height: "100%"
                            }}
                            animation={!this.state.amountError ? "" : "shake"}
                            onAnimationEnd={() =>
                              this.setState({ amountError: null })
                            }
                          >
                            <Item
                              floatingLabel
                              style={[
                                styles.input,
                                {
                                  borderColor: this.state.inputA
                                    ? "#7039FF"
                                    : this.state.amountError
                                    ? "red"
                                    : "#D9D9D9"
                                }
                              ]}
                            >
                              <Label
                                style={[
                                  styles.inputtext,
                                  {
                                    bottom: 5,

                                    color: this.state.inputA
                                      ? "#FF9D00"
                                      : "#717171"
                                  }
                                ]}
                              >
                                <Icon
                                  style={{
                                    fontSize: 20,
                                    color: this.state.inputA
                                      ? "#FF9D00"
                                      : "#717171"
                                  }}
                                  name="cash"
                                />
                                {"  "}
                                Amount
                              </Label>
                              <Input
                                keyboardType="number-pad"
                                style={styles.inputtext}
                                value={`${
                                  isNaN(this.state.amount)
                                    ? ""
                                    : this.state.amount
                                }`}
                                onChangeText={amount =>
                                  this.setState({ amount: parseFloat(amount) })
                                }
                                onFocus={() => this.setState({ inputA: true })}
                                onBlur={() =>
                                  this.setState({
                                    inputA: false,
                                    amountError: validateWrapper(
                                      "Budget",
                                      this.state.amount
                                    )
                                  })
                                }
                              />
                            </Item>
                          </Animatable.View>
                        </Animatable.View>
                      )}
                      {this.state.topUp && (
                        <Animatable.View animation={"slideInLeft"}>
                          <LowerButton function={this._handleSubmission} />
                        </Animatable.View>
                      )}
                    </View>
                  </>
                )}
              </KeyboardShift>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet
});

export default connect(
  mapStateToProps,
  null
)(Wallet);
