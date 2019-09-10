import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Platform,
  BackHandler
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import Header from "../../MiniComponents/Header";
import * as Segment from "expo-analytics-segment";
import { BlurView } from "expo-blur";
import { Button, Text, Item, Input, Label, Container, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

//icons
import WalletIcon from "../../../assets/SVGs/Wallet";
import CloseIcon from "../../../assets/SVGs/Close.svg";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";

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
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Wallet", {
              category: "Wallet Top Up"
            });
          }}
        />
        <Container
          style={[
            styles.container,
            {
              opacity:
                this.state.modalVisible && Platform.OS === "android" ? 0.05 : 1
            }
          ]}
        >
          <Header
            title={translate("Wallet")}
            navigation={this.props.navigation}
          />

          <WalletIcon style={styles.walletIcon} width={85} height={85} />
          <Text style={[globalStyles.numbers, styles.walletAmountText]}>
            {formatNumber(this.props.wallet, true)}
            <Text style={styles.dollar}>$</Text>
          </Text>
          <Text style={styles.text}>{translate("Available Balance")}</Text>
          {!this.state.modalVisible && (
            <View style={[styles.mainCard]}>
              <Text style={[styles.mainText]}>
                {translate(
                  "Your wallet can be used to purchase ads or to resume paused ads immediately"
                )}
              </Text>

              <Button
                full
                style={styles.button}
                onPress={this.handleModalVisibility}
              >
                <Text style={styles.buttontext}>
                  {translate("Top up wallet")}{" "}
                </Text>
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
                    <Text style={styles.title}>
                      {translate("Wallet")} {"\n"}
                      {translate("Top Up")}
                    </Text>
                    <Text style={[styles.subHeading]}>
                      {translate(
                        "Please input the amount You’d like to add to your wallet"
                      )}
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
                          this.state.inputA
                            ? globalStyles.purpleBorderColor
                            : this.state.amountError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
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
