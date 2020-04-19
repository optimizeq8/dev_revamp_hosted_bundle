import React from "react";
import {
  View,
  TouchableOpacity,
  BackHandler,
  Text,
  I18nManager,
  Image
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as Segment from "expo-analytics-segment";

import OnlineStoreHome from "../../../../assets/SVGs/OnlineStoreHome";
import BackIcon from "../../../../assets/SVGs/BackButton";
import ForwardButton from "../../../../assets/SVGs/ArrowForward";
import HandsArrow from "../../../../assets/SVGs/HandsArrow";
import FreeText from "../../../../assets/SVGs/FreeText";
import WhatsApp from "../../../../assets/SVGs/SwipeUps/WhatsApp";

import styles from "./styles";
import { widthPercentageToDP } from "react-native-responsive-screen";
import GradientButton from "../../../MiniComponents/GradientButton";
import { globalColors } from "../../../../GlobalStyles";
const slidesData = [
  {
    id: 0
  },
  {
    id: 1
  },
  {
    id: 2
  }
];
export default class TutorialWeb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inverted: I18nManager.isRTL && Platform.OS === "android",
      activeSlide: 0,
      slidesData:
        I18nManager.isRTL && Platform.OS === "android"
          ? slidesData.reverse()
          : slidesData // To properly show reversed data for RTL and Adnroid setting it in initial state
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    Segment.screen("Website Introduction");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  Slide = ({ item }) => {
    const { translate } = this.props.screenProps;

    let screen = <View></View>;

    const { id } = item;
    if (id === 0)
      screen = (
        <View style={styles.slide1View}>
          <Image
            resizeMode="contain"
            style={styles.ss1}
            source={require("../../../../assets/SVGs/WebsiteTutorial/SS1.png")}
          />

          <View style={styles.handArrowView}>
            <HandsArrow
              width={widthPercentageToDP(10)}
              style={{ alignSelf: "flex-start" }}
            />
            <Text style={styles.maintainText}>
              {translate("NO MAINTENANCE NEEDED")}
            </Text>
            <Text style={styles.syncedText}>
              {translate("Synced with Instagram")}
            </Text>
          </View>
        </View>
      );
    else if (id === 1)
      screen = (
        <View style={styles.slide2View}>
          <View style={styles.freeChargeView}>
            <FreeText />
            <View style={styles.readyWithinTextView}>
              <Text style={styles.freeChargeText}>
                {translate("FREE OF CHARGE")}
              </Text>
              <Text style={styles.readyWithinText}>
                {translate("READY WITHIN MINUTES")}
              </Text>
            </View>
          </View>

          <Image
            resizeMode="contain"
            style={styles.ss2}
            source={require("../../../../assets/SVGs/WebsiteTutorial/SS2.png")}
          />
        </View>
      );
    else if (id === 2)
      screen = (
        <View style={styles.slide3View}>
          <Image
            resizeMode="contain"
            style={styles.ss3}
            source={require("../../../../assets/SVGs/WebsiteTutorial/SS3.png")}
          />
          <View style={styles.customerWhatsappView}>
            <WhatsApp width={50} height={50} fill="#9204FE" />
            <Text style={styles.customerWhatsapp}>
              {translate("Send customers to WhatsApp!")}
            </Text>
          </View>
        </View>
      );

    return (
      <View key={id} style={styles.mainView}>
        {screen}
      </View>
    );
  };
  // To change slide
  navigationRouteHandler = index => {
    this.setState({
      activeSlide: index
    });
  };
  getStartWebsiteReg = () => {
    this.props.navigation.navigate("OptimizeWebsite");
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <View style={styles.headerCardView}>
          <TouchableOpacity onPress={this.handleBackPress}>
            <BackIcon
              stroke={"#FFF"}
              width={25}
              style={[
                I18nManager.isRTL && {
                  transform: [{ rotateY: "180deg" }]
                }
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {translate("WEBSITE REGISTRATION")}
          </Text>
          <GradientButton
            onPressAction={this.getStartWebsiteReg}
            style={styles.getStartedBtn}
            radius={50}
          >
            <View style={styles.getStartView}>
              <Text style={styles.getStartedText}>
                {translate("Get Started!")}
              </Text>
              <ForwardButton
                height={11}
                style={[
                  I18nManager.isRTL && {
                    transform: [{ rotateY: "180deg" }]
                  }
                ]}
              />
            </View>
          </GradientButton>
        </View>
        <View>
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
        </View>
        <OnlineStoreHome
          width={widthPercentageToDP(100)}
          style={styles.onlineStoreHomeIcon}
        />
      </SafeAreaView>
    );
  }
}
