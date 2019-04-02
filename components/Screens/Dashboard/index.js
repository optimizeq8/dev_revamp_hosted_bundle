import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView, TouchableOpacity } from "react-native";
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

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      sidemenustate: false
    };
  }
  componentDidMount() {
    this.props.getCampaignList(this.props.mainBusiness.businessid);
  }
  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {
      console.log(this.state.sidemenustate);
    });
  };

  render() {
    const list = this.props.filteredCampaigns.map(campaign => (
      <CampaignCard
        campaign={campaign}
        navigation={this.props.navigation}
        key={campaign.campaign_id}
      />
    ));

    let menu = (
      <>
        <View
          style={{
            flex: 1,
            top: "20%",
            alignItems: "center",
            flexDirection: "colum",
            opacity: 1
          }}
        >
          <View
            style={{
              felx: 1,
              justifyContent: "flex-start",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <FilterIcon width={60} height={60} fill="#fff" />
            <Text style={[styles.title]}> Filter </Text>
          </View>
          <Text style={[styles.subtext]}>
            Select which Ads you'd like to see
          </Text>

          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 10
            }}
          >
            <Text style={[styles.title, { paddingBottom: 10 }]}>
              Ad Activity
            </Text>
            <FilterStatus />
            <Text style={[styles.title]}> Date </Text>
          </View>
        </View>
        <Button
          style={[styles.checkbutton, { marginBottom: 35 }]}
          onPress={() => this._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Sidemenu
          onChange={isOpen => {
            console.log("State", isOpen);
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
                  <Text style={[styles.title, { paddingTop: 0, fontSize: 12 }]}>
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

            <ScrollView contentContainerStyle={styles.contentContainer}>
              {list}
            </ScrollView>
          </View>
        </Sidemenu>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.auth.mainBusiness,
  campaignList: state.auth.campaignList,
  filteredCampaigns: state.auth.filteredCampaigns
});

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id)),
  getCampaignList: id => dispatch(actionCreators.getCampaignList(id)),
  onSelect: query => dispatch(actionCreators.filterCampaignsStatus(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
