import React from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
import { Small } from "../../../MiniComponents/StyledComponents";
import GradientButton from "../../../MiniComponents/GradientButton";

const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.abs(num).toFixed(Number.isInteger(num) ? 0 : 2);
};
export default (props) => {
  let { content, selected, onPressFunction } = props;
  return (
    <GradientButton
      gradientDirection="horizontal"
      onPressAction={() => onPressFunction(!selected ? content : {})}
      transparent={!selected}
      style={selected ? styles.filledButton : styles.emptyButton}
    >
      <View style={styles.keywordRowOuterView}>
        <Text
          uppercase
          numberOfLines={1}
          style={[styles.contentStyle, { flex: 1 }]}
        >
          {content.keyword}
        </Text>
        <View style={styles.keywordRowView}>
          <View style={styles.displayStatsView}>
            <Small style={{ fontSize: RFValue(4, 414) }}>$</Small>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                styles.numbercontentStyle,
                { textTransform: "uppercase" },
              ]}
            >
              {kFormatter(content.spend)}
            </Text>
          </View>
          <View style={styles.displayStatsView}>
            <Text
              numberOfLines={2}
              style={[
                styles.numbercontentStyle,
                { textAlign: "center", display: "flex" },
                { textTransform: "uppercase" },
              ]}
            >
              {kFormatter(content.clicks)}
            </Text>
          </View>
          <View style={styles.displayStatsView}>
            <Text style={[styles.numbercontentStyle, { textAlign: "right" }]}>
              {content.ctr}
            </Text>
            <Small style={{ fontSize: RFValue(4.5, 414) }}>%</Small>
          </View>
        </View>
      </View>
    </GradientButton>
  );
};
