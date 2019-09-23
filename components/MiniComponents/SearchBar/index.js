import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Input, Item } from "native-base";
import { isRTL } from "expo-localization";

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Styles
import styles from "./styles";
import rtlStyles from "./rtlStyles";

// Icons
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
  }

  _handleSubmit = (reset = false) => {
    if (this.props.transactionSearch) {
      if (reset) this.setState({ value: "" });
      this.props.filterTransactions({
        value: reset ? "" : this.state.value,
        dateRange: [this.props.tranStartSearch, this.props.tranEndSearch]
      });
    } else if (this.props.businessList) {
      this.props.filterBusinesses(this.state.value);
    } else {
      if (reset) this.setState({ value: "" });
      this.props.onSearch({
        value: reset ? "" : this.state.value,
        selected: this.props.filterStatus ? this.props.filterStatus : "A",
        dateRange: [
          this.props.campaignStartSearch,
          this.props.campaignEndSearch
        ]
      });
    }
  };
  render() {
    let { height, businessList } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View
        searchBar
        style={[styles.searchBarView, { height: height ? height : "70%" }]}
      >
        <Item rounded style={styles.searchBarItem}>
          <SearchIcon width={18} height={18} stroke="#575757" />
          <Input
            style={isRTL ? rtlStyles.searchBarInput : styles.searchBarInput}
            placeholder={translate(
              `Search ${businessList ? "businesses" : "ads"}`
            )}
            value={this.state.value}
            onChangeText={value => {
              this.setState({ value: value }, () => this._handleSubmit());
            }}
          />
          {!this.props.transactionSearch && (
            <TouchableOpacity
              onPress={() => {
                this._handleSubmit(true);
                !businessList && this.props.renderSearchBar();
              }}
            >
              <CloseIcon width={18} height={18} stroke="#C6C6C6" />
            </TouchableOpacity>
          )}
        </Item>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  campaignList: state.dashboard.campaignList,
  filterStatus: state.dashboard.filterStatus,
  campaignStartSearch: state.dashboard.campaignStartSearch,
  campaignEndSearch: state.dashboard.campaignEndSearch,
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
