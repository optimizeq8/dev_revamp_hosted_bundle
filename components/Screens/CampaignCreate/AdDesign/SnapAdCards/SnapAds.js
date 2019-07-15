import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "../styles";
import { Button, Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AddCard from "./AddCard";
import SnapCard from "./SnapCard";
export default class SnapAds extends Component {
  snapCards = item => {
    if (item.index === this.props.snapAdsCards.length - 1) {
      return <AddCard addButton={item} addSnapCard={this.props.addSnapCard} />;
    } else
      return (
        <SnapCard
          video={this.props.video}
          openUploadVideo={this.props.openUploadVideo}
          cancelUpload={this.props.cancelUpload}
          _handleStoryAdCards={this.props._handleStoryAdCards}
          removeSnapCard={this.props.removeSnapCard}
          snapCardInfo={item}
        />
      );
  };
  render() {
    return (
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          alignItems: "center",
          width: "100%",
          height: "60%"
        }}
      >
        <FlatList
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 50,
            alignItems: "center"
          }}
          keyExtractor={item => item.id}
          data={this.props.snapAdsCards}
          renderItem={this.snapCards}
          style={{}}
          numColumns={3}
        />
      </View>
    );
  }
}
