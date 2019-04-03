import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
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
  Thumbnail,
  Spinner
} from "native-base";
import { LinearGradient } from "expo";
import CampaignCard from "../../MiniComponents/CampaignCard";
import SearchBar from "../../MiniComponents/SearchBar";
import FilterStatus from "../../MiniComponents/FilterStatus";
import Sidemenu from "react-native-side-menu";
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import dateFormat from "dateformat";
import * as actionCreators from "../../../store/actions";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import DateFields from "../CampaignCreate/AdDetails/DateFields";
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: "",
      end_time: ""
    };
  }

  handleStartDatePicked = date => {
    this.setState({
      start_time: date
    });
  };
  handleEndDatePicked = date => {
    this.setState({
      end_time: date
    });
  };
  _resetFilter = () => {
    this.setState({ start_time: "", end_time: "" });
  };
  _handleSubmission = () => {
    this.props.onSearch({
      value: this.props.filterValue,
      selected: this.props.filterStatus,
      dateRange: [this.state.start_time, this.state.end_time]
    });
    this.props._handleSideMenuState(false);
  };
  render() {
    let end_time = "";
    let start_time = "";
    let end_year = "";
    let start_year = "";
    if (this.state.start_time !== "" && this.state.end_time !== "") {
      end_time = new Date(this.state.end_time.split(".")[0]);
      start_time = new Date(this.state.start_time.split(".")[0]);
      end_year = end_time.getFullYear();
      start_year = start_time.getFullYear();
      end_time = dateFormat(end_time, "d mmm");
      start_time = dateFormat(start_time, "d mmm");
    }

    return (
      <>
        <DateFields
          open={this.props.open}
          filterMenu={true}
          onRef={ref => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.start_time}
          end_time={this.state.end_time}
        />
        <View
          style={{
            flex: 1,
            top: "20%",
            alignItems: "center",
            flexDirection: "colum",
            opacity: 1
          }}
        >
          <View
            style={{
              felx: 1,
              justifyContent: "flex-start",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <FilterIcon width={60} height={60} fill="#fff" />
            <Text style={[styles.title]}> Filter </Text>
          </View>
          <Text style={[styles.subtext]}>
            Select which Ads you'd like to see
          </Text>

          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 10
            }}
          >
            <Text style={[styles.title, { paddingBottom: 10 }]}>
              Ad Activity
            </Text>
            <FilterStatus />
            <Text style={[styles.title]}> Date </Text>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0.2)"
              style={[
                styles.dateInput,
                {
                  borderColor: this.state.start_timeError ? "red" : "#D9D9D9"
                }
              ]}
              onPress={() => {
                this.dateField.showModal();
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View
                  style={{
                    flexDirection: "column",
                    textAlign: "center"
                  }}
                >
                  <Text style={[styles.categories, { fontSize: 16 }]}>
                    Start
                  </Text>
                  {this.state.start_time !== "" && (
                    <Text style={styles.numbers}>
                      {start_time}
                      {"\n"}
                      <Text style={[styles.numbers, { fontSize: 12 }]}>
                        {start_year}
                      </Text>
                    </Text>
                  )}
                </View>

                <Text style={[styles.categories, { fontSize: 16 }]}>To</Text>

                <View
                  style={{
                    flexDirection: "column"
                  }}
                >
                  <Text style={[styles.categories, { fontSize: 16 }]}>End</Text>

                  {this.state.end_time !== "" && (
                    <Text style={styles.numbers}>
                      {end_time}
                      {"\n"}
                      <Text style={[styles.numbers, { fontSize: 12 }]}>
                        {end_year}
                      </Text>
                    </Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <Text onPress={() => this._resetFilter()} style={styles.subtext}>
          Rest
        </Text>
        <Button
          style={[styles.checkbutton, { marginBottom: 35 }]}
          onPress={() => this._handleSubmission()}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  }
}
const mapStateToProps = state => ({
  campaignList: state.auth.campaignList,
  filterStatus: state.auth.filterStatus,
  filterValue: state.auth.filterValue
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actionCreators.filterCampaigns(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterMenu);
