import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "../../../styles/adDesign.styles";
import { Button, Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
// import AddCard from "./AddCard";
import CarouselCard from "./CarouselCard";
export default class CarouselImage extends Component {
  snapCards = (item) => {
    // if (item.index === this.props.StoryAdCards.length - 1) {
    //   return (
    //     <AddCard
    //       arrayLen={this.props.StoryAdCards.length}
    //       screenProps={this.props.screenProps}
    //     />
    //   );
    // } else
    return (
      <CarouselCard
        screenProps={this.props.screenProps}
        rejected={this.props.rejected}
        video={this.props.video}
        // cancelUpload={this.props.cancelUpload}
        _handleStoryAdCards={this.props._handleStoryAdCards}
        removeSnapCard={this.props.removeSnapCard}
        snapCardInfo={item}
      />
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    console.log("carouselAdsArray", this.props.carouselAdsArray);

    return (
      <View style={{ height: heightPercentageToDP(35) }}>
        <FlatList
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 50,
            // height: "50%",
            alignItems: "center",
          }}
          keyExtractor={(item) => item.id}
          data={this.props.carouselAdsArray}
          renderItem={this.snapCards}
          style={{}}
          numColumns={3}
        />
        <Text style={styles.holdToDeleteText}>
          {translate("Tap and hold to delete media")}
        </Text>
      </View>
    );
  }
}
