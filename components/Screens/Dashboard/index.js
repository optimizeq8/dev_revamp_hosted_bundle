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
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

import * as actionCreators from "../../../store/actions";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "./FilterMenu";
class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      sidemenustate: false,
      isListEnd: false,
      fetching_from_server: false
    };
    this.page = 1;
  }
  componentDidMount() {
    this.props.getCampaignList(
      this.props.mainBusiness.businessid,
      this.increasePage
    );
  }

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
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }
  render() {
    // const list = this.props.filteredCampaigns.map(campaign => (
    //   <CampaignCard
    //     campaign={campaign}
    //     navigation={this.props.navigation}
    //     key={campaign.campaign_id}
    //   />
    // ));

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
            <Image
              style={styles.image}
              source={require("../../../assets/images/logo01.png")}
              resizeMode="contain"
            />
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
                {
                  //     <Text style={[styles.text, { alignSelf: "center" }]}>
                  //     {this.props.mainBusiness.businessname}
                  //   </Text>
                }
                <View style={{ flexDirection: "row" }}>
                  <Button
                    style={styles.activebutton}
                    onPress={() => {
                      this._handleSideMenuState(true);
                    }}
                  >
                    <FilterIcon width={23} height={23} fill="#fff" />
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
                      New{"\n"}
                      Campaign
                    </Text>
                  </Button>
                  <Button style={styles.activebutton} onPress={() => {}}>
                    <SearchIcon width={23} height={23} stroke="#fff" />
                  </Button>
                </View>
              </View>
              <SearchBar />

              {/* <ScrollView contentContainerStyle={styles.contentContainer}>
              {list}
            </ScrollView> */}
              {this.props.loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Content contentContainerStyle={{ flex: 1 }}>
                  <FlatList
                    style={{ width: "100%" }}
                    keyExtractor={item => item.campaign_id}
                    data={this.props.filteredCampaigns}
                    onEndReached={() => this.loadMoreData()}
                    onEndReachedThreshold={0}
                    renderItem={({ item, index }) => (
                      <CampaignCard
                        campaign={item}
                        navigation={this.props.navigation}
                        key={item.campaign_id}
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    //Adding Load More button as footer component
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
