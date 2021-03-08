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
  InteractionManager,
} from "react-native";
import { Content, Container } from "native-base";
// import { Modal } from "react-native-paper";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import analytics from "@segment/analytics-react-native";
import * as Animatable from "react-native-animatable";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";
import LowerButton from "../../../MiniComponents/LowerButton";
import DateFields from "../../../MiniComponents/DatePickerRedesigned/DateFields";
import Duration from "./Duration";
import CustomHeader from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import { globalColors } from "../../../../GlobalStyles";
//Data
import snapchatObjectivesData from "../../../Data/snapchatObjectives.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ContinueCampaign from "../../../MiniComponents/ContinueCampaign";
import { persistor } from "../../../../store";
import InputField from "../../../MiniComponents/InputFieldNew";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
// import { Adjust, AdjustEvent } from "react-native-adjust";
import ErrorComponent from "../../../MiniComponents/ErrorComponent";
import CampaignDuration from "../../../MiniComponents/CampaignDurationField";
import GradientButton from "../../../MiniComponents/GradientButton";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../../../../GlobalStyles";
import { copilot, CopilotStep, walkthroughable } from "react-native-copilot";
import AsyncStorage from "@react-native-community/async-storage";
import CopilotTooltipFunction, {
  circleSvgPath,
} from "../../../MiniComponents/CopilotTooltip/CopilotTooltipFunction";
import CampaignDurationContainer from "./CampaignDurationContainer";
import { showMessage } from "react-native-flash-message";
import QuestionComponent from "../../../MiniComponents/QuestionComponent";

