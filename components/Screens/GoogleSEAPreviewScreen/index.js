//Components
import React, { Component } from "react";
import { View, BackHandler, Image } from "react-native";
import { Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import CustomHeader from "../../MiniComponents/Header";
import GoogleSEAPreview from "../../MiniComponents/GoogleSEAPreview";
// Style
import styles from "./styles";
//Redux
import { connect } from "react-redux";
import { Transition } from "react-navigation-fluid-transitions";

class GoogleSEAPreviewScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    let campaign = this.props.navigation.getParam("campaign", {});
    let language = this.props.navigation.getParam("language", {});

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Google SE Design AD Review", {
              category: "Campaign Creation",
              channel: "google",
            });
          }}
        />
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Google SE Design Preview Back Button",
              obj: { businessname: this.props.mainBusiness.businessname },
              source: "ad_preview",
              source_action: "a_go_back",
            }}
            navigation={this.props.navigation}
            title={"Search Engine Ad Preview"}
            screenProps={this.props.screenProps}
          />

          <View style={styles.mainContent}>
            <Transition appear="bottom" zIndex={1}>
              <Image
                resizeMode="contain"
                animation="slideInUp"
                style={styles.phoneImage}
                source={require("../../../assets/images/GooglePhoneBG.png")}
              />
            </Transition>
            <View style={styles.container1}>
              <View style={styles.searchResult}>
                <Transition appear="scale" zIndex={2}>
                  <View style={styles.searchBar}>
                    <Image
                      width={322}
                      height={43}
                      resizeMode="contain"
                      style={styles.searchImage}
                      source={require("../../../assets/images/GoogleSearchBar.png")}
                    />
                  </View>
                </Transition>
                <Transition shared="preview" zIndex={3}>
                  <GoogleSEAPreview
                    details={false}
                    showEmpty={true}
                    screenProps={this.props.screenProps}
                    headline1={campaign.headline1}
                    headline2={campaign.headline2}
                    headline3={campaign.headline3}
                    finalurl={campaign.finalurl}
                    path1={campaign.path1}
                    path2={campaign.path2}
                    description={campaign.description}
                    description2={campaign.description2}
                    language={language}
                  />
                </Transition>
              </View>
            </View>
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
});

export default connect(mapStateToProps)(GoogleSEAPreviewScreen);
