import React, { Component } from "react";
import { View, Platform, Slider } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import RangeMarkers from "./RangeMarkers";
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";
import InputNumber from "rmc-input-number";
import inputNumberStyles from "./inputNumber";
import { globalColors } from "../../../Global Styles";

export default class AgeOption extends Component {
  state = {
    values: [13, 35]
  };

  multiSliderValuesChange = values => {
    this.props._handleMinAge(values[0]);
    this.props._handleMaxAge(values[1]);
    this.setState({
      values
    });
  };

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            flexDirection: "column"
          }}
        >
          <View
            style={{ felx: 1, justifyContent: "flex-start", marginTop: 10 }}
          >
            <AgeIcon style={{ alignSelf: "center" }} />
            <Text
              style={[
                styles.title,
                { fontSize: 20, fontFamily: "montserrat-semibold" }
              ]}
            >
              Age
            </Text>
            <Text style={[styles.title, { width: 250 }]}>
              Select your audience's Age Range
            </Text>
          </View>

          <View
            style={{
              top: 20,
              alignSelf: "center"
            }}
          >
            <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              sliderLength={wp(60)}
              isMarkersSeparated
              customMarkerLeft={e => <RangeMarkers value={e.currentValue} />}
              customMarkerRight={e => <RangeMarkers value={e.currentValue} />}
              onValuesChange={this.multiSliderValuesChange}
              min={13}
              max={35}
              step={1}
              selectedStyle={{
                backgroundColor: globalColors.orange
              }}
              unselectedStyle={{
                backgroundColor: "rgba(255,255,255,0.3)",
                height: 2
              }}
              trackStyle={{
                height: 3,
                backgroundColor: "#fff"
              }}
            />
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 25, elevation: -1 }]}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  }
}
