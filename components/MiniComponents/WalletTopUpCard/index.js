import React, { Component } from "react";
import { View, I18nManager, Text } from "react-native";

// styles
import styles from "./styles";

class WalletCard extends Component {
  render() {
    let transaction = this.props.transaction;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.walletCard} key={transaction.id}>
        <Text style={styles.paymentDate}>{transaction.payment_date}</Text>
        <View style={styles.flexBox}>
          <View>
            {transaction.payment_type === "KNET" && (
              <View>
                <Text style={styles.subHeading}>
                  {translate("Payment Method")}
                </Text>
                <Text style={styles.subText}>{transaction.payment_type}</Text>
              </View>
            )}
            {transaction.payment_type === "MASTERCARD" && (
              <View>
                <Text style={styles.subHeading}>
                  {transaction.payment_type}
                </Text>
                <Text style={styles.subText}>
                  xxxx xxxx xxxx {transaction.card_ending_with}
                </Text>
              </View>
            )}
            <View style={styles.transactionView}>
              <Text style={styles.subHeading}>
                {translate("Transaction ID")}
              </Text>
              <Text style={styles.subText}>{transaction.reference_id}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.amountText}>{translate("Amount")}</Text>
            <Text style={styles.amountValue}>
              {I18nManager.isRTL && "$"}
              {transaction.total_amount}
              {!I18nManager.isRTL && "$"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default WalletCard;
