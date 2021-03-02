import React, { Component } from "react";
import { View, I18nManager, Text } from "react-native";
import { Icon } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
// styles
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

// icons
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";
import SnapGhostIcon from "../../../assets/SVGs/Snapchat-Border";
import GoogleSE from "../../../assets/SVGs/GoogleAds.svg";
import InstagramIcon from "../../../assets/images/AdTypes/InstaWhiteLogo";

import isStringArabic from "../../isStringArabic";

class TransactionCard extends Component {
  state = {
    paused: false,
    status: "PAUSED",
  };
  toggleStatus = () => {
    this.setState({ paused: !this.state.paused });
  };
  render() {
    let transaction = this.props.transaction;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.cardStyle}>
        <View style={styles.header}>
          {transaction.channel === "instagram" ? (
            <InstagramIcon
              width={RFValue(17.5, 414)}
              height={RFValue(17.5, 414)}
              fill={"#FFF"}
              //   style={styles.instagramIcon}
            />
          ) : transaction.channel === "snapchat" ? (
            <SnapGhostIcon
              fill={"#000"}
              width={RFValue(17.5, 414)}
              height={RFValue(17.5, 414)}
            />
          ) : transaction.channel === "google" ? (
            <GoogleSE width={RFValue(17.5, 414)} height={RFValue(17.5, 414)} />
          ) : (
            <WalletIcon fill="#FFF" style={[styles.icon]} />
          )}
          <Text
            numberOfLines={2}
            style={[
              styles.titleText,
              transaction.campaign_name !== "Wallet Topup" &&
              !isStringArabic(transaction.campaign_name)
                ? {
                    fontFamily: "montserrat-bold-english",
                  }
                : {},
            ]}
          >
            {transaction.campaign_name === "Wallet Topup"
              ? translate("Wallet") + "\t" + translate("Top Up")
              : transaction.campaign_name}
          </Text>
          {transaction.refunded === "1" && (
            <View style={styles.refundedContainer}>
              <Text style={styles.refundedText}>{translate("Refunded")}</Text>
            </View>
          )}
        </View>
        <View style={styles.mainView}>
          <View>
            <View>
              <Text style={styles.text}>
                {transaction.card_ending_with
                  ? transaction.payment_type
                  : translate("Payment Method")}
              </Text>
              <Text style={styles.subText}>
                {transaction.card_ending_with
                  ? `xxxx xxxx xxxx ${transaction.card_ending_with}`
                  : transaction.payment_type}
              </Text>
            </View>

            <Text style={[styles.text, styles.transactionText]}>
              {translate("Transaction ID")}
            </Text>
            <Text style={[styles.subText]}>{transaction.reference_id}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amountTextTitle]}>{translate("Amount")}</Text>
            <Text style={[globalStyles.numbers, styles.amountText]}>
              {I18nManager.isRTL && "$"}
              {transaction.total_amount}
              {!I18nManager.isRTL && "$"}
            </Text>
          </View>
        </View>

        <Text style={[styles.dateText]}>{transaction.payment_date}</Text>
      </View>
    );
  }
}

export default TransactionCard;
