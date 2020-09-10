import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";

// Components
import Header from "../../MiniComponents/Header";

import { globalColors } from "../../../GlobalStyles";

// ICONS
import PenIcon from "../../../assets/SVGs/Pen";
import TrashIcon from "../../../assets/SVGs/Bin.svg";
import GradientButton from "../../MiniComponents/GradientButton";

import { heightPercentageToDP } from "react-native-responsive-screen";

// STYLES
import styles from "./styles";

// REDUX
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

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
  renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.name}
        style={[
          styles.cardView,
          this.state.selected_audience_id === item.id && styles.activeCardView,
        ]}
        onPress={() => {
          this.setState({
            selected_audience_id: item.id,
          });
          this.props.save_campaign_info({
            campaignInfo: {
              ...this.props.data,
              targeting: {
                ...item.targeting,
              },
            },
          });
          this.props.navigation.push("AdDetails", {
            source: "audience_list",
            source_action: "a_select_audience",
          });
        }}
      >
        <Text style={styles.audienceName}>{item.name}</Text>

        <View style={styles.flexAddEdit}>
          <TouchableOpacity
            style={styles.editAudienceIcon}
            onPress={() => {
              // this.props.setAudienceDetail({ reset: true, ...item });
              this.props.getAudienceDetail(item.id);
              this.props.navigation.navigate("SnapchatAudienceTagetting", {
                editAudience: true,
              });
            }}
          >
            <PenIcon width={20} height={20} fill={globalColors.purple} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteAudienceIcon}
            onPress={() => this.showAlert(item)}
          >
            <TrashIcon width={20} height={20} fill={globalColors.purple} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  createNewAudience = () => {
    this.props.setAudienceDetail({ reset: true });
    this.props.navigation.navigate("SnapchatAudienceTagetting", {
      editCampaign: true,
    });
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
        />

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
