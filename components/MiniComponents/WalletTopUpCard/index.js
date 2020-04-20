import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import { Text } from "native-base";

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
                <Text uppercase style={styles.subHeading}>
                  {translate("Payment Method")}
                </Text>
                <Text uppercase style={styles.subText}>
                  {transaction.payment_type}
                </Text>
              </View>
            )}
            {transaction.payment_type === "MASTERCARD" && (
              <View>
                <Text uppercase style={styles.subHeading}>
                  {transaction.payment_type}
                </Text>
                <Text uppercase style={styles.subText}>
                  xxxx xxxx xxxx {transaction.card_ending_with}
                </Text>
              </View>
            )}
            <View style={styles.transactionView}>
              <Text uppercase style={styles.subHeading}>
                {translate("Transaction ID")}
              </Text>
              <Text uppercase style={styles.subText}>
                {transaction.reference_id}
              </Text>
            </View>
          </View>
          <View>
            <Text uppercase style={styles.amountText}>
              {translate("Amount")}
            </Text>
            <Text uppercase style={styles.amountValue}>
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
