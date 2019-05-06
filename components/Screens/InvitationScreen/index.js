import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Text, Container, Icon, Badge } from "native-base";
import { LinearGradient } from "expo";
import Verification from "../Signup/Verification";
import Signin from "../Signin/";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

export default class Invitation extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    registeredWithInvite: null
  };
  componentDidMount() {
    AsyncStorage.getItem("registeredWithInvite")
      .then(value => {
        if (value == null) {
          this.setState({ registeredWithInvite: false });
        } else {
          this.setState({ registeredWithInvite: true });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    if (this.state.registeredWithInvite == null) {
      return <ActivityIndicator size="large" />;
    } else if (this.state.registeredWithInvite) {
      return <Signin navigation={this.props.navigation} />;
    } else
      return (
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />

          <Text style={styles.title}>Invitation</Text>

          <View style={[styles.mainCard]}>
            <Verification invite={true} />
            <View style={styles.registered}>
              <Text style={[styles.registeredText]}>Already verfied?</Text>
              <Button
                rounded
                onPress={() => {
                  this.props.navigation.navigate("Signin", { invite: true });
                }}
                style={styles.bottomView}
              >
                <Text
                  style={[
                    styles.buttontext,
                    { color: "#fff", fontFamily: "montserrat-semibold" }
                  ]}
                >
                  Log In!
                </Text>
              </Button>
            </View>
          </View>
        </Container>
      );
  }
}
