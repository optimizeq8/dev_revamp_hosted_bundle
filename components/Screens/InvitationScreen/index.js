import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  TouchableOpacity
} from "react-native";
import { Button, Text, Container, Footer, Content } from "native-base";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

import GetInviteCode from "../GetInviteCode";
import Verification from "../Signup/Verification";
import Signin from "../Signin/";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

// Icons
import Logo from "../../../assets/SVGs/Optimize";
import Background from "../../../assets/SVGs/Background";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";

export default class Invitation extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      registeredWithInvite: null,
      renderInviteCode: true,
      animationActive: false,
      firstAnimation: true
    };
    this.animation = new Animated.Value(1);

    this.movePannel = this.movePannel.bind(this);
  }

  componentDidMount() {
    // Segment.screen("Invitation Code Request");

    AsyncStorage.getItem("registeredWithInvite")
      .then(value => {
        if (value == null) {
          this.setState({
            registeredWithInvite: false
          });
        } else {
          this.setState({
            registeredWithInvite: true
          });
        }
      })
      .catch(err => {
        showMessage({
          message: "Something went wrong!",
          type: "warning",
          position: "top",
          description: "Please try again later."
        });
        //  console.log(err)
      });
  }

  movePannel(val) {
    Animated.timing(this.animation, {
      toValue: val,
      Duration: 500
    }).start();
  }

  toggleComps = () => {
    this.setState(
      {
        renderInviteCode: !this.state.renderInviteCode,
        animationActive: !this.state.animationActive
      },
      () => {
        if (this.state.renderInviteCode) this.movePannel(1);
        else this.movePannel(0);
      }
    );
  };
  render() {
    // console.log('invite screen', this.props.screenProps);

    const { translate } = this.props.screenProps;
    const interpolation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [widthPercentageToDP(-100), widthPercentageToDP(100)]
    });

    if (this.state.registeredWithInvite == null) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    } else if (this.state.registeredWithInvite) {
      return (
        <Signin
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
    } else
      return (
        <SafeAreaView
          style={styles.safeAreaViewContainer}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents
            onDidFocus={() => {
              Segment.screenWithProperties("Invitation Code Request", {
                category: "Pre Registration"
              });
            }}
          />
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={styles.gradient}
          />
          <Container style={styles.container}>
            <Animatable.View
              // onAnimationEnd={() => this.setState({ animationActive: true })}
              delay={500}
              animation="fadeInUpBig"
            >
              <Background
                style={globalStyles.background}
                width={widthPercentageToDP(90)}
                height={heightPercentageToDP(65)}
              />
            </Animatable.View>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={[styles.mainCard]}>
                <View style={styles.logoView}>
                  <Logo
                    style={styles.logo}
                    width={heightPercentageToDP(12)}
                    height={heightPercentageToDP(12)}
                  />
                  <Text style={styles.logoText}>Optimize</Text>
                </View>
                <Content
                  scrollEnabled={false}
                  contentContainerStyle={styles.contentContainerView}
                >
                  <Animated.View
                    style={[
                      {
                        left:
                          !this.state.animationActive &&
                          this.state.renderInviteCode
                            ? interpolation
                            : interpolation
                      },
                      styles.slidingContainer
                    ]}
                  >
                    <Animatable.View
                      animation={
                        !this.state.animationActive &&
                        this.state.renderInviteCode
                          ? "slideInLeft"
                          : "slideOutLeft"
                      }
                      style={styles.verificationView}
                    >
                      <Verification
                        screenProps={this.props.screenProps}
                        invite={true}
                        renderInviteCode={this.state.renderInviteCode}
                        toggleComps={this.toggleComps}
                      />
                    </Animatable.View>

                    <Animatable.View
                      animation={
                        this.state.animationActive &&
                        !this.state.renderInviteCode
                          ? "slideInRight"
                          : "slideOutRight"
                      }
                      style={styles.getInviteCodeView}
                    >
                      <GetInviteCode
                        toggleComps={this.toggleComps}
                        screenProps={this.props.screenProps}
                      />
                    </Animatable.View>
                  </Animated.View>
                </Content>
                <Footer style={styles.registered}>
                  <Text style={[styles.registeredText]}>
                    {translate("Already registered?")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Signin", {
                        invite: true
                      });
                    }}
                  >
                    <Text style={styles.loginText}>{translate("Log In!")}</Text>
                  </TouchableOpacity>
                  {/* <Button
                    rounded
                    onPress={() => {
                      this.props.navigation.navigate("Signin", {
                        invite: true
                      });
                    }}
                    style={styles.bottomView}
                  >
                    <Text style={[styles.buttontext, styles.logInButtonText]}>
                      {translate("Log In!")}
                    </Text>
                  </Button> */}
                </Footer>
              </View>
            </TouchableWithoutFeedback>
          </Container>
        </SafeAreaView>
      );
  }
}
