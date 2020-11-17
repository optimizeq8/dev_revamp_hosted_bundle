import React from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import analytics from "@segment/analytics-react-native";

// Components
import Header from "../../MiniComponents/Header";

import { globalColors } from "../../../GlobalStyles";

import { heightPercentageToDP } from "react-native-responsive-screen";

// STYLES
import styles from "./styles";

// REDUX
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import AudienceCard from "./AudienceCard";

class SnapchatCampaignAudience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_audience_id: 1,
    };
  }

  componentDidMount() {
    if (this.props.audienceList.length === 0) this.props.getAudienceList();
  }

  showAlert = (audience) => {
    const { translate } = this.props.screenProps;

    analytics.track("audience_delete_warning", {
      source: "audience_list",
      source_action: "a_delete_audience",
      audience_id: audience.id,
      audience_name: audience.name,
    });
    Alert.alert(
      translate("Delete"),
      translate(`Are you sure you want to delete {{audienceName}} ?`, {
        audienceName: audience.name,
      }),
      [
        {
          text: translate("Cancel"),
          onPress: () => {
            analytics.track("a_cancel_delete", {
              source: "audience_list",
              source_action: "a_cancel_delete",
            });
          },
          style: "cancel",
        },
        {
          text: translate("Delete"),
          onPress: () => this.props.deleteAudience(audience.id),
        },
      ],
      { cancelable: true }
    );
  };
  setAudienceId = (id) => {
    this.setState({
      selected_audience_id: id,
    });
  };
  renderCard = ({ item }) => {
    return (
      <AudienceCard
        screenProps={this.props.screenProps}
        item={item}
        navigation={this.props.navigation}
        showAlert={this.showAlert}
        selected_audience_id={this.state.selected_audience_id}
        setAudienceId={this.setAudienceId}
        getAudienceDetail={this.props.getAudienceDetail}
        setSelectedAudience={this.props.setSelectedAudience}
      />
    );
  };
  createNewAudience = () => {
    this.props.setAudienceDetail({ reset: true });
    this.props.navigation.navigate("SnapchatAudienceTagetting", {
      source: "audience_list",
      source_action: "a_create_audience_detail",
      audience_channel: "snapchat",
    });
  };
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track("audience_list", {
      source,
      source_action,
    });
  };
  retrieveAudinece = () => {
    this.props.getAudienceList();
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.campaignAudienceListOuterView}>
        {/* <NavigationEvents onDidFocus={this.onDidFocus} />
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Header
          title={"Select Audience"}
          screenProps={this.props.screenProps}
          titleStyle={{ color: globalColors.rum }}
          navigation={this.props.navigation}
          iconColor={globalColors.rum}
          showTopRightButton={true}
          topRightButtonText={translate("Create")}
          topRightButtonFunction={this.createNewAudience}
          rightViewStyle={styles.rightViewStyle}
        /> */}
        {this.props.audienceListLoading ? (
          <ActivityIndicator
            style={{ top: "20%" }}
            size={"large"}
            color={globalColors.orange}
          />
        ) : (
          <FlatList
            refreshing={this.props.audienceListLoading}
            data={this.props.audienceList}
            renderItem={this.renderCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              minHeight: heightPercentageToDP(50),
              flex: 0,
            }}
            onRefresh={this.retrieveAudinece}
            refreshing={this.props.audienceListLoading}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  audienceList: state.audience.audienceList,
  audienceListLoading: state.audience.audienceListLoading,
  data: state.campaignC.data,
});

const mapDispatchToProps = (dispatch) => ({
  setAudienceDetail: (audienceInfo) =>
    dispatch(actionCreators.setAudienceDetail(audienceInfo)),
  getAudienceList: () => dispatch(actionCreators.getAudienceList()),
  getAudienceDetail: (audienceId) =>
    dispatch(actionCreators.getAudienceDetail(audienceId)),
  deleteAudience: (audienceId) =>
    dispatch(actionCreators.deleteAudience(audienceId)),
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapchatCampaignAudience);
