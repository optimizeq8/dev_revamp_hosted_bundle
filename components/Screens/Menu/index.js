import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  I18nManager
} from "react-native";
import { Text, Container, Icon } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
// import BusinessList from "../BusinessList";
let BusinessList = null;
import Constants from "expo-constants";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import GradientButton from "../../MiniComponents/GradientButton";
// Icons
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import Logo from "../../../assets/SVGs/Optimize";
import DownArrowIcon from "../../../assets/SVGs/MenuIcons/DownArrowIcon";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";

//browser

// Style
import styles from "./styles";
import rtlStyles from "./rtlStyles";
// Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

//Functions
import isStringArabic from "../../isStringArabic";
import {
  heightPercentageToDP as hp,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
import { showMessage } from "react-native-flash-message";
import segmentEventTrack from "../../segmentEventTrack";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidePanel: false,
      _draggedValue: new Animated.Value(0),
      panelOffSet: 0,
      draggableRange: {
        top: hp("100") - 100,
        bottom: -10
      }
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BusinessList = null;
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.closePanel();
    this.props.closeAnimation();
    return true;
  };

  closePanel = () => {
    if (BusinessList) {
      BusinessList = null;
    }
    this.setState({ slidePanel: false }, () => {
      this._panel.hide();
    });
  };
  showPanel = () => {
    this.setState({ slidePanel: true }, () => {
      this._panel.show();
    });

    if (!BusinessList) {
      BusinessList = require("../BusinessList").default;
    }
  };
  handleNavigation = (route, checkForBusinessId = false) => {
    segmentEventTrack(`Clicked ${route}`);
    const { translate } = this.props.screenProps;
    if (checkForBusinessId) {
      if (this.props.mainBusiness.hasOwnProperty("businessid")) {
        this.props.navigation.navigate(route);
      } else {
        showMessage({
          message: translate("Please create a business account first"),
          type: "warning"
        });
      }
    } else {
      this.props.navigation.navigate(route);
    }
  };

  /**
   * Gets the height and y position of the business name text component
   * so that the panel shows up underneath it on most phones
   */
  handlePanelOffset = event => {
    const layout = event.nativeEvent.layout;
    this.setState({
      draggableRange: {
        ...this.state.draggableRange,
        top: hp(100) - (layout.height + layout.y)
      }
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[{ top: 10 }]}
      >
        <BackdropIcon style={styles.backDrop} />
        <Container style={[styles.menuModal]}>
          <View style={styles.menuContainer}>
            <Logo
              style={{ alignSelf: "center" }}
              width={heightPercentageToDP(10)}
              height={heightPercentageToDP(10)}
            />
            <Text style={styles.logoText}>Optimize</Text>
            <Text
              style={[
                styles.businessTitle,
                this.props.mainBusiness &&
                this.props.mainBusiness.brandname &&
                !isStringArabic(this.props.mainBusiness.brandname)
                  ? {
                      fontFamily: "montserrat-regular-english"
                    }
                  : {}
              ]}
            >
              {!this.props.mainBusiness
                ? ""
                : this.props.mainBusiness.brandname}
            </Text>
            <Text
              onLayout={this.handlePanelOffset}
              style={[
                styles.businessname,
                this.props.mainBusiness &&
                this.props.mainBusiness.businessname &&
                !isStringArabic(this.props.mainBusiness.businessname)
                  ? {
                      fontFamily: "montserrat-regular-english"
                    }
                  : {}
              ]}
            >
              {!this.props.mainBusiness
                ? ""
                : this.props.mainBusiness.businessname}
            </Text>

            <GradientButton
              style={[styles.button]}
              onPressAction={this.showPanel}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={styles.buttonText}>
                  {translate("Switch Account")}
                </Text>
                <DownArrowIcon style={styles.switchArrowIcon} stroke="#fff" />
              </View>
              {(this.props.businessInvitee &&
                this.props.userInfo.email === this.props.invitedEmail) ||
              this.props.businessInvites ? (
                <Text
                  style={[
                    styles.buttonText,
                    { fontFamily: "montserrat-regular" }
                  ]}
                >
                  {"Invite received "}
                </Text>
              ) : null}
            </GradientButton>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <TouchableOpacity
                style={styles.options}
                onPress={() => this.handleNavigation("PersonalInfo")}
              >
                <Icons.PersonalInfo style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Personal Info")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => {
                  // this.props.navigation.navigate("BusinessInfo")
                  this.props.navigation.navigate("CreateBusinessAccount", {
                    editBusinessInfo: true
                  });
                }}
              >
                <Icons.BusinessIcon style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Business Info")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => this.handleNavigation("Wallet", true)}
              >
                <Icons.Wallet style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Wallet")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => this.handleNavigation("TransactionList")}
              >
                <Icons.TransactionIcon style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Transactions")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleNavigation("ChangePassword")}
                style={styles.options}
              >
                <Icons.ChangePassIcon style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Change Password")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.handleNavigation("AddressForm", true)}
                style={styles.options}
              >
                <Icons.AddressIcon style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Address")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.handleNavigation("ManageTeam", true)}
                style={styles.options}
              >
                <Icons.GroupIcon style={styles.icons} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Manage Team")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    url: "https://www.optimizeapp.com/privacy",
                    title: "Privacy Policy"
                  })
                }
              >
                <Icon
                  name="security"
                  type="MaterialIcons"
                  style={[styles.icons]}
                />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Privacy Policy")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    url: "https://www.optimizeapp.com/terms_conditions",
                    title: "Terms & Conditions"
                  })
                }
              >
                <Icon
                  name="file-document-box"
                  type="MaterialCommunityIcons"
                  style={[
                    styles.icons
                    // { top: heightPercentageToDP(5) < 30 ? 0 : 2 }
                  ]}
                />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Terms & Conditions")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.clearPushToken(
                    this.props.navigation,
                    this.props.userInfo.userid
                  );
                }}
                style={styles.options}
              >
                <Icons.LogoutIcon style={[styles.icons]} />
                <Text
                  uppercase
                  style={I18nManager.isRTL ? rtlStyles.text : styles.text}
                >
                  {translate("Logout")}
                </Text>
              </TouchableOpacity>
              <Text style={styles.version}>
                {translate("Version:")}
                {Constants.manifest.version}/8/
                {Constants.manifest.ios.buildNumber}/
                {Constants.manifest.android.versionCode}/
                {Constants.manifest.releaseChannel}/
                {this.props.checkNotification}/{this.props.notificationData}
              </Text>
            </ScrollView>
          </View>
          {this.props.clearTokenLoading && <LoadingScreen dash={true} />}
          <SlidingUpPanel
            showBackdrop={false}
            ref={c => (this._panel = c)}
            friction={0.3}
            draggableRange={this.state.draggableRange}
            allowDragging={false}
            animatedValue={this.state._draggedValue}
          >
            <>
              <TouchableOpacity
                style={styles.CloseIcon}
                onPress={this.closePanel}
              >
                <Icons.CloseListIcon />
              </TouchableOpacity>
              <View style={styles.businessListContainer}>
                {BusinessList ? (
                  <BusinessList
                    navigation={this.props.navigation}
                    screenProps={this.props.screenProps}
                  />
                ) : null}
              </View>
            </>
          </SlidingUpPanel>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  campaignList: state.dashboard.campaignList,
  exponentPushToken: state.login.exponentPushToken,
  clearTokenLoading: state.login.clearTokenLoading,
  businessInvitee: state.account.businessInvitee,
  invitedEmail: state.account.invitedEmail,
  businessInvites: state.account.businessInvites,
  checkNotification: state.generic.checkNotification,
  notificationData: state.generic.notificationData
});
const mapDispatchToProps = dispatch => ({
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  createBusinessAccount: account =>
    dispatch(actionCreators.createBusinessAccount(account)),
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
