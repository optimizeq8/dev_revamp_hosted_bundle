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
export default props => {
  let { campaign, loading } = props;
  const { translate } = props.screenProps;
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
    <View style={{ alignItems: "flex-start", top: 10 }}>
      {loading ? (
        <PlaceholderLine width={widthPercentageToDP(85)} />
      ) : (
        <View>
          {new Date().setHours(0, 0, 0, 0) <=
            new Date(campaign.end_time).setHours(0, 0, 0, 0) &&
            new Date().setHours(0, 0, 0, 0) >=
              new Date(campaign.start_time).setHours(0, 0, 0, 0) && (
              <Text style={styles.subtext}>
                {TimeDifferance(new Date(), campaign.end_time)}{" "}
                {translate("Day(s) left")}
              </Text>
            )}
          <ProgressBar
            screenProps={props.screenProps}
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
          <Text style={[styles.chartSubtext, { alignSelf: "flex-start" }]}>
            {translate(`Campaign {{statusOfCampaign}} on`, {
              statusOfCampaign: translate(statusOfCampaign)
            }) +
              " " +
              dateFormat(
                new Date(
                  statusOfCampaign === "starts"
                    ? campaign.start_time
                    : campaign.end_time
                ).setHours(0, 0, 0, 0),
                "mmm dS, yyyy"
              )}
          </Text>
        </View>
      )}
    </View>
  );
};
