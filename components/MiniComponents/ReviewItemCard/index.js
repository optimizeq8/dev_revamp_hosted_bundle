import React, { Component } from "react";
import { View } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

class ReviewItemCard extends Component {
  render() {
    const list = this.props.subtitles.map((e, i) => (
      <View style={styles.listView} key={i}>
        <Text style={[styles.subText, styles.listTitleText]}>{e.title}</Text>
        <Text style={[styles.subText, styles.contentText]}>{e.content}</Text>
      </View>
    ));
    return (
      <View style={styles.campaignButton}>
        <Icon type="MaterialIcons" name="check" style={[styles.icon]} />
        <View style={styles.textContainer}>
          <Text style={[styles.titleText]}>{this.props.title}</Text>
          {list}
        </View>
      </View>
    );
  }
}

export default ReviewItemCard;
