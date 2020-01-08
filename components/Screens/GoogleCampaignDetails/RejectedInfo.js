import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import Rejected from "../../../assets/SVGs/Rejected.svg";
import Info from "../../../assets/SVGs/Info.svg";
import CustomButtons from "../../MiniComponents/CustomButtons";

import styles from "./styles";

export default RejectedInfo = props => {
  const {
    review_status_reason,
    review_status_help,
    navigation,
    campaign_id,
    ad,
    errors,
    error_type
  } = props;
  const { translate } = props.screenProps;
  handleSupportPage = () => {
    props.navigation.push("WebView", {
      url: review_status_help,
      title: "Support"
    });
  };
  let list = errors.map((e, i) => (
    <View style={styles.rejectedReasonContainer} key={i}>
      <Text uppercase style={styles.reviewStatusReason}>
        {e.name}
      </Text>
      {/* <Text style={styles.reviewStatusText}>
        {translate("You can find more details here")}
      </Text> */}
      <Text
        selectable={true}
        style={[
          styles.reviewStatusText,
          { fontFamily: "montserrat-regular-english" }
        ]}
        numberOfLines={2}
      >
        {e.description}
      </Text>
      {/* <Info onPress={this.handleSupportPage} style={styles.infoButton} /> */}
    </View>
  ));
  return (
    <View style={styles.rejectedHeader}>
      <Rejected />
      <Text uppercase style={styles.adRejectedTitle}>
        {translate("Ad Rejected")}
      </Text>
      <Text style={styles.hereReasonsText}>
        {translate("Here Are The Reasons")}:
      </Text>
      {list}
      <CustomButtons
        screenProps={props.screenProps}
        onPressFunction={() => {
          if (error_type === 1)
            navigation.push("GoogleAdDesign", {
              rejected: true,
              id: campaign_id,
              ad: ad,
              error_type: error_type
            });
          else if (error_type === 2)
            props.navigation.push("GoogleEditKeywords", {
              rejected: true,
              error_type: error_type
            });
          else
            props.navigation.push("GoogleAdDesign", {
              rejected: true,
              id: campaign_id,
              ad: ad,
              error_type: error_type
            });
        }}
        content="Review Ad"
        filled
        buttonStyle={styles.customButtonStyle}
        textStyle={styles.customButtonText}
      />
    </View>
  );
};
