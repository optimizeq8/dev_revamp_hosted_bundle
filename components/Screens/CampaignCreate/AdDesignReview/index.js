//Components
import React, { Component } from "react";

import { connect } from "react-redux";
import { Video } from "expo-av";
import * as Animatable from "react-native-animatable";

import {
  View,
  TouchableOpacity,
  BackHandler,
  Platform,
  Image as RNImage,
  Text,
} from "react-native";
import {
  Container,
  Header,
  Body,
  Right,
  Content,
  Title,
  Subtitle,
} from "native-base";
import { Image } from "react-native-expo-image-cache";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import { Transition } from "react-navigation-fluid-transitions";
import SafeAreaView from "react-native-safe-area-view";

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
import upperCase from "lodash/upperCase";
import { heightPercentageToDP } from "react-native-responsive-screen";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};
class AdDesignReview extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { videoIsLoading: false, storyAdIndex: 0 };
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

  collectionComp = (col) => (
    <View style={styles.collectionPlaceholder}>
      {!isUndefined(col) && (
        <RNImageOrCacheImage
          media={col.localUri || col.media}
          style={styles.collectionImage}
        />
      )}
    </View>
  );

  render() {
    let adType =
      this.props.navigation.getParam("adType", false) || this.props.adType;
    let campaignDetails = this.props.navigation.getParam(
      "campaignDetails",
      false
    );
    let adDesign = this.props.navigation.getParam("adDesign", false);
    let storyAdsArray =
      campaignDetails && !adDesign
        ? this.props.navigation.getParam("storyAdsArray", [])
        : this.props.storyAdsArray.filter((ad) => ad.media !== "//");

    let storyAds = this.props.navigation.getParam("storyAds", false);
    let destination = !storyAds
      ? this.props.navigation.getParam("destination", "")
      : this.props.storyAdAttachment.destination;
    let appIcon = this.props.navigation.getParam("icon_media_url", "");
    let brand_name = this.props.navigation.getParam("brand_name", "");
    let headline = this.props.navigation.getParam("headline", "");
    let type = !storyAds
      ? this.props.navigation.getParam("type", "")
      : storyAdsArray[this.state.storyAdIndex].media_type;
    let call_to_action = this.props.navigation.getParam("call_to_action", "");

    let media = !storyAds
      ? this.props.navigation.getParam("media", "")
      : storyAdsArray[this.state.storyAdIndex]["media"];

    if (storyAds && !campaignDetails) {
      if (
        (this.props.storyAdAttachment.hasOwnProperty("destination") &&
          this.props.storyAdAttachment.attachment.hasOwnProperty(
            "icon_media_url"
          )) ||
        (this.props.storyAdAttachment.attachment !== "BLANK" &&
        typeof this.props.storyAdAttachment.attachment === "string"
          ? JSON.parse(this.props.storyAdAttachment.attachment).hasOwnProperty(
              "icon_media_url"
            )
          : this.props.storyAdAttachment.attachment.hasOwnProperty(
              "icon_media_url"
            ))
      ) {
        appIcon = campaignDetails
          ? JSON.parse(storyAdsArray[this.state.storyAdIndex].attachment)
              .icon_media_url
          : this.props.storyAdAttachment.attachment.icon_media_url;
        //storyAdsArray[this.state.storyAdIndex].attachment.icon_media_url;
      }
      if (
        this.props.storyAdAttachment.hasOwnProperty("call_to_action") &&
        this.props.storyAdAttachment.call_to_action !== "BLANK"
      ) {
        call_to_action = this.props.storyAdAttachment.call_to_action.value
          ? this.props.storyAdAttachment.call_to_action.value
          : this.props.storyAdAttachment.call_to_action;
      }
    }

    let collection = [];
    if (this.props.navigation.getParam("collectionAdMedia", []))
      collection = this.props.navigation
        .getParam("collectionAdMedia", [])
        .map((col) => this.collectionComp(col));

    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        <Container style={styles.container}>
          <Header
            screenProps={this.props.screenProps}
            iosBarStyle={"light-content"}
            style={styles.header}
          >
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
                    storyAdsArray &&
                    this.state.storyAdIndex + 1 !== storyAdsArray.length
                      ? this.setState({
                          storyAdIndex: this.state.storyAdIndex + 1,
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
                          uri: media,
                        }}
                        isLooping={true}
                        shouldPlay={true}
                        resizeMode="stretch"
                        style={styles.video}
                      />
                    </>
                  ) : (
                    <RNImageOrCacheImage
                      media={media}
                      style={styles.placeholder}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={[
                    styles.callToActionContainer,
                    (destination === "APP_INSTALL" ||
                      adType === "CollectionAd") &&
                      styles.appInstallCallToActionContainer,
                  ]}
                >
                  {call_to_action !== "BLANK" && (
                    <View
                      style={[
                        styles.callActionView,
                        (destination === "APP_INSTALL" ||
                          adType === "CollectionAd") &&
                          styles.appInstallCallToActionText,
                        destination !== "APP_INSTALL" &&
                          adType !== "CollectionAd" &&
                          destination !== "BLANK" &&
                          styles.appInstallAndBlankCallToActionContainer,
                      ]}
                    >
                      {destination !== "APP_INSTALL" &&
                        adType !== "CollectionAd" &&
                        destination !== "BLANK" &&
                        destination !== "SNAP_AD" && (
                          <View
                            style={[
                              styles.iconArrowUp,
                              { paddingRight: 0, marginBottom: 5 },
                            ]}
                          >
                            <ArrowUpIcon
                              stroke={"#FFFF"}
                              style={{ width: 5 }}
                            />
                          </View>
                        )}
                      <View style={{ borderRadius: 20, overflow: "hidden" }}>
                        <Text
                          style={[
                            styles.callToActionText,
                            (destination === "APP_INSTALL" ||
                              adType === "CollectionAd") &&
                              styles.appInstallCallToActionText,
                          ]}
                        >
                          {call_to_action !== "BLANK"
                            ? startCase(
                                toLower(translate(upperCase(call_to_action)))
                              )
                            : ""}
                        </Text>
                      </View>
                    </View>
                  )}
                  {(destination === "APP_INSTALL" ||
                    adType === "CollectionAd") && (
                    <View
                      style={[
                        styles.iconArrowUp,
                        {
                          paddingRight: destination === "APP_INSTALL" ? 10 : 60,
                        },
                      ]}
                    >
                      <ArrowUpIcon fill={"#000"} />
                    </View>
                  )}
                  <View
                    style={[
                      styles.adView,
                      {
                        flex: call_to_action === "BLANK" ? 1 : 0,
                        alignSelf:
                          destination === "APP_INSTALL" ? "center" : "flex-end",
                      },
                      adType === "CollectionAd" && {
                        position: "absolute",
                        top: heightPercentageToDP(-7),
                        right: 15,
                      },
                    ]}
                  >
                    <Text style={styles.AD}>{translate("Ad")}</Text>
                  </View>
                </View>
                {adType === "CollectionAd" && (
                  <Animatable.View
                    animation={"fadeInUpBig"}
                    style={[
                      styles.bottomView1,
                      globalStyles.whiteBackgroundColor,
                    ]}
                  >
                    <Text
                      style={[
                        styles.callToActionText,
                        (destination === "APP_INSTALL" ||
                          adType === "CollectionAd") &&
                          styles.appInstallCallToActionText,
                        {
                          color: "#000",
                          alignSelf: "flex-start",
                        },
                      ]}
                    >
                      {call_to_action !== "BLANK"
                        ? startCase(
                            toLower(translate(upperCase(call_to_action)))
                          )
                        : ""}
                    </Text>
                    <View
                      style={[
                        styles.iconArrowUp,
                        {
                          // paddingRight: destination === "APP_INSTALL" ? 10 : 60,
                          zIndex: 2,
                          alignSelf: "center",
                          marginTop: -22,
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <ArrowUpIcon stroke={"#000"} />
                    </View>
                    <View style={styles.collectionView}>{collection}</View>
                  </Animatable.View>
                )}
                {destination === "APP_INSTALL" && (
                  <Animatable.View
                    animation={"fadeInUpBig"}
                    style={[
                      styles.bottomView,
                      globalStyles.whiteBackgroundColor,
                    ]}
                  >
                    <View style={{}}>
                      <Image
                        {...{ preview, uri: appIcon }}
                        // source={{ uri: appIcon }}
                        style={[
                          styles.appIconBottom,
                          { width: 50, height: 50 },
                        ]}
                        resizeMode="contain"
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
                        style={[styles.headlineBottomText]}
                      >
                        {headline}
                      </Text>
                    </View>
                    <TouchableOpacity style={[styles.getButton]}>
                      <Text style={styles.getButtonText}>
                        {translate("Install")}
                      </Text>
                    </TouchableOpacity>
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
const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  adType: state.campaignC.adType,
  data: state.campaignC.data,
  storyAdsArray: state.campaignC.storyAdsArray,
  storyAdAttachment: state.campaignC.storyAdAttachment,
});
export default connect(mapStateToProps, null)(AdDesignReview);
