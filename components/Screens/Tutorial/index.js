import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView, AsyncStorage } from "react-native";
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
  H1
} from "native-base";
import { LinearGradient, Asset } from "expo";
import Swiper from "../../MiniComponents/Swiper";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import Invitation from "../InvitationScreen";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import isNull from "lodash/isNull";

class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    tutorialOpened: null
  };
  componentDidMount() {
    AsyncStorage.getItem("tutorialOpened")
      .then(value => {
        console.log("storahe val", value);

        if (isNull(value)) {
          console.log("storage", value);

          AsyncStorage.setItem("tutorialOpened", "false").then(() => {
            console.log("val");

            this.setState({
              tutorialOpened: false
            });
          });
        } else if (value === "true") {
          console.log("storage", value);

          this.setState({
            tutorialOpened: true
          });
        } else {
          console.log("storage", value);

          this.setState({
            tutorialOpened: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const Slide = ({ url, i }) => {
      return (
        <>
          <Image
            style={{
              height: heightPercentageToDP(97),
              alignContent: "center",
              alignSelf: "center",
              bottom: i === 4 ? heightPercentageToDP("-2%") : 0
            }}
            source={url}
            resizeMode="contain"
          />
          {i === 4 && (
            <Button
              style={{
                alignSelf: "flex-end",
                marginRight: widthPercentageToDP("7%"),
                bottom: heightPercentageToDP("19.5%"),
                zIndex: 80,
                elevation: 3,
                backgroundColor: "#FF9D00",
                borderRadius: 15
              }}
              onPress={() => {
                this.props.navigation.replace("Invitation");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "montserrat-bold",
                  fontSize: 11
                }}
              >
                Get Started!
              </Text>
            </Button>
          )}
        </>
      );
    };
    if (isNull(this.state.tutorialOpened)) {
      return (
        <Container style={{ backgroundColor: "#fff" }}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={require("../../../assets/splash.png")}
            resizeMode="cover"
          />
        </Container>
      );
    } else if (this.state.tutorialOpened) {
      return <Invitation navigation={this.props.navigation} />;
    } else {
      return (
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.3, 1]}
            style={styles.gradient}
          />
          <Swiper
            backgroundColor={["#4285f4", "#0f9d58", "#f4b400", "#db4437"]}
            dots
            dotsColor="rgba(255, 255, 255, 0.25)"
            dotsColorActive="rgba(255, 255, 255, 1)"
          >
            <Slide
              url={require("../../../assets/images/tutorial/tutorial-1.png")}
              i={1}
            />
            <Slide
              url={require("../../../assets/images/tutorial/tutorial-2.png")}
              i={2}
            />
            <Slide
              url={require("../../../assets/images/tutorial/tutorial-3.png")}
              i={3}
            />
            <Slide
              url={require("../../../assets/images/tutorial/tutorial-4.png")}
              i={4}
            />
          </Swiper>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
