// Components
import React, { Component } from "react";

import {
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  BackHandler
} from "react-native";
import {
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon
} from "native-base";
import { LinearGradient, Segment } from "expo";
import * as Animatable from "react-native-animatable";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
// import Swiper from "../../../MiniComponents/Swiper";
import LowerButton from "../../../MiniComponents/LowerButton";
import CloseButton from "../../../MiniComponents/CloseButton";
import Swiper from "react-native-swiper";
import AdTypeCard from "./AdTypeCard";
import BackDrop from "../../../MiniComponents/BackDrop";

//icons
import CloseIcon from "../../../../assets/SVGs/Close";
import Placeholder from "../../../../assets/SVGs/AdType/Placeholder";
// Style
import styles from "./styles";
import globalStyles from "../../../../Global Styles";

import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";

//data
import { snapAds, twittwerAds, instagramAds } from "./AdTypesData";
import { SocialPlatforms } from "./SocialMedias";

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

  navigationHandler = () => {
    Segment.trackWithProperties("Select Ad Type Button", {
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
    Segment.trackWithProperties("Completed Checkout Step", {
      step: 1,
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
    this.props.navigation.push(this.state.route);
  };

  _renderItem({ item, index }) {
    let MediaIcon = item.icon.type;
    return (
      <View style={styles.slide}>
        <MediaIcon width="80%" style={styles.slideicon} />
        <Text style={styles.iconTitle}>{item.title}</Text>
      </View>
    );
  }

  _renderSlides = ({ item }) => {
    return (
      <AdTypeCard
        key={item.id}
        mainBusiness={this.props.mainBusiness}
        campaign_type={this.state.campaign_type}
        adType={item}
      />
    );
  };
  render() {
    console.log(this.state);
    // let mediaSlides = this.state.media_type === "Snapchat" ;
    // const Slide = snapAds.map(adType => (
    //   <AdTypeCard
    //     key={adType.id}
    //     mainBusiness={this.props.mainBusiness}
    //     campaign_type={this.state.campaign_type}
    //     adType={adType}
    //   />
    // ));
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />

        <CloseButton
          navigation={() => {
            Segment.trackWithProperties("Close Ad Type Button", {
              business_name: this.props.mainBusiness.businessname
            });
            this.props.navigation.navigate("Dashboard");
          }}
        />
        <BackDrop />
        <Text style={styles.title}>Create a new campaign!</Text>
        <View style={{ height: 110 }}>
          <Carousel
            enableMomentum
            ref={c => {
              this._carousel = c;
            }}
            onSnapToItem={indx => this.handleMediaChange(indx)}
            inactiveSlideScale={0.75}
            data={SocialPlatforms}
            renderItem={this._renderItem}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={110}
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
        />
        <View style={{ height: heightPercentageToDP(9) }}>
          <Pagination
            dotsLength={this.state.media_type.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={{
              width: heightPercentageToDP(2),
              height: heightPercentageToDP(2),
              borderRadius: 50,
              marginHorizontal: 8,
              backgroundColor: "rgba(255, 255, 255, 0.92)"
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={{ height: 70 }}>
          {this.state.route !== "" ? (
            <Animatable.View animation={"fadeIn"}>
              <LowerButton function={this.navigationHandler} bottom={2} />
            </Animatable.View>
          ) : (
            <Animatable.Text animation={"fadeIn"} style={styles.text}>
              COMING SOON
            </Animatable.Text>
          )}
        </View>
      </Container>
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
