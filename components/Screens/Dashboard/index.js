import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  BackHandler,
  ScrollView,
  I18nManager,
  Linking,
  ActivityIndicator,
  Text,
  RefreshControl,
  Modal,
} from "react-native";
import * as Notifications from "expo-notifications";
import Intercom from "react-native-intercom";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import analytics from "@segment/analytics-react-native";
import { Container, Icon } from "native-base";
import LottieView from "lottie-react-native";
import { NavigationEvents } from "react-navigation";
import isEqual from "react-fast-compare";
import SafeAreaView from "react-native-safe-area-view";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import CampaignCard from "../../MiniComponents/CampaignCard";
import GoogleCampaignCard from "../../MiniComponents/GoogleCampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Sidemenu from "../../MiniComponents/SideMenu";
// import FilterMenu from "../../MiniComponents/FilterMenu";
let FilterMenu = null;
import Axios from "axios";
// import Menu from "../Menu";
let Menu = null; //Doing an inline require for big components helps with performance
import * as Animatable from "react-native-animatable";
import AdButtons from "./AdButtons";
import { showMessage } from "react-native-flash-message";

import InstagramCampaignCard from "../../MiniComponents/InstagramCampaignCard";
//icons
import FilterIcon from "../../../assets/SVGs/Filter";
import IntercomIcon from "../../../assets/SVGs/IntercomIcon";
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";

// Style
import styles from "./styles";

//data
import { snapAds, googleAds, instagramAds } from "../../Data/adTypes.data";
import businessCategoriesList from "../../Data/businessCategoriesList.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PlacholderDashboard from "./PlacholderDashboard";
import EmptyCampaigns from "./EmptyCampaigns/EmptyCampaigns";
import isStringArabic from "../../isStringArabic";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import AppUpdateChecker from "../AppUpdateChecker";
import GradientButton from "../../MiniComponents/GradientButton";
import LowerButton from "../../MiniComponents/LowerButton";
import PlaceHolderLine from "../../MiniComponents/PlaceholderLine";
import * as moment from "moment-timezone";
import BiometricsAuth from "../BiometricsAuth";

// import { Adjust, AdjustEvent, AdjustConfig } from "react-native-adjust";
import isNull from "lodash/isNull";
import { Platform } from "react-native";
import AlertModal from "../../MiniComponents/AlertModal";
import { BlurView } from "@react-native-community/blur";
import AsyncStorage from "@react-native-community/async-storage";
//Logs reasons why a component might be uselessly re-rendering
whyDidYouRender(React);

