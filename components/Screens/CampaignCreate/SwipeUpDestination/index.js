import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  I18nManager
} from "react-native";
import { Content, Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import CustomHeader from "../../../MiniComponents/Header";
import Website from "../SwipeUpChoice/Website";
import Deep_Link from "../SwipeUpChoice/Deep_Link";
import App_Install from "../SwipeUpChoice/App_Install";
import Long_Form_Video from "../SwipeUpChoice/Long_Form_Video";
import WhatsApp from "../SwipeUpChoice/WhatsApp";
import AttachmentCard from "./AttachmentCard";
import Instagram from "../SwipeUpChoice/Instagram";
import Sidemenu from "../../../MiniComponents/SideMenu";

//data
import attachmentOptionData from "../../../Data/attachmentOptions.data";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";

//Redux
import { connect } from "react-redux";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";

class SwipeUpDestination extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      media: "",
      sidemenustate: false,
      selected: "",
      attachmentOptions: attachmentOptionData
    };
    this.adType = this.props.adType;
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    Segment.screenWithProperties("Snap Ad Traffic SwipeUp Selection", {
      category: "Campaign Creation"
    });
    let media = this.props.navigation.getParam("media", "");
    let destination = this.props.navigation.getParam("destination", false);
    this.setState({
      media,
      selected: this.props.data
        ? this.props.data.destination
        : destination
        ? destination
        : ""
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  toggleSideMenu = () => {
    this.setState({
      sidemenustate: false
    });
  };
  handleChoice = value => {
    this.setState(
      {
        selected: value,
        sidemenustate: true
      },
      () => {
        Segment.trackWithProperties("Selected " + value + " Swipeup", {
          category: "Campaign Creation",
          label: this.props.data
            ? this.props.data.objective
            : this.props.navigation.getParam("objective", "objective") +
              " Objective"
        });
      }
    );
  };

  render() {
    const { translate } = this.props.screenProps;
    let storyAd = this.adType === "StoryAd";
    let attachmentOptionsCard = this.state.attachmentOptions
      .slice(0, storyAd ? this.state.attachmentOptions.length : 2)
      .map(opt => (
        <AttachmentCard
          key={opt.label}
          handleChoice={this.handleChoice}
          selected={this.state.selected}
          opt={opt}
          screenProps={this.props.screenProps}
        />
      ));
    let menu;
    switch (this.state.selected) {
      case "REMOTE_WEBPAGE": {
        menu = (
          <Website
            objective={this.props.navigation.getParam("objective")}
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "DEEP_LINK": {
        menu = (
          <Deep_Link
            objective={this.props.navigation.getParam("objective")}
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "APP_INSTALL": {
        menu = (
          <App_Install
            objective={this.props.navigation.getParam("objective")}
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "LONGFORM_VIDEO": {
        menu = (
          <Long_Form_Video
            objective={this.props.navigation.getParam("objective")}
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "WEB_CONVERSION": {
        menu = (
          <WhatsApp
            objective={this.props.navigation.getParam("objective")}
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "WEB_CONVERSION_INSTAGRAM": {
        menu = (
          <Instagram
            objective={this.props.navigation.getParam("objective")}
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
    }
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={styles.container}>
          <Sidemenu
            onChange={isOpen => {
              if (isOpen === false)
                this.setState({ sidemenustate: isOpen }, () => {
                  Segment.screenWithProperties(
                    "Snap Ad Traffic SwipeUp Selection",
                    {
                      category: "Campaign Creation"
                    }
                  );
                });
              else {
                if (this.state.selected === "REMOTE_WEBPAGE")
                  Segment.screenWithProperties("Snap Ad Website SwipeUp", {
                    category: "Campaign Creation",
                    label: "Traffic Objective"
                  });
                else
                  Segment.screenWithProperties("Snap Ad Deep link SwipeUp", {
                    category: "Campaign Creation",
                    label: "Traffic Objective"
                  });
              }
            }}
            menuPosition={I18nManager.isRTL ? "left" : "right"}
            disableGestures={true}
            isOpen={this.state.sidemenustate}
            menu={this.state.sidemenustate && menu}
            openMenuOffset={wp(85)}
            screenProps={this.props.screenProps}
          >
            <CustomHeader
              closeButton={false}
              title={translate("Swipe Up destination")}
              navigation={this.props.navigation}
            />

            <Content contentContainerStyle={styles.contentContainer}>
              {!isNull(this.state.media) &&
                !isUndefined(this.state.media) &&
                this.state.media.length > 0 && (
                  <View style={styles.placeholder1}>
                    <RNImageOrCacheImage
                      style={styles.media}
                      media={this.state.media}
                      resizeMode="cover"
                      blurRadius={20}
                    />
                  </View>
                )}
              <View style={styles.content}>{attachmentOptionsCard}</View>
            </Content>
          </Sidemenu>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeUpDestination);
