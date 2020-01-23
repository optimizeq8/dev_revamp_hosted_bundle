import React, { Component } from "react";
import { View } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

class ReviewItemCard extends Component {
  render() {
    const { translate } = this.props.screenProps;
    const list = this.props.subtitles.map((e, i) => {
      let text = "";

      if (typeof e.title === "object")
        e.title.forEach(element => {
          text += translate(element) + " ";
        });
      else text = e.title && translate(e.title);

      return (
        <View style={styles.listView} key={i}>
          <Text style={[styles.subText, styles.listTitleText]}>
            {text ? text : ""}
          </Text>
          <Text style={[styles.subText, styles.contentText]}>{e.content}</Text>
        </View>
      );
    });
    return (
      <View style={styles.campaignButton}>
        <Icon type="MaterialIcons" name="check" style={[styles.icon]} />
        <View style={styles.textContainer}>
          <Text style={[styles.titleText]}>{translate(this.props.title)}</Text>
          {list}
        </View>
      </View>
    );
  }
}

export default ReviewItemCard;
