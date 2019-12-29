import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import LowerButton from "../../MiniComponents/LowerButton";
import Rejected from "../../../assets/SVGs/Rejected.svg";
import Info from "../../../assets/SVGs/Info.svg";
import CustomButtons from "../../MiniComponents/CustomButtons";

import styles from "./styles";

export default RejectedInfo = props => {
  const {
    loading,
    review_status_reason,
    review_status_help,
    navigation,
    campaign_id,
    ad
  } = props;
  const { translate } = props.screenProps;
  handleSupportPage = () => {
    props.navigation.push("WebView", {
      url: review_status_help,
      title: "Support"
    });
  };
  return (
    <View style={styles.rejectedHeader}>
      <Rejected />
      <Text uppercase style={styles.adRejectedTitle}>
        {translate("Ad Rejected")}
      </Text>
      <Text style={styles.hereReasonsText}>
        {translate("Here Are The Reasons")}:
      </Text>
      <View style={styles.rejectedReasonContainer}>
        <Text uppercase style={styles.reviewStatusReason}>
          {review_status_reason}
        </Text>
        <Text style={styles.reviewStatusText}>
          {translate("You can find more details here")}
        </Text>
        <Text
          selectable={true}
          //   onPress={this.handleSupportPage}
          style={[
            styles.reviewStatusText,
            { fontFamily: "montserrat-regular-english" }
          ]}
          numberOfLines={2}
        >
          {review_status_help}
        </Text>
        <Info onPress={this.handleSupportPage} style={styles.infoButton} />
      </View>

      <CustomButtons
        screenProps={props.screenProps}
        onPressFunction={() =>
          navigation.push("GoogleAdDesign", {
            rejected: true,
            campaign_id: campaign_id,
            ad: ad
          })
        }
        content="Review Ad"
        filled
        buttonStyle={styles.customButtonStyle}
        textStyle={styles.customButtonText}
      />
    </View>
  );
};
