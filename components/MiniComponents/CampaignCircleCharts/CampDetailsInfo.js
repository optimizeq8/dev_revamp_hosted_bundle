import React from "react";
import PlaceholderLine from "../PlaceholderLine";
import { View, Text } from "react-native";
import styles from "./styles";
import ProgressBar from "../ProgressBar";
import dateFormat from "dateformat";
import { widthPercentageToDP } from "react-native-responsive-screen";
import TimeDifferance from "../../Functions/TimeDifferance";
import { globalColors } from "../../../GlobalStyles";
import isNaN from "lodash/isNaN";
export default (props) => {
  let { campaign, loading, screenProps } = props;
  let { translate } = screenProps;
  let statusOfCampaign = campaign
    ? new Date().setUTCHours(0, 0, 0, 0) <
        new Date(campaign.start_time).setUTCHours(0, 0, 0, 0) ||
      campaign.review_status === "PENDING"
      ? "starts"
      : new Date().setUTCHours(0, 0, 0, 0) <=
        new Date(campaign.end_time).setUTCHours(0, 0, 0, 0)
      ? "ends"
      : "ended"
    : "";
  let currentDate = new Date().toISOString();

  return (
    <View style={{ alignSelf: "center", top: 10 }}>
      {loading ? (
        <PlaceholderLine width={widthPercentageToDP(85)} />
      ) : (
        <View>
          {statusOfCampaign !== "starts" &&
            (new Date().setUTCHours(0, 0, 0, 0) <=
              new Date(campaign.end_time).setUTCHours(0, 0, 0, 0) &&
            new Date().setUTCHours(0, 0, 0, 0) >=
              new Date(campaign.start_time).setUTCHours(0, 0, 0, 0) &&
            campaign.campaign_end === "0" ? (
              <Text style={[styles.subtext]}>
                {TimeDifferance(currentDate, campaign.end_time) === 0
                  ? 1
                  : TimeDifferance(currentDate, campaign.end_time) === 0}{" "}
                {translate("Day(s) left")}
              </Text>
            ) : (
              <Text style={styles.subtext}>{translate("Campaign ended")}</Text>
            ))}
          <ProgressBar
            color={globalColors.orange}
            progress={
              statusOfCampaign === "starts"
                ? 0
                : (TimeDifferance(campaign.start_time, currentDate) + 1) /
                  (TimeDifferance(campaign.start_time, campaign.end_time) === 0
                    ? 1
                    : TimeDifferance(campaign.start_time, campaign.end_time) +
                      1)
            }
            borderWidth={0}
            unfilledColor="#0004"
            height={25}
            borderRadius={30}
            width={widthPercentageToDP(90)}
          />
          {statusOfCampaign !== "ended" && (
            <Text style={[styles.chartSubtext, { alignSelf: "flex-start" }]}>
              {translate(`Campaign {{statusOfCampaign}} on`, {
                statusOfCampaign: translate(statusOfCampaign),
              }) +
                " " +
                dateFormat(
                  new Date(
                    statusOfCampaign === "starts"
                      ? campaign.start_time.split("T")[0]
                      : campaign.end_time.split("T")[0]
                  ),
                  "mmm dS, yyyy"
                )}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
