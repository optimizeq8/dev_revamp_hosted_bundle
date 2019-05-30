import React, { Component } from "react";
import { View, Image, ScrollView, Switch, Dimensions } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { heightPercentageToDP } from "react-native-responsive-screen";
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet.svg";
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

    return (
      <View style={styles.cardStyle}>
        <View style={styles.transactionButton}>
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text numberOfLines={2} style={[styles.titletext]}>
                {transaction.campaign_name}
              </Text>
            </View>
            {transaction.iswallet === "1" ? (
              <WalletIcon style={[styles.icon, { top: "1%", left: "90%" }]} />
            ) : (
              <Icon
                type="MaterialCommunityIcons"
                name="snapchat"
                style={styles.icon}
              />
            )}

            <Text style={[styles.text]}>Card Type</Text>
            <Text style={[styles.subtext]}>
              {transaction.payment_type}: {transaction.card_ending_with}
            </Text>
            <Text style={[styles.text]}>Transaction ID</Text>
            <Text style={[styles.subtext]}>{transaction.reference_id}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                width: "100%"
              }}
            >
              <View
                style={{
                  flexDirection: "column"
                }}
              >
                <Text style={[styles.text]}>Amount</Text>
                <Text
                  style={[
                    globalStyles.numbers,
                    {
                      fontSize: heightPercentageToDP(3.4),
                      paddingHorizontal: 0
                    }
                  ]}
                >
                  {transaction.total_amount}$
                </Text>
              </View>
              <View pointerEvents="none" style={[styles.containerStyle]}>
                <Text style={[styles.datetext]}>
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
