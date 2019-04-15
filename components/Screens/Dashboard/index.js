import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
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
import { LinearGradient } from "expo";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import FilterStatus from "../../MiniComponents/FilterStatus";
import Sidemenu from "react-native-side-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "./FilterMenu";

//icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import OptimizeLogo from "../../../assets/SVGs/Optimize.svg";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      sidemenustate: false,
      isListEnd: false,
      fetching_from_server: false,
      showSearchBar: false
    };
    this.page = 1;
  }
  componentDidMount() {
    console.log("jnojnon");

    this.props.getCampaignList(
      this.props.mainBusiness.businessid,
      this.increasePage
    );
  }

  // componentDidUpdate() {
  //   this.props.getCampaignList(
  //     this.props.mainBusiness.businessid,
  //     this.increasePage
  //   );
  // }
  renderSearchBar = () => {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  };
  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {
      console.log(this.state.sidemenustate);
    });
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
      this.increasePage
    );
  };
  render() {
    let menu = (
      <FilterMenu
        _handleSideMenuState={this._handleSideMenuState}
        open={this.state.sidemenustate}
      />
    );
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
            <OptimizeLogo style={styles.image} />
            <Text style={[styles.text]}>
              {this.props.mainBusiness.businessname}
            </Text>
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
                      this.props.navigation.navigate("AdType");
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
                    contentContainerStyle={{ paddingBottom: 100 }}
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

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loading: state.auth.loading,
  mainBusiness: state.auth.mainBusiness,
  campaignList: state.auth.campaignList,
  fetching_from_server: state.auth.fetching_from_server,
  isListEnd: state.auth.isListEnd,
  filteredCampaigns: state.auth.filteredCampaigns
});

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id)),
  updateCampaignList: (id, page, increasePage) =>
    dispatch(actionCreators.updateCampaignList(id, page, increasePage)),
  onSelect: query => dispatch(actionCreators.filterCampaignsStatus(query)),
  getCampaignList: (id, increasePage) =>
    dispatch(actionCreators.getCampaignList(id, increasePage))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
