import React, { Component } from "react";
import { View } from "react-native";
import { Text, Icon } from "native-base";

// styles
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

// icons
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet.svg";
import SnapGhostIcon from "../../../assets/SVGs/Snapchat-Border.svg";
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
        <View style={styles.transactionButton}>
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text numberOfLines={2} style={[styles.titleText]}>
                {transaction.campaign_name === "Wallet Topup"
                  ? translate("Wallet") + "\t" + translate("Top Up")
                  : transaction.campaign_name}
              </Text>
            </View>
            {transaction.iswallet === "1" ? (
              <WalletIcon
                fill="#a0a0a0"
                style={[styles.icon, styles.iconWallet]}
              />
            ) : (
              <SnapGhostIcon
                // type="MaterialCommunityIcons"
                // name="snapchat"

                width={40}
                style={[styles.icon]}
              />
            )}

            <Text style={[styles.text]}>{translate("Card Type")}</Text>
            <Text style={[styles.subText]}>
              {transaction.payment_type}: {transaction.card_ending_with}
            </Text>
            <Text style={[styles.text]}>{translate("Transaction ID")}</Text>
            <Text style={[styles.subText]}>{transaction.reference_id}</Text>
            <View style={styles.mainView}>
              <View style={styles.amountContainer}>
                <Text style={[styles.text]}>{translate("Amount")}</Text>
                <Text style={[globalStyles.numbers, styles.amountText]}>
                  {transaction.total_amount}$
                </Text>
              </View>
              <View pointerEvents="none" style={[styles.containerStyle]}>
                <Text style={[styles.dateText]}>
                  {transaction.payment_date.split(" ")[0] +
                    "\n   " +
                    transaction.payment_date.split(" ")[1]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default TransactionCard;
