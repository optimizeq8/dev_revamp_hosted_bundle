import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView, TouchableOpacity } from "react-native";
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
import Swiper from "../../../MiniComponents/Swiper";

// Style
import styles, { colors } from "./styles";

class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const Slide = ({ title, id }) => (
      <TouchableOpacity
        onPress={() =>
          id === 1 && this.props.navigation.navigate("AdObjective")
        }
        style={styles.slide}
      >
        <View>
          <Image
            style={{
              height: 450,
              width: 300
            }}
            source={require("../../../../assets/images/adtype.png")}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Card padder style={styles.mainCard}>
          <Text style={styles.text}>Start Optimizing {"\n"} your Ads</Text>
          <Swiper
            backgroundColor={["#4285f4", "#0f9d58", "#f4b400", "#db4437"]}
            dots
            dotsColor="rgba(147, 147, 147, 0.25)"
            dotsColorActive=" rgba(147, 147, 147, 1)"
          >
            <Slide id={1} title="Lorem" />
            <Slide id={2} title="ipsum" />
            <Slide id={3} title="dolor" />
            <Slide id={4} title="sit" />
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
