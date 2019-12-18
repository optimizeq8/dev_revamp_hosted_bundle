import React, { Component } from "react";
import { View } from "react-native";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
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
import formatNumber from "../../../formatNumber";
import { Text } from "native-base";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

class ReachBar extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let { startEditing, editCampaign, campaignInfo } = this.props;
    return (
      <View style={styles.bottom}>
        <AnimatedCircularProgress
          size={wp(25)}
          width={10}
          fill={this.props.total_reach}
          // arcSweepAngle={200}
          tintColorSecondary={globalColors.orange}
          rotation={360}
          tintColorThirdy={globalColors.green}
          lineCap="round"
          style={[styles.chart]}
          tintColor={globalColors.yellow}
          backgroundColor="rgba(255,255,255,0.3)"
        />
        <View style={styles.chartItems}>
          <View>
            <Text uppercase style={styles.chartText}>
              {translate("Potential Reach")}
            </Text>
            <Text uppercase style={styles.chartTextNum}>
              {formatNumber(this.props.average_reach, true)} people
              {"\n"}
            </Text>
          </View>
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
              <LowerButton function={() => this.props._handleSubmission()} />
            ))}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  average_reach: state.campaignC.average_reach,
  total_reach: state.campaignC.total_reach,
  mainBusiness: state.account.mainBusiness,
  campaignEnded: state.campaignC.campaignEnded
});
const mapDispatchToProps = dispatch => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach))
});
export default connect(mapStateToProps, mapDispatchToProps)(ReachBar);
