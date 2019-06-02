import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView, AsyncStorage } from "react-native";
import { SafeAreaView } from "react-navigation";

import { Button, Text, Container } from "native-base";
import { LinearGradient } from "expo";
import Swiper from "../../MiniComponents/Swiper";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import Invitation from "../InvitationScreen";
// Style
import styles from "./styles";
import isNull from "lodash/isNull";
import Background from "../../../assets/SVGs/Background";
import { colors } from "../../GradiantColors/colors";

class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    tutorialOpened: null
  };
  componentDidMount() {
    AsyncStorage.getItem("tutorialOpened")
      .then(value => {
        if (isNull(value)) {
          AsyncStorage.setItem("tutorialOpened", "false").then(() => {
            this.setState({
              tutorialOpened: false
            });
          });
        } else if (value === "true") {
          this.setState({
            tutorialOpened: true
          });
        } else {
          this.setState({
            tutorialOpened: false
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

  render() {
    const Slide = ({ url, i }) => {
      return (
        <>
          <Image
            style={{
              height: heightPercentageToDP(100),

              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              bottom: i === 3 ? heightPercentageToDP("-2%") : 0
            }}
            source={url}
            resizeMode="contain"
          />
          {i === 3 && (
            <Button
              style={{
                alignSelf: "flex-end",
                // marginRight: widthPercentageToDP("7%"),
                bottom: heightPercentageToDP("7.5%"),
                alignSelf: "center",
                zIndex: 80,
                elevation: 3,
                backgroundColor: "#FF9D00",
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(7),
                borderRadius: 15,
                justifyContent: "center"
              }}
              onPress={() => {
                AsyncStorage.getItem("tutorialOpened")
                  .then(value => {
                    if (value == null) {
                      AsyncStorage.setItem("tutorialOpened", "false");
                    } else {
                      AsyncStorage.setItem("tutorialOpened", "true").then(
                        this.props.navigation.replace("Invitation")
                      );
                    }
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "montserrat-bold",
                  fontSize: 20,
                  textAlign: "center"
                }}
              >
                Get Started!
              </Text>
            </Button>
          )}
        </>
      );
    };
    if (isNull(this.state.tutorialOpened)) {
      return (
        <Container style={{ backgroundColor: "#fff" }}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={require("../../../assets/splash.png")}
            resizeMode="cover"
          />
        </Container>
      );
    } else if (this.state.tutorialOpened) {
      return <Invitation navigation={this.props.navigation} />;
    } else {
      return (
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#0000" }}
          forceInset={{ bottom: "never" }}
        >
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <Container style={styles.container}>
            <Background
              style={[styles.background]}
              width={widthPercentageToDP(85)}
              height={heightPercentageToDP(61)}
            />
            <Swiper
              backgroundColor={["#0000", "#0000", "#0000", "#0000"]}
              dots
              dotsColor="rgba(255, 255, 255, 0.25)"
              dotsColorActive="rgba(255, 255, 255, 1)"
            >
              <Slide
                url={require("../../../assets/images/tutorial/tutorial-1.png")}
                i={1}
              />
              <Slide
                url={require("../../../assets/images/tutorial/tutorial-2.png")}
                i={2}
              />
              <Slide
                url={require("../../../assets/images/tutorial/tutorial-3.png")}
                i={3}
              />
              {/* <Slide
                url={require("../../../assets/images/tutorial/tutorial-4.png")}
                i={4}
              /> */}
            </Swiper>
          </Container>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
