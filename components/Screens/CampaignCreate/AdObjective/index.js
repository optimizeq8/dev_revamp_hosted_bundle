//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler
} from "react-native";
import {
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Label,
  Button
} from "native-base";
import { BlurView, Segment } from "expo";
import { Modal } from "react-native-paper";
import { SafeAreaView, NavigationEvents } from "react-navigation";
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
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

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
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      end_timeError: ""
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    if (this.state.modalVisible) {
      this.setModalVisible(false);
    } else {
      this.props.navigation.goBack();
      return true;
    }
  };
  componentDidMount() {
    let rep = this.state.campaignInfo;

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
    if (this.props.data) {
      rep = {
        ...this.state.campaignInfo,
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        businessid: this.props.mainBusiness.businessid,
        ...this.props.data
      };
      this.setState({
        campaignInfo: { ...rep },
        minValueBudget: this.props.data.minValueBudget,
        maxValueBudget: this.props.data.maxValueBudget
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  setObjective = value => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: value
      }
    });
    this.props.save_campaign_info({ objective: value, reset: true });
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

      // this.props.getMinimumCash({
      //   minValueBudget: this.state.minValueBudget,
      //   maxValueBudget: this.state.maxValueBudget
      // });

      console.log(
        "this.props.collectionAdLinkForm",
        this.props.collectionAdLinkForm
      );
      console.log(
        "this.state.collectionAdLinkForm",
        this.state.collectionAdLinkForm
      );
      if (this.props.collectionAdLinkForm !== this.state.collectionAdLinkForm) {
        // this.props.set_collectionAd_link_form(this.state.collectionAdLinkForm);
        this.props.reset_collections();
      }
      // else {
      this.props.set_collectionAd_link_form(this.state.collectionAdLinkForm);
      // }
      this.props.save_campaign_info({
        campaign_id: this.props.campaign_id,
        ...this.state.campaignInfo,

        minValueBudget: this.state.minValueBudget,
        maxValueBudget: this.state.maxValueBudget
      });
      if (this.props.campaign_id !== "")
        this.props.ad_objective(
          {
            campaign_id: this.props.campaign_id,
            campaign_type: this.props.adType,
            ...this.state.campaignInfo
          },
          this.props.navigation
        );
      else
        this.props.ad_objective(
          {
            campaign_id: 0,
            campaign_type: this.props.adType,
            ...this.state.campaignInfo
          },
          this.props.navigation
        );
    }
  };

  render() {
    const list = this.state.objectives.map(o => (
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
            Segment.screenWithProperties("Snap Ad Objective", {
              category: "Campaign Creation"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              step: 2,
              business_name: this.props.mainBusiness.businessname
            });
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <BackdropIcon
              style={styles.backDrop}
              height={heightPercentageToDP("100%")}
            />
            <CustomHeader
              closeButton={false}
              segment={{
                str: "Ad Objective Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              navigation={this.props.navigation}
              title="Snap Ad Campaign"
            />
            <View style={styles.block1}>
              <PhoneIcon
                style={styles.phoneicon}
                width={heightPercentageToDP(5) < 30 ? 50 : 70}
                height={heightPercentageToDP(5) < 30 ? 50 : 70}
              />
            </View>
            <View style={styles.mainContent}>
              <Item
                floatingLabel
                style={[
                  styles.input1,
                  this.state.inputN
                    ? GlobalStyles.whiteBorderColor
                    : this.state.nameError
                    ? GlobalStyles.redBorderColor
                    : GlobalStyles.lightGrayBorderColor
                ]}
              >
                <Label
                  style={[
                    styles.inputLabel,
                    this.state.inputN
                      ? GlobalStyles.orangeTextColor
                      : GlobalStyles.whiteTextColor
                  ]}
                >
                  Enter Your Ad Name
                </Label>

                <Input
                  disabled={this.props.loading}
                  value={this.state.campaignInfo.name}
                  style={styles.inputText}
                  autoCorrect={false}
                  maxLength={35}
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

              <Duration
                loading={this.props.loading}
                dismissKeyboard={Keyboard.dismiss}
                start_time={this.state.campaignInfo.start_time}
                end_time={this.state.campaignInfo.end_time}
                start_timeError={this.state.start_timeError}
                end_timeError={this.state.end_timeError}
                dateField={this.dateField}
              />
              <Text style={styles.minBudget}>Minimum of $25/day</Text>
              <Text style={styles.title}>Objective</Text>

              <Item
                disabled={this.props.loading}
                rounded
                style={[
                  styles.input2,
                  this.state.objectiveError
                    ? GlobalStyles.redBorderColor
                    : GlobalStyles.transparentBorderColor
                ]}
                onPress={() => {
                  Keyboard.dismiss();
                  this.setModalVisible(true);
                }}
              >
                <Text style={styles.label}>
                  {this.state.campaignInfo.objective === ""
                    ? this.state.objectiveLabel
                    : this.state.objectives.find(
                        c => this.state.campaignInfo.objective === c.value
                      ).label}
                </Text>
                <Icon type="AntDesign" name="down" style={styles.downicon} />
              </Item>
              {this.props.adType === "CollectionAd" && (
                <View style={styles.topContainer}>
                  <Button
                    block
                    dark
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
                    dark
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
              )}
            </View>
            {this.props.loading ? (
              <ForwardLoading
                bottom={18}
                mainViewStyle={{
                  width: widthPercentageToDP(9),
                  height: heightPercentageToDP(9)
                }}
              />
            ) : (
              <LowerButton bottom={4} function={this._handleSubmission} />
            )}
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
        {/* <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal> */}
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
  mainBusiness: state.account.mainBusiness,
  loading: state.campaignC.loadingObj,
  campaign_id: state.campaignC.campaign_id,
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm
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
