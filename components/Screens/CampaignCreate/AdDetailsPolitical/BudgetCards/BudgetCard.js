import React, { Component } from "react";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import styles from "./styles";
import formatNumber from "../../../../formatNumber";
import RecomenededIcon from "../../../../../assets/SVGs/AdDetails/RecomenededIcon.svg";
export default class BudgetCard extends Component {
  render() {
    let { bud, _handleBudget, budgetOption } = this.props;

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            _handleBudget(
              "$" + bud.recBudget,
              parseInt(bud.recBudget),
              false,
              bud.id
            );
          }}
          style={[
            styles.budgetCardStyle,
            budgetOption == bud.id ? { borderWidth: 2.5 } : { borderWidth: 0 },
          ]}
        >
          <Text style={styles.budgetTextStyle}>
            {formatNumber(bud.recBudget)}
          </Text>
        </TouchableOpacity>
        {bud.id === 1 && (
          <View
            style={[
              styles.recIcon,
              { left: I18nManager.isRTL ? "54%" : "73%" },
            ]}
          >
            <RecomenededIcon fill={"#fff"} style={{ right: 1 }} />
          </View>
        )}
      </>
    );
  }
}