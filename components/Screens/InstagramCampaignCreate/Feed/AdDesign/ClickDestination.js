import React, { Component } from "react";
import { Text, View, LayoutAnimation, TouchableOpacity } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import styles from "../../styles/adDesign.styles";
import { globalColors } from "../../../../../GlobalStyles";
import ArrowUp from "../../../../../assets/SVGs/ArrowUp";
import InstagramSwipeUpDestination from "../../SwipeUpDestination/index";
import { Icon } from "native-base";
import { Platform } from "react-native";
import { instagramAdObjectives } from "../../../../Data/instagramObjectives.data";
export default class ClickDestination extends Component {
  state = {
    swipeUpMinHeight: 0,
    expanded: false,
    swipeUpProps: null,
    compHeight: 0,
  };
  toggleClickDestination = (expanded = true) => {
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
  getCompHeight = (event) => {
    if (this.state.compHeight === 0)
      this.setState({
        compHeight: event.nativeEvent.layout.height,
      });
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.closeAnimation && this.props.closeAnimation) {
      this.toggleClickDestination(false);
    }
  }
  render() {
    let translate = this.props.translate;
    let sty = !this.state.expanded
      ? {}
      : {
          height:
            this.props.maxClickHeight +
            (this.props.existingPosts ? this.state.compHeight : 0),
          zIndex: 10,
        };

    let SwipeIcon = instagramAdObjectives[this.props.adType].find(
      (obj) =>
        obj.value === (this.props.campaignInfo.objective || "BRAND_AWARENESS")
    ).icon;
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          overflow: "hidden",
        }}
        onLayout={this.getCompHeight}
      >
        <TouchableOpacity
          onPress={
            () => this.toggleClickDestination(!this.state.expanded)
            // this.props.navigation.navigate("InstagramSwipeUpDestination", {
            //   source: "ad_objective",
            //   source_action: "a_swipe_up_destination",
            // })
          }
          style={[styles.destinationView, sty]}
          disabled={this.props.loading || this.state.expanded}
        >
          {!this.state.expanded ? (
            <View style={{ paddingLeft: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                  // width: "90%",
                  alignItems: "center",
                }}
              >
                <SwipeIcon
                  width={widthPercentageToDP(10)}
                  height={widthPercentageToDP(10)}
                  fill={globalColors.rum}
                  // stroke="#000"
                />
                <View style={styles.swipeUpView}>
                  <Text style={[styles.swipeUpText, { fontSize: 9 }]}>
                    {translate("Click settings")}
                  </Text>
                  <Text style={styles.swipeUpText}>
                    {this.props.data &&
                    this.props.data.link &&
                    this.props.data.link !== "BLANK" &&
                    ["link", "BLANK", "app_install"].includes(
                      this.props.campaignInfo.destination
                    )
                      ? this.props.campaignInfo.destination === "link" ||
                        (this.props.data.objective === "BRAND_AWARENESS" &&
                          this.props.campaignInfo.destination === "BLANK")
                        ? translate("Website")
                        : this.props.campaignInfo.destination === "app_install"
                        ? translate("App Installs")
                        : this.props.data.objective === "VIDEO_VIEWS"
                        ? translate("Video Views")
                        : translate("Click destination")
                      : translate("Click destination")}
                  </Text>
                  {this.props.data &&
                  this.props.data.link &&
                  this.props.data.link !== "BLANK" &&
                  (this.props.campaignInfo.destination === "link" ||
                    this.props.campaignInfo.destination === "BLANK") ? (
                    <Text
                      numberOfLines={1}
                      style={[[styles.swipeUpText, styles.swipeUpSubText]]}
                    >
                      {this.props.data.link}
                    </Text>
                  ) : null}
                </View>
              </View>
              <Icon
                type="MaterialIcons"
                name="keyboard-arrow-down"
                fontSize={50}
                style={styles.downIcon}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  Platform.OS !== "android" &&
                  this.toggleClickDestination(false)
                }
              >
                <Icon
                  type="AntDesign"
                  name="down"
                  style={[{ color: globalColors.purple, fontSize: 18 }]}
                  onPress={() => this.toggleClickDestination(false)}
                />
                <Text
                  onPress={() => this.toggleClickDestination(false)}
                  style={[styles.swipeUpTitle]}
                >
                  {translate("swipe up settings")}
                </Text>
              </TouchableOpacity>
              <InstagramSwipeUpDestination
                expanded={this.state.expanded}
                toggleClickDestination={this.toggleClickDestination}
                screenProps={this.props.screenProps}
                rejected={this.props.rejected}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
