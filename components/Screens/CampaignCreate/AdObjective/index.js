//Components
import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  BackHandler
} from "react-native";
import {
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Label
} from "native-base";
import { LinearGradient, BlurView, Segment } from "expo";
import { Modal } from "react-native-paper";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";
import LowerButton from "../../../MiniComponents/LowerButton";
import BackButton from "../../../MiniComponents/BackButton";
import DateField from "../../../MiniComponents/DatePicker/DateFields";
import Duration from "./Duration";
//icons
import PhoneIcon from "../../../../assets/SVGs/Phone.svg";
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";

import BackButtonIcon from "../../../../assets/SVGs/BackButton.svg";
import ForwardButton from "../../../../assets/SVGs/ForwardButton.svg";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//data
import ObjectiveData from "./ObjectiveData";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Validators
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

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
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      objectiveLabel: "Select Objective",
      inputN: false,
      objectives: ObjectiveData,
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      end_timeError: ""
    };
  }
  componentWillMount() {}
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    if (this.state.modalVisible) {
      this.setState({
        modalVisible: false
      });
    } else {
      console.log("navigation adobjective", this.props.navigation);
      this.props.navigation.goBack();
    }
    return true;
  };
  componentDidMount() {
    Segment.screen("Select Ad Objective Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 2,
      business_name: this.props.mainBusiness.businessname,
      campaign_objective: this.state.campaignInfo.objective
    });
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        businessid: this.props.mainBusiness.businessid
      }
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  setObjective = value => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: value
      }
    });
  };

  handleStartDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        start_time: date
      }
    });
  };
  handleEndDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date
      }
    });
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
  _handleSubmission = () => {
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
      Segment.trackWithProperties("Select Ad Objective Button", {
        business_name: this.props.mainBusiness.businessname,
        campaign_objective: this.state.campaignInfo.objective
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        step: 2,
        business_name: this.props.mainBusiness.businessname,
        campaign_objective: this.state.campaignInfo.objective
      });

      this.props.getMinimumCash({
        minValueBudget: this.state.minValueBudget,
        maxValueBudget: this.state.maxValueBudget
      });
      this.props.ad_objective(this.state.campaignInfo, this.props.navigation);
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
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              locations={[0.7, 1]}
              style={styles.gradient}
            />
            <BackdropIcon
              style={styles.backDrop}
              height={heightPercentageToDP("100%")}
            />
            <View style={styles.block1}>
              <View style={styles.innerBlock1}>
                <BackButton
                  screenname="Ad Objective"
                  businessname={this.props.mainBusiness.businessname}
                  navigation={this.props.navigation.goBack}
                  style={styles.backButton}
                />
                <Text style={[styles.title, styles.block1Title]}>Snap Ad</Text>
              </View>
              <PhoneIcon style={styles.phoneicon} width={70} />
            </View>
            <View style={styles.maincontent}>
              <Item
                floatingLabel
                style={[
                  styles.input1,
                  {
                    borderColor: this.state.inputN
                      ? "#fff"
                      : this.state.nameError
                      ? "red"
                      : "#D9D9D9"
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      color: this.state.inputN ? "#FF9D00" : "#fff"
                    },
                    {
                      fontFamily: "montserrat-semibold"
                    }
                  ]}
                >
                  Enter Your Ad Name
                </Label>

                <Input
                  style={styles.inputtext}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      campaignInfo: { ...this.state.campaignInfo, name: value }
                    })
                  }
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
                dismissKeyboard={Keyboard.dismiss}
                start_time={this.state.campaignInfo.start_time}
                end_time={this.state.campaignInfo.end_time}
                start_timeError={this.state.start_timeError}
                end_timeError={this.state.end_timeError}
                dateField={this.dateField}
              />

              <Text style={[styles.title, styles.selectObjectiveTitle]}>
                Objective
              </Text>

              <Item
                rounded
                style={[
                  styles.input2,
                  {
                    borderColor: this.state.objectiveError
                      ? "red"
                      : "transparent"
                  }
                ]}
                onPress={() => {
                  Keyboard.dismiss();
                  this.setModalVisible(true);
                }}
              >
                <Text style={[styles.inputtext, { width: "100%" }]}>
                  {this.state.campaignInfo.objective === ""
                    ? this.state.objectiveLabel
                    : this.state.objectives.find(
                        c => this.state.campaignInfo.objective === c.value
                      ).label}
                </Text>
                <Icon type="AntDesign" name="down" style={styles.downicon} />
              </Item>
            </View>

            <LowerButton bottom={4} function={this._handleSubmission} />
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
        <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <BlurView intensity={95} tint="dark">
            <View style={styles.popupOverlay}>
              <View style={styles.popupContent}>
                <Text style={styles.modaltitle}>Campaign Objective</Text>
              </View>
              <ScrollView
                indicatorStyle="white"
                contentContainerStyle={{
                  paddingTop: heightPercentageToDP(7),
                  marginBottom: 20
                }}
              >
                {list}
              </ScrollView>
              <LowerButton bottom={3} function={this.setModalVisible} />
            </View>
          </BlurView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  loading: state.campaignC.loadingObj
});

const mapDispatchToProps = dispatch => ({
  ad_objective: (info, navigation) =>
    dispatch(actionCreators.ad_objective(info, navigation)),
  getMinimumCash: values => dispatch(actionCreators.getMinimumCash(values))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdObjective);
