import React from "react";
import { View, I18nManager } from "react-native";
import { Text } from "native-base";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import LowerButton from "../../MiniComponents/LowerButton";

import styles from "./styles";

export default function(props) {
  const { loading, keywords } = props;
  const { translate } = props.screenProps;
  // console.log("first keywords", keywords);

  let listKeyWords = [];
  // to diplay top 3 keywords
  // if (!loading)
  if (keywords.length > 3) {
    listKeyWords = keywords.map((key, index) => {
      if (index < 3) {
        return key;
      }
      return null;
    });
    listKeyWords = listKeyWords.filter(key => key !== null);
  } else {
    listKeyWords = [...keywords];
  }
  // console.log("keywords", listKeyWords);

  return (
    <View style={styles.keywordContainer}>
      <View style={styles.subHeadingView}>
        <Text uppercase style={[styles.subHeadings, { paddingVertical: 10 }]}>
          {translate("Keywords")}
        </Text>
        {!loading && (
          <LowerButton
            function={() => props.navigation.push("GoogleKeywordsStats")}
            width={40}
            height={40}
            isRTL={I18nManager.isRTL}
            style={{
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FF9D00",
              borderRadius: 50,
              paddingLeft: 10,
              paddingRight: 6
            }}
          />
        )}
      </View>
      {/* )} */}
      <View style={styles.targetingContainer}>
        {listKeyWords && listKeyWords.length > 0 && (
          <Text uppercase style={styles.subHeading}>
            {translate("Best Performing")}
          </Text>
        )}
        {loading ? (
          <View style={styles.placeholderView}>
            <PlaceholderLine />
          </View>
        ) : listKeyWords && listKeyWords.length > 0 ? (
          listKeyWords.map(key => (
            <View key={key.keyword} style={styles.keywordView}>
              <Text numberOfLines={1} style={styles.keyword}>
                {key.keyword}
              </Text>
            </View>
          ))
        ) : (
          <View>
            <Text uppercase style={styles.subHeading}>
              {translate("No available keywords")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
