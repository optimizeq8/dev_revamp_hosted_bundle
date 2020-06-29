import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import Header from "../../MiniComponents/Header";
import { Content } from "native-base";
import { SafeAreaView } from "react-navigation";
import LowerButton from "../../MiniComponents/LowerButton";
import InputField from "../../MiniComponents/InputField";
import styles from "./Styles";
import BusinessCard from "../../MiniComponents/BusinessCard";
export default class BusinessModal extends Component {
  state = { isVisible: false, dataSource: [] };
  componentDidMount() {
    let accounts = this.props.businessAccounts.filter((item) => {
      if (item.user_role === "1") {
        item.isSelected = false;
        return item;
      }
    });
    this.setState({
      dataSource: accounts,
    });
  }
  setModalVisible = (isVisible) => {
    this.setState({ isVisible });
  };

  selectItem = (data) => {
    data.item.isSelected = !data.item.isSelected;

    const index = this.state.dataSource.findIndex(
      (item) => data.item.businessid === item.businessid
    );

    this.state.dataSource[index] = data.item;
    this.props.handleAccounts(data.item);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };
  renderItem = (data) => {
    return (
      <BusinessCard
        manageTeam={true}
        business={data.item}
        key={data.item.businessid}
        selectAccount={() => this.selectItem(data)}
        isSelected={data.item.isSelected}
      />
    );
  };
  render() {
    let { isVisible } = this.state;
    let { numOfAccounts } = this.props;

    return (
      <>
        <InputField
          setModalVisible={this.setModalVisible}
          modal={true}
          label={"Accounts"}
          translate={this.props.screenProps.translate}
          numOfAccounts={numOfAccounts}
        />
        <Modal
          animationOut={"fadeOut"}
          animationIn={"fadeIn"}
          style={{ margin: 0 }}
          // animationType={"fade"}
          transparent={true}
          isVisible={isVisible}
        >
          <BlurView intensity={95} tint="dark">
            <SafeAreaView
              style={{ height: "100%" }}
              forceInset={{ bottom: "never", top: "always" }}
            >
              <View style={{ height: "98%" }}>
                <Header
                  closeButton={false}
                  actionButton={() => {
                    this.setModalVisible(false);
                  }}
                  screenProps={this.props.screenProps}
                  title={"Campaign Objective"}
                />
                <FlatList
                  data={this.state.dataSource}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={(item) => this.renderItem(item)}
                  keyExtractor={(item) => item.businessid.toString()}
                  extraData={this.state}
                  contentContainerStyle={{ paddingTop: 20 }}
                />
                {/* <Content
                  padder
                  indicatorStyle="white"
                  contentContainerStyle={styles.contentContainer}
                >
                  {accounts}
                </Content> */}
                <LowerButton
                  screenProps={this.props.screenProps}
                  bottom={0}
                  function={this.setModalVisible}
                />
              </View>
            </SafeAreaView>
          </BlurView>
        </Modal>
      </>
    );
  }
}
