import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PixelRatio
} from "react-native";
import { connect } from "react-redux";
import { Input, Button, Item, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import * as actionCreators from "../../../store/actions";
import styles from "../MultiSelect/styles";

import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import LocationIcon from "../../../assets/SVGs/Location";

class SelectRegions extends Component {
  state = { selectedAll: false };

  selectAll = () => {
    this.setState({ selectedAll: !this.state.selectedAll });
    this.props.regions.forEach(region =>
      this.props.onSelectedRegionChange(region.id, region.name)
    );
  };

  render() {
    let regionlist = this.props.filteredRegions.map(c => {
      return (
        <TouchableOpacity
          key={c.id}
          style={styles.languageRowConatiner}
          onPress={() => {
            this.props.onSelectedRegionChange(
              this.props.addressForm ? c : c.id,
              c.name
            );
          }}
        >
          <Icon
            type="MaterialCommunityIcons"
            name={
              this.props.region_id.find(r => r === c.id)
                ? "circle"
                : "circle-outline"
            }
            style={[
              this.props.region_id.find(r => r === c.id)
                ? styles.activetext
                : styles.inactivetext,
              styles.optionsIconSize
            ]}
          />
          <Text style={styles.optionsTextContainer}>{c.name}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={[styles.dataContainer]}>
            <LocationIcon
              width={110}
              height={110}
              fill="#fff"
              style={styles.locationIcon}
            />
            <Text style={[styles.title]}>
              {this.props.addressForm ? "Select Region" : "Select Regions"}{" "}
            </Text>

            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder="Search Region..."
                  style={[
                    styles.searchRegionText,
                    {
                      fontFamily: "montserrat-regular",
                      color: "#fff",
                      fontSize: 14 / PixelRatio.getFontScale()
                    }
                  ]}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredR = this.props.regions.filter(c =>
                      c.name.toLowerCase().includes(value.toLowerCase())
                    );
                    this.props.filterRegions(filteredR);
                  }}
                />
              </Item>

              <ScrollView style={[styles.regionListContainer]}>
                {!this.props.addressForm && (
                  <TouchableOpacity
                    style={[
                      styles.languageRowConatiner,
                      { alignSelf: "center" }
                    ]}
                    onPress={this.selectAll}
                  >
                    <Text
                      style={[
                        styles.optionsTextContainer,
                        { paddingLeft: 0, textDecorationLine: "underline" }
                      ]}
                    >
                      Select all
                    </Text>
                  </TouchableOpacity>
                )}

                {regionlist}
              </ScrollView>
            </View>
          </View>

          <Button
            style={[styles.button]}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data
});
const mapDispatchToProps = dispatch => ({
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRegions);
