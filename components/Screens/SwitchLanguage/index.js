import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { Container } from "native-base";
import analytics from "@segment/analytics-react-native";
import isNull from "lodash/isNull";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

import GradientButton from "../../MiniComponents/GradientButton";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons

import BackButton from "../../../assets/SVGs/BackButton";
import ArrowForward from "../../../assets/SVGs/ArrowForward";
import Logo from "../../../assets/SVGs/Optimize";
const imageLogo = require("../../../assets/images/people.png");

//redux
import * as actionCreators from "../../../store/actions";

import AsyncStorage from "@react-native-community/async-storage";

class SwitchLanguage extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    languageOpened: null,
    language: "en",
  };
  async componentDidMount() {
    const appLanguage = await AsyncStorage.getItem("appLanguage");

    if (appLanguage && appLanguage !== this.state.language) {
      // in case the app language is ARABIC to set the button properly
      this.setState({
        language: appLanguage,
      });
    }
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    const device_id = this.props.screenProps.device_id;
    AsyncStorage.getItem("languageOpened")
      .then(async (value) => {
        if (isNull(value)) {
          AsyncStorage.setItem("languageOpened", "false").then(() => {
            analytics.track("first_app_open", {
              anonymous_userId,
              source: this.props.screenProps.prevAppState,
              // source_action: "", Not sure what will come here
              timestamp: new Date().getTime(),
              device_id,
              // country: "",
            });
            analytics.track("app_language", {
              source: this.props.screenProps.prevAppState,
              device_id,
              selected_language: this.state.language,
              // source_action: "", // Not sure what will come here ??
              timestamp: new Date().getTime(),
              anonymous_userId,
            });
            this.setState({
              languageOpened: false,
            });
          });
        } else if (value === "true") {
          analytics.track("a_app_language_select", {
            source: "app_language",
            source_action: "a_app_language_select",
            selected_language: this.state.language,
            timestamp: new Date().getTime(),
            anonymous_userId,
            device_id,
            // county: "",
            // locations: //,
          });
          this.props.navigation.replace("Tutorial", {
            source: "app_lanaguage",
            source_action: "a_app_language_select",
          });
        } else {
          analytics.track("app_language", {
            source: this.props.screenProps.prevAppState,
            device_id,
            selected_language: this.state.language,
            // source_action: "", // Not sure what will come here ??
            timestamp: new Date().getTime(),
            anonymous_userId,
          });
          this.setState({
            languageOpened: false,
          });
        }
      })
      .catch((err) => {
        showMessage({
          message: "Something went wrong!",
          type: "warning",
          position: "top",
          description: "Please try again later.",
        });
        //  console.log(err)
      });
  }
  handleLanguageChange = (language) => {
    analytics.track(`a_change_language`, {
      source: `app_language`,
      selected_language: language,
      source_action: `a_change_language`,
      anonymous_userId: this.props.screenProps.anonymous_userId,
      device_id: this.props.screenProps.device_id,
    });
    this.setState({
      language,
    });
  };
  handleSubmitLanguage = async () => {
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    const device_id = this.props.screenProps.device_id;
    const appLanguage = await AsyncStorage.getItem("appLanguage");
    await AsyncStorage.setItem("languageOpened", "true");
    if (appLanguage !== this.state.language) {
      // if app language not same as the state language then set it as the app language and reloading the app
      this.props.navigation.navigate("SwitchLanguageLoading", {
        source: "app_language",
        source_action: "a_app_language_select",
      });
    } else {
      // to show  tutorial if app langugage is same as app language
      analytics.track("a_app_language_select", {
        source: "app_language",
        source_action: "a_app_language_select",
        selected_language: this.state.language,
        timestamp: new Date().getTime(),
        anonymous_userId,
        device_id,
        // county: "",
        // locations: //,
      });
      this.props.navigation.replace("Tutorial", {
        source: "app_language",
        source_action: "a_app_language_select",
      });
    }
  };

  render() {
    const { language } = this.state;
    if (isNull(this.state.languageOpened)) {
      return <LoadingScreen dash={true} />;
    } else
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
          <Container style={styles.container}>
            <View style={styles.logoContainer}>
              <Logo
                style={styles.logo}
                width={heightPercentageToDP(12)}
                height={heightPercentageToDP(12)}
              />
              <Text style={styles.logoText}>Optimize</Text>
            </View>
            <View style={styles.imageView}>
              <Image
                style={styles.media}
                source={imageLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.welcomeView}>
              <Text
                uppercase
                style={[
                  styles.welcomeText,
                  {
                    fontFamily:
                      language === "ar"
                        ? "changa-bold-arabic"
                        : "montserrat-bold-english",
                  },
                ]}
              >
                {language === "ar" ? "مرحبا بك في" : "Welcome to"}
              </Text>
              <Text uppercase style={styles.optimizeAppText}>
                Optimize App
              </Text>
            </View>
            <Text
              style={[
                styles.chooseLanguageText,
                {
                  fontFamily:
                    language === "ar"
                      ? "montserrat-regular-arabic"
                      : "montserrat-regular-english",
                },
              ]}
            >
              {/* {translate("Choose your language")} */}
              {language === "ar"
                ? "الرجاء اختيار اللغة"
                : "Choose your language"}
            </Text>
            <View style={[styles.buttonGroup]}>
              <GradientButton
                transparent={this.state.language !== "en"}
                onPressAction={() => this.handleLanguageChange("en")}
                style={styles.languageButton}
                text={"English"}
                textStyle={[
                  styles.englishText,
                  this.state.language !== "en" && styles.inactiveText,
                ]}
              />
              <GradientButton
                transparent={this.state.language !== "ar"}
                onPressAction={() => this.handleLanguageChange("ar")}
                style={styles.languageButton}
                text={"العربية"}
                textStyle={[
                  styles.arabicText,
                  this.state.language !== "ar" && styles.inactiveText,
                ]}
              />
            </View>
          </Container>
          {/* Using Gradient button instead of LowerButton component because the RTL condition uses checks the device RTL */}
          <GradientButton
            onPressAction={this.handleSubmitLanguage}
            radius={60}
            style={styles.bottomButton}
          >
            {language === "ar" ? (
              <BackButton stroke={"#FFF"} width={10} height={20} />
            ) : (
              <ArrowForward width={10} height={20} />
            )}
          </GradientButton>
        </SafeAreaView>
      );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getLanguageListPOEdit: (language) =>
    dispatch(actionCreators.getLanguageListPOEdit(language)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SwitchLanguage);
