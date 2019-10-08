import React, { Component } from "react";
import { View, Text, ScrollView, MaskedViewIOS } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import BudgetCard from "./BudgetCard";
import { TextInputMask } from "react-native-masked-text";
import { LinearGradient } from "expo-linear-gradient";
export class BudgetCards extends Component {
  state = { placeholder: false };
  render() {
    let {
      _handleBudget,
      value,
      recBudget,
      lifetime_budget_micro,
      budgetOption
    } = this.props;
    recBudget = parseFloat(recBudget);
    let cards = [
      { recBudget, id: 1 },
      { recBudget: recBudget * 2, id: 2 },
      { recBudget: recBudget * 3, id: 3 }
    ].map((bud, i) => (
      <BudgetCard
        key={bud.id}
        bud={bud}
        _handleBudget={_handleBudget}
        budgetOption={budgetOption}
      />
    ));

    return (
      <View style={{ height: "10%" }}>
        <MaskedViewIOS
          maskElement={
            <LinearGradient
              colors={["black", "transparent"]}
              start={[0.8, 0]}
              end={[1, 0]}
              style={{ height: "100%", width: "95%" }}
            />
          }
        >
          <ScrollView
            horizontal
            style={styles.budgetCardsStyle}
            contentContainerStyle={styles.scrollContainerStyle}
          >
            <View
              style={[
                styles.budgetCardStyle,
                budgetOption === 0 ? { borderWidth: 2.5 } : { borderWidth: 0 }
              ]}
            >
              <TextInputMask
                includeRawValueInChangeText
                type={"money"}
                options={{
                  precision: 0,
                  delimiter: ",",
                  unit: "$"
                }}
                maxLength={8}
                value={
                  budgetOption !== 0 ||
                  (value === "$0" && !this.state.placeholder)
                    ? "Custom Budget"
                    : value + ""
                }
                onChangeText={(value, rawText) => {
                  _handleBudget(value, rawText, false, 0);
                }}
                onFocus={() => {
                  this.setState({ placeholder: true });
                  _handleBudget("$0", 0, false, 0);
                }}
                onBlur={() => {
                  _handleBudget(value, lifetime_budget_micro, true, 0);
                  this.setState({ placeholder: false });
                }}
                style={[
                  styles.budget,
                  {
                    fontSize:
                      budgetOption !== 0 ||
                      (value === "$0" && !this.state.placeholder)
                        ? 10
                        : 20
                  }
                ]}
                ref={ref => (this.moneyField = ref)}
              />
            </View>
            {cards}
          </ScrollView>
        </MaskedViewIOS>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetCards);
