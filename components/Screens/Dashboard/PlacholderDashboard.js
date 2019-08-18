import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { Button, Text, Container } from 'native-base';
import LottieView from 'lottie-react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import * as Segment from 'expo-analytics-segment';
import { ActivityIndicator } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

//icons
import FilterIcon from '../../../assets/SVGs/Filter.svg';
import SearchIcon from '../../../assets/SVGs/Search.svg';
import IntercomIcon from '../../../assets/SVGs/IntercomIcon.svg';
import BackdropIcon from '../../../assets/SVGs/BackDropIcon';

// Style
import styles from './styles';
import globalStyles from '../../../GlobalStyles';

//Redux

//Functions
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class PlacholderDashboard extends Component {
	render() {
		const mySlideInUp = {
			from: {
				top: hp(100),
			},
			to: {
				top: 0,
			},
		};
		let placeHolderCards = this.props.placeHolderCards;
		return (
			<SafeAreaView style={styles.safeAreaViewContainer} forceInset={{ bottom: 'never', top: 'always' }}>
				<BackdropIcon style={styles.backDrop} height={hp('100%')} />

				<View style={[styles.mainView, {}]}>
					<TouchableWithoutFeedback
						onPress={() => {
							if (this.props.open === false) {
								this.props.startAnimation();
							} else {
								this.props.closeAnimation();
							}
						}}
					>
						<LottieView
							style={styles.lottieView}
							resizeMode="contain"
							source={require('../../../assets/animation/menu-btn.json')}
							progress={this.props.menu}
						/>
					</TouchableWithoutFeedback>
					<>
						<TouchableOpacity style={[styles.wallet]}>
							<IntercomIcon width={24} height={24} />
						</TouchableOpacity>
					</>
				</View>
				<Animatable.View duration={500} animation={mySlideInUp} style={[styles.animateView]}>
					<View style={[styles.nameStyle]} />
					<Container style={styles.container}>
						<View padder style={[styles.mainCard, { height: '110%' }]}>
							<View style={styles.sideMenuCard}>
								<View style={styles.sideMenuTop}>
									{/* <Button style={[styles.button, { padding: 63 }]}>
                    <ActivityIndicator />
                 
                  </Button> */}
									<View style={[styles.sideMenuCard, { top: 10, left: -5 }]}>
										<Button style={styles.button}>
											<ActivityIndicator />
										</Button>
									</View>
								</View>
							</View>

							<ScrollView>{placeHolderCards}</ScrollView>
							{/* {this.props.loading ? (
              <ActivityIndicator size="large" />
            ) : (
            )} */}
						</View>
					</Container>
					{/* <NavigationEvents
            onDidFocus={() => {
              Segment.screen("Dashboard");
            }}
          /> */}
				</Animatable.View>
			</SafeAreaView>
		);
	}
}
