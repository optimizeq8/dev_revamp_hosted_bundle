//Components
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
//Style
import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
class ObjectiveCard extends Component {
  constructor(props) {
    super(props);
  }
  changeObjective = () => {
    this.props.setObjective(this.props.choice);
  };
  render() {
    let obj = this.props.choice;
    let IconName = obj.icon;
    let changeState = { backgroundColor: "transparent", color: "#fff" };
    if (this.props.selected === obj.value) {
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
        <IconName width={30} height={30} fill="#fff" style={[styles.icon]} />
        <View style={styles.textcontainer}>
          <Text style={[styles.titletext, { color: changeState.color }]}>
            {obj.label}
          </Text>
          <Text style={[styles.subtext, { color: changeState.color }]}>
            {obj.info}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness
});
const mapDispatchToProps = dispatch => ({
  changeBusiness: business => dispatch(actionCreators.changeBusiness(business))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveCard);
