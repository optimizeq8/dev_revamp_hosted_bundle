import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";
import { Button, Text, Icon, Item, Input } from "native-base";
import styles from "./styles";
import isArray from "lodash/isArray";
import isUndefined from "lodash/isUndefined";
import GreenCheckmarkIcon from "../../../assets/SVGs/GreenCheckmark.svg";
import PlusCircleIcon from "../../../assets/SVGs/PlusCircleOutline.svg";
import globalStyles from "../../../GlobalStyles";
import SearchIcon from "../../../assets/SVGs/Search.svg";
import segmentEventTrack from "../../segmentEventTrack";

export default class KeywordsSelectionList extends Component {
  constructor() {
    super();
    this.state = {
      filteredList: [],
      keyword: ""
    };
  }
  componentDidMount() {
    this.setState({
      filteredList: this.props.data
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data[0] !== this.props.data[0]) {
      this.setState({
        filteredList: this.props.data
      });
    }
  }

  itemComponent = x => (
    <TouchableOpacity
      // key={x}
      style={[
        globalStyles.orangeBackgroundColor,
        {
          //  borderRadius: 15,
          //  margin: 5
          // width: "28%"
          // height: 30
          // padding: 10
        },
        {
          overflow: "hidden",
          justifyContent: "center",
          height: 34,
          //  borderColor: colors.chipColor,
          //  borderWidth: 1,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
          margin: 3,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0
        }
      ]}
      onPress={() => {
        this.props._handleAddItem(x.item);
      }}
    >
      <Text
        style={[
          styles.inactivetext,
          styles.optionsTextContainer,
          {
            marginRight: 0,
            padding: 7
            //  lineHeight: 17
            // height: 34
            // margin: 10
          }
        ]}
        numberOfLines={1}
      >
        {x.item}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { translate } = this.props.screenProps;
    let list = this.state.filteredList.map(x => {
      var found;
      if (isArray(this.props.selected)) {
        found = !isUndefined(this.props.selected.find(l => l === x));
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

    let selectedlist = this.props.selected.map(x => {
      return (
        <TouchableOpacity
          key={x}
          style={[
            globalStyles.orangeBackgroundColor,
            {
              //  borderRadius: 15,
              //  margin: 5
              // width: "28%"
              // height: 30
              // padding: 10
            },
            {
              // width: "30%",
              // flex: "1 0 33%",
              overflow: "hidden",
              justifyContent: "center",
              height: 26,
              //  borderColor: colors.chipColor,
              //  borderWidth: 1,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              // paddingLeft: 10,
              margin: 3,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0
            }
          ]}
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
                alignSelf: "center"
                //  lineHeight: 17
                // height: 34
                // margin: 10
              }
            ]}
            numberOfLines={1}
          >
            {x}
          </Text>
          <Icon
            name="close"
            style={[
              {
                color: "#fff",
                fontSize: 20,
                marginRight: 10
                // marginVertical: 7
              }
            ]}
          />
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.optionsContainer}>
        <Item
          style={{
            marginBottom: 10,
            marginTop: 20,
            alignSelf: "center",
            width: 300,
            borderColor: "#0000",
            backgroundColor: "rgba(0,0,0,0.15)",
            borderRadius: 30,
            paddingHorizontal: 15
          }}
        >
          <SearchIcon width={18} height={18} stroke="#fff" style={{}} />

          <Input
            placeholder={translate("Search Products") + "..."}
            style={styles.searchInputText}
            placeholderTextColor="#fff"
            onChangeText={value => {
              // let filteredList = this.props.data.filter(c =>
              //   c.toLowerCase().includes(value.toLowerCase())
              // );
              this.setState({ keyword: value });
            }}
            onBlur={() => {
              segmentEventTrack("Search keyword field on Blur", {
                campaign_keyword_search: this.state.keyword
              });
              this.props._handleSearch(
                this.state.keyword,
                this.props.campaign_id,
                this.props.businessid
              );
            }}
          />
        </Item>
        {/* <TouchableOpacity style={styles.optionsRowContainer}>
          <View style={globalStyles.column}>
            <PlusCircleIcon width={25} height={25} />
          </View>
          <Text style={[styles.inactivetext, styles.optionsTextContainer]}>
            Interest Example
          </Text>
        </TouchableOpacity> */}
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
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "montserrat-regular",
              fontSize: 14,
              width: 250,
              paddingTop: 50,
              alignSelf: "center"
            }}
          >
            {translate("Add Products so your")}
            {"\n"}
            {translate("Ad reaches the right audience")}
          </Text>
        ) : (
          <>
            <View
              style={{
                // position: "absolute",
                // top: "20%",
                width: "100%",
                height: "40%",
                marginTop: 20,
                // backgroundColor: "rgba(0,0,0,0.15)",
                padding: 5,
                borderRadius: 10
              }}
            >
              <ScrollView
                style={{ marginVertical: 10 }}
                contentContainerStyle={{
                  // paddingTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
                  // alignItems: "center"
                  // justifyContent: "space-around"
                }}
              >
                {selectedlist}
              </ScrollView>
              {/* <FlatList
                contentContainerStyle={{
                  paddingTop: 20,
                  width: "100%",

                  // paddingBottom: 50,
                  alignItems: "center",
                  flexGrow: 1
                }}
                data={this.props.selected}
                // horizontal={true}
                keyExtractor={x => {
                  console.log("x??", x);

                  return x;
                }}
                renderItem={this.itemComponent}
                numColumns={2}
              /> */}
            </View>
            <Text
              style={[
                styles.inactivetext,
                {
                  alignSelf: "center",
                  paddingTop: 20,
                  margin: 0
                }
              ]}
              onPress={() => {
                this.props._handleAddItem("Reset");
              }}
            >
              Reset
            </Text>
          </>
        )}
      </View>
    );
  }
}
