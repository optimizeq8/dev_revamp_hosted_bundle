import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import businessList from "../../Data/businessCategoriesList.data";
import find from "lodash/find";
import isStringArabic from "../../isStringArabic";

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

    const businessCategory = find(
      this.state.type,
      cat => cat.value === this.props.business.businesscategory
    );

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.changeBusiness(this.props.business);
          this.props.resetCampaignInfo();
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
          <Text
            style={[
              styles.titletext,
              { color: changeState.color },
              !isStringArabic(this.props.business.businessname)
                ? {
                    fontFamily: "montserrat-medium-english"
                  }
                : {}
            ]}
          >
            {this.props.business.businessname}
          </Text>
          <Text style={[styles.subtext, { color: changeState.color }]}>
            {businessCategory && businessCategory.label}
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
  changeBusiness: business => dispatch(actionCreators.changeBusiness(business)),
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessCard);
