import React, { Component } from "react";
import { View } from "react-native";
import { Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import RangeMarkers from "./RangeMarkers";

//Styles
import styles from "./styles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//Icon
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";
import LowerButton from "../LowerButton";
import { globalColors } from "../../../GlobalStyles";

export default class AgeOption extends Component {
  state = {
    values: [13, 50],
  };

  componentDidMount() {
    this.setState({
      values: [this.props.minAge, this.props.maxAge],
    });
  }
  multiSliderValuesChange = (values) => {
    this.props._handleAge(values);
    this.setState({
      values,
    });
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <Container style={styles.container}>
        <View style={styles.dataContainer}>
          <AgeIcon fill={globalColors.rum} style={styles.icon} />
          <Text style={styles.title}>{translate("Age")}</Text>
          <Text style={styles.subtitle}>
            {translate(`Select your audience's Age Range`)}
          </Text>
          <View style={styles.multiSliderContainer}>
            <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              sliderLength={wp(60)}
              isMarkersSeparated
              customMarkerLeft={(e) => (
                <RangeMarkers value={e.currentValue} down={true} />
              )}
              customMarkerRight={(e) => <RangeMarkers value={e.currentValue} />}
              onValuesChange={this.multiSliderValuesChange}
              min={this.props.ageValuesRange[0]}
              max={this.props.ageValuesRange[1]}
              step={1}
              selectedStyle={styles.selected}
              unselectedStyle={{
                backgroundColor: "rgba(255,255,255,0.3)",
                height: 2,
              }}
              trackStyle={styles.track}
            />
          </View>
        </View>
        <LowerButton
          screenProps={this.props.screenProps}
          style={styles.button}
          checkmark={true}
          bottom={20}
          purpleViolet
          function={() => this.props._handleSideMenuState(false)}
        />
      </Container>
    );
  }
}
