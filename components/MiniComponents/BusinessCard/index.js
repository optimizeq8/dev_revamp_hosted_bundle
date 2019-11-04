import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import businessList from "../../Data/newBusinessCategoryList.data";
import find from "lodash/find";
import isStringArabic from "../../isStringArabic";
import Swipeout from "react-native-swipeout";
import { ActivityIndicator } from "react-native-paper";

class BusinessCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: businessList
    };
  }
  render() {
    let changeState = { color: this.props.manageTeam ? "#C6C6C6" : "#5F5F5F" };
    if (
      !this.props.manageTeam &&
      this.props.mainBusiness &&
      this.props.mainBusiness.businessid === this.props.business.businessid
    ) {
      changeState.color = "#FF9D00";
    } else if (this.props.isSelected) {
      changeState.color = "#FF9D00";
    }

    const businessCategory = find(
      this.state.type,
      cat => cat.value === this.props.business.businesscategory
    );
    let BusinessIcon = businessCategory.icon;
    let swipeoutBtns = [
      {
        text: "Delete",
        component: this.props.deleteBusinessLoading ? (
          <ActivityIndicator color="white" style={{ top: "30%" }} />
        ) : null,
        type:
          this.props.businessAccounts.length === 1 ||
          this.props.business.user_role !== "1"
            ? "default"
            : "delete",
        underlayColor: "rgba(255,0,0,0.6)",
        disabled:
          this.props.businessAccounts.length === 1 ||
          this.props.business.user_role !== "1",
        onPress: () => {
          this.props.deleteBusinessAccount(this.props.business.businessid);
        }
      }
    ];

    return (
      <Swipeout
        disabled
        autoClose={true}
        backgroundColor={"#0000"}
        right={swipeoutBtns}
      >
        <TouchableOpacity
          onPress={() => {
            if (!this.props.manageTeam) {
              this.props.changeBusiness(this.props.business);
              this.props.resetCampaignInfo();
            } else this.props.selectAccount();
          }}
          style={[
            styles.campaignButton,
            { backgroundColor: changeState.backgroundColor }
          ]}
        >
          <View
            style={{
              backgroundColor: changeState.color,
              width: 50,
              height: 50,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BusinessIcon
              width={30}
              height={30}
              // type="MaterialCommunityIcons"
              // name="web"
              // style={[styles.icon, { color: changeState.color }]}
            />
          </View>
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
      </Swipeout>
    );
  }
}
const mapStateToProps = state => ({
  businessAccounts: state.account.businessAccounts,
  mainBusiness: state.account.mainBusiness,
  deleteBusinessLoading: state.account.deleteBusinessLoading
});
const mapDispatchToProps = dispatch => ({
  changeBusiness: business => dispatch(actionCreators.changeBusiness(business)),
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  deleteBusinessAccount: business_id =>
    dispatch(actionCreators.deleteBusinessAccount(business_id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessCard);
