import React from "react";
import { View, Text, I18nManager, Image } from "react-native";
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

import CampaignCircleChart from "../../MiniComponents/CampaignCircleCharts";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import SnapchatBorder from "../../../assets/SVGs/Snapchat-Border";
import Graph from "../../../assets/SVGs/Graph";

import styles from "./styles";
export default class Screen3 extends React.Component {
  render() {
    const { translate } = this.props.screenProps;
    const { id, activeSlide, changed } = this.props;

    return (
      <View>
        {id === activeSlide && (
          <Animatable.View
            animation={
              this.props.changed
                ? I18nManager.isRTL
                  ? "slideInLeft"
                  : "slideInRight"
                : ""
            }
            style={styles.shopCard}
          >
            <LinearGradient
              colors={["#9300FF", "#9300FF", "#4E00CB"]}
              locations={[0, 0.3, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardStyle}
            >
              <View style={styles.textcontainer}>
                <View style={styles.header}>
                  <SnapchatBorder width={30} height={30} />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingHorizontal: 10
                      // flex: 1
                    }}
                  >
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={[
                        styles.titleText,

                        { fontFamily: "montserrat-bold-english" }
                      ]}
                    >
                      SHOP ONLINE ANYWHERE
                    </Text>

                    <View style={[styles.adStatus]}>
                      <Icon
                        style={[
                          styles.circleIcon,
                          {
                            color: globalColors.green
                          }
                        ]}
                        name={"circle"}
                        type={"FontAwesome"}
                      />
                      <Text
                        style={[
                          styles.reviewText,
                          {
                            color: globalColors.green
                          }
                        ]}
                      >
                        {translate("LIVE")}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.chartContainer}>
                  <CampaignCircleChart
                    channel={"snapchat"}
                    campaign={{
                      spends: 500,
                      swipes: 40000,
                      impressions: 400000
                    }}
                    detail={false}
                    screenProps={this.props.screenProps}
                  />

                  <>
                    <View style={styles.horizontalLineView} />
                    <View style={styles.cardStatusDays}>
                      <Text style={globalStyles.numbers}>30</Text>
                      <Text uppercase style={styles.cardText}>
                        {translate("Day(s) left")}
                      </Text>
                    </View>
                  </>
                </View>
              </View>
            </LinearGradient>
          </Animatable.View>
        )}
        {id === activeSlide && (
          <Image
            style={styles.graphImage}
            source={require("../../../assets/images/Graph.png")}
          />
        )}
      </View>
    );
  }
}
