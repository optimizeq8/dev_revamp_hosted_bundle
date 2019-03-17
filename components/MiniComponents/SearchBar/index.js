import React, { Component } from "react";
import { Text, Icon, View, Input, Item, Button } from "native-base";
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "A",
      value: "",
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
      value: this.state.value,
      selected: this.state.selected
    });
  }
  render() {
    return (
      <View>
        <RadioGroup
          flexDirection="row"
          color="#5F5F5F"
          radioButtons={this.state.data}
          onPress={value => {
            var data = value.find(data => data.selected === true);
            this.setState({ selected: data.value }, () => this._handleSubmit());
          }}
        />
        <View searchBar>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={value => {
                this.setState({ value: value }, () => this._handleSubmit());
              }}
            />
          </Item>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  campaignList: state.auth.campaignList
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actionCreators.filterCampaigns(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
