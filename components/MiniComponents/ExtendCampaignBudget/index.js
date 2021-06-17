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
import * as actionCreators from "../../../store/actions";
import { cloneDeep } from "lodash";
import ReachBar from "../../Screens/InstagramCampaignCreate/Feed/AdTargetting/ReachBar";
import ForwardLoading from "../ForwardLoading";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

class RepeatCampaignBudget extends Component {
  state = {
    extendedCampaginData: {},
    value: 0,
    recBudget: 0,
    lifetime_budget_micro: 50,
    budgetOption: 1,
    minValueBudget: 25,
    duration: 0,
  };
  componentDidMount() {
    this.props.get_languages();

    let duration = 7;
    let prevCampaignIsInstagram = this.props.campaign.channel === "instagram";
    let extendedCampaginData = prevCampaignIsInstagram
      ? this.props.extendedInstaCampaginData
      : this.props.extendedCampaginData;
    let prevTargeting = { geos: [] };
    let recBudget = prevTargeting.geos.length * 75;
    let minValueBudget = 25 * prevTargeting.geos.length;
    if (extendedCampaginData) {
      if (extendedCampaginData.hasOwnProperty("campaign_id")) {
        duration = extendedCampaginData.duration;
        prevTargeting = extendedCampaginData.targeting;
        if (prevCampaignIsInstagram) {
          if (
            prevTargeting.geo_locations.countries &&
            prevTargeting.geo_locations.custom_locations
          ) {
            recBudget =
              (prevTargeting.geo_locations.countries.length +
                prevTargeting.geo_locations.custom_locations.length) *
              75;
            minValueBudget =
              25 *
              (prevTargeting.geo_locations.countries.length +
                prevTargeting.geo_locations.custom_locations.length);
          } else if (
            prevTargeting.geo_locations.countries &&
            !prevTargeting.geo_locations.custom_locations
          ) {
            recBudget = prevTargeting.geo_locations.countries.length * 75;
            minValueBudget = 25 * prevTargeting.geo_locations.countries.length;
          } else if (
            !prevTargeting.geo_locations.countries &&
            prevTargeting.geo_locations.custom_locations
          ) {
            recBudget =
              prevTargeting.geo_locations.custom_locations.length * 75;
            minValueBudget =
              25 * prevTargeting.geo_locations.custom_locations.length;
          }
        } else {
          recBudget = prevTargeting.geos.length * 75;
          minValueBudget = 25 * prevTargeting.geos.length;
        }
      } else {
        duration = Math.round(
          Math.abs(
            (new Date(this.props.start_time).getTime() -
              new Date(this.props.end_time).getTime()) /
              86400000
          ) + 1
        );
      }

      this.setState(
        {
          extendedCampaginData,
          lifetime_budget_micro: recBudget * 2,
          value: this.formatNumber(recBudget * 2, true),
          recBudget: recBudget,
          duration,
          minValueBudget,
          prevCampaignIsInstagram,
          budgetOption: 1,
        },
        () => {
          if (extendedCampaginData.hasOwnProperty("campaign_id"))
            !prevCampaignIsInstagram
              ? this._calcSnapReach(extendedCampaginData)
              : this._calcInstaReach(extendedCampaginData);
        }
      );
    }
  }
  componentDidUpdate(prevProps) {
    let duration = 7;
    let prevCampaignIsInstagram = this.props.campaign.channel === "instagram";
    let extendedCampaginData = prevCampaignIsInstagram
      ? this.props.extendedInstaCampaginData
      : this.props.extendedCampaginData;
    let previousextendedCampaginData = prevCampaignIsInstagram
      ? prevProps.extendedInstaCampaginData
      : prevProps.extendedCampaginData;
    let prevTargeting = { geos: [] };
    let recBudget = prevTargeting.geos.length * 75;
    let minValueBudget = 25 * prevTargeting.geos.length;
    if (
      (previousextendedCampaginData &&
        previousextendedCampaginData.campaign_id !==
          extendedCampaginData.campaign_id) ||
      (previousextendedCampaginData &&
        previousextendedCampaginData.duration !== extendedCampaginData.duration)
    ) {
      if (extendedCampaginData.hasOwnProperty("campaign_id")) {
        duration = extendedCampaginData.duration;
        prevTargeting = extendedCampaginData.targeting;
        if (prevCampaignIsInstagram) {
          if (
            prevTargeting.geo_locations.countries &&
            prevTargeting.geo_locations.custom_locations
          ) {
            recBudget =
              (prevTargeting.geo_locations.countries.length +
                prevTargeting.geo_locations.custom_locations.length) *
              75;
            minValueBudget =
              25 *
              (prevTargeting.geo_locations.countries.length +
                prevTargeting.geo_locations.custom_locations.length);
          } else if (
            prevTargeting.geo_locations.countries &&
            !prevTargeting.geo_locations.custom_locations
          ) {
            recBudget = prevTargeting.geo_locations.countries.length * 75;
            minValueBudget = 25 * prevTargeting.geo_locations.countries.length;
          } else if (
            !prevTargeting.geo_locations.countries &&
            prevTargeting.geo_locations.custom_locations
          ) {
            recBudget =
              prevTargeting.geo_locations.custom_locations.length * 75;
            minValueBudget =
              25 * prevTargeting.geo_locations.custom_locations.length;
          }
        } else {
          recBudget = prevTargeting.geos.length * 75;
          minValueBudget = 25 * prevTargeting.geos.length;
        }
      } else {
        duration = Math.round(
          Math.abs(
            (new Date(this.props.start_time).getTime() -
              new Date(this.props.end_time).getTime()) /
              86400000
          ) + 1
        );
      }

      this.setState(
        {
          extendedCampaginData,
          lifetime_budget_micro: recBudget * 2,
          value: this.formatNumber(recBudget * 2, true),
          recBudget: recBudget,
          duration,
          minValueBudget,
          prevCampaignIsInstagram,
          budgetOption: 1,
        },
        () => {
          if (extendedCampaginData.hasOwnProperty("campaign_id"))
            !prevCampaignIsInstagram
              ? this._calcSnapReach(extendedCampaginData)
              : this._calcInstaReach(extendedCampaginData);
        }
      );
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
        businessid: this.props.mainBusiness.businessid,
      });
      !this.state.prevCampaignIsInstagram
        ? this._calcSnapReach(this.state.extendedCampaginData, rawValue)
        : this._calcInstaReach(this.state.extendedCampaginData, rawValue);
      return true;
    } else {
      if (onBlur) {
        if (validateWrapper("Budget", rawValue)) {
          analytics.track(`a_error_form`, {
            businessid: this.props.mainBusiness.businessid,
            error_page: "ad_targeting",
            source_action: "a_change_campaign_custom_budget",
            error_description:
              validateWrapper("Budget", rawValue) + " $" + this.props.campaign
                ? this.props.campaign && this.props.campaign.minValueBudget
                : "error",
          });
        }
        let extendedCampaginData = this.state.extendedCampaginData;
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description:
            extendedCampaginData.targeting &&
            (this.state.prevCampaignIsInstagram
              ? extendedCampaginData.targeting.geo_locations.countries.length
              : extendedCampaginData.targeting.geos.length) > 1
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
        businessid: this.props.mainBusiness.businessid,
      });

      this.setState({
        lifetime_budget_micro: rawValue,
        value: value,
        budgetOption,
      });

      return false;
    }
  };
  handleSubmission = () => {
    let { campaign } = this.props;
    let extendCampaignAction =
      campaign.channel === "instagram"
        ? this.props.extendInstaCampaginBudget
        : this.props.extendSnapCampaginBudget;
    if (
      this._handleBudget(
        this.state.value,
        this.state.lifetime_budget_micro,
        true,
        this.state.budgetOption
      )
    )
      extendCampaignAction(
        {
          campaign_id: this.state.extendedCampaginData.campaign_id,
          lifetime_budget_micro:
            this.state.duration * this.state.lifetime_budget_micro,
        },
        this.props.handleExtendModal
      );
  };

  _calcSnapReach = async (
    extendedCampaginData,
    rawValue = this.state.lifetime_budget_micro
  ) => {
    extendedCountryTargetingCampaign = extendedCampaginData.targeting;
    if (extendedCountryTargetingCampaign !== "") {
      let r = cloneDeep(extendedCampaginData.targeting);
      if (r.demographics[0].gender === "") {
        delete r.demographics[0].gender;
      }
      if (r.hasOwnProperty("devices") && r.devices[0].os_type === "") {
        delete r.devices[0].os_type;
      }
      if (
        r.geos.some((re) => re.hasOwnProperty("region_id")) &&
        r.geos.some(
          (re) => re.hasOwnProperty("region_id") && re.region_id.length === 0
        )
      ) {
        r.geos.forEach(
          (re) =>
            re.hasOwnProperty("region_id") &&
            re.region_id.length === 0 &&
            delete re.region_id
        );
      }
      if (
        r.hasOwnProperty("interests") &&
        r.interests[0].category_id.length === 0
      ) {
        delete r.interests;
      }
      const obj = {
        targeting: JSON.stringify(r),
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        daily_budget_micro: rawValue,
        campaign_id: extendedCampaginData.campaign_id,
        duration: extendedCampaginData.duration,
      };

      let totalReach = {
        demographics: [
          {
            languages: this.props.languages.map((lang) => lang.id),
            min_age: 18,
            max_age: "50+",
          },
        ],
        geos: extendedCampaginData.targeting.geos.map((geo) => ({
          country_code: geo.country_code,
        })),
      };
      const obj2 = {
        targeting: JSON.stringify(totalReach),
        duration: extendedCampaginData.duration,
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
      };
      await this.props.snap_ad_audience_size(obj, obj2);
    }
  };

  _calcInstaReach = async (
    extendedCampaginData,
    rawValue = this.state.lifetime_budget_micro
  ) => {
    let r = cloneDeep(extendedCampaginData.targeting);
    if (
      r.hasOwnProperty("flexible_spec") &&
      r.hasOwnProperty("customInterests") &&
      r.flexible_spec[0].interests.length > 0 &&
      extendedCampaginData.customInterests &&
      extendedCampaginData.customInterests.length > 0
    )
      r.flexible_spec[0].interests = r.flexible_spec[0].interests.concat(
        this.state.customInterests
      );
    else if (
      extendedCampaginData.customInterests &&
      extendedCampaginData.customInterests.length > 0
    ) {
      r.flexible_spec[0].interests = this.state.customInterests;
    }
    let totalReach = {
      geo_locations: {
        countries: r.geo_locations.countries,
      },
    };
    if (r.geo_locations.countries.length === 0) {
      delete r.geo_locations.countries;
    }
    if (r.geo_locations.regions && r.geo_locations.regions.length === 0) {
      delete r.geo_locations.regions;
    }
    if (
      !r.geo_locations.hasOwnProperty("regions") &&
      !r.geo_locations.hasOwnProperty("countries")
    ) {
      delete r.geo_locations;
    }
    if (r.hasOwnProperty("genders") && r.genders[0] === "") {
      delete r.genders;
    }

    if (r.hasOwnProperty("user_os") && r.user_os[0] === "") {
      r.user_os = [];
      delete r.user_device;
      delete r.os_version_min;
      delete r.os_version_max;
    }
    if (
      r.hasOwnProperty("flexible_spec") &&
      (!r.flexible_spec[0].interests ||
        r.flexible_spec[0].interests.length === 0)
    ) {
      delete r.flexible_spec;
    }

    if (r.user_device && r.user_device.length === 0) {
      delete r.user_device;
    }
    if (r.hasOwnProperty("os_version_min") && r.os_version_min === "") {
      delete r.os_version_min;
    }
    if (r.hasOwnProperty("os_version_max") && r.os_version_max === "") {
      delete r.os_version_max;
    }
    const obj = {
      targeting: JSON.stringify(r),
      ad_account_id: this.props.mainBusiness.fb_ad_account_id,
      campaign_id: extendedCampaginData.campaign_id,
      daily_budget_micro: rawValue,
    };
    if (totalReach.geo_locations.countries.length === 0) {
      delete totalReach.geo_locations.countries;
    }
    // if (totalReach.geo_locations.regions.length === 0) {
    //   delete totalReach.geo_locations.regions;
    // }
    if (
      !totalReach.geo_locations.hasOwnProperty("regions") &&
      !totalReach.geo_locations.hasOwnProperty("countries")
    ) {
      delete totalReach.geo_locations;
    }
    const obj2 = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: this.props.mainBusiness.fb_ad_account_id,
      campaign_id: extendedCampaginData.campaign_id,
      daily_budget_micro: this.state.lifetime_budget_micro,
    };

    await this.props.instagram_ad_audience_size(obj, obj2);
    // }
  };
  render() {
    let { screenProps, campaign } = this.props;
    let { translate } = screenProps;

    return (
      <View style={styles.extendBudgetContainer}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: RFValue(10, 414),
            marginBottom: RFValue(2, 414),
            //   justifyContent: "center",
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
        </View>
        <BudgetCards
          screenProps={screenProps}
          value={this.state.value}
          recBudget={this.state.recBudget}
          lifetime_budget_micro={this.state.lifetime_budget_micro}
          budgetOption={this.state.budgetOption}
          _handleBudget={this._handleBudget}
        />

        {campaign.channel !== "instagram" ? (
          <AudienceReach
            _handleSubmission={this._handleSubmission}
            campaignInfo={campaign}
            screenProps={this.props.screenProps}
            customContainerStyle={styles.customAudienceReach}
          />
        ) : (
          <ReachBar
            campaignInfo={campaign}
            screenProps={this.props.screenProps}
            customContainerStyle={{
              bottom: Platform.OS === "ios" ? -30 : 15,
              height: "40%",
            }}
          />
        )}
        {(
          campaign.channel !== "instagram"
            ? this.props.extendCampaignLoading
            : this.props.extendInstaCampaignLoading
        ) ? (
          <ForwardLoading
            mainViewStyle={{
              width: widthPercentageToDP(5),
              height: heightPercentageToDP(5),
              alignSelf: "flex-end",
              right: "5%",
            }}
            bottom={20}
            style={{
              width: widthPercentageToDP(7),
              height: heightPercentageToDP(7),
            }}
          />
        ) : (
          <LowerButton
            screenProps={this.props.screenProps}
            checkmark
            function={this.handleSubmission}
            purpleViolet={true}
            style={{ alignSelf: "flex-end", bottom: RFValue(5, 414) }}
            disabled={
              campaign.channel !== "instagram"
                ? this.props.extendCampaignLoading
                : this.props.extendInstaCampaignLoading
            }
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  extendedCampaginData: state.campaignC.extendedCampaginData,
  extendCampaignLoading: state.campaignC.extendCampaignLoading,
  extendedInstaCampaginData: state.instagramAds.extendedInstaCampaginData,
  extendInstaCampaignLoading: state.instagramAds.extendInstaCampaignLoading,
  languages: state.campaignC.languagesList,
  mainBusiness: state.account.mainBusiness,
});
const mapDispatchToProps = (dispatch) => ({
  extendSnapCampaginBudget: (campaignInfo, handleRepeatModal) =>
    dispatch(
      actionCreators.extendSnapCampaginBudget(campaignInfo, handleRepeatModal)
    ),
  extendInstaCampaginBudget: (campaignInfo, handleRepeatModal) =>
    dispatch(
      actionCreators.extendInstaCampaginBudget(campaignInfo, handleRepeatModal)
    ),
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
  instagram_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.instagram_ad_audience_size(info, totalReach)),
  get_languages: () => dispatch(actionCreators.get_languages()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatCampaignBudget);
