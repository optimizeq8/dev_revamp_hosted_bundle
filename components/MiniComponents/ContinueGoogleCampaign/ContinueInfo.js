import React from "react";
import { View, FlatList } from "react-native";
import { Content, Text } from "native-base";
import GoogleAds from "../../../assets/SVGs/GoogleAds";
import MediaBox from "../../Screens/CampaignDetails/MediaBox";
import styles from "./styles";
import formatNumber from "../../formatNumber";
import dateFormat from "dateformat";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { connect } from "react-redux";
import { Small } from "../StyledComponents";
import GoogleSEAPreview from "../GoogleSEAPreview";

/**
 * Functional component that displays information about an incomplete campaign to resume
 *
 * @param {Objec} props
 * @param {Object} campaign the saved data from a previous campaign
 */
ContinueInfo = props => {
  let { campaign, screenProps } = props;
  const { translate } = screenProps;

  return (
    <View style={styles.container}>
      <Content
        contentContainerStyle={styles.contentContainer}
        style={styles.contentStyle}
      >
        <GoogleAds style={styles.icon} />
        {campaign.name ? (
          <Text style={styles.text}>{campaign.name}</Text>
        ) : null}
        {campaign.budget !== 0 && (
          <View style={styles.sections}>
            <Text uppercase style={styles.text}>
              {translate("Budget")}
            </Text>
            <Text style={[globalStyles.numbers, { fontSize: 24 }]}>
              {formatNumber(campaign.budget)}
            </Text>
          </View>
        )}
        <View style={styles.sections}>
          <Text uppercase style={[styles.text, { fontSize: 14 }]}>
            {translate("Duration")}
          </Text>
          {campaign.start_time !== "" ? (
            new Date(campaign.start_time) < new Date() ? (
              <Text style={styles.text}>
                {translate("The date is no longer applicable")}
              </Text>
            ) : (
              <Text style={globalStyles.numbers}>
                {dateFormat(new Date(campaign.start_time), "mmm dS, yyyy")}{" "}
                <Small>to</Small>{" "}
                {dateFormat(new Date(campaign.end_time), "mmm dS, yyyy")}
              </Text>
            )
          ) : (
            <Text style={styles.text}>{translate("No dates selected")}</Text>
          )}
        </View>
        <View style={styles.previewContainer}>
          <GoogleSEAPreview
            screenProps={screenProps}
            headline1={campaign.headline1}
            headline2={campaign.headline2}
            headline3={campaign.headline3}
            finalurl={campaign.finalurl}
            path1={campaign.path1}
            path2={campaign.path2}
            description={campaign.description}
            description2={campaign.description2}
            language={campaign.language}
          />
        </View>
      </Content>
    </View>
  );
};

const mapStateToProps = state => ({
  campaign: state.googleAds
});

export default connect(mapStateToProps, null)(ContinueInfo);
