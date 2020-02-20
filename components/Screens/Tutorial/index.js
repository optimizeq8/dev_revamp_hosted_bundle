import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, View, Text, Platform, I18nManager } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
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
const slidesData = [
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
];
class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    tutorialOpened: null,
    inverted: I18nManager.isRTL && Platform.OS === "android",
    activeSlide: 0,
    slidesData:
      I18nManager.isRTL && Platform.OS === "android"
        ? slidesData.reverse()
        : slidesData // To properly show reversed data for RTL and Adnroid setting it in initial state
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
  }

  Slide = ({ item }) => {
    const { translate } = this.props.screenProps;
    const { activeSlide } = this.state;
    let screen = "";

    const { id, heading, description } = item;
    if (id === 0)
      screen = (
        <Screen1
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={activeSlide}
        />
      );
    else if (id === 1)
      screen = (
        <Screen2
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
        />
      );
    else if (id === 2)
      screen = (
        <Screen3
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
        />
      );
    else if (id === 3)
      screen = (
        <Screen4
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          id={id}
          activeSlide={this.state.activeSlide}
        />
      );

    return (
      <View key={id} style={styles.mainView}>
        {screen}
        <View style={styles.blockDescription}>
          <Text style={styles.heading}>{translate(heading)}</Text>
          <Text style={styles.description}>{translate(description)}</Text>
        </View>
      </View>
    );
  };
  // To change slide
  navigationRouteHandler = index => {
    this.setState({
      activeSlide: index
    });
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
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={styles.gradient}
          />

          <Carousel
            firstItem={0}
            ref={c => {
              this._carousel = c;
            }}
            onSnapToItem={indx => this.navigationRouteHandler(indx)}
            data={this.state.slidesData}
            renderItem={this.Slide}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={widthPercentageToDP(100)}
            inverted={this.state.inverted}
          />
          {this.state.activeSlide !== 3 && (
            <Pagination
              containerStyle={styles.paginationContainerStyle}
              dotsLength={this.state.slidesData.length}
              activeDotIndex={this.state.activeSlide}
              dotStyle={styles.paginationDotStyle}
              dotColor={globalColors.orange}
              inactiveDotColor={"rgba(255, 255, 255, 0.2)"}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            />
          )}
          <View
            style={[
              styles.bottomView,
              this.state.activeSlide === 3 && {
                justifyContent: "center"
              }
            ]}
          >
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
                    this._carousel.snapToNext(true);
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
