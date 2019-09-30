import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  BackHandler,
  ScrollView
} from "react-native";
import { Button, Text, Container, Icon } from "native-base";
import * as Localization from "expo-localization";
import LottieView from "lottie-react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import * as Segment from "expo-analytics-segment";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Sidemenu from "../../MiniComponents/SideMenu";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "../../MiniComponents/FilterMenu";
import Axios from "axios";
import Menu from "../Menu";
import * as Animatable from "react-native-animatable";
import AdButtions from "./AdButtons";

//icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import IntercomIcon from "../../../assets/SVGs/IntercomIcon.svg";
import IntercomNotificationIcon from "../../../assets/SVGs/IntercomNotificationIcon.svg";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";

// Style
import styles from "./styles";

//data
import { snapAds } from "../../Data/adTypes.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PlacholderDashboard from "./PlacholderDashboard";
import EmptyCampaigns from "./EmptyCampaigns/EmptyCampaigns";
import Modal from "react-native-modal";

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
      componentMounting: true
    };
    this.page = 1;
  }
  componentDidMount() {
    console.log("did mount");

    if (this.props.mainBusiness) {
      if (!this.props.mainBusiness.snap_ad_account_id) {
        this.props.navigation.navigate("SnapchatCreateAdAcc");
      }
      // this.props.getWalletAmount();
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
      this.props.connect_user_to_intercom(this.props.userInfo.userid);

      this.props.getBusinessAccounts();
      Segment.screen("Dashboard");
    }
    this.setState({ menu: new Animated.Value(0) });
    this.closeAnimation();
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
    console.log("did update");

    if (
      this.props.mainBusiness &&
      prevProps.mainBusiness !== this.props.mainBusiness
    ) {
      if (
        this.props.mainBusiness &&
        !this.props.mainBusiness.snap_ad_account_id
      ) {
        this.props.navigation.navigate("SnapchatCreateAdAcc", {
          closeAnimation: this.closeAnimation
        });
      }
      this.props.connect_user_to_intercom(this.props.userInfo.userid);
      // this.props.set_as_seen(false);
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
    }

    if (this.props.adType !== prevProps.adType) {
      this.setState({
        adTypeChanged: true
      });
    }
  }

  startAnimation = () => {
    this.setState({ anim: true });
    Animated.timing(this.state.menu, {
      toValue: 1,
      duration: 350
    }).start(() => {
      // this.props.navigation.navigate("Menu", {
      //   open: true,
      //   closeAnimation: this.closeAnimation,
      //   menu: this.state.menu
      // });
      this.setState({ open: true });
    });
  };
  closeAnimation = () => {
    this.setState({ anim: false });

    Animated.timing(this.state.menu, {
      toValue: 0,
      duration: 350
    }).start(() => {
      this.setState({ open: false });
    });
  };
  renderSearchBar = () => {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  };
  _handleSideMenuState = status => {
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
    this.props.navigation.navigate(adType.rout, { tempAdType: adType.value });
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
  renderFooter() {
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
  }

  reloadData = () => {
    this.props.connect_user_to_intercom(this.props.userInfo.userid);
    // this.props.set_as_seen(false);

    this.props.getCampaignList(
      this.props.mainBusiness.businessid,
      this.increasePage,
      this.signal.token
    );
  };

  continueCampaign = () => {
    let ctnModal = {};
    if (this.state.componentMounting && this.props.incompleteCampaign) {
      this.setState({ componentMounting: false });
    }
    return ctnModal;
  };
  render() {
    //   console.log(' let { t, locale } = this.props.screenProps;', this.props.screenProps);
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
    let menu = !this.state.open ? (
      <FilterMenu
        _handleSideMenuState={this._handleSideMenuState}
        open={this.state.sidemenustate}
        screenProps={this.props.screenProps}
      />
    ) : null;

    let adButtons = snapAds.map(adType => (
      <AdButtions
        translate={this.props.screenProps.translate}
        key={adType.id}
        navigationHandler={this.navigationHandler}
        ad={adType}
      />
    ));
    if (
      (!this.props.mainBusiness && this.props.loadingAccountMgmt) ||
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
    } else if (this.props.businessLoadError) {
      return (
        <ErrorComponent
          screenProps={this.props.screenProps}
          dashboard={true}
          loading={this.props.loading}
          navigation={this.props.navigation}
        />
      );
    } else {
      return (
        <SafeAreaView
          style={styles.safeAreaViewContainer}
          forceInset={{ bottom: "never", top: "always" }}
        >
          {this.state.anim && (
            <BackdropIcon style={styles.backDrop} height={hp("100%")} />
          )}
          {!this.state.sidemenustate && (
            <View
              style={[
                styles.mainView,
                {
                  display: this.state.sidemenustate ? "none" : "flex"
                }
              ]}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  if (this.state.open === false) {
                    this.startAnimation();
                  } else {
                    this.closeAnimation();
                  }
                }}
              >
                <LottieView
                  style={styles.lottieView}
                  resizeMode="contain"
                  source={require("../../../assets/animation/menu-btn.json")}
                  progress={this.state.menu}
                />
              </TouchableWithoutFeedback>
              {!this.state.open ? (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push("MessengerLoading")
                    }
                    style={[styles.wallet]}
                  >
                    {this.props.conversation_status ? (
                      <IntercomIcon width={24} height={24} />
                    ) : (
                      <IntercomNotificationIcon
                        width={33}
                        height={33}
                        style={{ marginBottom: 6, marginLeft: 3 }}
                      />
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.props.clearPushToken(
                      this.props.navigation,
                      this.props.userInfo.userid
                    );
                  }}
                  style={styles.logoutIcon}
                >
                  <Icons.LogoutIcon style={styles.icons} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <>
            <Animatable.View
              duration={500}
              onAnimationStart={() =>
                this.state.open && this.setState({ anim: true })
              }
              animation={
                !this.props.loadingAccountMgmt
                  ? this.state.anim
                    ? mySlideOutDown
                    : mySlideInUp
                  : ""
              }
              // onAnimationEnd={() => this.continueCampaign()}
              style={[
                styles.animateView,
                {
                  display: this.state.open ? "none" : "flex"
                }
              ]}
            >
              {!this.props.loading &&
              !this.props.loadingAccountMgmt &&
              this.props.campaignList.length === 0 ? (
                <EmptyCampaigns
                  navigation={this.props.navigation}
                  mainBusiness={
                    this.props.mainBusiness ? this.props.mainBusiness : {}
                  }
                />
              ) : (
                <Container style={styles.container}>
                  <Sidemenu
                    onChange={isOpen => {
                      if (isOpen === false) this._handleSideMenuState(isOpen);
                    }}
                    menuPosition={Localization.isRTL ? "left" : "right"}
                    disableGestures={true}
                    menu={menu}
                    openMenuOffset={wp("85%")}
                    isOpen={this.state.sidemenustate}
                  >
                    <View style={[styles.nameStyle]}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={[styles.text]}
                      >
                        {this.props.mainBusiness
                          ? this.props.mainBusiness.businessname
                          : ""}
                      </Text>
                    </View>

                    <View
                      padder
                      style={[
                        styles.mainCard
                        // { top: this.state.sidemenustate ? 40 : 0 }
                      ]}
                    >
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={[styles.brandStyle]}
                      >
                        {this.props.mainBusiness
                          ? this.props.mainBusiness.brandname
                          : ""}
                      </Text>
                      <View style={styles.sideMenuCard}>
                        <View
                          style={{
                            flexDirection: "column"
                          }}
                        >
                          <Button
                            style={styles.button}
                            onPress={() => {
                              if (!this.props.mainBusiness.snap_ad_account_id) {
                                Segment.trackWithProperties(
                                  "Create SnapAd Acount",
                                  {
                                    category: "Ad Account",
                                    label: "New SnapAd Account",
                                    business_name: this.props.mainBusiness
                                      .businessname,
                                    business_id: this.props.mainBusiness
                                      .businessid
                                  }
                                );
                                this.props.navigation.navigate(
                                  "SnapchatCreateAdAcc"
                                );
                              } else {
                                Segment.trackWithProperties("Create Campaign", {
                                  category: "Campaign Creation"
                                });
                                this.props.navigation.navigate("AdType");
                              }
                            }}
                          >
                            <Icon name="plus" type="MaterialCommunityIcons" />
                          </Button>
                          <Text
                            style={[
                              styles.campaignButtonText,
                              styles.newCampaignTitle
                            ]}
                          >
                            {translate("New Ad")}
                          </Text>
                        </View>
                        <ScrollView
                          style={{
                            height: 90,
                            top: 10
                          }}
                          contentContainerStyle={{
                            flex: 1,
                            alignItems: "flex-start"
                          }}
                          horizontal
                        >
                          {adButtons}
                        </ScrollView>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          height: 50,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 10
                        }}
                      >
                        <View style={{ width: "80%" }}>
                          <SearchBar
                            screenProps={this.props.screenProps}
                            renderSearchBar={this.renderSearchBar}
                          />
                        </View>
                        <Button
                          style={styles.activebutton}
                          onPress={() => {
                            this._handleSideMenuState(true);
                          }}
                        >
                          <FilterIcon width={23} height={23} fill="#575757" />
                        </Button>
                      </View>

                      {this.props.loading ? (
                        placeHolderCards
                      ) : (
                        // <ActivityIndicator size="large" />
                        <Animatable.View duration={1000} animation="fadeIn">
                          <FlatList
                            contentContainerStyle={
                              styles.flatlistContainerStyle
                            }
                            keyExtractor={item => item.campaign_id}
                            data={this.props.filteredCampaigns}
                            onEndReached={() => this.loadMoreData()}
                            onEndReachedThreshold={0.3}
                            renderItem={({ item, index }) => (
                              <CampaignCard
                                campaign={item}
                                navigation={this.props.navigation}
                                key={item.campaign_id}
                                screenProps={this.props.screenProps}
                              />
                            )}
                            onRefresh={() => this.reloadData()}
                            refreshing={this.state.fetching_from_server}
                            ListFooterComponent={() => this.renderFooter()}
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
              duration={800}
              animation={this.state.anim ? "fadeIn" : "fadeOut"}
              style={styles.menuContainer}
            >
              <Menu
                closeAnimation={this.closeAnimation}
                navigation={this.props.navigation}
                screenProps={this.props.screenProps}
              />
            </Animatable.View>
          </>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet,
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
  conversation_status: state.messenger.conversation_status
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
  set_as_seen: check => dispatch(actionCreators.set_as_seen(check))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
