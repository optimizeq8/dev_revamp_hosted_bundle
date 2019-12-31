import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button, Text } from "native-base";
import { globalColors } from "../../../GlobalStyles";

export default class ChartChoices extends Component {
  state = { selectedChoice: "Spend" };
  render() {
    // let selectedCampaign = this.props.selectedCampaign;

    const { translate } = this.props.screenProps;
    let choices = ["Spend", "Clicks", "CPC", "ctr"].map(choice => (
      <Button
        key={choice}
        onPress={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        style={[
          styles.choiceButtons,
          {
            backgroundColor:
              this.state.selectedChoice === choice
                ? globalColors.orange
                : "transparent"
          },
          { width: "35%" }
        ]}
      >
        <Text
          uppercase
          style={[
            styles.choiceText,
            {
              fontSize: 11,
              color:
                this.state.selectedChoice !== choice
                  ? globalColors.orange
                  : "#fff"
            }
          ]}
        >
          {translate(choice)}
        </Text>
      </Button>
    ));
    return (
      <View
        style={[
          styles.choicesStyles,
          {
            justifyContent: "center",
            backgroundColor: "#0000",
            paddingVertical: 15
          }
        ]}
      >
        {choices}
      </View>
    );
  }
}
