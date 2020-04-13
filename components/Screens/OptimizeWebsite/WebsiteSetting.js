import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler, Text } from "react-native";

import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";

// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import RegisterForm from "./RegisterForm";
export default class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    // Segment.screenWithProperties("Personal Info", {
    //   category: "User Menu"
    // });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={myWebsiteStyles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          // segment={{
          //   str: "Ad Design Back Button",
          //   obj: { businessname: this.props.mainBusiness.businessname }
          // }}
          navigation={this.props.navigation}
          title={"WEBSITE SETTINGS"}
        />

        <Text
          style={[styles.createWebsiteText, myWebsiteStyles.createWebsiteText]}
        >
          {translate("You can change your website info here")}
        </Text>

        <RegisterForm edit={true} screenProps={this.props.screenProps} />

        <OnlineStoreHome style={myWebsiteStyles.onlineStoreHomeIcon} />
      </SafeAreaView>
    );
  }
}
