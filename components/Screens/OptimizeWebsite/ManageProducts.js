import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler, Text } from "react-native";

import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import BackIcon from "../../../assets/SVGs/BackButton";
// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import ProductSelect from "./ProductSelect";
class ManageProducts extends Component {
  constructor(props) {
    super(props);
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
          title={"Add Products"}
        />

        <Text
          style={[styles.createWebsiteText, myWebsiteStyles.createWebsiteText]}
        >
          {translate(
            "These are the products that will show on your website Tap to remove products"
          )}
        </Text>

        <ProductSelect edit={true} screenProps={this.props.screenProps} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loadingUpdateInfo: state.auth.loadingUpdateInfo
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
