import React, { Component } from "react";
import { View, Text } from "react-native";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
import LowerButton from "../../../../MiniComponents/LowerButton";
import ForwardLoading from "../../../../MiniComponents/ForwardLoading";
//Styles
import styles from "../../styles/adTargetting.styles";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import formatNumber from "../../../../formatNumber";
import AnimatedCircularProgress from "../../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

class ReachBar extends Component {
  state = { total_reach: 0 };
  componentDidMount() {
    if (this.props.total_reach) {
      this.setState({
        total_reach: this.props.total_reach,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.total_reach !== this.props.total_reach &&
      this.props.total_reach
    ) {
      this.setState({
        total_reach:
          this.props.total_reach > 100 ? 100 : this.props.total_reach,
      });
    }
  }
  render() {
    const { translate } = this.props.screenProps;
    let { startEditing, editCampaign, campaignInfo } = this.props;
    return (
      <View style={styles.bottom}>
        <AnimatedCircularProgress
          size={85}
          width={8}
          fill={this.state.total_reach}
          rotation={360}
          lineCap="round"
          style={[styles.chart]}
          backgroundColor="rgba(255,255,255,0.3)"
          adDetails={true}
        />
        <View style={styles.chartItems}>
          <View style={styles.reachPeopleView}>
            <Text style={[styles.chartText, { textTransform: "uppercase" }]}>
              {translate("Potential Reach")}
            </Text>
            <Text style={[styles.chartTextNum, { textTransform: "uppercase" }]}>
              {formatNumber(this.props.average_reach, true)}
              {"  " + translate("people")}
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
  average_reach: state.instagramAds.average_reach,
  total_reach: state.instagramAds.total_reach,
  mainBusiness: state.account.mainBusiness,
  campaignEnded: state.instagramAds.campaignEnded,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ReachBar);
