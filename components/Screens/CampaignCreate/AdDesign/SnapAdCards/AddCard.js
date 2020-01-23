import React, { Component } from "react";
import { Text, View, I18nManager } from "react-native";
import { Icon } from "native-base";
import GradientButton from "../../../../MiniComponents/GradientButton";

import * as actionCreators from "../../../../../store/actions";

import { connect } from "react-redux";
import styles from "../styles";
import segmentEventTrack from "../../../../segmentEventTrack";

class AddCard extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <>
        {this.props.arrayLen <= 20 && (
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <GradientButton
              style={styles.addButtonStyle}
              onPressAction={() => {
                segmentEventTrack("Button clicked to add snap story ad card");
                this.props.addSnapCard();
              }}
            >
              <Icon
                style={{
                  alignSelf: "center",
                  color: "#FFF"
                }}
                name="plus"
                type="MaterialCommunityIcons"
              />
            </GradientButton>
            <Text style={styles.addButtonText}>{translate("Add More")}</Text>
          </View>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addSnapCard: () => dispatch(actionCreators.addSnapCard())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
