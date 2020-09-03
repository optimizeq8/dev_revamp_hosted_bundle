import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PhoneInput from "../PersonalInfo/PhoneInput";
import { Input } from "native-base";
import styles from "./styles";

//icons
import PenIcon from "../../../assets/SVGs/Pen";

import GradientButton from "../../MiniComponents/GradientButton";

Card = ({
  screenProps,
  detail,
  heading,
  bottomText,
  disabled,
  toggleVerify,
  stateName,
  editField,
  changePhoneNo,
  onPress,
  valid,
}) => {
  const { translate } = screenProps;
  return (
    <View style={styles.mobileDetailCard}>
      <View style={styles.rowView}>
        {stateName === "mobile" && (
          <TouchableOpacity onPress={() => editField(stateName, !disabled)}>
            <PenIcon />
          </TouchableOpacity>
        )}

        <View
          style={[
            { flex: 1 },
            stateName === "mobile" && { paddingHorizontal: 10 },
          ]}
        >
          <Text style={styles.heading}>{translate(heading)}</Text>
          {stateName === "mobile" && disabled ? (
            <PhoneInput
              disabled={!disabled}
              phoneNum={detail}
              screenProps={screenProps}
              changeNo={changePhoneNo}
              valid={valid}
            />
          ) : stateName === "mobile" && !disabled ? (
            <Input
              editable={disabled}
              value={detail}
              style={styles.detailInput}
              autoCorrect={false}
            />
          ) : (
            <Text style={styles.detailInputText}>{detail}</Text>
          )}
        </View>
        <GradientButton
          onPressAction={onPress}
          style={[styles.verifyButton]}
          uppercase
          text={translate("Verify")}
        />
      </View>
      <TouchableOpacity onPress={toggleVerify}>
        <Text style={styles.bottomText}>{translate(bottomText)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
