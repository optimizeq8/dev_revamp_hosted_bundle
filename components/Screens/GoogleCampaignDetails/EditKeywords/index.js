import React, { Component } from "react";
import {
  View,
  Image as RNImage,
  Animated,
  BackHandler,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from "react-native";
import {
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Button
} from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import Header from "../../../MiniComponents/Header";
import KeywordsSelectionList from "../../../MiniComponents/KeywordsSelectionList";
import * as actionCreators from "../../../../store/actions";
import LowerButton from "../../../MiniComponents/LowerButton";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

// Style
import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../../GlobalStyles";

import isUndefined from "lodash/isUndefined";

class EditKeywords extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      keywords: []
    };
  }
  componentDidMount() {
    let keywords = this.props.selectedCampaign.keywords.map(k => k.keyword);
    console.log("keywords", keywords);

    this.setState({
      keywords: keywords
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  _handleAddKeyword = keyword => {
    if (keyword === "Reset") {
      this.setState({ keywords: [] });
      return;
    }
    var res = this.state.keywords.filter(l => l !== keyword);
    if (isUndefined(this.state.keywords.find(l => l === keyword))) {
      this.setState({ keywords: [...res, keyword] });
    } else {
      this.setState({ keywords: res });
    }
  };

  _handleSubmission = () => {

    const keywordsError =
      this.state.keywords.length === 0
        ? "Please choose keywords for your product."
        : null;
    if (!keywordsError) {
      this.props.update_google_keywords({
        businessid: this.props.mainBusiness.businessid,
        campaign_id: this.props.selectedCampaign.campaign.campaign_id,
        keywords: this.state.keywords
      });
    } else {
      showMessage({
        message: keywordsError,
        type: "warning",
        position: "top"
      });
    }
  };

  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <View
              style={[
                styles.gradient,
                {
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 30,
                  overflow: "hidden"
                }
              ]}
            >
              <LinearGradient
                colors={["#6200FF", "#8900FF"]}
                locations={[1, 0.3]}
                style={styles.gradient}
              />
            </View>
            <Header
              screenProps={this.props.screenProps}
              closeButton={false}
              translateTitle={false}
              title={this.props.selectedCampaign.campaign.name}
              icon={"google"}
              navigation={this.props.navigation}
              titelStyle={{
                textAlign: "left",
                fontSize: 15,
                paddingTop: 3,
                alignSelf: "center",
                justifyContent: "center",
                flex: 1,
                alignItems: "center"
              }}
            />
            <KeywordsSelectionList
              screenProps={this.props.screenProps}
              _handleSearch={this.props.get_google_SE_keywords}
              loading={this.props.campaign.loading}
              _handleAddItem={this._handleAddKeyword}
              selected={this.state.keywords}
              data={this.props.campaign.fetchedKeywords}
              campaign_id={this.props.selectedCampaign.campaign.campaign_id}
              businessid={this.props.mainBusiness.businessid}
            />
            {/* <TouchableOpacity
              // disabled={this.props.country_code === ""}
              style={styles.keywordsAddButton}
              onPress={() => this._renderSideMenu("keywords")}
            >
            </TouchableOpacity> */}
            {this.props.campaign.uploading ? (
              <ForwardLoading
                mainViewStyle={{ width: wp(9), height: hp(9) }}
                bottom={5}
                style={{ width: wp(7), height: hp(7) }}
              />
            ) : (
              <LowerButton function={() => this._handleSubmission()} />
            )}
          </Container>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds
});

const mapDispatchToProps = dispatch => ({
  update_google_keywords: info =>
    dispatch(actionCreators.update_google_keywords(info)),
  get_google_SE_keywords: (keyword, campaign_id, businessid) =>
    dispatch(
      actionCreators.get_google_SE_keywords(keyword, campaign_id, businessid)
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(EditKeywords);
