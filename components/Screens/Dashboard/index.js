import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import { Button, Text, Container } from "native-base";
import LottieView from "lottie-react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import { Segment } from "expo";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Sidemenu from "react-native-side-menu";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "../../MiniComponents/FilterMenu";
import Axios from "axios";
import Menu from "../Menu";
import * as Animatable from "react-native-animatable";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

//icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import WalletIcon from "../../../assets/SVGs/Wallet.svg";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";

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
      anim: false
    };
    this.page = 1;
  }
  componentDidMount() {
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
      Segment.screen("Dashboard");
    }
    this.setState({ menu: new Animated.Value(0) });
    this.closeAnimation();
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
      prevProps.mainBusiness !== this.props.mainBusiness
    ) {
      if (
        this.props.mainBusiness &&
        !this.props.mainBusiness.snap_ad_account_id
      )
        this.props.navigation.navigate("SnapchatCreateAdAcc", {
          closeAnimation: this.closeAnimation
        });
      // this.props.getWalletAmount();
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
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

  increasePage = () => {
    this.page = this.page + 1;
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
    this.props.getCampaignList(
      this.props.mainBusiness.businessid,
      this.increasePage,
      this.signal.token
    );
  };
  render() {
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

    let menu = !this.state.open ? (
      <FilterMenu
        _handleSideMenuState={this._handleSideMenuState}
        open={this.state.sidemenustate}
      />
    ) : null;

    if (
      (isNull(this.props.mainBusiness) ||
        isUndefined(this.props.mainBusiness)) &&
      this.props.loadingAccountMgmt
    ) {
      return (
        <>
          <LoadingScreen dash={true} top={0} />
        </>
      );
    } else if (this.props.businessLoadError) {
      return (
        <ErrorComponent
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
                  <Text style={[styles.text]}>
                    {!this.props.mainBusiness
                      ? ""
                      : this.props.mainBusiness.brandname}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Wallet")}
                    style={[styles.wallet]}
                  >
                    <WalletIcon width={24} height={24} />
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
          <Animatable.View
            duration={500}
            onAnimationStart={() =>
              this.state.open && this.setState({ anim: true })
            }
            animation={this.state.anim ? mySlideOutDown : mySlideInUp}
            style={[
              styles.animateView,
              {
                display: this.state.open ? "none" : "flex"
              }
            ]}
          >
            <Container style={styles.container}>
              <Sidemenu
                onChange={isOpen => {
                  if (isOpen === false) this._handleSideMenuState(isOpen);
                }}
                disableGestures={true}
                menu={menu}
                menuPosition="right"
                openMenuOffset={wp("85%")}
                isOpen={this.state.sidemenustate}
              >
                <View
                  padder
                  style={[
                    styles.mainCard,
                    { top: this.state.sidemenustate ? 40 : 0 }
                  ]}
                >
                  <View style={styles.sideMenuCard}>
                    <View style={styles.sideMenuTop}>
                      <Button
                        style={[
                          styles.activebutton,
                          this.state.showSearchBar
                            ? globalStyles.orangeBackgroundColor
                            : globalStyles.whiteBackgroundColor
                        ]}
                        onPress={this.renderSearchBar}
                      >
                        <SearchIcon
                          width={23}
                          height={23}
                          stroke={this.state.showSearchBar ? "#fff" : "#575757"}
                        />
                      </Button>
                      <Button
                        style={styles.button}
                        onPress={() => {
                          if (!this.props.mainBusiness.snap_ad_account_id) {
                            Segment.trackWithProperties(
                              "Create SnapAd Acount",
                              {
                                category: "Ad Account",
                                label: "New SnapAd Account"
                                // business_name: this.props.mainBusiness
                                //   .businessname,
                                // business_id: this.props.mainBusiness.businessid
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
                        <Text style={[styles.title, styles.newCampaignTitle]}>
                          New {"\n"}
                          Campaign
                        </Text>
                      </Button>

                      <Button
                        style={styles.activebutton}
                        onPress={() => {
                          this._handleSideMenuState(true);
                        }}
                      >
                        <FilterIcon width={23} height={23} fill="#575757" />
                      </Button>
                    </View>
                  </View>
                  {this.state.showSearchBar && (
                    <SearchBar renderSearchBar={this.renderSearchBar} />
                  )}
                  {this.props.loading ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <FlatList
                      contentContainerStyle={styles.flatlistContainerStyle}
                      keyExtractor={item => item.campaign_id}
                      data={this.props.filteredCampaigns}
                      onEndReached={() => this.loadMoreData()}
                      onEndReachedThreshold={0.3}
                      renderItem={({ item, index }) => (
                        <CampaignCard
                          campaign={item}
                          navigation={this.props.navigation}
                          key={item.campaign_id}
                        />
                      )}
                      onRefresh={() => this.reloadData()}
                      refreshing={this.state.fetching_from_server}
                      ListFooterComponent={() => this.renderFooter()}
                    />
                  )}
                </View>
              </Sidemenu>
            </Container>
            <NavigationEvents
              onDidFocus={() => {
                Segment.screen("Dashboard");
              }}
            />
          </Animatable.View>
          <Animatable.View
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
            />
          </Animatable.View>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet,
  loading: state.dashboard.loading,
  loadingAccountMgmt: state.account.loading,
  mainBusiness: state.account.mainBusiness,
  businessLoadError: state.account.businessLoadError,
  campaignList: state.dashboard.campaignList,
  fetching_from_server: state.dashboard.fetching_from_server,
  isListEnd: state.dashboard.isListEnd,
  filteredCampaigns: state.dashboard.filteredCampaigns,
  exponentPushToken: state.login.exponentPushToken
});

const mapDispatchToProps = dispatch => ({
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  updateCampaignList: (id, page, increasePage) =>
    dispatch(actionCreators.updateCampaignList(id, page, increasePage)),
  onSelect: query => dispatch(actionCreators.filterCampaignsStatus(query)),
  getCampaignList: (id, increasePage, cancelToken) =>
    dispatch(actionCreators.getCampaignList(id, increasePage, cancelToken))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
