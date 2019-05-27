import React, { Component } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from ".././../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import businessList from "../../Screens/CreateBusinessAccount/BusinessCategoriesList";

class BusinessCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: businessList
    };
  }
  render() {
    let changeState = { color: "#5F5F5F" };
    if (
      this.props.mainBusiness &&
      this.props.mainBusiness.businessid === this.props.business.businessid
    ) {
      changeState.color = "#FF9D00";
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.changeBusiness(this.props.business);
        }}
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
            {this.props.business.businessname}
          </Text>
          <Text style={[styles.subtext, { color: changeState.color }]}>
            {
              this.state.type.find(
                b => b.value === this.props.business.businesscategory
              ).label
            }
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
)(BusinessCard);
