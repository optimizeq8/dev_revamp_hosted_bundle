import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";

// Components
import Header from "../../MiniComponents/Header";

import { globalColors } from "../../../GlobalStyles";

// ICONS
import PenIcon from "../../../assets/SVGs/Pen";
import TrashIcon from "../../../assets/SVGs/Bin.svg";

export default class SnapchatCampaignAudience extends React.Component {
  renderCard = ({ item }) => {
    console.log("name", item);
    return (
      <TouchableOpacity
        key={item.name}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          marginHorizontal: 10,
          border: 2,
          borderColor: globalColors.gray,
          backgroundColor: "#fff",
          borderRadius: 20,
          marginVertical: 7,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textTransform: "uppercase",
            fontFamily: "montserrat-bold",
            color: globalColors.gray,
          }}
        >
          {item.name}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <PenIcon width={20} height={20} fill={globalColors.purple} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <TrashIcon width={20} height={20} fill={globalColors.purple} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: "#f8f8f8", flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Header
          title={"Audience"}
          screenProps={this.props.screenProps}
          titleStyle={{ color: globalColors.purple2 }}
        />
        <FlatList
          data={[
            { name: "KWT-GRP 01" },
            { name: "KSA-GRP 01" },
            { name: "BH-GRP 01" },
          ]}
          renderItem={this.renderCard}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }
}
