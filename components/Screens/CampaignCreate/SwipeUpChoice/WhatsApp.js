import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, BackHandler, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text, Item, Input, Icon, Button, Container } from 'native-base';
import { showMessage } from 'react-native-flash-message';
import isEmpty from 'lodash/isEmpty';
// import { Modal } from 'react-native-paper';
import { BlurView } from 'expo-blur';

import Picker from '../../../MiniComponents/Picker';
import KeyboardShift from '../../../MiniComponents/KeyboardShift';
import LowerButton from '../../../MiniComponents/LowerButton';
import PhoneNoField from '../../Signup/PhoneNo/PhoneNoField';
//icons
import WhatsAppIcon from '../../../../assets/SVGs/SwipeUps/WhatsApp';
import SuccessIcon from '../../../../assets/SVGs/Success';
import ErrorIcon from '../../../../assets/SVGs/Error';
import WalletIcon from '../../../../assets/SVGs/Wallet';
import CloseCircleIcon from '../../../../assets/SVGs/CloseCircle';
import ForwardIcon from '../../../../assets/SVGs/ForwardButton';

// Style
import styles from './styles';

//Data
import list from '../../../Data/callactions.data';

import * as actionCreators from '../../../../store/actions';

//Functions
import validateWrapper from '../../../../ValidationFunctions/ValidateWrapper';

