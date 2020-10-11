//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
  StatusBar,
  Modal,
  Text,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { Content, Container } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import ObjectivesCard from "../../../../MiniComponents/ObjectivesCard";
import LowerButton from "../../../../MiniComponents/LowerButton";
import DateFields from "../../../../MiniComponents/DatePickerRedesigned/DateFields";
import Duration from "../../../CampaignCreate/AdObjective/Duration"; //needs to be moved????
import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";
import CustomHeader from "../../../../MiniComponents/Header";
import ForwardLoading from "../../../../MiniComponents/ForwardLoading";

// image
import PenBox from "../../../../../assets/SVGs/PenBox.svg";
import UserProfile from "../../../../../assets/SVGs/UserProfileRoundOutline.svg";

import CampaignDuration from "../../../../MiniComponents/CampaignDurationField";

// Style
import styles from "../../styles/adObjectives.styles";
//Data
import { instagramAdObjectives } from "../../../../Data/instagramObjectives.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

//Functions
import cloneDeep from "lodash/cloneDeep";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ContinueCampaign from "../../../../MiniComponents/ContinueInstagramCampaign";
import { persistor } from "../../../../../store";
import InputField from "../../../../MiniComponents/InputFieldNew";
import ModalField from "../../../../MiniComponents/InputFieldNew/ModalField";
import GradientButton from "../../../../MiniComponents/GradientButton";

