import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions
} from "react-native";
import { Text, Icon } from "native-base";
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Toggle from "react-native-switch-toggle";
import Chart from "./Charts";
import { LinearGradient } from "expo";
class CampaignCard extends Component {
  state = {
    paused: false,
    status: "PAUSED"
  };
  toggleStatus = () => {
    this.setState({ paused: !this.state.paused });
  };
  render() {
    let campaign = this.props.campaign;
    let charts = [
      { spend: campaign.spends },
      { impressions: campaign.impressions },
      { swipes: campaign.swipes }
    ].map((category, i) => <Chart chartCategory={category} key={i} />);
    return (
      <LinearGradient
        colors={["#751AFF", "#6C52FF", "#6268FF"]}
        style={styles.cardStyle}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.getCampaign(this.props.campaign.campaign_id);
            this.props.navigation.push("CampaignDetails");
          }}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text style={[styles.titletext]}>{this.props.campaign.name}</Text>
            </View>
            <Icon
              type="MaterialCommunityIcons"
              name="snapchat"
              style={styles.icon}
            />
            <Text style={[styles.subtext]}>Tap to view more</Text>

            <View style={{ flexDirection: "row" }}>{charts}</View>
            <View style={styles.containerStyle}>
              <Toggle
                containerStyle={styles.toggleStyle}
                circleStyle={styles.circleStyle}
                switchOn={this.state.paused}
                onPress={this.toggleStatus}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(0,0,0,0.1)"
                circleColorOff="#FF9D00"
                circleColorOn="#66D072"
                duration={200}
                buttonStyle={{ width: 20, height: 20 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id))
});
export default connect(
  null,
  mapDispatchToProps
)(CampaignCard);
