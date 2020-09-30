import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import analytics from "@segment/analytics-react-native";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import businessList from "../../Data/newBusinessCategoryList.data";
import isStringArabic from "../../isStringArabic";
import Swipeout from "react-native-swipeout";
import { ActivityIndicator } from "react-native-paper";
class BusinessCard extends Component {
  translate = this.props.screenProps.translate;
  businessCategory = businessList.find(
    (cat) => cat.value === this.props.business.businesscategory
  );
  swipeoutBtns = [
    {
      text: "Delete",
      component: this.props.deleteBusinessLoading ? (
        <ActivityIndicator color="white" style={{ top: "30%" }} />
      ) : null,
      type: this.props.business.user_role !== "1" ? "default" : "delete",
      underlayColor: "rgba(255,0,0,0.6)",
      disabled: this.props.business.user_role !== "1",
      onPress: () => {
        Alert.alert(
          this.translate("Business") + this.translate("deletion"),
          this.translate("Are you sure you want to delete this business"),
          [
            {
              text: this.translate("Cancel"),
              style: "cancel",
            },
            {
              text: this.translate("Delete"),
              onPress: () =>
                this.props.deleteBusinessAccount(
                  this.props.business.businessid
                ),
              style: "destructive",
            },
          ]
          // { cancelable: false }
        );

        //
      },
    },
  ];
  handleSwitchBusiness = () => {
    if (!this.props.manageTeam) {
      analytics.track(`a_switch_account`, {
        prev_businessid: this.props.mainBusiness.businessid,
        new_businessid: this.props.business.businessid,
        source: "open_hamburger",
        source_action: "a_switch_account",
        timestamp: new Date().getTime(),
        action_status: "success",
      });
      this.props.changeBusiness(this.props.business);
      this.props.resetCampaignInfo();
      this.props.rest_google_campaign_data();
    } else this.props.selectAccount();
  };
  render() {
    //this.props.manageTeam was to be used in BusinessModal to choose multiple businesses but
    //it's not being used anymore until further notice
    let changeState = {
      color: "#c6c6c6",
      textColor: "#5F5F5F",
    };
    const { translate } = this.props.screenProps;
    if (
      !this.props.manageTeam &&
      this.props.mainBusiness &&
      this.props.mainBusiness.businessid === this.props.business.businessid
    ) {
      changeState.color = "#FF790A";
      changeState.textColor = "#FF790A";
    } else if (this.props.isSelected) {
      changeState.color = "#FF790A";
      changeState.textColor = "#FF790A";
    }
    let BusinessIcon = this.businessCategory.icon;
    return (
      <Swipeout
        autoClose={true}
        backgroundColor={"#0000"}
        right={this.swipeoutBtns}
      >
        <TouchableOpacity
          onPress={this.handleSwitchBusiness}
          style={[
            styles.businessButton,
            { backgroundColor: changeState.backgroundColor },
          ]}
        >
          <View
            style={[
              styles.businessIconStyle,
              {
                backgroundColor: changeState.color,
              },
            ]}
          >
            <BusinessIcon width={30} height={30} />
          </View>
          <View style={styles.textcontainer}>
            <Text
              style={[
                styles.titletext,
                { color: changeState.textColor },
                !isStringArabic(this.props.business.businessname)
                  ? {
                      fontFamily: "montserrat-bold-english",
                    }
                  : {},
              ]}
            >
              {this.props.business.businessname}
            </Text>
            <Text style={[styles.subtext, { color: changeState.textColor }]}>
              {this.businessCategory && translate(this.businessCategory.label)}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
const mapStateToProps = (state) => ({
  businessAccounts: state.account.businessAccounts,
  mainBusiness: state.account.mainBusiness,
  deleteBusinessLoading: state.account.deleteBusinessLoading,
});
const mapDispatchToProps = (dispatch) => ({
  changeBusiness: (business) =>
    dispatch(actionCreators.changeBusiness(business)),
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  deleteBusinessAccount: (business_id) =>
    dispatch(actionCreators.deleteBusinessAccount(business_id)),
  rest_google_campaign_data: () =>
    dispatch(actionCreators.rest_google_campaign_data()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BusinessCard);
