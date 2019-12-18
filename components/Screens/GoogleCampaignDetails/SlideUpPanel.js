import React, { Component } from "react";
import {
  Text,
  View,
  RefreshControl,
  Animated,
  ScrollView,
  TouchableOpacity
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { LinearGradient } from "expo-linear-gradient";
import Chart from "../../MiniComponents/CampaignCircleCharts";
import Duration from "../../Screens/CampaignCreate/AdObjective/Duration";
import LineChartGraphs from "./LineChartGraphs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import BarIcon from "../../../assets/SVGs/Bar";

import { colors } from "../../GradiantColors/colors";

import styles from "./styles";
import ChartChoices from "./ChartChoices";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

export default class SlideUpPanel extends Component {
  _draggedValue = new Animated.Value(0);
  draggableRange = {
    top: hp(80),
    bottom: hp(27)
  };
  state = {
    chartAnimation: new Animated.Value(1),
    LineAnimation: new Animated.Value(0),
    chartChoice: "Spend",
    gotStats: false,
    refreshing: false
  };
  // componentDidMount() {
  //   this.props.getCampaignStats(this.props.selectedCampaign.campaign.campaign_id,
  //     // start_time: "2019-05-09",
  //     // end_time: "2019-05-25"
  //     start_time: this.props.selectedCampaign.start_time,
  //     end_time:
  //       new Date(this.props.selectedCampaign.end_time) < new Date()
  //         ? this.props.selectedCampaign.end_time
  //         : new Date()
  //   });
  // }

  _onRefresh = async selectedCampaign => {
    this.setState({ refreshing: true });
    await this.props.getCampaignStats(
      selectedCampaign.campaign.campaign_id,
      selectedCampaign.start_time,
      selectedCampaign.end_time
    );
    this.setState({ refreshing: false });
  };
  changeChart = chartChoice => {
    this.setState({ chartChoice });
  };

  render() {
    const { translate } = this.props.screenProps;
    let selectedCampaign = this.props.selectedCampaign;
    this._draggedValue.addListener(({ value }) => {
      this.hideCharts(value);
    });

    return (
      <View style={[styles.bottomContainer]}>
        <View>
          <View
            style={{
              height: "15%",
              alignSelf: "center",
              width: "85%"
            }}
          >
            <ChartChoices
              screenProps={this.props.screenProps}
              changeChart={this.changeChart}
              selectedCampaign={selectedCampaign}
            />
          </View>

          <ScrollView
            // refreshControl={
            //   <RefreshControl
            //     tintColor={"#fff"}
            //     refreshing={this.state.refreshing}
            //     onRefresh={() => this._onRefresh(selectedCampaign)}
            //   />
            // }
            style={{ zIndex: 2 }}
            contentContainerStyle={{
              paddingBottom: 100,
              zIndex: 2
            }}
          >
            <LineChartGraphs
              screenProps={this.props.screenProps}
              chartChoice={this.state.chartChoice}
              campaignStats={this.props.campaignStats}
            />
            {/* <CampaginStats
              selectedCampaign={selectedCampaign}
              screenProps={this.props.screenProps}
            /> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}
