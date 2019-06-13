import React, { Component } from "react";
import { View, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import FilterStatus from "../../MiniComponents/FilterStatus";
import dateFormat from "dateformat";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import LowerButton from "../LowerButton";

//Icons
import FilterIcon from "../../../assets/SVGs/Filter.svg";

// Style
import styles from "./styles";

//Functions
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

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

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <FilterIcon width={hp(7)} height={hp(7)} fill="#fff" />
            <Text style={styles.title}> Filter </Text>
          </View>
          <Text style={styles.subtext}>
            {this.props.transactionFilter
              ? "Filter transactions by date"
              : "Select which campaigns you’d like to see"}
          </Text>

          <View style={styles.transactionFilterContainer}>
            {!this.props.transactionFilter && (
              <>
                <Text style={styles.titleStatus}>Campaign Status</Text>
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
            <Text style={styles.titleDate}> Date </Text>
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
              <View style={styles.dateContainer}>
                <View style={styles.startColumn}>
                  {this.state.start_time === "" && (
                    <Text style={styles.categories}>Start</Text>
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
                <View style={styles.middleColumn}>
                  <Text style={styles.categories}>To</Text>
                </View>
                <View style={styles.endColumn}>
                  {this.state.end_time === "" && (
                    <Text style={styles.categories}>End</Text>
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
        <View style={styles.bottomView}>
          <Text
            onPress={() => this._resetFilter()}
            style={styles.clearFilterText}
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
