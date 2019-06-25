import React, { Component } from "react";
import { View } from "react-native";
import { Button, Text, Container } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import RangeMarkers from "./RangeMarkers";

//Styles
import styles from "./styles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//Icon
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";

export default class AgeOption extends Component {
  state = {
    values: [13, 35]
  };

  componentDidMount() {
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
    return (
      <Container style={styles.container}>
        <View>
          <AgeIcon fill="#fff" style={styles.icon} />
          <Text style={styles.title}>Age</Text>
          <Text style={styles.subtitle}>Select your audience's Age Range</Text>
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
              max={35}
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
        <Button
          style={styles.button}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </Container>
    );
  }
}
