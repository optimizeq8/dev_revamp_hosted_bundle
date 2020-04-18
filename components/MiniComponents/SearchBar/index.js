import React, { Component } from "react";
import { TouchableOpacity, I18nManager } from "react-native";
import { View, Input, Item } from "native-base";
// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Styles
import styles from "./styles";
import rtlStyles from "./rtlStyles";

// Icons
import SearchIcon from "../../../assets/SVGs/Search";
import CloseIcon from "../../../assets/SVGs/Close";
import isStringArabic from "../../isStringArabic";
import globalStyles from "../../../GlobalStyles";

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
      if (reset) this.setState({ value: "" });
      this.props.filterBusinesses(reset ? "" : this.state.value);
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
    let {
      height,
      businessList,
      transactionSearch,
      customInputStyle,
      strokeColor
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View
        searchBar
        style={[styles.searchBarView, { height: height ? height : "70%" }]}
      >
        <Item rounded style={[styles.searchBarItem, customInputStyle]}>
          <SearchIcon
            width={20}
            height={20}
            stroke={strokeColor ? strokeColor : "#fff"}
          />
          <Input
            style={[
              I18nManager.isRTL
                ? rtlStyles.searchBarInput
                : styles.searchBarInput,
              businessList &&
                !isStringArabic(
                  translate(`Search ads`)
                    ? {
                        fontFamily: "montserrat-regular-english"
                      }
                    : {}
                ),
              {
                color: transactionSearch
                  ? "#FFF"
                  : !businessList
                  ? globalStyles.darkGrayTextColor.color
                  : "#000"
              }
            ]}
            placeholder={translate(
              `Search ${
                businessList
                  ? "businesses"
                  : transactionSearch
                  ? "transactions"
                  : "campaigns"
              }`
            )}
            placeholderTextColor={
              transactionSearch
                ? "#rgba(255,255,255,0.4)"
                : !businessList
                ? "#fff"
                : "#000"
            }
            value={this.state.value}
            onChangeText={value => {
              this.setState({ value: value }, () => this._handleSubmit());
            }}
          />
          {!transactionSearch && (
            <TouchableOpacity
              onPress={() => {
                this._handleSubmit(true);
                !businessList && this.props.renderSearchBar();
              }}
            >
              <CloseIcon width={18} height={18} stroke="#FFF" />
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
