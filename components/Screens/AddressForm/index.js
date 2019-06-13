//Components
import React, { Component } from "react";
import { View, BackHandler } from "react-native";
import { Segment } from "expo";
import { Container } from "native-base";
import { Modal } from "react-native-paper";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import BillingAddressCard from "../../MiniComponents/BillingAddressCard";
import SelectBillingAddressCard from "../../MiniComponents/SelectBillingAddressCard";
import { SafeAreaView } from "react-navigation";
import Header from "../../MiniComponents/Header";

// Style
import styles from "./styles";

//Icons
import Address from "../../../assets/SVGs/Location";

//Redux
import * as actionCreators from "../../../store/actions/";
import { connect } from "react-redux";

//Functions
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";
import Countries from "../../MiniComponents/BillingAddressCard/Countries";
import isEqual from "lodash/isEqual";

class AddressForm extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      address: {
        country: "",
        area: "",
        block: "",
        street: "",
        building: "",
        office: "",
        avenue: ""
      },
      addressId: null,
      country_code: "",
      region_id: [],

      sidemenustate: false,
      sidemenu: "",

      inputC: false,
      inputA: false,
      inputBL: false,
      inputS: false,
      inputB: false,
      inputO: false,
      inputAv: false,
      countryError: "",
      areaError: "",
      blockError: "",
      streetError: "",
      buildingError: ""
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    Segment.screen("Address Form Screen");
    this.props.getAddressDetail();
    this.setState({
      from: this.props.navigation.getParam("from", null),
      kdamount: this.props.navigation.getParam("kdamount", null),
      interestNames: this.props.navigation.getParam("interestNames", null)
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.address &&
      this.props.address &&
      (!isEqual(prevProps.address, this.props.address) ||
        (prevState.address.country === "" &&
          prevState.address.area === "" &&
          prevState.address.block === "" &&
          prevState.address.street === "" &&
          prevState.address.building === "" &&
          prevState.address.avenue === "" &&
          prevState.address.office === ""))
    ) {
      const bsn_address = {
        country: this.props.address.country,
        area: this.props.address.area,
        block: this.props.address.block,
        street: this.props.address.street,
        building: this.props.address.building,
        avenue: this.props.address.avenue,
        office: this.props.address.office
      };
      let country_code = Countries.find(
        co => co.label === this.props.address.country
      );
      this.setState({
        address: bsn_address,
        addressId: this.props.address.id,
        country_code: country_code ? country_code.value : ""
      });
    }
  }

  _handleAddressChange = (key, value, country_code) => {
    if (key === "address") {
      this.setState({
        address: value,
        country_code
      });
    } else {
      this.setState({
        address: { ...this.state.address, [key]: value },
        country_code
      });
    }
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };
  _handleSubmission = () => {
    this.props.addressForm(
      this.state.address,
      this.props.navigation,
      this.state.addressId
    );
  };

  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ bottom: "never" }}
      >
        <Container style={styles.container}>
          {/* {!this.state.sidemenustate && (
            <View style={styles.headerBlock}>
              <Header
                title={"Billing Address"}
                navigation={this.props.navigation}
              />
            
              <Address
                fill="#fff"
                style={styles.addressIcon}
                width={55}
                height={55}
              />
            </View>
          )} */}
          <View style={styles.dataContainer}>
            {/* TODO: When user selects CC display this */}
            {this.state.from === "creditCard" &&
            !isUndefined(this.state.addressId) &&
            !isNull(this.state.addressId) ? (
              <SelectBillingAddressCard
                address={this.state.address}
                addressId={this.state.addressId}
                navigation={this.props.navigation}
                kdamount={this.state.kdamount}
              />
            ) : (
              <BillingAddressCard
                address={this.state.address}
                _handleSubmission={this._handleSubmission}
                _handleAddressChange={this._handleAddressChange}
                country_code={this.state.country_code}
                _handleSideMenuState={this._handleSideMenuState}
                sidemenustate={this.state.sidemenustate}
                errorLoading={this.props.errorLoading}
                navigation={this.props.navigation}
              />
            )}
          </View>
        </Container>
        <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  address: state.account.address,
  loading: state.account.loadingBillingAddress,
  errorLoading: state.account.errorLoadingBillingAddress
});

const mapDispatchToProps = dispatch => ({
  addressForm: (address, navigation, addressId) =>
    dispatch(actionCreators.addressForm(address, navigation, addressId)),
  getAddressDetail: () => dispatch(actionCreators.getAddressForm())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm);
