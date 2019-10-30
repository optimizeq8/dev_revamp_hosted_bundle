import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, AsyncStorage } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Button, Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "../../MiniComponents/Swiper";
// import Invitation from "../InvitationScreen";
import Signin from "../Signin";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons
import Background from "../../../assets/SVGs/Background";

//Functions
import isNull from "lodash/isNull";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

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
    const { translate } = this.props.screenProps;
    // console.log('trasnslate', translate);

    const Slide = ({ url, i }) => {
      return (
        <>
          <Image
            style={[
              styles.imageSlide,
              { bottom: i === 3 ? heightPercentageToDP("-2%") : 0 }
            ]}
            source={url}
            resizeMode="contain"
          />
          {i === 3 && (
            <Button
              style={[styles.getStartedButton]}
              onPress={() => {
                AsyncStorage.getItem("tutorialOpened")
                  .then(value => {
                    if (value == null) {
                      AsyncStorage.setItem("tutorialOpened", "false");
                    } else {
                      AsyncStorage.setItem("tutorialOpened", "true").then(
                        this.props.navigation.replace("Signin")
                      );
                    }
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Text style={styles.getStartedText}>
                {translate("Get Started!")}
              </Text>
            </Button>
          )}
        </>
      );
    };
    if (isNull(this.state.tutorialOpened)) {
      return (
        <Container style={styles.imageView}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={require("../../../assets/splash.png")}
            resizeMode="cover"
          />
        </Container>
      );
    } else if (this.state.tutorialOpened) {
      return (
        <Signin
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
        />
      );
    } else {
      Segment.screen("Tutorial");
      return (
        <SafeAreaView
          style={styles.safeAreaViewContainer}
          forceInset={{ bottom: "never", top: "always" }}
        >
          {/* <NavigationEvents
            onDidFocus={() => {
              Segment.screen("Tutorial");
            }}
          /> */}
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
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
