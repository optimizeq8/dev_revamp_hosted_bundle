import React, { Component } from "react";
import { connect } from "react-redux";
import { View, AsyncStorage, Image, I18nManager } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import isNull from "lodash/isNull";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

import GradientButton from "../../MiniComponents/GradientButton";
import LowerButton from "../../MiniComponents/LowerButton";
import Tutorial from "../Tutorial";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons
import Logo from "../../../assets/SVGs/Optimize";
const imageLogo = require("../../../assets/images/people.png");

//redux
import * as actionCreators from "../../../store/actions";

class SwitchLanguage extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    languageOpened: null,
    language: "en"
  };
  async componentDidMount() {
    const appLanguage = await AsyncStorage.getItem("appLanguage");
    if (appLanguage !== this.state.language) {
      // in case the app language is ARABIC to set the button properly
      this.setState({
        language: appLanguage
      });
    }

    AsyncStorage.getItem("languageOpened")
      .then(value => {
        if (isNull(value)) {
          AsyncStorage.setItem("languageOpened", "false").then(() => {
            this.setState({
              languageOpened: false
            });
          });
        } else if (value === "true") {
          this.props.navigation.replace("Tutorial");
        } else {
          this.setState({
            languageOpened: false
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
  handleLanguageChange = language => {
    this.setState({
      language
    });
  };
  handleSubmitLanguage = async () => {
    const appLanguage = await AsyncStorage.getItem("appLanguage");
    await AsyncStorage.setItem("languageOpened", "true");
    if (appLanguage !== this.state.language) {
      // if app language not same as the state language then set it as the app language and reloading the app
      this.props.getLanguageListPOEdit(this.state.language);
      this.props.navigation.navigate("SwitchLanguageLoading");
    } else {
      // to show  tutorial if app langugage is same as app language
      this.setState({
        languageOpened: true
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    if (isNull(this.state.languageOpened)) {
      return <LoadingScreen dash={true} />;
    } else
      return (
        <SafeAreaView
          style={styles.safeAreaViewContainer}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents
            onDidFocus={() => {
              Segment.screen("Select App Language");
            }}
          />
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
              <Text uppercase style={styles.welcomeText}>
                {translate("Welcome to")}
              </Text>
              <Text uppercase style={styles.optimizeAppText}>
                Optimize App
              </Text>
            </View>
            <Text style={styles.chooseLanguageText}>
              {translate("Choose your language")}
            </Text>
            <View style={styles.buttonGroup}>
              <GradientButton
                transparent={this.state.language !== "en"}
                onPressAction={() => this.handleLanguageChange("en")}
                style={styles.languageButton}
                text={"English"}
                textStyle={[
                  styles.englishText,
                  this.state.language !== "en" && styles.inactiveText
                ]}
              />
              <GradientButton
                transparent={this.state.language !== "ar"}
                onPressAction={() => this.handleLanguageChange("ar")}
                style={styles.languageButton}
                text={"العربية"}
                textStyle={[
                  styles.arabicText,
                  this.state.language !== "ar" && styles.inactiveText
                ]}
              />
            </View>

            <LowerButton
              function={() => this.handleSubmitLanguage()}
              bottom={heightPercentageToDP(-1)}
              isRTL={I18nManager.isRTL}
              style={I18nManager.isRTL && styles.backRTL}
              width={I18nManager.isRTL ? 25 : null}
              height={I18nManager.isRTL ? 25 : null}
            />
          </Container>
        </SafeAreaView>
      );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getLanguageListPOEdit: language =>
    dispatch(actionCreators.getLanguageListPOEdit(language))
});
export default connect(mapStateToProps, mapDispatchToProps)(SwitchLanguage);
