import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Button, Text, Container } from "native-base";
import { LinearGradient } from "expo";
import Verification from "../Signup/Verification";
import Signin from "../Signin/";
import * as Animatable from "react-native-animatable";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
//icons
import Logo from "../../../assets/SVGs/Optimize";
import Background from "../../../assets/SVGs/Background";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import GetInviteCode from "../GetInviteCode";

export default class Invitation extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    registeredWithInvite: null,
    renderInviteCode: true,
    animationActive: false
  };
  componentDidMount() {
    AsyncStorage.getItem("registeredWithInvite")
      .then(value => {
        if (value == null) {
          this.setState({ registeredWithInvite: false });
        } else {
          this.setState({ registeredWithInvite: true });
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
  toggleComps = () => {
    this.setState({
      renderInviteCode: !this.state.renderInviteCode,
      animationActive: true
    });
  };
  render() {
    if (this.state.registeredWithInvite == null) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    } else if (this.state.registeredWithInvite) {
      return <Signin navigation={this.props.navigation} />;
    } else
      return (
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />

          <Animatable.View
            // onAnimationEnd={() => this.setState({ animationActive: true })}
            delay={500}
            animation="fadeInUpBig"
          >
            <Background
              style={styles.background}
              width={widthPercentageToDP(90)}
              height={heightPercentageToDP(65)}
            />
          </Animatable.View>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={[styles.mainCard]}>
              <Logo
                style={styles.logo}
                width={heightPercentageToDP(20)}
                height={heightPercentageToDP(20)}
              />
              <Text style={styles.logotext}>Optimize</Text>

              <Animatable.View
                animation={
                  this.state.animationActive
                    ? this.state.renderInviteCode
                      ? "fadeInLeftBig"
                      : "fadeOutLeftBig"
                    : ""
                }
                style={{
                  position: "absolute",
                  height: "45%",
                  alignSelf: "center",
                  top: "20%"
                }}
              >
                <Verification invite={true} />
              </Animatable.View>

              {this.state.animationActive && (
                <Animatable.View
                  animation={
                    this.state.animationActive
                      ? this.state.renderInviteCode
                        ? "fadeOutRightBig"
                        : "fadeInRightBig"
                      : ""
                  }
                  style={{ height: "45%", bottom: "5%" }}
                >
                  <GetInviteCode toggleComps={this.toggleComps} />
                </Animatable.View>
              )}
              {this.state.renderInviteCode && (
                <Text style={[styles.link]} onPress={() => this.toggleComps()}>
                  Get an invitation code now!
                </Text>
              )}

              <View style={styles.registered}>
                <Text style={[styles.registeredText, { bottom: 5 }]}>
                  Already registered?
                </Text>
                <Button
                  rounded
                  onPress={() => {
                    this.props.navigation.navigate("Signin", {
                      invite: true
                    });
                  }}
                  style={styles.bottomView}
                >
                  <Text
                    style={[
                      styles.buttontext,
                      { color: "#fff", fontFamily: "montserrat-semibold" }
                    ]}
                  >
                    Log In!
                  </Text>
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      );
  }
}