class Dashboard extends Component {
  static navigationOptions = {
    header: null,
  };
  signal = Axios.CancelToken.source();
  constructor(props) {
    super(props);
    const { translate } = this.props.screenProps;
    this.state = {
      sidemenustate: false,
      isListEnd: false,
      fetching_from_server: false,
      showSearchBar: false,
      menu: new Animated.Value(0),
      open: false,
      anim: false,
      play: false,
      componentMounting: true,
      items: businessCategoriesList(translate),
      adButtons: [...snapAds, ...googleAds],
      showButton: true,
      count: 0,
      showAlertModal: false,
      showBiometricsModal: false,
    };

    //Logs/gives warnign if a component has any functions that take a while to render
    // slowlog(this, /.*/, {
    //   // verbose: true
    // }); //verbose logs all functions and their time
    this.page = 1;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }
  async componentDidMount() {
    this.props.checkHashForUser();
    // if (this.props.userInfo) {
    //   const MPTweakHelper = NativeModules.MPTweakHelper;
    //   MPTweakHelper.getCustomTweak(
    //     this.props.userInfo.userid,
    //     (eer, showButton) => {
    //       // console.log("showButton", showButton);
    //       this.setState({ showButton });
    //     }
    //   );
    // }

    Intercom.getUnreadConversationCount().then((res) => {
      if (res !== this.props.count) {
        Notifications.setBadgeCountAsync(res);
        this.props.setCounterForUnreadMessage(res);
      }
    });
    Intercom.handlePushMessage();
    Linking.addEventListener("url", this.handleDeepLinkListener);
    if (
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("businessid")
    ) {
      // to set for instagram accounts
      if (this.props.mainBusiness.instagram_access === "1") {
        let adButtons = [...snapAds, ...googleAds, ...instagramAds];
        this.setState({
          adButtons,
        });
      }
      // this.props.getWalletAmount();
      if (
        (!this.props.campaignList || this.props.campaignList.length === 0) &&
        this.props.mainBusiness
      ) {
        this.props.getCampaignList(
          this.props.mainBusiness.businessid,
          this.increasePage,
          this.signal.token
        );
      }
      if (this.props.businessAccounts.length === 0) {
        this.props.getBusinessAccounts();
      }
    }
    this.setState({ menu: new Animated.Value(0) });
    this.closeAnimation();
    //Reset campaignProgressStarted only if there was a campaing in progress
    if (this.props.campaignInProgress && this.props.incompleteCampaign)
      this.props.setCampaignInProgress(false);

    if (
      this.props.instagramCampaignProgressStarted &&
      this.props.instagramIncompleteCampaign
    ) {
      this.props.setCampaignInProgressInstagram(false);
    }
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    if (source === "payment_end" && this.props.mainBusiness) {
      this.reloadData();
    }
    let ignoreBiometricModal = await AsyncStorage.getItem(
      "ignoreBiometricModal"
    );
    if (!ignoreBiometricModal) {
      setTimeout(() => {
        this.setState({ showBiometricsModal: true });
      }, 3000);
    }
  }
  handleBackPress = () => {
    // this.props.navigation.goBack();
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    BackHandler.exitApp();
    return true;
  };
  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    Linking.removeEventListener("url");
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("businessid") &&
      prevProps.mainBusiness !== this.props.mainBusiness
    ) {
      // to set for instagram accounts
      if (this.props.mainBusiness.instagram_access === "1") {
        let adButtons = [...snapAds, ...googleAds, ...instagramAds];
        this.setState({
          adButtons,
        });
      } else if (
        !this.props.mainBusiness.instagram_access ||
        this.props.mainBusiness.instagram_access === "0"
      ) {
        let adButtons = [...snapAds, ...googleAds];
        this.setState({
          adButtons,
        });
      }
      // this.props.userInfo &&
      //   this.props.connect_user_to_intercom(this.props.userInfo.userid);
      // this.props.set_as_seen(false);
      if (this.props.mainBusiness) {
        this.props.getCampaignList(
          this.props.mainBusiness.businessid,
          this.increasePage,
          this.signal.token
        );
      }
    }
    if (
      this.state.open &&
      this.props.mainBusiness &&
      prevProps.mainBusiness &&
      prevProps.mainBusiness.businessid !== this.props.mainBusiness.businessid
    ) {
      this.closeAnimation();
    }
    if (this.props.adType !== prevProps.adType) {
      this.setState({
        adTypeChanged: true,
      });
    }

    if (prevProps.iosHashIntercom !== this.props.iosHashIntercom) {
      Intercom.registerIdentifiedUser({
        userId: this.props.userInfo.userid,
      }).then((res) => {
        Intercom.setUserHash(
          Platform.OS === "ios"
            ? this.props.iosHashIntercom
            : this.props.andoidHashIntercom
        );
        Intercom.updateUser({
          email: this.props.userInfo.email,
          name:
            this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
          language_override: this.props.appLanguage,
          phone: this.props.userInfo.mobile,
          companies: this.props.mainBusiness
            ? [
                {
                  company_id: this.props.mainBusiness.businessid,
                  name: this.props.mainBusiness.businessname,
                },
              ]
            : [],
        });
        Intercom.getUnreadConversationCount().then((res) => {
          Notifications.setBadgeCountAsync(res);
          this.props.setCounterForUnreadMessage(res);
        });
      });
    }
  }

  startAnimation = () => {
    this.setState({ anim: true });
    if (FilterMenu) {
      FilterMenu = null;
    }
    if (Menu == null) {
      Menu = require("../Menu").default; //Doing an inline require for big components helps with performance
    }
    Animated.timing(this.state.menu, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ open: true });
    });
  };
  closeAnimation = () => {
    this.setState({ anim: false });
    this.setState({ open: false });
    Animated.timing(this.state.menu, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    if (Menu) {
      Menu = null;
    }
    if (!FilterMenu)
      FilterMenu = require("../../MiniComponents/FilterMenu").default;
  };
  renderSearchBar = () => {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  };
  _handleSideMenuState = (status) => {
    if (status) {
      FilterMenu = require("../../MiniComponents/FilterMenu").default;
    } else {
      FilterMenu = null;
    }
    this.setState({ sidemenustate: status }, () => {});
  };

  navigationHandler = (adType) => {
    const { translate } = this.props.screenProps;
    const { fb_connected, fb_ad_account_id } = this.props.mainBusiness;
    analytics.track(`a_campaign_ad_type`, {
      source: "dashboard",
      source_action: "a_campaign_ad_type",
      campaign_channel: adType.mediaType,
      campaign_ad_type: adType.value,
      device_id: this.props.screenProps.device_id,
    });

    if (this.state.adTypeChanged && !this.props.incompleteCampaign) {
      this.props.resetCampaignInfo(true);
    }
    if (!this.props.incompleteCampaign) {
      this.props.set_adType(adType.value);
    }

    if (
      !this.props.mainBusiness.snap_ad_account_id &&
      adType.mediaType === "snapchat"
    ) {
      this.props.navigation.navigate("SnapchatCreateAdAcc", {
        source: "dashboard",
        source_action: "a_campaign_ad_type",
      });
    } else if (
      !this.props.mainBusiness.google_account_id &&
      adType.mediaType === "google"
    ) {
      this.props.navigation.navigate("GoogleCreateAdAcc", {
        source: "dashboard",
        source_action: "a_campaign_ad_type",
      });
    } else {
      if (
        adType.mediaType === "google" &&
        this.props.mainBusiness.google_suspended === "1"
      ) {
        this.props.navigation.navigate("SuspendedWarning", {
          source: "dashboard",
          source_action: "a_campaign_ad_type",
        });
      } else if (adType.mediaType === "instagram" && fb_connected === "0") {
        this.props.navigation.navigate("WebView", {
          url: `https://www.optimizeapp.com/facebooklogin/login.php?b=${this.props.mainBusiness.businessid}`,
          title: "Instagram",
          source: "dashboard",
          source_action: "a_campaign_ad_type",
        });
      } else if (
        adType.mediaType === "instagram" &&
        fb_connected === "1" &&
        (isNull(fb_ad_account_id) || fb_ad_account_id === "")
      ) {
        showMessage({
          message: translate(
            `Your Instagram Account request is in process by OptimizeApp`
          ),
          type: "warning",
          position: "top",
        });
      } else {
        if (adType.value === "SnapAd") {
          // let adjustEvent = new AdjustEvent("kd8uvi");
          // Adjust.trackEvent(adjustEvent);
        }
        this.props.navigation.navigate(adType.rout, {
          tempAdType: adType.value,
        });
      }
    }
  };

  increasePage = (reset = false) => {
    if (reset) {
      this.page = 2;
    } else this.page = this.page + 1;
  };
  loadMoreData = () => {
    if (
      !this.props.fetching_from_server &&
      !this.props.isListEnd &&
      this.props.mainBusiness
    ) {
      this.props.updateCampaignList(
        this.props.mainBusiness.businessid,
        this.page,
        this.increasePage
      );
    }
  };
  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.props.fetching_from_server ? (
          <ActivityIndicator
            color="black"
            style={styles.footerActivityIndicator}
          />
        ) : null}
      </View>
    );
  };

  reloadData = () => {
    analytics.track(`a_refresh_list`, {
      source: "dashboard",
      source_action: "a_refresh_list",
      refresh_type: "campaigns",
    });
    // this.props.connect_user_to_intercom(this.props.userInfo.userid);
    // this.props.set_as_seen(false);
    if (this.props.mainBusiness) {
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
    }
  };

  renderCampaignCards = ({ item, index }) => {
    if (item.channel === "google") {
      return (
        <GoogleCampaignCard
          channel={"google"}
          campaign={item}
          navigation={this.props.navigation}
          key={item.campaign_id}
          screenProps={this.props.screenProps}
        />
      );
    } else if (item.channel === "instagram") {
      return (
        <InstagramCampaignCard
          channel={"google"}
          campaign={item}
          navigation={this.props.navigation}
          key={item.campaign_id}
          screenProps={this.props.screenProps}
        />
      );
    } else
      return (
        <CampaignCard
          channel={"snapchat"}
          campaign={item}
          navigation={this.props.navigation}
          key={item.campaign_id}
          screenProps={this.props.screenProps}
        />
      );
  };

  handleNewCampaign = () => {
    // let adjustEvent = new AdjustEvent("7kk0e6");
    // Adjust.trackEvent(adjustEvent);
    const device_id = this.props.screenProps.device_id;
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    analytics.track(`a_create_campaign`, {
      source,
      source_action: "a_create_campaign",
      timestamp: new Date().getTime(),
      userId: this.props.userInfo.userid,
      device_id,
    });
    this.props.navigation.navigate("AdType", {
      source: "dashboard",
      source_action: "a_create_campaign",
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
      businesscategoryName = this.state.items.find(
        (category) => category.value === mainBusiness.businesscategory
      ).label;
    }
    return businesscategoryName;
  };

  onDidFocus = () => {
    // Platform.OS === "android" && BadgeAndroid.setBadge(5);
    // Intercom.registerIdentifiedUser({
    //   userId: this.props.userInfo.userid,
    // }).then((res) => {
    //   Intercom.setUserHash(
    //     Platform.OS === "ios"
    //       ? this.props.iosHashIntercom
    //       : this.props.andoidHashIntercom
    //   );
    //   Intercom.updateUser({
    //     email: this.props.userInfo.email,
    //     name:
    //       this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
    //     language_override: this.props.appLanguage,
    //     phone: this.props.userInfo.mobile,
    //     companies: this.props.mainBusiness
    //       ? [
    //           {
    //             company_id: this.props.mainBusiness.businessid,
    //             name: this.props.mainBusiness.businessname,
    //           },
    //         ]
    //       : [],
    //   });
    //   Intercom.getUnreadConversationCount().then((res) => {
    //     Notifications.setBadgeCountAsync(res);
    //     this.props.setCounterForUnreadMessage(res);
    //   });
    // });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`dashboard`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
    });
    if (
      source_action === "a_move_amount_to_wallet" &&
      this.props.mainBusiness
    ) {
      this.reloadData();
    }
    this.props.setCampaignInProgress(false);
    this.props.setCampaignInProgressInstagram(false);
  };
  onDidBlur = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };

  handleDeepLinkListener = (url) => {
    if (url) {
      let deeplinkType = this.props.navigation.getParam("deeplinkType", "");
      let campaign_id = this.props.navigation.getParam("campaign_id", "");

      switch (deeplinkType) {
        case "snapchatCampaignDetail":
          this.props.getCampaignDetails(campaign_id, this.props.navigation);
          break;
        case "googleCampaignDetail":
          let start_time = this.props.navigation.getParam("start_time", "");
          let end_time = this.props.navigation.getParam("end_time", "");
          this.props.get_google_campiagn_details(
            campaign_id,
            start_time,
            end_time,
            false,
            {
              source: "dashboard",
              source_action: "a_open_campaign_details",
            }
          );
          this.props.navigation.navigate("GoogleCampaignDetails", {
            campaign: campaign_id,
            source: "dashboard",
            source_action: "a_open_campaign_details",
          });
          break;
        case "instagramCampaignDetail":
          this.props.getInstagramCampaignDetails(
            campaign_id,
            this.props.navigation
          );
          break;
        default:
          break;
      }
    }
  };
  handleSwitchLanguage = () => {
    analytics.track(`a_change_language`, {
      source: "dashboard",
      source_action: "a_change_language",
      prev_langauage: this.props.appLanguage,
      selected_language: this.props.appLanguage === "en" ? "ar" : "en",
    });
    this.props.navigation.navigate("SwitchLanguageLoading", {
      source: "dashboard",
      source_action: "a_change_language",
    });
    // this.props.getLanguageListPOEdit(
    //   this.props.appLanguage === "en" ? "ar" : "en"
    // );
    // this.props.screenProps.setLocale(this.props.appLanguage);
  };
  handleIntercom = () => {
    let userCurrentTime = new Date(
      moment.utc(new Date()).tz("Asia/Kuwait").format("YYYY-MM-DDTHH:mm:ss")
    );
    if (
      userCurrentTime.getDay() < 0 ||
      userCurrentTime.getDay() > 5 ||
      userCurrentTime.getHours() < 10 ||
      userCurrentTime.getHours() >= 18
    ) {
      this.setState({ showAlertModal: true });
    } else {
      this.openIntercom();
    }
  };
  openIntercom = () => {
    this.setState({ showAlertModal: false });
    analytics.track(`a_help`, {
      source: "dashboard",
      source_action: "a_help",
      support_type: "intercom",
    });
    Intercom.displayConversationsList();
  };
  resetAlertModal = () => {
    this.setState({ showAlertModal: false });
  };
  render() {
    const { translate } = this.props.screenProps;
    const mySlideInUp = {
      from: {
        top: hp(100),
      },
      to: {
        top: 0,
      },
    };
    const mySlideOutDown = {
      from: {
        top: 0,
      },
      to: {
        top: hp(100),
      },
    };
    const businesscategoryName = this.getBusinessCategoryName();
    let placeHolderCards = [1, 2, 3, 4].map((x) => (
      <PlaceHolderLine
        key={x}
        style={styles.placeHolderCardsStyle}
        width={wp(90)}
        height={150}
        color={"rgba(0,0,0,0.1)"}
        stopAutoRun={true}
      />
    ));
    let menu =
      !this.state.open && FilterMenu ? (
        <FilterMenu
          _handleSideMenuState={this._handleSideMenuState}
          open={this.state.sidemenustate}
          screenProps={this.props.screenProps}
        />
      ) : null;
    let adButtons = this.state.adButtons.map((adType) => (
      <AdButtons
        translate={this.props.screenProps.translate}
        key={adType.id + adType.mediaType}
        navigationHandler={this.navigationHandler}
        ad={adType}
      />
    ));
    if (
      this.props.loadingAccountMgmt ||
      // this.props.loadingCampaigns ||
      (!this.props.mainBusiness && this.props.loading)
    ) {
      return (
        <PlacholderDashboard
          placeHolderCards={placeHolderCards}
          navigation={this.props.navigation}
          open={this.state.open}
          startAnimation={this.startAnimation}
          closeAnimation={this.closeAnimation}
          mySlideInUp={mySlideInUp}
        />
      );
    } else if (
      this.props.businessLoadError ||
      (!this.props.userInfo && !this.props.clearTokenLoading) //so it doesn't show error component when logging out
    ) {
      return (
        <>
          <ErrorComponent
            screenProps={this.props.screenProps}
            dashboard={true}
            loading={this.props.loading}
            navigation={this.props.navigation}
          />
        </>
      );
    } else {
      return (
        <SafeAreaView
          style={styles.safeAreaViewContainer}
          forceInset={{ bottom: "never", top: "always" }}
        >
          {!this.state.sidemenustate && (
            <View
              style={[
                styles.mainView,
                {
                  display: this.state.sidemenustate ? "none" : "flex",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  if (this.state.open === false) {
                    this.startAnimation();
                  } else {
                    this.closeAnimation();
                  }
                }}
                style={styles.headerIcons}
              >
                <LottieView
                  style={styles.lottieView}
                  resizeMode="contain"
                  source={require("../../../assets/animation/menu-btn.json")}
                  progress={this.state.menu}
                />
              </TouchableOpacity>
              {!this.state.open ? (
                <>
                  <TouchableOpacity
                    onPress={this.handleIntercom}
                    style={[styles.headerIcons]}
                  >
                    {
                      // !this.props.unread_converstaion || this.props.unread_converstaion === 0
                      !this.props.count || this.props.count === 0 ? (
                        <IntercomIcon
                          width={RFValue(12, 414)}
                          height={RFValue(12, 414)}
                        />
                      ) : (
                        <>
                          <View style={styles.unreadTextView}>
                            <Text style={styles.unreadText}>
                              {this.props.count}
                              {/* {this.props.unread_converstaion} */}
                            </Text>
                          </View>

                          <IntercomIcon width={24} height={24} />
                        </>
                      )
                    }
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={this.handleSwitchLanguage}
                  style={[styles.languageTouchView]}
                >
                  <Text style={[styles.languageText]}>
                    {!I18nManager.isRTL ? "العربية" : "English"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <>
            <Animatable.View
              duration={500}
              onAnimationEnd={() =>
                this.state.open && this.setState({ play: true })
              }
              animation={
                !this.props.loadingAccountMgmt
                  ? this.state.anim
                    ? this.props.campaignList &&
                      this.props.campaignList.length === 0
                      ? "fadeOut"
                      : mySlideOutDown
                    : this.props.campaignList &&
                      this.props.campaignList.length === 0
                    ? ""
                    : this.state.play
                    ? mySlideInUp
                    : ""
                  : ""
              }
              style={[
                styles.animateView,
                {
                  display: this.state.open ? "none" : "flex",
                },
              ]}
            >
              {(!this.props.loadingCampaigns &&
                !this.props.loadingAccountMgmt &&
                this.props.campaignList &&
                this.props.campaignList.length === 0) ||
              (this.props.userInfo.hasOwnProperty("verified_account") &&
                !this.props.userInfo.verified_account) ? (
                <EmptyCampaigns
                  translate={translate}
                  screenProps={this.props.screenProps}
                  navigation={this.props.navigation}
                  mainBusiness={
                    this.props.mainBusiness ? this.props.mainBusiness : {}
                  }
                  userInfo={this.props.userInfo}
                />
              ) : (
                <Container style={styles.container}>
                  <Sidemenu
                    onChange={(isOpen) => {
                      if (isOpen === false) this._handleSideMenuState(isOpen);
                    }}
                    menuPosition={I18nManager.isRTL ? "left" : "right"}
                    disableGestures={true}
                    menu={menu}
                    openMenuOffset={wp("85%")}
                    isOpen={this.state.sidemenustate}
                    screenProps={this.props.screenProps}
                  >
                    <View style={styles.dashboardHeader}>
                      <View style={[styles.nameStyle]}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={[
                            styles.text,
                            this.props.mainBusiness &&
                            !isStringArabic(
                              this.props.mainBusiness.businessname
                            )
                              ? {
                                  fontFamily: "montserrat-bold-english",
                                }
                              : {},
                          ]}
                        >
                          {this.props.mainBusiness
                            ? this.props.mainBusiness.businessname
                            : ""}
                        </Text>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={[
                            styles.brandStyle,
                            this.props.mainBusiness &&
                            !isStringArabic(businesscategoryName)
                              ? {
                                  fontFamily: "montserrat-regular-english",
                                }
                              : {},
                          ]}
                        >
                          {businesscategoryName}
                        </Text>
                      </View>
                      <View style={styles.sideMenuCard}>
                        {this.props.mainBusiness &&
                          this.props.mainBusiness.user_role !== "3" && (
                            <ScrollView
                              contentContainerStyle={{
                                marginTop: 5,
                                paddingHorizontal: 20,
                              }}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                            >
                              <GradientButton
                                style={styles.button}
                                radius={RFValue(15, 414)}
                                onPressAction={this.handleNewCampaign}
                              >
                                <Icon
                                  name="plus"
                                  type="MaterialCommunityIcons"
                                  style={{ color: "#fff" }}
                                />
                              </GradientButton>
                              {adButtons}
                            </ScrollView>
                          )}
                      </View>
                    </View>
                    {this.props.mainBusiness &&
                      this.props.mainBusiness.websitelink === "" &&
                      (!this.props.mainBusiness.hasOwnProperty("weburl") ||
                        !this.props.mainBusiness.weburl ||
                        this.props.mainBusiness.weburl === "") && (
                        <TouchableOpacity
                          style={styles.websiteCard}
                          onPress={() => {
                            this.props.navigation.navigate("TutorialWeb", {
                              source: "dashboard",
                              source_action: "a_open_website_tutorial",
                            });
                          }}
                        >
                          <LinearGradient
                            colors={["#41C5FF", "#46ABF4"]}
                            locations={[0.3, 0.75]}
                            style={styles.gradient}
                          />
                          <OnlineStoreHome
                            width={wp(70)}
                            style={styles.onlineStoreHomeIcon}
                          />
                          {this.props.mainBusiness &&
                          this.props.mainBusiness.user_role == "3" ? (
                            <Text style={styles.mainText}>
                              {translate(
                                "This business doesn't have campaigns yet"
                              )}
                            </Text>
                          ) : this.props.mainBusiness &&
                            !this.props.mainBusiness.hasOwnProperty(
                              "businessid"
                            ) ? (
                            <Text style={styles.mainText}>
                              {translate("Tap the button below to")}
                            </Text>
                          ) : (
                            <Text style={styles.mainText}>
                              {translate("Create your own website")}
                            </Text>
                          )}

                          <LowerButton
                            screenProps={this.props.screenProps}
                            width={10}
                            height={10}
                            style={styles.lowerButton}
                            function={() => {
                              this.props.navigation.navigate("TutorialWeb", {
                                source: "dashboard",
                                source_action: "a_open_website_tutorial",
                              });
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    <View style={[styles.mainCard]}>
                      <View style={styles.searchbarContainer}>
                        <View style={{ width: "80%" }}>
                          <SearchBar
                            screenProps={this.props.screenProps}
                            customInputStyle={{
                              backgroundColor: "rgba(0,0,0,0.13)",
                              height: "100%",
                            }}
                            strokeColor={"#909090"}
                            renderSearchBar={this.renderSearchBar}
                            source={"dashboard"}
                          />
                        </View>
                        <TouchableOpacity
                          disabled={
                            this.props.loadingCampaigns ||
                            !this.props.campaignList
                          }
                          style={styles.activebutton}
                          onPress={() => {
                            this._handleSideMenuState(true);
                          }}
                        >
                          <FilterIcon
                            width={RFValue(15, 414)}
                            height={RFValue(15, 414)}
                            fill="#909090"
                          />
                        </TouchableOpacity>
                      </View>

                      {this.props.loadingCampaigns ||
                      !this.props.campaignList ? (
                        <ScrollView
                          refreshControl={
                            <RefreshControl
                              refreshing={this.state.fetching_from_server}
                              onRefresh={this.reloadData}
                            />
                          }
                        >
                          {placeHolderCards}
                        </ScrollView>
                      ) : (
                        <Animatable.View duration={1000} animation="fadeIn">
                          <FlatList
                            contentContainerStyle={
                              styles.flatlistContainerStyle
                            }
                            keyExtractor={(item) =>
                              JSON.stringify(item.campaign_id)
                            }
                            data={this.props.filteredCampaigns}
                            onEndReached={this.loadMoreData}
                            onEndReachedThreshold={0.1}
                            renderItem={this.renderCampaignCards}
                            onRefresh={this.reloadData}
                            refreshing={this.state.fetching_from_server}
                            ListFooterComponent={this.renderFooter}
                            showsVerticalScrollIndicator={false}
                          />
                        </Animatable.View>
                      )}
                    </View>
                  </Sidemenu>
                </Container>
              )}
              <NavigationEvents
                onDidFocus={this.onDidFocus}
                onDidBlur={this.onDidBlur}
              />
            </Animatable.View>

            <Animatable.View
              useNativeDriver
              duration={100}
              animation={
                (this.props.campaignList &&
                  this.props.campaignList.length === 0 &&
                  this.state.anim) ||
                (this.state.anim &&
                  !this.state.sidemenustate &&
                  this.props.campaignList &&
                  this.props.campaignList.length !== 0) ||
                this.state.anim
                  ? "fadeIn"
                  : "fadeOut"
              }
              style={styles.menuContainer}
            >
              {Menu ? (
                <Menu
                  closeAnimation={this.closeAnimation}
                  navigation={this.props.navigation}
                  screenProps={this.props.screenProps}
                  open={this.state.open}
                />
              ) : null}
            </Animatable.View>
          </>
          <AlertModal
            showAlertModal={this.state.showAlertModal}
            screenProps={this.props.screenProps}
            openIntercom={this.openIntercom}
            resetAlertModal={this.resetAlertModal}
          ></AlertModal>
          <AppUpdateChecker screenProps={this.props.screenProps} />
          <Modal transparent visible={this.state.showBiometricsModal}>
            <BlurView
              blurType="dark"
              style={{
                height: "100%",
                justifyContent: "center",
              }}
            >
              <BiometricsAuth
                screenProps={this.props.screenProps}
                closeBiometricsModal={() =>
                  this.setState({ showBiometricsModal: false })
                }
                showingInModal={true}
              />
            </BlurView>
          </Modal>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loading: state.dashboard.loading,
  adType: state.campaignC.adType,
  loadingAccountMgmt: state.account.loading,
  mainBusiness: state.account.mainBusiness,
  businessLoadError: state.account.businessLoadError,
  campaignList: state.dashboard.campaignList,
  fetching_from_server: state.dashboard.fetching_from_server,
  isListEnd: state.dashboard.isListEnd,
  filteredCampaigns: state.dashboard.filteredCampaigns,
  exponentPushToken: state.login.exponentPushToken,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  unread_converstaion: state.messenger.unread_converstaion,
  appLanguage: state.language.phoneLanguage,
  terms: state.language.terms,
  campaignProgressStarted: state.campaignC.campaignProgressStarted,
  businessAccounts: state.account.businessAccounts,
  loadingCampaigns: state.dashboard.loadingCampaigns,
  clearTokenLoading: state.login.clearTokenLoading,
  instagramIncompleteCampaign: state.instagramAds.incompleteCampaign,
  instagramCampaignProgressStarted: state.instagramAds.campaignProgressStarted,
  count: state.generic.count,
  iosHashIntercom: state.auth.iosHashIntercom,
  andoidHashIntercom: state.auth.andoidHashIntercom,
});

const mapDispatchToProps = (dispatch) => ({
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  updateCampaignList: (id, page, increasePage) =>
    dispatch(actionCreators.updateCampaignList(id, page, increasePage)),
  onSelect: (query) => dispatch(actionCreators.filterCampaignsStatus(query)),
  getCampaignList: (id, increasePage, cancelToken) =>
    dispatch(actionCreators.getCampaignList(id, increasePage, cancelToken)),
  set_adType: (value) => dispatch(actionCreators.set_adType(value)),
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  resetCampaignInfo: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: (value) =>
    dispatch(actionCreators.setCampaignInProgress(value)),
  connect_user_to_intercom: (user_id) =>
    dispatch(actionCreators.connect_user_to_intercom(user_id)),
  set_as_seen: (check) => dispatch(actionCreators.set_as_seen(check)),
  getLanguageListPOEdit: (language) =>
    dispatch(actionCreators.getLanguageListPOEdit(language)),
  setCampaignInProgressInstagram: (value) =>
    dispatch(actionCreators.setCampaignInProgressInstagram(value)),
  getCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getCampaignDetails(id, naviagtion)),
  get_google_campiagn_details: (
    id,
    start_time,
    end_time,
    getStats,
    segmentInfo
  ) =>
    dispatch(
      actionCreators.get_google_campiagn_details(
        id,
        start_time,
        end_time,
        getStats,
        segmentInfo
      )
    ),
  getInstagramCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getInstagramCampaignDetails(id, naviagtion)),
  setCounterForUnreadMessage: (count) =>
    dispatch(actionCreators.setCounterForUnreadMessage(count)),
  checkHashForUser: () => dispatch(actionCreators.checkHashForUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

//Initializing whyDidYouRender for dashboard
Dashboard.whyDidYouRender = false;
