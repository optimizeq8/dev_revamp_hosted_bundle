import React, { Component } from "react";
import { View, Text } from "react-native";
import Toggle from "../../../MiniComponents/Toggle/";
import styles from "./styles";

/**
 * A functional component that renders the MemberType switch
 *
 * @param {Any} props the props that get sent from the parent function or component
 * @return {Component} the displayed component
 */
export default (props) => {
  let { member, userRole, handleMemberType, translate } = props;
  return (
    <View style={styles.memberTypeView}>
      <Toggle
        switchOn={member.id === userRole}
        backgroundColorOff="rgba(255,255,255,0.1)"
        backgroundColorOn="rgba(255,255,255,0.1)"
        circleColorOff="#FFf"
        circleColorOn="#66D072"
        duration={500}
        onPress={() => handleMemberType(member.id)}
        circleStyle={styles.toggleCircle}
        containerStyle={styles.toggleStyle}
      />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          paddingLeft: 10,
        }}
      >
        <Text uppercase style={styles.meberTypeStyle}>
          {translate(member.type)}{" "}
        </Text>

        <Text style={styles.memberDescription}>
          {translate(member.description)}
        </Text>
      </View>
    </View>
  );
};
