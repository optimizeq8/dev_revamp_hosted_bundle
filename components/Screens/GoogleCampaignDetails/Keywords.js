import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

import styles from "./styles";

export default function (props) {
  const { loading, keywords } = props;
  const { translate } = props.screenProps;

  let listKeyWords = [];
  // to display top 3 keywords

  if (keywords.length > 3) {
    listKeyWords = keywords.map((key, index) => {
      if (index < 3) {
        return key;
      }
      return null;
    });
    listKeyWords = listKeyWords.filter((key) => key !== null);
  } else {
    listKeyWords = [...keywords];
  }

  return (
    <View style={styles.keywordContainer}>
      {loading ? (
        <View style={styles.placeholderView}>
          <PlaceholderLine />
        </View>
      ) : (
        <Text style={[styles.subHeading, { paddingVertical: 10 }]}>
          {translate("Keywords")}
        </Text>
      )}
      <TouchableOpacity
        style={styles.targetingContainer}
        onPress={() => {
          !loading &&
            props.navigation.push("GoogleKeywordsStats", {
              source: "campaign_detail",
              source_action: "a_open_keywords_performance",
            });
        }}
      >
        {listKeyWords && listKeyWords.length > 0 && (
          <Text style={styles.subHeading}>{translate("Best Performing")}</Text>
        )}
        {loading ? (
          <View style={styles.placeholderView}>
            <PlaceholderLine />
          </View>
        ) : listKeyWords && listKeyWords.length > 0 ? (
          listKeyWords.map((key) => (
            <View key={key.keyword} style={styles.keywordView}>
              <Text numberOfLines={1} style={styles.keyword}>
                {key.keyword}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.noKeywordsView}>
            <Text uppercase style={styles.subHeading}>
              {translate("No available keywords")}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
