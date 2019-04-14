import React, { Component } from "react";
import { View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { Video } from "expo";
import { Text } from "native-base";

//icons
import CloseIcon from "../../../../assets/SVGs/Close";

// Style
import styles from "./styles";
import globalStyles from "../../../../Global Styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { Transition } from "react-navigation-fluid-transitions";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    console.log(this.props.navigation.state.params.call_to_action);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[
            globalStyles.backButton,
            { left: widthPercentageToDP(85), top: heightPercentageToDP(8) }
          ]}
        >
          <CloseIcon />
        </TouchableOpacity>

        <Transition anchor="image">
          <View>
            <Text style={styles.brand_name}>
              {this.props.navigation.state.params.brand_name}
            </Text>
            <Text style={styles.headline}>
              {this.props.navigation.state.params.headline}
            </Text>
          </View>
        </Transition>
        {/* {this.props.navigation.state.params.type === "VIDEO" && (
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
        )} */}
        <Transition shared="image">
          <View style={styles.mainCard}>
            {this.props.navigation.state.params.type === "VIDEO" ? (
              <Video
                source={{
                  uri: this.props.navigation.state.params.image
                }}
                isLooping
                shouldPlay
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={styles.placeholder}
                source={{
                  uri: this.props.navigation.state.params.image
                }}
              />
            )}

            <Text
              style={[
                styles.call_to_action,
                this.props.navigation.state.params.call_to_action && {
                  backgroundColor: "rgba(0,0,0,0.5)"
                }
              ]}
            >
              {this.props.navigation.state.params.call_to_action !== "BLANK" &&
                this.props.navigation.state.params.call_to_action}
            </Text>
          </View>
        </Transition>
      </View>
    );
  }
}

export default AdDesignReview;
