// Components
import React, { Component } from "react";

import {
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView
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
import Carousel from "react-native-snap-carousel";

// import Swiper from "../../../MiniComponents/Swiper";
import LowerButton from "../../../MiniComponents/LowerButton";
import CloseButton from "../../../MiniComponents/CloseButton";
import Swiper from "react-native-swiper";
import AdTypeCard from "./AdTypeCard";
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
import { SnapAds } from "./AdTypesData";
import { SocialPlatforms } from "./SocialMedias";

import { widthPercentageToDP } from "react-native-responsive-screen";

class AdType extends Component {
  static navigationOptions = {
    header: null
  };
  state = { campaign_type: "SnapAd", route: "AdObjective" };
  navigationRouteHandler = index => {
    let route = "";
    let campaign_type = "";
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
    this.setState({ route, campaign_type });
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
  componentDidMount() {
    Segment.screen("Select Ad Type Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 1,
      business_name: this.props.mainBusiness.businessname,
      campaign_type: this.state.campaign_type
    });
  }
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Icon style={styles.slideicon} type="FontAwesome" name={item.icon} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }
  render() {
    console.log(this.state);

    const Slide = SnapAds.map(adType => (
      <AdTypeCard
        key={adType.id}
        mainBusiness={this.props.mainBusiness}
        campaign_type={this.state.campaign_type}
        adType={adType}
      />
    ));
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
        <Text style={styles.title}>Create a new campaign!</Text>
        <View style={{ height: 100 }}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={SocialPlatforms}
            renderItem={this._renderItem}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={110}
          />
        </View>

        <Swiper
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
        </Swiper>

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
