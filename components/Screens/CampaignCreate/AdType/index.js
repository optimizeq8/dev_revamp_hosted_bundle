// Components
import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { View, BackHandler, Platform, I18nManager } from "react-native";
import { Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import * as Animatable from "react-native-animatable";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LowerButton from "../../../MiniComponents/LowerButton";
import AdTypeCard from "./AdTypeCard";
import CustomHeader from "../../../MiniComponents/Header";

//Icons
import BackDrop from "../../../MiniComponents/BackDrop";

//Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Data
import { SocialPlatforms } from "../../../Data/socialMediaPlatforms.data";
import { snapAds, googleAds, instagramAds } from "../../../Data/adTypes.data";
//Functions
import { widthPercentageToDP } from "react-native-responsive-screen";

import ContinueCampaign from "../../../MiniComponents/ContinueCampaign";

class AdType extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    activeSlide: 0,
    media_type:
      Platform.OS === "android" && I18nManager.isRTL
        ? snapAds.reverse()
        : snapAds,
    isVisible: false,
    campaign_type: "SnapAd",
    route: "AdObjective",
    inverted: Platform.OS === "android" && I18nManager.isRTL
  };

  componentDidMount() {
    // console.log("this.props.data", this.props.data);
    if (this.props.data && this.props.data.hasOwnProperty("index")) {
      this.navigationRouteHandler(this.props.data.index);
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    Segment.trackWithProperties("Closed Ad Type", {
      business_name: this.props.mainBusiness.businessname
    });

    this.props.navigation.navigate("Dashboard");

    return true;
  };

  navigationRouteHandler = index => {
    let activeSlide = index;
    if (this.state.inverted) {
      const reversedSnapAds = this.state.media_type.reverse();
      // console.log("reversedSnapAds", reversedSnapAds);
      let campaign_type = reversedSnapAds[index].value;
      // console.log("index", index);
      // console.log("campaign_type reverse", campaign_type);
      let route = reversedSnapAds[index].rout;
      this.setState({ route, campaign_type, activeSlide });
    } else {
      let campaign_type = this.state.media_type[index].value;
      // console.log("campaign_type", campaign_type);
      let route = this.state.media_type[index].rout;
      this.setState({
        route,
        campaign_type,
        activeSlide
      });
    }
  };

  handleMediaChange = index => {
    let route = "";
    let media_type = "";

    switch (index) {
      case 0:
        route = "AdObjective";
        media_type = snapAds;
        break;
      case 1:
        route = "GoogleAdInfo";
        media_type = googleAds;
        break;
      // case 2:
      //   media_type = instagramAds;
      //   break;
    }
    this.setState({ route, media_type, activeSlide: 0 });
  };

  navigationHandler = adType => {
    Segment.trackWithProperties("Selected Ad Type", {
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
    Segment.trackWithProperties("Completed Checkout Step", {
      step: 1,
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });

    if (
      this.props.adType !== this.state.campaign_type &&
      !this.props.incompleteCampaign
    ) {
      this.props.resetCampaignInfo(true);
    }
    if (!this.props.incompleteCampaign) {
      this.props.set_adType(this.state.campaign_type);
    }
    if (
      !this.props.mainBusiness.snap_ad_account_id &&
      (adType.mediaType === "snapchat" || this.state.media_type === "snapchat")
    ) {
      this.props.navigation.navigate("SnapchatCreateAdAcc");
    } else if (
      !this.props.mainBusiness.google_account_id &&
      (adType.mediaType === "google" || this.state.media_type === "google")
    ) {
      this.props.navigation.navigate("GoogleCreateAdAcc");
    } else
      this.props.navigation.navigate(adType.rout || this.state.route, {
        tempAdType: this.state.campaign_type
      });
    // this.props.save_campaign_info({ index: this.state.activeSlide });
  };

  _renderItem = ({ item }) => {
    let MediaIcon = item.icon.type;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.slide}>
        <MediaIcon width={"75%"} height={"75%"} style={styles.slideIcon} />
        <Text style={styles.iconTitle}>{translate(item.title)}</Text>
      </View>
    );
  };

  _renderSlides = ({ item }) => {
    return (
      <AdTypeCard
        key={item.value}
        navigationHandler={this.navigationHandler}
        mainBusiness={this.props.mainBusiness}
        campaign_type={this.state.campaign_type}
        adType={item}
        screenProps={this.props.screenProps}
      />
    );
  };
  setModalVisible = (isVisible, resetCampaign) => {
    this.setState({ isVisible });
    resetCampaign && this.props.resetCampaignInfo(!resetCampaign);
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Ad Type", {
              category: "Campaign Creation"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              step: 1,
              business_name: this.props.mainBusiness.businessname,
              campaign_type: this.state.campaign_type
            });
          }}
        />
        <Container style={styles.container}>
          <BackDrop />
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            segment={{
              str: "Ad Type Close",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title={"Create a new campaign!"}
          />

          <View style={{ height: 90 }}>
            <Carousel
              ref={c => {
                this.media_carousel = c;
              }}
              onSnapToItem={indx => this.handleMediaChange(indx)}
              inactiveSlideScale={0.75}
              data={SocialPlatforms}
              renderItem={this._renderItem}
              sliderWidth={widthPercentageToDP(100)}
              itemWidth={110}
              scrollEndDragDebounceValue={0}
            />
          </View>
          <Carousel
            firstItem={this.props.data ? this.props.data.index : 0}
            ref={c => {
              this._carousel = c;
            }}
            onSnapToItem={indx => this.navigationRouteHandler(indx)}
            data={
              this.state.inverted
                ? this.state.media_type.reverse()
                : this.state.media_type
            }
            renderItem={this._renderSlides}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={250}
            inactiveSlideScale={0.8}
            inverted={this.state.inverted}
          />
          <Pagination
            containerStyle={{
              paddingVertical: 5,
              bottom: 17
            }}
            dotsLength={this.state.media_type.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 50,
              marginHorizontal: 8,
              backgroundColor: "rgba(255, 255, 255, 0.92)"
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View style={{ height: 70, marginBottom: 10 }}>
            <Animatable.View animation={"fadeIn"}>
              <LowerButton function={this.navigationHandler} bottom={1} />
            </Animatable.View>
          </View>
          <View>
            <ContinueCampaign
              tempAdType={this.props.adType}
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
            />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  set_adType: value => dispatch(actionCreators.set_adType(value)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdType);
