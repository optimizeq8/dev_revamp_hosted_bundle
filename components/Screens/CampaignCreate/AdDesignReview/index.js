import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ImageBackground } from "react-native";
import { Video } from "expo";
import { Text } from "native-base";
import { LinearGradient } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actionCreators from "../../../../store/actions";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri: this.props.navigation.state.params.image
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {this.props.navigation.state.params.type === "VIDEO" && (
          <View style={[styles.backgroundViewWrapper]}>
            <Video
              source={{
                uri: this.props.navigation.state.params.image
              }}
              isLooping
              shouldPlay
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
        <Text style={styles.brand_name}>
          {this.props.navigation.state.params.brand_name}
        </Text>
        <Text style={styles.headline}>
          {this.props.navigation.state.params.headline}
        </Text>
        <Text style={styles.call_to_action}>
          {this.props.navigation.state.params.call_to_action !== "BLANK" &&
            this.props.navigation.state.params.call_to_action}
        </Text>
      </ImageBackground>
    );
  }
}

export default AdDesignReview;
