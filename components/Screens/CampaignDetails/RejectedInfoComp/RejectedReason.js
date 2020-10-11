import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

/**
 * displayes the rejected reasons for snapchat
 * @param props.setModalVisible function that opens the modal and sets the reason in it's number in
 *  the state to show it in a modal
 */
export default (props) => {
  let { reason, index } = props;
  return (
    <View>
      <View style={styles.rejectedReasonView}>
        <Text uppercase style={styles.reasonTitle}>
          {index}.{" "}
        </Text>
        <Text
          style={styles.rejectedReasonText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {reason}
        </Text>
      </View>
    </View>
  );
};
