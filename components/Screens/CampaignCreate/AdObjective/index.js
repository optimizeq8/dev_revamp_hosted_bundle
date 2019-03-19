import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
import { LinearGradient } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { Modal } from "react-native-paper";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";

// Style
import styles, { colors } from "./styles";

class AdObjective extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,

      campaignInfo: {
        ad_account_id: "",
        start_time: "",
        end_time: "",
        name: "",
        objective: ""
      },
      objectiveLabel: "Brand Awereness",
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
      objectives: [
        {
          label: "Brand Awereness",
          value: "BRAND_AWARENESS",
          info: "The user will be taken to your website",
          icon: ""
        },
        {
          label: "Reach",
          value: "REACH",
          info: "The user will be shown A video of 10 Mins.",
          icon: ""
        },
        {
          label: "Traffic",
          value: "TRAFFIC",
          info: "The user will be sent to Download your app",
          icon: ""
        },
        {
          label: "App Installs",
          value: "APP_INSTALLS",
          info: "The user will be sent to a specific page inyour app",
          icon: ""
        },
        {
          label: "Video Views",
          value: "VIDEO_VIEWS",
          info: "The user will be sent to a specific page inyour app",
          icon: ""
        },
        {
          label: "Lead Generation",
          value: "LEAD_GENERATION",
          info: "The user will be sent to a specific page inyour app",
          icon: ""
        }
      ],
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      endt_time: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setObjective = this.setObjective.bind(this);
  }

  setObjective(value) {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: value
      }
    });
  }

  componentDidMount() {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        businessid: this.props.mainBusiness.businessid
      }
    });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () =>
    this.setState({
      startDateTimePickerVisible: false,
      start_timeError: validateWrapper(
        "mandatory",
        this.state.campaignInfo.start_time
      )
    });

  hideEndDateTimePicker = () =>
    this.setState({
      endDateTimePickerVisible: false,
      startDateTimePickerVisible: false,
      end_timeError: validateWrapper(
        "mandatory",
        this.state.campaignInfo.end_time
      )
    });

  handleStartDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        start_time: date.toISOString().split("T")[0]
      }
    });

    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = date => {
    console.log("A date has been picked: ", date.toISOString().split("T")[0]);

    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date.toISOString().split("T")[0]
      }
    });

    this.hideEndDateTimePicker();
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
    const start_timeError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.start_time
    );
    const end_timeError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.end_time
    );
    this.setState({
      nameError,
      objectiveError,
      start_timeError,
      end_timeError
    });
    if (!nameError && !objectiveError && !start_timeError && !end_timeError) {
      console.log(this.state.campaignInfo);
      // this.props.ad_objective(this.state.campaignInfo, this.props.navigation);
      // this.props.navigation.navigate("AdDesign");
    }
  };

  render() {
    console.log(this.state.campaignInfo);
    const list = this.state.objectives.map(o => (
      <ObjectivesCard
        choice={o}
        selected={this.state.campaignInfo.objective}
        setObjective={this.setObjective}
        key={o.value}
      />
    ));

    let width = Dimensions.get("window").width * 0.5 - 100;
    console.log(width);

    return (
      <>
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            startPoint={{ x: 1, y: 0 }}
            endPoint={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            style={{
              backgroundColor: "#fff",
              borderTopStartRadius: 30,
              borderTopEndRadius: 30
            }}
          >
            <Card
              style={[
                styles.mainCard,
                {
                  margin: 0,
                  shadowColor: "#fff",
                  shadowRadius: 1,
                  shadowOpacity: 0.7,
                  shadowOffset: { width: 8, height: 8 }
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <Button
                  onLayout={event => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    console.log("width", width);
                  }}
                  transparent
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    paddingLeft: 10,
                    marginRight: width
                  }}
                >
                  <Icon
                    style={{
                      top: 20,
                      fontSize: 35
                    }}
                    name="arrow-back"
                  />
                </Button>
                <Text style={[styles.text]}>Snap Ad</Text>
              </View>
              <Text style={styles.text}>Input a name for your Ad</Text>
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.nameError ? "red" : "#D9D9D9"
                  }
                ]}
              >
                <Input
                  style={styles.inputtext}
                  placeholder="Ad Name"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      campaignInfo: { ...this.state.campaignInfo, name: value }
                    })
                  }
                  onBlur={() => {
                    this.setState({
                      nameError: validateWrapper(
                        "mandatory",
                        this.state.campaignInfo.name
                      )
                    });
                  }}
                />
              </Item>
              <Text style={styles.text}>Objective</Text>

              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.objectiveError ? "red" : "#D9D9D9"
                  }
                ]}
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Text
                  style={[
                    styles.inputtext,
                    {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "rgb(113,113,113)"
                    }
                  ]}
                >
                  {this.state.campaignInfo.objective === ""
                    ? this.state.objectives[0].label
                    : this.state.objectives.find(
                        c => this.state.campaignInfo.objective === c.value
                      ).label}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                />
              </Item>

              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.start_timeError ? "red" : "#D9D9D9"
                  }
                ]}
                onPress={this.showStartDateTimePicker}
              >
                <Text
                  style={[
                    styles.inputtext,
                    {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "rgb(113,113,113)"
                    }
                  ]}
                >
                  {this.state.campaignInfo.start_time === ""
                    ? "Set your start date..."
                    : this.state.campaignInfo.start_time.split("T")[0]}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                />
                <DateTimePicker
                  minimumDate={new Date()}
                  maximumDate={
                    this.state.campaignInfo.end_time !== ""
                      ? new Date(this.state.campaignInfo.end_time)
                      : null
                  }
                  isVisible={this.state.startDateTimePickerVisible}
                  onConfirm={this.handleStartDatePicked}
                  onCancel={this.hideStartDateTimePicker}
                  mode="date"
                  onHideAfterConfirm={() =>
                    this.setState({
                      start_timeError: validateWrapper(
                        "mandatory",
                        this.state.start_timeError
                      )
                    })
                  }
                />
              </Item>

              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.end_timeError ? "red" : "#D9D9D9"
                  }
                ]}
                onPress={this.showEndDateTimePicker}
              >
                <Text
                  style={[
                    styles.inputtext,
                    {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: "rgb(113,113,113)"
                    }
                  ]}
                >
                  {this.state.campaignInfo.end_time === ""
                    ? "Set your end date..."
                    : this.state.campaignInfo.end_time.split("T")[0]}
                </Text>
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                />
                <DateTimePicker
                  isVisible={this.state.endDateTimePickerVisible}
                  minimumDate={
                    this.state.campaignInfo.start_time !== ""
                      ? new Date(this.state.campaignInfo.start_time)
                      : new Date()
                  }
                  onConfirm={this.handleEndDatePicked}
                  onCancel={this.hideEndDateTimePicker}
                  mode="date"
                  onHideAfterConfirm={() =>
                    this.setState({
                      end_timeError: validateWrapper(
                        "mandatory",
                        this.state.end_timeError
                      )
                    })
                  }
                />
              </Item>

              <TouchableOpacity
                onPress={this._handleSubmission}
                style={styles.buttonN}
              >
                <Image
                  style={styles.image}
                  source={require("../../../../assets/images/button.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Card>
          </KeyboardAwareScrollView>
        </Container>
        <Modal
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <View style={styles.popupOverlay}>
            <View style={styles.popupContent}>
              <Button
                transparent
                onPress={() => {
                  this.setModalVisible(false);
                }}
                style={styles.btnClose}
              >
                <Text style={{ color: "wheat" }}>X</Text>
              </Button>
            </View>
            <ScrollView
              contentContainerStyle={{
                marginTop: 40
              }}
            >
              {list}
            </ScrollView>
          </View>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.auth.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  ad_objective: (info, navigation) =>
    dispatch(actionCreators.ad_objective(info, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdObjective);
