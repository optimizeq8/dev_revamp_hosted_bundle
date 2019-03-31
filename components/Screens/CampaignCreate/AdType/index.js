// Components
import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import {
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon
} from "native-base";
import { LinearGradient } from "expo";
import Swiper from "../../../MiniComponents/Swiper";

// Style
import styles, { colors } from "./styles";
//Redux
import { connect } from "react-redux";

class Tutorial extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let width = Dimensions.get("window").width * 0.5 - 120;
    const Slide = ({ title, id, icon, rout, text }) => (
      <View>
        <Icon style={styles.slideicon} type="FontAwesome" name={icon} />
        <Text style={styles.slidtitle}>{title} </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(rout)}
          style={styles.placeholder}
        >
          <Text style={styles.slidetext}> {text} </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Button
          iconLeft
          large
          transparent
          onPress={() => this.props.navigation.navigate("Home")}
          style={{
            marginLeft: 10
          }}
        >
          <Icon
            style={{
              top: 25,
              fontSize: 60,
              color: "#fff"
            }}
            name="close"
          />
        </Button>
        <Text style={styles.title}>Choose your Ad Type</Text>

        <Swiper
          backgroundColor={["#4285f4", "#0f9d58", "#f4b400", "#db4437"]}
          dots
          dotsColor="rgba(255, 255, 255, 0.25)"
          dotsColorActive=" rgba(255, 255, 255, 1)"
        >
          <Slide
            id={1}
            text="Create Your Ad Now!"
            rout="AdObjective"
            icon="snapchat-ghost"
            title="Snap Ad"
          />
          <Slide
            id={2}
            text="Coming Soon!"
            rout="Home"
            icon="twitter"
            title="Twitter Ad"
          />
          <Slide
            id={3}
            text="Coming Soon!"
            rout="Home"
            icon="instagram"
            title="Instagram Ad"
          />
          <Slide
            id={4}
            text="Coming Soon!"
            rout="Home"
            icon="snapchat-ghost"
            title="Story Ad "
          />
        </Swiper>
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