class AdObjective extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        ad_account_id: "",
        name: "",
        objective: instagramAdObjectives["InstagramFeedAd"][0].value,
        start_time: "",
        end_time: "",
        existingPost: 0,
      },
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      objectiveLabel: instagramAdObjectives["InstagramFeedAd"][0].label,
      inputN: false,
      objectives: instagramAdObjectives["InstagramFeedAd"],
      closedContinueModal: false,
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      end_timeError: "",
      incomplete: false,
      duration: 7,
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
    this.props.set_adType_instagram("InstagramFeedAd");
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
    let start_time = new Date();
    start_time.setDate(new Date().getDate() + 1);
    let end_time = new Date(start_time);
    end_time.setDate(start_time.getDate() + this.state.duration - 1);

    if (
      this.props.data &&
      Object.keys(this.state.campaignInfo)
        .map((key) => {
          if (this.props.data.hasOwnProperty(key)) return true;
        })
        .includes(true)
    ) {
      let rep = {
        ...this.state.campaignInfo,
        ad_account_id: this.props.mainBusiness.fb_ad_account_id,
        businessid: this.props.mainBusiness.businessid,
        name: this.props.data.name,
        objective: this.props.data.objective
          ? this.props.data.objective
          : instagramAdObjectives["InstagramFeedAd"][0].value,
        start_time: this.props.data.start_time
          ? this.props.data.start_time
          : start_time.toISOString().split("T")[0],
        end_time: this.props.data.end_time
          ? this.props.data.end_time
          : end_time.toISOString().split("T")[0],
        existingPost: this.props.data.existingPost,
      };
      this.setState({
        minValueBudget: this.props.data.minValueBudget,
        maxValueBudget: this.props.data.maxValueBudget,
        modalVisible: this.props.data.modalVisible,
        objectiveLabel: this.props.data.objectiveLabel
          ? this.props.data.objectiveLabel
          : instagramAdObjectives["InstagramFeedAd"][0].label,
        inputN: this.props.data.inputN,
        nameError: this.props.data.nameError,
        objectiveError: this.props.data.objectiveError,
        start_timeError: this.props.data.start_timeError,
        end_timeError: this.props.data.end_timeError,
        campaignInfo: { ...rep },
        modalVisible: false,
      });
    } else {
      this.setState({
        campaignInfo: {
          ad_account_id: this.props.mainBusiness.fb_ad_account_id,
          businessid: this.props.mainBusiness.businessid,
          name: "",
          objective: instagramAdObjectives["InstagramFeedAd"][0].value,
          start_time: start_time.toISOString().split("T")[0],
          end_time: end_time.toISOString().split("T")[0],
          existingPost: 0,
        },
        minValueBudget: 0,
        maxValueBudget: 0,
        duration: 7,
        modalVisible: false,
        objectiveLabel: instagramAdObjectives["InstagramFeedAd"][0].label,
        inputN: false,
        nameError: "",
        objectiveError: "",
        start_timeError: "",
        end_timeError: "",
      });
    }
    this.props.save_campaign_info_instagram({
      objectiveLabel: this.state.objectiveLabel,
    });
  };
  setObjective = (choice) => {
    this.setState({
      ...this.state,
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: choice.value,
      },
      objectiveLabel: choice.label,
    });
    analytics.track(`a_select_ad_objective`, {
      source: "ad_objective_modal",
      source_action: "a_select_ad_objective",
      campaign_id: this.props.campaign_id,
      campaign_objective: choice.value,
    });
    this.props.save_campaign_info_instagram({
      objective: choice.value,
      objectiveLabel: choice.label,
      existingPost: this.state.campaignInfo.existingPost,
      reset: true,
    });
  };
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  handleStartDatePicked = (date) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        start_time: date,
      },
    });
    analytics.track(`a_ad_start_date`, {
      campaign_start_date: date,
      source: "ad_objective",
      source_action: "a_ad_start_date",
    });
    this.props.save_campaign_info_instagram({ start_time: date });
  };
  handleEndDatePicked = (date) => {
    let end_time = new Date(date);
    end_time.setDate(end_time.getDate() + this.state.duration - 1);
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: end_time.toISOString().split("T")[0],
      },
    });
    analytics.track(`a_ad_end_date`, {
      campaign_end_date: date,
      source: "ad_objective",
      source_action: "a_ad_end_date",
    });
    this.props.save_campaign_info_instagram({
      end_time: date,
      campaignDateChanged: true,
    });
    this._handleSubmission();
  };
  setModalVisible = (visible) => {
    analytics.track(`ad_objective_modal`, {
      source: "ad_objective",
      source_action: "a_toggle_modal",
      modal_visible: visible,
    });
    this.setState({ modalVisible: visible });
  };

  getMinimumCash = () => {
    let minValueBudget = 25 * this.state.duration;
    let maxValueBudget = minValueBudget + 1500;
    this.setState({
      minValueBudget,
      maxValueBudget,
    });
    this.props.save_campaign_info_instagram({
      minValueBudget,
      maxValueBudget,
    });
  };

  _handleSubmission = async () => {
    let { nameError, objectiveError } = this.state;
    let dateErrors = this.dateField.getErrors();

    this.setState({
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError,
    });
    // In case error in any field keep track
    if (
      nameError ||
      objectiveError ||
      dateErrors.start_timeError ||
      dateErrors.end_timeError
    ) {
      analytics.track(`a_error_form`, {
        error_page: "ad_objective",
        campaign_channel: "instagram",
        campaign_ad_type: this.props.adType,
        source_action: "a_submit_ad_objective",
        error_description:
          nameError ||
          objectiveError ||
          dateErrors.start_timeError ||
          dateErrors.end_timeError,
      });
    }
    if (
      !nameError &&
      !objectiveError &&
      !dateErrors.start_timeError &&
      !dateErrors.end_timeError
    ) {
      const segmentInfo = {
        campaign_channel: "instagram",
        campaign_ad_type: this.props.adType,
        campaign_duration:
          Math.ceil(
            (new Date(this.state.campaignInfo.end_time) -
              new Date(this.state.campaignInfo.start_time)) /
              (1000 * 60 * 60 * 24)
          ) + 1,
        campaign_ad_type: this.props.adType,
        campaign_name: this.state.campaignInfo.name,
        campaign_start_date: this.state.campaignInfo.start_time,
        campaign_end_date: this.state.campaignInfo.end_time,
        campaign_objective: this.state.campaignInfo.objective,
        campaign_existing_post: this.state.campaignInfo.existingPost,
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
          reset: true,
        });
        //Set closedContinueModal back to false so that
        //if the user navigates back and submits again then this process doesn't happen again
        this.setState({
          closedContinueModal: false,
        });
        persistor.purge();
      }

      this.props.save_campaign_info_instagram({
        campaign_id: this.props.campaign_id,
        ...this.state.campaignInfo,
      });
      let info = {
        campaign_type: "InstagramFeedAd",
        ...this.state.campaignInfo,
        duration: this.state.duration,
      };
      this.getMinimumCash();
      this.props.ad_objective_instagram(
        {
          ...info,
          campaign_id:
            this.props.campaign_id !== "" ? this.props.campaign_id : 0,
        },
        this.state.campaignInfo.existingPost === 0
          ? "InstagramAdDesignExistingPost"
          : "InstagramFeedAdDesign",
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
    analytics.track(`a_ad_name`, {
      source: "ad_objective",
      source_action: "a_ad_name",
      campaign_id: this.props.campaign_id,
      campaign_channel: "instagram",
      campaign_ad_type: this.props.adType,
      campaign_name: value,
    });
    this.setState({ campaignInfo: { ...this.state.campaignInfo, ...state } });
    this.props.save_campaign_info_instagram({ name: value });
  };

  /* gets sent a string of stateName +'Error'
   and validateWrapper object from input fields 
  and overwrites what's in the state  to check when submitting*/
  getValidInfo = (stateError, validObj) => {
    if (validObj) {
      analytics.track(`a_error_form`, {
        error_page: "ad_objective",
        error_description: `Error in ${stateError}: ${validObj}`,
        source: "ad_objective",
        source_action: "a_ad_name",
        campaign_channel: "instagram",
        campaign_ad_type: this.props.adType,
      });
    }
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`ad_objective`, {
      source,
      source_action,
      campaign_channel: "instagram",
      campaign_ad_type: this.props.adType,
    });
  };
  selectPostType = (postType) => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.existingPost = postType;
    this.setState({
      campaignInfo: replace,
    });
    analytics.track("a_change_post_type", {
      source: "ad_objective",
      source_action: "a_change_objective",
      campaign_channel: "instagram",
      campaign_existing_post: postType === 0,
    });
    this.props.save_campaign_info_instagram({
      existingPost: postType,
    });
  };
  handleDuration = (subtract = false, onePress = false) => {
    let duration = subtract
      ? this.state.duration - 1 > 3
        ? this.state.duration - 1
        : 3
      : this.state.duration + 1;

    let end_time = new Date(this.state.campaignInfo.start_time.split("T")[0]);
    end_time.setDate(end_time.getDate() + duration - 1);
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: end_time.toISOString().split("T")[0],
      },
      duration,
    });
    this.props.save_campaign_info_instagram({
      end_time: end_time.toISOString().split("T")[0],
      duration,
      campaignDateChanged: true,
    });
    if (!onePress)
      this.timer = setTimeout(() => this.handleDuration(subtract), 150);
  };
  stopTimer = () => {
    clearTimeout(this.timer);
  };
  render() {
    const list = instagramAdObjectives["InstagramFeedAd"].map((o) => (
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
      <View style={styles.safeAreaView}>
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            {/* <BackdropIcon style={styles.backDrop} height={hp("100%")} /> */}
            <TopStepsHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Instagram Feed Ad Objective Back Button",
                obj: { businessname: this.props.mainBusiness.businessname },
                source: "ad_objective",
                source_action: "a_go_back",
              }}
              icon="instagram"
              actionButton={this.handleBackButton}
              currentScreen="Details"
              title={"Instagram Feed"}
            />

            <ScrollView
              contentContainerStyle={styles.mainContent}
              scrollEnabled={true}
              style={styles.scrollViewStyle}
            >
              <View style={styles.radioButtonView}>
                <GradientButton
                  style={styles.gradientBtn}
                  screenProps={this.props.screenProps}
                  transparent={this.state.campaignInfo.existingPost !== 0}
                  onPressAction={() => this.selectPostType(0)}
                >
                  <View style={styles.buttonView}>
                    <UserProfile />
                    <Text style={styles.btnHeadingText}>
                      {translate("Existing Post")}
                    </Text>
                    <Text style={styles.btnDescText}>
                      {translate(
                        "Promote an existing Post from your Instagram account"
                      )}
                    </Text>
                  </View>
                </GradientButton>
                <GradientButton
                  style={styles.gradientBtn}
                  screenProps={this.props.screenProps}
                  transparent={this.state.campaignInfo.existingPost !== 1}
                  onPressAction={() => this.selectPostType(1)}
                >
                  <View style={styles.buttonView}>
                    <PenBox />
                    <Text style={styles.btnHeadingText}>
                      {translate("New Post")}
                    </Text>
                    <Text style={styles.btnDescText}>
                      {translate("Create a new ad using our photo editor")}
                    </Text>
                  </View>
                </GradientButton>
              </View>
              <InputField
                label={"Ad Name"}
                setValue={this.setValue}
                getValidInfo={this.getValidInfo}
                disabled={this.props.loading}
                stateName1={"name"}
                value={this.state.campaignInfo.name}
                valueError1={this.state.nameError}
                maxLength={34}
                autoFocus={false}
                incomplete={this.state.incomplete}
                valueText={this.state.campaignInfo.name}
                translate={this.props.screenProps.translate}
              />
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

              <Animatable.View
                onAnimationEnd={() =>
                  this.setState({
                    start_timeError: null,
                    end_timeError: null,
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
                <CampaignDuration
                  stopTimer={this.stopTimer}
                  handleDuration={this.handleDuration}
                  duration={this.state.duration}
                  screenProps={this.props.screenProps}
                  disabled={this.state.duration === 3}
                />
                {this.state.duration === 3 && (
                  <Text style={styles.minDurationText}>
                    {translate("Minimum Duration is {{n}} days", { n: 3 })}
                  </Text>
                )}
                <Duration
                  label={"Start Date"}
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

              {this.props.loading ? (
                <ForwardLoading
                  mainViewStyle={{ width: wp(8), height: hp(8) }}
                  bottom={-hp(5)}
                  style={{ width: wp(8), height: hp(8) }}
                />
              ) : (
                <LowerButton
                  screenProps={this.props.screenProps}
                  style={styles.proceedButtonRTL}
                  bottom={-5}
                  function={this._handleSubmission}
                />
              )}
            </ScrollView>
          </Container>
        </TouchableWithoutFeedback>

        <DateFields
          // getMinimumCash={this.getMinimumCash}
          onRef={(ref) => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.campaignInfo.start_time}
          end_time={this.state.campaignInfo.start_time}
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
          setCampaignInfo={this.setCampaignInfo}
        />
        <Modal
          animationType={"slide"}
          transparent={true}
          onDismiss={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <View style={styles.objectiveModal}>
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={false}
                actionButton={() => {
                  this.setModalVisible(false);
                }}
                title={"Select an objective"}
                segment={{
                  source: "ad_objective_modal",
                  source_action: "a_go_back",
                }}
                titleStyle={{ color: "#000" }}
                iconColor="#000"
              />
              <Content
                padder
                indicatorStyle="white"
                contentContainerStyle={styles.contentContainer}
              >
                {list}
              </Content>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  // campaignProcessSteps: state.instagramAds.campaignProcessSteps,
  mainBusiness: state.account.mainBusiness,
  loading: state.instagramAds.loadingObj,
  campaign_id: state.instagramAds.campaign_id,
  data: state.instagramAds.data,
  adType: state.instagramAds.adType,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  incompleteCampaign: state.instagramAds.incompleteCampaign,
  campaignProgressStarted: state.instagramAds.campaignProgressStarted,
});

const mapDispatchToProps = (dispatch) => ({
  ad_objective_instagram: (info, navigation_route, segmentInfo) =>
    dispatch(
      actionCreators.ad_objective_instagram(info, navigation_route, segmentInfo)
    ),
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  resetCampaignInfo: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: (value) =>
    dispatch(actionCreators.setCampaignInProgress(value)),

  set_adType_instagram: (value) =>
    dispatch(actionCreators.set_adType_instagram(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdObjective);