class WhatsApp extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			campaignInfo: {
				weburl: '',
				whatsappnumber: '',
				insta_handle: '',
				callnumber: '',
				callaction: list.SnapAd[4].call_to_action_list[0],
			},
			callactions: list.SnapAd[4].call_to_action_list,

			insta_handleError: '',
			showChangeInstaHandle: false,
			inputCallToAction: false,
		};
	}

	componentDidMount() {
		if (
			(this.props.data &&
				this.props.data.hasOwnProperty('attachment') &&
				this.props.data.attachment !== 'BLANK') ||
			this.props.mainBusiness.whatsappnumber !== ''
		) {
			// console.log('capmaignDetail', this.props.data);
			// console.log('mainBusinessInstaHandle', this.props.mainBusiness);

			this.setState({
				campaignInfo: {
					...this.state.campaignInfo,
					weburl: this.props.mainBusiness.weburl ? this.props.mainBusiness.weburl : this.props.data.weburl,
					insta_handle: this.props.data.insta_handle? this.props.data.insta_handle: this.props.mainBusiness.insta_handle
						? this.props.mainBusiness.insta_handle: ''
						,
					whatsappnumber: this.props.mainBusiness.whatsappnumber
						? this.props.mainBusiness.whatsappnumber
						: this.props.data.whatsappnumber,
					callnumber: this.props.mainBusiness.callnumber
						? this.props.mainBusiness.callnumber
						: this.props.data.callnumber,
					callaction:
						this.props.data && this.props.data.call_to_action.value !== 'BLANK'
							? this.props.data.call_to_action
							: list.SnapAd[4].call_to_action_list[0],
				},
			});
		}
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}
	handleBackButton = () => {
		this.props.navigation.goBack();
		return true;
	};
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}
	validate = () => {
		const insta_handleError = validateWrapper('mandatory', this.state.campaignInfo.insta_handle);
		const weburlError = validateWrapper('mandatory', this.state.campaignInfo.weburl);
		const whatsappnumberError = validateWrapper('mandatory', this.state.campaignInfo.whatsappnumber);
		this.setState({
			insta_handleError,
			weburlError,
		});
		if (insta_handleError || weburlError || whatsappnumberError) {
			showMessage({
				message: insta_handleError
					? 'Please provide an instagram handle'
					: weburlError
					? 'Please provide domain name'
					: whatsappnumberError
					? 'Please provide a valid whatsapp number'
					: '',
				type: 'warning',
				position: 'top',
				duration: 7000,
			});
			return false;
		} else {
			return true;
		}
	};

	checkInstaAccountChange = async () => {
		// console.log("data", this.props.data);		
		if (
      ((this.props.data.insta_handle &&
        this.props.data.insta_handle !==
		  this.state.campaignInfo.insta_handle)
		//    || (this.props.mainBusiness.insta_handle &&
        //   this.props.mainBusiness.insta_handle !==
			// this.state.campaignInfo.insta_handle
			// )
			)
			 &&
      this.props.productInfoId
    ) {
      this.setState({
        showChangeInstaHandle: true
      });
    } else {
      await this._handleSubmission();
    }
	};
	_handleSubmission = async () => {
		// if (!this.props.mainBusiness.weburl) {
		await this.props.verifyInstagramHandle(this.state.campaignInfo.insta_handle);
		if (!this.props.errorInstaHandle && !this.props.mainBusiness.weburl) {
			await this.props.verifyBusinessUrl(this.state.campaignInfo.weburl);
		}
		if (this.props.errorInstaHandle) {
			showMessage({
				message: this.props.errorInstaHandleMessage,
				type: 'danger',
				duration: 2000,
			});
		}
		let weburlAvalible = this.props.mainBusiness.weburl || this.props.weburlAvalible;

		if (this.validate() && weburlAvalible && !this.props.errorInstaHandle) {
			let whatsAppCampaign = {
				weburl: this.state.campaignInfo.weburl,
				whatsappnumber: this.state.campaignInfo.whatsappnumber.replace('+', ''),
				insta_handle: this.state.campaignInfo.insta_handle,
				callnumber:
					this.state.campaignInfo.callnumber || this.state.campaignInfo.callnumber !== ''
						? this.state.campaignInfo.callnumber.replace('+', '')
						: this.state.campaignInfo.whatsappnumber.replace('+', ''),
			};
			// check here for insta handle change then update the selectedItemList to []
			// if (this.props.data.insta_handle !== this.state.campaignInfo.insta_handle && this.props.productInfoId) {
			// 	//   console.log('updating to empty list');
			// 	this.props.saveWebProducts(
			// 		[],
			// 		this.props.data.campaign_id,
			// 		this.props.productInfoId,
			// 		this.props.navigation
			// 	);
			// }

			await this.props._changeDestination(
				'REMOTE_WEBPAGE',
				this.state.campaignInfo.callaction,
				{
					url: `https://${this.state.campaignInfo.weburl.replace(/[^0-9a-z]/gi, '')}.optimizeapp.com`,
				},
				null,
				whatsAppCampaign
			);
			if (this.state.showChangeInstaHandle) {
				this.setState({ showChangeInstaHandle: false });
			}

			this.props.navigation.navigate('SelectInstagramPost', {
				insta_handle: this.state.campaignInfo.insta_handle,
			});
		}
	};
	onSelectedCallToActionChange = value => {
		if (value && !isEmpty(value)) {
			this.setState(
				{
					campaignInfo: {
						...this.state.campaignInfo,
						callaction: {
							label: value[0].label,
							value: value[0].value,
						},
					},
				},
				() => {
					this.closeCallToActionModal();
				}
			);
		}
	};
	closeCallToActionModal = () => {
		this.setState({
			inputCallToAction: false,
		});
	};
	onSelectedCallToActionIdChange = value => {
		// NOTE: compulsory to pass this function
		// console.log("businescatId", value);
	};
	changeWhatsAppPhoneNo = (value, validNumber) => {
		this.setState({
			campaignInfo: {
				...this.state.campaignInfo,
				whatsappnumber: validNumber ? value : '',
			},
		});
	};
	changeCallNumberPhoneNo = (value, validNumber) => {
		this.setState({
			campaignInfo: {
				...this.state.campaignInfo,
				callnumber: validNumber ? value : '',
			},
		});
	};
	changeInstaHandle = value => {
		this.setState({
			campaignInfo: {
				...this.state.campaignInfo,
				insta_handle: value,
			},
		});
	};
	changeWebUrl = value => {
		this.setState({
			campaignInfo: {
				...this.state.campaignInfo,
				weburl: value.replace(/[^0-9a-z]/gi, ''),
			},
		});
	};
	render() {
		const { translate } = this.props.screenProps;
		return (
			<SafeAreaView forceInset={{ top: 'always', bottom: 'never' }} style={[styles.safeAreaContainer]}>
				<KeyboardShift style={{ flex: 1 }}>
					{() => (
						<View style={[styles.whatsApp]}>
							<WhatsAppIcon width={60} height={60} fill="#fff" style={[styles.icon]} />
							<View style={[styles.textcontainer]}>
								<Text style={styles.titletext}>{translate('WhatsApp Leads')}</Text>
								<Text style={styles.subtext}>
									{translate(
										'We’ll create a mini website for your business Just fill in the info below'
									)}
								</Text>
							</View>
							<ScrollView contentContainerStyle={styles.scrollViewContainer}>
								<View style={[styles.whatsAppDetailContainer]}>
									{!this.props.mainBusiness.weburl && (
										<View style={styles.marginVertical}>
											<Text style={[styles.subTitle]}>
												{translate('Pick a domain for your Website')}
											</Text>
											<View style={[styles.callToActionLabelView]}>
												<Text uppercase style={[styles.inputLabel]}>
													{translate('domain')}
												</Text>
											</View>
											<Item
												rounded
												style={[
													styles.input,
													{
														paddingHorizontal: 0,
														// width: "50%"
													},
													//   this.state.weburlError
													//     ? GlobalStyles.redBorderColor
													//     : GlobalStyles.transparentBorderColor
												]}
											>
												<Input
													style={[styles.businessInputText]}
													placeholder="eg. businessname"
													placeholderTextColor="#FF9D00"
													value={this.state.campaignInfo.weburl}
													autoCorrect={false}
													autoCapitalize="none"
													onChangeText={value => this.changeWebUrl(value)}
													onBlur={() => {
														this.validate();
														if (!this.props.mainBusiness.weburl) {
															this.props.verifyBusinessUrl(
																this.state.campaignInfo.weburl
															);
														}
													}}
												/>
												<Text style={[styles.url]}>.optimizeapp.com</Text>
											</Item>
										</View>
									)}
									<View style={styles.marginVertical}>
										{/* <Text style={[styles.subTitle]}>Call to action</Text> */}
										<Picker
											searchPlaceholderText={translate('Search Call To Action')}
											data={this.state.callactions}
											uniqueKey={'value'}
											displayKey={'label'}
											open={this.state.inputCallToAction}
											onSelectedItemsChange={this.onSelectedCallToActionIdChange}
											onSelectedItemObjectsChange={this.onSelectedCallToActionChange}
											selectedItems={[this.state.campaignInfo.callaction.value]}
											single={true}
											screenName={'Swipe up destination WhatsApp'}
											closeCategoryModal={this.closeCallToActionModal}
										/>
										<View style={[styles.callToActionLabelView]}>
											<Text uppercase style={[styles.inputLabel]}>
												{translate('call to action')}
											</Text>
										</View>
										<Item
											rounded
											style={[styles.input]}
											onPress={() => {
												this.setState({ inputCallToAction: true });
											}}
										>
											<Text style={styles.callActionLabel}>
												{this.state.campaignInfo.callaction.label}
											</Text>
											<Icon type="AntDesign" name="down" style={styles.downArrowIcon} />
										</Item>
									</View>

									<View style={styles.marginVertical}>
										{/* <Text style={[styles.subTitle]}>WhatsApp number</Text> */}
										<Text style={[styles.subtext, { fontFamily: 'montserrat-regular' }]}>
											{translate('Customers would be able to call And text this number')}
										</Text>
									</View>
									<View style={styles.marginVertical}>
										<View style={[styles.callToActionLabelView]}>
											<Text uppercase style={[styles.inputLabel]}>
												{translate('whatsApp')}
											</Text>
										</View>
										<PhoneNoField
											screenProps={this.props.screenProps}
											whatsApp
											phoneNum={this.state.campaignInfo.whatsappnumber}
											changeNo={this.changeWhatsAppPhoneNo}
											invite={true}
										/>
									</View>
									<View style={styles.marginVertical}>
										<View style={[styles.callToActionLabelView]}>
											<Text uppercase style={[styles.inputLabel]}>
												{translate('mobile')}
											</Text>
										</View>
										{/* <Text style={[styles.subTitle]}>Phone number (optional)</Text> */}
										<PhoneNoField
											screenProps={this.props.screenProps}
											whatsApp
											phoneNum={this.state.campaignInfo.callnumber}
											changeNo={this.changeCallNumberPhoneNo}
											invite={true}
										/>
									</View>

									<View style={styles.marginVertical}>
										{/* <Text style={[styles.subTitle]}>Instagram handle</Text> */}
										<View style={[styles.callToActionLabelView]}>
											<Text uppercase style={[styles.inputLabel]}>
												{translate('instagram')}
											</Text>
										</View>
										<Item
											rounded
											style={[
												styles.input,
												{
													paddingHorizontal: 0,
													// width: "75%"
												},
												//   this.state.insta_handleError
												//     ? GlobalStyles.redBorderColor
												//     : GlobalStyles.transparentBorderColor
											]}
										>
											<Icon
												style={{ color: '#FFF', position: 'absolute' }}
												name="at"
												type="MaterialCommunityIcons"
											/>
											<Input
												style={styles.inputtext}
												placeholder="Handle"
												placeholderTextColor="#fff"
												value={this.state.campaignInfo.insta_handle}
												autoCorrect={false}
												autoCapitalize="none"
												onChangeText={value => this.changeInstaHandle(value)}
												onBlur={() => {
													this.validate();
													// if (!this.props.errorInstaHandle) {
													this.props.verifyInstagramHandle(
														this.state.campaignInfo.insta_handle
													);
													// }
												}}
											/>
											{this.props.errorInstaHandle && (
												<ErrorIcon width={25} height={25} style={{ marginRight: 10 }} />
											)}
											{!this.props.errorInstaHandle && (
												<SuccessIcon width={25} height={25} style={{ marginRight: 10 }} />
											)}
										</Item>
										<Text
											style={{
												paddingTop: 12,
												paddingHorizontal: 50,
												fontSize: 14,
												fontFamily: 'montserrat-regular',
												color: '#fff',
												textAlign: 'center',
											}}
										>
											{this.props.errorInstaHandleMessage}
										</Text>
									</View>
								</View>
								<View style={styles.bottonViewWebsite}>
									<LowerButton checkmark={true} bottom={-5} function={this.checkInstaAccountChange} />
								</View>
							</ScrollView>
						</View>
					)}
				</KeyboardShift>
				<Modal
					animationType={'fade'}
					transparent={Platform.OS === 'ios'}
					dismissable
					onRequestClose={() => this.setState({ showChangeInstaHandle: false })}
					visible={this.state.showChangeInstaHandle}
					// style={{
					// 	position: 'absolute',
					// 	top: 0,
					// 	// height: '100%',
					// 	left: 0,
					// 	right: 0,
					// 	bottom: 0,
					// }}
					// contentContainerStyle={{
					// 	// flex: 1,
					// 	// marginTop: 0,
					// 	position: 'absolute',
					// 	top: -100,
					// 	height: '100%',
					// 	left: 0,
					// 	right: 0,
					// 	bottom: 0,
					// }}
				>
					<BlurView tint="dark" intensity={100} style={styles.BlurView}>
						<View style={styles.walletPaymentModalContainer}>
							<>
								{/* <WalletIcon width={80} height={80} /> */}
								<Text
									style={{
										fontSize: 160,
										color: '#ff9d00',
										fontFamily: 'montserrat-regular',
									}}
								>
									!
								</Text>
								<Text style={styles.instagramWarningHeadingText}>
									{translate('Instagram Handle Changed')}
								</Text>

								<Text style={styles.instagramWarningDescriptionText}>
									{translate(
										'You have changed the Instagram handle, if you continue it will reset your previous products/price selections'
									)}
								</Text>
								{/* <Button
                    // onPress={() => this.removeWalletAmountAndGoBack()}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>Confirm</Text>
                  </Button>
                  <Button
                    // onPress={() => this.showRemoveAmountModal()}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>Cancel</Text>
                  </Button> */}
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
										// flex: 1,
										width: '100%',
										paddingTop: 60,
									}}
								>
									<TouchableOpacity onPress={() => this.setState({ showChangeInstaHandle: false })}>
										<CloseCircleIcon width={53} height={53} />
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											this.props.saveWebProducts(
												[],
												this.props.data.campaign_id,
												this.props.productInfoId,
												this.props.navigation,
												this.props.businessLogo
											);
											this._handleSubmission();
										}}
									>
										<ForwardIcon width={65} height={65} />
									</TouchableOpacity>
								</View>
							</>
						</View>
					</BlurView>
				</Modal>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  weburlAvalible: state.campaignC.weburlAvalible,
  mainBusiness: state.account.mainBusiness,
  errorInstaHandle: state.campaignC.errorInstaHandle,
  errorInstaHandleMessage: state.campaignC.errorInstaHandleMessage,
  productInfoId: state.campaignC.productInfoId,
  businessLogo: state.campaignC.businessLogo
});

const mapDispatchToProps = dispatch => ({
	verifyBusinessUrl: weburl => dispatch(actionCreators.verifyBusinessUrl(weburl)),
	verifyInstagramHandle: insta_handle => dispatch(actionCreators.verifyInstagramHandle(insta_handle)),
	saveWebProducts: (cartList, campaign_id, productInfoId, navigation) =>
		dispatch(actionCreators.saveWebProducts(cartList, campaign_id, productInfoId, navigation)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WhatsApp);
