import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import { Button } from "native-base";
import cloneDeep from "clone-deep";
import * as actionCreators from "../../../../store/actions";
import Axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class ReachBar extends Component {
  _calcReach = async () => {
    let r = cloneDeep(this.props.targeting);
    if (r.demographics[0].gender === "") {
      delete r.demographics[0].gender;
    }
    if (
      r.geos[0].hasOwnProperty("region_id") &&
      r.geos[0].region_id.length === 0
    ) {
      delete r.geos[0].region_id;
    }
    if (r.demographics[0].max_age >= 35) {
      r.demographics[0].max_age = "35+";
    }
    if (
      r.hasOwnProperty("interests") &&
      r.interests[0].category_id.length === 0
    ) {
      delete r.interests;
    }
    const obj = {
      targeting: JSON.stringify(r),
      ad_account_id: this.props.mainBusiness.snap_ad_account_id
    };

    let totalReach = {
      demographics: [
        {
          languages: ["en", "ar"],
          min_age: 13,
          max_age: "35+"
        }
      ],
      geos: [
        {
          country_code: this.props.country_code
        }
      ]
    };
    const obj2 = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: this.props.mainBusiness.snap_ad_account_id
    };
    await this.props.snap_ad_audience_size(obj, obj2);
  };
  render() {
    return (
      <View style={{}}>
        <Button
          style={{ alignSelf: "center", backgroundColor: "#751AFF" }}
          onPress={this._calcReach}
        >
          <Text style={styles.chartText}>Calculate Reach </Text>
        </Button>
        <View style={{}}>
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
                    {"\n"}Potential Reach
                  </Text>
                </View>
              );
            }}
          </AnimatedCircularProgress>
        </View>
      </View>
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
