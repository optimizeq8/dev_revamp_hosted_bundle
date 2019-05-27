import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import { Button, Content, Text, Container } from "native-base";
import LottieView from "lottie-react-native";
import isNull from "lodash/isNull";

import { LinearGradient, Segment } from "expo";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Sidemenu from "react-native-side-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "../../MiniComponents/FilterMenu";
import Menu from "../Menu";
//icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import WalletIcon from "../../../assets/SVGs/Wallet.svg";
import Background from "../../../assets/SVGs/Background";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";
import Axios from "axios";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import * as Animatable from "react-native-animatable";

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
      this.props.getWalletAmount();
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
      Segment.screenWithProperties("Home", {
        business_name: this.props.mainBusiness.businessname,
        business_id: this.props.mainBusiness.businessid
      });
    }
    this.setState({ menu: new Animated.Value(0) });
    this.closeAnimation();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.mainBusiness !== this.props.mainBusiness) {
      if (
        this.props.mainBusiness &&
        !this.props.mainBusiness.snap_ad_account_id
      )
        this.props.navigation.navigate("SnapchatCreateAdAcc", {
          closeAnimation: this.closeAnimation
        });
      this.props.getWalletAmount();
      this.props.getCampaignList(
        this.props.mainBusiness.businessid,
        this.increasePage,
        this.signal.token
      );
      Segment.screenWithProperties("Home", {
        business_name: this.props.mainBusiness.businessname,
        business_id: this.props.mainBusiness.businessid
      });
    }
  }

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
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
          <ActivityIndicator color="black" style={{ margin: 15 }} />
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

    let menu = (
      <FilterMenu
        _handleSideMenuState={this._handleSideMenuState}
        open={this.state.sidemenustate}
      />
    );
    if (isNull(this.props.mainBusiness) && this.props.loadingAccountMgmt) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    } else if (
      isNull(this.props.mainBusiness) &&
      !this.props.loadingAccountMgmt
    ) {
      return (
        <View>
          <Text>ERROR</Text>
        </View>
      );
    } else {
      // console.log("-0--------", this.props.mainBusiness.snap_ad_account_id);
      return (
        <>
          <BackdropIcon style={styles.backDrop} height={hp("100%")} />

          <View
            style={{
              justifyContent: "center",
              zIndex: 13,
              display: this.state.sidemenustate ? "none" : "flex",
              top: 40,
              height: 40
            }}
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
                style={{
                  left: 5,
                  // width: wp(5),
                  height: hp(5),
                  position: "absolute"
                }}
                resizeMode="contain"
                source={require("../../../assets/animation/menu-btn.json")}
                progress={this.state.menu}
              />
            </TouchableWithoutFeedback>
            {!this.state.open && (
              <>
                <Text style={[styles.text]}>
                  {this.props.mainBusiness.brandname}
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Wallet")}
                  style={[styles.wallet]}
                >
                  <WalletIcon width={24} height={24} />
                </TouchableOpacity>
              </>
            )}
          </View>

          <Animatable.View
            duration={500}
            onAnimationStart={() =>
              this.state.open && this.setState({ anim: true })
            }
            animation={this.state.anim ? mySlideOutDown : mySlideInUp}
            style={{
              zIndex: 1,
              display: this.state.open ? "none" : "flex",
              height: hp(100)
            }}
          >
            <Container style={styles.container}>
              <LinearGradient
                colors={[colors.background1, colors.background2]}
                locations={[0.7, 1]}
                style={styles.gradient}
              />

              <Sidemenu
                onChange={isOpen => {
                  if (isOpen === false) this._handleSideMenuState(isOpen);
                }}
                disableGestures={true}
                menu={this.state.sidemenustate ? menu : null}
                menuPosition="right"
                openMenuOffset={wp("85%")}
                isOpen={this.state.sidemenustate}
              >
                <View padder style={[styles.mainCard]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginBottom: 20,
                      paddingBottom: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        style={[
                          styles.activebutton,
                          {
                            backgroundColor: this.state.showSearchBar
                              ? "#FF9D00"
                              : "#fff"
                          }
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
                            Segment.track(
                              "Create SnapAd Acount Button Pressed "
                            );
                            this.props.navigation.navigate(
                              "SnapchatCreateAdAcc"
                            );
                          } else {
                            Segment.track("Create Campaign Button Pressed");
                            this.props.navigation.navigate("AdType");
                          }
                        }}
                      >
                        <Text
                          style={[
                            styles.title,
                            { paddingTop: 0, fontSize: 12 }
                          ]}
                        >
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
                    <Content contentContainerStyle={{ flex: 1 }}>
                      <FlatList
                        contentContainerStyle={{ paddingBottom: hp(35) }}
                        keyExtractor={item => item.campaign_id}
                        data={this.props.filteredCampaigns}
                        onEndReached={() => this.loadMoreData()}
                        onEndReachedThreshold={1}
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
                    </Content>
                  )}
                </View>
              </Sidemenu>
            </Container>
          </Animatable.View>

          <Animatable.View
            duration={800}
            animation={this.state.anim ? "fadeIn" : "fadeOut"}
            style={{ zIndex: 10, height: hp(100), left: 0, top: 0 }}
          >
            <Menu
              closeAnimation={this.closeAnimation}
              navigation={this.props.navigation}
            />
          </Animatable.View>
        </>
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
  campaignList: state.dashboard.campaignList,
  fetching_from_server: state.dashboard.fetching_from_server,
  isListEnd: state.dashboard.isListEnd,
  filteredCampaigns: state.dashboard.filteredCampaigns,
  exponentPushToken: state.login.exponentPushToken
});

const mapDispatchToProps = dispatch => ({
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),
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
