import React, { Component } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class BusinessCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [
        {
          label: "Agriculure",
          value: "0"
        },
        {
          label: "Automotive",
          value: "3"
        },
        {
          label: "Construstion",
          value: "4"
        },
        {
          label: "Defense",
          value: "5"
        },
        {
          label: "Education",
          value: "6"
        },
        {
          label: "Finance",
          value: "7"
        },
        {
          label: "Food & Bevrage",
          value: "8"
        },
        {
          label: "Government",
          value: "9"
        },
        {
          label: "Health Care",
          value: "10"
        },
        {
          label: "Home Business",
          value: "1"
        },
        {
          label: "Insurance",
          value: "11"
        },
        {
          label: "Mass Media",
          value: "12"
        },
        {
          label: "Oil & Gas",
          value: "13"
        },
        {
          label: "Real Estate",
          value: "14"
        },
        {
          label: "Retail",
          value: "15"
        },
        {
          label: "Tech Business",
          value: "2"
        },
        {
          label: "Telecommunications",
          value: "16"
        },
        {
          label: "Transport",
          value: "17"
        },
        {
          label: "Wholesale",
          value: "18"
        }
      ]
    };
  }
  render() {
    let changeState = { backgroundColor: "#fff", color: "#5F5F5F" };
    if (this.props.mainBusiness.businessid === this.props.business.businessid) {
      changeState.backgroundColor = "#FF9D00";
      changeState.color = "#fff";
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
                b => b.value === this.props.business.businesstype
              ).label
            }
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
