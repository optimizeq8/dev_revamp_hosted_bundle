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
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import SlidingUpPanel from "rn-sliding-up-panel";
import BusinessList from "../BusinessList/index";
import { Transition } from "react-navigation-fluid-transitions";
class Menu extends Component {
  _draggedValue = new Animated.Value(-20);
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
    console.log(this.state.slidePanel);
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
                zIndex: 10
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.state.params.closeAnimation();
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
              marginTop: heightPercentageToDP("8.7%")
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.logout(this.props.navigation);
            }}
          >
            <Icons.LogoutIcon style={styles.logoutIcon} />
          </TouchableWithoutFeedback>
          <View>
            <Transition shared="menu">
              <Text style={styles.businessTitle}>
                {this.props.mainBusiness.businessname}
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
              <View
                style={{
                  alignItems: "center",

                  flexDirection: "row"
                }}
              >
                <Icons.PersonalInfo />
                <Text style={styles.text}>Personal Info</Text>
              </View>
              <View
                style={{
                  alignItems: "center",

                  flexDirection: "row"
                }}
              >
                <Icons.TransactionIcon />
                <Text style={styles.text}>Transactions</Text>
              </View>

              <View
                style={{
                  flexDirection: "column"
                }}
              >
                <View
                  style={{
                    alignItems: "center",

                    flexDirection: "row"
                  }}
                >
                  <Icons.BusinessIcon />
                  <Text style={styles.text}>Business Info</Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate("ChangePassword")
                  }
                >
                  <View
                    style={{
                      alignItems: "center",

                      flexDirection: "row"
                    }}
                  >
                    <Icons.ChangePassIcon />
                    <Text style={[styles.text]}> Change{"\n"}Password</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View
                style={{
                  alignItems: "center",
                  marginBottom: 10,
                  flexDirection: "row"
                }}
              >
                <Icons.AddressIcon />
                <Text style={styles.text}>Addresses</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  left: widthPercentageToDP(5),
                  flexDirection: "row"
                }}
              >
                <Icons.Wallet />
                <Text style={styles.text}>{"    "}Wallet</Text>
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
