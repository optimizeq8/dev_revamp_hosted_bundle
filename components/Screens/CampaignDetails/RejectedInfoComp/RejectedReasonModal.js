import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "native-base";
import Modal from "react-native-modal";
import Header from "../../../MiniComponents/Header";
import { BlurView } from "expo-blur";
import styles from "./styles";

/**
 * modal tha displays the rejected reason, will be modified in the future to contain more  info
 */
export default (props) => {
  let { rejectedReason, isVisible, setModalVisible, screenProps } = props;
  // const { translate } = props.screenProps;
  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={isVisible}
      style={{ margin: 0 }}
    >
      <BlurView intensity={95} tint="dark" style={{ height: "100%" }}>
        <SafeAreaView />
        <Header
          screenProps={screenProps}
          closeButton={true}
          actionButton={() => setModalVisible(false)}
        />

        <ScrollView style={styles.rejectModalView}>
          {rejectedReason &&
            rejectedReason.length > 0 &&
            rejectedReason.map((reason, index) => (
              <View style={styles.reasonView} key={index}>
                <Text
                  uppercase
                  style={[styles.reasonTitle, styles.rejectReasonWord]}
                >
                  {index + 1}
                  {".  "}
                </Text>
                <Text style={styles.rejectedModalReasonText}>{reason}</Text>
              </View>
            ))}
        </ScrollView>
      </BlurView>
    </Modal>
  );
};
