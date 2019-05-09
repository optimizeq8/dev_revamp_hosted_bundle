import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
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
import { Modal } from "react-native-paper";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import { LinearGradient } from "expo";
import LottieView from "lottie-react-native";
import Menu from "../Menu";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { Transition } from "react-navigation-fluid-transitions";

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

  componentDidMount() {
    this.setState({ menu: new Animated.Value(0) });
    this.closeAnimation();
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.mainBusiness !== this.props.mainBusiness &&
  //     this.props.mainBusiness
  //   ) {
  //     this.props.updateCampaignList(this.props.mainBusiness.businessid);
  //   }
  // }

  render() {
    if (!this.props.mainBusiness) {
      return <LoadingScreen top={0} />;
    } else {
      return (
        <>
          <Transition shared="close">
            <View
              style={{
                justifyContent: "center",
                marginTop: heightPercentageToDP("5%"),
                marginLeft: 20,
                zIndex: 1000
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
          </Transition>
          <Container style={styles.container}>
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              locations={[0.7, 1]}
              style={styles.gradient}
            />

            <Image
              style={styles.image}
              source={require("../../../assets/images/logo01.png")}
              resizeMode="contain"
            />
            <Card padder style={styles.mainCard}>
              <Transition shared="menu">
                <Text style={styles.link}>
                  {this.props.mainBusiness.businessname}
                  {/* Welcome {"\n"} */}
                  {/* {this.props.userInfo.firstname} */}
                </Text>
              </Transition>

              <Text style={styles.text}>
                You’re one step away from
                {"\n"} Optimizing your digital Ads
              </Text>

              <Button
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => {
                  this.props.clearPushToken(this.props.navigation);
                }}
              >
                <Text> Log out </Text>
              </Button>

              <Button
                style={[styles.button]}
                onPress={() => this.props.navigation.navigate("PaymentForm")}
              >
                <Text> PaymentForm </Text>
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
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  campaignList: state.dashboard.campaignList
});
const mapDispatchToProps = dispatch => ({
  clearPushToken: navigation =>
    dispatch(actionCreators.clearPushToken(navigation)),
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  createBusinessAccount: account =>
    dispatch(actionCreators.createBusinessAccount(account)),
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
