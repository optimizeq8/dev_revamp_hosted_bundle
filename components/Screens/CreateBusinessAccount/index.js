import React, { Component } from "react";
import { connect } from "react-redux";

import { View, KeyboardAvoidingView } from "react-native";
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
  Badge
} from "native-base";
import { LinearGradient } from "expo";
import BusinessInfo from "./BusinessInfo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Style
import styles, { colors } from "./styles";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    content = <BusinessInfo navigation={this.props.navigation} />;

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={{
            backgroundColor: "#fff",
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          <Card
            style={[
              styles.mainCard,
              {
                margin: 0,
                shadowColor: "#fff",
                shadowRadius: 1,
                shadowOpacity: 0.7,
                shadowOffset: { width: 8, height: 8 }
              }
            ]}
          >
            <Text style={styles.text}>Registration</Text>

            {content}
          </Card>
        </KeyboardAwareScrollView>
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
