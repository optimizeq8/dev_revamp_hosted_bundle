import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import { Button } from "native-base";
import cloneDeep from "clone-deep";
import * as actionCreators from "../../../../store/actions";
import Axios from "axios";

class ReachBar extends Component {
  state = { totalReach: 0 };
  getTotalReach = () => {
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
    const obj = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: this.props.mainBusiness.snap_ad_account_id
    };
    // this.props.snap_ad_audience_size(obj);
    Axios.post(
      `https://optimizekwtestingserver.com/optimize/public/snapaudiencesize`,
      obj
    ).then(res => {
      this.setState({
        totalReach: (this.props.average_reach / res.data.average_reach) * 100
      });
    });
  };
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
    await this.props.snap_ad_audience_size(obj, this.getTotalReach);
  };
  render() {
    return (
      <View style={{ top: 30 }}>
        <Button onPress={this._calcReach} style={{ marginHorizontal: "45%" }}>
          <Text> Reach </Text>
        </Button>

        <View style={{ top: 20 }}>
          <AnimatedCircularProgress
            size={350}
            width={15}
            fill={this.state.totalReach}
            arcSweepAngle={180}
            rotation={270}
            lineCap="round"
            style={styles.chart}
            tintColor="#FF9D00"
            backgroundColor="rgba(255,255,255,0.3)"
          >
            {fill => {
              return (
                <View style={styles.chartItems}>
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
