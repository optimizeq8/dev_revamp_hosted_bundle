import React, { Component } from "react";
import { Text, View, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles/adDesign.styles";
import { globalColors } from "../../../../../GlobalStyles";
import ArrowUp from "../../../../../assets/SVGs/ArrowUp";
import InstagramSwipeUpDestination from "../../SwipeUpDestination/index";
import { Icon } from "native-base";
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
  render() {
    let translate = this.props.translate;
    let sty = !this.state.expanded
      ? {}
      : {
          height: this.props.maxClickHeight + this.state.compHeight,
          // position: "absolute",
          // bottom: 200,
          zIndex: 10,
        };
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
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
            <>
              <ArrowUp stroke={globalColors.orange} />
              <Text style={styles.destinationText}>
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
                <Text style={styles.websiteLink}>{this.props.data.link}</Text>
              ) : null}
            </>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                }}
                onPress={() => this.toggleClickDestination(false)}
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
              <InstagramSwipeUpDestination
                toggleClickDestination={this.toggleClickDestination}
                screenProps={this.props.screenProps}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
