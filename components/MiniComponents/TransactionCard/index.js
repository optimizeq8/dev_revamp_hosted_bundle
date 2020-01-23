import React, { Component } from "react";
import { View } from "react-native";
import { Text, Icon } from "native-base";

// styles
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

// icons
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";
import SnapGhostIcon from "../../../assets/SVGs/Snapchat-Border";
import GoogleSE from "../../../assets/SVGs/GoogleAds.svg";
import isStringArabic from "../../isStringArabic";

class TransactionCard extends Component {
  state = {
    paused: false,
    status: "PAUSED"
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
          {transaction.iswallet === "1" ? (
            <WalletIcon fill="#FFF" style={[styles.icon]} />
          ) : transaction.channel === "snapchat" ? (
            <SnapGhostIcon width={35} height={35} />
          ) : (
            <GoogleSE width={35} height={35} />
          )}
          <Text
            numberOfLines={2}
            uppercase
            style={[
              styles.titleText,
              transaction.campaign_name !== "Wallet Topup" &&
              !isStringArabic(transaction.campaign_name)
                ? {
                    fontFamily: "montserrat-bold-english"
                  }
                : {}
            ]}
          >
            {transaction.campaign_name === "Wallet Topup"
              ? translate("Wallet") + "\t" + translate("Top Up")
              : transaction.campaign_name}
          </Text>
        </View>
        <View style={styles.mainView}>
          <View>
            {(transaction.payment_type === "KNET" ||
              transaction.payment_type === "Wallet") && (
              <View>
                <Text uppercase style={styles.text}>
                  {translate("Payment Method")}
                </Text>
                <Text uppercase style={styles.subText}>
                  {transaction.payment_type}
                </Text>
              </View>
            )}
            {transaction.payment_type === "MASTERCARD" && (
              <View>
                <Text uppercase style={styles.text}>
                  {transaction.payment_type}
                </Text>
                <Text uppercase style={styles.subText}>
                  xxxx xxxx xxxx {transaction.card_ending_with}
                </Text>
              </View>
            )}

            <Text uppercase style={[styles.text, styles.transactionText]}>
              {translate("Transaction ID")}
            </Text>
            <Text style={[styles.subText]}>{transaction.reference_id}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text uppercase style={[styles.amountTextTitle]}>
              {translate("Amount")}
            </Text>
            <Text style={[globalStyles.numbers, styles.amountText]}>
              {transaction.total_amount}$
            </Text>
          </View>
        </View>

        <Text style={[styles.dateText]}>{transaction.payment_date}</Text>
      </View>
    );
  }
}

export default TransactionCard;
