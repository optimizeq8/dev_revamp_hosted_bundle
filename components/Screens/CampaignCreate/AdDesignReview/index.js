//Components
import React, { Component } from "react";

import { connect } from "react-redux";
import * as Segment from 'expo-analytics-segment';
import { Video } from 'expo-av';
import * as Animatable from "react-native-animatable";

import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import {
  Container,
  Header,
  Body,
  Right,
  Content,
  Title,
  Subtitle,
  Button,
  Text
} from "native-base";

import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";

//icons
import CloseIcon from "../../../../assets/SVGs/Close";
import ArrowUpIcon from "../../../../assets/SVGs/ArrowUp";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Functions
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import isUndefined from "lodash/isUndefined";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };
  state = { videoIsLoading: false, storyAdIndex: 0 };
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

  collectionComp = i => {
    let collections = this.props.navigation.getParam("collectionAdMedia", []);
    return (
      <View style={styles.collectionPlaceholder}>
        {!isUndefined(collections[i]) && (
          <Image
            style={styles.collectionImage}
            source={{ uri: collections[i].localUri }}
            resizeMode="cover"
          />
        )}
      </View>
    );
  };
  render() {
    let adType = this.props.adType;
    let storyAdsArray = this.props.storyAdsArray.filter(ad => ad.uploaded);

    let storyAds = this.props.navigation.getParam("storyAds", false);
    let destination = !storyAds
      ? this.props.navigation.getParam("destination", "")
      : storyAdsArray[this.state.storyAdIndex].destination;
    let appIcon = this.props.navigation.getParam("icon_media_url", "");
    let brand_name = this.props.navigation.getParam("brand_name", "");
    let headline = this.props.navigation.getParam("headline", "");
    let type = !storyAds
      ? this.props.navigation.getParam("type", "")
      : storyAdsArray[this.state.storyAdIndex].media_type;
    let call_to_action = this.props.navigation.getParam("call_to_action", "");

    let image = !storyAds
      ? this.props.navigation.getParam("image", "")
      : storyAdsArray[this.state.storyAdIndex].image;
    if (storyAds) {
      if (
        storyAdsArray[this.state.storyAdIndex].hasOwnProperty("destination") &&
        storyAdsArray[this.state.storyAdIndex].attachment.hasOwnProperty(
          "icon_media_url"
        )
      ) {
        appIcon =
          storyAdsArray[this.state.storyAdIndex].attachment.icon_media_url;
      }
      if (
        storyAdsArray[this.state.storyAdIndex].hasOwnProperty(
          "call_to_action"
        ) &&
        storyAdsArray[this.state.storyAdIndex].call_to_action !== "BLANK"
      ) {
        call_to_action =
          storyAdsArray[this.state.storyAdIndex].call_to_action.value;
      }
    }

    let collection = (
      <View style={styles.collectionView}>
        {this.collectionComp(0)}
        {this.collectionComp(1)}
        {this.collectionComp(2)}
        {this.collectionComp(3)}
      </View>
    );

    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        <Container style={styles.container}>
          <Header iosBarStyle={"light-content"} style={styles.header}>
            <Body style={styles.headerBody}>
              <Title style={styles.brandName}>{brand_name}</Title>
              <Subtitle numberOfLines={1} style={styles.headline}>
                {headline}
              </Subtitle>
            </Body>
            <Right style={{ flex: 0 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[globalStyles.backButton, styles.closeButton]}
              >
                <CloseIcon />
              </TouchableOpacity>
            </Right>
          </Header>
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={styles.content}
          >
            <Transition shared="image">
              <View style={styles.mainCard}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.state.storyAdIndex + 1 !== storyAdsArray.length
                      ? this.setState({
                          storyAdIndex: this.state.storyAdIndex + 1
                        })
                      : this.setState({ storyAdIndex: 0 })
                  }
                >
                  {type === "VIDEO" ? (
                    <>
                      {this.state.videoIsLoading ? (
                        <LoadingScreen dash={true} />
                      ) : null}
                      <Video
                        onLoadStart={() =>
                          this.setState({ videoIsLoading: true })
                        }
                        onLoad={() => this.setState({ videoIsLoading: false })}
                        source={{
                          uri: image
                        }}
                        isLooping
                        shouldPlay
                        resizeMode="stretch"
                        style={styles.video}
                      />
                    </>
                  ) : (
                    <Image
                      resizeMode="stretch"
                      style={styles.placeholder}
                      source={{
                        uri: image
                      }}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={[
                    styles.callToActionContainer,
                    (destination === "APP_INSTALL" ||
                      adType === "CollectionAd") &&
                      styles.appInstallCallToActionContainer
                  ]}
                >
                  <View
                    style={[
                      styles.callToActionText,
                      (destination === "APP_INSTALL" ||
                        adType === "CollectionAd") &&
                        styles.appInstallCallToActionText,
                      destination !== "APP_INSTALL" &&
                        adType !== "CollectionAd" &&
                        destination !== "BLANK" &&
                        styles.appInstallAndBlankCallToActionContainer
                    ]}
                  >
                    {destination !== "APP_INSTALL" &&
                      adType !== "CollectionAd" &&
                      destination !== "BLANK" && (
                        <View
                          style={[
                            styles.iconArrowUp,
                            { paddingRight: 0, marginBottom: 5 }
                          ]}
                        >
                          <ArrowUpIcon />
                        </View>
                      )}

                    <Text
                      style={[
                        styles.callToActionText,
                        (destination === "APP_INSTALL" ||
                          adType === "CollectionAd") &&
                          styles.appInstallCallToActionText
                      ]}
                    >
                      {call_to_action !== "BLANK"
                        ? startCase(toLower(call_to_action))
                        : ""}
                    </Text>
                  </View>

                  {(destination === "APP_INSTALL" ||
                    adType === "CollectionAd") && (
                    <View
                      style={[
                        styles.iconArrowUp,
                        {
                          paddingRight: destination === "APP_INSTALL" ? 10 : 60
                        }
                      ]}
                    >
                      <ArrowUpIcon />
                    </View>
                  )}
                  <Text style={styles.AD}>Ad</Text>
                </View>

                {adType === "CollectionAd" && (
                  <Animatable.View
                    animation={"fadeInUpBig"}
                    style={[
                      styles.bottomView,
                      globalStyles.transparentBackgroundColor
                    ]}
                  >
                    {collection}
                  </Animatable.View>
                )}
                {destination === "APP_INSTALL" && (
                  <Animatable.View
                    animation={"fadeInUpBig"}
                    style={[
                      styles.bottomView,
                      globalStyles.whiteBackgroundColor
                    ]}
                  >
                    <View style={[globalStyles.lightGrayBorderColor]}>
                      <Image
                        source={{ uri: appIcon }}
                        style={[
                          globalStyles.grayBorderColor,
                          styles.appIconBottom
                        ]}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.textContainerBottom}>
                      <Text
                        numberOfLines={2}
                        style={styles.brandNameBottomText}
                      >
                        {brand_name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          globalStyles.grayTextColor,
                          styles.headlineBottomText
                        ]}
                      >
                        {headline}
                      </Text>
                    </View>
                    <Button
                      style={[
                        styles.getButton,
                        globalStyles.darkGrayBackgroundColor
                      ]}
                    >
                      <Text style={styles.getButtonText}>GET</Text>
                    </Button>
                  </Animatable.View>
                )}
              </View>
            </Transition>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  adType: state.campaignC.adType,
  data: state.campaignC.data,
  storyAdsArray: state.campaignC.storyAdsArray
});
export default connect(
  mapStateToProps,
  null
)(AdDesignReview);
