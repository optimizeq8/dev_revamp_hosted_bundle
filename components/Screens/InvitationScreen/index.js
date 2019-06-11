import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Button, Text, Container, Footer, Content } from "native-base";
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
import { SafeAreaView } from "react-navigation";
//Redux
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import GetInviteCode from "../GetInviteCode";
import KeyboardShift from "../../MiniComponents/KeyboardShift";

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
      animationActive: !this.state.animationActive
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
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#0000" }}
          forceInset={{ bottom: "never" }}
        >
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
                <View>
                  <Logo
                    style={styles.logo}
                    width={heightPercentageToDP(15)}
                    height={heightPercentageToDP(15)}
                  />
                  <Text style={styles.logotext}>Optimize</Text>
                </View>
                <Content
                  scrollEnabled={false}
                  contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%"
                  }}
                >
                  {/* <Animatable.View
                    animation={
                      this.state.animationActive
                        ? this.state.renderInviteCode
                          ? "fadeInLeftBig"
                          : "fadeOutLeftBig"
                        : ""
                    }
                    style={{
                      //   position: "absolute",
                      height: "45%",
                      alignSelf: "center",
                      flex: 1
                      //   top: "10%"
                    }}
                  >
                    {this.state.renderInviteCode && (
                      <Verification
                        invite={true}
                        renderInviteCode={this.state.renderInviteCode}
                        toggleComps={this.toggleComps}
                      />
                    )}
                  </Animatable.View> */}

                  {/* {this.state.animationActive && ( */}
                  <Animatable.View
                    animation={
                      !this.state.animationActive && this.state.renderInviteCode
                        ? "fadeInLeftBig"
                        : "fadeInRightBig"
                    }
                    style={{
                      height: "45%",
                      flex: 1
                      //  bottom: "5%"
                    }}
                  >
                    {!this.state.animationActive &&
                    this.state.renderInviteCode ? (
                      <Verification
                        invite={true}
                        renderInviteCode={this.state.renderInviteCode}
                        toggleComps={this.toggleComps}
                      />
                    ) : (
                      <GetInviteCode toggleComps={this.toggleComps} />
                    )}
                  </Animatable.View>
                  {/* )} */}
                  {/* {this.state.renderInviteCode && (
                    <Text
                      style={[styles.link]}
                      onPress={() => this.toggleComps()}
                    >
                      Get an invitation code now!
                    </Text>
                  )} */}
                </Content>
                <Footer style={styles.registered}>
                  <Text style={[styles.registeredText]}>
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
                </Footer>
              </View>
            </TouchableWithoutFeedback>
          </Container>
        </SafeAreaView>
      );
  }
}
