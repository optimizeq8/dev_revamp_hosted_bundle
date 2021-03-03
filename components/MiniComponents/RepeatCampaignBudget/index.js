import analytics from "@segment/analytics-react-native";
import { Row } from "native-base";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { RFValue } from "react-native-responsive-fontsize";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { BudgetCards } from "./BudgetCards";
import styles from "./styles";
import WalletIcon from "../../../assets/SVGs/WalletOutline";
import { globalColors } from "../../../GlobalStyles";
import formatNumber from "../../formatNumber";
import SafeAreaView from "react-native-safe-area-view";
import LowerButton from "../LowerButton";
import AudienceReach from "../../Screens/CampaignCreate/AdDetails/AudienceReach";
import { connect } from "react-redux";

class RepeatCampaignBudget extends Component {
  state = {
    value: 0,
    recBudget: 0,
    lifetime_budget_micro: 50,
    budgetOption: 1,
    minValueBudget: 25,
    duration: 0,
  };
  componentDidUpdate(prevProps) {
    let duration = 7;
    let repeatingCampaginData = this.props.repeatingCampaginData;
    let prevTargeting = { geos: [] };
    let recBudget = prevTargeting.geos.length * 75;

    let minValueBudget = 25 * prevTargeting.geos.length;

    if (
      prevProps.repeatingCampaginData.campaign_id !==
      repeatingCampaginData.campaign_id
    ) {
      if (repeatingCampaginData.hasOwnProperty("campaign_id")) {
        duration = repeatingCampaginData.duration;
        prevTargeting = repeatingCampaginData.targeting;
        recBudget = prevTargeting.geos.length * 75;
        minValueBudget = 25 * prevTargeting.geos.length;
      } else {
        duration = Math.round(
          Math.abs(
            (new Date(this.props.start_time).getTime() -
              new Date(this.props.end_time).getTime()) /
              86400000
          ) + 1
        );
      }

      this.setState({
        lifetime_budget_micro: recBudget * 2,
        value: this.formatNumber(recBudget * 2, true),
        recBudget: recBudget,
        duration,
        minValueBudget,
      });
    }
  }
  formatNumber = (num) => {
    return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  _handleBudget = (value, rawValue, onBlur, budgetOption) => {
    const { translate } = this.props.screenProps;
    if (
      !validateWrapper("Budget", rawValue) &&
      rawValue >= this.state.minValueBudget &&
      !isNaN(rawValue)
    ) {
      this.setState({
        lifetime_budget_micro: rawValue,
        value: value,
        budgetOption,
      });

      analytics.track(`a_handle_budget`, {
        source: "ad_targeting",
        source_action: "a_handle_budget",
        custom_budget: false,
        campaign_budget: rawValue,
      });

      return true;
    } else {
      if (onBlur) {
        if (validateWrapper("Budget", rawValue)) {
          analytics.track(`a_error_form`, {
            error_page: "ad_targeting",
            source_action: "a_change_campaign_custom_budget",
            error_description:
              validateWrapper("Budget", rawValue) + " $" + this.props.campaign
                ? this.props.campaign && this.props.campaign.minValueBudget
                : "error",
          });
        }
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description:
            this.props.repeatingCampaginData.targeting &&
            this.props.repeatingCampaginData.targeting.geos.length > 1
              ? `$25 x ${translate("no of Countries")} = $${
                  this.state.minValueBudget
                }`
              : "$" + this.state.minValueBudget,
          type: "warning",
          position: "top",
        });
      }
      analytics.track(`a_handle_budget`, {
        source: "ad_targeting",
        source_action: "a_handle_budget",
        custom_budget: true,
        campaign_budget: rawValue,
      });

      this.setState({
        lifetime_budget_micro: rawValue,
        value: value,
        budgetOption,
      });

      return false;
    }
  };
  render() {
    let { screenProps, selectedCampaign } = this.props;
    let { translate } = screenProps;

    return (
      <View style={styles.repeatBudgetContainer}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Row
          size={-1}
          style={{
            alignItems: "center",
            paddingHorizontal: RFValue(10, 414),
            marginBottom: RFValue(2, 414),
            justifyContent: "center",
          }}
        >
          <WalletIcon
            width={RFValue(10, 414)}
            height={RFValue(10, 414)}
            fill={globalColors.rum}
          />
          <Text
            uppercase
            style={[
              styles.subHeadings,
              {
                paddingHorizontal: RFValue(5, 414),
                fontSize: RFValue(6, 414),
                flex: 1,
              },
            ]}
          >
            {translate("Set your daily budget")}
          </Text>
          <View style={styles.lifetimeBudgetView}>
            <Text style={[styles.subHeadings, styles.lifetimeBudgetText]}>
              {translate("Lifetime budget")}
            </Text>
            <Text style={[styles.subHeadings, styles.lifetimeBudgetNumber]}>
              $
              {formatNumber(
                this.state.duration * this.state.lifetime_budget_micro,
                true
              )}
            </Text>
          </View>
        </Row>

        <BudgetCards
          screenProps={screenProps}
          value={this.state.value}
          recBudget={this.state.recBudget}
          lifetime_budget_micro={this.state.lifetime_budget_micro}
          budgetOption={this.state.budgetOption}
          _handleBudget={this._handleBudget}
        />
        <AudienceReach
          loading={this.props.loading}
          _handleSubmission={this._handleSubmission}
          campaignInfo={selectedCampaign}
          screenProps={this.props.screenProps}
          customContainerStyle={styles.customAudienceReach}
        />
        <LowerButton
          screenProps={this.props.screenProps}
          checkmark
          function={() => {}}
          purpleViolet={true}
          style={{ alignSelf: "flex-end", bottom: 10 }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  repeatingCampaginData: state.campaignC.repeatingCampaginData,
  repeatCampaignLoading: state.campaignC.repeatCampaignLoading,
});
const mapDispatchToProps = (dispatch) => ({
  repeatSnapCampagin: (campaignInfo, handleSwitch) =>
    dispatch(actionCreators.repeatSnapCampagin(campaignInfo, handleSwitch)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatCampaignBudget);
