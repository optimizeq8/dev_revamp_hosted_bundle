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

// Style
import styles, { colors } from "./styles";

class MainForm extends Component {
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
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Image
          style={styles.image}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
        <Card padder style={styles.mainCard}>
          <Text style={styles.text}>Start Optimizing {"\n"} your Ads</Text>
          <Item rounded style={styles.input}>
            <Input style={styles.inputtext} placeholder="Email" />
          </Item>
          <Item rounded style={styles.input}>
            <Input style={styles.inputtext} placeholder="Password" />
          </Item>
          <Button block dark style={styles.button}>
            <Text style={styles.buttontext}>Login</Text>
          </Button>
        </Card>
        <View style={{ backgroundColor: "#fff" }}>
          <Card padder style={styles.bottomCard}>
            <Text onPress={() => alert("hi")} style={styles.link}>
              I Don’t Have an Account
            </Text>
          </Card>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
