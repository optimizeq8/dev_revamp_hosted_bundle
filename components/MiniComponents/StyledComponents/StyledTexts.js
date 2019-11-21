import React from "react";
import { globalColors } from "../../../GlobalStyles";
import { Text } from "react-native";

/**
 * Styled component to be used to wrap texts that're supposed to be small
 * @method
 * @param {Object} props the props that sent to this function
 * @param {React Element} props.children what ever is wrapped between <Small> </Small>
 * @returns {React Element} Styled Text component from react-native
 */
export const Small = props => (
  <Text
    style={{
      fontFamily: "montserrat-medium",
      fontSize: 17,
      color: globalColors.white
    }}
  >
    {props.children}
  </Text>
);

/**
 * Styled component to be used to wrap texts that're supposed to be bold
 * @method
 * @param {Object} props the props that sent to this function
 * @param {React Element} props.children what ever is wrapped between <Bold> </Bold>
 * @returns {React Element} Styled Text component from react-native
 */
export const Bold = props => (
  <Text style={{ fontFamily: "montserrat-bold" }}>{props.children}</Text>
);
