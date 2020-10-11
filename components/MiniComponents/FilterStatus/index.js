import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import styles from "./styles";

class FilterStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "A",
      data: [
        {
          label: "All",
          value: "A",
        },
        {
          label: "Paused",
          value: "PAUSED",
        },
        {
          label: "Active",
          value: "LIVE",
        },
      ],
    };
  }

  // _handleSubmission = () => {
  //   this.props.onSearch({
  //     value: this.props.filterValue,
  //     selected: this.state.selected,
  //     dateRange: [this.props.campaignStartSearch, this.props.campaignEndSearch]
  //   });
  // };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.mainViewFilterStatus}>
        <View style={styles.flexDirectionCol}>
          <Text style={styles.text}> {translate("Active")} </Text>

          <Button
            onPress={() =>
              this.setState({ selected: "LIVE" }, () =>
                this.props._handleSubmission(this.state.selected, true)
              )
            }
            style={
              this.props.selected === "LIVE"
                ? styles.activeButton
                : styles.inactiveButton
            }
          />
        </View>
        <View style={[styles.flexDirectionCol, styles.middleBlock]}>
          <Text style={styles.text}> {translate("Inactive")} </Text>
          <Button
            onPress={() =>
              this.setState({ selected: "PAUSED" }, () =>
                this.props._handleSubmission(this.state.selected, true)
              )
            }
            style={
              this.props.selected === "PAUSED"
                ? styles.activeButton
                : styles.inactiveButton
            }
          />
        </View>
        <View style={styles.flexDirectionCol}>
          <Text style={styles.text}> {translate("All")} </Text>
          <Button
            onPress={() =>
              this.setState({ selected: "A" }, () =>
                this.props._handleSubmission(this.state.selected, true)
              )
            }
            style={
              this.props.selected === "A"
                ? styles.activeButton
                : styles.inactiveButton
            }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaignList: state.dashboard.campaignList,
  campaignStartSearch: state.dashboard.campaignStartSearch,
  campaignEndSearch: state.dashboard.campaignEndSearch,
  filterValue: state.dashboard.filterValue,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => dispatch(actionCreators.filterCampaigns(query)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterStatus);
