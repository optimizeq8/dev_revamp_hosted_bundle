import React, { Component } from "react";
import { View, Text } from "react-native";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
import LowerButton from "../../../MiniComponents/LowerButton";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
//Styles
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import formatNumber from "../../../formatNumber";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

class ReachBar extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let { startEditing, editCampaign, campaignInfo } = this.props;

    return (
      <View style={[styles.bottom]}>
        <AnimatedCircularProgress
          size={hp(10)}
          width={8}
          fill={this.props.total_reach}
          rotation={360}
          lineCap="round"
          style={[styles.chart]}
          backgroundColor="rgba(0,0,0,0.1)"
          adDetails={true}
        />
        <View style={styles.chartItems}>
          <View style={styles.reachPeopleView}>
            <Text style={styles.chartText}>{translate("Potential Reach")}</Text>
            <Text style={styles.chartTextNum}>
              {formatNumber(this.props.average_reach, true)}
              {"  " + translate("people")}
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
          {((editCampaign &&
            startEditing &&
            campaignInfo.campaign_end &&
            campaignInfo.campaign_end === "0" &&
            !this.props.campaignEnded &&
            this.props.mainBusiness.user_role !== "3") ||
            (!editCampaign && startEditing)) &&
            (this.props.loading ? (
              <ForwardLoading
                mainViewStyle={{ width: wp(9), height: hp(9) }}
                bottom={5}
                style={{ width: wp(7), height: hp(7) }}
              />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                style={[styles.reachBarLowerButton]}
                function={() => this.props._handleSubmission()}
                purpleViolet
              />
            ))}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  average_reach: state.campaignC.average_reach,
  total_reach: state.campaignC.total_reach,
  mainBusiness: state.account.mainBusiness,
  campaignEnded: state.campaignC.campaignEnded,
});
const mapDispatchToProps = (dispatch) => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReachBar);