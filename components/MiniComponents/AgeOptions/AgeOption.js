import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import RangeMarkers from "./RangeMarkers";
import * as Segment from "expo-analytics-segment";

//Styles
import styles from "./styles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//Icon
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";

export default class AgeOption extends Component {
  state = {
    values: [13, 50]
  };

  componentDidMount() {
    Segment.screen("Age Option");
    this.setState({
      values: [this.props.state.min_age, this.props.state.max_age]
    });
  }
  multiSliderValuesChange = values => {
    this.props._handleMinAge(values[0]);
    this.props._handleMaxAge(values[1]);
    this.setState({
      values
    });
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaViewContainer}
      >
        <Container style={styles.container}>
          <View style={styles.dataContainer}>
            <AgeIcon fill="#fff" style={styles.icon} />
            <Text style={styles.title}>{translate("Age")}</Text>
            <Text style={styles.subtitle}>
              {translate(`Select your audience's Age Range`)}
            </Text>
            <View style={styles.multiSliderContainer}>
              <MultiSlider
                values={[this.state.values[0], this.state.values[1]]}
                sliderLength={wp(60)}
                isMarkersSeparated
                customMarkerLeft={e => (
                  <RangeMarkers value={e.currentValue} down={true} />
                )}
                customMarkerRight={e => <RangeMarkers value={e.currentValue} />}
                onValuesChange={this.multiSliderValuesChange}
                min={13}
                max={49}
                step={1}
                selectedStyle={styles.selected}
                unselectedStyle={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  height: 2
                }}
                trackStyle={styles.track}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    );
  }
}
