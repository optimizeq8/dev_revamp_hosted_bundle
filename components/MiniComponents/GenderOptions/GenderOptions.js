import React, { Component } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

export default class GenderOptions extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <GenderIcon width={110} height={110} fill="#fff" />
            <Text style={styles.title}>Gender</Text>
            <Text style={[styles.subTitle]}>Select your audience's Gender</Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionsRowContainer}
                onPress={() => this.props.onSelectedGenderChange("MALE")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "MALE"
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "MALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.optionsIconSize
                  ]}
                />
                <Text
                  style={[styles.inactivetext, styles.optionsTextContainer]}
                >
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionsRowContainer}
                onPress={() => this.props.onSelectedGenderChange("FEMALE")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "FEMALE"
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "FEMALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.optionsIconSize
                  ]}
                />
                <Text
                  style={[styles.inactivetext, styles.optionsTextContainer]}
                >
                  Female
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionsRowContainer}
                onPress={() => this.props.onSelectedGenderChange("")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    ""
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    ""
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.optionsIconSize
                  ]}
                />
                <Text
                  style={[styles.inactivetext, styles.optionsTextContainer]}
                >
                  All
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            style={[styles.button]}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
