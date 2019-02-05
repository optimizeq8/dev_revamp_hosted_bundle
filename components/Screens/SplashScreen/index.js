import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image } from "react-native";
import { Button, Content, Text, Container } from "native-base";
import * as actionCreators from "../../../store/actions";
import { LinearGradient } from "expo";
// Style
import styles, { colors } from "./styles";

class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container style={styles.contentContainer}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          style={styles.gradient}
        />

        <Image
          style={styles.image}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
