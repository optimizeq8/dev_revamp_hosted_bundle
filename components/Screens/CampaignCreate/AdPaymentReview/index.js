import React, { Component } from 'react';
import {
	ImageBackground,
	View,
	TouchableWithoutFeedback,
	BackHandler,
	Dimensions,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { Content, Text, Container, Footer } from 'native-base';
import { Video } from 'expo-av';
import * as Segment from 'expo-analytics-segment';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import ReviewItemCard from '../../../MiniComponents/ReviewItemCard';
import CustomHeader from '../../../MiniComponents/Header';
import LoadingScreen from '../../../MiniComponents/LoadingScreen';

// Style
import styles from './styles';

//Redux
import { connect } from 'react-redux';

//Functions
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import formatNumber from '../../../formatNumber';
import dateFormat from 'dateformat';

class AdPaymentReview extends Component {
	static navigationOptions = {
		header: null,
	};

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}
	handleBackButton = () => {
		this.props.navigation.goBack();
		return true;
	};
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}
	render() {
		if (this.props.loading || !this.props.data || !this.props.data.campaignInfo.targeting) {
			return <LoadingScreen top={50} />;
		} else {
			let targeting = this.props.data.campaignInfo.targeting;
			let interestNames = [];
			if (this.props.interestNames.length > 0) {
				interestNames = this.props.interestNames.map(interest => interest.name);
			}
			let end_time = new Date(this.props.data.end_time||"01-01-1970");
			let start_time = new Date(this.props.data.start_time || "01-01-1970");
			end_time = dateFormat(end_time, 'd mmm yyyy');
			start_time = dateFormat(start_time, 'd mmm yyyy');
			let gender = targeting.demographics[0].gender ? targeting.demographics[0].gender : 'All';
			let countryName = this.props.countryName;
			let regionNames = this.props.regionNames;
			// if (
			//   targeting.geos[0].hasOwnProperty("region_id") &&
			//   this.props.regionNames.length > 0
			// ) {
			//   regionNames = this.props.regionNames.map(region => region);
			// }

			let devices = [];
			devices = targeting.hasOwnProperty('devices')
				? targeting.devices[0].hasOwnProperty('marketing_name')
					? targeting.devices[0].marketing_name.join(', ')
					: []
				: [];
			const image = this.props.data.image ? this.props.data.image : '//';
			return (
				<>
					{!image.includes('.jpg') && (
						<View style={[styles.backgroundViewWrapper, styles.videoView]}>
							<Video
								source={{
									uri: image,
								}}
								shouldPlay
								isLooping
								isMuted
								resizeMode="cover"
								style={styles.video}
							/>
						</View>
					)}
					<ImageBackground
						// imageStyle={{ opacity: 0.2 }}
						style={styles.imageBackground}
						source={{
							uri: image.includes('.jpg') ? image : 'www.go.com',
						}}
					>
						<SafeAreaView style={[styles.safeAreaView]} forceInset={{ bottom: 'never', top: 'always' }}>
							<NavigationEvents
								onDidFocus={() => {
									Segment.screenWithProperties('Snap Ad Payment Review', {
										category: 'Campaign Creation',
									});
									Segment.trackWithProperties('Viewed Checkout Step', {
										step: 5,
										business_name: this.props.mainBusiness.businessname,
										checkout_id: this.props.campaign_ids,
									});
								}}
							/>

							<Container style={[styles.container]}>
								<CustomHeader
									closeButton={false}
									segment={{
										str: 'Ad Payment Review Back Button',
										obj: {
											businessname: this.props.mainBusiness.businessname,
										},
									}}
									navigation={this.props.navigation}
									title="Review your Selection"
								/>

								<Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
									<View style={styles.budgetView}>
										<Text style={styles.budgetText}>Budget</Text>
										<View style={styles.budgetAmountView}>
											<Text style={styles.budgetDollarText}>$</Text>
											<Text style={styles.budgetAmountText}>
												{formatNumber(this.props.data.campaignInfo.lifetime_budget_micro, true)}
											</Text>
										</View>
									</View>
									<Content contentContainerStyle={styles.contentContainerStyle}>
										<ReviewItemCard
											title="Duration"
											subtitles={[
												{ title: 'Start', content: start_time },
												{ title: 'End', content: end_time },
												{
													title: 'Objective',
													content: this.props.data.objective.replace(/BRAND_/i, ''),
												},
											]}
										/>
										<ReviewItemCard
											title="Media"
											subtitles={[
												{
													title: 'Business Name',
													content: this.props.data.brand_name,
												},
												{
													title: 'Headline',
													content: this.props.data.headline,
												},
											]}
										/>

										<ReviewItemCard
											title="Audience"
											subtitles={[
												{
													title: 'Gender',
													content: gender,
												},
												{
													title: 'Location',
													content:
														regionNames.length > 0
															? countryName + ': ' + regionNames
															: countryName,
												},
												{
													title: 'Language',
													content: targeting.demographics[0].languages.join(', '),
												},
												{
													title: 'Age group',
													content:
														targeting.demographics[0].min_age +
														'-' +
														targeting.demographics[0].max_age,
												},
												interestNames.length > 0 && {
													title: 'Interests',
													content: interestNames + '',
												},

												devices.length > 0 && {
													title: 'Devices',
													content: devices + '',
												},
												targeting.hasOwnProperty('devices') && {
													title: 'OS Type',
													content:
														targeting.devices[0].hasOwnProperty('os_type') &&
														targeting.devices[0].os_type !== ''
															? targeting.devices[0].os_type
															: 'All',
												},
												targeting.hasOwnProperty('devices') &&
													targeting.devices[0].os_version_max !== '' && {
														title: 'OS Version',
														content:
															targeting.devices[0].hasOwnProperty('os_version_min') &&
															targeting.devices[0].os_version_min +
																', ' +
																targeting.devices[0].os_version_max,
													},
											]}
										/>
									</Content>

									<Footer style={styles.footerBlock}>
										<View style={styles.bottomCardBlock1}>
											<View>
												<View style={styles.dollarAmountContainer}>
													<Text style={[styles.money, styles.dollarAmountText]}>$</Text>

													<Text style={[styles.money, { paddingLeft: 3 }]}>
														{formatNumber(
															this.props.data.campaignInfo.lifetime_budget_micro,
															true
														)}
													</Text>
												</View>
												<View style={styles.kdAmountContainer}>
													<Text style={[styles.money, styles.kdText]}>KD{}</Text>
													<Text style={[styles.money, styles.kdAmountText]}>
														{this.props.kdamount}
													</Text>
												</View>

												<View style={styles.optimizeFeesTextContainer}>
													<Text style={styles.optimizeFeesPercentange}>10%</Text>
													<Text style={[styles.money, styles.optimizeFeesText]}>
														OptimizeApp fees included
													</Text>
												</View>
											</View>
											<TouchableOpacity
												onPress={() => {
													Segment.trackWithProperties('Select Ad Payment Review Button', {
														business_name: this.props.mainBusiness.businessname,
														campaign_budget: this.props.data.lifetime_budget_micro,
													});
													Segment.trackWithProperties('Completed Checkout Step', {
														step: 5,
														business_name: this.props.mainBusiness.businessname,
														checkout_id: this.props.campaign_id,
													});

													this.props.navigation.navigate('PaymentForm');
												}}
												style={[styles.mainCard]}
											>
												{/*
                                                    ----------For future maybe----------
                                                    <Text style={styles.text}>Agency Fee</Text>
                                                    <View style={{ flexDirection: "column", alignSelf: "center" }}>
                                                    <Text style={styles.text}>
                                                        {2500 - this._handleAgencyFee()} $
                                                    </Text>
                                                    <Text style={styles.text}>{this._handleAgencyFee()} $</Text>
                                                    </View> 
                                                */}

												<Text style={styles.payNowText}>Payment Info</Text>
											</TouchableOpacity>
										</View>
									</Footer>
								</Content>
							</Container>
						</SafeAreaView>
					</ImageBackground>
				</>
			);
		}
	}
}

const mapStateToProps = state => ({
	campaign_id: state.campaignC.campaign_id,
	userInfo: state.auth.userInfo,
	data: state.campaignC.data,
	image: state.campaignC.image,
	countryName: state.campaignC.countryName,
	interestNames: state.campaignC.interestNames,
	regionNames: state.campaignC.regionNames,
	loading: state.campaignC.loadingDetail,
	kdamount: state.campaignC.kdamount,
	mainBusiness: state.account.mainBusiness,
});

export default connect(
	mapStateToProps,
	null
)(AdPaymentReview);
