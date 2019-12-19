import React from "react";
import PlaceholderLine from "../PlaceholderLine";
import { View } from "react-native";
import styles from "./styles";
import ProgressBar from "../ProgressBar";
import dateFormat from "dateformat";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Text } from "native-base";
import TimeDifferance from "../../Functions/TimeDifferance";
import { globalColors } from "../../../GlobalStyles";
import isNaN from "lodash/isNaN";
export default props => {
  let { campaign, loading, translate } = props;
  let statusOfCampaign = campaign
    ? new Date().setHours(0, 0, 0, 0) <
      new Date(campaign.start_time).setHours(0, 0, 0, 0)
      ? "starts"
      : new Date().setHours(0, 0, 0, 0) <
        new Date(campaign.end_time).setHours(0, 0, 0, 0)
      ? "ends"
      : "ended"
    : "";
  let currentDate = new Date();
  return (
    <View style={{ alignSelf: "center", top: 10 }}>
      {loading ? (
        <PlaceholderLine width={widthPercentageToDP(85)} />
      ) : (
        <View>
          {statusOfCampaign !== "starts" &&
            (new Date().setHours(0, 0, 0, 0) <=
              new Date(campaign.end_time).setHours(0, 0, 0, 0) &&
            new Date().setHours(0, 0, 0, 0) >=
              new Date(campaign.start_time).setHours(0, 0, 0, 0) &&
            campaign.campaign_end === "0" ? (
              <Text style={styles.subtext}>
                {TimeDifferance(new Date(), campaign.end_time)} Day(s) left
              </Text>
            ) : (
              <Text style={styles.subtext}>campaign ended</Text>
            ))}
          <ProgressBar
            color={globalColors.orange}
            progress={
              statusOfCampaign === "starts"
                ? 0
                : TimeDifferance(campaign.start_time, currentDate) /
                  TimeDifferance(campaign.start_time, campaign.end_time)
            }
            borderWidth={0}
            unfilledColor="#0004"
            height={25}
            borderRadius={30}
            width={widthPercentageToDP(90)}
          />
          {statusOfCampaign !== "ended" && (
            <Text style={[styles.chartSubtext, { alignSelf: "flex-start" }]}>
              {`Campaign ${statusOfCampaign} on ` +
                dateFormat(
                  new Date(
                    statusOfCampaign === "starts"
                      ? campaign.start_time
                      : campaign.end_time
                  ).setHours(0, 0, 0, 0),
                  "mmm dS, yyyy"
                )}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
