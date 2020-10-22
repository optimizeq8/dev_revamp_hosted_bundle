import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  UIManager,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "native-base";
import startCase from "lodash/startCase";
import styles from "./styles";
import SnapObjective from "../../../Data/snapchatObjectives.data";
import { widthPercentageToDP } from "react-native-responsive-screen";
import SwipeUpChoice from "../SwipeUpChoice/";
import SwipeUpDestination from "../SwipeUpDestination";
import { globalColors } from "../../../../GlobalStyles";
export default class SwipeUpComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    swipeUpMinHeight: 0,
    expanded: false,
    swipeUpProps: null,
  };
  componentDidMount() {
    this.handleSwipeUp();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.objective !== this.props.objective) {
      this.handleSwipeUp();
    }
    if (prevProps.swipeUpExpanded && !this.props.swipeUpExpanded) {
      this.toggle(false);
    }
  }
  handleSwipeUp = () => {
    let {
      destination,
      collectionAdLinkForm,
      adType,
      objective,
      media,
    } = this.props;

    if (adType === "CollectionAd") {
      this.setState({
        swipeUpProps: {
          _changeDestination: this.props._changeDestination,
          objective: objective,
          collectionAdLinkForm: collectionAdLinkForm,
          adType: adType,
          source: "ad_design",
          source_action: "a_swipe_up_destination",
        },
      });
      // this.props.navigation.navigate("SwipeUpChoice", {
      //   _changeDestination: this.props._changeDestination,
      //   objective: objective,
      //   collectionAdLinkForm: collectionAdLinkForm,
      //   adType: adType,
      //   source: "ad_design",
      //   source_action: "a_swipe_up_destination",
      // });
    } else if (adType === "StoryAd") {
      // objective === "BRAND_AWARENESS"
      //   ? this.props.navigation.navigate("SwipeUpDestination", {
      //       _changeDestination: this.props._changeDestination,
      //       objective,
      //       adType,
      //       destination,
      //       media,
      //       source: "ad_design",
      //       source_action: "a_swipe_up_destination",
      //     })
      //   :
      this.setState({
        swipeUpProps: {
          _changeDestination: this.props._changeDestination,
          objective,
          adType,
          collectionAdLinkForm,
          source: "ad_design",
          source_action: "a_swipe_up_destination",
        },
      });
      //  this.props.navigation.navigate("SwipeUpChoice", {
      //     _changeDestination: this.props._changeDestination,
      //     objective,
      //     adType,
      //     collectionAdLinkForm,
      //     source: "ad_design",
      //     source_action: "a_swipe_up_destination",
      //   });
    } else {
      // objective === "TRAFFIC"
      //   ? this.props.navigation.navigate("SwipeUpDestination", {
      //       _changeDestination: this.props._changeDestination,
      //       objective,
      //       adType,
      //       destination,
      //       media,
      //       source: "ad_design",
      //       source_action: "a_swipe_up_destination",
      //     })
      //   :
      this.setState({
        swipeUpProps: {
          _changeDestination: this.props._changeDestination,
          objective,
          collectionAdLinkForm,
          source: "ad_design",
          source_action: "a_swipe_up_destination",
        },
      });
      // this.props.navigation.navigate("SwipeUpChoice", {
      //     _changeDestination: this.props._changeDestination,
      //     objective,
      //     collectionAdLinkForm,
      //     source: "ad_design",
      //     source_action: "a_swipe_up_destination",
      //   });
    }
  };
  setMinHeight = (event) => {
    this.setState({
      swipeUpMinHeight: event.nativeEvent.layout.height,
      mounted: true,
    });
  };
  toggle = (expanded = true) => {
    // if (Platform.OS === "android") LayoutAnimation.spring();
    // else
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    this.props.setTheState({ swipeUpExpanded: expanded });
    this.setState({
      expanded: expanded, //Step 2
    });
  };

  render() {
    let {
      destination,
      attachment,
      collectionAdLinkForm,
      adType,
      objective,
      media,
      selectedStoryAd,
      call_to_action_label,
      disabled,
      savedObjective,
    } = this.props;
    let SwipeIcon = SnapObjective[adType || "SnapAd"].find(
      (obj) => obj.value === (savedObjective || objective || "BRAND_AWARENESS")
    ).icon;
    let sty = !this.state.expanded
      ? {}
      : {
          height: this.props.swipeUpMaxHeight,
          position: "absolute",
          marginTop: 0,
          // bottom: adType === "CollectionAd" ? -110 : -10,
        };
    selectedStoryAd = selectedStoryAd ? selectedStoryAd : {};
    const { translate } = this.props.screenProps;
    return (
      <TouchableOpacity
        onLayout={this.setMinHeight}
        disabled={disabled || this.state.expanded}
        style={[
          styles.swipeUp,
          // {
          //   marginBottom: adType === "CollectionAd" ? 110 : 10,
          // },
          sty,
        ]}
        onPress={() => this.toggle(true)}
      >
        {!this.state.expanded ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: "red",
                width: "90%",
                alignItems: "center",
              }}
            >
              <SwipeIcon
                width={widthPercentageToDP(10)}
                height={widthPercentageToDP(10)}
                fill="#000"
                stroke="#000"
              />
              <View style={styles.swipeUpView}>
                <Text style={[styles.swipeUpText, { fontSize: 12 }]}>
                  {translate("swipe up settings")}
                </Text>
                <Text style={styles.swipeUpText}>
                  {call_to_action_label &&
                  call_to_action_label !== "BLANK" &&
                  ((destination !== "BLANK" &&
                    destination !== "REMOTE_WEBPAGE") ||
                    (destination === "COLLECTION" &&
                      collectionAdLinkForm === 2))
                    ? translate(
                        startCase(destination.replace("_", " ").toLowerCase())
                      )
                    : (destination === "REMOTE_WEBPAGE" &&
                        objective !== "WEB_CONVERSION") ||
                      (destination === "COLLECTION" &&
                        collectionAdLinkForm === 1)
                    ? translate("Website")
                    : objective === "WEB_CONVERSION" &&
                      call_to_action_label !== "BLANK" &&
                      (destination !== "BLANK" ||
                        selectedStoryAd.destination !== "BLANK")
                    ? translate("SME Growth")
                    : objective === "WEB_CONVERSION"
                    ? translate("Call")
                    : translate("Swipe Up destination")}
                </Text>
                {objective !== "WEB_CONVERSION" &&
                  [
                    "REMOTE_WEBPAGE",
                    "DEEP_LINK",
                    "LEAD_GENERATION",
                    "AD_TO_CALL",
                  ].includes(destination) && (
                    <Text
                      ellipsizeMode={"tail"}
                      numberOfLines={1}
                      style={[styles.swipeUpText, styles.swipeUpSubText]}
                    >
                      {attachment.hasOwnProperty("deep_link_uri")
                        ? attachment.deep_link_uri
                        : attachment.hasOwnProperty("phone_number_id")
                        ? attachment.phone_number_id
                        : attachment.url}
                    </Text>
                  )}
              </View>
            </View>
            <Icon
              type="MaterialIcons"
              name="keyboard-arrow-down"
              fontSize={50}
              style={styles.downIcon}
            />
          </>
        ) : (
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
              }}
              onPress={() => this.toggle(false)}
            >
              <Icon
                type="AntDesign"
                name="down"
                style={[{ color: globalColors.purple, fontSize: 18 }]}
              />
              <Text style={[styles.swipeUpTitle]}>
                {translate("swipe up settings")}
              </Text>
            </TouchableOpacity>
            {adType === "StoryAd" && objective === "BRAND_AWARENESS" ? (
              <SwipeUpDestination
                swipeUpProps={this.state.swipeUpProps}
                screenProps={this.props.screenProps}
                navigation={this.props.navigation}
                toggle={this.toggle}
              />
            ) : (
              <SwipeUpChoice
                screenProps={this.props.screenProps}
                navigation={this.props.navigation}
                toggle={this.toggle}
                {...this.state.swipeUpProps}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
