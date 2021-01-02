import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import BudgetCard from "./BudgetCard";
import { TextInputMask } from "react-native-masked-text";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-community/masked-view";
import { globalColors } from "../../../../../../GlobalStyles";
export class BudgetCards extends Component {
  state = {
    placeholder: false,
    scrollX: 1,
    customValue: this.props.recBudget,
  };
  componentDidMount() {
    if (this.props.data && this.props.data.hasOwnProperty("campaignInfo")) {
      this.setState({ customValue: this.props.lifetime_budget_micro });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      (prevProps.recBudget !== this.props.recBudget ||
        prevProps.lifetime_budget_micro !== this.props.lifetime_budget_micro) &&
      this.props.data
    ) {
      this.setState({
        customValue: this.props.data.hasOwnProperty("campaignInfo")
          ? this.props.lifetime_budget_micro
          : this.props.recBudget,
      });
    }
  }
  handleFading = (event) => {
    let x = event.nativeEvent.contentOffset.x;
    this.setState({ scrollX: x > 20 ? x / 20 : 1 });
  };
  handleCustomBudgetChange = (value, rawText) => {
    if (!isNaN(value)) {
      this.props._handleBudget(value, value, false, 0);
      this.setState({ customValue: value });
    } else {
      this.props._handleBudget(
        this.state.customValue,
        this.state.customValue,
        false,
        0
      );
    }
  };
  render() {
    let {
      _handleBudget,
      value,
      recBudget,
      lifetime_budget_micro,
      budgetOption,
    } = this.props;
    const { translate } = this.props.screenProps;
    console.log("customValue", this.state.customValue);
    recBudget = parseFloat(recBudget);
    let cards = [
      { recBudget, id: 2 },
      { recBudget: recBudget * 2, id: 1 },
      { recBudget: recBudget * 3, id: 3 },
    ].map((bud, i) => (
      <BudgetCard
        key={bud.id}
        bud={bud}
        _handleBudget={_handleBudget}
        budgetOption={budgetOption}
        translate={translate}
      />
    ));
    let customValue = this.state.customValue
      .toString()
      .split(".")
      .map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
      .join(".");
    return (
      <View>
        <MaskedView
          maskElement={
            <LinearGradient
              colors={["black", "transparent"]}
              start={[0.85, 0]}
              end={[this.state.scrollX, 0]}
              style={{ height: "100%", width: "100%" }}
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
                budgetOption === 0 ? { borderWidth: 2.5 } : { borderWidth: 0 },
              ]}
            >
              {budgetOption !== 0 ||
              (value === "$0" && !this.state.placeholder) ? (
                <TouchableOpacity
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
                            ? 9
                            : 15,
                      },
                    ]}
                  >
                    {translate("Custom Budget")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 15,
                        color: globalColors.purple,
                        marginRight: -30,
                        fontFamily: "montserrat-bold",
                      },
                    ]}
                  >
                    $
                  </Text>
                  <TextInput
                    keyboardType={"decimal-pad"}
                    includeRawValueInChangeText
                    type={"money"}
                    options={{
                      precision: 2,
                      separator: ".",
                      delimiter: ",",
                      unit: "$",
                    }}
                    focus={this.state.placeholder}
                    maxLength={19}
                    value={customValue}
                    onChangeText={this.handleCustomBudgetChange}
                    onFocus={() => {
                      this.setState({ placeholder: true });
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
                            : 15,

                        paddingLeft: 30,
                      },
                    ]}
                    placeholder={"0.00"}
                    placeholderTextColor={globalColors.purple}
                    ref={(ref) => (this.moneyField = ref)}
                  />
                </View>
              )}
            </View>
            {cards}
          </ScrollView>
        </MaskedView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCards);

{
  /* <TextInputMask
  includeRawValueInChangeText
  type={"money"}
  options={{
    precision: 2,
    separator: ".",
    delimiter: ",",
    unit: "$",
  }}
  focus={this.state.placeholder}
  maxLength={11}
  value={this.state.customValue}
  onChangeText={this.handleCustomBudgetChange}
  onFocus={() => {
    this.setState({ placeholder: true });
  }}
  onBlur={() => {
    _handleBudget(value, lifetime_budget_micro, true, 0);
    this.setState({ placeholder: false });
  }}
  style={[
    styles.budget,
    {
      fontSize:
        budgetOption !== 0 || (value === "$0" && !this.state.placeholder)
          ? 10
          : 15,
    },
  ]}
  ref={(ref) => (this.moneyField = ref)}
/>; */
}
