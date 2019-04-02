import React, { Component } from "react";
import { View } from "react-native";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Chart from "./Charts";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
class CampaignCard extends Component {
  render() {
    let campaign = this.props.campaign;
    let charts = [
      { spend: campaign.spends },
      { impressions: campaign.impressions },
      { swipes: campaign.swipes }
    ].map((category, i) => <Chart chartCategory={category} key={i} />);
    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        {charts}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id))
});
export default connect(
  null,
  mapDispatchToProps
)(CampaignCard);
