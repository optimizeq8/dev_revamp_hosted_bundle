import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import { Text } from "native-base";
import { BlurView } from "expo-blur";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { Modal } from "react-native-paper";
import DateRangePicker from "./DateRangePicker";
import CustomHeader from "../Header";
import {
  SafeAreaView,
  NavigationActions,
  StackActions
} from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Segment from "expo-analytics-segment";
import * as actionCreators from "../../../store/actions";
// Style
import styles from "./styles";

//icons
import CalenderkIcon from "../../../assets/SVGs/Calender";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Loading from "../LoadingScreen";
import LowerButton from "../LowerButton";

class DateFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      start_choice: false,
      end_choice: false,
      reset: false,
      start_timeError: "",
      end_date: "",
      start_date: "",
      resumeLoading: false,
      outdatedDate: false
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    this.setState({
      end_date: this.props.end_time,
      start_date: this.props.start_time
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getErrors = () => {
    this.setState({
      start_timeError: validateWrapper("mandatory", this.props.start_time),
      end_timeError: validateWrapper("mandatory", this.props.end_time)
    });
    return {
      end_timeError: validateWrapper("mandatory", this.props.end_time),
      start_timeError: validateWrapper("mandatory", this.props.start_time)
    };
  };

  startDatePicked = () => {
    this.setState({
      start_choice: true,
      end_choice: false
    });
  };
  endDatePicked = () => {
    this.setState({
      end_choice: true
    });
  };

  showModal = (outdatedDate = false) => {
    Segment.screen("Date Modal");
    this.setState({
      modalVisible: true,
      outdatedDate
    });
  };

  handleDate = async () => {
    //Gets the difference between two dates
    let timeDiff = Math.round(
      Math.abs(
        (new Date(this.state.start_date).getTime() -
          new Date(this.state.end_date).getTime()) /
          86400000
      )
    );
    if (!this.props.filterMenu && !this.props.chartRange) {
      await this.props.handleStartDatePicked(this.state.start_date);
      await this.props.handleEndDatePicked(this.state.end_date);
      await this.props.getMinimumCash(timeDiff + 1);

      //if user chooses to resume a campaign and the dates are not appiclble then
      //the dateField modal shows up and handles to resume campaign or not with new dates
      if (
        this.props.incompleteCampaign && //pass as a props
        !this.props.campaignProgressStarted && //pass as a props
        this.state.outdatedDate
      ) {
        //the app actually freezes for a few seconds when navigateToContinue runs so i delay
        //it's exectution to desiplay a loader because if i don't the loader doesn't show up
        this.setState({ resumeLoading: true });
        setTimeout(() => {
          this.navigateToContinue();
          this.setState({
            modalVisible: false,
            start_choice: false,
            end_choice: false
          });
        }, 200);
      } else
        this.setState({
          modalVisible: false,
          start_choice: false,
          end_choice: false
        });
    } else if (this.props.filterMenu) {
      await this.props.handleStartDatePicked(this.state.start_date);
      await this.props.handleEndDatePicked(this.state.end_date);
      this.setState({
        modalVisible: false,
        start_choice: false,
        end_choice: false
      });
    } else if (this.props.chartRange) {
      this.props.durationChange(this.state.start_date, this.state.end_date);
      this.setState({
        modalVisible: false,
        start_choice: false,
        end_choice: false
      });
    }
  };

  handleReset = () => {
    if (this.props.chartRange) {
      this.setState({
        start_choice: false,
        end_choice: false,
        start_timeError: "",
        modalVisible: false,
        start_date: "",
        end_date: ""
      });
      this.setState({ modalVisible: false });
      this.props.durationChange(
        this.props.selectedCampaign.start_time,
        this.props.selectedCampaign.end_time
        // "2019-05-09",
        // "2019-05-25"
      );
    } else {
      this.setState({
        start_choice: false,
        end_choice: false,
        start_timeError: "",
        start_date: "",
        end_date: "",
        reset: true
      });
    }
  };
  /**
   * Same as the navigateToContinue and handleContinue functions in ContinueCampaign modal
   * except this filters out the AdPaymentReview route from the stack so the budget is recalculated
   * again in AdDetails
   */
  navigateToContinue = async () => {
    if (this.props.channel === "google") {
      //Same as if using a map and a filter at the same time
      let reduceFunction = (newRoutes, route) => {
        // if (route !== "AdPaymentReview") {
        // pass as a props lastScreen
        let correctRoute = NavigationActions.navigate({
          routeName: route
        });
        newRoutes.push(correctRoute);
        // }
        return newRoutes;
      };
      let continueRoutes = this.props.currentCampaignSteps.reduce(
        //pass props
        reduceFunction,
        []
      );
      resetAction = StackActions.reset({
        index: continueRoutes.length - 1,
        actions: continueRoutes
      });
      this.props.set_google_campaign_resumed(true);

      // //Updates the campaign's date in the back end when resuming with the same data
      this.setState({ modalVisible: false });
      await this.props.create_google_SE_campaign_info(
        {
          campaign_id: "",
          id: this.props.googleCampaign.id,
          businessid: this.props.mainBusiness.businessid,
          name: this.props.googleCampaign.name,
          language: this.props.googleCampaign.language,
          start_time: this.props.googleCampaign.start_time,
          end_time: this.props.googleCampaign.end_time,
          location: this.props.googleCampaign.location
        },
        //this is as if passing this.props.navigation and calling navigation.push but it does nothing
        //because i don't want to navigate from within the store after the request is done
        { push: () => {} }
      );
      // this.props.navigation.dispatch(resetAction);
    } else {
      //Same as if using a map and a filter at the same time
      let reduceFunction = (newRoutes, route) => {
        if (route !== "AdPaymentReview") {
          // pass as a props lastScreen
          let correctRoute = NavigationActions.navigate({
            routeName: route
          });
          newRoutes.push(correctRoute);
        }
        return newRoutes;
      };
      let continueRoutes = this.props.currentCampaignSteps.reduce(
        //pass props
        reduceFunction,
        []
      );
      resetAction = StackActions.reset({
        index: continueRoutes.length - 1,
        actions: continueRoutes
      });
      this.props.setCampaignInProgress(true);
      this.props.overWriteObjectiveData({
        start_time: this.state.start_date,
        end_time: this.state.end_date
      }); //overwrite this.props.data with the new dates
      this.props.set_adType(this.props.oldTempAdType);
      //Updates the campaign's date in the back end when resuming with the same data
      this.setState({ modalVisible: false });
      await this.props.ad_objective(
        {
          campaign_id: this.props.campaign_id,
          campaign_type: this.props.adType,
          ad_account_id: this.props.mainBusiness.snap_ad_account_id,
          businessid: this.props.mainBusiness.businessid,
          name: this.props.data.name,
          objective: this.props.data.objective,
          start_time: this.props.data.start_time,
          end_time: this.props.data.end_time
        },
        //this is as if passing this.props.navigation and calling navigation.push but it does nothing
        //because i don't want to navigate from within the store after the request is done
        { push: () => {} }
      );
      this.props.navigation.dispatch(resetAction);
    }
    this.setState({ resumeLoading: false });
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <View
        style={[
          styles.dateModal,
          this.state.modalVisible ? { zIndex: 100 } : { zIndex: -1 },
          this.props.filterMenu &&
            !I18nManager.isRTL && {
              marginLeft: -80,
              marginTop: -hp(6)
            },
          this.props.filterMenu &&
            I18nManager.isRTL && {
              // marginLeft: 0,
              marginTop: -hp(6),
              marginLeft: 0,
              marginRight: -10
            }
        ]}
      >
        <Modal
          onDismiss={() => this.setState({ modalVisible: false })}
          onRequestClose={() => this.setState({ modalVisible: false })}
          visible={
            this.props.filterMenu
              ? this.state.modalVisible && this.props.open
              : this.state.modalVisible
          }
        >
          <BlurView
            tint="dark"
            intensity={95}
            style={[
              styles.BlurView,
              this.props.filterMenu &&
                !I18nManager.isRTL && {
                  paddingLeft: wp("20"),
                  paddingTop: hp(6)
                },
              this.props.filterMenu &&
                I18nManager.isRTL && {
                  paddingLeft: wp("2"),
                  paddingRight: wp("8"),
                  paddingTop: hp(6)
                }
            ]}
          >
            <SafeAreaView
              style={styles.safeArea}
              forceInset={{ bottom: "never", top: "always" }}
            >
              <View style={{ alignItems: "center" }}>
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => {
                    this.setState({ modalVisible: false });
                    if (this.state.outdatedDate) {
                      this.props.navigation.goBack();
                    }
                  }}
                  topRightButtonText={translate("Reset")}
                  topRightButtonFunction={this.handleReset}
                  showTopRightButton={
                    this.state.start_date || this.props.chartRange
                  }
                  title={"Duration"}
                />
              </View>
              <Text style={styles.textModal}>
                {this.props.filterMenu
                  ? translate("Select a date range to filter from")
                  : translate("Please select your ad launch and end dates")}
              </Text>
              <CalenderkIcon
                width={hp(5) < 30 ? 30 : 60}
                height={hp(5) < 30 ? 30 : 60}
                style={styles.icon}
              />
              <Text style={styles.textModalOrange}>
                {translate(
                  `Select the ${
                    !this.state.start_choice ? "Start Date" : "End Date"
                  }`
                )}
              </Text>
              <View style={{ height: "55%" }}>
                <DateRangePicker
                  initialRange={
                    this.props.start_time
                      ? [this.props.start_time, this.props.end_time]
                      : ["", ""]
                  }
                  filterMenu={this.props.filterMenu}
                  reset={this.state.reset}
                  chartRange={this.props.chartRange}
                  selectedCampaign={this.props.selectedCampaign}
                  startDatePicked={this.startDatePicked}
                  endDatePicked={this.endDatePicked}
                  // initialRange={[this.props.start_time, this.props.end_time]}
                  onSuccess={async (s, e) => {
                    this.endDatePicked();
                    this.setState({
                      start_date: s,
                      end_date: e,
                      reset: false
                    });
                  }}
                  theme={{
                    markColor: "#FF9D00",
                    markTextColor: "white"
                  }}
                />
              </View>

              {this.state.end_choice ||
              (this.state.end_choice &&
                this.props.start_time &&
                !this.state.reset) ? (
                <LowerButton
                  checkmark
                  style={styles.button}
                  function={() => this.handleDate()}
                />
              ) : null}
            </SafeAreaView>
          </BlurView>
          {this.state.resumeLoading && <Loading dash />}
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  oldTempAdType: state.campaignC.oldTempAdType,
  oldTempData: state.campaignC.oldTempData,
  data: state.campaignC.data,
  mainBusiness: state.account.mainBusiness,
  campaign_id: state.campaignC.campaign_id,
  adType: state.campaignC.adType,
  channel: state.transA.channel,
  googleCampaign: state.googleAds
});
const mapDispatchToProps = dispatch => ({
  setCampaignInProgress: value =>
    dispatch(actionCreators.setCampaignInProgress(value)),
  overWriteObjectiveData: value =>
    dispatch(actionCreators.overWriteObjectiveData(value)),
  set_adType: value => dispatch(actionCreators.set_adType(value)),
  ad_objective: (info, navigation) =>
    dispatch(actionCreators.ad_objective(info, navigation)),
  set_google_campaign_resumed: value =>
    dispatch(actionCreators.set_google_campaign_resumed(value)),
  save_google_campaign_data: info =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  create_google_SE_campaign_info: (info, navigation) =>
    dispatch(actionCreators.create_google_SE_campaign_info(info, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(DateFields);

DateFields.propTypes = {
  getMinimumCash: PropTypes.func, //Gets the minimum budget for a campaign based on dates
  handleStartDatePicked: PropTypes.func.isRequired,
  handleEndDatePicked: PropTypes.func.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  screenProps: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  closedContinueModal: PropTypes.bool, //Determines whether navigateToContinue is called when submitting or not
  handleClosingContinueModal: PropTypes.func, //Sets closedContinueModal to true so that creating a new campaing without choosing wheter to continue or not doesn't cause a conflict
  open: PropTypes.bool, //Shows the modal if the sideMenu is open
  filterMenu: PropTypes.bool, //Determines if the DateField is being rendered from the dashborad filter menu or not
  durationChange: PropTypes.func, //Handles the api call to filter the charts by dates
  selectedCampaign: PropTypes.object //The campaign from CampaignDetails
};
