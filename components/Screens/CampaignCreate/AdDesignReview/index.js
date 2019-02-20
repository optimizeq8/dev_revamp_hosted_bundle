import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actionCreators from "../../../../store/actions";

// Style
import styles, { colors } from "./styles";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {}

  render() {
    return (
      <ImageBackground
        source={{ uri: this.props.navigation.state.params.image }}
        style={{ width: "100%", height: "100%" }}
      >
        <Text style={styles.brand_name}>
          {this.props.navigation.state.params.brand_name}
        </Text>

        <Text style={styles.headline}>
          {this.props.navigation.state.params.headline}
        </Text>
      </ImageBackground>
    );
  }
}

export default AdDesignReview;
