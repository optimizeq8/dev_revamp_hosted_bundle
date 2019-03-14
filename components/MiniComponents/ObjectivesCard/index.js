import React, { Component } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class BusinessCard extends Component {
  constructor(props) {
    super(props);
  }
  changeObjective = () => {
    this.props.setObjective(this.props.choice.value);
  };
  render() {
    let changeState = { backgroundColor: "#fff", color: "#5F5F5F" };
    if (this.props.selected === this.props.choice.value) {
      changeState.backgroundColor = "#FF9D00";
      changeState.color = "#fff";
    }
    return (
      <TouchableOpacity
        onPress={this.changeObjective}
        style={[
          styles.campaignButton,
          { backgroundColor: changeState.backgroundColor }
        ]}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="web"
          style={[styles.icon, { color: changeState.color }]}
        />
        <View style={styles.textcontainer}>
          <Text style={[styles.titletext, { color: changeState.color }]}>
            {this.props.choice.label}
          </Text>
          <Text style={[styles.subtext, { color: changeState.color }]}>
            {this.props.choice.info}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  mainBusiness: state.auth.mainBusiness
});
const mapDispatchToProps = dispatch => ({
  changeBusiness: business => dispatch(actionCreators.changeBusiness(business))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessCard);
