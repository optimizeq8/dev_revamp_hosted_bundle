import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Icon, Item, Input } from "native-base";
import styles from "./styles";
import isArray from "lodash/isArray";
import isUndefined from "lodash/isUndefined";
import GreenCheckmarkIcon from "../../../assets/SVGs/GreenCheckmark.svg";
import PlusCircleIcon from "../../../assets/SVGs/PlusCircleOutline.svg";
import globalStyles from "../../../GlobalStyles";
import SearchIcon from "../../../assets/SVGs/Search.svg";

export default class KeywordsSelectionList extends Component {
  constructor() {
    super();
    this.state = {
      filteredList: [],
      keyword: "",
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.data,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data[0] !== this.props.data[0]) {
      this.setState({
        filteredList: this.props.data,
      });
    }
  }

  render() {
    const { translate } = this.props.screenProps;
    let list = this.state.filteredList.map((x) => {
      var found;
      if (isArray(this.props.selected)) {
        found = !isUndefined(this.props.selected.find((l) => l === x));
      } else {
        found = this.props.selected === x;
      }

      return (
        <TouchableOpacity
          key={x}
          style={styles.optionsRowContainer}
          onPress={() => {
            this.props._handleAddItem(x);
          }}
        >
          <View style={globalStyles.column}>
            {found ? (
              <GreenCheckmarkIcon width={25} height={25} />
            ) : (
              <PlusCircleIcon width={25} height={25} />
            )}
          </View>
          <Text style={[styles.inactivetext, styles.optionsTextContainer]}>
            {x}
          </Text>
        </TouchableOpacity>
      );
    });

    let selectedlist = this.props.selected.map((x) => {
      return (
        <TouchableOpacity
          key={x}
          style={[globalStyles.orangeBackgroundColor, styles.selectedItem]}
          onPress={() => {
            this.props._handleAddItem(x);
          }}
        >
          <Text
            style={[
              styles.inactivetext,
              styles.optionsTextContainer,
              {
                marginRight: 0,
                paddingRight: 10,
                fontSize: 11,
                fontFamily: "montserrat-bold",
                alignSelf: "center",
              },
            ]}
            numberOfLines={1}
          >
            {x}
          </Text>
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.optionsContainer}>
        <Item style={styles.searchfield}>
          <SearchIcon width={18} height={18} stroke="#fff" />

          <Input
            placeholder={translate("Search Products") + "..."}
            style={styles.searchInputText}
            placeholderTextColor="#fff"
            onChangeText={(value) => {
              this.setState({ keyword: value });
            }}
            onBlur={() => {
              if (
                this.state.keyword.indexOf(" ") !== 0 &&
                this.state.keyword !== ""
              ) {
                this.props._handleSearch(
                  this.state.keyword,
                  this.props.campaign_id,
                  this.props.businessid,
                  {
                    source: this.props.source,
                    source_action: "a_keywords_search",
                  }
                );
              }
            }}
          />
        </Item>

        <View style={styles.scrollViewContainer}>
          <ScrollView>
            {this.props.loading ? (
              <ActivityIndicator
                color="#fff"
                size="large"
                style={{ height: 150 }}
              />
            ) : (
              list
            )}
          </ScrollView>
        </View>

        {this.props.selected.length === 0 ? (
          <Text style={styles.infoText}>
            {translate("Add Products so your")}
            {"\n"}
            {translate("Ad reaches the right audience")}
          </Text>
        ) : (
          <>
            <View style={styles.selectedContainer}>
              <ScrollView
                style={{ marginVertical: 10 }}
                contentContainerStyle={styles.selectedScrollView}
              >
                {selectedlist}
              </ScrollView>
            </View>
            <Text
              style={[styles.inactivetext, styles.resetText]}
              onPress={() => {
                this.props._handleAddItem("Reset");
              }}
            >
              {translate("Reset")}
            </Text>
          </>
        )}
      </View>
    );
  }
}
