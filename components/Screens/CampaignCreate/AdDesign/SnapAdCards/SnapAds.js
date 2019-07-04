import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";

import styles from "../styles";
import { Button, Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AddCard from "./AddCard";
import SnapCard from "./SnapCard";
export default class SnapAds extends Component {
  state = { snapAdsCards: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }] };

  componentDidMount(prevProps) {
    console.log("kmiouiy------------------bvuiol", this.props.snapAdsCards);
    // console.log("prevporps", prevProps.snapAdsCards);

    // if (prevProps.snapAdsCards !== this.props.snapAdsCards) {
    this.setState({ snapAdsCards: this.props.snapAdsCards });
    // }
  }
  // addSnapCard = () => {
  //   let newSnapCard = { id: (Math.random() * 1000).toFixed(0) };
  //   this.state.snapAdsCards.length < 21 &&
  //     this.setState({
  //       snapAdsCards: [...this.state.snapAdsCards, newSnapCard]
  //     });
  // };
  // removeSnapCard = index => {
  //   if (this.state.snapAdsCards.length > 4) {
  //     let result = this.state.snapAdsCards.filter(data => data.id !== index);

  //     this.setState({
  //       snapAdsCards: result
  //     });
  //   }
  // };
  snapCards = item => {
    if (item.index === this.props.snapAdsCards.length - 1) {
      return <AddCard addButton={item} addSnapCard={this.props.addSnapCard} />;
    } else
      return (
        <SnapCard
          _handleStoryAdCards={this.props._handleStoryAdCards}
          removeSnapCard={this.props.removeSnapCard}
          snapCardInfo={item}
        />
      );
  };
  render() {
    // console.log("selected", this.props.snapAdsCards);

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
          contentContainerStyle={{ paddingBottom: 50, alignItems: "center" }}
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
