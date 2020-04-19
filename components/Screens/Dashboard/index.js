import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  BackHandler,
  ScrollView,
  I18nManager,
  Linking
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Updates } from "expo";
import { Button, Text, Container, Icon } from "native-base";
import LottieView from "lottie-react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import * as Segment from "expo-analytics-segment";
import CampaignCard from "../../MiniComponents/CampaignCard";
import GoogleCampaignCard from "../../MiniComponents/GoogleCampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Sidemenu from "../../MiniComponents/SideMenu";
import { ActivityIndicator } from "react-native-paper";
// import FilterMenu from "../../MiniComponents/FilterMenu";
let FilterMenu = null;
import Axios from "axios";
// import Menu from "../Menu";
let Menu = null; //Doing an inline require for big components helps with performance
import * as Animatable from "react-native-animatable";
import AdButtons from "./AdButtons";

//icons
import FilterIcon from "../../../assets/SVGs/Filter";
import IntercomIcon from "../../../assets/SVGs/IntercomIcon";
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";

import IntercomNotificationIcon from "../../../assets/SVGs/IntercomNotificationIcon";

// Style
import styles from "./styles";

//data
import { snapAds, googleAds } from "../../Data/adTypes.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import slowlog from "react-native-slowlog";
//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PlacholderDashboard from "./PlacholderDashboard";
import EmptyCampaigns from "./EmptyCampaigns/EmptyCampaigns";
import isStringArabic from "../../isStringArabic";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import isEqual from "react-fast-compare";
import AppUpdateChecker from "../AppUpdateChecker";
import GradientButton from "../../MiniComponents/GradientButton";
import LowerButton from "../../MiniComponents/LowerButton";

import segmentEventTrack from "../../segmentEventTrack";
import { Adjust, AdjustEvent, AdjustConfig } from "react-native-adjust";

