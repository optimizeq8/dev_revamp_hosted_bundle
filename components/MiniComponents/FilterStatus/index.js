import React, { Component } from "react";
import { Text, Icon, View, Input, Item, Button } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class FilterStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "A",
      data: [
        {
          label: "All",
          value: "A"
        },
        {
          label: "Paused",
          value: "PAUSED"
        },
        {
          label: "Active",
          value: "LIVE"
        }
      ]
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
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}> Active </Text>

            <Button
              onPress={() =>
                this.setState({ selected: "LIVE" }, () =>
                  this.props._handleSubmission(this.state.selected, true)
                )
              }
              style={
                this.props.selected === "LIVE"
                  ? styles.activebutton
                  : styles.inactivebutton
              }
            />
          </View>
          <View style={{ flexDirection: "column", paddingHorizontal: 40 }}>
            <Text style={styles.text}> Inactive </Text>
            <Button
              onPress={() =>
                this.setState({ selected: "PAUSED" }, () =>
                  this.props._handleSubmission(this.state.selected, true)
                )
              }
              style={
                this.props.selected === "PAUSED"
                  ? styles.activebutton
                  : styles.inactivebutton
              }
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}> All </Text>
            <Button
              onPress={() =>
                this.setState({ selected: "A" }, () =>
                  this.props._handleSubmission(this.state.selected, true)
                )
              }
              style={
                this.props.selected === "A"
                  ? styles.activebutton
                  : styles.inactivebutton
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  campaignList: state.dashboard.campaignList,
  campaignStartSearch: state.dashboard.campaignStartSearch,
  campaignEndSearch: state.dashboard.campaignEndSearch,
  filterValue: state.dashboard.filterValue
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actionCreators.filterCampaigns(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterStatus);
