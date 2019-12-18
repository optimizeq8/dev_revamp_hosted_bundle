import React, { Component } from "react";
import { View, TouchableHighlight, I18nManager } from "react-native";
import { Text } from "native-base";
import dateFormat from "dateformat";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Components
import FilterStatus from "../../MiniComponents/FilterStatus";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import LowerButton from "../LowerButton";

// Icons
import FilterIcon from "../../../assets/SVGs/Filter";

// Style
import globalStyles from "../../../GlobalStyles";
import styles from "./styles";

class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: "",
      end_time: "",
      selected: "A"
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
    const { translate } = this.props.screenProps;
    if (!this.props.open) {
      return null;
    } else
      return (
        <View
          style={[
            { flex: 1 },
            I18nManager.isRTL && this.props.transactionFilter
              ? { marginLeft: -25, marginRight: 0 }
              : {}
          ]}
        >
          <DateFields
            screenProps={this.props.screenProps}
            open={this.props.open}
            filterMenu={true}
            onRef={ref => (this.dateField = ref)}
            handleStartDatePicked={this.handleStartDatePicked}
            handleEndDatePicked={this.handleEndDatePicked}
            start_time={this.state.start_time}
            end_time={this.state.end_time}
          />

          <View
            style={[
              styles.container,
              I18nManager.isRTL && this.props.transactionFilter
                ? { marginLeft: 40, marginRight: 0 }
                : {}
            ]}
          >
            <View style={styles.headerContainer}>
              <FilterIcon width={hp(7)} height={hp(7)} fill="#fff" />
              <Text style={styles.title}> {translate("Filter")} </Text>
            </View>
            <Text style={styles.subtext}>
              {this.props.transactionFilter
                ? translate("Filter transactions by date")
                : translate("Select which campaigns you’d like to see")}
            </Text>

            <View style={styles.transactionFilterContainer}>
              {!this.props.transactionFilter && (
                <>
                  <Text style={styles.titleStatus}>
                    {translate("Campaign Status")}
                  </Text>
                  <FilterStatus
                    screenProps={this.props.screenProps}
                    selected={
                      this.props.filterStatus
                        ? this.props.filterStatus
                        : this.state.selected
                    }
                    _handleSubmission={this._handleSubmission}
                  />
                </>
              )}
              <Text style={styles.titleDate}> {translate("Date")} </Text>
              <TouchableHighlight
                underlayColor="rgba(0,0,0,0.2)"
                style={[
                  styles.dateInput,
                  this.state.start_timeError
                    ? globalStyles.redBorderColor
                    : globalStyles.lightGrayBorderColor
                ]}
                onPress={() => {
                  this.dateField.showModal();
                }}
              >
                <View style={styles.dateContainer}>
                  <View style={styles.startColumn}>
                    {this.state.start_time === "" && (
                      <Text style={styles.categories}>
                        {translate("Start")}
                      </Text>
                    )}
                    {this.state.start_time !== "" && (
                      <Text style={styles.numbers}>
                        {start_time}
                        {"\n"}
                        <Text style={[styles.numbers, styles.fontSize12]}>
                          {start_year}
                        </Text>
                      </Text>
                    )}
                  </View>
                  <View style={styles.middleColumn}>
                    <Text style={styles.categories}>{translate("To")}</Text>
                  </View>
                  <View style={styles.endColumn}>
                    {this.state.end_time === "" && (
                      <Text style={styles.categories}>{translate("End")}</Text>
                    )}

                    {this.state.end_time !== "" && (
                      <Text style={styles.numbers}>
                        {end_time}
                        {"\n"}
                        <Text style={[styles.numbers, styles.fontSize12]}>
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
              {translate("Clear filters")}
            </Text>
            <LowerButton
              checkmark={true}
              bottom={0}
              function={() => this._handleSubmission(this.state.selected)}
            />
          </View>
        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
