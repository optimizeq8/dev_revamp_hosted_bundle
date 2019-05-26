import React, { Component } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

class ReviewItemCard extends Component {
  render() {
    const list = this.props.subtitles.map((e, i) => (
      <View style={{ paddingLeft: 15 }} key={i}>
        <Text style={[styles.subtext, { fontFamily: "montserrat-medium" }]}>
          {e.title}
        </Text>
        <Text style={[styles.subtext, { color: "#FF9D00", fontSize: 12 }]}>
          {e.content}
        </Text>
      </View>
    ));
    return (
      <View style={styles.campaignButton}>
        <Icon type="MaterialIcons" name="check" style={[styles.icon]} />
        <View style={styles.textcontainer}>
          <Text style={[styles.titletext]}>{this.props.title}</Text>
          {list}
        </View>
      </View>
    );
  }
}

export default ReviewItemCard;
