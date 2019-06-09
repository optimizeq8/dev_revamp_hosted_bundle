import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  Platform,
  BackHandler
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Header from "../../MiniComponents/Header";
import { LinearGradient, BlurView } from "expo";
import { Button, Text, Item, Input, Label, Container, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import BackButton from "../../MiniComponents/BackButton";
import formatNumber from "../../formatNumber";
//icons
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import WalletIcon from "../../../assets/SVGs/Wallet";
import CloseIcon from "../../../assets/SVGs/Close.svg";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions/";

import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
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

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#0000" }}
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
          {/* <View
            style={{
              justifyContent: "space-between",
              zIndex: 13,
              paddingHorizontal: wp(5),
              paddingTop: hp(1),
              flexDirection: "row",
              backgroundColor: "#0000"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                flex: 0
              }}
            >
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                {
                  flex: 1,
                  alignSelf: "center",
                  alignItems: "center"
                }
              ]}
            >
              Wallet
            </Text>

            <View
              style={{
                flex: 0,
                width: 24
              }}
            />
          </View> */}

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
          {!this.state.modalVisible && (
            <View style={[styles.mainCard]}>
              <Text style={[styles.mainText]}>
                Your wallet can be used to {"\n"}purchase ads or to resume
                paused {"\n"}ads immedeatly.
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
              <KeyboardAwareScrollView
                contentContainerStyle={{ height: "100%" }}
              >
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
                            // width: 250
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
                          style={{
                            position: "relative",
                            left: "20%"
                          }}
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

              {/* <LowerButton function={this._handleSubmission} /> */}
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
