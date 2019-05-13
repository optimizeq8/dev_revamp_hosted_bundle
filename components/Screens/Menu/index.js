import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { Button, Text, Container } from "native-base";
import { LinearGradient } from "expo";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import LottieView from "lottie-react-native";

import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import SlidingUpPanel from "rn-sliding-up-panel";
import BusinessList from "../BusinessList/index";
import { Transition } from "react-navigation-fluid-transitions";
import Background from "../../../assets/SVGs/Background";
import DownArrowIcon from "../../../assets/SVGs/MenuIcons/DownArrowIcon";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";

class Menu extends Component {
  _draggedValue = new Animated.Value(0);
  static defaultProps = {
    draggableRange: {
      top: heightPercentageToDP("107"),
      bottom: -heightPercentageToDP("115")
    }
  };
  constructor(props) {
    super(props);
    this.state = { slidePanel: false };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.state.params.closeAnimation();
  };
  showPanel() {
    Animated.timing(this._draggedValue, {
      toValue: this.props.draggableRange.top / 1.35,
      easing: Easing.elastic(1), // Springy
      duration: 250
    }).start();
  }
  slidePanelShow() {
    if (this.state.slidePanel) {
      this._panel.hide();
      this.setState({ slidePanel: false });
    } else {
      this.showPanel();
      this.setState({ slidePanel: true });
    }
  }

  render() {
    return (
      <Container style={[styles.menuModal]}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        >
          <BackdropIcon
            style={styles.backDrop}
            height={heightPercentageToDP("100%")}
          />
          <Background
            style={[styles.background, { zIndex: 0 }]}
            width={widthPercentageToDP(85)}
            height={heightPercentageToDP(61)}
          />
          <Transition shared="close">
            <View
              style={{
                justifyContent: "center",
                top: heightPercentageToDP(11),
                left: widthPercentageToDP(5),
                zIndex: 10,
                paddingBottom: 30,
                marginBottom: -heightPercentageToDP(5)
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.state.params.closeAnimation();
                }}
              >
                <LottieView
                  style={{
                    width: widthPercentageToDP(5),
                    height: heightPercentageToDP(5),
                    // top: heightPercentageToDP(0.85),
                    // left: widthPercentageToDP(1.5),
                    zIndex: 10
                  }}
                  resizeMode="contain"
                  source={require("../../../assets/animation/menu-btn.json")}
                  progress={
                    (this.props.navigation.state.params &&
                      this.props.navigation.state.params.menu) ||
                    1
                  }
                />
              </TouchableOpacity>
            </View>
          </Transition>

          <TouchableOpacity
            onPress={() => {
              this.props.clearPushToken(
                this.props.navigation,
                this.props.userInfo.userid
              );
            }}
            style={styles.logoutIcon}
          >
            <Icons.LogoutIcon style={styles.icons} />
          </TouchableOpacity>

          <View
            style={{ marginTop: heightPercentageToDP("8.7%"), marginBottom: 0 }}
          >
            <Text style={styles.menutext}> Menu </Text>
            <Transition appear="scale" disappear="scale" shared="menu">
              <Text style={styles.businessTitle}>
                {!this.props.mainBusiness
                  ? ""
                  : this.props.mainBusiness.brandname}
              </Text>
            </Transition>
            <Text style={styles.businessname}>
              {this.props.mainBusiness.businessname}
            </Text>
            <Button
              style={[
                styles.button,
                {
                  //elevation: this.state.slidePanel ? -1 : 1
                  //zIndex: this.state.slidePanel ? -1 : 1
                }
              ]}
              onPress={() => this.slidePanelShow()}
            >
              <Text style={styles.buttontext}>Switch Account </Text>
              <DownArrowIcon
                style={{ marginLeft: 5, right: 20, top: 1 }}
                stroke="#fff"
              />
            </Button>
            <View>
              {/* <Icons.DropDownIcon style={styles.icons}
                style={styles.DropIcon}
              /> */}
            </View>

            <View
              style={{
                paddingLeft: 20
                // flexDirection: "column"
                // justifyContent: "space-evenly"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("PersonalInfo")}
              >
                <View style={styles.options}>
                  <Icons.PersonalInfo style={styles.icons} />
                  <Text style={styles.text}>Personal Info</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddCredits")}
              >
                <View
                  style={{
                    alignItems: "center",
                    left: widthPercentageToDP(4),
                    marginBottom: 20,
                    marginTop: 10,
                    flexDirection: "row"
                  }}
                >
                  <Icons.Wallet style={[styles.icons, { marginRight: 15 }]} />
                  <Text style={styles.text}>Wallet</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("TransactionList")
                }
              >
                <View style={[styles.options]}>
                  <Icons.TransactionIcon style={styles.icons} />
                  <Text style={styles.text}>Transactions</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column"
                }}
              >
                {/*<View style={styles.options}>
                  <Icons.BusinessIcon style={styles.icons} />
                  <Text style={styles.text}>Business Info</Text>
                </View>*/}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ChangePassword")
                  }
                >
                  <View style={styles.options}>
                    <Icons.ChangePassIcon style={styles.icons} />
                    <Text style={[styles.text]}>Change Password</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddressForm")}
              >
                <View style={styles.options}>
                  <Icons.AddressIcon style={styles.icons} />
                  <Text style={styles.text}>Addresses</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.clearPushToken(
                    this.props.navigation,
                    this.props.userInfo.userid
                  );
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    left: widthPercentageToDP(4),
                    marginBottom: 20,
                    marginTop: 10,
                    flexDirection: "row"
                  }}
                >
                  <Icons.LogoutIcon
                    style={[styles.icons, { marginRight: 16 }]}
                  />
                  <Text style={styles.text}>Logout</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.text}>{this.props.exponentPushToken}</Text>
            </View>
          </View>

          <SlidingUpPanel
            showBackdrop={false}
            ref={c => (this._panel = c)}
            draggableRange={this.props.draggableRange}
            allowDragging={false}
            animatedValue={this._draggedValue}
          >
            <>
              <Icons.CloseListIcon
                style={styles.icons}
                onPress={() => this.slidePanelShow()}
                style={styles.CloseIcon}
              />
              <BusinessList navigation={this.props.navigation} />
            </>
          </SlidingUpPanel>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  campaignList: state.dashboard.campaignList,
  exponentPushToken: state.login.exponentPushToken
});
const mapDispatchToProps = dispatch => ({
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  createBusinessAccount: account =>
    dispatch(actionCreators.createBusinessAccount(account)),
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
