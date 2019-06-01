import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { Button, Text, Container, Icon } from "native-base";
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
import Background from "../../../assets/SVGs/Background";
import DownArrowIcon from "../../../assets/SVGs/MenuIcons/DownArrowIcon";

//browser
import { openPrivacy, openTerms } from "../../Terms&Condtions";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";

class Menu extends Component {
  _draggedValue = new Animated.Value(0);

  draggableRange = {
    top: heightPercentageToDP("90"),
    bottom: -heightPercentageToDP("120")
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
    this.props.closeAnimation();
    this.closePanel();
    return true;
  };
  showPanel() {
    Animated.timing(this._draggedValue, {
      toValue: this.draggableRange.top,
      easing: Easing.elastic(1), // Springy
      duration: 250
    }).start();
  }
  closePanel = () => {
    this._panel.hide();
    this.setState({ slidePanel: false });
  };
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
        <Background
          style={[styles.background]}
          width={widthPercentageToDP(85)}
          height={heightPercentageToDP(61)}
        />

        {/* <TouchableOpacity
          onPress={() => {
            this.props.clearPushToken(
              this.props.navigation,
              this.props.userInfo.userid
            );
          }}
          style={styles.logoutIcon}
        >
          <Icons.LogoutIcon style={styles.icons} />
        </TouchableOpacity> */}

        <View
          style={{
            bottom: heightPercentageToDP(5) < 30 ? 10 : 0,
            marginBottom: 0,
            backgroundColor: "#0000"
          }}
        >
          <Text style={styles.menutext}> Menu </Text>
          <Text style={styles.businessTitle}>
            {!this.props.mainBusiness ? "" : this.props.mainBusiness.brandname}
          </Text>
          <Text style={styles.businessname}>
            {this.props.mainBusiness.businessname}
          </Text>
          <Button
            style={[
              styles.button,
              {
                elevation: this.state.slidePanel ? -1 : 1
                //zIndex: this.state.slidePanel ? -1 : 1
              }
            ]}
            onPress={() => this.slidePanelShow()}
          >
            <Text style={styles.buttontext}>Switch Account</Text>
            <DownArrowIcon
              style={{ marginLeft: 5, right: 20, top: 1 }}
              stroke="#fff"
            />
          </Button>

          <View
            style={{
              paddingLeft: 20,
              bottom: heightPercentageToDP(5) < 30 ? 10 : 0
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
              onPress={() => this.props.navigation.navigate("Wallet")}
            >
              <View
                style={{
                  alignItems: "center",
                  left: widthPercentageToDP(4),
                  marginBottom: heightPercentageToDP(5) < 30 ? 5 : 10,
                  marginTop: 10,
                  flexDirection: "row"
                }}
              >
                <Icons.Wallet style={[styles.icons, { marginRight: 15 }]} />
                <Text style={styles.text}>Wallet</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TransactionList")}
            >
              <View style={[styles.options]}>
                <Icons.TransactionIcon style={styles.icons} />
                <Text style={styles.text}>Transactions</Text>
              </View>
            </TouchableOpacity>
            {/*<View
              style={{
                flexDirection: "column"
              }}
            >
            <View style={styles.options}>
                  <Icons.BusinessIcon style={styles.icons} />
                  <Text style={styles.text}>Business Info</Text>
                </View>*/}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              <View style={styles.options}>
                <Icons.ChangePassIcon style={styles.icons} />
                <Text style={[styles.text]}>Change Password</Text>
              </View>
            </TouchableOpacity>
            {/* </View> */}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddressForm")}
            >
              <View style={styles.options}>
                <Icons.AddressIcon style={styles.icons} />
                <Text style={styles.text}>Address</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openPrivacy()}>
              <View
                style={[
                  styles.options,
                  { marginBottom: heightPercentageToDP(5) < 30 ? 9 : 5 }
                ]}
              >
                <Icon
                  name="security"
                  type="MaterialIcons"
                  style={[styles.icons]}
                />
                <Text style={styles.text}>Privacy policy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openTerms()}>
              <View style={styles.options}>
                <Icon
                  name="file-document-box"
                  type="MaterialCommunityIcons"
                  style={[
                    styles.icons,
                    { top: heightPercentageToDP(5) < 30 ? 0 : 2 }
                  ]}
                />
                <Text style={styles.text}>Terms & Condtions</Text>
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
                  style={[styles.icons, { marginRight: 16, right: 3 }]}
                />
                <Text style={styles.text}>Logout</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.version}>Version:0.1.2/8/7</Text>
          </View>
        </View>

        <SlidingUpPanel
          showBackdrop={false}
          ref={c => (this._panel = c)}
          draggableRange={this.draggableRange}
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
