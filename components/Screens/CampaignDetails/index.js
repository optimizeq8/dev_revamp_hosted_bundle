import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  BackHandler,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Clipboard from "@react-native-clipboard/clipboard";
import { Container, Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import Header from "../../MiniComponents/Header";
import { NavigationEvents, ScrollView } from "react-navigation";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import SafeAreaView from "react-native-safe-area-view";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import StatusModal from "./StatusModal";
import Toggle from "../../MiniComponents/Toggle";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import SlideUpPanel from "./SlideUpPanel";
import RejectedSnapchatInfo from "./RejectedInfoComp/RejectedSnapchatInfo";

//icons
import LocationIcon from "../../../assets/SVGs/Location";
import GenderIcon from "../../../assets/SVGs/Gender";
import CopyIcon from "../../../assets/SVGs/CopyIcon";

// Style
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
//Functions
import dateFormat from "dateformat";

//Data
import { country_regions as regionsCountries } from "../../Screens/CampaignCreate/AdDetails/data";
import countries from "../../Screens/CampaignCreate/AdDetails/data";
import { interestNames } from "./interesetNames";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import MediaBox from "./MediaBox";
import CampaignCircleChart from "../../MiniComponents/CampaignCircleCharts";
import CampaignMedia from "./CampaignMedia";
import AudienceOverview from "../../MiniComponents/AudienceOverview";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import ChartDateChoices from "./ChartDateChoices";
import CSVModal from "./CSVModal";
import { showMessage } from "react-native-flash-message";

class CampaignDetails extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      start_time: "",
      end_time: "",
      modalVisible: false,
      toggle: false,
      toggleText: "",
      chartAnimation: new Animated.Value(0),
      LineAnimation: new Animated.Value(0),
      imageIsLoading: true,
      expand: false,
      minHeight: 0,
      maxHeight: heightPercentageToDP(50),
      CSVModalVisible: false,
    };
  }

  componentDidMount() {
    this.props.get_languages();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedCampaign !== this.props.selectedCampaign &&
      this.props.selectedCampaign
    ) {
      this.setState({
        toggleText: this.props.selectedCampaign.status,
        toggle: this.props.selectedCampaign.status !== "PAUSED",
      });
    }
  }
  // need to ask
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.selectedCampaign.campaign_id !==
        nextProps.selectedCampaign.campaign_id ||
      this.props.selectedCampaign.eCPSU !== nextProps.selectedCampaign.eCPSU ||
      this.props.loading !== nextProps.loading ||
      this.props.languagesListLoading !== nextProps.languagesListLoading ||
      JSON.stringify(this.state) !== JSON.stringify(nextState) ||
      this.props.campaignEnded !== nextProps.campaignEnded
    );
  }

  handleStartDatePicked = (date) => {
    analytics.track(`Form Populated`, {
      form_type: "Snapchat Campaign Details Form",
      form_field: "ad_start_date",
      fomr_value: date,
      campaign_id: this.props.selectedCampaign.campaign_id,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({
      start_time: date,
    });
  };
  handleEndDatePicked = (date) => {
    analytics.track(`Form Populated`, {
      form_type: "Snapchat Campaign Details Form",
      form_field: "ad_end_date",
      fomr_value: date,
      campaign_id: this.props.selectedCampaign.campaign_id,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({
      end_time: date,
    });
  };
  handleToggle = (status) => {
    this.setState({
      toggle: status !== "PAUSED",
      modalVisible: false,
      toggleText: status,
    });
  };

  updateStatus = () => {
    this.props.updateStatus(
      {
        campaign_id: this.props.selectedCampaign.campaign_id,
        spends: this.props.selectedCampaign.spends,
        status: this.state.toggleText === "PAUSED" ? "ACTIVE" : "PAUSED",
      },
      this.handleToggle
    );
  };

  endCampaign = () => {
    this.props.endCampaign(
      {
        campaign_id: this.props.selectedCampaign.campaign_id,
        spends: this.props.selectedCampaign.spends,
        status: "PAUSED",
      },
      this.handleToggle
    );
  };

  showModal = (visible) => {
    analytics.track(`Button Pressed`, {
      button_type: `${visible ? "Open" : "Close"} Campaign Status Modal`,
      button_content: this.state.toggleText !== "PAUSED" ? "LIVE" : "PAUSED",
      campaign_channel: "snapchat",
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({ modalVisible: visible });
  };

  checkOptionalTargerts = (interesetNames, deviceMakes, targeting) => {
    return (
      !this.props.loading &&
      (interesetNames.length > 0 ||
        deviceMakes.length > 0 ||
        (targeting.hasOwnProperty("devices") &&
          (targeting.devices[0].hasOwnProperty("os_type") ||
            targeting.devices[0].hasOwnProperty("os_version_max"))) ||
        (targeting.geos[0].hasOwnProperty("region_id") &&
          targeting.geos[0].region_id.length > 0))
    );
  };

  durationChange = (start_time, end_time) => {
    this.setState({ start_time, end_time });
    this.props.getCampaignStats(this.props.selectedCampaign, {
      start_time,
      end_time,
    });
  };

  adCreatives = (item) => {
    return (
      <MediaBox
        key={item.story_id}
        name={item.story_id}
        navigation={this.props.navigation}
        selectedCampaign={this.props.selectedCampaign}
        ad={item.item}
      />
    );
  };

  handleChartToggle = () => {
    this.setState((prevState) => ({
      expand: !prevState.expand,
    }));
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    this.toggle();
  };

  toggle = () => {
    Animated.spring(this.state.chartAnimation, {
      toValue: !this.state.expand ? this.state.maxHeight : this.state.minHeight,
      useNativeDriver: false,
    }).start();
  };

  showCSVModal = (isVisible) => {
    analytics.track(`Button Pressed`, {
      button_type: `${isVisible ? "Open" : "Close"} Campaign CSV Modal`,
      button_content: "Download Icon",
      campaign_channel: "snapchat",
      campaign_id: this.props.selectedCampaign.campaign_id,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({ CSVModalVisible: isVisible });
  };
  campaignEndedOrNot = (campaign) => {
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 2);
    let campaignEndedOrNot =
      campaign.review_status.includes("PENDING") ||
      (campaign.review_status.includes("APPROVED") &&
        new Date(campaign.start_time).setHours(0, 0, 0, 0) <=
          new Date().setHours(0, 0, 0, 0) &&
        new Date(campaign.end_time) >= new Date())
        ? null
        : campaign.campaign_end === "1" ||
          new Date(campaign.end_time) < new Date();
    return campaignEndedOrNot;
  };

  onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      maxHeight: hp(87) - layout.height,
    });
  };
  onDidFocus = () => {
    const { translate } = this.props.screenProps;
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    if (
      (!this.props.loading &&
        !this.props.languagesListLoading &&
        !this.props.selectedCampaign) ||
      this.props.campaignError ||
      this.props.languagesListError
    ) {
      analytics.track(`Screen Viewed`, {
        screen_name: "CampaignDetails",
        source,
        source_action,
        campaign_channel: "snapchat",
        campaign_id: "error",
        error_description:
          (!this.props.loading &&
            !this.props.languagesListLoading &&
            !this.props.selectedCampaign) ||
          this.props.campaignError ||
          this.props.languagesListError,
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
    }

    if (this.props.selectedCampaign) {
      analytics.track(`Screen Viewed`, {
        screen_name: "CampaignDetails",
        source,
        source_action,
        campaign_channel: "snapchat",
        campaign_id: this.props.selectedCampaign.campaign_id,
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
    }
  };
  createDeleteDialog = () => {
    const { translate } = this.props.screenProps;
    const { selectedCampaign } = this.props;
    let alertMessage =
      selectedCampaign.spends > 0
        ? "Your Remaining budget will be added to Your wallet in the next {{hours}} hours"
        : "Your budget will be added to your wallet";
    return Alert.alert(
      translate("Cancel Campaign"),
      translate(alertMessage, { hours: 24 }),
      [
        {
          text: translate("Cancel"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: translate("OK"),
          onPress: () => {
            this.props.getWalletAmountInKwd(
              selectedCampaign.lifetime_budget_micro
            );
            this.props.navigation.navigate("PaymentForm", {
              amount: selectedCampaign.lifetime_budget_micro,
              refundAmountToWallet: true,
              selectedCampaign: selectedCampaign,
              keep_campaign: selectedCampaign.spends > 0 ? 1 : 0,
              source: "ad_detail",
              source_action: "a_return_amount_to_wallet",
            });
          },
        },
      ]
    );
  };
  editMedia = (selectedCampaign) => {
    const { setRejectedAdType, setRejectedCampaignData, navigation } =
      this.props;
    setRejectedAdType(selectedCampaign.campaign_type);
    let savedObjective =
      selectedCampaign.destination === "REMOTE_WEBPAGE" ||
      (selectedCampaign.destination === "COLLECTION" &&
        !selectedCampaign.attachment.hasOwnProperty("deep_link_uri"))
        ? "WEBSITE_TRAFFIC"
        : selectedCampaign.destination === "DEEP_LINK"
        ? "APP_TRAFFIC"
        : selectedCampaign.objective;
    setRejectedCampaignData({ ...selectedCampaign, savedObjective });
    navigation.navigate("AdDesign", {
      rejected: true,
      editInReview: true,
      source: "campaign_detail",
      source_action: "a_review_ad",
    });
  };
  showEditMedia = () => {
    let edit = false;
    const { selectedCampaign } = this.props;
    if (
      selectedCampaign &&
      selectedCampaign.ad_status === "In Review" &&
      selectedCampaign.campaign_end === "0"
    ) {
      edit = true;
      if (
        (selectedCampaign.campaign_type === "CollectionAd" ||
          selectedCampaign.campaign_type === "StoryAd") &&
        selectedCampaign.snap_ad_id &&
        selectedCampaign.snap_ad_id !== ""
      ) {
        edit = false;
      }
    }
    return edit;
  };
  render() {
    let loading = this.props.loading;
    const { translate } = this.props.screenProps;
    let attachment = {};
    if (
      (!loading &&
        !this.props.languagesListLoading &&
        !this.props.selectedCampaign) ||
      this.props.campaignError ||
      this.props.languagesListError
    ) {
      return (
        <>
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <ErrorComponent
            loading={loading}
            navigation={this.props.navigation}
            screenProps={this.props.screenProps}
          />
        </>
      );
    } else {
      let selectedCampaign = null;
      let targeting = null;
      let audienceOverViewData = [];
      let deviceMakes = [];
      let countryName = "";
      let region_names = [];
      let interesetNames = [];
      let langaugeNames = [];
      let start_time = "";
      let end_year = "";
      let start_year = "";
      let end_time = "";
      let media = [];
      if (!loading && this.props.selectedCampaign) {
        selectedCampaign = this.props.selectedCampaign;
        if (
          selectedCampaign.hasOwnProperty("story_creatives") ||
          selectedCampaign.hasOwnProperty("collection_creatives")
        ) {
          let creatives = selectedCampaign.hasOwnProperty("story_creatives")
            ? selectedCampaign.story_creatives
            : selectedCampaign.collection_creatives;

          media = creatives.map((ad, i) => (
            <MediaBox
              key={ad.story_id}
              name={i}
              navigation={this.props.navigation}
              selectedCampaign={selectedCampaign}
              ad={ad}
            />
          ));
        }

        targeting = selectedCampaign.targeting
          ? selectedCampaign.targeting
          : {};

        deviceMakes =
          targeting &&
          targeting.hasOwnProperty("devices") &&
          targeting.devices[0].hasOwnProperty("marketing_name")
            ? targeting.devices[0].marketing_name.join(", \n")
            : [];

        region_names = [];
        targeting.geos.some((geo) => geo.hasOwnProperty("region_id")) &&
          targeting.geos.forEach((geo, i) => {
            let regN = [];
            if (geo.hasOwnProperty("region_id")) {
              regN = geo.region_id.map((id) =>
                translate(
                  regionsCountries
                    .find(
                      (country) =>
                        country.country_code === targeting.geos[i].country_code
                    )
                    .regions.find((reg) => reg.id === id).name
                )
              );
              region_names = [...region_names, ...regN];
            }
          });

        // gender
        const gender =
          (targeting &&
            (!targeting.demographics[0] ||
              !targeting.demographics[0].gender ||
              !targeting.demographics[0].hasOwnProperty("gender"))) ||
          targeting.demographics[0].gender === ""
            ? translate("All")
            : targeting &&
              translate(startCase(toLower(targeting.demographics[0].gender)));
        audienceOverViewData.push({
          heading: "Gender",
          icon: (
            <GenderIcon
              fill={"#FF790A"}
              width={RFValue(15.5, 414)}
              height={RFValue(15.5, 414)}
            />
          ),
          content: gender,
        });
        const ageMin = targeting && targeting.demographics[0].min_age;
        const ageMax = targeting && targeting.demographics[0].max_age;
        // age range
        audienceOverViewData.push({
          heading: "Age range",
          icon: (
            <Icon
              style={styles.icon}
              type="MaterialCommunityIcons"
              name="human-male-girl"
            />
          ),
          content: ageMin + " - " + ageMax,
        });
        interesetNames =
          targeting && targeting.hasOwnProperty("interests")
            ? targeting.interests[0].category_id.map((interest) => {
                if (targeting.interests[0].category_id.hasOwnProperty("scls")) {
                  return ` ${
                    interestNames.interests.scls.find(
                      (interestObj) => interestObj.id === interest
                    ).name
                  }`;
                } else {
                  return (
                    interest !== "scls" &&
                    interestNames.interests.scls.find(
                      (interestObj) => interestObj.id === interest
                    ) &&
                    `${
                      interestNames.interests.scls.find(
                        (interestObj) => interestObj.id === interest
                      ).name
                    }`
                  );
                }
              })
            : [];

        langaugeNames =
          !this.props.languagesListLoading &&
          this.props.languages.length > 0 &&
          targeting &&
          targeting.demographics[0] &&
          targeting.demographics[0].languages.map((languageId) => {
            return translate(
              this.props.languages.find((lang) => lang.id === languageId).name
            );
          });
        audienceOverViewData.push({
          heading: "Language",
          icon: <Icon style={styles.icon} type="FontAwesome" name="language" />,
          content:
            langaugeNames && langaugeNames.length > 0
              ? langaugeNames.join(", ")
              : "",
        });
        countryName =
          targeting &&
          targeting.geos &&
          targeting.geos.map((geo, i) =>
            translate(
              countries.find(
                (country) => country.value === targeting.geos[i].country_code
              ).label
            )
          );
        audienceOverViewData.push({
          heading: "Location",
          icon: (
            <LocationIcon
              fill={"#FF790A"}
              width={RFValue(15.5, 414)}
              height={RFValue(15.5, 414)}
            />
          ),
          content: countryName + ": " + (region_names ? region_names : ""),
        });
        if (selectedCampaign.start_time && selectedCampaign.end_time) {
          end_time = new Date(selectedCampaign.end_time.split("T")[0]);
          start_time = new Date(selectedCampaign.start_time.split("T")[0]);
          end_year = end_time.getFullYear();
          start_year = start_time.getFullYear();
          end_time = dateFormat(end_time, "d mmm");
          start_time = dateFormat(start_time, "d mmm");
        }
        if (
          selectedCampaign.attachment &&
          selectedCampaign.attachment !== "BLANK"
        ) {
          attachment = JSON.parse(selectedCampaign.attachment);
          if (attachment && attachment.url) {
            if (attachment.url.includes("?utm_source"))
              attachment.url = attachment.url.split("?utm_source")[0];
            if (attachment.url.includes("&utm_source")) {
              attachment.url = attachment.url.split("&utm_source")[0];
            }
          }
        }
        if (
          selectedCampaign.story_creatives &&
          selectedCampaign.story_creatives.length > 0
        ) {
          let firstStory = selectedCampaign.story_creatives[0];
          if (firstStory.attachment && firstStory.attachment !== "BLANK") {
            attachment = JSON.parse(firstStory.attachment);
            if (attachment && attachment.url) {
              if (attachment.url.includes("?utm_source"))
                attachment.url = attachment.url.split("?utm_source")[0];
              if (attachment.url.includes("&utm_source")) {
                attachment.url = attachment.url.split("&utm_source")[0];
              }
            }
          }
        }
      }

      return (
        <SafeAreaView
          style={[{ height: "100%", backgroundColor: globalColors.bluegem }]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <DateFields
            onRef={(ref) => (this.dateField = ref)}
            handleStartDatePicked={this.handleStartDatePicked}
            handleEndDatePicked={this.handleEndDatePicked}
            start_time={this.state.start_time}
            end_time={this.state.end_time}
            durationChange={this.durationChange}
            selectedCampaign={selectedCampaign}
            chartRange={true}
            screenProps={this.props.screenProps}
          />
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <Container style={[styles.container]}>
            <View
              style={[
                styles.gradient,
                {
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 30,
                  overflow: "hidden",
                  backgroundColor: globalColors.bluegem,
                },
              ]}
            >
              {/* <LinearGradient
                colors={["#9300FF", "#5600CB"]}
                locations={[0, 1]}
                style={styles.gradient}
              /> */}
            </View>
            <Header
              screenProps={this.props.screenProps}
              campaignEnded={this.props.campaignEnded}
              closeButton={false}
              translateTitle={false}
              title={loading ? "" : selectedCampaign.name}
              icon={"snapchat"}
              actionButton={this.state.expand && this.handleChartToggle}
              navigation={
                !this.state.expand ? this.props.navigation : undefined
              }
              selectedCampaign={selectedCampaign}
              containerStyle={{ height: RFValue(25, 414) }}
              showTopRightButtonIcon={
                !loading && selectedCampaign.review_status === "APPROVED"
                  ? selectedCampaign.ad_status !== "LIVE" &&
                    selectedCampaign.ad_status !== "Campaign Paused" &&
                    selectedCampaign.ad_status !== "Campaign ended"
                    ? "edit"
                    : true
                  : false
              }
              topRightButtonFunction={() =>
                selectedCampaign.ad_status !== "Live" &&
                selectedCampaign.ad_status !== "Paused" &&
                selectedCampaign.campaign_end === 0
                  ? this.handleSnapchatRejection(selectedCampaign)
                  : this.showCSVModal(true)
              }
              topRightButtonFunction={() => this.showCSVModal(true)}
              titleStyle={{
                textAlign: "left",
                fontSize: RFValue(7.5, 414),
                paddingTop: RFValue(1.5, 414),
                flex: 1,
              }}
              segment={{
                source: "campaign_detail",
                source_action: "a_go_back",
              }}
              campaignStatus={loading ? null : selectedCampaign.status}
            />
            {selectedCampaign &&
              (selectedCampaign.refund_request === "1" ||
                (selectedCampaign.campaign_end === "0" &&
                  this.campaignEndedOrNot(selectedCampaign) &&
                  selectedCampaign.lifetime_budget_micro >
                    selectedCampaign.spends)) &&
              !this.state.expand && (
                <View style={styles.remainingBudgetContainer}>
                  <Icon
                    style={{ fontSize: RFValue(17.5, 414), color: "#fff" }}
                    type="Ionicons"
                    name="ios-alert"
                  />
                  <Text style={styles.remainingBudgetText}>
                    {translate(
                      `Your Remaining budget will be added to Your wallet in the next {{hours}} hours`,
                      { hours: 24 }
                    )}
                  </Text>
                </View>
              )}
            {selectedCampaign &&
              selectedCampaign.review_status === "PENDING" &&
              selectedCampaign.ad_status !== "Campaign ended" &&
              !this.state.expand && (
                <View
                  style={[
                    styles.remainingBudgetContainer,
                    { backgroundColor: globalColors.white },
                  ]}
                >
                  <Icon
                    style={{
                      fontSize: RFValue(17.5, 414),
                      color: globalColors.orange,
                    }}
                    type="Ionicons"
                    name="ios-alert"
                  />
                  <Text
                    style={[
                      styles.remainingBudgetText,
                      { color: globalColors.rum },
                    ]}
                  >
                    {translate(
                      "Please note that Snapchat's review process can take up to 72 hours or more"
                    )}
                  </Text>
                </View>
              )}
            {loading
              ? null
              : !this.state.expand && (
                  <View style={[styles.adStatus]}>
                    <Icon
                      style={[
                        styles.circleIcon,
                        {
                          color: selectedCampaign.ad_status_color_code,
                        },
                      ]}
                      name={
                        selectedCampaign.review_status.includes("REJECTED")
                          ? "circle-slash"
                          : "circle"
                      }
                      type={
                        selectedCampaign.review_status.includes("REJECTED")
                          ? "Octicons"
                          : "FontAwesome"
                      }
                    />
                    <Text
                      style={[
                        styles.reviewText,
                        {
                          color: selectedCampaign.ad_status_color_code,
                        },
                      ]}
                    >
                      {translate(`${selectedCampaign.ad_status}`)}
                    </Text>
                  </View>
                )}
            {loading
              ? null
              : !this.state.expand &&
                this.showEditMedia() && (
                  <TouchableOpacity
                    onPress={this.createDeleteDialog}
                    style={[styles.deleteStatus]}
                  >
                    <Icon
                      style={[styles.circleIcon]}
                      name={"circle"}
                      type={"FontAwesome"}
                    />
                    <Icon
                      style={[styles.circleIcon]}
                      name={"circle"}
                      type={"FontAwesome"}
                    />
                    <Icon
                      style={[styles.circleIcon]}
                      name={"circle"}
                      type={"FontAwesome"}
                    />
                  </TouchableOpacity>
                )}
            <ScrollView
              contentContainerStyle={{ height: hp(115) }}
              scrollEnabled={!this.state.expand}
              ref={(ref) => (this.scroll = ref)}
              style={{ maxHeight: "100%" }}
            >
              <View style={[styles.mainCard]}>
                {selectedCampaign &&
                selectedCampaign.review_status === "REJECTED" ? (
                  <>
                    <RejectedSnapchatInfo
                      loading={loading}
                      screenProps={this.props.screenProps}
                      review_status_reason={
                        selectedCampaign.review_status_reason || []
                      }
                      navigation={this.props.navigation}
                      selectedCampaign={selectedCampaign}
                      mainBusiness={this.props.mainBusiness}
                    />
                    {selectedCampaign.spends !== 0 && (
                      <TouchableOpacity
                        onLayout={this.onLayout}
                        disabled={this.state.expand || loading}
                        onPress={this.handleChartToggle}
                      >
                        {this.state.expand && (
                          <ChartDateChoices
                            selectedCampaign={selectedCampaign}
                            dateField={this.dateField}
                            durationChange={this.durationChange}
                            screenProps={this.props.screenProps}
                          />
                        )}
                        <CampaignCircleChart
                          channel={"snapchat"}
                          campaign={selectedCampaign}
                          detail={true}
                          screenProps={this.props.screenProps}
                          loading={loading}
                          handleChartToggle={this.handleChartToggle}
                          chartExpanded={this.state.expand}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <TouchableOpacity
                    onLayout={this.onLayout}
                    disabled={this.state.expand || loading}
                    onPress={this.handleChartToggle}
                  >
                    {this.state.expand && (
                      <ChartDateChoices
                        selectedCampaign={selectedCampaign}
                        dateField={this.dateField}
                        durationChange={this.durationChange}
                        screenProps={this.props.screenProps}
                      />
                    )}
                    <CampaignCircleChart
                      channel={"snapchat"}
                      campaign={selectedCampaign}
                      detail={true}
                      screenProps={this.props.screenProps}
                      loading={loading}
                      handleChartToggle={this.handleChartToggle}
                      chartExpanded={this.state.expand}
                    />
                  </TouchableOpacity>
                )}

                {!this.state.expand && (
                  <View style={styles.campaignMediaAndInfo}>
                    <CampaignMedia
                      selectedCampaign={selectedCampaign}
                      navigation={this.props.navigation}
                      loading={loading}
                      screenProps={this.props.screenProps}
                      source={"campaign_detail"}
                      mainBusiness={this.props.mainBusiness}
                      editMedia={this.editMedia}
                      edit={
                        selectedCampaign &&
                        selectedCampaign.campaign_end === "0" &&
                        selectedCampaign.ad_status === "In Review"
                      }
                    />
                    <AudienceOverview
                      screenProps={this.props.screenProps}
                      data={audienceOverViewData}
                      editCampaign={true}
                      // targeting={targeting}
                      loading={loading}
                      navigatingRoutePath={
                        selectedCampaign &&
                        selectedCampaign.is_political === "1"
                          ? "AdDetailsPolitical"
                          : "AdDetails"
                      }
                      selectedCampaign={selectedCampaign}
                    />
                  </View>
                )}
                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : (
                  !this.state.expand &&
                  attachment.url && (
                    <View style={styles.adDestinationView}>
                      <Text style={styles.attachementText}>
                        {translate("Ad Destination")}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          Clipboard.setString(attachment.url);
                          showMessage({
                            type: "warning",
                            message: translate("URL copied to clipboard"),
                          });
                        }}
                        activeOpacity={0.8}
                        style={styles.destinationView}
                      >
                        <Text style={styles.destinationText}>
                          {attachment.url}
                        </Text>
                        <CopyIcon fill={"#FFF"} style={styles.copyIcon} />
                      </TouchableOpacity>
                    </View>
                  )
                )}
                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : (
                  <View style={{}}>
                    {!this.state.expand && (
                      <View>
                        {selectedCampaign.review_status === "APPROVED" &&
                          (selectedCampaign.campaign_end === "0" &&
                          !this.props.campaignEnded &&
                          new Date(selectedCampaign.end_time) > new Date() ? (
                            selectedCampaign.review_status === "APPROVED" &&
                            new Date(selectedCampaign.start_date) >
                              new Date() ? (
                              <View style={[styles.campaignStatus]}>
                                <Text style={styles.reviewtext}>
                                  {translate("Scheduled for")} {start_time}
                                </Text>
                              </View>
                            ) : (
                              !this.props.campaignEnded && (
                                <View padder style={styles.toggleSpace}>
                                  <View style={{ alignSelf: "center" }}>
                                    {selectedCampaign && (
                                      <Toggle
                                        buttonTextStyle={
                                          styles.switchButtonText
                                        }
                                        buttonText={
                                          this.state.toggleText !== "PAUSED"
                                            ? "LIVE"
                                            : "PAUSED"
                                        }
                                        containerStyle={styles.toggleStyle}
                                        switchOn={this.state.toggle}
                                        onPress={() => {
                                          this.state.toggle
                                            ? this.setState({
                                                modalVisible: true,
                                              })
                                            : this.updateStatus();
                                        }}
                                        backgroundColorOff="rgba(255,255,255,0.1)"
                                        backgroundColorOn="rgba(255,255,255,0.1)"
                                        circleColorOff="#FF9D00"
                                        circleColorOn="#66D072"
                                        duration={500}
                                        circleStyle={styles.switchCircle}
                                      />
                                    )}
                                    <Text style={styles.statusText}>
                                      {translate(
                                        `${
                                          this.state.toggle
                                            ? "Tap to pause AD"
                                            : "Tap to activate AD"
                                        }`
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )
                          ) : null)}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          </Container>
          {!loading && (
            <StatusModal
              screenProps={this.props.screenProps}
              selectedCampaign={selectedCampaign}
              updateStatus={this.updateStatus}
              endCampaign={this.endCampaign}
              modalVisible={this.state.modalVisible}
              showModal={this.showModal}
            />
          )}
          <Animated.View
            style={[
              { backgroundColor: "#f8f8f8", overflow: "hidden" },
              { height: this.state.chartAnimation },
            ]}
          >
            {this.state.expand &&
              selectedCampaign &&
              selectedCampaign.review_status !== "REJECTED" && (
                <SlideUpPanel
                  screenProps={this.props.screenProps}
                  start_time={this.state.start_time}
                  end_time={this.state.end_time}
                  dateField={this.dateField}
                  selectedCampaign={selectedCampaign}
                  hideCharts={this.hideCharts}
                  getCampaignStats={this.props.getCampaignStats}
                  chartAnimation={this.state.chartAnimation}
                />
              )}
          </Animated.View>
          <CSVModal
            isVisible={this.state.CSVModalVisible}
            showCSVModal={this.showCSVModal}
            screenProps={this.props.screenProps}
            downloadCSV={this.props.downloadCSV}
            campaign_id={selectedCampaign && selectedCampaign.campaign_id}
          />
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  campaignEnded: state.campaignC.campaignEnded,
  loading: state.dashboard.loadingCampaignDetails,
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
  campaignError: state.dashboard.campaignError,
  languages: state.campaignC.languagesList,
  mainBusiness: state.account.mainBusiness,
  languagesListLoading: state.campaignC.languagesListLoading,
  languagesListError: state.campaignC.languagesListError,
});
const mapDispatchToProps = (dispatch) => ({
  updateStatus: (info, handleToggle) =>
    dispatch(actionCreators.updateStatus(info, handleToggle)),
  endCampaign: (info, handleToggle) =>
    dispatch(actionCreators.endCampaign(info, handleToggle)),
  getCampaignStats: (info, range) =>
    dispatch(actionCreators.getCampaignStats(info, range)),
  get_languages: () => dispatch(actionCreators.get_languages()),
  downloadCSV: (campaign_id, email, showModalMessage) =>
    dispatch(actionCreators.downloadCSV(campaign_id, email, showModalMessage)),
  setRejectedAdType: (info) => dispatch(actionCreators.setRejectedAdType(info)),
  setRejectedCampaignData: (rejCampaign) =>
    dispatch(actionCreators.setRejectedCampaignData(rejCampaign)),
  getWalletAmountInKwd: (amount) =>
    dispatch(actionCreators.getWalletAmountInKwd(amount)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
