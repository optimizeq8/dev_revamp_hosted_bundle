import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import { Button, Icon } from "native-base";
import cloneDeep from "clone-deep";
import * as actionCreators from "../../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class ReachBar extends Component {
  render() {
    return (
      <AnimatedCircularProgress
        size={300}
        width={20}
        fill={this.props.total_reach}
        arcSweepAngle={200}
        rotation={260}
        lineCap="round"
        style={styles.chart}
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
              <Button
                onPress={() => this.props._handleSubmission()}
                style={styles.button}
              >
                <Icon style={styles.icon} name="arrow-forward" />
              </Button>
            </View>
          );
        }}
      </AnimatedCircularProgress>
    );
  }
}
const mapStateToProps = state => ({
  average_reach: state.campaignC.average_reach,
  total_reach: state.campaignC.total_reach,
  mainBusiness: state.auth.mainBusiness
});
const mapDispatchToProps = dispatch => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReachBar);
