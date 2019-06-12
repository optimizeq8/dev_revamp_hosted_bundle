import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Platform,
  BackHandler
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Header from "../../MiniComponents/Header";
import { BlurView } from "expo";
import { Button, Text, Item, Input, Label, Container, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

//icons
import WalletIcon from "../../../assets/SVGs/Wallet";
import CloseIcon from "../../../assets/SVGs/Close.svg";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../Global Styles";

//Redux
import * as actionCreators from "../../../store/actions/";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import formatNumber from "../../formatNumber";

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
  componentDidMount() {
    this.props.getWalletAmount();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _handleSubmission = () => {
    const amountError = validateWrapper("Budget", this.state.amount);
    this.setState({ amountError });
    if (!amountError) {
      this.setState(
        {
          modalVisible: false
        },
        () => {
          this.props.getWalletAmountInKwd(this.state.amount);
          this.props.navigation.navigate("PaymentForm", {
            amount: this.state.amount,
            addingCredits: true
          });
        }
      );
    }
  };
  handleModalVisibility = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ bottom: "never" }}
      >
        <Container
          style={[
            styles.container,
            {
              opacity:
                this.state.modalVisible && Platform.OS === "android" ? 0.05 : 1
            }
          ]}
        >
          <Header title={"Wallet"} navigation={this.props.navigation} />

          <WalletIcon style={styles.walletIcon} width={85} height={85} />
          <Text style={[globalStyles.numbers, styles.walletAmountText]}>
            {formatNumber(this.props.wallet, true)}
            <Text style={styles.dollar}>$</Text>
          </Text>
          <Text style={styles.text}>Avalible Balance</Text>
          {!this.state.modalVisible && (
            <View style={[styles.mainCard]}>
              <Text style={[styles.mainText]}>
                Your wallet can be used to {"\n"}purchase ads or to resume
                paused {"\n"}ads immedeatly.
              </Text>

              <Button
                full
                style={styles.button}
                onPress={this.handleModalVisibility}
              >
                <Text style={styles.buttontext}>Top up wallet </Text>
              </Button>
              {/* <Button
                full
                style={styles.button}
                onPress={() => {
                  // this._handleSubmission();
                }}
              >
                <Text style={styles.buttontext}>Request Refund</Text>
              </Button> */}
            </View>
          )}
          <Modal
            animationType={"fade"}
            transparent
            onRequestClose={this.handleModalVisibility}
            visible={this.state.modalVisible}
          >
            <BlurView tint="dark" intensity={100} style={styles.BlurView}>
              <Button transparent onPress={this.handleModalVisibility}>
                <CloseIcon width={20} height={20} />
              </Button>
              <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardContainer}
              >
                <TouchableWithoutFeedback
                  onPress={Keyboard.dismiss}
                  accessible={false}
                >
                  <View style={styles.midContainer}>
                    <WalletIcon
                      style={styles.walletIcon}
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
                      style={styles.inputAnimatableView}
                      onAnimationEnd={() =>
                        this.setState({ amountError: null })
                      }
                    >
                      <Item
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
                        <Label style={[styles.labeltext]}>$</Label>
                        <Input
                          placeholder="0.00"
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
                        <Button
                          transparent
                          style={styles.sendButton}
                          onPress={() => this._handleSubmission()}
                        >
                          <Icon
                            type="MaterialIcons"
                            name="send"
                            style={{
                              color: globalColors.orange
                            }}
                          />
                        </Button>
                      </Item>
                    </Animatable.View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAwareScrollView>
            </BlurView>
          </Modal>
        </Container>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet
});

const mapDispatchToProps = dispatch => ({
  getWalletAmountInKwd: amount =>
    dispatch(actionCreators.getWalletAmountInKwd(amount)),
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
