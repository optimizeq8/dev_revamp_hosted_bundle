import React from "react";
import { View, Text } from "react-native";
import AnimatedCircularProgress from "../AnimatedCircleProgress/AnimatedCircularProgress";
import styles from "./styles";
import SpendingIcon from "../../../assets/SVGs/SpendingIcon";
import { globalColors } from "../../../GlobalStyles";
import formatNumber from "../../formatNumber";

export default Chart = (props) => {
  const { translate } = props.screenProps;
  let { detail, budget, spends } = props;
  let x = (spends / budget) * 100;
  return (
    <View
      style={{
        alignSelf: "center",
        marginVertical: 10,
        paddingHorizontal: detail ? 20 : 0,
      }}
    >
      <AnimatedCircularProgress
        size={detail ? 160 : 80}
        width={detail ? 12 : 5}
        fill={isNaN(x) ? 0 : x}
        rotation={0}
        lineCap="round"
        style={styles.chart}
        backgroundColor="#0004"
        tintColorSecondary={globalColors.orange}
        tintColorThirdy={globalColors.green}
        tintColor={globalColors.yellow}
      >
        {(fill) => (
          <>
            <View style={styles.innerStyle}>
              {detail && <SpendingIcon />}
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: 4,
                }}
              >
                {detail && (
                  <Text style={[styles.chartSubtext]}>
                    {translate("Spend")}
                  </Text>
                )}
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.chartText}
                  adjustsFontSizeToFit={true}
                >
                  ${formatNumber(parseFloat(spends).toFixed(2), true)}
                </Text>
                {!detail && (
                  <Text uppercase style={[styles.chartSubtext]}>
                    {"Spent"}
                  </Text>
                )}
                {detail && (
                  <View>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={[styles.chartBudgetSubtext]}
                    >
                      {`${translate("out of")} ${
                        budget.length > 6 ? "\n" : ""
                      }$${budget}`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};
