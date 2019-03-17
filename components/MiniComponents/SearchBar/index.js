import React, { Component } from "react";
import { Text, Icon, View, Input, Item, Button } from "native-base";
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class SearchBar extends Component {
  render() {
    return (
      <View searchBar>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={value => this.props.onSearch(value)}
          />
        </Item>
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
