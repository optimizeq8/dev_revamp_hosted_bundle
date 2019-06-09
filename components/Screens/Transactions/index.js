import React, { Component } from "react";
import * as actionCreators from "../../../store/actions";
import { Text, View, ScrollView, BackHandler } from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { Button } from "native-base";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import TransactionCard from "../../MiniComponents/TransactionCard";
import SearchBar from "../../MiniComponents/SearchBar";
import BackButton from "../../MiniComponents/BackButton";
import Header from "../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";

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
import { colors } from "../../GradiantColors/colors";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

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
    } else if (this.props.loading)
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
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
          menu={this.state.sidemenustate ? menu : null}
          menuPosition="right"
          openMenuOffset={widthPercentageToDP("85%")}
          isOpen={this.state.sidemenustate}
        >
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "#0000" }}
            forceInset={{ bottom: "never" }}
          >
            <Header title={"Transactions"} navigation={this.props.navigation} />
            <View style={styles.container}>
              {/* <BackButton
              screenname="Transactions"
              navigation={this.props.navigation.goBack}
            />
            <Text style={globalStyles.title}>Transactions</Text> */}
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
              <ScrollView contentContainerStyle={styles.contentContainer}>
                {transList}
              </ScrollView>
            </View>
          </SafeAreaView>
        </Sidemenu>
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
