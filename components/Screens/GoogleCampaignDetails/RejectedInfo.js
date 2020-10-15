import React from "react";
import { View, Text } from "react-native";
import Rejected from "../../../assets/SVGs/Rejected.svg";
import Info from "../../../assets/SVGs/Info.svg";
import CustomButtons from "../../MiniComponents/CustomButtons";

import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

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
      <View
        style={{
          display: "flex",
          width: 20,
          height: 20,
          backgroundColor: globalColors.orange,
          borderRadius: 30,
          marginRight: 5,
        }}
      />
      <Text style={styles.reviewStatusReason}>{e.name}</Text>
      {/* <Text style={styles.reviewStatusText}>
        {translate("You can find more details here")}
      </Text> */}
      {/* <Text
        selectable={true}
        style={[
          styles.reviewStatusText,
          { fontFamily: "montserrat-regular-english" },
        ]}
      >
        {e.description}
      </Text> */}
      {/* <Info onPress={this.handleSupportPage} style={styles.infoButton} /> */}
    </View>
  ));
  return (
    <View style={styles.rejectedHeader}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Rejected width={20} height={20} />
        <Text style={styles.adRejectedTitle}>{translate("Ad Rejected")}</Text>
      </View>

      <Text style={styles.hereReasonsText}>
        {errors.length === 1
          ? `There is ${errors.length} reason for this`
          : `There are ${errors.length} reasons for this`}
        :
      </Text>
      {list}
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
  );
};
