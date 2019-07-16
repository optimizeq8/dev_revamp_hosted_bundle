//Components
import React, { Component } from "react";
import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import { connect } from "react-redux";
import * as Segment from 'expo-analytics-segment';
import { Container, Content, Text } from "native-base";

import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../../MiniComponents/Header";

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
      headline: this.props.navigation.getParam("headline", ""),
      brand_name: this.props.navigation.getParam("brand_name", "")
    });
  };
  render() {
    const cover = this.props.navigation.getParam("cover", "");
    const logo = this.props.navigation.getParam("logo", "");
    const coverHeadline = this.props.navigation.getParam("coverHeadline", "");

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
                        source={{ uri: cover }}
                        style={styles.cover}
                        resizeMode="cover"
                      />

                      <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={{
                          uri: logo
                        }}
                      />
                      <View style={{ top: "80%", left: 10 }}>
                        <Text
                          style={{
                            fontFamily: "montserrat-semibold",
                            color: "#fff",
                            fontSize: 20
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
                          SPONSORED
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
