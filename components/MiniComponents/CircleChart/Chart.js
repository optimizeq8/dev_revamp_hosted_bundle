import React from "react";
import { View } from "react-native";
import AnimatedCircularProgress from "../AnimatedCircleProgress/AnimatedCircularProgress";
import styles from "./styles";
import SpendingIcon from "../../../assets/SVGs/SpendingIcon";
import { globalColors } from "../../../GlobalStyles";
import formatNumber from "../../formatNumber";
import { Text } from "native-base";

export default Chart = props => {
  const { translate } = props.screenProps;
  let { detail, budget, spends } = props;
  let x = (spends / budget) * 100;

  return (
    <View>
      <AnimatedCircularProgress
        size={detail ? 180 : 80}
        width={detail ? 12 : 5}
        fill={x}
        rotation={0}
        lineCap="round"
        style={styles.chart}
        tintColor={globalColors.orange}
        backgroundColor="#0004"
        tintColorSecondary={globalColors.orange}
        tintColorThirdy={globalColors.green}
        tintColor={globalColors.yellow}
      >
        {fill => (
          <>
            <View style={styles.innerStyle}>
              {detail && <SpendingIcon />}
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: 4
                }}
              >
                {detail && (
                  <Text uppercase style={[styles.chartSubtext]}>
                    {translate("Spend")}
                  </Text>
                )}
                <Text
                  uppercase
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.chartText}
                >
                  ${formatNumber(spends, true)}
                </Text>
                {!detail && (
                  <Text uppercase style={[styles.chartSubtext]}>
                    {"Spent"}
                  </Text>
                )}
                {detail && (
                  <Text
                    uppercase
                    style={[styles.chartBudgetSubtext]}
                  >{`${translate("out of")} $${budget}`}</Text>
                )}
              </View>
            </View>
          </>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};
