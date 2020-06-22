import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import LowerButton from "../../MiniComponents/LowerButton";
import ForwardLoading from "../../MiniComponents/ForwardLoading";
//Styles
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import formatNumber from "../../formatNumber";
import { Text } from "native-base";
import AnimatedCircularProgress from "../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";
// separate component for google reach bar
class ReachBar extends Component {
  render() {
    const { translate } = this.props.screenProps;
    const { total_reach, avg_reach, editCampaign } = this.props;
    return (
      <View style={styles.bottom}>
        <AnimatedCircularProgress
          size={85}
          width={10}
          fill={total_reach}
          tintColorSecondary={globalColors.orange}
          rotation={360}
          tintColorThirdy={globalColors.green}
          lineCap="round"
          style={[styles.chart]}
          tintColor={globalColors.yellow}
          backgroundColor="rgba(255,255,255,0.3)"
        />
        <View style={styles.chartItems}>
          <View style={styles.reachPeopleView}>
            <Text uppercase style={styles.chartText}>
              {translate("Potential Reach")}
            </Text>
            <Text uppercase style={styles.chartTextNum}>
              {formatNumber(avg_reach, true)}
              {"  " + translate("people")}
            </Text>
          </View>
          {editCampaign &&
            this.props.mainBusiness.user_role !== "3" &&
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
              />
            ))}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});
const mapDispatchToProps = (dispatch) => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReachBar);
