import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";

import styles from "./styles";
export default class RejectedComp extends Component {
  render() {
    let { selectedCampaign, navigation } = this.props;
    return (
      <View>
        <Text style={[styles.subHeadings, { fontSize: 17 }]}>
          Why was your ad rejected?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignSelf: "center"
          }}
        >
          <View style={styles.dot} />
          <Text
            style={[
              styles.subtext,
              {
                fontFamily: "montserrat-regular",
                width: "80%"
              }
            ]}
          >
            {selectedCampaign && selectedCampaign.review_status_reason}
          </Text>
        </View>
        <Button
          onPress={() =>
            this.props.navigation.navigate("AdDesign", {
              rejected: true,
              objective: selectedCampaign.objective,
              headline: selectedCampaign.headline,
              campaign_id: selectedCampaign.campaign_id
            })
          }
          style={styles.reviewButton}
        >
          <Text style={styles.subHeadings}>Review Ad and publish</Text>
        </Button>
      </View>
    );
  }
}
