import React from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";

import analytics from "@segment/analytics-react-native";

// Components

import { globalColors } from "../../../GlobalStyles";

import { heightPercentageToDP } from "react-native-responsive-screen";

// STYLES
import styles from "./styles";

// REDUX
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import AudienceCard from "./AudienceCard";

class InstagramCampaignAudience extends React.Component {
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
      businessid: this.props.mainBusiness.businessid,
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
              businessid: this.props.mainBusiness.businessid,
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
        audience_type={this.props.audience_type}
      />
    );
  };
  createNewAudience = () => {
    this.props.setAudienceDetail({ reset: true });
    this.props.navigation.navigate("InstagramAudienceTagetting", {
      source: "audience_list",
      source_action: "a_create_audience_detail",
      audience_channel: "instagram",
      audience_type: this.props.audience_type,
    });
  };

  retrieveAudinece = () => {
    this.props.getAudienceList();
  };
  render() {
    return (
      <View style={styles.campaignAudienceListOuterView}>
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
              flex: 1,
              paddingBottom: heightPercentageToDP(50),
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
  audienceList: state.instagramAudience.audienceList,
  audienceListLoading: state.instagramAudience.audienceListLoading,
  data: state.instagramAds.data,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  setAudienceDetail: (audienceInfo) =>
    dispatch(actionCreators.setInstagramAudienceDetail(audienceInfo)),
  getAudienceList: () => dispatch(actionCreators.getInstagramAudienceList()),
  getAudienceDetail: (audienceId) =>
    dispatch(actionCreators.getInstagramAudienceDetail(audienceId)),
  deleteAudience: (audienceId) =>
    dispatch(actionCreators.deleteInstagramAudience(audienceId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramCampaignAudience);
