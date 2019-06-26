import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import { Button, Text, Container } from "native-base";
import LottieView from "lottie-react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import { Segment } from "expo";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Sidemenu from "react-native-side-menu";
import { ActivityIndicator } from "react-native-paper";
import FilterMenu from "../../MiniComponents/FilterMenu";
import Axios from "axios";
import Menu from "../Menu";
import * as Animatable from "react-native-animatable";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

//icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import WalletIcon from "../../../assets/SVGs/Wallet.svg";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";

export default class PlacholderDashboard extends Component {
  render() {
    const mySlideInUp = {
      from: {
        top: hp(100)
      },
      to: {
        top: 0
      }
    };
    let placeHolderCards = this.props.placeHolderCards;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <BackdropIcon style={styles.backDrop} height={hp("100%")} />

        <View style={[styles.mainView, {}]}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (this.props.open === false) {
                this.props.startAnimation();
              } else {
                this.props.closeAnimation();
              }
            }}
          >
            <LottieView
              style={styles.lottieView}
              resizeMode="contain"
              source={require("../../../assets/animation/menu-btn.json")}
              progress={this.props.menu}
            />
          </TouchableWithoutFeedback>
          <>
            <TouchableOpacity style={[styles.wallet]}>
              <WalletIcon width={24} height={24} />
            </TouchableOpacity>
          </>
        </View>
        <Animatable.View
          duration={500}
          animation={mySlideInUp}
          style={[styles.animateView]}
        >
          <Container style={styles.container}>
            <View padder style={[styles.mainCard]}>
              <View style={styles.sideMenuCard}>
                <View style={styles.sideMenuTop}>
                  <Button
                    style={[
                      styles.activebutton,
                      globalStyles.whiteBackgroundColor
                    ]}
                  >
                    <SearchIcon width={23} height={23} stroke={"#575757"} />
                  </Button>
                  <Button style={[styles.button, { padding: 63 }]}>
                    <ActivityIndicator />
                    {/* <Text style={[styles.title, styles.newCampaignTitle]}>
                    New {"\n"}
                    Campaign
                  </Text> */}
                  </Button>

                  <Button style={styles.activebutton} onPress={() => {}}>
                    <FilterIcon width={23} height={23} fill="#575757" />
                  </Button>
                </View>
              </View>

              <ScrollView>{placeHolderCards}</ScrollView>
              {/* {this.props.loading ? (
              <ActivityIndicator size="large" />
            ) : (
            )} */}
            </View>
          </Container>
          <NavigationEvents
            onDidFocus={() => {
              Segment.screen("Dashboard");
            }}
          />
        </Animatable.View>
      </SafeAreaView>
    );
  }
}
