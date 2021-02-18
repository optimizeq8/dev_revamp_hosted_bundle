import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  BackHandler,
  ScrollView,
  I18nManager,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import analytics from "@segment/analytics-react-native";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { TextInputMask } from "react-native-masked-text";
import { BlurView } from "expo-blur";
import { Item, Input, Label, Container, Icon } from "native-base";
import * as Animatable from "react-native-animatable";

import { Modal } from "react-native-paper";

//icons
import WalletIcon from "../../../assets/SVGs/Wallet";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../store/actions/";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import formatNumber from "../../formatNumber";

//compnents
import CustomHeader from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";
import WalletCard from "../../MiniComponents/WalletTopUpCard";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import { isNaN } from "lodash";

class Wallet extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      placeholder: 0.0,
      topUp: false,
      inputA: false,
      amountError: "",
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.props.wallet === 0 && this.props.getWalletAmount();
    this.props.getWalletTransactionsHistory();
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
    let amountError = validateWrapper("Budget", this.state.amount);
    if (this.state.amount === 0) {
      amountError = true;
    }
    this.setState({ amountError });
    if (!amountError) {
      this.setState(
        {
          modalVisible: false,
        },
        () => {
          this.props.getWalletAmountInKwd(this.state.amount);
          this.props.navigation.navigate("PaymentForm", {
            amount: this.state.amount,
            addingCredits: true,
            source: "open_wallet",
            source_action: "a_top_up_wallet",
          });
        }
      );
    } else {
      analytics.track(`a_top_up_wallet`, {
        source: `open_wallet`,
        source_action: "a_top_up_wallet",
        action_status: "failure",
        error_description: amountError,
      });
    }
  };
  handleModalVisibility = () => {
    this.setState({ modalVisible: !this.state.modalVisible }, () => {
      if (this.state.modalVisible) {
        analytics.track(`add_top_up_wallet`, {
          source: "open_wallet",
          source_action: "a_open_wallet_top_up_modal",
          timestamp: new Date().getTime(),
        });
      }
    });
  };
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_wallet`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    let customValue = this.state.amount
      .toString()
      .split(".")
      .map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
      .join(".");
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <Container
          style={[
            styles.container,
            {
              opacity:
                this.state.modalVisible && Platform.OS === "android" ? 0.05 : 1,
            },
          ]}
        >
          <CustomHeader
            screenProps={this.props.screenProps}
            title={"Wallet"}
            navigation={this.props.navigation}
            segment={{
              source: "open_wallet",
              source_action: "a_go_back",
            }}
          />
          <WalletIcon
            style={styles.walletIcon}
            width={RFValue(30, 414)}
            height={RFValue(30, 414)}
          />
          <ScrollView contentContainerStyle={styles.contentScrollView}>
            <View
              style={{
                flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[globalStyles.numbers, styles.walletAmountText]}>
                {I18nManager.isRTL && <Text style={styles.dollar}>$</Text>}
                {formatNumber(this.props.wallet, true)}
                {!I18nManager.isRTL && <Text style={styles.dollar}>$</Text>}
              </Text>
              {this.props.loading ? (
                <ActivityIndicator
                  color={globalColors.orange}
                  style={[styles.loader]}
                />
              ) : (
                <Icon
                  onPress={this.props.getWalletAmount}
                  style={styles.loader}
                  name="refresh"
                  type="MaterialCommunityIcons"
                />
              )}
            </View>
            <Text style={styles.text}>{translate("Available Balance")}</Text>
            {!this.state.modalVisible && (
              <View>
                <Text style={[styles.mainText]}>
                  {translate(
                    "Your wallet can be used to purchase ads or to resume paused ads immediately"
                  )}
                </Text>
                <GradientButton
                  style={styles.button}
                  onPressAction={this.handleModalVisibility}
                  text={translate("Top up wallet")}
                  textStyle={styles.buttontext}
                  uppercase={true}
                  gradientDirection={"vertical"}
                  orangeDark={true}
                />
                {/* <GradientButton
               
                style={styles.button}
                onPress={() => {
                  // this._handleSubmission();
                }}
              >
                <Text style={styles.buttontext}>Request Refund</Text>
              </GradientButton> */}
              </View>
            )}
            {this.props.walletTransactionListLoading && (
              <ActivityIndicator
                size="large"
                color={globalColors.orange}
                style={styles.listLoader}
              />
            )}
            {!this.props.walletTransactionListLoading &&
              this.props.walletTransactionList &&
              this.props.walletTransactionList.length > 0 && (
                <Text uppercase style={styles.topUpHistory}>
                  {translate("Top-Up History")}
                </Text>
              )}
            {!this.props.walletTransactionListLoading &&
              this.props.walletTransactionList &&
              this.props.walletTransactionList.length > 0 &&
              this.props.walletTransactionList.map((transaction) => {
                return (
                  <WalletCard
                    key={transaction.id}
                    screenProps={this.props.screenProps}
                    transaction={transaction}
                  />
                );
              })}
          </ScrollView>
        </Container>
        <Modal
          animationType={"fade"}
          transparent={Platform.OS === "ios"}
          onDismiss={this.handleModalVisibility}
          visible={this.state.modalVisible}
        >
          <BlurView tint="dark" intensity={95} style={styles.BlurView}>
            <SafeAreaView
              style={[styles.safeAreaContainer]}
              forceInset={{ bottom: "always", top: "always" }}
            >
              <CustomHeader
                screenProps={this.props.screenProps}
                title={"Top up wallet"}
                actionButton={this.handleModalVisibility}
                segment={{
                  source: "add_top_up_wallet",
                  source_action: "a_close_modal",
                }}
              />

              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                <View style={styles.midContainer}>
                  <WalletIcon
                    style={[styles.walletIcon, styles.modalWalletIcon]}
                    width={RFValue(41, 414)}
                    height={RFValue(32.5, 414)}
                  />
                  {/* <Text style={[styles.subHeading]}>
                      {translate(
                        "Please input the amount You’d like to add to your wallet"
                      )}
                    </Text> */}
                  <Animatable.View
                    animation={!this.state.amountError ? "" : "shake"}
                    duration={200}
                    style={styles.inputAnimatableView}
                    onAnimationEnd={() => this.setState({ amountError: null })}
                  >
                    <View style={styles.amountLabelView}>
                      <Text uppercase style={styles.amountLabelText}>
                        {translate("Amount")}
                      </Text>
                    </View>

                    <Item
                      style={[
                        styles.input,
                        globalStyles.transparentBorderColor,
                        // this.state.inputA
                        //   ? globalStyles.purpleBorderColor
                        //   : this.state.amountError
                        //   ? globalStyles.redBorderColor
                        //   : globalStyles.lightGrayBorderColor
                      ]}
                    >
                      <Text style={styles.inputtext}>$</Text>
                      <TextInput
                        placeholderTextColor={globalColors.darkOrange}
                        // includeRawValueInChangeText
                        // type={"money"}
                        keyboardType={"decimal-pad"} // selectTextOnFocus={true}
                        // options={{
                        //   precision: 2,
                        //   separator: ".",
                        //   delimiter: ",",
                        //   unit: "$",
                        // }}
                        focus={this.state.inputA}
                        maxLength={10}
                        value={customValue}
                        onChangeText={(text, rawValue) => {
                          //   let amount = formatNumber(text, false, true);
                          //   amount = parseFloat(amount);
                          if (!isNaN(text))
                            this.setState({
                              amount: text,
                            });
                        }}
                        onFocus={() => this.setState({ inputA: true })}
                        onBlur={() =>
                          this.setState({
                            inputA: false,
                            amountError: validateWrapper(
                              "Budget",
                              this.state.amount
                            ),
                          })
                        }
                        placeholder={"0.00"}
                        style={styles.inputtext}
                      />
                    </Item>
                  </Animatable.View>
                  <GradientButton
                    style={styles.button}
                    onPressAction={this._handleSubmission}
                    text={translate("Top up wallet")}
                    textStyle={styles.buttontext}
                    uppercase={true}
                    gradientDirection={"vertical"}
                  />
                  <GradientButton
                    style={[
                      styles.buttonTransparent,
                      globalStyles.whiteBorderColor,
                    ]}
                    onPressAction={() => this.handleModalVisibility()}
                    text={translate("Cancel")}
                    textStyle={styles.buttontext}
                    uppercase={true}
                    gradientDirection={"vertical"}
                    transparent={true}
                  />
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          </BlurView>
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet,
  loading: state.transA.loading,
  walletTransactionList: state.transA.walletTransactionList,
  walletTransactionListLoading: state.transA.walletTransactionListLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletAmountInKwd: (amount) =>
    dispatch(actionCreators.getWalletAmountInKwd(amount)),
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),
  getWalletTransactionsHistory: () =>
    dispatch(actionCreators.getWalletTransactionsHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
