import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, View, Text, Dimensions, Animated } from "react-native";
import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "../../MiniComponents/Swiper";
import GradientButton from "../../MiniComponents/GradientButton";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import LowerButton from "../../MiniComponents/LowerButton";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Functions
import isNull from "lodash/isNull";
import { globalColors } from "../../../GlobalStyles";
import segmentEventTrack from "../../segmentEventTrack";

class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    tutorialOpened: null,
    activeSlide: 0,
    slidesData: [
      {
        id: 0,
        heading: "MULTICHANNEL ADVERTISING",
        description:
          "Promote your business and reach your target audience whether they're surfing the web, or Snapchatting their friends"
      },
      {
        id: 1,
        heading: "EASY PUBLISHING",
        description:
          "We make it easy so you can focus on growing your business Let us do the heavy lifting for you"
      },
      {
        id: 2,
        heading: "REPORTS",
        description:
          "Compare Key Performance Indicators from previous campaigns Did the changes result in more clicks?"
      },
      {
        id: 3,
        heading: "NO AGENCIES ALL YOU",
        description:
          "Because campaign creation is automated, you get to cut the hefty agency costs out of the equation"
      }
    ],
    animatedValue: new Animated.Value(0)
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
          this.props.navigation.replace("Signin");
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
    //Listener to avoid buggy animation when next button
    this.state.animatedValue.addListener(({ value }) => {
      // console.log("value", value);
      this.swiperRef.getNode().scrollTo({
        x: value,
        y: 0,
        animated: false
      });
    });
  }

  onSlideChange = e => {
    //Source: https://stackoverflow.com/questions/43370807/react-native-get-current-page-in-flatlist-when-using-pagingenabled
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.abs(Math.floor(contentOffset.x / viewSize.width));
    // console.log("scrolled to page ", pageNum);
    this.setState({
      activeSlide: pageNum,
      changed: pageNum !== this.state.activeSlide
    });
  };
  Slide = ({ key, id, heading, description, component }) => {
    const { translate } = this.props.screenProps;
    const { activeSlide } = this.state;
    let screen = "";
    if (id === activeSlide) {
      Segment.screen(`Tutorial ${activeSlide + 1}`);
    }

    if (id === 0)
      screen = (
        <Screen1
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
          changed={this.state.changed}
        />
      );
    else if (id === 1)
      screen = (
        <Screen2
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
          changed={this.state.changed}
        />
      );
    else if (id === 2)
      screen = (
        <Screen3
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
          changed={this.state.changed}
        />
      );
    else if (id === 3)
      screen = (
        <Screen4
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
          changed={this.state.changed}
        />
      );

    return (
      <View key={key} style={styles.mainView}>
        {screen}
        <View style={styles.blockDescription}>
          <Text style={styles.heading}>{translate(heading)}</Text>
          <Text style={styles.description}>{translate(description)}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { translate } = this.props.screenProps;

    if (isNull(this.state.tutorialOpened)) {
      return <LoadingScreen dash={true} />;
    } else {
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

          <Swiper
            backgroundColor={["#0000", "#0000", "#0000", "#0000"]}
            dots
            dotsColor="rgba(255, 255, 255, 0.25)"
            dotsColorActive={globalColors.orange}
            onSlideChange={this.onSlideChange}
            ref={ref => (this.swiperRef = ref)}
          >
            {this.state.slidesData.map(item =>
              this.Slide({
                key: item.id,
                ...item
              })
            )}
          </Swiper>
          <View style={styles.bottomView}>
            {this.state.activeSlide === 3 ? (
              <GradientButton
                style={[styles.getStartedButton]}
                onPressAction={() => {
                  segmentEventTrack("Button Get Started Clicked");
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
                textStyle={styles.getStartedText}
                text={translate("Get Started!")}
                uppercase
              />
            ) : (
              <>
                <GradientButton
                  transparent
                  text={translate("SKIP")}
                  style={styles.skipButton}
                  onPressAction={() => {
                    segmentEventTrack(
                      `Button SKIP Clicked after screen ${this.state
                        .activeSlide + 1}`
                    );

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
                />
                <LowerButton
                  function={() => {
                    // SOURCE: https://stackoverflow.com/questions/55580525/react-native-scrollview-scrollto-spring-animation
                    // const animatedValue = new Animated.Value(0);

                    Animated.spring(this.state.animatedValue, {
                      toValue:
                        (this.state.activeSlide + 1) *
                        Dimensions.get("window").width
                    }).start(() => {
                      // animatedValue.removeListener(id);
                      /* finished callback */
                    });

                    this.setState({
                      activeSlide: this.state.activeSlide + 1,
                      changed:
                        ((this.state.activeSlide + 1) *
                          Dimensions.get("window").width) /
                          Dimensions.get("window").width !==
                        this.state.activeSlide
                    });
                  }}
                  style={styles.lowerBtn}
                />
              </>
            )}
          </View>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
