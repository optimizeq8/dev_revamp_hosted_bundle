import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { Button, Text, Container } from "native-base";
import { LinearGradient } from "expo";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import LottieView from "lottie-react-native";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import SlidingUpPanel from "rn-sliding-up-panel";
import BusinessList from "../BusinessList/index";
import { Transition } from "react-navigation-fluid-transitions";
class Menu extends Component {
  _draggedValue = new Animated.Value(0);
  static defaultProps = {
    draggableRange: {
      top: heightPercentageToDP("100"),
      bottom: -heightPercentageToDP("115")
    }
  };
  constructor(props) {
    super(props);
    this.state = { slidePanel: false };
  }
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
              <TouchableWithoutFeedback
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
              </TouchableWithoutFeedback>
            </View>
          </Transition>
          <View
            style={{
              marginTop: heightPercentageToDP("8.7%")
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.clearPushToken(this.props.navigation);
            }}
          >
            <Icons.LogoutIcon style={styles.logoutIcon} />
          </TouchableWithoutFeedback>
          <View>
            <Transition shared="menu">
              <Text style={styles.businessTitle}>
                {!this.props.mainBusiness
                  ? ""
                  : this.props.mainBusiness.businessname}
              </Text>
            </Transition>
            <View
              style={{
                marginBottom: heightPercentageToDP("10")
              }}
            >
              <Button
                style={[
                  styles.button,
                  {
                    elevation: this.state.slidePanel ? -1 : 1
                    // zIndex: this.state.slidePanel ? -1 : 1
                  }
                ]}
                onPress={() => this.slidePanelShow()}
              >
                <Text>Switch Account</Text>
              </Button>
              <BackdropIcon style={styles.backDrop} />

              {/* <Icons.DropDownIcon
                style={styles.DropIcon}
              /> */}
            </View>

            <View
              style={{
                paddingLeft: 20,
                flexDirection: "column",
                justifyContent: "space-evenly"
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate("PersonalInfo")}
              >
                <View style={styles.options}>
                  <Icons.PersonalInfo />
                  <Text style={styles.text}>Personal{"\n    "}Info</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate("TransactionList")
                }
              >
                <View style={[styles.options, { paddingLeft: 15 }]}>
                  <Icons.TransactionIcon />
                  <Text style={styles.text}> Transactions</Text>
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "column"
                }}
              >
                <View style={styles.options}>
                  <Icons.BusinessIcon />
                  <Text style={styles.text}>Business{"\n    "}Info</Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate("ChangePassword")
                  }
                >
                  <View style={styles.options}>
                    <Icons.ChangePassIcon />
                    <Text style={[styles.text]}> Change{"\n"}Password</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate("AddressForm")}
              >
                <View style={styles.options}>
                  <Icons.AddressIcon />
                  <Text style={styles.text}>Addresses</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate("AddCredits")}
              >
                <View
                  style={{
                    alignItems: "center",
                    left: widthPercentageToDP(4),
                    marginBottom: 20,
                    flexDirection: "row"
                  }}
                >
                  <Icons.Wallet />
                  <Text style={styles.text}>{"    "}Wallet</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.clearPushToken(this.props.navigation);
                }}
              >
                <View style={styles.options}>
                  <Icons.LogoutIcon />
                  <Text style={styles.text}>{"   "}Logout</Text>
                </View>
              </TouchableWithoutFeedback>
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
  mainBusiness: state.auth.mainBusiness,
  campaignList: state.auth.campaignList
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
)(Menu);
