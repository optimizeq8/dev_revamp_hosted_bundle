import React from "react";
import { View } from "react-native";

import { Text } from "native-base";
import styles from "./styles";
import ClicksIcon from "../../../../assets/SVGs/Performance/Clicks";
import ImpressionsIcon from "../../../../assets/SVGs/Performance/Impressions";
import CPCIcon from "../../../../assets/SVGs/Performance/CPC";
import CTRIcon from "../../../../assets/SVGs/Performance/CTR";
import SpendIcon from "../../../../assets/SVGs/Performance/Spend";

export default props => {
  const { translate } = props.screenProps;
  let { content } = props;
  kFormatter = num => {
    return Math.abs(num) > 999
      ? (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num).toFixed(2);
  };

  return (
    <View style={styles.bottomView}>
      <View style={styles.performanceView}>
        <Text uppercase style={styles.titleHeading}>
          {translate("Performance")}
        </Text>
      </View>
      <View style={styles.statsOuterBlock}>
        <View style={styles.outerBlock}>
          <SpendIcon width={26} fill={"#fff"} />
          <View style={styles.innerBlock}>
            <Text uppercase style={styles.title}>
              {translate("Spend")}
            </Text>
            <Text style={styles.number}>{this.kFormatter(content.spend)}</Text>
          </View>
        </View>
        <View style={styles.outerBlock}>
          <ClicksIcon width={26} fill={"#fff"} />
          <View style={styles.innerBlock}>
            <Text uppercase style={styles.title}>
              {translate("clicks")}
            </Text>
            <Text style={styles.number}>{this.kFormatter(content.clicks)}</Text>
          </View>
        </View>
        <View style={styles.outerBlock}>
          <CTRIcon width={26} fill={"#fff"} />
          <View style={styles.innerBlock}>
            <Text uppercase style={styles.title}>
              {translate("ctr")}
            </Text>
            <Text style={styles.number}>{content.ctr}</Text>
          </View>
        </View>
        <View style={styles.outerBlock}>
          <CPCIcon width={26} fill={"#fff"} />
          <View style={styles.innerBlock}>
            <Text style={styles.title}>
              {translate("COST")}{" "}
              <Text style={styles.subText}>{translate("per click")}</Text>
            </Text>
            <Text style={styles.number}>{this.kFormatter(content.cpc)}</Text>
          </View>
        </View>
        <View style={styles.outerBlock}>
          <ImpressionsIcon width={26} fill={"#fff"} />
          <View style={styles.innerBlock}>
            <Text uppercase style={styles.title}>
              {translate("Impressions")}
            </Text>
            <Text style={styles.number}>
              {this.kFormatter(content.impressions)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};