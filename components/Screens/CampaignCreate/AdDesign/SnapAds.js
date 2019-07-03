import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "./styles";
import { Button, Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class SnapAds extends Component {
  state = { snapAdsCards: [] };
  addSnapCard = () => {
    let newSnapCard = { id: Math.random() * 1000 };
    this.state.snapAdsCards.length < 20 &&
      this.setState({
        snapAdsCards: [...this.state.snapAdsCards, newSnapCard]
      });
  };
  snapCards = item => <View key={item.id} style={styles.blankView} />;
  render() {
    return (
      <>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={item => item.id}
          data={this.state.snapAdsCards}
          renderItem={this.snapCards}
          style={{
            backgroundColor: "red",
            width: "100%",
            height: "50%",
            position: "absolute"
          }}
          numColumns={3}
        />
        <View style={styles.blankView}>
          <Button onPress={this.addSnapCard}>
            <Icon name="plus" type="MaterialCommunityIcons" />
          </Button>
        </View>
      </>
    );
  }
}
