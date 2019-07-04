import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "./styles";
import { Button, Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class SnapAds extends Component {
  state = { snapAdsCards: [{ id: 0 }] };
  addSnapCard = () => {
    let newSnapCard = { id: (Math.random() * 1000).toFixed(0) };
    this.state.snapAdsCards.length < 20 &&
      this.setState({
        snapAdsCards: [...this.state.snapAdsCards, newSnapCard]
      });
  };
  removeSnapCard = index => {
    let result = this.state.snapAdsCards.filter(data => data.id !== index);

    this.setState({
      snapAdsCards: result
    });
  };
  snapCards = item => {
    console.log(item);

    if (item.index === this.state.snapAdsCards.length - 1) {
      return (
        <View style={[styles.blankView]}>
          <Button onPress={this.addSnapCard}>
            <Text style={{ color: "#fff" }}>{item.item.id}</Text>

            <Icon name="plus" type="MaterialCommunityIcons" />
          </Button>
        </View>
      );
    } else
      return (
        <View key={item.id} style={styles.blankView}>
          <Button onPress={() => this.removeSnapCard(item.item.id)}>
            <Text style={{ color: "#fff" }}>{item.item.id}</Text>
          </Button>
        </View>
      );
  };
  render() {
    console.log(this.state.snapAdsCards);

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
      </>
    );
  }
}
