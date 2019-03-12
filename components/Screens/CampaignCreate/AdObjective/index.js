import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
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

// Style
import styles, { colors } from "./styles";

class AdObjective extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
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
          value: "BRAND_AWARENESS"
        },
        {
          label: "Reach",
          value: "REACH"
        },
        {
          label: "Traffic",
          value: "TRAFFIC"
        },
        {
          label: "App Installs",
          value: "APP_INSTALLS"
        },
        {
          label: "Video Views",
          value: "VIDEO_VIEWS"
        },
        {
          label: "Lead Generation",
          value: "LEAD_GENERATION"
        }
      ],
      nameError: "",
      objectiveError: "",
      start_timeError: "",
      endt_time: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
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
        start_time: date.toISOString()
      }
    });

    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date.toISOString()
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
      this.props.navigation.navigate("AdDesign");
    }
  };

  render() {
    console.log(this.state.campaignInfo);

    return (
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
            <Text style={styles.text}>Story Ad</Text>
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
            <RNPickerSelect
              items={this.state.objectives}
              placeholder={{ label: "Select an objective", value: "" }}
              onClose={() =>
                this.setState({
                  objectiveError: validateWrapper(
                    "mandatory",
                    this.state.campaignInfo.objective
                  )
                })
              }
              onValueChange={value => {
                this.setState({
                  campaignInfo: {
                    ...this.state.campaignInfo,
                    objective: value
                  }
                });
              }}
            >
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.objectiveError ? "red" : "#D9D9D9"
                  }
                ]}
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
            </RNPickerSelect>

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
                minimumDate={new Date()}
                isVisible={this.state.endDateTimePickerVisible}
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
