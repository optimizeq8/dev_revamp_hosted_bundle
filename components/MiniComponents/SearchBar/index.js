import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Icon, View, Input, Item, Button } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import CloseIcon from "../../../assets/SVGs/Close.svg";

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
    if (!this.props.transactionSearch) {
      this.props.onSearch({
        value: this.state.value,
        selected: this.props.filterStatus,
        dateRange: [
          this.props.campaignStartSearch,
          this.props.campaignEndSearch
        ]
      });
    } else {
      this.props.filterTransactions({
        value: this.state.value,
        dateRange: [this.props.tranStartSearch, this.props.tranEndSearch]
      });
    }
  }
  render() {
    return (
      <View>
        <View
          searchBar
          style={{
            marginHorizontal: 15
          }}
        >
          <Item
            rounded
            style={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              paddingHorizontal: 15
            }}
          >
            <SearchIcon width={18} height={18} stroke="#575757" />
            <Input
              placeholder="Search"
              onChangeText={value => {
                this.setState({ value: value }, () => this._handleSubmit());
              }}
            />
            {!this.props.transactionSearch && (
              <TouchableOpacity
                onPress={() => {
                  this.props.renderSearchBar();
                }}
              >
                <CloseIcon width={18} height={18} stroke="#C6C6C6" />
              </TouchableOpacity>
            )}
          </Item>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  campaignList: state.auth.campaignList,
  filterStatus: state.auth.filterStatus,
  campaignStartSearch: state.auth.campaignStartSearch,
  campaignEndSearch: state.auth.campaignEndSearch,
  tranStartSearch: state.transA.tranStartSearch,
  tranEndSearch: state.transA.tranEndSearch
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actionCreators.filterCampaigns(query)),
  filterTransactions: query =>
    dispatch(actionCreators.filterTransactions(query))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
