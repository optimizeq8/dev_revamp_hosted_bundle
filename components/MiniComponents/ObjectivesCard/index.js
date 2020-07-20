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
    const { translate } = this.props.screenProps;
    let obj = this.props.choice;
    let IconName = obj.icon;
    let color = obj.color;
    let changeState = { borderColor: "#fff", color };
    if (this.props.selected === obj.value) {
      changeState.borderColor = "#9304FF";
    }
    let fillIcons = obj.value !== "APP_INSTALLS" && obj.value !== "VIDEO_VIEWS";
    return (
      <TouchableOpacity
        onPress={this.changeObjective}
        style={[
          styles.campaignButton,
          { borderColor: changeState.borderColor },
        ]}
      >
        <IconName
          width={45}
          height={45}
          stroke={!fillIcons ? changeState.color : "#0000"}
          fill={fillIcons ? changeState.color : "#0000"}
          style={[styles.icon]}
        />
        <View style={styles.textcontainer}>
          <Text
            style={[
              styles.titletext,
              {
                color:
                  this.props.selected === obj.value
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
