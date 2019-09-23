import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";
import * as actionCreators from "../../../../../store/actions";

import { connect } from "react-redux";
import styles from "../styles";
import { isRTL } from "expo-localization";
class AddCard extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          style={styles.addButtonStyle}
          onPress={() => this.props.addSnapCard()}
        >
          <Icon
            style={{ alignSelf: "center", right: isRTL ? -2 : 2 }}
            name="plus"
            type="MaterialCommunityIcons"
          />
        </Button>
        <Text style={styles.addButtonText}>{translate("Add More")}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addSnapCard: () => dispatch(actionCreators.addSnapCard())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
