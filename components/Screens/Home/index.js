import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView } from "react-native";
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

// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.mainBusiness !== this.props.mainBusiness &&
      this.props.mainBusiness
    ) {
      this.props.getCampaignList(this.props.mainBusiness.businessid);
    }
  }
  render() {
    if (!this.props.mainBusiness) {
      return <Spinner color="red" />;
    } else
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
          <Card padder style={styles.mainCard}>
            <Text style={styles.link}>
              Welcome {"\n"}
              {this.props.userInfo.firstname}
            </Text>
            <Text style={styles.text}>
              You’re one step away from
              {"\n"} Optimizing your digital Ads
            </Text>
            <Button
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => {
                this.props.logout(this.props.navigation);
              }}
            >
              <Text> Logout </Text>
            </Button>
            <Button
              style={[styles.button]}
              onPress={() => {
                this.props.navigation.navigate("CreateBusinessAccount");
              }}
            >
              <Text> Create New Business </Text>
            </Button>

            <Button
              style={[styles.button]}
              onPress={() => {
                this.props.navigation.navigate("BusinessList");
              }}
            >
              <Text> Business List </Text>
            </Button>
          </Card>
          <View>
            <Card padder style={styles.bottomCard}>
              <Button
                block
                style={styles.snapbutton}
                onPress={() => {
                  if (this.props.mainBusiness.snap_ad_account_id === "")
                    this.props.navigation.push("SnapchatCreateAdAcc");
                  else {
                    this.props.navigation.push("Dashboard");
                  }
                }}
              >
                {this.props.mainBusiness.snap_ad_account_id === "" ? (
                  <Image
                    style={styles.imageIcon}
                    source={require("../../../assets/images/snap-ghost.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={{ color: "#000" }}> Dashboard </Text>
                )}
              </Button>
            </Card>
          </View>
        </Container>
      );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.auth.mainBusiness,
  campaignList: state.auth.campaignList
});
const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation)),
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  createBusinessAccount: account =>
    dispatch(actionCreators.createBusinessAccount(account)),
  getCampaignList: id => dispatch(actionCreators.getCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
