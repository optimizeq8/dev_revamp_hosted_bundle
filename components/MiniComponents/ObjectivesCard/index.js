//Components
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
//Style
import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions";
import * as ObjIcons from "../../../assets/SVGs/Objectives";

import { connect } from "react-redux";
class ObjectiveCard extends Component {
  constructor(props) {
    super(props);
  }
  changeObjective = () => {
    this.props.setObjective(this.props.choice);
  };
  render() {
    const { translate } = this.props.screenProps;
    let obj = this.props.choice;
    let IconName = ObjIcons[obj.icon];
    let color = obj.color;
    let changeState = { borderColor: "#fff", color };
    if (this.props.selected === obj.label) {
      changeState.borderColor = "#9304FF";
    }
    return (
      <TouchableOpacity
        onPress={this.changeObjective}
        style={[
          styles.campaignButton,
          { borderColor: changeState.borderColor },
        ]}
      >
        <IconName
          width={RFValue(22.5, 414)}
          height={RFValue(22.5, 414)}
          fill={changeState.color}
          style={[styles.icon]}
        />
        <View style={styles.textcontainer}>
          <Text
            style={[
              styles.titletext,
              {
                color:
                  this.props.selected === obj.label
                    ? changeState.color
                    : "#D2C6D8",
              },
            ]}
          >
            {translate(obj.label)}
          </Text>
          <Text style={[styles.subtext, { color: changeState.color }]}>
            {translate(obj.info)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});
const mapDispatchToProps = (dispatch) => ({
  changeBusiness: (business) =>
    dispatch(actionCreators.changeBusiness(business)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveCard);
