import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";

// Styles
import styles from "./styles";

// MiniComponent
import GradientButton from "../../../MiniComponents/GradientButton";
import Header from "../../../MiniComponents/Header";

/**
 * modal tha displays the rejected reason, will be modified in the future to contain more  info
 */
export default (props) => {
  let {
    rejectedReason,
    isVisible,
    setModalVisible,
    screenProps,
    selectedCampaign,
  } = props;
  const { translate } = screenProps;

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={isVisible}
      style={styles.modalView}
    >
      <BlurView intensity={95} tint="dark" style={{ height: "100%" }}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Header
          screenProps={screenProps}
          closeButton={true}
          actionButton={() => setModalVisible(false)}
          title={"Rejected Reason"}
        />

        <ScrollView style={styles.rejectModalView}>
          {rejectedReason &&
            rejectedReason.length > 0 &&
            rejectedReason.map((reason, index) => (
              <View style={styles.reasonView} key={index}>
                <View style={styles.reasonNumberView}>
                  <Text style={[styles.rejectReasonWord]}>{index + 1}</Text>
                </View>

                <Text style={styles.rejectedModalReasonText}>{reason}</Text>
              </View>
            ))}
        </ScrollView>
        <GradientButton
          screenProps={screenProps}
          text={translate("Update Ad")}
          width={200}
          height={50}
          uppercase
          style={styles.updateAdButton}
          onPressAction={() => {
            setModalVisible(false);
            props.handleSnapchatRejection(props.selectedCampaign);
          }}
        />
        <TouchableOpacity
          style={styles.returnAmountWalletLinkView}
          onPress={() => {
            setModalVisible(false);
            props.getWalletAmountInKwd(selectedCampaign.lifetime_budget_micro);
            props.navigation.navigate("PaymentForm", {
              amount: selectedCampaign.lifetime_budget_micro,
              refundAmountToWallet: true,
              selectedCampaign: selectedCampaign,
              source: "open_wallet",
              source_action: "a_return_amount_to_wallet",
            });
          }}
        >
          <Text style={styles.returnAmountWalletLinkText}>
            {translate("Return amount to wallet")}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};
