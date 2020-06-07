import React, { Component } from "react";
import {
  View,
  BackHandler,
  Text,
  I18nManager,
  TouchableOpacity,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView, NavigationEvents, FlatList } from "react-navigation";
import Sidemenu from "../../MiniComponents/SideMenu";
import * as Segment from "expo-analytics-segment";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import TransactionCard from "../../MiniComponents/TransactionCard";
import SearchBar from "../../MiniComponents/SearchBar";
import CustomHeader from "../../MiniComponents/Header";
// import FilterMenu from "../../MiniComponents/FilterMenu";
let FilterMenu = null;
import ErrorComponent from "../../MiniComponents/ErrorComponent";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import FilterIcon from "../../../assets/SVGs/Filter";

//Styles
import styles from "./styles";

//Functions
import { widthPercentageToDP } from "react-native-responsive-screen";

class Transactions extends Component {
  state = {
    sidemenustate: false,
    open: false,
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    // Segment.screenWithProperties("Transactions List", {
    //   category: "User Menu"
    // });
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_transactions`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    this.props.getTransactions();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  _handleSideMenuState = (status) => {
    this.setState({ sidemenustate: status });
    FilterMenu = require("../../MiniComponents/FilterMenu").default;
  };

  renderTransactionCard = ({ item }) => (
    <TransactionCard
      key={item.payment_id}
      transaction={item}
      screenProps={this.props.screenProps}
    />
  );
  render() {
    const { translate } = this.props.screenProps;
    if (this.props.errorTransactionList) {
      return (
        <ErrorComponent
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
    } else if (this.props.loading || !this.props.filteredTransactions)
      return <LoadingScreen dash={true} top={0} />;
    else {
      let menu = FilterMenu ? (
        <FilterMenu
          screenProps={this.props.screenProps}
          transactionFilter={true}
          _handleSideMenuState={this._handleSideMenuState}
          open={this.state.sidemenustate}
        />
      ) : null;
      return (
        <Sidemenu
          onChange={(isOpen) => {
            if (isOpen === false) this._handleSideMenuState(isOpen);
          }}
          disableGestures={true}
          menu={this.state.sidemenustate ? menu : null}
          menuPosition={I18nManager.isRTL ? "left" : "right"}
          openMenuOffset={widthPercentageToDP("85%")}
          isOpen={this.state.sidemenustate}
        >
          <SafeAreaView
            style={styles.safeAreaContainer}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <CustomHeader
              screenProps={this.props.screenProps}
              title={"Transactions"}
              navigation={this.props.navigation}
              segment={{
                source: "open_transactions",
                source_action: "a_go_back",
              }}
            />
            <View style={styles.mainContainer}>
              <View style={styles.headerBlock}>
                <View style={styles.searchContainer}>
                  <SearchBar
                    screenProps={this.props.screenProps}
                    transactionSearch={true}
                    customInputStyle={{
                      backgroundColor: "#0004",
                    }}
                  />
                </View>
                {this.props.filteredTransactions.length !== 0 && (
                  <TouchableOpacity
                    style={styles.activebutton}
                    onPress={() => {
                      this._handleSideMenuState(true);
                    }}
                  >
                    <FilterIcon width={30} height={30} fill="#FFF" />
                  </TouchableOpacity>
                )}
              </View>
              {this.props.filteredTransactions.length === 0 && (
                <Text style={styles.noTranText}>
                  {translate("No transactions available")}
                </Text>
              )}
              <FlatList
                renderItem={this.renderTransactionCard}
                data={this.props.filteredTransactions}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.payment_id}
              />
            </View>
          </SafeAreaView>
        </Sidemenu>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loading: state.transA.loading,
  mainBusiness: state.account.mainBusiness,
  transactionList: state.transA.transactionList,
  filteredTransactions: state.transA.filteredTransactions,
  errorTransactionList: state.transA.errorTransactionList,
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: (query) => dispatch(actionCreators.filterCampaignsStatus(query)),
  getTransactions: () => dispatch(actionCreators.getTransactions()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
