import React, { Component } from "react";
import { TouchableOpacity, I18nManager } from "react-native";
import { View, Input, Item } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
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
          value: "A",
        },
        {
          label: "Paused",
          value: "PAUSED",
        },
        {
          label: "Active",
          value: "ACTIVE",
        },
      ],
    };
  }

  _handleSubmit = (reset = false) => {
    if (this.props.transactionSearch) {
      if (reset) this.setState({ value: "" });
      this.props.filterTransactions(
        {
          value: reset ? "" : this.state.value,
          dateRange: [this.props.tranStartSearch, this.props.tranEndSearch],
        },
        this.props.source,
        "a_search"
      );
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
          this.props.campaignEndSearch,
        ],
      });
    }
  };
  render() {
    let {
      height,
      businessList,
      transactionSearch,
      customInputStyle,
      strokeColor,
      customSearchBarStyle,
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View
        style={[
          styles.searchBarView,
          customSearchBarStyle,
          { height: height ? height : "70%" },
        ]}
      >
        <Item rounded style={[styles.searchBarItem, customInputStyle]}>
          <SearchIcon
            width={RFValue(10, 414)}
            height={RFValue(10, 414)}
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
                        fontFamily: "montserrat-regular-english",
                      }
                    : {}
                ),
              {
                color: transactionSearch
                  ? "#FFF"
                  : !businessList
                  ? "#000"
                  : "#000",
              },
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
                ? "#rgba(255,255,255,1)"
                : !businessList
                ? "#000"
                : "#000"
            }
            value={this.state.value}
            onChangeText={(value) => {
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
              <CloseIcon
                width={RFValue(9, 414)}
                height={RFValue(9, 414)}
                stroke={transactionSearch ? "#FFF" : "#909090"}
              />
            </TouchableOpacity>
          )}
        </Item>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  filterStatus: state.dashboard.filterStatus,
  campaignStartSearch: state.dashboard.campaignStartSearch,
  campaignEndSearch: state.dashboard.campaignEndSearch,
  tranStartSearch: state.transA.tranStartSearch,
  tranEndSearch: state.transA.tranEndSearch,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => dispatch(actionCreators.filterCampaigns(query)),
  filterTransactions: (query, source, source_action) =>
    dispatch(actionCreators.filterTransactions(query, source, source_action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