class AdObjective extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        ad_account_id: "",
        name: `S_${this.props.adType}_${
          parseInt(
            this.props[
              !this.props.adType.toLowerCase().includes("snap")
                ? "snap" + this.props.adType.toLowerCase()
                : this.props.adType.toLowerCase()
            ]
          ) + 1
        }`,
        objective: snapchatObjectivesData[this.props.adType][0].value,
        start_time: "",
        end_time: "",
      },
      collectionAdLinkForm: 0,
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      objectiveLabel: snapchatObjectivesData[this.props.adType][0].label,
      inputN: false,
      objectives: snapchatObjectivesData[this.props.adType],
      closedContinueModal: false,
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      end_timeError: "",
      incomplete: false,
      duration: 7,
      savedObjective: "WEBSITE_TRAFFIC",
      isReady: false,
      objectivesList: snapchatObjectivesData,
    };
  }
  componentWillUnmount() {
    this.props.copilotEvents.off("stop");
    BackHandler.removeEventListener(
      "hardwareBackPressAdObjective",
      this.handleBackButton
    );
  }
  async componentDidMount() {
    await this.setCampaignInfo();
    const businessCountryIsKuwait =
      this.props.mainBusiness.country === "Kuwait";
    // Remove the objective label for non kuwait countries and if adtype is SnapAd
    if (!businessCountryIsKuwait && this.props.adType === "SnapAd") {
      let updatedList = snapchatObjectivesData;
      updatedList["SnapAd"] = snapchatObjectivesData.SnapAd.filter(
        (obj) => obj.value !== "POLITICAL_TRAFFIC"
      );
      this.setState({
        objectivesList: updatedList,
      });
    }
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isReady: true,
      });
    });
    if (this.props.navigation.getParam("adType", false)) {
      this.props.set_adType(this.props.navigation.getParam("adType", "SnapAd"));
    }
    this.setState({
      ...this.state,
      campaignInfo: {
        ...this.state.campaignInfo,
        ad_account_id:
          this.props.mainBusiness && this.props.mainBusiness.snap_ad_account_id,
        businessid:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
        objective:
          this.props.data && this.props.data.savedObjective
            ? this.props.data.savedObjective
            : snapchatObjectivesData[this.props.adType || "SnapAd"][0].value,
      },
      objectiveLabel:
        this.props.data && this.props.data.objectiveLabel
          ? this.props.data.objectiveLabel
          : snapchatObjectivesData[this.props.adType || "SnapAd"][0].label,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.navigation.getParam("adType", false) !==
        this.props.navigation.getParam("adType", false) &&
      this.props.navigation.getParam("adType", false)
    ) {
      this.props.set_adType(this.props.navigation.getParam("adType", "SnapAd"));
    }
    if (prevProps.currentCampaignSteps !== this.props.currentCampaignSteps) {
      this.setCampaignInfo();
      this.handleAdOnjectiveFocus(); //track the change of adType if user creates a new ad instead of resuming
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data === this.props.data || this.state !== nextState;
  }
  /**
   * Sets the state to what ever is in this.props.data
   */
  setCampaignInfo = async () => {
    const campaignName = `S_${this.props.adType}_${
      parseInt(
        this.props[
          !this.props.adType.toLowerCase().includes("snap")
            ? "snap" + this.props.adType.toLowerCase()
            : this.props.adType.toLowerCase()
        ]
      ) + 1
    }`;

    let start_time = new Date();
    start_time.setDate(start_time.getDate() + 1);
    let end_time = new Date(start_time);
    end_time.setDate(end_time.getDate() + this.state.duration - 1);
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
        ad_account_id:
          this.props.mainBusiness && this.props.mainBusiness.snap_ad_account_id,
        businessid:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
        name: this.props.data.name ? this.props.data.name : campaignName,
        objective: this.props.data.savedObjective
          ? this.props.data.savedObjective
          : snapchatObjectivesData[this.props.adType || "SnapAd"][0].value,
        start_time: this.props.data.start_time
          ? this.props.data.start_time
          : start_time.toISOString().split("T")[0],
        end_time: this.props.data.end_time
          ? this.props.data.end_time
          : end_time.toISOString().split("T")[0],
      };
      this.setState(
        {
          collectionAdLinkForm:
            this.props.adType === "CollectionAd"
              ? this.props.collectionAdLinkForm !== 0
                ? this.props.collectionAdLinkForm
                : 1
              : 0,
          minValueBudget: this.props.data.minValueBudget,
          maxValueBudget: this.props.data.maxValueBudget,
          modalVisible: this.props.data.modalVisible,
          objectiveLabel: this.props.data.objectiveLabel
            ? this.props.data.objectiveLabel
            : snapchatObjectivesData[this.props.adType][0].label,
          inputN: this.props.data.inputN,
          nameError: this.props.data.nameError,
          objectiveError: this.props.data.objectiveError,
          start_timeError: this.props.data.start_timeError,
          end_timeError: this.props.data.end_timeError,
          campaignInfo: { ...rep },
          modalVisible: false,
          duration: this.props.data.duration ? this.props.data.duration : 7,
          savedObjective: this.props.data.hasOwnProperty("savedObjective")
            ? this.props.data.savedObjective
            : snapchatObjectivesData[this.props.adType][0].value,

          objectiveLabel: this.props.data.objectiveLabel
            ? this.props.data.objectiveLabel
            : snapchatObjectivesData[this.props.adType || "SnapAd"][0].label,
        },
        () =>
          this.props.save_campaign_info({
            objectiveLabel: this.state.objectiveLabel,
          })
      );
    } else {
      this.setState(
        {
          campaignInfo: {
            ad_account_id:
              this.props.mainBusiness &&
              this.props.mainBusiness.snap_ad_account_id,
            businessid:
              this.props.mainBusiness && this.props.mainBusiness.businessid,
            name: campaignName,
            objective: snapchatObjectivesData[this.props.adType][0].value,
            start_time: start_time.toISOString().split("T")[0],
            end_time: end_time.toISOString().split("T")[0],
          },
          collectionAdLinkForm:
            this.props.adType === "CollectionAd"
              ? this.props.collectionAdLinkForm !== 0
                ? this.props.collectionAdLinkForm
                : 1
              : 0,
          minValueBudget: 0,
          maxValueBudget: 0,
          modalVisible: false,
          objectiveLabel: snapchatObjectivesData[this.props.adType][0].label,
          inputN: false,
          nameError: "",
          objectiveError: "",
          start_timeError: "",
          end_timeError: "",
          duration: 7,
          savedObjective: snapchatObjectivesData[this.props.adType][0].value,
        },
        () =>
          this.props.save_campaign_info({
            objectiveLabel: this.state.objectiveLabel,
          })
      );
    }
  };
  setObjective = (choice) => {
    // When changing objective change the duration to 7 always
    let duration = 7;
    let end_time = new Date(this.state.campaignInfo.start_time.split("T")[0]);
    end_time.setDate(end_time.getDate() + duration - 1);
    this.setState({
      ...this.state,
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: choice.value,
        end_time: end_time.toISOString().split("T")[0],
      },
      savedObjective: choice.value,
      objectiveLabel: choice.label,
      duration,
    });
    analytics.track(`a_select_ad_objective`, {
      source: "ad_objective_modal",
      source_action: "a_select_ad_objective",
      campaign_id: this.props.campaign_id,
      campaign_objective: choice.value,
    });

    this.props.save_campaign_info({
      objective: choice.value,
      objectiveLabel: choice.label,
      savedObjective: choice.value,
      reset: true,
      end_time: end_time.toISOString().split("T")[0],
      duration,
      campaignDateChanged: true,
    });
    // this.handleDuration(false, true);
  };
  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    if (source === "ad_TNC_loading") {
      this.props.navigation.navigate("AdType", {
        source: "ad_objective",
        source_action: "a_go_back",
      });
    } else this.props.navigation.goBack();
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
      source: "ad_objective",
      source_action: "a_ad_start_date",
      campaign_start_date: date,
    });

    this.props.save_campaign_info({ start_time: date });
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
    this.props.save_campaign_info({
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
    this.props.save_campaign_info({
      minValueBudget,
      maxValueBudget,
    });
  };

  _handleCollectionAdLinkForm = (val) => {
    analytics.track(`a_change_collection_ad_link_form`, {
      source: "ad_objective",
      source_action: "a_change_collection_ad_link_form",
      campaign_collectionAdLinkForm: val === 2 ? "Website" : "App DeepLinks",
    });
    this.setState({ ...this.state, collectionAdLinkForm: val });
  };

  _handleSubmission = async () => {
    let { translate } = this.props.screenProps;
    let { campaignInfo } = this.state;
    let dateErrors = this.dateField.getErrors();
    let objectiveError = validateWrapper("mandatory", campaignInfo.objective);
    let nameError = validateWrapper("mandatory", campaignInfo.name);

    this.setState({
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError,
      objectiveError,
      nameError,
    });
    if (
      new Date(this.state.campaignInfo.start_time) < new Date() ||
      new Date(this.state.campaignInfo.end_time) < new Date()
    ) {
      showMessage({
        message: translate("The dates are no longer applicable"),
        description: translate("Please choose new dates"),
        type: "warning",
      });

      this.dateField && this.dateField.showModal();
      return;
    }
    // In case error in any field keep track
    if (
      nameError ||
      objectiveError ||
      dateErrors.start_timeError ||
      dateErrors.end_timeError
    ) {
      analytics.track(`a_error_form`, {
        error_page: "ad_objective",
        campaign_channel: "snapchat",
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
        campaign_channel: "snapchat",
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
        campaign_collectionAdLinkForm:
          this.props.adType === "CollectionAd"
            ? this.state.collectionAdLinkForm === 1
              ? "Website"
              : "App DeepLink"
            : null,
        campaign_season:
          this.state.objectiveLabel === "Mother's Day" ? "Mother's Day" : "",
      };
      //If the user closes the continueModal without choosing to resume or not
      //and creates a new campaign then everything related to campaign creation is reset
      //in the store so the creation process is not affected
      if (this.state.closedContinueModal) {
        this.props.resetCampaignInfo(false);
        this.props.set_adType(
          //Comes from choosing an adType from either the Dashboard or AdType screens
          this.props.navigation.getParam("tempAdType", "SnapAd")
        );
        this.props.save_campaign_info({
          reset: true,
        });
        //Set closedContinueModal back to false so that
        //if the user navigates back and submits again then this process doesn't happen again
        this.setState({
          closedContinueModal: false,
        });
        persistor.purge();
      }
      if (this.props.collectionAdLinkForm !== this.state.collectionAdLinkForm) {
        this.props.reset_collections();
        this.props.save_campaign_info({
          destination: "BLANK",
          call_to_action: { label: "BLANK", value: "BLANK" },
          attachment: "BLANK",
        });
      }
      this.props.set_collectionAd_link_form(this.state.collectionAdLinkForm);

      this.props.save_campaign_info({
        campaign_id: this.props.campaign_id,
        ...this.state.campaignInfo,
        campaign_season:
          this.state.objectiveLabel === "Mother's Day" ? "Mother's Day" : "",
      });
      let objective = this.state.campaignInfo.objective;

      if (objective !== "APP_INSTALLS") {
        objective = this.state.campaignInfo.objective.replace(
          /WEBSITE_|APP_|POLITICAL_/g,
          ""
        );
      }

      let info = {
        campaign_type: this.props.adType,
        ...this.state.campaignInfo,
        objective,
        duration: this.state.duration,
        savedObjective: this.state.savedObjective,
        is_political: 1,
      };
      if (this.state.savedObjective !== "POLITICAL_TRAFFIC") {
        delete info.is_political;
      }
      if (this.state.objectiveLabel === "Mother's Day") {
        info.campaign_season = "Mother's Day";
      }
      this.getMinimumCash();
      this.props.ad_objective(
        {
          ...info,
          campaign_id:
            this.props.campaign_id !== "" ? this.props.campaign_id : 0,
        },
        this.props.navigation,
        segmentInfo,
        this.state.campaignInfo.objective
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
    // value = value.replace(/[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi, "");
    state[stateName] = value;
    analytics.track(`a_ad_name`, {
      source: "ad_objective",
      source_action: "a_ad_name",
      campaign_id: this.props.campaign_id,
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
      campaign_name: value,
    });
    this.setState({ campaignInfo: { ...this.state.campaignInfo, ...state } });
    this.props.save_campaign_info({ name: value });
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
        campaign_channel: "snapchat",
        campaign_ad_type: this.props.adType,
      });
    }

    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };

  handleAdOnjectiveFocus = () => {
    BackHandler.addEventListener(
      "hardwareBackPressAdObjective",
      this.handleBackButton
    );
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
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
    });
    AsyncStorage.getItem("AdObjectiveTutorialOpened").then((value) => {
      if (!value && this.props.campaignList.length === 0) {
        this.props.start();
      }
    });
    this.props.copilotEvents.on("stop", () => {
      AsyncStorage.setItem("AdObjectiveTutorialOpened", "true");
      // Copilot tutorial finished!
    });
    // let adjustAdObjectiveTracker = new AdjustEvent("va71pj");
    // adjustAdObjectiveTracker.addPartnerParameter(
    //   `snap_${
    //     this.props.incomplete
    //       ? his.props.navigation.getParam("tempAdType", "SnapAd")
    //       : this.props.adType
    //   }`,
    //   this.props.incomplete
    //     ? his.props.navigation.getParam("tempAdType", "SnapAd")
    //     : this.props.adType
    // );
    // Adjust.trackEvent(adjustAdObjectiveTracker);
  };

  handleAdOnjectiveBlur = () => {
    BackHandler.removeEventListener(
      "hardwareBackPressAdObjective",
      this.handleBackButton
    );
  };

  handleDuration = (subtract = false, onePress = false, time = 1) => {
    let is_political =
      this.props.data && this.props.data.savedObjective === "POLITICAL_TRAFFIC";
    let minimumDuration = !is_political ? 3 : 1;
    let duration = subtract
      ? this.state.duration - 1 > minimumDuration
        ? this.state.duration - 1
        : minimumDuration
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
    this.props.save_campaign_info({
      end_time: end_time.toISOString(),
      duration,
      campaignDateChanged: true,
    });
    if (!onePress) {
      this.timer = setTimeout(
        () => this.handleDuration(subtract, null, time + 1),
        time > 10 ? 50 : 150 //to increase the speed when pressing for a longer time
      );
    }
  };
  stopTimer = () => {
    if (this.timer) clearTimeout(this.timer);
  };
  render() {
    let adType = this.props.adType;
    let is_political =
      this.props.data && this.props.data.savedObjective === "POLITICAL_TRAFFIC";
    let minimumDuration = !is_political ? 3 : 1;
    const list = this.state.objectivesList[this.props.adType].map((o) => (
      <ObjectivesCard
        choice={o}
        // selected={this.state.campaignInfo.objective}
        selected={this.state.objectiveLabel}
        setObjective={this.setObjective}
        key={o.label}
        screenProps={this.props.screenProps}
      />
    ));
    const { translate } = this.props.screenProps;
    if (!this.props.userInfo) {
      return (
        <>
          <NavigationEvents
            onDidFocus={this.handleAdOnjectiveFocus}
            onDidBlur={this.handleAdOnjectiveBlur}
          />
          <ErrorComponent
            screenProps={this.props.screenProps}
            loading={this.props.loading}
            navigation={this.props.navigation}
          />
        </>
      );
    }
    // else if (!this.state.isReady) {
    //   return <ActivityIndicator size="large" color={"#fff"} />;
    // }
    else
      return (
        <View style={{ height: "100%", backgroundColor: "#0000" }}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={globalStyles.gradient}
          />
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          />
          <NavigationEvents
            onDidFocus={this.handleAdOnjectiveFocus}
            onDidBlur={this.handleAdOnjectiveBlur}
          />
          <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              source: "ad_objective",
              source_action: "a_go_back",
              str: "Ad Objective Back Button",
              obj: {
                businessname:
                  this.props.mainBusiness &&
                  this.props.mainBusiness.businessname,
              },
            }}
            icon="snapchat"
            actionButton={this.handleBackButton}
            adType={adType}
            currentScreen="Details"
            title={
              adType === "SnapAd"
                ? "Snap Ad"
                : adType === "StoryAd"
                ? "Explore Ad"
                : "Collection Ad"
            }
          />

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Container style={styles.container}>
              <ScrollView
                contentContainerStyle={styles.mainContent}
                scrollEnabled={true}
                style={styles.scrollViewStyle}
              >
                <CopilotStep
                  text="Enter your campaign's name Make sure you name it something descriptive so you can keep track of all your campaigns"
                  order={1}
                  name="Ad Name"
                >
                  <InputField
                    label={"Ad Name"}
                    setValue={this.setValue}
                    getValidInfo={this.getValidInfo}
                    disabled={this.props.loading}
                    stateName1={"name"}
                    value={this.state.campaignInfo.name}
                    placeholder1={"Enter Your campaign’s name"}
                    valueError1={this.state.nameError}
                    maxLength={34}
                    autoFocus={false}
                    incomplete={this.state.incomplete}
                    valueText={this.state.campaignInfo.name}
                    translate={this.props.screenProps.translate}
                  />
                </CopilotStep>
                <CopilotStep
                  text="Select your campaign's objective to choose what your audience should do eg download your app or visit your website etc"
                  order={2}
                  name="Campaign Objective"
                >
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
                </CopilotStep>

                <CopilotStep
                  text="Select your campaign's duration and start date The longer the campaign’s duration is, the better the results"
                  order={3}
                  name="Campaign Duration"
                >
                  <CampaignDurationContainer
                    screenProps={this.props.screenProps}
                    stopTimer={this.stopTimer}
                    handleDuration={this.handleDuration}
                    duration={this.state.duration}
                    start_timeError={this.state.start_timeError}
                    end_timeError={this.state.end_timeError}
                    loading={this.props.loading}
                    campaignInfo={this.state.campaignInfo}
                    dateField={this.dateField}
                  />
                </CopilotStep>
                {this.props.adType === "CollectionAd" && (
                  <View style={styles.collectionAdView}>
                    <Text style={styles.collectionAdText}>
                      {translate("Where are you taking the user ?")}
                    </Text>
                    <View style={styles.topContainer}>
                      <GradientButton
                        transparent={this.state.collectionAdLinkForm === 2}
                        style={[
                          this.state.collectionAdLinkForm === 1
                            ? styles.activeButton
                            : styles.button,
                          styles.collectionAdLinkForm1,
                        ]}
                        onPressAction={() => {
                          this._handleCollectionAdLinkForm(1);
                        }}
                      >
                        <Text
                          style={[
                            this.state.collectionAdLinkForm === 1
                              ? styles.activeText
                              : styles.inactiveText,
                          ]}
                        >
                          {translate("Website")}
                        </Text>
                        <Text
                          style={[
                            this.state.collectionAdLinkForm === 1
                              ? styles.activeText
                              : styles.inactiveText,
                            styles.buttonSubText,
                          ]}
                        >
                          {translate("Links to your site")}
                        </Text>
                      </GradientButton>
                      <GradientButton
                        transparent={this.state.collectionAdLinkForm === 1}
                        style={[
                          this.state.collectionAdLinkForm === 2
                            ? styles.activeButton
                            : styles.button,
                          styles.collectionAdLinkForm2,
                        ]}
                        onPressAction={() => {
                          this._handleCollectionAdLinkForm(2);
                        }}
                      >
                        <Text
                          style={[
                            this.state.collectionAdLinkForm === 2
                              ? styles.activeText
                              : styles.inactiveText,
                          ]}
                        >
                          {translate("App DeepLink")}
                        </Text>
                        <Text
                          style={[
                            this.state.collectionAdLinkForm === 2
                              ? styles.activeText
                              : styles.inactiveText,
                            styles.buttonSubText,
                          ]}
                        >
                          {translate("Links to your App")}
                        </Text>
                      </GradientButton>
                    </View>
                  </View>
                )}

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
              <QuestionComponent
                style={styles.questionIconContainer}
                onPressFunction={() => this.props.start()}
              />
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
            tempAdType={this.props.navigation.getParam("tempAdType", "SnapAd")}
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
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
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
                containerStyle={styles.customHeaderContainer}
                titleContainerStyle={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              />
              <View style={styles.popupOverlay}>
                <Content contentContainerStyle={styles.contentContainer}>
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
  campaignProcessSteps: state.campaignC.campaignProcessSteps,
  mainBusiness: state.account.mainBusiness,
  loading: state.campaignC.loadingObj,
  campaign_id: state.campaignC.campaign_id,
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  campaignProgressStarted: state.campaignC.campaignProgressStarted,
  campaignList: state.dashboard.campaignList,
  snapad: state.dashboard.snapad,
  snapcollectionad: state.dashboard.snapcollectionad,
  snapstoryad: state.dashboard.snapstoryad,
});

const mapDispatchToProps = (dispatch) => ({
  ad_objective: (info, navigation, segmentInfo, objective) =>
    dispatch(
      actionCreators.ad_objective(info, navigation, segmentInfo, objective)
    ),
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  getMinimumCash: (values) => dispatch(actionCreators.getMinimumCash(values)),
  set_collectionAd_link_form: (value) =>
    dispatch(actionCreators.set_collectionAd_link_form(value)),
  reset_collections: () => dispatch(actionCreators.reset_collections()),
  resetCampaignInfo: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: (value) =>
    dispatch(actionCreators.setCampaignInProgress(value)),

  set_adType: (value) => dispatch(actionCreators.set_adType(value)),
});
export default copilot({
  overlay: "svg", // or 'view'
  animated: true,
  tooltipComponent: CopilotTooltipFunction,
  svgMaskPath: circleSvgPath,
  stepNumberComponent: () => <View />,
  arrowColor: globalColors.twilight,
  tooltipStyle: {
    backgroundColor: globalColors.white,
    borderRadius: 30,
    padding: 8,
  },
})(connect(mapStateToProps, mapDispatchToProps)(AdObjective));
