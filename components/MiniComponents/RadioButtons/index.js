import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
import isArray from "lodash/isArray";
import isUndefined from "lodash/isUndefined";

export default class RadioButtons extends Component {
  constructor() {
    super();
    this.state = {
      filteredList: [],
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.data,
    });
  }
  render() {
    const { translate } = this.props.screenProps;
    let list = this.state.filteredList.map((x) => {
      var found;
      if (isArray(this.props.selected)) {
        found = !isUndefined(
          this.props.selected.find((l) => l === x[this.props.value])
        );
      } else {
        found = this.props.selected === x[this.props.value];
      }

      return (
        <TouchableOpacity
          key={x[this.props.id]}
          style={styles.optionsRowContainer}
          onPress={() => {
            this.props._handleChange(x[this.props.value]);
          }}
        >
          <Icon
            type="MaterialCommunityIcons"
            name={found ? "circle" : "circle-outline"}
            style={[
              found ? styles.activetext : styles.inactivetext,
              styles.optionsIconSize,
            ]}
          />
          <Text style={[styles.inactivetext, styles.optionsTextContainer]}>
            {translate(x[this.props.label])}
          </Text>
        </TouchableOpacity>
      );
    });

    return <View style={styles.optionsContainer}>{list}</View>;
  }
}
