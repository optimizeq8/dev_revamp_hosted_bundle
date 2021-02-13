import React from "react";
import { View, Text, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
import ClicksIcon from "../../../../assets/SVGs/Performance/Clicks";
import ImpressionsIcon from "../../../../assets/SVGs/Performance/Impressions";
import CPCIcon from "../../../../assets/SVGs/Performance/CPC";
import CTRIcon from "../../../../assets/SVGs/Performance/CTR";
import SpendIcon from "../../../../assets/SVGs/Performance/Spend";
import { Small } from "../../../MiniComponents/StyledComponents";
import globalStyles from "../../../../GlobalStyles";
const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.abs(num).toFixed(Number.isInteger(num) ? 0 : 2);
};
export default (props) => {
  const { translate } = props.screenProps;
  let { content } = props;

  return (
    <ScrollView>
      <View style={styles.bottomView}>
        <Text style={[styles.contentStyle]}>{content.keyword}</Text>
        <View style={styles.performanceView}>
          <Text style={styles.titleHeading}>{translate("Performance")}</Text>
        </View>
        <View style={styles.statsOuterBlock}>
          <View style={styles.outerBlock}>
            <SpendIcon width={RFValue(13, 414)} fill={"#fff"} />
            <View style={styles.innerBlock}>
              <Text style={styles.title}>{translate("Spend")}</Text>
              <View style={globalStyles.row}>
                <Small
                  style={[
                    styles.number,
                    { fontSize: RFValue(5, 414), lineHeight: RFValue(9, 414) },
                  ]}
                >
                  $
                </Small>
                <Text style={styles.number}>{kFormatter(content.spend)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.outerBlock}>
            <ClicksIcon width={RFValue(13, 414)} fill={"#fff"} />
            <View style={styles.innerBlock}>
              <Text style={styles.title}>{translate("clicks")}</Text>
              <Text style={styles.number}>{kFormatter(content.clicks)}</Text>
            </View>
          </View>
          <View style={styles.outerBlock}>
            <CTRIcon width={RFValue(13, 414)} fill={"#fff"} />
            <View style={styles.innerBlock}>
              <Text style={styles.title}>{translate("ctr")}</Text>
              <View style={globalStyles.row}>
                <Text style={styles.number}>{content.ctr}</Text>
                <Small
                  style={[
                    styles.number,
                    { fontSize: RFValue(5, 414), lineHeight: RFValue(9, 414) },
                  ]}
                >
                  %
                </Small>
              </View>
            </View>
          </View>
          <View style={styles.outerBlock}>
            <CPCIcon width={RFValue(13, 414)} fill={"#fff"} />
            <View style={styles.innerBlock}>
              <Text style={styles.title}>
                {translate("COST")}{" "}
                <Text style={styles.subText}>{translate("per click")}</Text>
              </Text>
              <View style={globalStyles.row}>
                <Small
                  style={[
                    styles.number,
                    { fontSize: RFValue(5, 414), lineHeight: RFValue(9, 414) },
                  ]}
                >
                  $
                </Small>
                <Text style={styles.number}>{kFormatter(content.cpc)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.outerBlock}>
            <ImpressionsIcon width={RFValue(13, 414)} fill={"#fff"} />
            <View style={styles.innerBlock}>
              <Text style={styles.title}>{translate("Impressions")}</Text>
              <Text style={styles.number}>
                {kFormatter(content.impressions)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
