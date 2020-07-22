import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import split from "lodash/split";
import InputScrollView from "react-native-input-scroll-view";
import isEmpty from "lodash/isEmpty";
import * as Segment from "expo-analytics-segment";
import Picker from "../../../MiniComponents/Picker";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
import WebsiteField from "../../../MiniComponents/InputFieldNew/Website";

import LowerButton from "../../../MiniComponents/LowerButton";

//icons
import WebsiteIcon from "../../../../assets/SVGs/SwipeUps/Website";
import WindowIcon from "../../../../assets/SVGs/Window";

// Style
import styles from "../styles/swipeUpDestination.styles";
import GlobalStyles, { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";
import { netLoc } from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import * as actionCreators from "../../../../store/actions";
import segmentEventTrack from "../../../segmentEventTrack";

class Website extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        link: "",
        call_to_action:
          list[this.props.data["campaign_type"]][this.props.listNum]
            .call_to_action_list[0],
      },
      callActionLabel: "",
      networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions:
        list[this.props.data["campaign_type"]][this.props.listNum || 0]
          .call_to_action_list,
      urlError: "",
      inputCallToAction: false,
      callToActionError: null,
    };
  }

  componentDidMount() {
    if (this.props.mainBusiness) {
      const { websitelink, weburl } = this.props.mainBusiness;
      if (websitelink && websitelink !== "") {
        this.setState({
          campaignInfo: {
            link: websitelink,
            call_to_action:
              list[this.props.data["campaign_type"]][this.props.listNum]
                .call_to_action_list[0],
          },
        });
      } else if (weburl && weburl !== "") {
        this.setState({
          campaignInfo: {
            link: weburl.includes("https")
              ? weburl
              : `https://${weburl}.optimizeapp.com`,
            call_to_action:
              list[this.props.data["campaign_type"]][this.props.listNum]
                .call_to_action_list[0],
          },
        });
      }
    }
    if (
      this.props.data &&
      this.props.data.hasOwnProperty("link") &&
      this.props.data.link !== "" &&
      this.props.data.link !== "BLANK"
    ) {
      this.setState({
        campaignInfo: {
          link: this.props.data.link,
          call_to_action: this.props.data.call_to_action,
        },
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const urlError = validateWrapper("url", this.state.campaignInfo.link);
    this.setState({
      urlError,
    });
    if (urlError) {
      showMessage({
        message: translate(urlError),
        type: "warning",
        position: "top",
        duration: 7000,
      });
      return false;
    } else {
      return true;
    }
  };
  _handleSubmission = () => {
    if (!this.validateUrl()) {
      // segmentEventTrack("Error Submit Website SwipeUp", {
      //   campaign_website_url: this.state.campaignInfo.attachment,
      //   campaign_error_website_url: this.state.urlError
      // });
    }
    if (this.validateUrl()) {
      this.props.save_campaign_info_instagram({
        ...this.props.data,
        call_to_action: this.state.campaignInfo.call_to_action,
        link: this.state.campaignInfo.link,
      });
      // segmentEventTrack("Submitted Website SwipeUp Success", {
      //   campaign_website_url: this.state.campaignInfo.attachment
      // });
      const existingPost = this.props.navigation.getParam(
        "existingPost",
        false
      );
      this.props.navigation.navigate(
        existingPost
          ? "InstagramAdDesignExistingPost"
          : `${this.props.data.campaign_type}Design`
      );
    }
  };
  onSelectedCallToActionIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false,
    });
  };

  onSelectedCallToActionChange = (value) => {
    if (value && !isEmpty(value)) {
      // segmentEventTrack("Selected Website Call to Action", {
      //   campaign_call_to_action: value[0].label
      // });
      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            call_to_action: {
              label: value[0].label,
              value: value[0].value,
            },
          },
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
  };

  /**
   * Set website value
   */

  setWebsiteValue = (value) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        link: value,
      },
    });
  };
  openCallToActionModal = () => {
    this.setState({ inputCallToAction: true });
  };

  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <InputScrollView
        {...ScrollView.props}
        contentContainerStyle={[styles.websiteContent]}
      >
        <WebsiteIcon style={styles.icon} width={60} height={60} fill={"#FFF"} />
        <View style={[styles.textcontainer]}>
          <Text style={styles.titletext}>{translate("Website")}</Text>
          <Text style={styles.subtext}>
            {translate("The user will be taken to your website")}
          </Text>
        </View>

        <ModalField
          stateName={"callToAction"}
          setModalVisible={this.openCallToActionModal}
          modal={true}
          label={"call to action"}
          valueError={this.state.callToActionError}
          getValidInfo={this.getValidInfo}
          disabled={false}
          valueText={
            this.state.campaignInfo.call_to_action.label === "BLANK"
              ? "No Button"
              : this.state.campaignInfo.call_to_action.label
          }
          value={
            this.state.campaignInfo.call_to_action.label === "BLANK"
              ? "No Button"
              : this.state.campaignInfo.call_to_action.label
          }
          incomplete={false}
          translate={this.props.screenProps.translate}
          icon={WindowIcon}
          isVisible={this.state.inputCallToAction}
        />

        <WebsiteField
          stateName={"url"}
          customStyle={{ paddingHorizontal: 0, height: 60 }}
          screenProps={this.props.screenProps}
          website={this.state.campaignInfo.link}
          setWebsiteValue={this.setWebsiteValue}
          stateNameError={this.state.urlError}
          getValidInfo={this.validateUrl}
        />
        <LowerButton
          screenProps={this.props.screenProps}
          checkmark={true}
          bottom={0}
          function={this._handleSubmission}
        />

        <Picker
          showIcon={true}
          screenProps={this.props.screenProps}
          searchPlaceholderText={"Search Call To Action"}
          data={this.state.callactions}
          uniqueKey={"value"}
          displayKey={"label"}
          open={this.state.inputCallToAction}
          onSelectedItemsChange={this.onSelectedCallToActionIdChange}
          onSelectedItemObjectsChange={this.onSelectedCallToActionChange}
          selectedItems={[this.state.campaignInfo.call_to_action.value]}
          single={true}
          screenName={"Swipe up destination Website"}
          closeCategoryModal={this.closeCallToActionModal}
        />
      </InputScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.instagramAds.data,
  adType: state.instagramAds.adType,
  mainBusiness: state.account.mainBusiness,
});
const mapDispatchToProps = (dispatch) => ({
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),

  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Website);
