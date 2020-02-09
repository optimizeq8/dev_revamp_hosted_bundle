import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  MaskedViewIOS,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import BudgetCard from "./BudgetCard";
import { TextInputMask } from "react-native-masked-text";
import { LinearGradient } from "expo-linear-gradient";
export class BudgetCards extends Component {
  state = { placeholder: false, scrollX: 1 };
  handleFading = event => {
    let x = event.nativeEvent.contentOffset.x;
    this.setState({ scrollX: x > 20 ? x / 20 : 1 });
  };
  render() {
    let {
      _handleBudget,
      value,
      recBudget,
      lifetime_budget_micro,
      budgetOption,
      uploading
    } = this.props;
    const { translate } = this.props.screenProps;
    recBudget = parseFloat(recBudget);

    let cards = [
      { recBudget, id: 1 },
      { recBudget: recBudget * 2, id: 2 },
      { recBudget: recBudget * 3, id: 3 }
    ].map((bud, i) => (
      <BudgetCard
        uploading={uploading}
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
              start={[0.85, 0]}
              end={[this.state.scrollX, 0]}
              style={{ height: "100%", width: "95%" }}
            />
          }
        >
          <ScrollView
            onScroll={this.handleFading}
            scrollEventThrottle={100}
            horizontal
            style={styles.budgetCardsStyle}
            contentContainerStyle={styles.scrollContainerStyle}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={[
                styles.budgetCardStyle,
                budgetOption === 0 ? { borderWidth: 2.5 } : { borderWidth: 0 }
              ]}
            >
              {budgetOption !== 0 ||
              (value === "$0" && !this.state.placeholder) ? (
                <TouchableOpacity
                  disabled={uploading}
                  style={{ flex: 1, justifyContent: "center" }}
                  onPress={() => {
                    this.setState({ placeholder: true });
                    _handleBudget("$0", 0, false, 0);
                  }}
                >
                  <Text
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
                  >
                    {translate("Custom Budget")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TextInputMask
                  includeRawValueInChangeText
                  type={"money"}
                  options={{
                    precision: 0,
                    delimiter: ",",
                    unit: "$"
                  }}
                  focus={this.state.placeholder}
                  maxLength={8}
                  value={value + ""}
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
              )}
            </View>
            {cards}
          </ScrollView>
        </MaskedViewIOS>
      </View>
    );
  }
}

export default BudgetCards;
