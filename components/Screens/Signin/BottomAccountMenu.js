import { Icon } from "native-base";
import React, { PureComponent } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import bottomeStyles from "./BottomMenuStyles";
export default class BottomAccountMenu extends PureComponent {
  render() {
    let {
      showMultipleAccounts,
      showAccountsModal,
      userConnectedBiometrics = [],
      loginAuthorizedUser,
      translate,
    } = this.props;
    return (
      <Modal animationType={"slide"} visible={showMultipleAccounts} transparent>
        <View style={bottomeStyles.menuContainer}>
          <View style={bottomeStyles.menuHeader}>
            <Text style={bottomeStyles.menuHeaderText}>
              {translate("Choose an account")}
            </Text>
            <TouchableOpacity onPress={showAccountsModal}>
              <Icon type="MaterialCommunityIcons" name="close" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            {userConnectedBiometrics.map((acc) => (
              <TouchableOpacity
                key={acc.username}
                onPress={() => loginAuthorizedUser(acc)}
                style={bottomeStyles.menuButton}
              >
                <Icon type="MaterialCommunityIcons" name="account" />
                <Text style={bottomeStyles.menuButtonText}>{acc.username}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
