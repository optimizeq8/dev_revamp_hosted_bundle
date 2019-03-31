import React, { Component } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

class ReviewItemCard extends Component {
  render() {
    const list = this.props.subtitles.map(e => (
      <View key={e.title}>
        <Text style={[styles.subtext, { fontFamily: "benton-sans-medium" }]}>
          {e.title}
        </Text>
        <Text style={[styles.subtext, { color: "#FF9D00" }]}>{e.content}</Text>
      </View>
    ));
    return (
      <TouchableOpacity style={styles.campaignButton}>
        <Icon type="MaterialIcons" name="edit" style={[styles.icon]} />
        <View style={styles.textcontainer}>
          <Text style={[styles.titletext]}>{this.props.title}</Text>
          {list}
        </View>
      </TouchableOpacity>
    );
  }
}

export default ReviewItemCard;
