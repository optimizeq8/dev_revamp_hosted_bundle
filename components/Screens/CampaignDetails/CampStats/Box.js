import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import styles from "../styles";
import GlobalStyles from "../../../../Global Styles";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";

class Box extends Component {
  render() {
    let info = this.props.info;
    let title = this.props.title;
    return (
      <View style={styles.boxStats}>
        <Text style={styles.stats}>{title}</Text>
        {this.props.loadingCampaignStats ? (
          <PlaceholderLine />
        ) : (
          <Text style={[GlobalStyles.numbers, { fontSize: 23 }]}>{info}</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loadingCampaignStats: state.dashboard.loadingCampaignStats
});
export default connect(
  mapStateToProps,
  null
)(Box);
