import React from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-navigation";

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
    this.props.getAudienceList();
  }

  showAlert = (audience) => {
    Alert.alert(
      "Delete",
      `Are you sure you want to delete ${audience.name} ?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
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
        item={item}
        navigation={this.props.navigation}
        showAlert={this.showAlert}
        selected_audience_id={this.state.selected_audience_id}
        setAudienceId={this.setAudienceId}
        getAudienceDetail={this.props.getAudienceDetail}
      />
    );
  };
  createNewAudience = () => {
    this.props.setAudienceDetail({ reset: true });
    this.props.navigation.navigate("SnapchatAudienceTagetting");
  };
  render() {
    return (
      <View style={styles.campaignAudienceListOuterView}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Header
          title={"Audience"}
          screenProps={this.props.screenProps}
          titleStyle={{ color: globalColors.purple }}
          navigation={this.props.navigation}
          iconColor={globalColors.purple}
          showTopRightButton={true}
          topRightButtonText={"Create"}
          topRightButtonFunction={this.createNewAudience}
          rightViewStyle={styles.rightViewStyle}
        />
        {this.props.audienceListLoading ? (
          <ActivityIndicator size={"large"} color={globalColors.orange} />
        ) : (
          <FlatList
            refreshing={this.props.audienceListLoading}
            data={this.props.audienceList}
            renderItem={this.renderCard}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{
              minHeight: heightPercentageToDP(50),
              flex: 0,
            }}
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
