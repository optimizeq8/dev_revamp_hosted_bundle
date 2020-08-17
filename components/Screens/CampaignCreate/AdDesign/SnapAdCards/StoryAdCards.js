import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "../styles";
import { Button, Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AddCard from "./AddCard";
import SnapCard from "./SnapCard";
export default class StoryAdCards extends Component {
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
      <SnapCard
        screenProps={this.props.screenProps}
        rejected={this.props.rejected}
        video={this.props.video}
        // cancelUpload={this.props.cancelUpload}
        _handleStoryAdCards={this.props._handleStoryAdCards}
        removeSnapCard={this.props.removeSnapCard}
        snapCardInfo={item}
        setTheState={this.props.setTheState}
      />
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View
        style={{
          position: "absolute",
          width: "90%",
          alignSelf: "center",
          height: heightPercentageToDP(42),
        }}
      >
        <FlatList
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 50,
            alignItems: "center",
          }}
          keyExtractor={(item) => item.id}
          data={this.props.StoryAdCards}
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
