import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Icon } from "native-base";
import GenderIcon from "../../../assets/SVGs/Gender";
import styles from "./styles";
import * as Segment from "expo-analytics-segment";
import LowerButton from "../LowerButton";

export default class GenderOptions extends Component {
  componentDidMount() {
    Segment.screen("Gender Options");
  }
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[styles.safeAreaContainer]}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <GenderIcon width={110} height={110} fill="#fff" />
            <Text style={styles.title}>{translate("Gender")}</Text>
            <Text style={[styles.subTitle]}>
              {translate(`Select your audience's Gender`)}
            </Text>

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
                  {translate("Male")}
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
                  {translate("Female")}
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
                  {translate("All")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <LowerButton
            style={[styles.button]}
            checkmark={true}
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
