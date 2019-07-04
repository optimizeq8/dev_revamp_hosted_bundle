import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Button, Icon } from "native-base";

import styles from "../styles";
import MediaButton from "../MediaButton";
export default class SnapCard extends Component {
  navigateToCreative = card => {};
  render() {
    let { snapCardInfo, removeSnapCard, _handleStoryAdCards } = this.props;
    // console.log(snapCardInfo);

    return (
      <View key={snapCardInfo.index} style={styles.SnapAdCard}>
        <Image
          source={{ uri: snapCardInfo.item.image }}
          style={{ height: "100%", width: "100%", position: "absolute" }}
        />
        <Text style={{ color: "#fff" }}>{snapCardInfo.index + 1}</Text>
        <Icon
          onPress={() => removeSnapCard(snapCardInfo.item.id)}
          name="close"
          type="MaterialCommunityIcons"
          style={{ bottom: "35%", color: "#fff" }}
        />
        <MediaButton
          _handleStoryAdCards={_handleStoryAdCards}
          snapAdCard={true}
          snapCardInfo={snapCardInfo}
        />
        {/* <Button
          style={styles.addButtonStyle}
          onPress={() => removeSnapCard(snapCard.item.id)}
        >
          <Icon style={[styles.icon, { fontSize: 30 }]} name="camera" />
          <Text style={{ color: "#fff" }}>{snapCard.index + 1}</Text>
        </Button> */}
      </View>
    );
  }
}
