import React from "react";
import { Text, View } from "react-native";
import RejectedIcon from "../../../../assets/SVGs/CampaignDetail/RejectedIcon";
import { globalColors } from "../../../../GlobalStyles";
import Info from "../../../../assets/SVGs/Info.svg";
import styles from "./styles";

/**
 * displayes the rejected reasons for snapchat
 * @param props.setModalVisible function that opens the modal and sets the reason in it's number in
 *  the state to show it in a modal
 */
export default props => {
  let { reason, setModalVisible, index } = props;

  return (
    <View style={styles.rejectedReasonContainer}>
      <RejectedIcon fill={globalColors.orange} />
      <View>
        <Text uppercase style={styles.reasonTitle}>
          Rejected Reason {index}
        </Text>
        <Text
          style={styles.rejectedReasonText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {reason}
        </Text>
      </View>
      <Info onPress={() => setModalVisible(true, reason, index)} />
    </View>
  );
};
