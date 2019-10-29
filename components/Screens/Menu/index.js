import React, { Component } from "react";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  I18nManager,
  Image
} from "react-native";
import { Button, Text, Container, Icon } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
import BusinessList from "../BusinessList";
import Constants from "expo-constants";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
// Icons
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import Background from "../../../assets/SVGs/Background";
import Logo from "../../../assets/SVGs/Optimize";
import DownArrowIcon from "../../../assets/SVGs/MenuIcons/DownArrowIcon";

//browser
import { openPrivacy, openTerms } from "../../Terms&Conditions";

// Style
import styles from "./styles";
import rtlStyles from "./rtlStyles";
// Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

//Functions
import isStringArabic from "../../isStringArabic";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
const imageLogo = require("../../../assets/images/logo01.png");

class Menu extends Component {
  _draggedValue = new Animated.Value(0);

  draggableRange = {
    top: hp("84"),
    bottom: -hp("120")
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
    this.closePanel();

    this.props.closeAnimation();
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
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[{ top: 10 }]}
      >
        <Container style={[styles.menuModal]}>
          <View style={styles.menuContainer}>
            <Logo
              style={{ alignSelf: "center" }}
              width={heightPercentageToDP(10)}
              height={heightPercentageToDP(10)}
            />
            <Text style={styles.logoText}>Optimize</Text>
            <Text
              style={[
                styles.businessTitle,
                this.props.mainBusiness &&
                this.props.mainBusiness.brandname &&
                !isStringArabic(this.props.mainBusiness.brandname)
                  ? {
                      fontFamily: "montserrat-regular-english"
                    }
                  : {}
              ]}
            >
              {!this.props.mainBusiness
                ? ""
                : this.props.mainBusiness.brandname}
            </Text>
            <Text
              style={[
                styles.businessname,
                this.props.mainBusiness &&
                this.props.mainBusiness.businessname &&
                !isStringArabic(this.props.mainBusiness.businessname)
                  ? {
                      fontFamily: "montserrat-regular-english"
                    }
                  : {}
              ]}
            >
              {!this.props.mainBusiness
                ? ""
                : this.props.mainBusiness.businessname}
            </Text>
            <Button
              style={[styles.button]}
              onPress={() => this.slidePanelShow()}
            >
              <Text style={styles.buttonText}>
                {translate("Switch Account")}
              </Text>
              <DownArrowIcon style={styles.switchArrowIcon} stroke="#fff" />
            </Button>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <TouchableOpacity
                style={styles.options}
                onPress={() => this.props.navigation.navigate("PersonalInfo")}
              >
                <Icons.PersonalInfo style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Personal Info")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => this.props.navigation.navigate("Wallet")}
              >
                <Icons.Wallet style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Wallet")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("TransactionList")
                }
              >
                <Icons.TransactionIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Transactions")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ChangePassword")}
                style={styles.options}
              >
                <Icons.ChangePassIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Change Password")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddressForm")}
                style={styles.options}
              >
                <Icons.AddressIcon style={styles.icons} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Address")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    url: "https://www.optimizeapp.com/privacy",
                    title: "Privacy Policy"
                  })
                }
              >
                <Icon
                  name="security"
                  type="MaterialIcons"
                  style={[styles.icons]}
                />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Privacy Policy")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.options}
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    url: "https://www.optimizeapp.com/terms_conditions",
                    title: "Terms & Conditions"
                  })
                }
              >
                <Icon
                  name="file-document-box"
                  type="MaterialCommunityIcons"
                  style={[
                    styles.icons
                    // { top: heightPercentageToDP(5) < 30 ? 0 : 2 }
                  ]}
                />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Terms & Conditions")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.clearPushToken(
                    this.props.navigation,
                    this.props.userInfo.userid
                  );
                }}
                style={styles.options}
              >
                <Icons.LogoutIcon style={[styles.icons]} />
                <Text style={I18nManager.isRTL ? rtlStyles.text : styles.text}>
                  {translate("Logout")}
                </Text>
              </TouchableOpacity>
              <Text style={styles.version}>
                {translate("Version:")}
                {Constants.manifest.version}/62/
                {Constants.manifest.ios.buildNumber}/
                {Constants.manifest.android.versionCode}
              </Text>
            </ScrollView>
          </View>
          {this.props.clearTokenLoading && <LoadingScreen dash={true} />}
          <SlidingUpPanel
            showBackdrop={false}
            ref={c => (this._panel = c)}
            draggableRange={this.draggableRange}
            allowDragging={false}
            animatedValue={this._draggedValue}
          >
            <>
              <TouchableOpacity
                style={styles.CloseIcon}
                onPress={() => this.closePanel()}
              >
                <Icons.CloseListIcon />
              </TouchableOpacity>
              <BusinessList
                navigation={this.props.navigation}
                screenProps={this.props.screenProps}
              />
            </>
          </SlidingUpPanel>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  campaignList: state.dashboard.campaignList,
  exponentPushToken: state.login.exponentPushToken,
  clearTokenLoading: state.login.clearTokenLoading
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
