import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Container } from "native-base";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-navigation";
import * as Animatable from "react-native-animatable";

//icons
import IntercomIcon from "../../../assets/SVGs/IntercomIcon.svg";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";

// Style
import styles from "./styles";

//Redux

//Functions
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default class PlacholderDashboard extends Component {
  render() {
    const mySlideInUp = {
      from: {
        top: hp(100),
      },
      to: {
        top: 0,
      },
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
              <IntercomIcon width={24} height={24} />
            </TouchableOpacity>
          </>
        </View>
        <Animatable.View
          duration={500}
          animation={mySlideInUp}
          style={[styles.animateView]}
        >
          <View style={[styles.nameStyle]} />
          <Container style={styles.container}>
            <View padder style={[styles.mainCard, { height: "110%" }]}>
              <View style={styles.sideMenuCard}>
                <View style={styles.sideMenuTop}>
                  <View style={[styles.sideMenuCard, { top: 10, left: -5 }]}>
                    <TouchableOpacity style={styles.button}>
                      <ActivityIndicator />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <ScrollView>{placeHolderCards}</ScrollView>
              {/* {this.props.loading ? (
              <ActivityIndicator size="large" />
            ) : (
            )} */}
            </View>
          </Container>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}
