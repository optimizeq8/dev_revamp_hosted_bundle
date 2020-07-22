import React, { Component } from "react";
import {
  View,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Container } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import analytics from "@segment/analytics-react-native";
import { showMessage } from "react-native-flash-message";

//components
import Header from "../../../MiniComponents/Header";
import KeywordsSelectionList from "../../../MiniComponents/KeywordsSelectionList";
import EditModal from "./EditModal";
// functions
import * as actionCreators from "../../../../store/actions";
import segmentEventTrack from "../../../segmentEventTrack";

// icons
import LowerButton from "../../../MiniComponents/LowerButton";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";

// Style
import styles from "./styles";
import isUndefined from "lodash/isUndefined";

class EditKeywords extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      modalVisible: false,
    };
  }
  componentDidMount() {
    let keywords = this.props.selectedCampaign.keywords.map((k) => k.keyword);
    this.setState({
      keywords: keywords,
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
  _handleAddKeyword = (keyword) => {
    if (keyword === "Reset") {
      segmentEventTrack("Reset button keyword selected");
      this.setState({ keywords: [] });
      return;
    }
    var res = this.state.keywords.filter((l) => l !== keyword);
    if (isUndefined(this.state.keywords.find((l) => l === keyword))) {
      segmentEventTrack("Selected Campaign keywords", {
        campaign_keywords: [...res, keyword],
      });
      this.setState({ keywords: [...res, keyword] });
    } else {
      segmentEventTrack("Selected Campaign keywords", {
        campaign_keywords: res,
      });
      this.setState({ keywords: res });
    }
  };

  handleModalToggle = () => {
    analytics.track(`ad_edit_modal`, {
      visible: !this.state.modalVisible,
      source: "ad_keywords",
      source_action: "a_toggle_modal",
    });
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    const keywordsError =
      this.state.keywords.length === 0
        ? "Please choose keywords for your product"
        : null;
    if (!keywordsError) {
      const segmentInfo = {
        campaign_id: this.props.selectedCampaign.campaign.id,
        campaign_keywords: this.state.keywords,
        source: "ad_keywords",
        source_action: "a_update_ad_keywords",
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
      };
      /**
       * if it was navigated from the AdDesign screen through a rejection review process
       * adData will be part of the navigation params
       */
      AdData = this.props.navigation.getParam("adData", {});
      this.props.update_google_keywords(
        {
          businessid: this.props.mainBusiness.businessid,
          id: this.props.selectedCampaign.campaign.id,
          keywords: this.state.keywords,
          completed: true,
          ...AdData,
        },
        segmentInfo
      );
    } else {
      analytics.track(`a_error_form`, {
        error_page: "ad_keywords",
        error_description: keywordsError,
        source: "ad_targeting",
        source_action: "a_update_ad_keywords",
      });
      showMessage({
        message: translate(keywordsError),
        type: "warning",
        position: "top",
      });
    }
  };
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.prevAppState
    );

    analytics.track(`ad_keywords`, {
      source,
      source_action,
      campaign_keywords: this.props.selectedCampaign.keywords.map(
        (k) => k.keyword
      ),
    });
  };
  render() {
    let rejected = this.props.navigation.getParam("rejected", false);
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <View
              style={[
                styles.gradient,
                {
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 30,
                  overflow: "hidden",
                },
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
              segment={{
                source: "ad_keywords",
                source_action: "a_go_back",
              }}
              navigation={!rejected ? this.props.navigation : undefined}
              actionButton={rejected && this.handleModalToggle}
              titleStyle={{
                textAlign: "left",
                fontSize: 15,
                paddingTop: 3,
                alignSelf: "center",
                justifyContent: "center",
                flex: 1,
                alignItems: "center",
              }}
            />
            <KeywordsSelectionList
              screenProps={this.props.screenProps}
              _handleSearch={this.props.get_google_SE_keywords}
              loading={this.props.campaign.loading}
              _handleAddItem={this._handleAddKeyword}
              selected={this.state.keywords}
              data={this.props.campaign.fetchedKeywords}
              campaign_id={this.props.selectedCampaign.campaign.id}
              businessid={this.props.mainBusiness.businessid}
              source={"ad_keywords"}
            />
            {this.props.campaign.uploading ? (
              <ForwardLoading
                mainViewStyle={{ width: wp(9), height: hp(9) }}
                bottom={5}
                style={{ width: wp(7), height: hp(7) }}
              />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                function={this._handleSubmission}
              />
            )}
          </Container>
        </TouchableWithoutFeedback>
        {this.state.modalVisible && (
          <EditModal
            handleModalToggle={this.handleModalToggle}
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
});

const mapDispatchToProps = (dispatch) => ({
  update_google_keywords: (info, segmentInfo) =>
    dispatch(actionCreators.update_google_keywords(info, segmentInfo)),
  get_google_SE_keywords: (keyword, campaign_id, businessid, segmentInfo) =>
    dispatch(
      actionCreators.get_google_SE_keywords(
        keyword,
        campaign_id,
        businessid,
        segmentInfo
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditKeywords);
