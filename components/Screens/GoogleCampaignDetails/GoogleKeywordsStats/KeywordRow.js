import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Button, Text } from "native-base";
import styles from "./styles";
import { globalColors } from "../../../../GlobalStyles";

export default props => {
  let { content, selected, onPressFunction } = props;
  kFormatter = num => {
    return Math.abs(num) > 999
      ? (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num).toFixed(2);
  };
  return (
    <TouchableOpacity
      rounded
      onPress={() => onPressFunction(!selected ? content : {})}
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
            <Text uppercase style={[styles.numbercontentStyle, {}]}>
              {this.kFormatter(content.spend)}
            </Text>
          </View>
          <View style={styles.displayStatsView}>
            <Text
              uppercase
              style={[
                styles.numbercontentStyle,
                { textAlign: "center", display: "flex" }
              ]}
            >
              {this.kFormatter(content.clicks)}
            </Text>
          </View>
          <View style={styles.displayStatsView}>
            <Text
              uppercase
              style={[styles.numbercontentStyle, { textAlign: "right" }]}
            >
              {content.ctr}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
