import React, { Component } from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LowerButton from "../../../MiniComponents/LowerButton";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
//Styles
import styles from "./styles";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class ReachBar extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.bottom}>
        <AnimatedCircularProgress
          size={wp(80)}
          width={15}
          fill={this.props.total_reach}
          arcSweepAngle={200}
          rotation={260}
          lineCap="round"
          style={[styles.chart]}
          tintColor={globalColors.orange}
          backgroundColor="rgba(255,255,255,0.3)"
        />
        <View style={styles.chartItems}>
          <Text style={styles.chartTextNum}>
            {this.props.average_reach}
            {"\n"}
            <Text style={styles.chartText}>{translate("Potential Reach")}</Text>
          </Text>
          {this.props.loading ? (
            <ForwardLoading
              mainViewStyle={{ width: wp(9), height: hp(9) }}
              bottom={5}
              style={{ width: wp(7), height: hp(7) }}
            />
          ) : (
            <LowerButton function={() => this.props._handleSubmission()} />
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  average_reach: state.campaignC.average_reach,
  total_reach: state.campaignC.total_reach,
  mainBusiness: state.account.mainBusiness
});
const mapDispatchToProps = dispatch => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReachBar);
