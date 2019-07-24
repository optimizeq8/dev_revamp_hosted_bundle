//Components
import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { connect } from "react-redux";
import * as Segment from "expo-analytics-segment";
import { Container, Content, Text } from "native-base";

import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../../MiniComponents/Header";
import { Image } from "react-native-expo-image-cache";

//icons
import Circles from "../../../../../assets/SVGs/StoryAdPerview/circles.svg";
import DiscoverBar from "../../../../../assets/SVGs/StoryAdPerview/discoverBar.svg";
// Style
import styles from "./styles";

//Functions

class StoryAdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };
  state = { videoIsLoading: false };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    Segment.screenWithProperties("Ad Preview", {
      category: "Campaign Creation"
    });
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
      sotryAdsArray: this.props.navigation.getParam("storyAdsArray"),
      headline: this.props.navigation.getParam("headline", ""),
      brand_name: this.props.navigation.getParam("brand_name", "")
    });
  };
  render() {
    const cover = this.props.navigation.getParam("cover", "");
    const logo = this.props.navigation.getParam("logo", "");
    const coverHeadline = this.props.navigation.getParam("coverHeadline", "");
    const preview = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    };
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Stroy Ad Design Back Button",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            actionButton={this.props.navigation.goBack}
            title="Compose Ad"
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
                        height: "35%"
                      }}
                    >
                      <DiscoverBar style={{ bottom: 5 }} />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#1A1A1A",
                        borderRadius: 15,
                        height: "70%"
                      }}
                    >
                      <Text style={styles.heading}>Friends</Text>
                      <Circles height="80%" width="100%" />
                    </View>
                  </View>
                  <Text style={styles.heading}>For You</Text>

                  <View style={styles.tilesGrid}>
                    <TouchableOpacity
                      onPress={this.perviewStoryAds}
                      style={styles.tiles}
                    >
                      <Image
                        {...{ preview, uri: cover }}
                        // source={{ uri: cover }}
                        style={styles.cover}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          width: "100%",
                          height: "30%",
                          justifyContent: "flex-start",
                          top: 10
                        }}
                      >
                        <Image
                          {...{ preview, uri: logo }}
                          resizeMode="contain"
                          style={styles.logo}
                          // source={{
                          //   uri: logo
                          // }}
                        />
                      </View>
                      <View
                        style={{
                          // top: "65%",
                          left: 10,
                          position: "absolute",
                          width: "100%",
                          bottom: 0
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "montserrat-bold",
                            color: "#fff",
                            fontSize: 16,
                            width: "90%"
                          }}
                        >
                          {coverHeadline}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "montserrat-regular",
                            color: "#fff",
                            fontSize: 14
                          }}
                        >
                          Sponsored
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

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness
});
export default connect(
  mapStateToProps,
  null
)(StoryAdDesignReview);
