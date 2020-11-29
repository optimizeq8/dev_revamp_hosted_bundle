import React from "react";
import { View, Text } from "react-native";
import Intercom from "react-native-intercom";
import analytics from "@segment/analytics-react-native";

import Rejected from "../../../assets/SVGs/Rejected.svg";
import CustomButtons from "../../MiniComponents/CustomButtons";

import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";

export default RejectedInfo = (props) => {
  const {
    review_status_reason,
    review_status_help,
    navigation,
    campaign_id,
    ad,
    errors,
    error_type,
  } = props;
  const { translate } = props.screenProps;
  handleSupportPage = () => {
    props.navigation.navigate("WebView", {
      url: review_status_help,
      title: "Support",
      source: "ad_detail",
      source_action: "a_help",
    });
  };
  let list = errors.map((e, i) => (
    <View style={styles.rejectedReasonContainer} key={i}>
      <Text style={styles.reviewStatusReason}>{e.name}</Text>
      {/* <Text style={styles.reviewStatusText}>
        {translate("You can find more details here")}
      </Text> */}
      <Text
        selectable={true}
        style={[
          styles.reviewStatusText,
          { fontFamily: "montserrat-regular-english" },
        ]}
      >
        {e.description}
      </Text>
    </View>
  ));
  return (
    <View style={styles.rejectedHeader}>
      <View
        style={{ display: "flex", alignItems: "center", flexDirection: "row" }}
      >
        <Rejected width={25} />
        <Text uppercase style={styles.adRejectedTitle}>
          {translate("Ad Rejected")}
        </Text>
      </View>

      <Text style={styles.hereReasonsText}>
        {translate("Here Are The Reasons")}:
      </Text>
      {list}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <GradientButton
          transparent
          screenProps={props.screenProps}
          uppercase
          width={"47%"}
          height={47}
          style={styles.contactUsBtn}
          text={translate("Contact Us")}
          onPressAction={() => {
            analytics.track(`a_help`, {
              source: "campaign_details",
              source_action: "a_help",
              support_type: "intercom",
            });
            Intercom.displayMessageComposer();
            // props.navigation.navigate("Messenger", {
            //   source: "campaign_details",
            //   source_action: "a_help",
            // });
          }}
        />

        <CustomButtons
          screenProps={props.screenProps}
          onPressFunction={() => {
            /**
             * there are three error types that will come back if the ad is rejected
             * 1 related to the Ad content
             * 2 related to the keywords
             * 3 rejection includes both (in this case I have both screens right after eachother)
             * and the whole review is submitted through the keywords api
             *
             */
            if (error_type === 1)
              navigation.navigate("GoogleAdDesign", {
                rejected: true,
                id: campaign_id,
                ad: ad,
                error_type: error_type,
                source: "campaign_detail",
                source_action: "a_review_ad",
              });
            else if (error_type === 2)
              props.navigation.navigate("GoogleEditKeywords", {
                rejected: true,
                error_type: error_type,
                source: "campaign_detail",
                source_action: "a_review_ad",
              });
            else
              props.navigation.navigate("GoogleAdDesign", {
                rejected: true,
                id: campaign_id,
                ad: ad,
                error_type: error_type,
                source: "campaign_detail",
                source_action: "a_review_ad",
              });
          }}
          content="Fix Now"
          filled
          buttonStyle={styles.customButtonStyle}
          textStyle={styles.customButtonText}
        />
      </View>
    </View>
  );
};
