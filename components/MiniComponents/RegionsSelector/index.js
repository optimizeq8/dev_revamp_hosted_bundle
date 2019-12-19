import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input, Icon, Content } from "native-base";
import { SafeAreaView } from "react-navigation";
import LoadingScreen from "../LoadingScreen";

//Icon
import LocationIcon from "../../../assets/SVGs/Location.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";

//Styles
import styles from "./styles";

import isUndefined from "lodash/isUndefined";

class RegionsSelector extends Component {
  constructor() {
    super();
    this.state = {
      filteredRegions: []
    };
  }
  componentDidMount() {
    this.setState({
      filteredRegions: this.props.locationsFetchedList
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        filteredRegions: this.props.locationsFetchedList
      });
    }
  }

  render() {
    // console.log("loca", this.props.locationsFetchedList);
    const { translate } = this.props.screenProps;
    if (this.props.loading) {
      return <LoadingScreen top={50} />;
    } else {
      let regionslist = this.state.filteredRegions.map(r => {
        var found = !isUndefined(this.props.locations.find(l => l === r.id));
        // console.log("location", r.location);
        return (
          <TouchableOpacity
            key={r.id}
            style={styles.selectTextContainer}
            onPress={() => {
              this.props.onSelectRegions(r.id);
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Icon
                type="MaterialCommunityIcons"
                name={found ? "circle" : "circle-outline"}
                style={[
                  styles.itemCircles,
                  { color: found ? "#FF9D00" : "#fff" }
                ]}
              />
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 14,
                  textAlign: "left",
                  justifyContent: "center",
                  alignSelf: "center",
                  paddingLeft: 10,
                  width: 180,
                  color: "#fff"
                }}
                numberOfLines={2}
              >
                {translate(r.location)}
              </Text>
            </View>
            <Text
              style={{
                // flex: 0,
                fontFamily: "montserrat-bold-english",
                color: "#fff",
                fontSize: 14,
                justifyContent: "center",
                alignSelf: "center"
                // marginRight: 10
              }}
            >
              {r.reach}
            </Text>
          </TouchableOpacity>
        );
      });
      return (
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <LocationIcon width={50} height={80} fill="#fff" />
            {/* <Text style={styles.title}> Select REGIONS </Text> */}

            <View style={styles.slidercontainer}>
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
                  placeholder={translate("Search Region") + "..."}
                  style={styles.searchInputText}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredR = this.props.locationsFetchedList.filter(c =>
                      // console.log("c", c)

                      translate(c.location)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                    this.setState({ filteredRegions: filteredR });
                  }}
                />
              </Item>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text uppercase style={styles.title}>
                  {translate("Top results")}
                </Text>
                <Text uppercase style={styles.title}>
                  {translate("Reach")}
                </Text>
              </View>
              <View style={styles.scrollContainer}>
                <ScrollView
                // scrollEnabled={true}
                // bounces={false}
                // style={styles.countryScrollContainer}
                >
                  {/* <Content
                //   scrollEnabled={false}
                padder
                indicatorStyle="white"
                contentContainerStyle={styles.contentContainer}
                 >*/}
                  {regionslist}
                  {/* </Content> */}
                </ScrollView>
              </View>
            </View>
          </View>

          {/* <Button
            style={styles.button}
            onPress={() => this.props._handleMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button> */}
        </View>
      );
    }
  }
}

export default RegionsSelector;
