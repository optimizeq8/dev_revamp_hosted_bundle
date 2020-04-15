import React, { Component } from "react";
import { View, Image, BackHandler, Text } from "react-native";

import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";

import * as Segment from "expo-analytics-segment";

//Redux
import { connect } from "react-redux";
// import * as actionCreators from "../../../store/actions";

//icons
// import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
// import Pen from "../../../assets/SVGs/Pen";
// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import ProductSelect from "./ProductSelect";
import GradientButton from "../../MiniComponents/GradientButton";
// import { TouchableOpacity } from "react-native";
// import { globalColors } from "../../../GlobalStyles";
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

    return (
      <SafeAreaView
        style={myWebsiteStyles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={["#9300FF", "#5600CB"]}
          locations={[0, 0.35]}
          style={styles.gradient}
        />
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

        <View style={styles.businesslogoView}>
          <Image
            style={styles.businessLogo}
            source={{ uri: this.props.businessLogo }}
          />
        </View>
        <Text style={styles.bsnNameText}>
          {this.props.mainBusiness.businessname}
        </Text>
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 20
          }}
        >
          <Pen width={15} fill={globalColors.orange} />
          <Text style={styles.changeLogoText}>{translate("Change Logo")}</Text>
        </TouchableOpacity> */}

        <ProductSelect edit={true} screenProps={this.props.screenProps} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
