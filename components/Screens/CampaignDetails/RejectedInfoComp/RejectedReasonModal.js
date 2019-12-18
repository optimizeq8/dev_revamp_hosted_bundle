import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import Header from "../../../MiniComponents/Header";
import { BlurView } from "expo-blur";
import { globalColors } from "../../../../GlobalStyles";
import RejectedIcon from "../../../../assets/SVGs/CampaignDetail/RejectedIcon";
import styles from "./styles";

/**
 * modal tha displays the rejected reason, will be modified in the future to contain more  info
 */
export default props => {
  let {
    reasonNum,
    rejectedReason,
    isVisible,
    setModalVisible,
    screenProps
  } = props;
  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={isVisible}
      style={{ margin: 0 }}
    >
      <BlurView intensity={95} tint="dark" style={{ height: "100%" }}>
        <SafeAreaView
          forceInset={{ bottom: "never", top: "always" }}
          style={{ height: "100%" }}
        >
          <Header
            screenProps={screenProps}
            title={""}
            closeButton={true}
            actionButton={() => setModalVisible(false)}
          />
          <View style={{ top: "5%" }}>
            <View style={styles.rejectedModalTitleContainer}>
              <RejectedIcon fill={globalColors.orange} />
              <Text style={[styles.reasonTitle, { fontSize: 20 }]}>
                Rejected Reason {reasonNum}
              </Text>
            </View>
            <Text style={styles.rejectedModalReasonText}>{rejectedReason}</Text>
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};
