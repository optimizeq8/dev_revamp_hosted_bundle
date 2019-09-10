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
import Chart from "../../MiniComponents/CampaignDetailCharts";
import Duration from "../../Screens/CampaignCreate/AdObjective/Duration";
import LineChartGraphs from "./LineChartGraphs";
import CampaginStats from "./CampStats/CampaignStats";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import BarIcon from "../../../assets/SVGs/Bar.svg";

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

  _onRefresh = async selectedCampaign => {
    this.setState({ refreshing: true });
    await this.props.getCampaignStats(selectedCampaign, {
      // start_time: "2019-05-09",
      // end_time: "2019-05-25"
      start_time: selectedCampaign.start_time,
      end_time: selectedCampaign.end_time
    });
    this.setState({ refreshing: false });
  };
  changeChart = chartChoice => {
    this.setState({ chartChoice });
  };
  hideCharts = value => {
    let vl = (value / hp("100%")) * 100 + 20;
    Animated.parallel([
      Animated.timing(this.state.chartAnimation, {
        toValue: 100 - vl * 1.5,
        duration: 200
      }),
      Animated.timing(this.state.LineAnimation, {
        toValue: vl,
        duration: 200
      })
    ]).start();
  };
  render() {
    const { translate } = this.props.screenProps;
    let selectedCampaign = this.props.selectedCampaign;
    this._draggedValue.addListener(({ value }) => {
      this.hideCharts(value);
    });
    const translateYInterpolate = this.state.chartAnimation.interpolate({
      inputRange: [0, 30],
      outputRange: [100, 0]
    });
    const translateYInterpolateChart = this.state.chartAnimation.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 100]
    });
    const ScaleInterpolate = this.state.LineAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    });
    const animatedStyles = {
      opacity: this.state.chartAnimation,
      transform: [
        {
          translateY: translateYInterpolate
        }
      ]
    };
    const lineAnimatedStyles = {
      opacity: this.state.LineAnimation,
      transform: [
        {
          translateY: translateYInterpolateChart
        },
        {
          scaleX: ScaleInterpolate
        },
        { scaleY: ScaleInterpolate }
      ]
    };

    return (
      <>
        <SlidingUpPanel
          backdropOpacity={0.95}
          ref={c => (this._panel = c)}
          draggableRange={this.draggableRange}
          animatedValue={this._draggedValue}
          friction={0.4}
          onDragStart={() => {
            if (selectedCampaign) {
              if (!this.state.gotStats) {
                this.props.getCampaignStats(selectedCampaign, {
                  // start_time: "2019-05-09",
                  // end_time: "2019-05-25"
                  start_time: selectedCampaign.start_time,
                  end_time:
                    new Date(selectedCampaign.end_time) < new Date()
                      ? selectedCampaign.end_time
                      : new Date()
                });
              }
            }
          }}
          onDragEnd={value => {
            if (!this.state.gotStats) this.setState({ gotStats: true });
            if (value > hp("50%")) {
              this._panel.show();
            } else {
              this._panel.hide();
            }
          }}
        >
          {dragHandler => (
            <>
              <Animated.View
                style={[
                  lineAnimatedStyles,
                  {
                    top: 30,
                    justifyContent: "center",
                    height: "10%"
                  }
                ]}
              >
                <ChartChoices
                  screenProps={this.props.screenProps}
                  changeChart={this.changeChart}
                  selectedCampaign={selectedCampaign}
                />
              </Animated.View>
              <View style={styles.bottomContainer}>
                <View style={styles.dragHandler} {...dragHandler}>
                  <LinearGradient
                    colors={["#751AFF", "#751AFF"]}
                    style={styles.tab}
                  >
                    <BarIcon style={styles.handlerIcon} />
                    <Text style={styles.handlerText}>
                      {translate("Dashboard")}
                    </Text>
                  </LinearGradient>
                </View>
                <LinearGradient
                  colors={["#751AFF", "#6C52FF", colors.background2]}
                  locations={[0.2, 0.6, 1]}
                  start={[0.2, 0.4]}
                  end={[1, 1]}
                  style={{
                    borderRadius: 30,
                    borderBottomEndRadius: 0,
                    borderBottomStartRadius: 0,
                    overflow: "hidden",
                    width: "100%",
                    height: "93%"
                  }}
                >
                  <Animated.View style={[styles.chartPosition, animatedStyles]}>
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedCampaign) {
                          if (!this.state.gotStats)
                            this.props.getCampaignStats(selectedCampaign, {
                              // start_time: "2019-05-09",
                              // end_time: "2019-05-25"
                              start_time: selectedCampaign.start_time,
                              end_time: selectedCampaign.end_time
                            });
                          this._panel.show();
                        }
                      }}
                    >
                      <Chart campaign={selectedCampaign} />
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style={[lineAnimatedStyles]}>
                    <View style={{ top: 10, marginBottom: 10 }}>
                      {selectedCampaign ? (
                        <Duration
                          screenProps={this.props.screenProps}
                          slidePanel={true}
                          start_time={this.props.start_time}
                          end_time={this.props.end_time}
                          dateField={this.props.dateField}
                          selectedCampaign={selectedCampaign}
                        />
                      ) : (
                        <PlaceholderLine width={200} height={30} />
                      )}
                    </View>
                    <ScrollView
                      refreshControl={
                        <RefreshControl
                          tintColor={"#fff"}
                          refreshing={this.state.refreshing}
                          onRefresh={() => this._onRefresh(selectedCampaign)}
                        />
                      }
                      contentContainerStyle={{
                        paddingBottom: 130000 / (hp(100) / 3)
                      }}
                    >
                      <LineChartGraphs
                        screenProps={this.props.screenProps}
                        chartChoice={this.state.chartChoice}
                        campaign={selectedCampaign}
                      />
                      <CampaginStats
                        selectedCampaign={selectedCampaign}
                        screenProps={this.props.screenProps}
                      />
                    </ScrollView>
                  </Animated.View>
                </LinearGradient>
              </View>
            </>
          )}
        </SlidingUpPanel>
      </>
    );
  }
}
