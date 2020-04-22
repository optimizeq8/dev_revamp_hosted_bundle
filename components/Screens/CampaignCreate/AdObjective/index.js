//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
  I18nManager,
  TouchableOpacity
} from "react-native";
import {
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Button
} from "native-base";
import * as Segment from "expo-analytics-segment";
import { BlurView } from "expo-blur";
import { Modal } from "react-native-paper";
import {
  SafeAreaView,
  NavigationEvents,
  NavigationActions
} from "react-navigation";
import * as Animatable from "react-native-animatable";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";
import LowerButton from "../../../MiniComponents/LowerButton";
import DateFields from "../../../MiniComponents/DatePicker/DateFields";
import Duration from "./Duration";
import CustomHeader from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";

//Icons
import PhoneIcon from "../../../../assets/SVGs/Phone";
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";
//Data
import ObjectiveData from "../../../Data/snapchatObjectives.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import segmentEventTrack from "../../../segmentEventTrack";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import ContinueCampaign from "../../../MiniComponents/ContinueCampaign";
import { persistor } from "../../../../store";
import InputField from "../../../MiniComponents/InputField";
import ModalField from "../../../MiniComponents/ModalField";
import { Adjust, AdjustEvent } from "react-native-adjust";
class AdObjective extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        ad_account_id: "",
        name: "",
        objective: "",
        start_time: "",
        end_time: ""
      },
      collectionAdLinkForm: 0,
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      objectiveLabel: "Select Objective",
      inputN: false,
      objectives: ObjectiveData[this.props.adType],
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
    this.setCampaignInfo();
    if (this.props.adType === "CollectionAd") {
      if (this.props.collectionAdLinkForm !== 0) {
        this._handleCollectionAdLinkForm(this.props.collectionAdLinkForm);
      } else {
        this._handleCollectionAdLinkForm(1);
      }
    } else {
      this._handleCollectionAdLinkForm(0);
    }
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        businessid: this.props.mainBusiness.businessid
      },
      objectiveLabel: "Select Objective"
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCampaignSteps !== this.props.currentCampaignSteps) {
      this.setCampaignInfo();
    }
    if (
      (prevProps.adType !== this.props.adType &&
        this.props.adType === "CollectionAd") ||
      prevProps.currentCampaignSteps !== this.props.currentCampaignSteps
    ) {
      if (
        this.props.adType === "CollectionAd" &&
        // prevProps.collectionAdLinkForm !== this.props.collectionAdLinkForm &&
        this.props.collectionAdLinkForm !== 0
      ) {
        this._handleCollectionAdLinkForm(this.props.collectionAdLinkForm);
      } else if (this.props.adType === "CollectionAd") {
        this._handleCollectionAdLinkForm(1);
      }
    } else if (prevProps.adType !== this.props.adType) {
      this._handleCollectionAdLinkForm(0);
    }
  }

  /**
   * Sets the state to what ever is in this.props.data
   */
  setCampaignInfo = () => {
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
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        businessid: this.props.mainBusiness.businessid,
        name: this.props.data.name ? this.props.data.name : "",
        objective: this.props.data.objective ? this.props.data.objective : "",
        start_time: this.props.data.start_time
          ? this.props.data.start_time
          : "",
        end_time: this.props.data.end_time ? this.props.data.end_time : ""
      };
      this.setState({
        collectionAdLinkForm: this.props.collectionAdLinkForm,
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
          ad_account_id: this.props.mainBusiness.snap_ad_account_id,
          businessid: this.props.mainBusiness.businessid,
          name: "",
          objective: "",
          start_time: "",
          end_time: ""
        },
        collectionAdLinkForm: 0,
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
    segmentEventTrack("Selected Ad Objective", {
      campaign_objective: choice.label
    });
    this.props.save_campaign_info({
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
    segmentEventTrack("Selected Campaign Start Date", {
      campaign_start_date: date
    });
    this.props.save_campaign_info({ start_time: date });
  };
  handleEndDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date
      }
    });
    segmentEventTrack("Selected Campaign End Date", {
      campaign_end_date: date
    });
    this.props.save_campaign_info({
      end_time: date,
      campaignDateChanged: true
    });
  };
  setModalVisible = visible => {
    if (visible) {
      Segment.screen("Instagram Feed Ad Objective Modal");
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
    this.props.save_campaign_info({
      minValueBudget,
      maxValueBudget
    });
  };

  _handleCollectionAdLinkForm = val => {
    this.setState({ collectionAdLinkForm: val });
  };

  _handleSubmission = async () => {
    let { campaignInfo } = this.state;
    let dateErrors = this.dateField.getErrors();
    let objectiveError = validateWrapper("mandatory", campaignInfo.objective);
    let nameError = validateWrapper("mandatory", campaignInfo.name);

    this.setState({
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError,
      objectiveError,
      nameError
    });
    // In case error in any field keep track
    if (
      nameError ||
      objectiveError ||
      dateErrors.start_timeError ||
      dateErrors.end_timeError
    ) {
      segmentEventTrack("Error occured on ad objective screen sumbit button", {
        campaign_error_ad_name: nameError ? nameError : "",
        campaign_error_ad_objective: objectiveError ? objectiveError : "",
        campaign_error_ad_start_date: dateErrors.start_timeError
          ? dateErrors.start_timeError
          : "",
        campaign_error_ad_end_date: dateErrors.end_timeError
          ? dateErrors.end_timeError
          : ""
      });
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
        campaign_objective: this.state.campaignInfo.objective,
        campaign_collection_ad_link_form:
          this.props.adType === "CollectionAd"
            ? this.state.collectionAdLinkForm === 1
              ? "Website"
              : "App DeepLink"
            : null
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
          reset: true
        });
        //Set closedContinueModal back to false so that
        //if the user navigates back and submits again then this process doesn't happen again
        this.setState({
          closedContinueModal: false
        });
        persistor.purge();
      }
      if (this.props.collectionAdLinkForm !== this.state.collectionAdLinkForm) {
        this.props.reset_collections();
        this.props.save_campaign_info({
          destination: "BLANK",
          call_to_action: { label: "BLANK", value: "BLANK" },
          attachment: "BLANK"
        });
      }
      this.props.set_collectionAd_link_form(this.state.collectionAdLinkForm);

      this.props.save_campaign_info({
        campaign_id: this.props.campaign_id,
        ...this.state.campaignInfo
      });
      let info = {
        campaign_type: this.props.adType,
        ...this.state.campaignInfo
      };

      this.props.ad_objective(
        {
          ...info,
          campaign_id:
            this.props.campaign_id !== "" ? this.props.campaign_id : 0
        },
        this.props.navigation,
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
    this.props.save_campaign_info({ name: value });
  };

  /* gets sent a string of stateName +'Error'
   and validateWrapper object from input fields 
  and overwrites what's in the state  to check when submitting*/
  getValidInfo = (stateError, validObj) => {
    if (validObj) {
      segmentEventTrack(`Error in ${stateError}`, {
        campaign_error: validObj
      });
    }
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state
    });
  };

  handleAdOnjectiveFocus = () => {
    Segment.screenWithProperties(
      (this.props.adType === "SnapAd"
        ? "Snap Ad"
        : this.props.adType === "StoryAd"
        ? "Story Ad"
        : "Collection Ad") + " Objective",
      {
        category: "Campaign Creation",
        channel: "snapchat"
      }
    );
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 2,
      business_name: this.props.mainBusiness.businessname,
      checkout_id: this.props.campaign_id
    });

    let adjustAdObjectiveTracker = new AdjustEvent("va71pj");
    Adjust.trackEvent(adjustAdObjectiveTracker);
  };
  render() {
    let adType = this.props.adType;
    const list = ObjectiveData[this.props.adType].map(o => (
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
        <NavigationEvents onDidFocus={this.handleAdOnjectiveFocus} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <BackdropIcon style={styles.backDrop} height={hp("100%")} />
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Ad Objective Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              navigation={this.props.navigation}
              title={[
                adType === "SnapAd"
                  ? "Snap Ad"
                  : adType === "StoryAd"
                  ? "Story Ad"
                  : "Collection Ad",

                "Campaign"
              ]}
            />
            <PhoneIcon
              style={styles.phoneicon}
              width={hp(5) < 30 ? 50 : 70}
              height={hp(5) < 30 ? 50 : 70}
            />
            <View style={styles.block1}></View>
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

              {this.props.adType === "CollectionAd" && (
                <View style={styles.collectionAdView}>
                  <Text uppercase style={styles.collectionAdText}>
                    {translate("Where are you taking the user ?")}
                  </Text>
                  <View style={styles.topContainer}>
                    <TouchableOpacity
                      style={[
                        this.state.collectionAdLinkForm === 1
                          ? styles.activeButton
                          : styles.button,
                        styles.collectionAdLinkForm1
                      ]}
                      onPress={() => {
                        segmentEventTrack("Selected Collection Ad Link Form ", {
                          campaign_collection_ad_link_form: "Website"
                        });
                        this._handleCollectionAdLinkForm(1);
                      }}
                    >
                      <Text
                        uppercase
                        style={[
                          this.state.collectionAdLinkForm === 1
                            ? styles.activeText
                            : styles.inactiveText
                        ]}
                      >
                        {translate("Website")}
                      </Text>
                      <Text
                        style={[
                          this.state.collectionAdLinkForm === 1
                            ? styles.activeText
                            : styles.inactiveText,
                          styles.buttonSubText
                        ]}
                      >
                        {translate("Links to your site")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        this.state.collectionAdLinkForm === 2
                          ? styles.activeButton
                          : styles.button,
                        styles.collectionAdLinkForm2
                      ]}
                      onPress={() => {
                        segmentEventTrack("Selected Collection Ad Link Form ", {
                          campaign_collection_ad_link_form: "App DeepLink"
                        });
                        this._handleCollectionAdLinkForm(2);
                      }}
                    >
                      <Text
                        uppercase
                        style={[
                          this.state.collectionAdLinkForm === 2
                            ? styles.activeText
                            : styles.inactiveText
                        ]}
                      >
                        {translate("App DeepLink")}
                      </Text>
                      <Text
                        style={[
                          this.state.collectionAdLinkForm === 2
                            ? styles.activeText
                            : styles.inactiveText,
                          styles.buttonSubText
                        ]}
                      >
                        {translate("Links to your App")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Text style={styles.minBudget}>
                    Collection Ads only work on iOS
                  </Text> */}
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
          tempAdType={this.props.navigation.getParam("tempAdType", "SnapAd")}
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
  campaignProcessSteps: state.campaignC.campaignProcessSteps,
  mainBusiness: state.account.mainBusiness,
  loading: state.campaignC.loadingObj,
  campaign_id: state.campaignC.campaign_id,
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  campaignProgressStarted: state.campaignC.campaignProgressStarted
});

const mapDispatchToProps = dispatch => ({
  ad_objective: (info, navigation, segmentInfo) =>
    dispatch(actionCreators.ad_objective(info, navigation, segmentInfo)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  getMinimumCash: values => dispatch(actionCreators.getMinimumCash(values)),
  set_collectionAd_link_form: value =>
    dispatch(actionCreators.set_collectionAd_link_form(value)),
  reset_collections: () => dispatch(actionCreators.reset_collections()),
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: value =>
    dispatch(actionCreators.setCampaignInProgress(value)),

  set_adType: value => dispatch(actionCreators.set_adType(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdObjective);
