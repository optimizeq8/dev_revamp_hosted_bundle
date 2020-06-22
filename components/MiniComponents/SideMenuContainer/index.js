import React, { Component } from "react";
import { View } from "react-native";
import { Text, Container, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";

//Styles
import styles from "./styles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//Icon
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";
import LowerButton from "../LowerButton";
import TopStepsHeader from "../TopStepsHeader";

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
      <View style={styles.safeAreaViewContainer}>
        <SafeAreaView style={{ backgroundColor: "#fff" }} />
        <TopStepsHeader
          screenProps={this.props.screenProps}
          closeButton={false}
          icon="google"
          actionButton={() => this.props._handleSideMenuState(false)}
          currentScreen="Audience"
          title={"Campaign details"}
        />
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
          <LowerButton
            screenProps={this.props.screenProps}
            checkmark={true}
            style={styles.button}
            function={() => this.props._handleSideMenuState(false)}
          />
        </Container>
      </View>
    );
  }
}
