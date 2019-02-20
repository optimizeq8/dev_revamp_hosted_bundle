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
        objective: "BRAND_AWARENESS"
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
      ]
    };
  }

  componentDidMount() {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        ad_account_id: this.props.userInfo.ad_account_id
      }
    });
  }
  showStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: false });

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
      campaignInfo: { ...this.state.campaignInfo, end_time: date.toISOString() }
    });

    this.hideEndDateTimePicker();
  };

  render() {
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
            <Item rounded style={styles.input}>
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
              />
            </Item>
            <Text style={styles.text}>Objective</Text>
            <RNPickerSelect
              items={this.state.objectives}
              placeholder={{}}
              onValueChange={value => {
                this.setState({
                  campaignInfo: { ...this.state.campaignInfo, objective: value }
                });
              }}
            >
              <Item rounded style={styles.input}>
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
              style={styles.input}
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
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                minimumDate={new Date("2016-09-05 00:00")}
                mode="date"
              />
            </Item>

            <Item
              rounded
              style={styles.input}
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
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                mode="date"
              />
            </Item>

            <TouchableOpacity
              onPress={() => {
                console.log(this.state.campaignInfo);
                this.props.ad_objective(
                  this.state.campaignInfo,
                  this.props.navigation
                );
              }}
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
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  ad_objective: (info, navigation) =>
    dispatch(actionCreators.ad_objective(info, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdObjective);
