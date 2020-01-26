import React, { Component } from "react";
import { View } from "react-native";
import { Button, Text, Container, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";

//Styles
import styles from "./styles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//Icon
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";

export default class AgeOption extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const { translate } = this.props.screenProps;

    let icon;
    switch (this.props.icon) {
      case "gender": {
        icon = (
          <GenderIcon
            width={110}
            height={110}
            fill="#fff"
            style={styles.icon}
          />
        );
        break;
      }
      case "language":
        icon = (
          <Icon
            style={[styles.icon, { color: "#FFF", fontSize: 100 }]}
            type="FontAwesome"
            name="language"
          />
        );
        break;
      case "age": {
        icon = <AgeIcon fill="#fff" style={styles.icon} />;
        break;
      }
      default: {
        icon = <View />;
      }
    }
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaViewContainer}
      >
        <Container style={styles.container}>
          <View style={this.props.icon === "" ? {} : styles.dataContainer}>
            {this.props.icon !== "" && icon}
            {this.props.title !== "" && (
              <Text style={styles.title}>{translate(this.props.title)}</Text>
            )}
            {this.props.subtitle !== "" && (
              <Text style={styles.subtitle}>
                {translate(this.props.subtitle)}
              </Text>
            )}
            <View style={styles.multiSliderContainer}>
              {this.props.children}
            </View>
          </View>
          <Button
            style={styles.button}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </Container>
      </SafeAreaView>
    );
  }
}
