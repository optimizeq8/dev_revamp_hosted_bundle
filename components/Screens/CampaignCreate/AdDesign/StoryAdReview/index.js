//Components
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  BackHandler,
  Image as RNImage,
  Platform,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { Container, Content } from "native-base";

import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../../MiniComponents/Header";
import { Image } from "react-native-expo-image-cache";

//icons
import Circles from "../../../../../assets/SVGs/StoryAdPerview/circles";
import DiscoverBar from "../../../../../assets/SVGs/StoryAdPerview/discoverBar";
// Style
import styles from "./styles";
import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../../GradiantColors/colors";
import globalStyles from "../../../../../GlobalStyles";

//Functions

class StoryAdDesignReview extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { videoIsLoading: false };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  perviewStoryAds = () => {
    this.props.navigation.push("AdDesignReview", {
      storyAds: true,
      campaignDetails: this.props.navigation.getParam("campaignDetails", false),
      storyAdsArray: this.props.navigation.getParam("storyAdsArray", {}),
      headline: this.props.navigation.getParam("headline", ""),
      brand_name: this.props.navigation.getParam("brand_name", ""),
      adDesign: this.props.navigation.getParam("adDesign", false),
      adType: this.props.navigation.getParam("adType", false),
      destination: this.props.navigation.getParam("destination", false),
      call_to_action: this.props.navigation.getParam("call_to_action", false),
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    let cover = this.props.navigation.getParam("cover", "");
    cover = cover;
    let logo = this.props.navigation.getParam("logo", "");
    logo = logo;

    let coverHeadline = this.props.navigation.getParam("coverHeadline", "");
    let preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    };
    let campaignDetails = this.props.navigation.getParam(
      "campaignDetails",
      false
    );

    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <Container style={styles.container}>
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Stroy Ad Design Back Button",
              obj: { businessname: this.props.mainBusiness.businessname },
              source: campaignDetails ? "ad_cover" : "ad_design",
              source_action: "a_go_back",
            }}
            actionButton={this.props.navigation.goBack}
            title={campaignDetails ? "Cover Review" : "Compose Ad"}
          />
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={styles.content}
          >
            <Transition shared="image">
              <View style={styles.mainCard}>
                <View style={styles.discoverArea}>
                  <View style={styles.friendsArea}>
                    <View
                      style={{
                        backgroundColor: "#9E4CDD",
                        height: "35%",
                      }}
                    >
                      <DiscoverBar style={{ bottom: 5 }} />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#1A1A1A",
                        borderRadius: 15,
                        height: "70%",
                      }}
                    >
                      <Text style={styles.heading}>{translate("Friends")}</Text>
                      <Circles height="80%" width="100%" />
                    </View>
                  </View>
                  <Text style={styles.heading}>{translate("For You")}</Text>

                  <View style={styles.tilesGrid}>
                    <TouchableOpacity
                      onPress={this.perviewStoryAds}
                      style={styles.tiles}
                    >
                      <RNImageOrCacheImage
                        media={cover}
                        style={styles.cover}
                        resizeMode="contain"
                      />
                      <View style={styles.logoStyle}>
                        <RNImageOrCacheImage
                          media={logo}
                          resizeMode="contain"
                          style={styles.logo}
                        />
                      </View>
                      <View style={styles.headlineStyle}>
                        <Text style={styles.headlineTextStyle}>
                          {coverHeadline}
                        </Text>
                        <Text style={styles.sponsoredText}>
                          {translate("Sponsored")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.tiles} />
                  </View>

                  <View style={styles.tilesGrid}>
                    <View style={styles.tiles} />
                    <View style={styles.tiles} />
                  </View>
                </View>
              </View>
            </Transition>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});
export default connect(mapStateToProps, null)(StoryAdDesignReview);
