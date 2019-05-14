import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";
import * as actionCreators from "../../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { TouchableRipple } from "react-native-paper";
import LowerButton from "../../../MiniComponents/LowerButton";
class ReachBar extends Component {
  render() {
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
          tintColor="#FF9D00"
          backgroundColor="rgba(255,255,255,0.3)"
        >
          {fill => {
            return (
              <View style={[styles.chartItems]}>
                <Text style={styles.chartText}>
                  {this.props.average_reach}
                  {"\n"}
                  <Text
                    style={[
                      styles.chartText,
                      { fontFamily: "montserrat-regular", fontSize: 12 }
                    ]}
                  >
                    Potential Reach
                  </Text>
                </Text>
                <LowerButton function={() => this.props._handleSubmission()} />
                {/* <TouchableOpacity
                onPress={() => this.props._handleSubmission()}
                style={styles.button}
              >
                <ForwardButton />
              </TouchableOpacity> */}
              </View>
            );
          }}
        </AnimatedCircularProgress>
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
