import React from "react";
import { globalColors } from "../../../GlobalStyles";
import { Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

/**
 * Styled component to be used to wrap texts that're supposed to be small
 * @method
 * @param {Object} props the props that sent to this function
 * @param {React Element} props.children what ever is wrapped between <Small> </Small>
 * @returns {React Element} Styled Text component from react-native
 */
export const Small = (props) => (
  <Text
    style={[
      {
        fontFamily: "montserrat-bold",
        fontSize: RFValue(8.5, 414),
        color: globalColors.white,
      },
      props.style,
    ]}
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
export const Bold = (props) => (
  <Text style={[{ fontFamily: "montserrat-bold" }, props.style]}>
    {props.children}
  </Text>
);
