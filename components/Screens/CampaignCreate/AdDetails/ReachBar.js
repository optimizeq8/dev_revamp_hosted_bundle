import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LowerButton from "../../../MiniComponents/LowerButton";

//Styles
import styles from "./styles";

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
    return (
      <View style={[styles.bottom, {}]}>
        <AnimatedCircularProgress
          size={wp(80)}
          width={15}
          fill={this.props.total_reach}
          arcSweepAngle={200}
          rotation={260}
          lineCap="round"
          style={[
            styles.chart,
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              top: -20,
              right: 0
            }
          ]}
          tintColor="#FF9D00"
          backgroundColor="rgba(255,255,255,0.3)"
        />
        <View
          style={[
            styles.chartItems,
            { paddingVertical: Platform.OS === "android" ? 0 : 10 }
          ]}
        >
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
