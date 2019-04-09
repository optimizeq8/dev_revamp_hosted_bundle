//Components
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
//Style
import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Icons from "../../../assets/SVGs/Objectives/";
class BusinessCard extends Component {
  constructor(props) {
    super(props);
  }
  changeObjective = () => {
    this.props.setObjective(this.props.choice.value);
  };
  render() {
    let va = this.props.choice.value;
    console.log(Icons[va].default);
    let IconName = Icons[va].default;
    let changeState = { backgroundColor: "transparent", color: "#fff" };
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
        {/* <Icon
          type="MaterialCommunityIcons"
          name="web"
          style={[styles.icon, { color: changeState.color }]}
        /> */}

        <IconName style={[styles.icon]} />
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