//Logs reasons why a component might be uselessly re-rendering
whyDidYouRender(React);

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  signal = Axios.CancelToken.source();
  constructor(props) {
    super(props);
    this.state = {
      sidemenustate: false,
      isListEnd: false,
      fetching_from_server: false,
      showSearchBar: false,
      menu: new Animated.Value(0),
      open: false,
      anim: false,
      play: false,
      componentMounting: true
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
  componentDidMount() {
    if (
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("businessid")
    ) {
      // this.props.getWalletAmount();
      if (!this.props.campaignList || this.props.campaignList.length === 0) {
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
    Segment.screen("Dashboard");
    this.props.userInfo &&
      this.props.connect_user_to_intercom(this.props.userInfo.userid);
    this.setState({ menu: new Animated.Value(0) });
    this.closeAnimation();
    //Reset campaignProgressStarted only if there was a campaing in progress
    if (this.props.campaignInProgress && this.props.incompleteCampaign)
      this.props.setCampaignInProgress(false);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    // this.props.navigation.goBack();
    BackHandler.exitApp();
    return true;
  };
  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("businessid") &&
      prevProps.mainBusiness !== this.props.mainBusiness
    ) {
      this.props.userInfo &&
        this.props.connect_user_to_intercom(this.props.userInfo.userid);
      // this.props.set_as_seen(false);
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
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
        adTypeChanged: true
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
      useNativeDriver: true
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
      useNativeDriver: true
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
  _handleSideMenuState = status => {
    if (status) {
      FilterMenu = require("../../MiniComponents/FilterMenu").default;
    } else {
      FilterMenu = null;
    }
    this.setState({ sidemenustate: status }, () => {});
  };

  navigationHandler = adType => {
    Segment.trackWithProperties("Selected Ad Type", {
      business_name: this.props.mainBusiness.businessname,
      campaign_type: adType.title
    });
    Segment.trackWithProperties("Completed Checkout Step", {
      step: 1,
      business_name: this.props.mainBusiness.businessname,
      campaign_type: adType.title
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
      this.props.navigation.navigate("SnapchatCreateAdAcc");
    } else if (
      !this.props.mainBusiness.google_account_id &&
      adType.mediaType === "google"
    ) {
      this.props.navigation.navigate("GoogleCreateAdAcc");
    } else {
      if (
        adType.mediaType === "google" &&
        this.props.mainBusiness.google_suspended === "1"
      )
        this.props.navigation.navigate("SuspendedWarning");
      else {
        if (adType.value === "SnapAd") {
          let adjustEvent = new AdjustEvent("kd8uvi");
          Adjust.trackEvent(adjustEvent);
        }
        this.props.navigation.navigate(adType.rout, {
          tempAdType: adType.value
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
    if (!this.props.fetching_from_server && !this.props.isListEnd) {
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
    this.props.connect_user_to_intercom(this.props.userInfo.userid);
    // this.props.set_as_seen(false);
    this.props.getCampaignList(
      this.props.mainBusiness.businessid,
      this.increasePage,
      this.signal.token
    );
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
    let adjustEvent = new AdjustEvent("7kk0e6");
    Adjust.trackEvent(adjustEvent);
    if (!this.props.mainBusiness.snap_ad_account_id) {
      Segment.trackWithProperties("Create SnapAd Acount", {
        category: "Ad Account",
        label: "New SnapAd Account",
        business_name: this.props.mainBusiness.businessname,
        business_id: this.props.mainBusiness.businessid
      });
      this.props.navigation.navigate("SnapchatCreateAdAcc");
    } else {
      Segment.trackWithProperties("Create Campaign", {
        category: "Campaign Creation"
      });
      this.props.navigation.navigate("AdType");
    }
  };

  render() {
    // console.log(
    //   "this.props.campaignList.length",
    //   this.props.campaignList.length
    // );

    const { translate } = this.props.screenProps;
    const mySlideInUp = {
      from: {
        top: hp(100)
      },
      to: {
        top: 0
      }
    };
    const mySlideOutDown = {
      from: {
        top: 0
      },
      to: {
        top: hp(100)
      }
    };

    let placeHolderCards = [1, 2, 3, 4].map(x => (
      <View key={x} style={styles.placeHolderCardsStyle} />
    ));
    let menu =
      !this.state.open && FilterMenu ? (
        <FilterMenu
          _handleSideMenuState={this._handleSideMenuState}
          open={this.state.sidemenustate}
          screenProps={this.props.screenProps}
        />
      ) : null;
    let adButtons = [...snapAds, ...googleAds].map(adType => (
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
                  display: this.state.sidemenustate ? "none" : "flex"
                }
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
                    onPress={() =>
                      this.props.navigation.push("MessengerLoading")
                    }
                    style={[styles.headerIcons]}
                  >
                    {this.props.unread_converstaion === 0 ? (
                      <IntercomIcon width={24} height={24} />
                    ) : (
                      <>
                        <View style={styles.unreadTextView}>
                          <Text style={styles.unreadText}>
                            {this.props.unread_converstaion}
                          </Text>
                        </View>

                        <IntercomIcon width={24} height={24} />
                      </>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    segmentEventTrack("Button clicked to change app language", {
                      app_language:
                        this.props.appLanguage === "en" ? "ar" : "en"
                    });
                    this.props.getLanguageListPOEdit(
                      this.props.appLanguage === "en" ? "ar" : "en"
                    );
                    this.props.screenProps.setLocale(this.props.appLanguage);
                    this.props.navigation.navigate("SwitchLanguageLoading");
                    // RNRestart.Restart();
                    // Updates.reload();
                  }}
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
                  display: this.state.open ? "none" : "flex"
                }
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
                  navigation={this.props.navigation}
                  mainBusiness={
                    this.props.mainBusiness ? this.props.mainBusiness : {}
                  }
                  userInfo={this.props.userInfo}
                />
              ) : (
                <Container style={styles.container}>
                  <Sidemenu
                    onChange={isOpen => {
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
                                  fontFamily: "montserrat-bold-english"
                                }
                              : {}
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
                            !isStringArabic(this.props.mainBusiness.brandname)
                              ? {
                                  fontFamily: "montserrat-regular-english"
                                }
                              : {}
                          ]}
                        >
                          {this.props.mainBusiness
                            ? this.props.mainBusiness.brandname
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.sideMenuCard}>
                        {this.props.mainBusiness &&
                          this.props.mainBusiness.user_role !== "3" && (
                            <>
                              <View
                                style={{
                                  flexDirection: "column"
                                }}
                              >
                                <GradientButton
                                  style={styles.button}
                                  radius={30}
                                  onPressAction={this.handleNewCampaign}
                                >
                                  <Icon
                                    name="plus"
                                    type="MaterialCommunityIcons"
                                    style={{ color: "#fff" }}
                                  />
                                </GradientButton>
                                {/* <Text
                                style={[
                                  styles.campaignButtonText,
                                  styles.newCampaignTitle
                                ]}
                              >
                                {translate("New Ad")}
                              </Text> */}
                              </View>
                              <ScrollView
                                style={{
                                  // height: 90,
                                  top: I18nManager.isRTL ? 5 : 0
                                }}
                                horizontal
                              >
                                {adButtons}
                              </ScrollView>
                            </>
                          )}
                      </View>
                    </View>
                    {this.props.mainBusiness &&
                      (!this.props.mainBusiness.hasOwnProperty("weburl") ||
                        !this.props.mainBusiness.weburl ||
                        this.props.mainBusiness.weburl === "") && (
                        <TouchableOpacity
                          style={styles.websiteCard}
                          onPress={() => {
                            this.props.navigation.navigate("OptimizeWebsite");
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
                            width={10}
                            height={10}
                            style={styles.lowerButton}
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
                              height: "100%"
                            }}
                            renderSearchBar={this.renderSearchBar}
                          />
                        </View>
                        <TouchableOpacity
                          style={styles.activebutton}
                          onPress={() => {
                            this._handleSideMenuState(true);
                          }}
                        >
                          <FilterIcon width={30} height={30} fill="#909090" />
                        </TouchableOpacity>
                      </View>

                      {this.props.loadingCampaigns ||
                      !this.props.campaignList ? (
                        placeHolderCards
                      ) : (
                        <Animatable.View duration={1000} animation="fadeIn">
                          <FlatList
                            contentContainerStyle={
                              styles.flatlistContainerStyle
                            }
                            keyExtractor={item =>
                              JSON.stringify(item.campaign_id)
                            }
                            data={this.props.filteredCampaigns}
                            onEndReached={this.loadMoreData}
                            onEndReachedThreshold={0.1}
                            renderItem={this.renderCampaignCards}
                            onRefresh={this.reloadData}
                            refreshing={this.state.fetching_from_server}
                            ListFooterComponent={this.renderFooter}
                          />
                        </Animatable.View>
                      )}
                    </View>
                  </Sidemenu>
                </Container>
              )}
              <NavigationEvents
                onDidFocus={() => {
                  Segment.screen("Dashboard");
                  this.props.setCampaignInProgress(false);
                }}
              />
            </Animatable.View>

            <Animatable.View
              useNativeDriver
              onAnimationEnd={() => {
                if (this.state.anim) {
                  Segment.screenWithProperties("Home Menu", {
                    category: "User Menu"
                  });
                } else {
                  Segment.screen("Dashboard");
                }
              }}
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
          <AppUpdateChecker screenProps={this.props.screenProps} />
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
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
  clearTokenLoading: state.login.clearTokenLoading
});

const mapDispatchToProps = dispatch => ({
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  updateCampaignList: (id, page, increasePage) =>
    dispatch(actionCreators.updateCampaignList(id, page, increasePage)),
  onSelect: query => dispatch(actionCreators.filterCampaignsStatus(query)),
  getCampaignList: (id, increasePage, cancelToken) =>
    dispatch(actionCreators.getCampaignList(id, increasePage, cancelToken)),
  set_adType: value => dispatch(actionCreators.set_adType(value)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: value =>
    dispatch(actionCreators.setCampaignInProgress(value)),
  connect_user_to_intercom: user_id =>
    dispatch(actionCreators.connect_user_to_intercom(user_id)),
  set_as_seen: check => dispatch(actionCreators.set_as_seen(check)),
  getLanguageListPOEdit: language =>
    dispatch(actionCreators.getLanguageListPOEdit(language))
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

//Initializing whyDidYouRender for dashboard
Dashboard.whyDidYouRender = false;
