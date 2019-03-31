import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView } from "react-native";
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
import { LinearGradient } from "expo";
import Swiper from "../../MiniComponents/Swiper";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const Slide = ({ title }) => (
      <View style={styles.slide}>
        <Image
          style={{
            height: 250,
            width: 250
          }}
          source={require("../../../assets/images/tutorial/inst01.png")}
          resizeMode="contain"
        />
      </View>
    );
    return (
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
          <Text style={styles.text}>Start Optimizing {"\n"} your Ads</Text>
          <Swiper
            backgroundColor={["#4285f4", "#0f9d58", "#f4b400", "#db4437"]}
            dots
            dotsColor="rgba(147, 147, 147, 0.25)"
            dotsColorActive=" rgba(147, 147, 147, 1)"
          >
            <Slide title="Lorem" />
            <Slide title="ipsum" />
            <Slide title="dolor" />
            <Slide title="sit" />
          </Swiper>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
