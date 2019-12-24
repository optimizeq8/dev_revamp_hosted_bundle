import React from "react";
import { View, I18nManager } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import { Text } from "native-base";
import LowerButton from "../../MiniComponents/LowerButton";
import NavigationService from "../../../NavigationService";
import globalStyles from "../../../GlobalStyles";
/**
 * @param {array} data
 * @param {string} data.heading
 * @param {node} data.icon
 * @param {string} data.content
 * @param {string} navigatingRoutePath To redirect to next screen
 *
 */
export default AundienceOverView = props => {
  let {
    data,
    loading,
    navigatingRoutePath,
    selectedCampaign,
    editCampaign
  } = props;
  const { translate } = props.screenProps;
  return (
    <View style={styles.audienceOverview}>
      {loading ? (
        <View style={styles.placeholderView}>
          <PlaceholderLine />
        </View>
      ) : (
        <View style={styles.audienceHeadingView}>
          <Text uppercase style={[globalStyles.title, { fontSize: 18 }]}>
            {translate("Audience")}
          </Text>
          <LowerButton
            function={() =>
              NavigationService.navigate(navigatingRoutePath, {
                editCampaign,
                campaign: selectedCampaign
              })
            }
            width={I18nManager.isRTL ? 8 : 40}
            height={40}
            isRTL={I18nManager.isRTL}
            style={styles.proceedLowerButton}
          />
        </View>
      )}

      <View style={styles.targetingContainer}>
        {data &&
          data.map(info => (
            <View key={info.heading} style={styles.categoryView}>
              {info.icon}
              {loading ? (
                <View style={styles.placeholderView}>
                  <PlaceholderLine />
                </View>
              ) : (
                <View>
                  <Text style={styles.categories}>
                    {translate(info.heading)}
                  </Text>
                  <Text numberOfLines={1} style={styles.subtext}>
                    {info.content}
                  </Text>
                </View>
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

AundienceOverView.propTypes = {
  translate: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
  navigatingRoutePath: PropTypes.string,
  selectedCampaign: PropTypes.object
};
