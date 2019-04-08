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
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import LottieView from "lottie-react-native";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

import * as actionCreators from "../../../store/actions";
import { heightPercentageToDP } from "react-native-responsive-screen";
import SlidingUpPanel from "rn-sliding-up-panel";
import BusinessList from "../BusinessList/index";
import { Transition } from "react-navigation-fluid-transitions";
class Menu extends Component {
  _draggedValue = new Animated.Value(0);
  static defaultProps = {
    draggableRange: {
      top: heightPercentageToDP(100),
      bottom: -heightPercentageToDP(100)
    }
  };
  static navigationOptions = {
    header: null
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
                marginTop: heightPercentageToDP("5%"),
                marginLeft: 20,
                zIndex: 1000
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!this.props.navigation.state.params.open) {
                    this.props.navigation.state.params.startAnimation();
                  } else {
                    // console.log(this.props.navigation.state.params);

                    this.props.navigation.state.params.closeAnimation();
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
                  progress={this.props.navigation.state.params.menu}
                />
              </TouchableWithoutFeedback>
            </View>
          </Transition>
          <View
            style={{
              marginTop: heightPercentageToDP("20%")
            }}
          />
          <Icons.LogoutIcon
            style={styles.logoutIcon}
            onPress={() => {
              this.props.logout(this.props.navigation);
            }}
          />

          <View>
            <Transition shared="menu">
              <Text style={styles.businessTitle}>
                {this.props.mainBusiness.businessname}
              </Text>
            </Transition>
            <View style={{ marginBottom: heightPercentageToDP("10") }}>
              <BackdropIcon style={styles.backDrop} />

              <Icons.DropDownIcon
                onPress={() => this.slidePanelShow()}
                style={styles.DropIcon}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Icons.PersonalInfo />
                  <Text style={styles.text}>Personal Info</Text>
                </View>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Icons.TransactionIcon />
                  <Text style={styles.text}>Transactions</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column"
                }}
              >
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Icons.BusinessIcon />
                  <Text style={styles.text}>Business Info</Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate("ChangePassword")
                  }
                >
                  <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <Icons.ChangePassIcon />
                    <Text style={[styles.text]}> Change{"\n"}Password</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Icons.AddressIcon />
                  <Text style={styles.text}>Addresses</Text>
                </View>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Icons.CreditCardIcon />
                  <Text style={styles.text}>Credit Cards</Text>
                </View>
              </View>
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
  logout: navigation => dispatch(actionCreators.logout(navigation)),
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  createBusinessAccount: account =>
    dispatch(actionCreators.createBusinessAccount(account)),
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
