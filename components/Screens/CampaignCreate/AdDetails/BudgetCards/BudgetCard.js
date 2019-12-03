import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import formatNumber from "../../../../formatNumber";
import { Icon } from "native-base";
import segmentEventTrack from "../../../../segmentEventTrack";
export default class BudgetCard extends Component {
  render() {
    let { bud, _handleBudget, budgetOption } = this.props;

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            segmentEventTrack("Campaign Budget Change", {
              campaign_budget: bud.recBudget
            });
            _handleBudget(
              "$" + bud.recBudget,
              parseInt(bud.recBudget),
              false,
              bud.id
            );
          }}
          style={[
            styles.budgetCardStyle,
            budgetOption == bud.id ? { borderWidth: 2.5 } : { borderWidth: 0 }
          ]}
        >
          <Text style={styles.budgetTextStyle}>
            {formatNumber(bud.recBudget)}
          </Text>
        </TouchableOpacity>
        {bud.id === 1 && (
          <View style={styles.recIcon}>
            <Icon
              name="star"
              type="AntDesign"
              style={{ fontSize: 15, color: "#fff" }}
            />
          </View>
        )}
      </>
    );
  }
}
