import React from "react";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AnimatedCircularProgress from "../AnimatedCircleProgress/AnimatedCircularProgress";
import styles from "./styles";
import SpendingIcon from "../../../assets/SVGs/SpendingIcon";
import { globalColors } from "../../../GlobalStyles";
import formatNumber from "../../formatNumber";
import PlaceholderLineComp from "../PlaceholderLine";
export default Chart = (props) => {
  const { translate } = props.screenProps;
  let { detail, budget, spends, loading } = props;
  let x = (spends / budget) * 100;
  return (
    <View
      style={{
        alignSelf: "center",
        marginVertical: RFValue(5, 414),
        paddingHorizontal: detail ? RFValue(10, 414) : 0,
      }}
    >
      <AnimatedCircularProgress
        size={detail ? RFValue(80, 414) : RFValue(40, 414)}
        width={detail ? RFValue(6, 414) : RFValue(2.5, 414)}
        fill={isNaN(x) ? 0 : x}
        rotation={0}
        lineCap="round"
        style={styles.chart}
        backgroundColor="#0002"
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
                  marginLeft: RFValue(2, 414),
                }}
              >
                {detail && (
                  <Text style={[styles.chartSubtext]}>
                    {translate("Spend")}
                  </Text>
                )}
                {loading ? (
                  <PlaceholderLineComp width={50} height={10} />
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.chartText}
                    adjustsFontSizeToFit={true}
                  >
                    ${formatNumber(parseFloat(spends).toFixed(2), true)}
                  </Text>
                )}
                {!detail && (
                  <Text uppercase style={[styles.chartSubtext]}>
                    {"Spent"}
                  </Text>
                )}
                {detail && (
                  <View>
                    {loading ? (
                      <PlaceholderLineComp width={50} height={10} />
                    ) : (
                      <Text
                        adjustsFontSizeToFit={true}
                        style={[styles.chartBudgetSubtext]}
                      >
                        {`${translate("out of")} ${
                          budget && budget.length > 6 ? "\n" : ""
                        }$${budget}`}
                      </Text>
                    )}
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
