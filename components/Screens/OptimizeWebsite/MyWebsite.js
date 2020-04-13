import React, { Component } from "react";
import { View, Image, BackHandler, Text } from "react-native";

import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import Pen from "../../../assets/SVGs/Pen";
// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import ProductSelect from "./ProductSelect";
import GradientButton from "../../MiniComponents/GradientButton";
import { TouchableOpacity } from "react-native";
import { globalColors } from "../../../GlobalStyles";
class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1
    };
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

  submitNextStep = activeStep => {
    this.setState({
      activeStep
    });
  };
  goToManageProducts = () => {
    this.props.navigation.navigate("ManageProducts");
  };
  topRightButtonFunction = () => {
    this.props.navigation.navigate("WebsiteSetting");
  };
  goBack = () => {
    this.props.navigation.navigate("Dashboard");
  };
  render() {
    const { translate } = this.props.screenProps;
    const { activeStep } = this.state;

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
          showTopRightButtonIcon={"settings"}
          // navigation={this.props.navigation}
          actionButton={this.goBack}
          topRightButtonFunction={this.topRightButtonFunction}
          title={"My Website"}
        />

        <View
          style={{
            width: 140,
            height: 140,
            alignSelf: "center",
            backgroundColor: "rgba(0,0,0,0.16)",
            marginVertical: 10,
            borderRadius: 140,
            overflow: "hidden"
          }}
        >
          <Image
            style={{
              width: 140,
              height: 140
            }}
            source={{ uri: this.props.businessLogo }}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 20
          }}
        >
          <Pen width={15} fill={globalColors.orange} />
          <Text style={styles.changeLogoText}>{translate("Change Logo")}</Text>
        </TouchableOpacity>

        <GradientButton
          style={styles.submitProducts}
          uppercase
          text={"Manage Products"}
          onPressAction={this.goToManageProducts}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loadingUpdateInfo: state.auth.loadingUpdateInfo,
  businessLogo: state.website.businessLogo
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
