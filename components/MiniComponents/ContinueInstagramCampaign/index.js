import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import { connect } from "react-redux";
import { Text } from "native-base";
import analytics from "@segment/analytics-react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import * as actionCreators from "../../../store/actions";
import {
  SafeAreaView,
  NavigationActions,
  StackActions,
} from "react-navigation";
import CustomHeader from "../Header";
import { persistor } from "../../../store/";
import styles from "../ContinueCampaign/styles";
import CustomButtons from "../CustomButtons";
import ContinueInfo from "./ContinueInfo";
import { showMessage } from "react-native-flash-message";
import Loading from "../LoadingScreen";
/**
 * The modal that shows up when there's a campaign to resume
 */
class ContinueCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, resumeLoading: false };
  }
  componentDidMount() {
    //this is to disable showing the modal everytime if a campaign creation is in progress
    if (this.props.incompleteCampaign && !this.props.campaignProgressStarted) {
      analytics.track("continue_campaign_modal", {
        source: "ad_objective",
        // source_action: ""
        campaign_channel: "instagram",
        campaign_ad_type: this.props.adType,
      });
      this.continueCampaign();
    }
  }

  /**
   * Resets the navigation stack and inserts the campaign steps/screens that the user
   * already went over
   */
  navigateToContinue = () => {
    //Array of navigation routes to set in the stack

    let continueRoutes = this.props.currentCampaignSteps.map((route) =>
      NavigationActions.navigate(
        {
          routeName: route,
        },
        {
          source: "continue_campaign_modal",
          source_action: "a_continue_campaign",
        }
      )
    );
    //resets the navigation stack
    resetAction = StackActions.reset({
      index: continueRoutes.length - 1, //index of the last screen route
      actions: continueRoutes,
    });

    this.props.navigation.dispatch(resetAction);
  };
  /**
   * Handles whether the modal is closed or not and if the user chooses to resume or not
   *
   * @param {Bool} isVisible boolean to show the modal or not
   * @param {Bool} resetCampaign boolean to handle if user chooses to create a new campaign
   */
  handleSubmition = (isVisible, resetCampaign) => {
    this.setState({ isVisible });
    let tempAdType = this.props.navigation.getParam(
      "tempAdType",
      this.props.tempAdType
    );
    if (resetCampaign) {
      //if resetCampaign is true, then resetCampaignInfo is called with false to return this.props.data back to null
      this.props.resetCampaignInfo(!resetCampaign);
      this.props.set_adType_instagram(tempAdType);
      persistor.purge();
    }
  };
  /**
   * Handles showing the continue modal after 0.8 seconds
   */
  continueCampaign = () => {
    if (this.props.incompleteCampaign) {
      setTimeout(() => {
        this.setState({ isVisible: true });
      }, 800);
    }
  };

  /**
   * Handles if users chooses to continue a campaign
   */
  handleContinue = () => {
    //checks if the old campaign dates are still applicable or not so
    //it doesn't create a campaign with old dates
    if (
      new Date(this.props.data.start_time) < new Date() ||
      new Date(this.props.data.end_time) < new Date()
    ) {
      showMessage({
        message: "The dates are no longer applicable",
        description: "Please choose new dates",
        type: "warning",
      });
      //Shows the dateField's modal to set new dates and resumes campaign
      this.handleSubmition(false, false), 800;
      setTimeout(() => {
        //to fix issue with date field not opening when the resume modal is open
        this.props.dateField.showModal();
      }, 500);
    } else {
      this.setState({ resumeLoading: true });
      let updated_transaction_data = {
        channel: "instagram",
      };
      if (
        this.props.currentCampaignSteps.includes("InstagramFeedAdObjective")
      ) {
        updated_transaction_data = {
          ...updated_transaction_data,
          campaign_id: this.props.data.campaign_id,
        };
      }
      // if (this.props.currentCampaignSteps.includes("AdDetails")) {
      //   updated_transaction_data = {
      //     ...updated_transaction_data,
      //     campaign_budget: this.props.data.lifetime_budget_micro
      //   };
      // }
      // if (this.props.currentCampaignSteps.includes("AdPaymentReview")) {
      //   updated_transaction_data = {
      //     ...updated_transaction_data,
      //     campaign_budget_kdamount: this.props.data.kdamount
      //   };
      // }
      this.props.setCampaignInfoForTransaction(updated_transaction_data);
      this.props.setCampaignInProgress(true);
      this.props.overWriteObjectiveData(); //overwrite this.props.data with what ever is in oldTempData
      this.props.set_adType_instagram(this.props.oldTempAdType); //set the adType to the old campaign's adType
      //the app actually freezes for a few seconds when navigateToContinue runs so i delay
      //it's exectution to desiplay a loader because if i don't the loader doesn't show up
      setTimeout(() => {
        this.handleSubmition(false, false);
        this.navigateToContinue();
      }, 200);
    }
  };

  /**
   * Handles if the user closes the modal without choosing to resume or not
   */
  handleClosing = () => {
    this.handleSubmition(false, false);
    if (this.props.handleClosingContinueModal)
      //if being called from AdObjective handleClosingContinueModal will  not be Undefined
      this.props.handleClosingContinueModal();
    //Set the adType to the one the user clicked on from Dashboard or AdType
    this.props.set_adType_instagram(
      this.props.navigation.getParam("tempAdType", "InstagramFeedAd")
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Modal
        style={{ margin: 0 }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.state.isVisible}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.navigation.goBack();
                  //this.handleClosing();
                }}
                segment={{
                  source: "continue_campaign_modal",
                  source_action: "a_go_back",
                }}
                title={"Continue Ad Creation"}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "montserrat-regular",
                    width: 250,
                  },
                ]}
              >
                {translate(
                  "You were in the middle of creating an ad, would you like to continue"
                )}
              </Text>
              {this.props.data && this.props.incompleteCampaign && (
                <ContinueInfo screenProps={this.props.screenProps} />
              )}
              <View style={styles.footerButtons}>
                <CustomButtons
                  screenProps={this.props.screenProps}
                  onPressFunction={() => this.handleContinue()}
                  content="Resume"
                  filled
                />
                <CustomButtons
                  screenProps={this.props.screenProps}
                  onPressFunction={() => this.handleSubmition(false, true)}
                  content="Create a new ad"
                />
              </View>
            </View>
            {this.state.resumeLoading && <Loading dash />}
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  adType: state.instagramAds.adType,
  data: state.instagramAds.data,
  incompleteCampaign: state.instagramAds.incompleteCampaign,
  campaignProgressStarted: state.instagramAds.campaignProgressStarted,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  oldTempAdType: state.instagramAds.oldTempAdType,
  oldTempData: state.instagramAds.oldTempData,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  resetCampaignInfo: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfoInstagram(resetAdType)),
  setCampaignInProgress: (value) =>
    dispatch(actionCreators.setCampaignInProgressInstagram(value)),
  set_adType_instagram: (value) =>
    dispatch(actionCreators.set_adType_instagram(value)),
  save_campaign_info: (value) =>
    dispatch(actionCreators.save_campaign_info_instagram(value)),
  overWriteObjectiveData: (value) =>
    dispatch(actionCreators.overWriteObjectiveDataInstagram(value)),
  setCampaignInfoForTransaction: (data) =>
    dispatch(actionCreators.setCampaignInfoForTransaction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContinueCampaign);
