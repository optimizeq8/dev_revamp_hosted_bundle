import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

// Style
import styles from "./styles";
class SelectBillingAddressCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainCard}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            //  this.props.navigation.navigate("PaymentForm", {
            //   interestNames: this.props.interestNames,
            //   kdamount: this.props.kdamount
            // });
          }}
        >
          <Text style={styles.buttontext}>
            Select Existing Billing Address{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // this._handleSubmission();
          }}
        >
          <Text style={styles.buttontext}>Create New Address</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SelectBillingAddressCard;
