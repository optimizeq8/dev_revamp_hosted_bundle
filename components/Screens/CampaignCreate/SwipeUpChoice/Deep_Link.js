import React, { Component } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Content, Text, Container } from "native-base";
import AppConfirm from "../../../MiniComponents/AppConfirm";
import AppChoice from "../../../MiniComponents/AppChoice";
import CustomHeader from "../../../MiniComponents/Header";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

//Icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";

// Style
import styles from "./styles";

//Data
import list from "../../../Data/callactions.data";

//redux
import { connect } from "react-redux";
import * as actionsCreators from "../../../../store/actions";

class Deep_Link extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        deep_link_uri: "",
        icon_media_url: ""
      },
      data: [],
      androidData: [],
      media: "",
      callaction:
        this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list[0]
          : list.SnapAd[3].call_to_action_list[0],
      callactions:
        this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list
          : list.SnapAd[3].call_to_action_list,
      nameError: "",
      appError: "",
      android_app_urlError: "",
      deep_link_uriError: "",
      showList: false
    };
  }

  componentDidMount() {
    //this is for SnapAd rejection process
    if (this.props.rejCampaign && this.props.adType === "SnapAd") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.rejCampaign.attachment
        },
        callaction: this.props.rejCampaign.call_to_action
      });
    } else if (
      this.props.data &&
      this.props.adType !== "StoryAd" &&
      this.props.data.hasOwnProperty("attachment") &&
      (this.props.data.destination === "DEEP_LINK" ||
        this.props.data.destination === "COLLECTION")
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.data.attachment
        },
        callaction: this.props.data.call_to_action
      });
    } else if (this.props.storyAdAttachment.destination === "DEEP_LINK") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.storyAdAttachment.attachment
        },
        callaction: this.props.storyAdAttachment.call_to_action
      });
    }
  }

  handleCallaction = callaction => {
    this.setState({
      callaction
    });
  };
  selectApp = (
    nameError,
    callActionError,
    attachment,
    callaction,
    appChoice = null,
    iosApp_name,
    androidApp_name
  ) => {
    if (!nameError && !callActionError) {
      this.setState({
        attachment,
        callaction
      });
      this.props.save_campaign_info({ iosApp_name, androidApp_name });
    }
  };

  _handleSubmission = async deep_link_uri => {
    await this.setState({
      attachment: { ...this.state.attachment, deep_link_uri: deep_link_uri }
    });

    this.props._changeDestination(
      this.props.collectionAdLinkForm === 0 || !this.props.collectionAdLinkForm
        ? "DEEP_LINK"
        : "COLLECTION",
      this.state.callaction,
      this.state.attachment
    );
    this.props.navigation.navigate("AdDesign");
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        <Container style={[styles.container]}>
          {this.props.adType === "CollectionAd" && (
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              title={"Swipe Up destination"}
              navigation={this.props.navigation}
            />
          )}
          <Content
            style={styles.container}
            scrollEnabled={true}
            contentContainerStyle={[
              styles.deepLinkContainer,
              {
                alignItems: "center",
                // width: !this.props.toggleSideMenu ? "100%" : "100%",
                paddingHorizontal: !this.props.toggleSideMenu ? 30 : 20
              }
            ]}
          >
            <KeyboardShift style={styles.keyboardContainer}>
              {() => (
                <>
                  <View style={styles.deepLinkHeader}>
                    <AppInstallIcon style={styles.icon} />
                    <View style={styles.textcontainer}>
                      <Text style={styles.titletext}>
                        {translate("Deep Link")}
                      </Text>
                      <Text style={styles.subtext}>
                        {translate(
                          "Send Snapchatters to a specific page in your app"
                        )}
                      </Text>
                    </View>
                  </View>
                  <AppChoice
                    handleCallaction={this.handleCallaction}
                    navigation={this.props.navigation}
                    selectApp={this.selectApp}
                    listNum={3}
                    attachment={this.state.attachment}
                    callaction={this.state.callaction}
                    swipeUpDestination={this.props.swipeUpDestination}
                    deep_link_uri={this.state.attachment.deep_link_uri}
                    toggleSideMenu={this.props.toggleSideMenu}
                    _handleSubmission={this._handleSubmission}
                    deepLink={true}
                    screenProps={this.props.screenProps}
                  />
                </>
              )}
            </KeyboardShift>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign
});

const mapDispatchToProps = dispatch => ({
  save_campaign_info: info => dispatch(actionsCreators.save_campaign_info(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deep_Link);
