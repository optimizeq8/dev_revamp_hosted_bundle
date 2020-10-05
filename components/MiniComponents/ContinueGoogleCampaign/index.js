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
import { persistor } from "../../../store";
import styles from "./styles";
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
    this.state = {
      isVisible: false,
      resumeLoading: false,
    };
  }
  componentDidMount() {
    //this is to disable showing the modal everytime if a campaign creation is in progress
    if (
      this.props.data.incompleteCampaign &&
      !this.props.data.campaignResumed
    ) {
      analytics.track("continue_campaign_modal", {
        source: "ad_objective",
        // source_action: ""
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
        timestamp: new Date().getTime(),
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
    let continueRoutes = this.props.data.campaignSteps.map((route) =>
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
  handleSubmition = async (isVisible, resetCampaign) => {
    this.setState({ isVisible });
    if (resetCampaign) {
      //if resetCampaign is true, then resetCampaignInfo is called
      await this.props.rest_google_campaign_data();
      await this.props.setCampaignInfo();
      persistor.purge();
    }
  };
  /**
   * Handles showing the continue modal after 0.8 seconds
   */
  continueCampaign = () => {
    if (this.props.data.incompleteCampaign) {
      setTimeout(() => {
        this.setState({ isVisible: true });
      }, 800);
    }
  };

  /**
   * Handles if users chooses to continue a campaign
   */
  handleContinue = () => {
    const { translate } = this.props.screenProps;
    let updated_transaction_data = {
      channel: "google",
    };
    if (this.props.data.campaignSteps.includes("GoogleAdInfo")) {
      updated_transaction_data = {
        ...updated_transaction_data,
        campaign_id: this.props.data.id,
      };
    }
    if (this.props.data.campaignSteps.includes("GoogleAdTargetting")) {
      updated_transaction_data = {
        ...updated_transaction_data,
        campaign_budget: this.props.data.budget,
      };
    }
    if (this.props.data.campaignSteps.includes("GoogleAdPaymentReview")) {
      updated_transaction_data = {
        ...updated_transaction_data,
        campaign_budget_kdamount: this.props.data.kdamount,
      };
    }
    this.props.setCampaignInfoForTransaction(updated_transaction_data);

    /**
     * checks if the old campaign dates are still applicable or not so
     * it doesn't create a campaign with old dates
     */
    if (
      new Date(this.props.data.start_time) < new Date() ||
      new Date(this.props.data.end_time) < new Date()
    ) {
      showMessage({
        message: translate("The dates are no longer applicable"),
        description: translate("Please choose new dates"),
        type: "warning",
      });
      //Shows the dateField's modal to set new dates and resumes campaign
      this.props.dateField.showModal(true);
      this.handleSubmition(false, false);
    } else {
      this.setState({ resumeLoading: true });
      this.props.set_google_campaign_resumed(true);
      /**
       * the app actually freezes for a few seconds when navigateToContinue runs so i delay
       * it's exectution to desiplay a loader because if i don't the loader doesn't show up
       */

      setTimeout(() => {
        // this.handleSubmition(false, false);
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
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Modal
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.state.isVisible}
        hasBackdrop={true}
        backdropOpacity={1}
        customBackdrop={
          <BlurView
            tint={"dark"}
            intensity={150}
            style={styles.customBackdrop}
          />
        }
      >
        <SafeAreaView forceInset={{ bottom: "never", top: "always" }}>
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            navigation={this.props.navigation}
            title={"Continue Ad Creation"}
            segment={{
              source: "continue_campaign_modal",
              source_action: "a_go_back",
            }}
          />
          <Text style={[styles.text, styles.warningText]}>
            {translate(
              "You were in the middle of creating an ad, would you like to continue"
            )}
          </Text>
          {this.props.data.incompleteCampaign && (
            <ContinueInfo screenProps={this.props.screenProps} />
          )}
          <View style={styles.footerButtons}>
            <CustomButtons
              buttonStyle={styles.customButton}
              screenProps={this.props.screenProps}
              onPressFunction={() => this.handleContinue()}
              content="Resume"
              filled
            />
            <CustomButtons
              buttonStyle={styles.customButton}
              screenProps={this.props.screenProps}
              onPressFunction={() => this.handleSubmition(false, true)}
              content="Create a new ad"
            />
          </View>

          {this.state.resumeLoading && <Loading top={40} />}
        </SafeAreaView>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.googleAds,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  rest_google_campaign_data: () =>
    dispatch(actionCreators.rest_google_campaign_data()),
  set_google_campaign_resumed: (value) =>
    dispatch(actionCreators.set_google_campaign_resumed(value)),
  save_google_campaign_data: (info) =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  setCampaignInfoForTransaction: (data) =>
    dispatch(actionCreators.setCampaignInfoForTransaction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContinueCampaign);
