import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  I18nManager,
} from "react-native";
import { Content, Text, Container } from "native-base";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import Website from "../SwipeUpChoice/Website";
import Deep_Link from "../SwipeUpChoice/Deep_Link";
import App_Install from "../SwipeUpChoice/App_Install";
import Long_Form_Video from "../SwipeUpChoice/Long_Form_Video";
import WhatsApp from "../SwipeUpChoice/WhatsApp";
import AttachmentCard from "./AttachmentCard";
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
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";

class SwipeUpDestination extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      media: "",
      sidemenustate: false,
      selected: "",
      attachmentOptions: attachmentOptionData,
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
    if (this.props.toggle) {
      this.props.navigation.setParams({
        ...this.props.swipeUpProps,
      });
    }

    let media = this.props.navigation.getParam("media", "");
    let destination = this.props.navigation.getParam("destination", false);
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    const campaign_ad_type = this.props.navigation.getParam("adType", "SnapAd");
    analytics.track(`ad_swipe_up_destination`, {
      source,
      campaign_swipe_up_destination: destination,
      source_action,
      campaign_channel: "snapchat",
      campaign_ad_type,
    });
    let storyAdAttachment = this.props.storyAdAttachment;
    this.setState({
      media,
      //Here it checks if there's campaign data,meaning a campaign is in progress
      selected: this.props.data
        ? this.props.data.destination !== "BLANK" &&
          //if so it well check if the destination of the campaign is not for StoryAds
          this.props.data.destination !== "STORY"
          ? //then assigns the destination to selected
            destination
          : //if not then i do the same for storyAdAttachment
          storyAdAttachment.destination !== "BLANK"
          ? storyAdAttachment.destination
          : //else i check if there is data from the rejction process for a campaign
          this.props.rejCampaign && this.props.rejCampaign.destination
          ? this.props.rejCampaign.destination
          : destination
        : //if there is no campaign data then check for rejection process's campaign data
        this.props.rejCampaign && this.props.rejCampaign.destination
        ? this.props.rejCampaign.destination
        : "",
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  toggleSideMenu = () => {
    analytics.track(`a_toggle_side_menu`, {
      source: "ad_swipe_up_destination",
      source_action: "a_toggle_side_menu",
    });
    this.setState({
      sidemenustate: false,
    });
  };
  handleChoice = (value) => {
    this.setState(
      {
        selected: value,
        sidemenustate: true,
      },
      () => {
        analytics.track(`a_swipe_up_destination`, {
          campaign_swipe_up_destination: value,
          source: "ad_swipe_up_destination",
          source_action: "a_swipe_up_destination",
          campaign_channel: "snapchat",
          campaign_objective: this.props.data
            ? this.props.data.objective
            : this.props.navigation.getParam("objective", "objective"),
          campaign_ad_type: this.props.navigation.getParam("adType", "SnapAd"),
        });
      }
    );
  };
  handleSideMenu = (isOpen) => {
    if (isOpen === false)
      this.setState({ sidemenustate: isOpen }, () => {
        analytics.track(`ad_swipe_up_destination`, {
          campaign_channel: "snapchat",
          campaign_ad_type: this.props.navigation.getParam("adType", "SnapAd"),
          source: "ad_swipe_up_destination",
          source_action: "a_swipe_up_destination",
          campaign_swipe_up_destination: "",
          campaign_objective: this.props.navigation.getParam(
            "objective",
            "objective"
          ),
        });
      });
    else {
      if (this.state.selected === "REMOTE_WEBPAGE")
        analytics.track(`ad_swipe_up_destination`, {
          campaign_channel: "snapchat",
          campaign_ad_type: this.props.navigation.getParam("adType", "SnapAd"),
          source: "ad_swipe_up_destination",
          source_action: "a_swipe_up_destination",
          campaign_swipe_up_destination: "Website",
          campaign_objective: this.props.navigation.getParam(
            "objective",
            "objective"
          ),
        });
      else
        analytics.track(`ad_swipe_up_destination`, {
          campaign_channel: "snapchat",
          campaign_ad_type: this.props.navigation.getParam("adType", "SnapAd"),
          source: "ad_swipe_up_destination",
          source_action: "a_swipe_up_destination",
          campaign_swipe_up_destination: "Deep link",
          campaign_objective: this.props.navigation.getParam(
            "objective",
            "objective"
          ),
        });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    let storyAd = this.adType === "StoryAd";
    let attachmentOptionsCard = this.state.attachmentOptions
      .slice(0, storyAd ? this.state.attachmentOptions.length : 2)
      .map((opt) => (
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
            toggle={this.props.toggle}
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
            toggle={this.props.toggle}
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
            toggle={this.props.toggle}
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
            toggle={this.props.toggle}
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
            toggle={this.props.toggle}
          />
        );
        break;
      }
    }

    return (
      <View style={styles.safeAreaViewContainer}>
        <Sidemenu
          onChange={this.handleSideMenu}
          menuPosition={I18nManager.isRTL ? "left" : "right"}
          disableGestures={true}
          isOpen={this.state.sidemenustate}
          menu={this.state.sidemenustate && menu}
          openMenuOffset={wp(106.5)}
          // menuContainerStyle={{ width: wp(80) }}
          screenProps={this.props.screenProps}
        >
          {/* {!this.props.rejCampaign ? (
              <TopStepsHeader
                screenProps={this.props.screenProps}
                closeButton={false}
                segment={{
                  source: "ad_swipe_up_destination",
                  source_action: "a_go_back",
                }}
                icon="snapchat"
                navigation={this.props.navigation}
                adType={this.adType}
                currentScreen="Compose"
                actionButton={this.toggleAdSelection}
                title={"Swipe Up destination"}
              />
            ) : (
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={false}
                title={"Swipe Up destination"}
                navigation={this.props.navigation}
                segment={{
                  source: "ad_swipe_up_destination",
                  source_action: "a_go_back",
                }}
              />
            )} */}
          {/* <Content contentContainerStyle={styles.contentContainer}> */}
          <View style={styles.content}>{attachmentOptionsCard}</View>
          {/* </Content> */}
        </Sidemenu>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SwipeUpDestination);
