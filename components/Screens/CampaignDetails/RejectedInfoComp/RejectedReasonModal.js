import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { RFValue } from "react-native-responsive-fontsize";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";

// Styles
import styles from "./styles";

// MiniComponent
import GradientButton from "../../../MiniComponents/GradientButton";
import Header from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

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
    mainBusiness,
    navigation,
    updateBrandNameLoading,
  } = props;
  const { translate } = screenProps;
  let { campaign_end, refund_request, brand_name_rejection } = selectedCampaign;
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
          {brand_name_rejection === 1 && (
            <View style={styles.brandRejection}>
              <Text style={[styles.rejectedModalReasonBrandText]}>
                {`${translate(`Will Change your Brand Name from`)} ${
                  selectedCampaign.brand_name
                } ${translate("to")} ${mainBusiness.businessname}`}
              </Text>
              <Text style={[styles.rejectedModalReasonBrandText]}>
                {translate(`Do you accept to make this change?`)}
              </Text>
              <View style={styles.buttonView}>
                <GradientButton
                  screenProps={screenProps}
                  text={translate("Update Ad")}
                  width={RFValue(50, 414)}
                  height={RFValue(25, 414)}
                  uppercase
                  style={styles.updateAdBrandButton}
                  onPressAction={() => {
                    setModalVisible(false);
                    props.handleSnapchatRejection(props.selectedCampaign);
                  }}
                  transparent
                  disabled={updateBrandNameLoading}
                />
                {!updateBrandNameLoading && (
                  <GradientButton
                    screenProps={screenProps}
                    text={translate("Accept")}
                    width={RFValue(50, 414)}
                    height={RFValue(25, 414)}
                    uppercase
                    style={styles.updateAdButton}
                    onPressAction={() => {
                      props.updateCampaignBrandName(
                        selectedCampaign.campaign_id,
                        navigation,
                        setModalVisible
                      );
                    }}
                    disabled={updateBrandNameLoading}
                  />
                )}
                {updateBrandNameLoading && (
                  <ForwardLoading
                    mainViewStyle={{
                      width: widthPercentageToDP(5),
                      height: heightPercentageToDP(5),
                    }}
                    bottom={9}
                    style={{
                      width: widthPercentageToDP(5),
                      height: heightPercentageToDP(5),
                    }}
                  />
                )}
              </View>
            </View>
          )}
        </ScrollView>
        {!brand_name_rejection &&
          campaign_end === "0" &&
          refund_request === "0" && (
            <GradientButton
              screenProps={screenProps}
              text={translate("Update Ad")}
              width={RFValue(100, 414)}
              height={RFValue(25, 414)}
              uppercase
              style={styles.updateAdButton}
              onPressAction={() => {
                setModalVisible(false);
                if (brand_name_rejection) {
                  props.updateCampaignBrandName(selectedCampaign.campaign_id);
                } else props.handleSnapchatRejection(props.selectedCampaign);
              }}
            />
          )}
        {campaign_end === "0" && refund_request === "0" && (
          <TouchableOpacity
            style={styles.returnAmountWalletLinkView}
            onPress={() => {
              setModalVisible(false);
              props.getWalletAmountInKwd(
                selectedCampaign.lifetime_budget_micro
              );
              props.navigation.navigate("PaymentForm", {
                amount: selectedCampaign.lifetime_budget_micro,
                refundAmountToWallet: true,
                selectedCampaign: selectedCampaign,
                keep_campaign: selectedCampaign.spends > 0 ? 1 : 0,
                source: "open_wallet",
                source_action: "a_return_amount_to_wallet",
              });
            }}
          >
            <Text style={styles.returnAmountWalletLinkText}>
              {translate("Return amount to wallet")}
            </Text>
          </TouchableOpacity>
        )}
      </BlurView>
    </Modal>
  );
};
