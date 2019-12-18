import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import { connect } from "react-redux";
import { Text } from "native-base";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import * as actionCreators from "../../../store/actions";
import {
  SafeAreaView,
  NavigationActions,
  StackActions
} from "react-navigation";
import CustomHeader from "../Header";
import { persistor } from "../../../store";
import styles from "./styles";
import CustomButtons from "../CustomButtons";
import ContinueInfo from "./ContinueInfo";
import { showMessage } from "react-native-flash-message";

/**
 * The modal that shows up when there's a campaign to resume
 */
class ContinueCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }
  componentDidMount() {
    //this is to disable showing the modal everytime if a campaign creation is in progress
    if (this.props.data.incompleteCampaign && !this.props.data.campaignResumed)
      this.continueCampaign();
  }

  /**
   * Resets the navigation stack and inserts the campaign steps/screens that the user
   * already went over
   */
  navigateToContinue = () => {
    //Array of navigation routes to set in the stack
    let continueRoutes = this.props.data.campaignSteps.map(route =>
      NavigationActions.navigate({
        routeName: route
      })
    );
    //resets the navigation stack
    resetAction = StackActions.reset({
      index: continueRoutes.length - 1, //index of the last screen route
      actions: continueRoutes
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
    if (resetCampaign) {
      //if resetCampaign is true, then resetCampaignInfo is called with false to return this.props.data back to null
      this.props.rest_google_campaign_data(!resetCampaign);
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

    //checks if the old campaign dates are still applicable or not so
    //it doesn't create a campaign with old dates
    if (
      new Date(this.props.data.start_time) < new Date() ||
      new Date(this.props.data.end_time) < new Date()
    ) {
      showMessage({
        message: translate("The dates are no longer applicable"),
        description: translate("Please choose new dates"),
        type: "warning"
      });
      //Shows the dateField's modal to set new dates and resumes campaign
      this.props.dateField.showModal();
    } else {
      let updated_transaction_data = {
        channel: "google"
      };
      if (this.props.data.campaignSteps.includes("GoogleAdInfo")) {
        updated_transaction_data = {
          ...updated_transaction_data,
          campaign_id: this.props.data.campaign_id
        };
      }
      if (this.props.data.campaignSteps.includes("GoogleAdTargetting")) {
        updated_transaction_data = {
          ...updated_transaction_data,
          campaign_budget: this.props.data.budget
        };
      }
      if (this.props.data.campaignSteps.includes("GoogleAdPaymentReview")) {
        updated_transaction_data = {
          ...updated_transaction_data,
          campaign_budget_kdamount: this.props.data.kdamount
        };
      }
      this.props.setCampaignInfoForTransaction(updated_transaction_data);
      this.navigateToContinue();
      this.props.set_google_campaign_resumed(true);
    }
    this.handleSubmition(false, false);
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
                navigation={this.props.navigation}
                title={"Continue Ad Creation"}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "montserrat-light",
                    width: 300,
                    fontSize: 16,
                    paddingBottom: 25
                  }
                ]}
              >
                {translate(
                  "You were in the middle of creating an ad, would you like to continue"
                )}
              </Text>
              {this.props.data.incompleteCampaign && (
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
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  data: state.googleAds,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  rest_google_campaign_data: reset =>
    dispatch(actionCreators.rest_google_campaign_data(reset)),
  set_google_campaign_resumed: value =>
    dispatch(actionCreators.set_google_campaign_resumed(value)),
  save_google_campaign_data: info =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  setCampaignInfoForTransaction: data =>
    dispatch(actionCreators.setCampaignInfoForTransaction(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(ContinueCampaign);
