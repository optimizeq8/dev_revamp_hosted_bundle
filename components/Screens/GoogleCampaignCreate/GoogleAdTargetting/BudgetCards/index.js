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
  state = {
    placeholder: false,
    scrollX: 1,
    customValue: this.props.recBudget
  };
  componentDidMount() {
    if (this.props.campaign)
      this.setState({
        customValue: this.props.campaign.budget
      });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.budgetOption !== prevProps.budgetOption &&
      this.props.budgetOption === 0
    ) {
      setTimeout(() => {
        // only works in time out for somee reason
        this.budgetScrollView.scrollToEnd();
      }, 100);
    }
  }

  handleCustomBudgetSelect = () => {
    console.log("handleCustomBudgetSelect", this.state.customValue);

    this.setState({ placeholder: true });
    this.props._handleBudget(
      this.state.customValue === 0
        ? "$" + this.props.recBudget
        : this.state.customValue,
      this.state.customValue === 0
        ? this.props.recBudget
        : this.state.customValue,
      false,
      0
    );
    this.setState({
      customValue:
        this.state.customValue === 0
          ? this.props.recBudget
          : this.state.customValue
    });
    setTimeout(() => {
      //wait untill moenyField is mounted becuase it's conditionally rendered
      this.moneyField.getElement().focus();
    }, 10);
  };
  handleCustomBudgetChange = (value, rawText) => {
    if (!isNaN(rawText)) {
      this.props._handleBudget(value, rawText, false, 0);
      this.setState({ customValue: rawText });
    } else {
      this.props._handleBudget(
        this.state.customValue,
        this.state.customValue,
        false,
        0
      );
    }
  };

  handleCustomBudgetFocus = () => {
    this.setState({ placeholder: true });
  };

  handleCustomBudgetBlur = () => {
    if (this.state.placeholder)
      this.props._handleBudget(
        this.state.customValue,
        this.state.customValue,
        true,
        0
      );
    this.setState({
      placeholder: false
    });
  };
  handleFading = event => {
    let x = event.nativeEvent.contentOffset.x;
    this.setState({ scrollX: x > 20 ? x / 20 : 1 });
  };
  render() {
    let {
      _handleBudget,
      value,
      recBudget,
      budgetOption,
      uploading
    } = this.props;
    console.log(this.state.customValue);
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
            ref={ref => (this.budgetScrollView = ref)}
            style={styles.budgetCardsStyle}
            contentContainerStyle={styles.scrollContainerStyle}
            showsHorizontalScrollIndicator={false}
          >
            {cards}
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
                  onPress={this.handleCustomBudgetSelect}
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
                  selectTextOnFocus={true}
                  options={{
                    precision: 0,
                    delimiter: ",",
                    unit: "$"
                  }}
                  focus={this.state.placeholder}
                  maxLength={8}
                  value={this.state.customValue}
                  onChangeText={(value, rawText) =>
                    this.handleCustomBudgetChange(value, rawText)
                  }
                  onFocus={this.handleCustomBudgetFocus}
                  onBlur={this.handleCustomBudgetBlur}
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
          </ScrollView>
        </MaskedViewIOS>
      </View>
    );
  }
}

export default BudgetCards;
