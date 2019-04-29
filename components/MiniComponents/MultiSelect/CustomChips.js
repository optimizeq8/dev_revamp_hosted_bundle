import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class CustomChips extends Component {
  _renderChips = () => {
    const { selectedItems, showRemoveAll } = this.props;
    return selectedItems.length > 0 ? (
      <View
        style={[
          {
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row"
          }
        ]}
      >
        {selectedItems.length > 1 ? (
          <View
            style={[
              {
                overflow: "hidden",
                justifyContent: "center",
                height: 34,
                borderColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                margin: 3,
                paddingTop: 0,
                paddingRight: 10,
                paddingBottom: 0,
                borderRadius: 20,
                borderWidth: 1
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.Section._removeAllItems();
              }}
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20
              }}
            >
              <Text
                style={[
                  {
                    color: "#fff",
                    fontSize: 13,
                    marginRight: 0
                  }
                ]}
              >
                Remove All
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this._displaySelectedItems()}
      </View>
    ) : null;
  };
  _displaySelectedItems = () => {
    const { uniqueKey, selectedItems, displayKey } = this.props;
    return selectedItems.map(singleSelectedItem => {
      const item = this.props.Section._findItem(singleSelectedItem);
      if (!item || !item[displayKey]) return null;
      return (
        <View
          style={[
            {
              overflow: "hidden",
              justifyContent: "center",
              height: 34,
              borderColor: "#fff",
              borderWidth: 1,
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
          key={item[uniqueKey]}
        >
          <Text
            numberOfLines={1}
            style={[
              {
                color: "#fff",
                fontSize: 13,
                marginRight: 0
              }
            ]}
          >
            {item[displayKey]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.Section._removeItem(item);
            }}
            style={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20
            }}
          >
            <Icon
              name="close"
              style={[
                {
                  color: "#fff",
                  fontSize: 16,
                  marginHorizontal: 6,
                  marginVertical: 7
                }
              ]}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };
  render() {
    return (
      <View style={{ height: heightPercentageToDP(40), top: "5%" }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: heightPercentageToDP(20) }}
        >
          {this._renderChips()}
        </ScrollView>
      </View>
    );
  }
}
