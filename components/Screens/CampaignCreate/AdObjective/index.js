//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView
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
import DateField from "../../../MiniComponents/DatePicker/DateFields";
import Duration from "./Duration";
import CustomHeader from "../../../MiniComponents/Header";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";

//Icons
import PhoneIcon from "../../../../assets/SVGs/Phone.svg";
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";
import LoopStoryIcon from "../../../../assets/SVGs/Objectives/LoopStory";
import AutoAdvanceIcon from "../../../../assets/SVGs/Objectives/AutoAdvance";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";
//Data
import ObjectiveData from "../../../Data/snapchatObjectives.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import ContinueCampaign from "../../../MiniComponents/ContinueCampaign";

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
      // playback_type: "LOOPING",
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      objectiveLabel: "Select Objective",
      inputN: false,
      objectives: ObjectiveData[this.props.adType],
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      end_timeError: ""
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
      }
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCampaignSteps !== this.props.currentCampaignSteps) {
      this.setCampaignInfo();
    }
    if (
      prevProps.adType !== this.props.adType &&
      this.props.adType === "CollectionAd"
    ) {
      if (
        prevProps.collectionAdLinkForm !== this.props.collectionAdLinkForm &&
        this.props.collectionAdLinkForm !== 0
      ) {
        this._handleCollectionAdLinkForm(this.props.collectionAdLinkForm);
      } else {
        this._handleCollectionAdLinkForm(1);
      }
    } else if (prevProps.adType !== this.props.adType) {
      this._handleCollectionAdLinkForm(0);
    }
  }
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
        name: this.props.data.name,
        objective: this.props.data.objective ? this.props.data.objective : "",
        start_time: this.props.data.start_time
          ? this.props.data.start_time
          : "",
        end_time: this.props.data.end_time ? this.props.data.end_time : ""
      };
      this.setState({
        // ...this.props.data,
        collectionAdLinkForm: this.props.data.collectionAdLinkForm,
        playback_type: this.props.data.playback_type,
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
        playback_type: "LOOPING",
        minValueBudget: 0,
        maxValueBudget: 0,
        modalVisible: false,
        objectiveLabel: "Select Objective",
        inputN: false,
        objectives: ObjectiveData[this.props.adType],
        nameError: "",
        objectiveError: "",
        start_timeError: "",
        end_timeError: ""
      });
    }
  };
  setObjective = choice => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: choice.value
      },
      objectiveLabel: choice.label
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
    this.props.save_campaign_info({ start_time: date });
  };
  handleEndDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date
      }
    });
    this.props.save_campaign_info({ end_time: date });
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  getMinimumCash = days => {
    let minValueBudget = days !== 0 ? 25 * days : 25;
    let maxValueBudget = days > 1 ? minValueBudget + 1500 : 1500;
    this.setState({
      minValueBudget,
      maxValueBudget
    });
  };

  _handleCollectionAdLinkForm = val => {
    this.setState({ collectionAdLinkForm: val });
  };

  handleStoryOption = playback_type => {
    this.setState({ playback_type });
    this.props.save_campaign_info({ playback_type });
  };
  _handleSubmission = async () => {
    const nameError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.name
    );
    const objectiveError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.objective
    );

    let dateErrors = this.dateField.getErrors();

    this.setState({
      nameError,
      objectiveError,
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError
    });
    if (
      !nameError &&
      !objectiveError &&
      !dateErrors.start_timeError &&
      !dateErrors.end_timeError
    ) {
      Segment.trackWithProperties("Select Ad Objective", {
        business_name: this.props.mainBusiness.businessname,
        campaign_objective: this.state.campaignInfo.objective
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        step: 2,
        business_name: this.props.mainBusiness.businessname,
        campaign_objective: this.state.campaignInfo.objective
      });

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
        ...this.state.campaignInfo,
        playback_type: this.state.playback_type,
        minValueBudget: this.state.minValueBudget,
        maxValueBudget: this.state.maxValueBudget
      });
      let info = {
        campaign_type: this.props.adType,
        ...this.state.campaignInfo
      };

      if (this.props.campaign_id !== "") {
        this.props.ad_objective(
          { ...info, campaign_id: this.props.campaign_id },
          this.props.navigation
        );
      } else
        this.props.ad_objective(
          { ...info, campaign_id: 0 },
          this.props.navigation
        );
    }
  };

  render() {
    let adType = this.props.adType;

    const list = ObjectiveData[this.props.adType].map(o => (
      <ObjectivesCard
        choice={o}
        selected={this.state.campaignInfo.objective}
        setObjective={this.setObjective}
        key={o.value}
      />
    ));

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties(
              (adType === "SnapAd"
                ? "Snap Ad"
                : adType === "StoryAd"
                ? "Story Ad"
                : "Collection Ad") + " Objective",
              {
                category: "Campaign Creation"
              }
            );
            Segment.trackWithProperties("Viewed Checkout Step", {
              step: 2,
              business_name: this.props.mainBusiness.businessname
            });
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <BackdropIcon style={styles.backDrop} height={hp("100%")} />
            <CustomHeader
              closeButton={false}
              segment={{
                str: "Ad Objective Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              navigation={this.props.navigation}
              title={
                (adType === "SnapAd"
                  ? "Snap Ad"
                  : adType === "StoryAd"
                  ? "Story Ad"
                  : "Collection Ad") + " Campaign"
              }
            />
            <View style={styles.block1}>
              <PhoneIcon
                style={styles.phoneicon}
                width={hp(5) < 30 ? 50 : 70}
                height={hp(5) < 30 ? 50 : 70}
              />
            </View>
            <ScrollView
              contentContainerStyle={styles.mainContent}
              scrollEnabled={true}
              style={styles.scrollViewStyle}
            >
              <Animatable.View
                onAnimationEnd={() => this.setState({ nameError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.nameError ? "" : "shake"}
              >
                <View
                  style={[
                    {
                      borderTopLeftRadius: 150,
                      borderTopRightRadius: 150,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      paddingTop: 10,
                      width: 150,
                      alignSelf: "center",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      height: 15,
                      zIndex: 1
                    }
                  ]}
                >
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputN
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    Ad Name
                  </Text>
                </View>
                <Item style={[styles.input1]}>
                  <Input
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.campaignInfo.name}
                    style={[styles.inputText]}
                    autoCorrect={false}
                    maxLength={34}
                    autoCapitalize="none"
                    onChangeText={value => {
                      this.setState({
                        campaignInfo: {
                          ...this.state.campaignInfo,
                          name: value
                        }
                      });
                      this.props.save_campaign_info({ name: value });
                    }}
                    autoFocus={true}
                    onFocus={() => {
                      this.setState({ inputN: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputN: false });
                      this.setState({
                        nameError: validateWrapper(
                          "mandatory",
                          this.state.campaignInfo.name
                        )
                      });
                    }}
                  />
                </Item>
              </Animatable.View>
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
                    Date
                  </Text>
                </View>
                <Duration
                  loading={this.props.loading}
                  dismissKeyboard={Keyboard.dismiss}
                  start_time={this.state.campaignInfo.start_time}
                  end_time={this.state.campaignInfo.end_time}
                  start_timeError={this.state.start_timeError}
                  end_timeError={this.state.end_timeError}
                  dateField={this.dateField}
                />
              </Animatable.View>
              <Text style={styles.minBudget}>Minimum of $25/day</Text>
              <Animatable.View
                onAnimationEnd={() => this.setState({ objectiveError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.objectiveError ? "" : "shake"}
              >
                <View style={[styles.objectiveTextLabel]}>
                  <Text style={[styles.inputLabel]}>OBJECTIVE</Text>
                </View>
                <Item
                  disabled={this.props.loading}
                  // rounded
                  style={[styles.input2]}
                  onPress={() => {
                    Keyboard.dismiss();
                    this.setModalVisible(true);
                  }}
                >
                  <Text style={styles.label}>{this.state.objectiveLabel}</Text>
                  <Icon type="AntDesign" name="down" style={styles.downicon} />
                </Item>
              </Animatable.View>

              {this.props.adType === "CollectionAd" && (
                <View style={styles.collectionAdView}>
                  <Text uppercase style={styles.collectionAdText}>
                    Where are you taking the user ?
                  </Text>
                  <View style={styles.topContainer}>
                    <Button
                      block
                      style={[
                        this.state.collectionAdLinkForm === 1
                          ? styles.activeButton
                          : styles.button,
                        styles.collectionAdLinkForm1
                      ]}
                      onPress={() => {
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
                        Website
                      </Text>
                      <Text
                        style={[
                          this.state.collectionAdLinkForm === 1
                            ? styles.activeText
                            : styles.inactiveText,
                          styles.buttonSubText
                        ]}
                      >
                        Links to your site
                      </Text>
                    </Button>
                    <Button
                      block
                      style={[
                        this.state.collectionAdLinkForm === 2
                          ? styles.activeButton
                          : styles.button,
                        styles.collectionAdLinkForm2
                      ]}
                      onPress={() => {
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
                        App DeepLink
                      </Text>
                      <Text
                        style={[
                          this.state.collectionAdLinkForm === 2
                            ? styles.activeText
                            : styles.inactiveText,
                          styles.buttonSubText
                        ]}
                      >
                        Links to your App
                      </Text>
                    </Button>
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
                <LowerButton bottom={-5} function={this._handleSubmission} />
              )}
            </ScrollView>
          </Container>
        </TouchableWithoutFeedback>

        <DateField
          getMinimumCash={this.getMinimumCash}
          onRef={ref => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.campaignInfo.start_time}
          end_time={this.state.campaignInfo.end_time}
        />
        <ContinueCampaign
          tempAdType={this.props.navigation.getParam("tempAdType", "SnapAd")}
          navigation={this.props.navigation}
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
                  closeButton={false}
                  actionButton={() => {
                    this.setModalVisible(false);
                  }}
                  title="Campaign Objective"
                />
                <Content
                  padder
                  indicatorStyle="white"
                  contentContainerStyle={styles.contentContainer}
                >
                  {list}
                </Content>
                <LowerButton bottom={4} function={this.setModalVisible} />
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
  currentCampaignSteps: state.campaignC.currentCampaignSteps
});

const mapDispatchToProps = dispatch => ({
  ad_objective: (info, navigation) =>
    dispatch(actionCreators.ad_objective(info, navigation)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  getMinimumCash: values => dispatch(actionCreators.getMinimumCash(values)),
  set_collectionAd_link_form: value =>
    dispatch(actionCreators.set_collectionAd_link_form(value)),
  reset_collections: () => dispatch(actionCreators.reset_collections())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdObjective);
