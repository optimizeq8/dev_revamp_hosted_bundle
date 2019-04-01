import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet
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
import LottieView from "lottie-react-native";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      menu: new Animated.Value(0),
      open: false
    };
  }

  startAnimation = () => {
    Animated.timing(this.state.menu, {
      toValue: 1,
      duration: 350
    }).start(() => {
      this.setState({ open: true });
    });
  };
  closeAnimation = () => {
    Animated.timing(this.state.menu, {
      toValue: 0,
      duration: 350
    }).start(() => {
      this.setState({ open: false });
    });
  };

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
    } else {
      return (
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <View
            style={{
              justifyContent: "center",
              marginTop: 10,
              marginLeft: 20
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
                  width: 50,
                  height: 47
                }}
                resizeMode="contain"
                source={require("../../../assets/animation/menu-btn.json")}
                progress={this.state.menu}
              />
            </TouchableWithoutFeedback>
          </View>

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

            <Button
              style={[styles.button]}
              onPress={() => this.props.navigation.navigate("AdDetails")}
            >
              <Text> Test </Text>
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
