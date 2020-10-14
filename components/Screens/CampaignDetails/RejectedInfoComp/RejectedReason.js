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
    <View style={styles.rejectedReasonView}>
      {/* <Text uppercase style={styles.reasonTitle}>
        {index}.{" "}
      </Text> */}
      <View
        style={{
          display: "flex",
          width: 10,
          height: 10,
          // borderWidth: 1,
          backgroundColor: "#EA514B",
          borderRadius: 20,
          alignSelf: "center",
        }}
      />
      <Text
        style={styles.rejectedReasonText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {reason}
      </Text>
    </View>
  );
};
