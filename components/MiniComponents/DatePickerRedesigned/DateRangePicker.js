import React, { Component } from "react";
import { I18nManager, View } from "react-native";
import { Icon } from "native-base";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import styles from "./styles";
import { widthPercentageToDP } from "react-native-responsive-screen";

const XDate = require("xdate");

type Props = {
  initialRange: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
};

LocaleConfig.locales["en"] = {
  monthNames: [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
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
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],

  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
};

LocaleConfig.locales["ar"] = {
  monthNames: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  monthNamesShort: [
    ".يناير",
    ".فبراير",
    ".مارس",
    ".أبريل",
    ".مايو",
    ".يونيو",
    ".يوليو",
    ".أغسطس",
    ".سبتمبر",
    ".أكتوبر",
    ".نوفمبر",
    ".ديسمبر",
  ],
  dayNames: [
    "يَوم الأحَد",
    "يَوم الإثنين",
    "يَوم الثلاثاء",
    "يَوم الأربعاء",
    "يَوم الخميس",
    "يَوم الجمعة",
    "يَوم السبت",
  ],

  dayNamesShort: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
};

LocaleConfig.defaultLocale = "en";
if (I18nManager.isRTL) {
  LocaleConfig.defaultLocale = "ar";
}
export default class DateRangePicker extends Component<Props> {
  state = { isFromDatePicked: false, isToDatePicked: false, markedDates: {} };

  componentDidMount() {
    this.setupInitialRange();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset && this.props.reset)
      this.setState({
        isFromDatePicked: false,
        isToDatePicked: false,
        markedDates: {},
      });
  }
  onDayPress = (day) => {
    if (
      !this.state.isFromDatePicked ||
      (this.state.isFromDatePicked && this.state.isToDatePicked)
    ) {
      this.setupStartMarker(day);
      this.props.onSuccess(day.dateString, day.dateString);
    }
  };

  setupStartMarker = (day) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        endingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor,
      },
    };
    this.setState({
      isFromDatePicked: true,
      isToDatePicked: true,
      fromDate: day.dateString,
      markedDates: markedDates,
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
            textColor: this.props.theme.markTextColor,
            startingDay: true,
            endingDay: true,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString("yyyy-MM-dd");
          if (i < range) {
            markedDates[tempDate] = {
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor,
            };
          }
        }
      }
    }
    return [markedDates, 1];
  };

  setupInitialRange = () => {
    if (!this.props.initialRange) return;
    let [fromDate, toDate] = this.props.initialRange;
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor,
      },
    };
    let [mMarkedDates, range] = this.setupMarkedDates(
      fromDate,
      toDate,
      markedDates
    );
    this.setState({ markedDates: mMarkedDates, fromDate: fromDate });
  };

  render() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    return (
      <CalendarList
        minDate={
          !this.props.filterMenu
            ? this.props.chartRange
              ? new Date(this.props.selectedCampaign.start_time)
              : startDate
            : null
        }
        pastScrollRange={
          this.props.filterMenu || this.props.chartRange ? 50 : 0
        }
        calendarHeight={350}
        calendarWidth={
          this.props.filterMenu
            ? widthPercentageToDP("90%")
            : widthPercentageToDP("100%")
        }
        maxDate={
          this.props.chartRange
            ? new Date(this.props.selectedCampaign.end_time)
            : null
        }
        {...this.props}
        markingType={"period"}
        current={
          this.props.chartRange
            ? this.props.selectedCampaign.start_time
            : this.state.fromDate
        }
        markedDates={this.state.markedDates}
        onDayPress={(day) => {
          this.onDayPress(day);
        }}
        style={styles.calender}
        theme={{
          "stylesheet.day.period": {
            base: {
              overflow: "hidden",
              height: 34,
              alignItems: "center",
              width: 38,
            },
            fillers: {
              position: "absolute",
              flexDirection: "row",
              left: 0,
              right: 0,
            },
          },
          "stylesheet.calendar.main": {
            week: {
              marginTop: 7,
              marginBottom: 7,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
            },
          },
          "stylesheet.calendar.header": {
            header: {
              flexDirection: "row",
              paddingLeft: 10,
              paddingRight: 10,
            },
            week: {
              marginTop: 7,
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#fff",
              borderRadius: 50,
              height: 30,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.05,
              shadowRadius: 5,

              elevation: 5,
            },
            dayHeader: {
              // width: 45,
              alignSelf: "center",
              color: "#000",
              fontSize: 12,
              textAlign: "center",
              fontFamily: "montserrat-bold",
            },
          },
          calendarBackground: "transparent",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#000",
          todayTextColor: "#FF9D00",
          dayTextColor: "#000",
          textDisabledColor: "#0002",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "#FF9D00",
          monthTextColor: "#000",
          textDayFontFamily: "montserrat-regular-english",
          textMonthFontFamily: "montserrat-bold",
          textDayHeaderFontFamily: "montserrat-bold",
          textDayFontSize: 17,
          textMonthFontSize: 18,
          // textDayHeaderFontSize: I18nManager.isRTL ? 8.5 : 12,
        }}
      />
    );
  }
}

DateRangePicker.defaultProps = {
  theme: { markColor: "#00adf5", markTextColor: "#ffffff" },
};