import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Thumbnail,
  Spinner
} from "native-base";
import LottieView from "lottie-react-native";

import { LinearGradient, Segment } from "expo";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import FilterStatus from "../../MiniComponents/FilterStatus";
import Sidemenu from "react-native-side-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "../../MiniComponents/FilterMenu";

//icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import OptimizeLogo from "../../../assets/SVGs/Optimize.svg";

// Style
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";
import Axios from "axios";
import { Transition } from "react-navigation-fluid-transitions";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
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
      open: false
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
      if (!this.props.mainBusiness.snap_ad_account_id)
        this.props.navigation.navigate("SnapchatCreateAdAcc");
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
    Animated.timing(this.state.menu, {
      toValue: 1,
      duration: 350
    }).start(() => {
      this.props.navigation.navigate("Menu", {
        open: true,
        closeAnimation: this.closeAnimation,
        menu: this.state.menu
      });
      this.setState({ open: true });
    });
  };
  closeAnimation = () => {
    Animated.timing(this.state.menu, {
      toValue: 0,
      duration: 350
    }).start(() => {
      this.setState({ open: false }, () => this.props.navigation.pop());
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
    let menu = (
      <FilterMenu
        _handleSideMenuState={this._handleSideMenuState}
        open={this.state.sidemenustate}
      />
    );
    if (!this.props.mainBusiness) {
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
    } else {
      console.log("-0--------", this.props.mainBusiness.snap_ad_account_id);
      return (
        <Container style={styles.container}>
          <>
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
              menu={menu}
              menuPosition="right"
              openMenuOffset={wp("85%")}
              isOpen={this.state.sidemenustate}
            >
              <Transition shared="close">
                <View
                  style={{
                    justifyContent: "center",
                    top: hp(3),
                    left: wp(5),
                    zIndex: 10,
                    paddingBottom: 30,
                    marginBottom: -hp(5)
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
                        width: wp(5),
                        height: hp(5)
                        // top: hp(1.2),
                        // left: wp(1.67)
                      }}
                      resizeMode="contain"
                      source={require("../../../assets/animation/menu-btn.json")}
                      progress={this.state.menu}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </Transition>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../../assets/images/logo02.png")}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  bottom: hp(6.5),
                  height: 60
                }}
              >
                <Transition shared="menu">
                  <Text style={[styles.text]}>
                    {this.props.mainBusiness.businessname}
                  </Text>
                </Transition>
                {this.props.wallet > 0 && (
                  <View
                    style={{
                      bottom: hp(2),
                      right: wp(3)
                    }}
                  >
                    <Icon
                      name="info"
                      type="MaterialIcons"
                      style={{
                        color: "#fff",
                        fontSize: 19,
                        position: "relative",
                        top: "40%"
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        globalStyles.numbers,
                        {
                          paddingLeft: 20,
                          fontSize: wp(6),
                          fontFamily: "montserrat-semibold",
                          width:
                            this.props.wallet.toString().length > 7
                              ? wp(50)
                              : "100%"
                        }
                      ]}
                    >
                      <Text
                        style={[
                          globalStyles.numbers,
                          {
                            paddingHorizontal: 0,
                            fontSize: 15,
                            fontFamily: "montserrat-semibold"
                          }
                        ]}
                      >
                        $
                      </Text>
                      {this.props.wallet}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        { fontSize: 10, top: 0, alignSelf: "center" }
                      ]}
                    >
                      Wallet Balance
                    </Text>
                  </View>
                )}
              </View>
              <View
                padder
                style={[
                  styles.mainCard,
                  {
                    margin: 0
                  }
                ]}
              >
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
                          Segment.track("Create SnapAd Acount Button Pressed ");
                          this.props.navigation.navigate("SnapchatCreateAdAcc");
                        } else {
                          Segment.track("Create Campaign Button Pressed");
                          this.props.navigation.navigate("AdType");
                        }
                      }}
                    >
                      <Text
                        style={[styles.title, { paddingTop: 0, fontSize: 12 }]}
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

                {/* <ScrollView contentContainerStyle={styles.contentContainer}>
              {list}
            </ScrollView> */}
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
          </>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  wallet: state.transA.wallet,
  loading: state.auth.loading,
  mainBusiness: state.auth.mainBusiness,
  campaignList: state.auth.campaignList,
  fetching_from_server: state.auth.fetching_from_server,
  isListEnd: state.auth.isListEnd,
  filteredCampaigns: state.auth.filteredCampaigns,
  exponentPushToken: state.auth.exponentPushToken
});

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id)),
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
