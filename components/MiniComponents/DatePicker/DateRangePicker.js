import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styles from "../../Screens/CampaignCreate/AdDetails/styles";

const XDate = require("xdate");

type Props = {
  initialRange: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired
};

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December"
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul.",
    "Aug",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  dayNamesShort: ["Su", "M", "T", "W", "Th", "F", "S"]
};

LocaleConfig.defaultLocale = "en";
export default class DateRangePicker extends Component<Props> {
  state = { isFromDatePicked: false, isToDatePicked: false, markedDates: {} };

  componentDidMount() {
    this.setupInitialRange();
  }

  onDayPress = day => {
    if (
      !this.state.isFromDatePicked ||
      (this.state.isFromDatePicked && this.state.isToDatePicked)
    ) {
      this.setupStartMarker(day);
    } else if (!this.state.isToDatePicked) {
      let markedDates = { ...this.state.markedDates };
      let [mMarkedDates, range] = this.setupMarkedDates(
        this.state.fromDate,
        day.dateString,
        markedDates
      );
      if (range >= 0) {
        this.setState({
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates
        });
        this.props.onSuccess(this.state.fromDate, day.dateString);
      } else {
        this.setupStartMarker(day);
      }
    }
  };

  setupStartMarker = day => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor
      }
    };
    this.setState({
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates: markedDates
    });
    this.props.startDatePicked();
  };

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: this.props.theme.markColor,
            textColor: this.props.theme.markTextColor
          }
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString("yyyy-MM-dd");
          if (i < range) {
            markedDates[tempDate] = {
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  setupInitialRange = () => {
    if (!this.props.initialRange) return;
    let [fromDate, toDate] = this.props.initialRange;
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor
      }
    };
    let [mMarkedDates, range] = this.setupMarkedDates(
      fromDate,
      toDate,
      markedDates
    );
    this.setState({ markedDates: mMarkedDates, fromDate: fromDate });
  };

  render() {
    return (
      <Calendar
        minDate={
          !this.props.filterMenu
            ? this.props.chartRange
              ? null //new Date(this.props.selectedCampaign.start_time)
              : Date()
            : null
        }
        // maxDate={
        //   this.props.chartRange
        //     ? new Date(this.props.selectedCampaign.end_time)
        //     : null
        // }
        {...this.props}
        markingType={"period"}
        current={this.state.fromDate}
        markedDates={this.state.markedDates}
        onDayPress={day => {
          this.onDayPress(day);
        }}
        firstDay={1}
        style={styles.calender}
        theme={{
          calendarBackground: "transparent",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#FF9D00",
          dayTextColor: "#fff",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "#FF9D00",
          monthTextColor: "#fff",
          textDayFontFamily: "montserrat-regular",
          textMonthFontFamily: "montserrat-regular",
          textDayHeaderFontFamily: "montserrat-bold",
          textMonthFontWeight: "bold",
          textDayFontSize: 17,
          textMonthFontSize: 13,
          textDayHeaderFontSize: 14
        }}
      />
    );
  }
}

DateRangePicker.defaultProps = {
  theme: { markColor: "#00adf5", markTextColor: "#ffffff" }
};
