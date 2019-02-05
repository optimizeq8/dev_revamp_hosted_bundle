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
      <Container>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Content padder style={styles.container}>
          <View>
            <Image
              style={{
                alignSelf: "center",
                height: 230,
                width: 230
              }}
              source={require("../../../assets/images/logo01.png")}
              resizeMode="contain"
            />
          </View>
        </Content>
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
