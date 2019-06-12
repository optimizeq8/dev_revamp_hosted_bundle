import React, { Component } from "react";
import { connect } from "react-redux";

import { View, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import { LinearGradient } from "expo";
import FilterStatus from "../../MiniComponents/FilterStatus";
import FilterIcon from "../../../assets/SVGs/Filter.svg";
import dateFormat from "dateformat";
import * as actionCreators from "../../../store/actions";
//icons

// Style
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import LowerButton from "../LowerButton";
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: "",
      end_time: "",
      selected: "A"
    };
  }
  componentWillUnmount() {
    console.log("Here!");
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
    this.setState({ start_time: "", end_time: "", selected: "A" });
  };
  _handleSubmission = (selected, statusSelected) => {
    this.setState({ selected });
    if (!this.props.transactionFilter) {
      this.props.onSearch({
        value: this.props.filterValue,
        selected: selected,
        dateRange: [this.state.start_time, this.state.end_time]
      });
    } else {
      this.props.filterTransactions({
        value: this.props.transactionValue,
        dateRange: [this.state.start_time, this.state.end_time]
      });
    }
    !statusSelected && this.props._handleSideMenuState(false);
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
            top: hp("10"),
            alignItems: "center",
            flexDirection: "column",
            opacity: 1,
            elevation: 0
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
            <FilterIcon width={hp(7)} height={hp(7)} fill="#fff" />
            <Text style={[styles.title]}> Filter </Text>
          </View>
          <Text style={[styles.subtext]}>
            {this.props.transactionFilter
              ? "Filter transactions by date"
              : "Select which campaigns you’d like to see"}
          </Text>

          <View
            style={{
              felx: 1,
              justifyContent: "space-between"
            }}
          >
            {!this.props.transactionFilter && (
              <>
                <Text style={[styles.title, { paddingBottom: 20 }]}>
                  Campaign Status
                </Text>
                <FilterStatus
                  selected={
                    this.props.filterStatus
                      ? this.props.filterStatus
                      : this.state.selected
                  }
                  _handleSubmission={this._handleSubmission}
                />
              </>
            )}
            <Text style={[styles.title, { paddingBottom: 10 }]}> Date </Text>
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
                  {this.state.start_time === "" && (
                    <Text style={[styles.categories, { fontSize: 16 }]}>
                      Start
                    </Text>
                  )}
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
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Text style={[styles.categories, { fontSize: 16 }]}>To</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column"
                  }}
                >
                  {this.state.end_time === "" && (
                    <Text style={[styles.categories, { fontSize: 16 }]}>
                      End
                    </Text>
                  )}

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
        <View style={{ bottom: "10%" }}>
          <Text
            onPress={() => this._resetFilter()}
            style={[
              styles.subtext,
              {
                textDecorationLine: "underline",
                marginBottom: 20,
                textDecorationColor: "#fff"
              }
            ]}
          >
            Clear filters
          </Text>
          <LowerButton
            checkmark={true}
            function={() => this._handleSubmission(this.state.selected)}
          />
        </View>
      </>
    );
  }
}
const mapStateToProps = state => ({
  campaignList: state.dashboard.campaignList,
  filterStatus: state.dashboard.filterStatus,
  filterValue: state.dashboard.filterValue,
  transactionValue: state.transA.transactionValue,
  startSearch: state.transA.startSearch,
  endSearch: state.transA.endSearch
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actionCreators.filterCampaigns(query)),
  filterTransactions: query =>
    dispatch(actionCreators.filterTransactions(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterMenu);
