import React, { Component } from "react";
import { View, ScrollView, BackHandler } from "react-native";
import { Button, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import Sidemenu from "react-native-side-menu";
import { widthPercentageToDP } from "react-native-responsive-screen";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import LoadingScreen from "../../MiniComponents/LoadingScreen";
import TransactionCard from "../../MiniComponents/TransactionCard";
import SearchBar from "../../MiniComponents/SearchBar";
import Header from "../../MiniComponents/Header";
import FilterMenu from "../../MiniComponents/FilterMenu";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

//icons
import FilterIcon from "../../../assets/SVGs/Filter";

//Styles
import styles from "./styles";

class Transactions extends Component {
  state = {
    sidemenustate: false,
    open: false
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    this.props.getTransactions();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };
  render() {
    if (this.props.errorTransactionList) {
      return <ErrorComponent navigation={this.props.navigation} />;
    } else if (this.props.loading) return <LoadingScreen dash={true} top={0} />;
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
        <SafeAreaView
          style={styles.safeAreaContainer}
          forceInset={{ bottom: "never" }}
        >
          <Container style={styles.container}>
            <Sidemenu
              onChange={isOpen => {
                if (isOpen === false) this._handleSideMenuState(isOpen);
              }}
              disableGestures={true}
              menu={this.state.sidemenustate ? menu : null}
              menuPosition="right"
              openMenuOffset={widthPercentageToDP("85%")}
              isOpen={this.state.sidemenustate}
            >
              <Header
                title={"Transactions"}
                navigation={this.props.navigation}
              />
              <View style={styles.mainContainer}>
                <View style={styles.headerBlock}>
                  <View style={styles.searchContainer}>
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
                <ScrollView contentContainerStyle={styles.contentContainer}>
                  {transList}
                </ScrollView>
              </View>
            </Sidemenu>
          </Container>
        </SafeAreaView>
      );
    }
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loading: state.transA.loading,
  mainBusiness: state.account.mainBusiness,
  transactionList: state.transA.transactionList,
  filteredTransactions: state.transA.filteredTransactions,
  errorTransactionList: state.transA.errorTransactionList
});

const mapDispatchToProps = dispatch => ({
  onSelect: query => dispatch(actionCreators.filterCampaignsStatus(query)),
  getTransactions: () => dispatch(actionCreators.getTransactions())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
