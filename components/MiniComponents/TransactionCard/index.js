import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions
} from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import { LinearGradient } from "expo";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
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
        <TouchableOpacity
          // onPress={() => {
          //   this.props.getCampaign(this.props.campaign.campaign_id);
          //   this.props.navigation.push("CampaignDetails");
          // }}
          style={styles.transactionButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text style={[styles.titletext]}>
                {transaction.campaign_name}
              </Text>
            </View>
            <Icon
              type="MaterialCommunityIcons"
              name="snapchat"
              style={styles.icon}
            />

            <Text style={[styles.text]}>Credit Card</Text>
            <Text style={[styles.subtext]}>{transaction.payment_type}</Text>
            <Text style={[styles.text]}>Transaction ID</Text>
            <Text style={[styles.subtext]}>{transaction.reference_id}</Text>
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
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
            <View pointerEvents="none" style={styles.containerStyle}>
              <Text style={[styles.text]}>
                {transaction.payment_date.split(" ")[0] +
                  "\n   " +
                  transaction.payment_date.split(" ")[1]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id))
});
export default connect(
  null,
  mapDispatchToProps
)(TransactionCard);
