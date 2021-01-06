import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Input, Item, Icon } from "native-base";
import styles from "../MultiSelect/styles";
import LowerButton from "../LowerButton";
import { globalColors } from "../../../GlobalStyles";
import Header from "../Header";

export default class SelectLanguages extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let languagelist = this.props.filteredLanguages.map((c) => (
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
            this.props.demographics[0].languages.find((l) => l === c.id)
              ? "circle"
              : "circle-outline"
          }
          style={[
            this.props.demographics[0].languages.find((l) => l === c.id)
              ? styles.activetext
              : styles.inactivetext,
            styles.optionsIconSize,
          ]}
        />
        <Text style={styles.optionsTextContainer}>{translate(c.name)}</Text>
      </TouchableOpacity>
    ));
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        {this.props.showBackButton && (
          <Header
            screenProps={this.props.screenProps}
            iconColor={globalColors.purple}
            actionButton={() => {
              this.props._handleSideMenuState(false);
            }}
          />
        )}
        <View style={styles.container}>
          <View style={[styles.dataContainer]}>
            <Icon name="language" type="MaterialIcons" style={styles.icon} />
            <Text style={[styles.title]}>{translate("Select Languages")}</Text>
            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder={translate("Search Language")}
                  style={styles.inputtext}
                  placeholderTextColor={globalColors.rum}
                  onChangeText={(value) => {
                    let filteredC = this.props.languages.filter((c) =>
                      translate(c.name)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                    this.props.filterLanguages(filteredC);
                  }}
                />
              </Item>

              <ScrollView style={styles.scrollContainer}>
                {languagelist}
              </ScrollView>
            </View>
          </View>
          <LowerButton
            screenProps={this.props.screenProps}
            checkmark={true}
            purpleViolet
            style={[styles.button]}
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
