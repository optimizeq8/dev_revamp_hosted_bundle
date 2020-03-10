//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView
} from "react-native";
import { Content, Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import { BlurView } from "expo-blur";
import { Modal } from "react-native-paper";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import ObjectivesCard from "../../../../MiniComponents/ObjectivesCard";
import LowerButton from "../../../../MiniComponents/LowerButton";
import DateFields from "../../../../MiniComponents/DatePicker/DateFields";
import Duration from "../../../CampaignCreate/AdObjective/Duration"; //needs to be moved????

import CustomHeader from "../../../../MiniComponents/Header";
import ForwardLoading from "../../../../MiniComponents/ForwardLoading";

// Style
import styles from "../../styles/adObjectives.styles";
//Data
import { instagramAdObjectives } from "../../../../Data/snapchatObjectives.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

//Functions
import segmentEventTrack from "../../../../segmentEventTrack";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import ContinueCampaign from "../../../../MiniComponents/ContinueInstagramCampaign";
import { persistor } from "../../../../../store";
import InputField from "../../../../MiniComponents/InputField";
import ModalField from "../../../../MiniComponents/ModalField";

class AdObjective extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        ad_account_id: 123456789012,
        name: "",
        objective: "",
        start_time: "",
        end_time: ""
      },
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      objectiveLabel: "Select Objective",
      inputN: false,
      objectives: instagramAdObjectives["InstagramFeedAd"],
      closedContinueModal: false,
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      end_timeError: "",
      incomplete: false
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    // this.setState({
    //   campaignInfo: {
    //     ...this.state.campaignInfo,
    //     ad_account_id: 123456789012,
    //     businessid: this.props.mainBusiness.businessid
    //   }
    // });
    this.setCampaignInfo();

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCampaignSteps !== this.props.currentCampaignSteps) {
      this.setCampaignInfo();
    }
  }

  /**
   * Sets the state to what ever is in this.props.data
   */
  setCampaignInfo = () => {
    // console.log("data", this.props.data);

    if (
      this.props.data &&
      Object.keys(this.state.campaignInfo)
        .map(key => {
          if (this.props.data.hasOwnProperty(key)) return true;
        })
        .includes(true)
    ) {
      rep = {
        ...this.state.campaignInfo,
        // ad_account_id: this.props.mainBusiness.snap_ad_account_id, //123456789012
        ad_account_id: 123456789012,
        businessid: this.props.mainBusiness.businessid,
        name: this.props.data.name,
        objective: this.props.data.objective ? this.props.data.objective : "",
        start_time: this.props.data.start_time
          ? this.props.data.start_time
          : "",
        end_time: this.props.data.end_time ? this.props.data.end_time : ""
      };
      this.setState({
        minValueBudget: this.props.data.minValueBudget,
        maxValueBudget: this.props.data.maxValueBudget,
        modalVisible: this.props.data.modalVisible,
        objectiveLabel: this.props.data.objectiveLabel
          ? this.props.data.objectiveLabel
          : "Select Objective",
        inputN: this.props.data.inputN,
        nameError: this.props.data.nameError,
        objectiveError: this.props.data.objectiveError,
        start_timeError: this.props.data.start_timeError,
        end_timeError: this.props.data.end_timeError,
        campaignInfo: { ...rep }
      });
    } else {
      this.setState({
        campaignInfo: {
          ad_account_id: 123456789012,
          businessid: this.props.mainBusiness.businessid,
          name: "",
          objective: "",
          start_time: "",
          end_time: ""
        },
        minValueBudget: 0,
        maxValueBudget: 0,
        modalVisible: false,
        objectiveLabel: "Select Objective",
        inputN: false,
        nameError: "",
        objectiveError: "",
        start_timeError: "",
        end_timeError: ""
      });
    }
  };
  setObjective = choice => {
    this.setState({
      ...this.state,
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: choice.value
      },
      objectiveLabel: choice.label
    });
    segmentEventTrack("Selected Instagram Feed Ad Objective", {
      campaign_objective: choice.label
    });
    this.props.save_campaign_info_instagram({
      objective: choice.value,
      objectiveLabel: choice.label,
      reset: true
    });
  };
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  handleStartDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        start_time: date
      }
    });
    segmentEventTrack("Selected Instagram Feed Campaign Start Date", {
      campaign_start_date: date
    });
    this.props.save_campaign_info_instagram({ start_time: date });
  };
  handleEndDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date
      }
    });
    segmentEventTrack("Selected Instagram Feed Campaign End Date", {
      campaign_end_date: date
    });
    this.props.save_campaign_info_instagram({
      end_time: date,
      campaignDateChanged: true
    });
  };
  setModalVisible = visible => {
    if (visible) {
      Segment.screen("Ad Objective Modal");
    }
    this.setState({ modalVisible: visible });
  };

  getMinimumCash = days => {
    let minValueBudget = days !== 0 ? 25 * days : 25;
    let maxValueBudget = days > 1 ? minValueBudget + 1500 : 1500;
    this.setState({
      minValueBudget,
      maxValueBudget
    });
    this.props.save_campaign_info_instagram({
      minValueBudget,
      maxValueBudget
    });
  };

  _;
  _handleSubmission = async () => {
    let { nameError, objectiveError } = this.state;
    let dateErrors = this.dateField.getErrors();

    this.setState({
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError
    });
    // In case error in any field keep track
    if (
      nameError ||
      objectiveError ||
      dateErrors.start_timeError ||
      dateErrors.end_timeError
    ) {
      segmentEventTrack(
        "Error occured on  Instagram Feed ad objective screen sumbit button",
        {
          campaign_error_ad_name: nameError ? nameError : "",
          campaign_error_ad_objective: objectiveError ? objectiveError : "",
          campaign_error_ad_start_date: dateErrors.start_timeError
            ? dateErrors.start_timeError
            : "",
          campaign_error_ad_end_date: dateErrors.end_timeError
            ? dateErrors.end_timeError
            : ""
        }
      );
    }
    if (
      !nameError &&
      !objectiveError &&
      !dateErrors.start_timeError &&
      !dateErrors.end_timeError
    ) {
      const segmentInfo = {
        step: 2,
        business_name: this.props.mainBusiness.businessname,
        campaign_ad_name: this.state.campaignInfo.name,
        campaign_start_date: this.state.campaignInfo.start_time,
        campaign_end_date: this.state.campaignInfo.end_time,
        campaign_objective: this.state.campaignInfo.objective
      };
      //If the user closes the continueModal without choosing to resume or not
      //and creates a new campaign then everything related to campaign creation is reset
      //in the store so the creation process is not affected
      if (this.state.closedContinueModal) {
        this.props.resetCampaignInfo(false);
        this.props.set_adType_instagram(
          //Comes from choosing an adType from either the Dashboard or AdType screens
          this.props.navigation.getParam("tempAdType", "InstagramFeedAd")
        );
        this.props.save_campaign_info_instagram({
          reset: true
        });
        //Set closedContinueModal back to false so that
        //if the user navigates back and submits again then this process doesn't happen again
        this.setState({
          closedContinueModal: false
        });
        persistor.purge();
      }

      this.props.save_campaign_info_instagram({
        campaign_id: this.props.campaign_id,
        ...this.state.campaignInfo
      });
      let info = {
        campaign_type: "InstagramFeedAd",
        ...this.state.campaignInfo
      };

      this.props.ad_objective_instagram(
        {
          ...info,
          campaign_id:
            this.props.campaign_id !== "" ? this.props.campaign_id : 0
        },
        "InstagramFeedAdDesign",
        segmentInfo
      );
    } else {
      this.setState({ incomplete: true });
    }
  };

  handleClosingContinueModal = () => {
    this.setState({ closedContinueModal: true });
  };
  setValue = (stateName, value) => {
    let state = {};
    state[stateName] = value;
    this.setState({ campaignInfo: { ...this.state.campaignInfo, ...state } });
    this.props.save_campaign_info_instagram({ name: value });
  };

  /* gets sent a string of stateName +'Error'
   and validateWrapper object from input fields 
  and overwrites what's in the state  to check when submitting*/
  getValidInfo = (stateError, validObj) => {
    if (validObj) {
      segmentEventTrack(`Error in  Instagram Feed ${stateError}`, {
        campaign_error: validObj
      });
    }
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state
    });
  };

  render() {
    const list = instagramAdObjectives["InstagramFeedAd"].map(o => (
      <ObjectivesCard
        choice={o}
        selected={this.state.campaignInfo.objective}
        setObjective={this.setObjective}
        key={o.value}
        screenProps={this.props.screenProps}
      />
    ));
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            // Segment.screenWithProperties("Instagram Story Ad Objective", {
            //   category: "Campaign Creation",
            //   channel: "instagram"
            // });
            // Segment.trackWithProperties("Viewed Checkout Step", {
            //   step: 2,
            //   business_name: this.props.mainBusiness.businessname
            // });
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            {/* <BackdropIcon style={styles.backDrop} height={hp("100%")} /> */}
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Instagram Feed Ad Objective Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              navigation={this.props.navigation}
              title={"Instagram Feed Campaign"}
            />

            <ScrollView
              contentContainerStyle={styles.mainContent}
              scrollEnabled={true}
              style={styles.scrollViewStyle}
            >
              <InputField
                label={"Ad Name"}
                setValue={this.setValue}
                getValidInfo={this.getValidInfo}
                disabled={this.props.loading}
                disabled={this.props.loading}
                stateName1={"name"}
                value={this.state.campaignInfo.name}
                valueError1={this.state.nameError}
                maxLength={34}
                autoFocus={false}
                incomplete={this.state.incomplete}
                valueText={this.state.objectiveLabel}
                translate={this.props.screenProps.translate}
              />
              <Animatable.View
                onAnimationEnd={() =>
                  this.setState({
                    start_timeError: null,
                    end_timeError: null
                  })
                }
                duration={200}
                easing={"ease"}
                animation={
                  !this.state.start_timeError || !this.state.end_timeError
                    ? ""
                    : "shake"
                }
              >
                <View style={[styles.dateTextLabel]}>
                  <Text uppercase style={[styles.inputLabel]}>
                    {translate("Date")}
                  </Text>
                </View>
                <Duration
                  screenProps={this.props.screenProps}
                  loading={this.props.loading}
                  dismissKeyboard={Keyboard.dismiss}
                  start_time={this.state.campaignInfo.start_time}
                  end_time={this.state.campaignInfo.end_time}
                  start_timeError={this.state.start_timeError}
                  end_timeError={this.state.end_timeError}
                  dateField={this.dateField}
                />
              </Animatable.View>
              <Text style={styles.minBudget}>
                {translate("Minimum of $25/day")}
              </Text>
              <View style={[styles.input2]}>
                <ModalField
                  stateName={"objective"}
                  setModalVisible={this.setModalVisible}
                  modal={true}
                  label={"Objective"}
                  valueError={this.state.objectiveError}
                  getValidInfo={this.getValidInfo}
                  disabled={this.props.loading}
                  valueText={this.state.objectiveLabel}
                  value={this.state.campaignInfo.objective}
                  incomplete={this.state.incomplete}
                  translate={this.props.screenProps.translate}
                />
              </View>

              {this.props.loading ? (
                <ForwardLoading
                  mainViewStyle={{ width: wp(8), height: hp(8) }}
                  bottom={-hp(5)}
                  style={{ width: wp(8), height: hp(8) }}
                />
              ) : (
                <LowerButton
                  style={styles.proceedButtonRTL}
                  bottom={-5}
                  function={this._handleSubmission}
                />
              )}
            </ScrollView>
          </Container>
        </TouchableWithoutFeedback>

        <DateFields
          getMinimumCash={this.getMinimumCash}
          onRef={ref => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.campaignInfo.start_time}
          end_time={this.state.campaignInfo.end_time}
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          closedContinueModal={this.state.closedContinueModal}
          handleClosingContinueModal={this.handleClosingContinueModal}
          incompleteCampaign={this.props.incompleteCampaign}
          campaignProgressStarted={this.props.campaignProgressStarted}
          currentCampaignSteps={this.props.currentCampaignSteps}
        />
        <ContinueCampaign
          tempAdType={this.props.navigation.getParam(
            "tempAdType",
            "InstagramFeedAd"
          )}
          navigation={this.props.navigation}
          dateField={this.dateField}
          screenProps={this.props.screenProps}
          handleClosingContinueModal={this.handleClosingContinueModal}
        />
        <Modal
          animationType={"slide"}
          transparent={true}
          onDismiss={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <BlurView intensity={95} tint="dark">
            <SafeAreaView
              style={styles.safeAreaView}
              forceInset={{ bottom: "never", top: "always" }}
            >
              <View style={styles.popupOverlay}>
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={false}
                  actionButton={() => {
                    this.setModalVisible(false);
                  }}
                  title={"Campaign Objective"}
                />
                <Content
                  padder
                  indicatorStyle="white"
                  contentContainerStyle={styles.contentContainer}
                >
                  {list}
                </Content>
                {/* <LowerButton bottom={4} function={this.setModalVisible} /> */}
              </View>
            </SafeAreaView>
          </BlurView>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  campaignProcessSteps: state.instagramAds.campaignProcessSteps,
  mainBusiness: state.account.mainBusiness,
  loading: state.instagramAds.loadingObj,
  campaign_id: state.instagramAds.campaign_id,
  data: state.instagramAds.data,
  adType: state.instagramAds.adType,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  incompleteCampaign: state.instagramAds.incompleteCampaign,
  campaignProgressStarted: state.instagramAds.campaignProgressStarted
});

const mapDispatchToProps = dispatch => ({
  ad_objective_instagram: (info, navigation_route, segmentInfo) =>
    dispatch(
      actionCreators.ad_objective_instagram(info, navigation_route, segmentInfo)
    ),
  save_campaign_info_instagram: info =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  getMinimumCash: values => dispatch(actionCreators.getMinimumCash(values)),
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: value =>
    dispatch(actionCreators.setCampaignInProgress(value)),

  set_adType_instagram: value =>
    dispatch(actionCreators.set_adType_instagram(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdObjective);
