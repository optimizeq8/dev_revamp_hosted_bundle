import React from "react";
import { View, Image } from "react-native";
import { Text, Container, Content, Item, Input } from "native-base";
import { SafeAreaView } from "react-navigation";
import KeyBoardShift from "../../../../MiniComponents/KeyboardShift";
import CustomeHeader from "../../../../MiniComponents/Header";
import LowerButton from "../../../../MiniComponents/LowerButton";
import styles from "./styles";
import { globalColors } from "../../../../../GlobalStyles";
import findIndex from "lodash/findIndex";
import formatNumber from "../../../../formatNumber";
import { showMessage } from "react-native-flash-message";

export default class EditProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      cartList: [],
      productNameError: true,
      priceError: true
    };
  }
  componentDidMount() {
    const item = this.props.navigation.getParam("item", {});
    const list = this.props.navigation.getParam("cartList", []);
    // console.log('item', item);
    this.setState({
      item: item,
      cartList: list,
      productNameError:
        !item.productName ||
        (item.productName && item.productName.length === 0),
      priceError: !item.price || (item.price && item.price.length === 0)
    });
  }
  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    if (
      /^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9]{3})?$/.test(
        this.state.item.price
      )
    ) {
      const newList = [...this.state.cartList];
      const index = findIndex(
        newList,
        item => item.imageId === this.state.item.imageId
      );
      newList[index] = this.state.item;
      // console.log('newList', newList);

      this.props.navigation.navigate("SelectedInstagramProductsList", {
        selectetedItems: newList
      });
    } else {
      showMessage({
        message: translate("Please enter a valid price"),
        position: "top",
        description: translate("eg 1 1500  1000 10000500"),
        type: "warning"
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <Container style={styles.container}>
          <CustomeHeader
            title={translate("WhatsApp Campaign")}
            closeButton={false}
            navigation={this.props.navigation}
          />
          <Content
            style={{
              paddingTop: 20,
              // paddingHorizontal: 20,
              flexGrow: 1
              // marginBottom: heightPercentageToDP(30),
            }}
          >
            <KeyBoardShift>
              {() => (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingVertical: 20
                    }}
                  >
                    <Image
                      style={{
                        width: 250,
                        height: 250,
                        borderRadius: 20
                      }}
                      source={{ uri: this.state.item.imageUrl }}
                    />
                    <View style={styles.inputContainer}>
                      <View style={styles.websiteView}>
                        <View style={[styles.websiteLabelView]}>
                          <Text uppercase style={[styles.inputLabel]}>
                            {translate("Product Name")}
                          </Text>
                        </View>
                        <Item
                          style={[
                            styles.input
                            // this.state.urlError
                            //     ? GlobalStyles.redBorderColor
                            //     : GlobalStyles.transparentBorderColor
                          ]}
                        >
                          <Input
                            style={[styles.inputtext]}
                            placeholder={translate("Enter Product Name")}
                            placeholderTextColor={globalColors.white}
                            value={this.state.item.productName}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={value =>
                              this.setState({
                                item: {
                                  ...this.state.item,
                                  productName: value
                                },
                                productNameError: value.length === 0
                              })
                            }
                            // onBlur={() => this.validateUrl()}
                          />
                        </Item>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.websiteView}>
                        <View style={[styles.websiteLabelView]}>
                          <Text uppercase style={[styles.inputLabel]}>
                            {translate("price")}
                          </Text>
                        </View>
                        <Item
                          style={[
                            styles.input
                            // this.state.urlError
                            //     ? GlobalStyles.redBorderColor
                            //     : GlobalStyles.transparentBorderColor
                          ]}
                        >
                          <Input
                            keyboardType="numeric"
                            style={[styles.inputtext]}
                            placeholder={translate("Enter Price")}
                            placeholderTextColor={globalColors.white}
                            value={this.state.item.price}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={value =>
                              this.setState({
                                item: {
                                  ...this.state.item,
                                  price: value
                                },
                                priceError: value.length === 0
                              })
                            }
                            // onBlur={() => this.validateUrl()}
                          />
                        </Item>
                      </View>
                    </View>
                  </View>
                  {!this.state.productNameError && !this.state.priceError && (
                    <View style={styles.bottonViewWebsite}>
                      <LowerButton
                        checkmark={true}
                        bottom={0}
                        function={this._handleSubmission}
                      />
                    </View>
                  )}
                </>
              )}
            </KeyBoardShift>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
