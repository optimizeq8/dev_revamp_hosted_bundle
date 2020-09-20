import React from "react";
import { View } from "react-native";
import isEqual from "lodash/isEqual";
import { Button, Text } from "native-base";

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
        <Button
          full
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
        </Button>
        <Button
          full
          style={styles.button}
          onPress={() => {
            // this._handleSubmission();
          }}
        >
          <Text style={styles.buttontext}>Create New Address</Text>
        </Button>
      </View>
    );
  }
}

export default SelectBillingAddressCard;
