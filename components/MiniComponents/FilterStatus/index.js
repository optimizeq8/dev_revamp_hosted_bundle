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
          value: "ACTIVE"
        }
      ]
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    this.props.onSearch({
      value: this.props.filterValue,
      selected: this.state.selected
    });
  }
  render() {
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}> Live </Text>

            <Button
              onPress={() =>
                this.setState({ selected: "ACTIVE" }, () =>
                  this._handleSubmit()
                )
              }
              style={
                this.state.selected === "ACTIVE"
                  ? styles.activebutton
                  : styles.inactivebutton
              }
            />
          </View>
          <View style={{ flexDirection: "column", paddingHorizontal: 40 }}>
            <Text style={styles.text}> Paused </Text>
            <Button
              onPress={() =>
                this.setState({ selected: "PAUSED" }, () =>
                  this._handleSubmit()
                )
              }
              style={
                this.state.selected === "PAUSED"
                  ? styles.activebutton
                  : styles.inactivebutton
              }
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}> All </Text>
            <Button
              onPress={() =>
                this.setState({ selected: "A" }, () => this._handleSubmit())
              }
              style={
                this.state.selected === "A"
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
  campaignList: state.auth.campaignList,
  filterValue: state.auth.filterValue
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actionCreators.filterCampaigns(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterStatus);