import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  I18nManager
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Item, Input, Icon, Button } from "native-base";
import { showMessage } from "react-native-flash-message";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import * as Segment from "expo-analytics-segment";
import Picker from "../../../MiniComponents/Picker";
import LowerButton from "../../../MiniComponents/LowerButton";

//icons
import WebsiteIcon from "../../../../assets/SVGs/SwipeUps/Website";

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
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        link: "",
        call_to_action: list.InstagramFeedAd[0].call_to_action_list[0]
      },
      callActionLabel: "",
      networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions:
        list[this.props.data["campaign_type"]][0].call_to_action_list,
      urlError: "",
      inputCallToAction: false
    };
  }

  componentDidMount() {
    if (
      this.props.data &&
      this.props.data.hasOwnProperty("link") &&
      this.props.data.link !== ""
    ) {
      const url = split(this.props.data.link, "://");
      this.setState({
        campaignInfo: {
          link: url[1],
          call_to_action: this.props.data.call_to_action
        },
        networkString: url[0] + "://"
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
    const urlError = validateWrapper(
      "url",
      this.state.networkString + this.state.campaignInfo.link
    );
    this.setState({
      urlError
    });
    if (urlError) {
      showMessage({
        message: translate(urlError),
        type: "warning",
        position: "top",
        duration: 7000
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
        link: this.state.networkString + this.state.campaignInfo.link
      });
      // segmentEventTrack("Submitted Website SwipeUp Success", {
      //   campaign_website_url: this.state.campaignInfo.attachment
      // });
      this.props.navigation.navigate(`${this.props.data.campaign_type}Design`);
    }
  };
  onSelectedCallToActionIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false
    });
  };

  onSelectedCallToActionChange = value => {
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
              value: value[0].value
            }
          }
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={[styles.websiteContent]}>
        <WebsiteIcon style={styles.icon} width={60} height={60} />
        <View style={[styles.textcontainer]}>
          <Text style={styles.titletext}>{translate("Website")}</Text>
          <Text style={styles.subtext}>
            {translate("The user will be taken to your website")}
          </Text>
        </View>

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
        <View>
          <View style={[styles.callToActionLabelView]}>
            <Text uppercase style={[styles.inputLabel]}>
              {translate("call to action")}
            </Text>
          </View>
          <Item
            // rounded
            style={[styles.input, { paddingHorizontal: 30 }]}
            onPress={() => {
              // segmentEventTrack(
              //   "Button Clicked to open Call to action Modal"
              // );
              this.setState({ inputCallToAction: true }, () => {
                // if (this.state.inputCallToAction) {
                //   Segment.screen("Call to Action Modal");
                // }
              });
            }}
          >
            <Text style={styles.callActionLabel}>
              {this.state.campaignInfo.call_to_action.label}
            </Text>
            <Icon
              type="AntDesign"
              name="down"
              style={{ color: "#fff", fontSize: 20, left: 25 }}
            />
          </Item>
        </View>

        <View style={styles.topContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.websiteView}>
              <View style={[styles.websiteLabelView]}>
                <Text uppercase style={[styles.inputLabel]}>
                  {translate("Website")}
                </Text>
              </View>
              <Item
                style={[
                  styles.input
                  // this.state.urlError
                  //     ? GlobalStyles.redBorderColor
                  //     : GlobalStyles.transparentBorderColor
                ]}
              >
                <TouchableOpacity
                  style={[
                    GlobalStyles.orangeBackgroundColor,
                    {
                      borderRadius: 30,
                      width: 54,
                      height: 54,
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  ]}
                  onPress={() => {
                    if (this.state.networkString === "https://") {
                      this.setState(
                        {
                          networkString: "http://"
                        }
                        // () => {
                        //   segmentEventTrack(
                        //     "Changed SwipeUp Website network string",
                        //     {
                        //       campaign_website_network_string: this
                        //         .state.networkString
                        //     }
                        //   );
                        // }
                      );
                    } else {
                      this.setState(
                        {
                          networkString: "https://"
                        }
                        // () => {
                        //   segmentEventTrack(
                        //     "Changed SwipeUp Website network string",
                        //     {
                        //       campaign_website_network_string: this
                        //         .state.networkString
                        //     }
                        //   );
                        // }
                      );
                    }
                  }}
                >
                  <Text uppercase style={styles.networkLabel}>
                    {this.state.networkString === "https://" ? "https" : "http"}
                  </Text>
                  <Text uppercase style={styles.networkLabel}>
                    {`< >`}
                  </Text>
                </TouchableOpacity>
                <Input
                  style={[
                    styles.inputtext,
                    I18nManager.isRTL
                      ? { textAlign: "right" }
                      : { textAlign: "left" }
                  ]}
                  placeholder={translate(`Enter your website's URL`)}
                  placeholderTextColor={globalColors.white}
                  value={this.state.campaignInfo.link}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      campaignInfo: {
                        ...this.state.campaignInfo,
                        link: value
                      }
                    })
                  }
                  onBlur={async () => {
                    // segmentEventTrack(
                    //   "Changed Website URL attachment",
                    //   {
                    //     campaign_website_url_attachment: this.state
                    //       .campaignInfo.attachment
                    //   }
                    // );
                    const valid = await this.validateUrl();
                    // if (!valid) {
                    //   segmentEventTrack("Error blur input Website", {
                    //     campaign_error_website_url: this.state.urlError
                    //   });
                    // }
                  }}
                />
              </Item>
            </View>
          </View>
        </View>

        <LowerButton
          checkmark={true}
          bottom={0}
          function={this._handleSubmission}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.instagramAds.data,
  adType: state.instagramAds.adType
});
const mapDispatchToProps = dispatch => ({
  save_campaign_info_instagram: info =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),

  saveCampaignSteps: step =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(Website);
