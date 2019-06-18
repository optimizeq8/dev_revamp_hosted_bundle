// Components
import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { View, BackHandler } from "react-native";
import { Text, Container } from "native-base";
import { Segment } from "expo";
import * as Animatable from "react-native-animatable";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Header from "../../../MiniComponents/Header";
import LowerButton from "../../../MiniComponents/LowerButton";
import AdTypeCard from "./AdTypeCard";

//Icons
import BackDrop from "../../../MiniComponents/BackDrop";

//Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";

//Redux
import { connect } from "react-redux";

//Data
import { SocialPlatforms } from "../../../Data/socialMediaPlatforms.data";
import { snapAds, twittwerAds, instagramAds } from "../../../Data/adTypes.data";
//Functions
import { widthPercentageToDP } from "react-native-responsive-screen";

class AdType extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    activeSlide: 0,
    media_type: snapAds,
    campaign_type: "SnapAd",
    route: "AdObjective"
  };

  componentDidMount() {
    Segment.screen("Select Ad Type Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 1,
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    Segment.trackWithProperties("Close Ad Type Button", {
      business_name: this.props.mainBusiness.businessname
    });

    this.props.navigation.navigate("Dashboard");

    return true;
  };

  navigationRouteHandler = index => {
    let route = "";
    let campaign_type = "";
    let activeSlide = index;
    switch (index) {
      case 0:
        route = "AdObjective";
        campaign_type = "SnapAd";

        break;
      case 1:
        campaign_type = "StoryAd";
        break;
      case 2:
        campaign_type = "CollectionAd";
        break;
    }
    this.setState({ route, campaign_type, activeSlide });
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
        media_type = twittwerAds;
        break;
      case 2:
        media_type = instagramAds;
        break;
    }
    this.setState({ route, media_type, activeSlide: 0 });
  };

  navigationHandler = route => {
    Segment.trackWithProperties("Select Ad Type Button", {
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
    Segment.trackWithProperties("Completed Checkout Step", {
      step: 1,
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
    this.props.navigation.navigate(this.state.route);
  };

  _renderItem({ item }) {
    let MediaIcon = item.icon.type;
    return (
      <View style={styles.slide}>
        <MediaIcon width={"75%"} height={"75%"} style={styles.slideIcon} />
        <Text style={styles.iconTitle}>{item.title}</Text>
      </View>
    );
  }

  _renderSlides = ({ item }) => {
    return (
      <AdTypeCard
        key={item.id}
        navigationHandler={this.navigationHandler}
        mainBusiness={this.props.mainBusiness}
        campaign_type={this.state.campaign_type}
        adType={item}
      />
    );
  };
  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never" }}
      >
        <Container style={styles.container}>
          <BackDrop />
          <Header
            closeButton={true}
            segment={{
              str: "Ad Type Close Button",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title="Create a new campaign!"
          />

          <View style={{ height: 90 }}>
            <Carousel
              ref={c => {
                this._carousel = c;
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

          {/* <Swiper
          loop={false}
          activeDotColor="#fff"
          dotStyle={{
            backgroundColor: "rgba(255,255,255,0.25)",
            width: 13,
            top: 5,
            height: 13,
            marginLeft: 10,
            borderRadius: 50
          }}
          activeDotStyle={{
            width: 13,
            top: 5,
            marginLeft: 10,
            height: 13,
            borderRadius: 50
          }}
          onIndexChanged={index => this.navigationRouteHandler(index)}
        >
          {Slide}
        </Swiper> */}
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            onSnapToItem={indx => this.navigationRouteHandler(indx)}
            data={this.state.media_type}
            renderItem={this._renderSlides}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={250}
            inactiveSlideScale={0.8}
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
            {this.state.route !== "" ? (
              <Animatable.View animation={"fadeIn"}>
                <LowerButton function={this.navigationHandler} bottom={1} />
              </Animatable.View>
            ) : (
              <Animatable.Text animation={"fadeIn"} style={styles.text}>
                COMING SOON
              </Animatable.Text>
            )}
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdType);
