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

// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getCampaignList(this.props.mainBusiness.businessid);
  }
  render() {
    const list = this.props.filteredCampaigns.map(campaign => (
      <CampaignCard
        campaign={campaign}
        navigation={this.props.navigation}
        key={campaign.campaign_id}
      />
    ));
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Image
          style={styles.image}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
        <Card
          padder
          style={[
            styles.mainCard,
            {
              margin: 0,
              shadowColor: "#fff",
              shadowRadius: 1,
              shadowOpacity: 0.7,
              shadowOffset: { width: 8, height: 8 }
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
            <Text style={[styles.text, { alignSelf: "center" }]}>
              {this.props.mainBusiness.businessname}
            </Text>
            <Button
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("AdType");
              }}
            >
              <Text> Create campaign </Text>
            </Button>
          </View>
          <SearchBar />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {list}
          </ScrollView>
        </Card>
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
  getCampaignList: id => dispatch(actionCreators.getCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
