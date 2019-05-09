// Components
import React, { Component } from "react";

import { View, Image, TouchableWithoutFeedback } from "react-native";
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
import Swiper from "../../../MiniComponents/Swiper";
import LowerButton from "../../../MiniComponents/LowerButton";
import CloseButton from "../../../MiniComponents/CloseButton";

//icons
import CloseIcon from "../../../../assets/SVGs/Close";
import Placeholder from "../../../../assets/SVGs/AdType/Placeholder";
// Style
import styles from "./styles";
import globalStyles from "../../../../Global Styles";

import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import { heightPercentageToDP } from "react-native-responsive-screen";

class AdType extends Component {
  static navigationOptions = {
    header: null
  };
  state = { campaign_type: "SnapAd", route: "AdObjective" };
  navigationRouteHandler = id => {
    let route = "";
    let campaign_type = "";
    switch (id) {
      case 0:
        route = "AdObjective";
        campaign_type = "SnapAd";
        break;
      case 1:
        campaign_type = "TwitterAd";
        break;
      case 2:
        campaign_type = "InstagramAd";
        break;
      case 3:
        campaign_type = "SnapStoryAd";
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
  render() {
    const Slide = ({ title, id, icon, rout, text }) => (
      <TouchableWithoutFeedback
        onPress={() =>
          Segment.trackWithProperties(`${title} AdType Card Button`, {
            business_name: this.props.mainBusiness.businessname,
            campaign_type: this.state.campaign_type
          })
        }
      >
        <View>
          <Icon style={styles.slideicon} type="FontAwesome" name={icon} />
          <Text style={styles.slidtitle}>{title} </Text>
          <View
            style={[
              styles.placeholder,
              {
                backgroundColor: title.includes("Snap") ? "transparent" : "#000"
              }
            ]}
          >
            {title.includes("Snap") && (
              <Image
                style={{ width: "100%", height: "100%", position: "absolute" }}
                resizeMode="stretch"
                source={require("../../../../assets/images/SnapAd.gif")}
              />
            )}
            {text.includes("Soon") && (
              <Text style={styles.slidetext}> {text} </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
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
        <Text style={styles.title}>Choose your Ad Type</Text>
        <Swiper
          backgroundColor={["#4285f4", "#0f9d58", "#f4b400", "#db4437"]}
          dots
          dotsStyle={{
            padding: 7,
            borderRadius: 50,
            marginHorizontal: 5,
            top: heightPercentageToDP(3)
          }}
          dotsColor="rgba(255, 255, 255, 0.25)"
          dotsColorActive=" rgba(255, 255, 255, 1)"
          onSwipe={(event, i) => this.navigationRouteHandler(i)}
        >
          <Slide
            id={1}
            text="Create Your Ad Now!"
            rout="AdObjective"
            icon="snapchat-ghost"
            title="Snap Ad"
          />
          <Slide
            id={2}
            text="Coming Soon!"
            rout="Home"
            icon="twitter"
            title="Twitter Ad"
          />
          <Slide
            id={3}
            text="Coming Soon!"
            rout="Home"
            icon="instagram"
            title="Instagram Ad"
          />
          <Slide
            id={4}
            text="Coming Soon!"
            rout="Home"
            icon="snapchat-ghost"
            title="Story Ad"
          />
        </Swiper>
        <LowerButton function={this.navigationHandler} bottom={2} />
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
