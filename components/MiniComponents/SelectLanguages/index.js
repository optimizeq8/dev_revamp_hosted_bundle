import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import LocationIcon from "../../../assets/SVGs/Location";
import { Input, Button, Item, Icon } from "native-base";
import styles from "./styles";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import { globalColors } from "../../../Global Styles";
export default class SelectLanguages extends Component {
  render() {
    let languagelist = this.props.filteredLanguages.map(c => (
      <TouchableOpacity
        key={c.id}
        style={styles.languageRowConatiner}
        onPress={() => {
          this.props.onSelectedLangsChange(c.id);
        }}
      >
        <Icon
          type="MaterialCommunityIcons"
          name={
            this.props.demographics[0].languages.find(l => l === c.id)
              ? "circle"
              : "circle-outline"
          }
          style={[
            this.props.demographics[0].languages.find(l => l === c.id)
              ? styles.activetext
              : styles.inactivetext,
            styles.optionsIconSize
          ]}
        />
        <Text style={styles.optionsTextContainer}>{c.name}</Text>
      </TouchableOpacity>
    ));
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={[styles.dataContainer]}>
            <Icon name="language" type="MaterialIcons" style={styles.icon} />
            <Text style={[styles.title]}>Select Languages</Text>
            <View style={styles.optionsContainer}>
              <Item>
                <Input
                  placeholder="Search Language..."
                  style={styles.inputtext}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredC = this.props.languages.filter(c =>
                      c.name.toLowerCase().includes(value.toLowerCase())
                    );
                    this.props.filterLanguages(filteredC);
                  }}
                />
              </Item>

              <ScrollView style={styles.languageListContainer}>
                {languagelist}
              </ScrollView>
            </View>
          </View>

          <Button
            style={[styles.button]}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
