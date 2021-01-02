import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./styles";
import BudgetCard from "./BudgetCard";
import { TextInputMask } from "react-native-masked-text";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-community/masked-view";
import { globalColors } from "../../../../../GlobalStyles";
export class BudgetCards extends Component {
  state = {
    placeholder: false,
    scrollX: 1,
    customValue: this.props.recBudget,
  };
  componentDidMount() {
    if (this.props.campaign)
      this.setState({
        customValue: this.props.campaign.budget,
      });
  }

  handleCustomBudgetSelect = () => {
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
          : this.state.customValue,
    });
    // setTimeout(() => {
    //   //wait untill moenyField is mounted becuase it's conditionally rendered
    //   this.moneyField.getElement().focus();
    // }, 10);
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
      placeholder: false,
    });
  };
  handleFading = (event) => {
    let x = event.nativeEvent.contentOffset.x;
    this.setState({ scrollX: x > 20 ? x / 20 : 1 });
  };
  render() {
    let {
      _handleBudget,
      value,
      recBudget,
      budgetOption,
      uploading,
    } = this.props;
    const { translate } = this.props.screenProps;
    recBudget = parseFloat(recBudget);

    let cards = [
      { recBudget, id: 2 },
      { recBudget: recBudget * 2, id: 1 },
      { recBudget: recBudget * 3, id: 3 },
    ].map((bud, i) => (
      <BudgetCard
        uploading={uploading}
        key={bud.id}
        bud={bud}
        _handleBudget={_handleBudget}
        budgetOption={budgetOption}
        translate={translate}
      />
    ));

    return (
      <View style={{ marginTop: 7 }}>
        <ScrollView
          onScroll={this.handleFading}
          scrollEventThrottle={100}
          horizontal
          ref={(ref) => (this.budgetScrollView = ref)}
          style={styles.budgetCardsStyle}
          contentContainerStyle={styles.scrollContainerStyle}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={[
              styles.budgetCardStyle,
              budgetOption === 0 ? { borderWidth: 2 } : { borderWidth: 0 },
              { paddingHorizontal: 10 },
            ]}
          >
            {budgetOption !== 0 ||
            (value === "$0" && !this.state.placeholder) ? (
              <TouchableOpacity
                disabled={uploading}
                // style={styles.budget}
                style={{ paddingVertical: 7 }}
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
                          : 14,
                    },
                  ]}
                >
                  {translate("Custom Budget")}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  //   display: "flex",
                  flexDirection: "row",
                  //   position: "relative",
                  //   alignItems: "center",
                  width: 70,
                  paddingHorizontal: 2,
                  //   justifyContent: "flex-start",
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 15,
                      color: globalColors.purple,
                      marginLeft: 0,
                      fontFamily: "montserrat-bold",
                    },
                  ]}
                >
                  $
                </Text>
                <TextInput
                  keyboardType={"decimal-pad"}
                  focus={this.state.placeholder}
                  maxLength={11}
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
                          : 15,

                      //   paddingLeft: 10,
                    },
                  ]}
                  placeholder={"0.0"}
                  placeholderTextColor={globalColors.purple}
                  //   ref={(ref) => (this.moneyField = ref)}
                />
              </View>
            )}
          </View>
          {cards}
        </ScrollView>
      </View>
    );
  }
}

export default BudgetCards;
//  <TextInputMask
//                 includeRawValueInChangeText
//                 type={"money"}
//                 selectTextOnFocus={true}
//                 options={{
//                   precision: 2,
//                   separator: ".",
//                   delimiter: ",",
//                   unit: "$",
//                 }}
//                 focus={this.state.placeholder}
//                 maxLength={11}
//                 value={this.state.customValue}
//                 onChangeText={(value, rawText) =>
//                   this.handleCustomBudgetChange(value, rawText)
//                 }
//                 onFocus={this.handleCustomBudgetFocus}
//                 onBlur={this.handleCustomBudgetBlur}
//                 style={[
//                   styles.budget,
//                   {
//                     fontSize:
//                       budgetOption !== 0 ||
//                       (value === "$0" && !this.state.placeholder)
//                         ? 10
//                         : 16,
//                   },
//                   budgetOption === 0 && styles.activeBudgetTextStyle,
//                 ]}
//                 ref={(ref) => (this.moneyField = ref)}
//               />
