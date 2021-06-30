import React, { Component } from "react";
import { View, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { LinearGradient } from "expo-linear-gradient";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//components
import Header from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";
import styles from "./styles";

class VerifyBusiness extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <Header
          screenProps={this.props.screenProps}
          title={"Verify Business"}
          navigation={this.props.navigation}
          segment={{
            source: "otp_verify",
            source_action: "a_go_back",
          }}
        />
        <View style={styles.verifyBusinessView}>
          <Text style={styles.approvalText}>
            Your approval request is in review
          </Text>
          <GradientButton
            screenProps={this.props.screenProps}
            height={50}
            text={"Check your status"}
            style={styles.refreshButton}
            textStyle={styles.textRefreshStyle}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  checkingBusinessStatus: state.account.checkingBusinessStatus,
});

const mapDispatchToProps = (dispatch) => ({
  checkBusinessVerified: () => dispatch(actionCreators.checkBusinessVerified()),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyBusiness);
