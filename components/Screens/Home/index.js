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
  Thumbnail
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
  render() {
    const Slide = ({ title }) => (
      <View style={styles.slide}>
        <Image
          style={{
            height: 250,
            width: 250
          }}
          source={require("../../../assets/images/tutorial/inst01.png")}
          resizeMode="contain"
        />
      </View>
    );
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
            {this.props.userInfo.businessname}
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
            onPress={() => {
              this.props.navigation.navigate("CreateBusinessAccount");
            }}
          >
            <Text> Get B Accs </Text>
          </Button>
        </Card>
        <View>
          <Card padder style={styles.bottomCard}>
            <Button
              style={styles.button}
              onPress={() => {
                if (this.props.userInfo.ad_account_id === "")
                  this.props.navigation.push("SnapchatCreateAdAcc");
                else {
                  this.props.navigation.push("Dashboard");
                }
              }}
            >
              {this.props.userInfo.ad_account_id === "" ? (
                <Image
                  style={styles.imageIcon}
                  source={require("../../../assets/images/snap-ghost.png")}
                  resizeMode="contain"
                />
              ) : (
                <Text> Dashboard </Text>
              )}
            </Button>
          </Card>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});
const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation)),
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  createBusinessAccount: account =>
    dispatch(actionCreators.createBusinessAccount(account))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
