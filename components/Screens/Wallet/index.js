import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  Platform
} from "react-native";
import { LinearGradient, BlurView } from "expo";
import { Button, Text, Item, Input, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import LowerButton from "../../MiniComponents/LowerButton";
import formatNumber from "../../formatNumber";
//icons
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";
import CloseIcon from "../../../assets/SVGs/Close.svg";

// Style
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions/";

import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

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
      amountError: "",
      modalVisible: false
    };
  }

  _handleSubmission = () => {
    const amountError = validateWrapper("Budget", this.state.amount);
    this.setState({ amountError });
    if (!amountError) {
      this.props.getWalletAmountInKwd(this.state.amount);
      this.props.navigation.navigate("PaymentForm", {
        amount: this.state.amount,
        addingCredits: true
      });
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
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={globalStyles.backButton}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Wallet</Text>
        <WalletIcon
          style={{
            alignSelf: "center",
            marginTop: 15
          }}
          width={85}
          height={85}
        />
        <Text style={[globalStyles.numbers, { fontSize: 40 }]}>
          {formatNumber(this.props.wallet, true)}
          <Text style={styles.dollar}>$</Text>
        </Text>

        <Text style={styles.text}>Avalible Balance</Text>

        <View style={styles.mainCard}>
          <Text style={[styles.mainText]}>
            Your wallet can be used to {"\n"}purchase ads or to resume paused{" "}
            {"\n"}ads immedeatly.
          </Text>

          <Button
            full
            style={styles.button}
            onPress={() => {
              this.setState({ modalVisible: true });
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
        </View>

        <Modal
          animationType={"fade"}
          transparent={Platform.OS === "ios"}
          onDismiss={() => this.setState({ modalVisible: false })}
          onRequestClose={() => this.setState({ modalVisible: false })}
          visible={this.state.modalVisible}
        >
          <BlurView tint="dark" intensity={100} style={styles.BlurView}>
            <Button
              transparent
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
              style={styles.btnClose}
            >
              <CloseIcon width={20} height={20} />
            </Button>
            <KeyboardAwareScrollView contentContainerStyle={{ height: "100%" }}>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                <View style={{ flex: 2, justifyContent: "center" }}>
                  <WalletIcon
                    style={{
                      alignSelf: "center",
                      marginBottom: 15
                    }}
                    width={85}
                    height={85}
                  />
                  <Text style={styles.title}>Wallet {"\n"}Top Up</Text>
                  <Text style={[styles.subHeading]}>
                    Please input the amount{"\n"} You’d like to add to your
                    wallet
                  </Text>

                  <Animatable.View
                    animation={!this.state.amountError ? "" : "shake"}
                    style={{ paddingVertical: 30 }}
                    onAnimationEnd={() => this.setState({ amountError: null })}
                  >
                    <Item
                      style={[
                        styles.input,
                        {
                          borderColor: this.state.inputA
                            ? "#7039FF"
                            : this.state.amountError
                            ? "red"
                            : "#D9D9D9",
                          width: 250
                        }
                      ]}
                    >
                      <Label style={[styles.labeltext]}>$</Label>
                      <Input
                        placeholder="0.000"
                        placeholderTextColor="#fff"
                        maxLength={6}
                        keyboardType="number-pad"
                        style={styles.inputtext}
                        value={`${
                          isNaN(this.state.amount) ? "" : this.state.amount
                        }`}
                        onChangeText={amount =>
                          this.setState({
                            amount: parseFloat(amount)
                          })
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
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
            <LowerButton function={this._handleSubmission} />
          </BlurView>
        </Modal>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet
});

const mapDispatchToProps = dispatch => ({
  getWalletAmountInKwd: amount =>
    dispatch(actionCreators.getWalletAmountInKwd(amount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);