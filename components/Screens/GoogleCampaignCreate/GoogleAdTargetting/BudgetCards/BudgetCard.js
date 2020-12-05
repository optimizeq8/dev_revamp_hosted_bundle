import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import formatNumber from "../../../../formatNumber";
// import { Icon } from "native-base";
import { globalColors } from "../../../../../GlobalStyles";
export default class BudgetCard extends Component {
  render() {
    let { bud, _handleBudget, budgetOption, uploading, translate } = this.props;

    return (
      <>
        <TouchableOpacity
          disabled={uploading}
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
          <View style={styles.recIcon}>
            <Text style={styles.recommendText}>{translate("Recommended")}</Text>
            {/* <Icon
              name="thumbs-up"
              type="Feather"
              style={{ fontSize: 12, color: "#fff" }}
            /> */}
          </View>
        )}
      </>
    );
  }
}
