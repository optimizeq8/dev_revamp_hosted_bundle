import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "../../../styles/adDesign.styles";
import CarouselCard from "./CarouselCard";
export default class CarouselImage extends Component {
  snapCards = (item) => {
    return (
      <CarouselCard
        screenProps={this.props.screenProps}
        rejected={this.props.rejected}
        video={this.props.video}
        _handleStoryAdCards={this.props._handleStoryAdCards}
        removeSnapCard={this.props.removeSnapCard}
        snapCardInfo={item}
      />
    );
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={styles.flatListView}>
        <FlatList
          contentContainerStyle={styles.carouselFlatList}
          keyExtractor={(item) => item.id}
          data={this.props.carouselAdsArray}
          renderItem={this.snapCards}
          numColumns={3}
        />
        <Text style={styles.holdToDeleteText}>
          {translate("Tap and hold to delete media")}
        </Text>
      </View>
    );
  }
}
