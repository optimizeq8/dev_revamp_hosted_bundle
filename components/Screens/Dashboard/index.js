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
  H1,
  Thumbnail
} from "native-base";
import { LinearGradient } from "expo";

// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }
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
        <Card
          padder
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
          <Text style={styles.link}>
            Welcome {"\n"}
            {this.props.userInfo.businessInfoName}
          </Text>
          <Text style={styles.text}>Create campaigns!</Text>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("AdObjective");
            }}
          >
            <Image
              style={styles.imageIcon}
              source={require("../../../assets/images/snap-ghost.png")}
              resizeMode="contain"
            />
          </Button>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
