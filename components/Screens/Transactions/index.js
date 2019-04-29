import React, { Component } from "react";
import * as actionCreators from "../../../store/actions";
import { Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Button } from "native-base";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import TransactionCard from "../../MiniComponents/TransactionCard";
import SearchBar from "../../MiniComponents/SearchBar";
import BackButton from "../../MiniComponents/BackButton";

//icons
import FilterIcon from "../../../assets/SVGs/Filter";
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import FilterMenu from "../../MiniComponents/FilterMenu";
import Sidemenu from "react-native-side-menu";

class Transactions extends Component {
  state = {
    sidemenustate: false,
    open: false
  };
  componentDidMount() {
    this.props.getTransactions();
  }
  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };
  render() {
    if (this.props.loading) return <LoadingScreen />;
    else {
      let menu = (
        <FilterMenu
          transactionFilter={true}
          _handleSideMenuState={this._handleSideMenuState}
          open={this.state.sidemenustate}
        />
      );
      let transList = this.props.filteredTransactions.map(transaction => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ));
      return (
        <Sidemenu
          onChange={isOpen => {
            if (isOpen === false) this._handleSideMenuState(isOpen);
          }}
          disableGestures={true}
          menu={menu}
          menuPosition="right"
          openMenuOffset={widthPercentageToDP("85%")}
          isOpen={this.state.sidemenustate}
        >
          <View style={styles.container}>
            <BackButton
              screenname="Transactions"
              navigation={this.props.navigation.goBack}
            />
            <Text style={globalStyles.title}>Transactions</Text>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: widthPercentageToDP(5)
              }}
            >
              <View style={{ flex: 1, zIndex: 10 }}>
                <SearchBar transactionSearch={true} />
              </View>
              <Button
                style={styles.activebutton}
                onPress={() => {
                  this._handleSideMenuState(true);
                }}
              >
                <FilterIcon width={23} height={23} fill="#575757" />
              </Button>
            </View>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: heightPercentageToDP(30),
                marginBottom: heightPercentageToDP(50)
              }}
            >
              {transList}
            </ScrollView>
          </View>
        </Sidemenu>
      );
    }
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loading: state.transA.loading,
  mainBusiness: state.auth.mainBusiness,
  transactionList: state.transA.transactionList,
  filteredTransactions: state.transA.filteredTransactions
});

const mapDispatchToProps = dispatch => ({
  onSelect: query => dispatch(actionCreators.filterCampaignsStatus(query)),
  getTransactions: () => dispatch(actionCreators.getTransactions())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
