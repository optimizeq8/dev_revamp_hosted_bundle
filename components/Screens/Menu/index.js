import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  I18nManager,
  Text,
} from "react-native";
import { Container, Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
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

//data
import businessCategoriesList from "../../Data/businessCategoriesList.data";

//Functions
import isStringArabic from "../../isStringArabic";
import {
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
import { showMessage } from "react-native-flash-message";

class Menu extends Component {
  constructor(props) {
    super(props);
    const { translate } = this.props.screenProps;

    this.state = {
      slidePanel: false,
      _draggedValue: new Animated.Value(0),
      panelOffSet: 0,
      draggableRange: {
        top: hp("100") - 100,
        bottom: -10,
      },
      items: businessCategoriesList(translate),
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
  handleNavigation = (route, checkForBusinessId = false, params) => {
    const { translate } = this.props.screenProps;
    if (checkForBusinessId) {
      if (this.props.mainBusiness.hasOwnProperty("businessid")) {
        this.props.navigation.navigate(route, params);
      } else {
        showMessage({
          message: translate("Please create a business account first"),
          type: "warning",
        });
      }
    } else {
      this.props.navigation.navigate(route, params);
    }
  };

  /**
   * Gets the height and y position of the business name text component
   * so that the panel shows up underneath it on most phones
   */
  handlePanelOffset = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      draggableRange: {
        ...this.state.draggableRange,
        top: hp(100) - (layout.height + layout.y),
      },
    });
  };

  /**
   *
   *
   * To find business category name from list
   */
  getBusinessCategoryName = () => {
    const { mainBusiness } = this.props;
    let businesscategoryName = "";
    if (mainBusiness && mainBusiness.businesscategory) {
      // check if category === "43" ie other then show the otherCategory name
      if (mainBusiness.businesscategory === "43") {
        businesscategoryName = mainBusiness.otherBusinessCategory;
      } else
        businesscategoryName = this.state.items.find(
          (category) => category.value === mainBusiness.businesscategory
        ).label;
    }
    return businesscategoryName;
  };
  render() {
    const { translate } = this.props.screenProps;
    const { mainBusiness } = this.props;
    const businesscategoryName = this.getBusinessCategoryName();
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
                this.props.mainBusiness.businessname &&
                !isStringArabic(this.props.mainBusiness.businessname)
                  ? {
                      fontFamily: "montserrat-regular-english",
                    }
                  : {},
              ]}
            >
              {!this.props.mainBusiness
                ? ""
                : this.props.mainBusiness.businessname}
            </Text>
            <Text
              onLayout={this.handlePanelOffset}
              style={[
                styles.businessname,
                this.props.mainBusiness &&
                this.props.mainBusiness.businesscategory &&
                !isStringArabic(businesscategoryName)
                  ? {
                      fontFamily: "montserrat-regular-english",
                    }
                  : {},
              ]}
            >
              {businesscategoryName}
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
                    { fontFamily: "montserrat-regular" },
                  ]}
                >
                  {translate("Invite received")}
                </Text>
              ) : null}
            </GradientButton>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.handleNavigation("PersonalInfo", false, {
                    source: "open_hamburger",
                    source_action: "a_open_personal_info",
                  })
                }
              >
                <Icons.PersonalInfo style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Personal Info")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => {
                  // this.props.navigation.navigate("BusinessInfo")
                  this.props.navigation.navigate("CreateBusinessAccount", {
                    editBusinessInfo: true,
                    source: "open_hamburger",
                    source_action: "a_open_business_info",
                  });
                }}
              >
                <Icons.BusinessIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Business Info")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                disabled={
                  this.props.mainBusiness &&
                  this.props.mainBusiness.hasOwnProperty("user_role") &&
                  this.props.mainBusiness.user_role === "3"
                }
                onPress={() => {
                  if (
                    mainBusiness.hasOwnProperty("weburl") &&
                    mainBusiness.weburl &&
                    mainBusiness.weburl !== ""
                  ) {
                    // TODO: Change this path back to MyWebsiteECommerce after releasing to production for now
                    this.props.navigation.navigate("MyWebsite", {
                      source: "open_hamburger",
                      source_action: "a_open_my_website",
                    });
                  } else {
                    this.props.navigation.navigate("TutorialWeb", {
                      source: "open_hamburger",
                      source_action: "a_open_website_tutorial",
                    });
                  }
                }}
              >
                <Icons.WebsiteIcon width={32} style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("My Website")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.handleNavigation("Wallet", true, {
                    source: "open_hamburger",
                    source_action: "a_open_wallet",
                  })
                }
              >
                <Icons.Wallet style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Wallet")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.handleNavigation("TransactionList", false, {
                    source: "open_hamburger",
                    source_action: "a_open_transactions_list",
                  })
                }
              >
                <Icons.TransactionIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Transactions")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.handleNavigation("ChangePassword", false, {
                    source: "open_hamburger",
                    source_action: "a_open_change_password",
                  })
                }
                style={styles.options}
              >
                <Icons.ChangePassIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Change Password")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.handleNavigation("AddressForm", true, {
                    source: "open_hamburger",
                    source_action: "a_open_personal_info",
                  })
                }
                style={styles.options}
              >
                <Icons.AddressIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Address")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.handleNavigation("ManageTeam", true, {})}
                style={styles.options}
              >
                <Icons.GroupIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Manage Team")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    url: "https://www.optimizeapp.com/privacy",
                    title: "Privacy Policy",
                    source: "app_privacy_policy",
                    source_action: "a_open_app_privacy_policy",
                  })
                }
              >
                <Icon
                  name="security"
                  type="MaterialIcons"
                  style={[styles.icons]}
                />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Privacy Policy")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    url: "https://www.optimizeapp.com/terms_conditions",
                    title: "Terms & Conditions",
                    source: "app_TNC",
                    source_action: "a_open_app_TNC",
                  })
                }
              >
                <Icon
                  name="file-document-box"
                  type="MaterialCommunityIcons"
                  style={[
                    styles.icons,
                    // { top: heightPercentageToDP(5) < 30 ? 0 : 2 }
                  ]}
                />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Terms & Conditions")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  analytics.track(`a_logout`, {
                    source: "open_hamburger",
                    source_action: "a_logout",
                  });
                  this.props.clearPushToken(
                    this.props.navigation,
                    this.props.userInfo.userid
                  );
                }}
                style={styles.options}
              >
                <Icons.LogoutIcon style={[styles.icons]} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Logout")}
                </Text>
              </TouchableOpacity>
              <Text style={styles.version}>
                {translate("Version:")}
                {Constants.nativeAppVersion}/277/
                {Constants.nativeBuildVersion}
              </Text>
            </ScrollView>
          </View>
          {this.props.clearTokenLoading && <LoadingScreen dash={true} />}
          <SlidingUpPanel
            showBackdrop={false}
            ref={(c) => (this._panel = c)}
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
                <Icons.CloseListIcon fill="#5F5F5F" width={17} />
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

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  campaignList: state.dashboard.campaignList,
  exponentPushToken: state.login.exponentPushToken,
  clearTokenLoading: state.login.clearTokenLoading,
  businessInvitee: state.account.businessInvitee,
  invitedEmail: state.account.invitedEmail,
  businessInvites: state.account.businessInvites,
  checkNotification: state.generic.checkNotification,
  notificationData: state.generic.notificationData,
});
const mapDispatchToProps = (dispatch) => ({
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  createBusinessAccount: (account) =>
    dispatch(actionCreators.createBusinessAccount(account)),
  updateCampaignList: (id) => dispatch(actionCreators.updateCampaignList(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
