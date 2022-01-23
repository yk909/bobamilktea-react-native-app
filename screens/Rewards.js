import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';

import { connect } from 'react-redux';

import { COLORS, SIZES, FONTS, dummyData, icons  } from '../constants';
import { HeaderBar, CustomButton } from '../components';

const Rewards = ({ navigation, appTheme }) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
            marginTop: -25,
            borderTopLeftRadius: SIZES.radius2,
            borderTopRightRadius: SIZES.radius2,
            backgroundColor: appTheme.backgroundColor,
            paddingHorizontal: SIZES.padding
        },
        rewardPointContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: SIZES.padding,
        },
        rewardPointHeader: {
            ...FONTS.h1,
            color: COLORS.primary,
            fontSize: 35
        },
        rewardPointText: {
            ...FONTS.body4,
            color: appTheme.textColor,
            width: SIZES.width * 0.5,
            lineHeight: 18,
            textAlign: 'center'
        },
        rewardPointImage: {
            marginTop: SIZES.padding,
            height: SIZES.width * 0.5,
            width: SIZES.width * 0.5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        rewardPointImageTextCont: {
            width: 50,
            height: 50,
            borderRadius: SIZES.radius2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white
        },
        rewardPointImageText: {
            color: COLORS.black, 
            ...FONTS.h2
        },
        rewardButtonContainer: {
            marginBottom: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        rewardButton: {
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.base / 2,
            marginHorizontal: 5,
        },
        rewardButtonText: {
            ...FONTS.h4,
            textAlign: 'center'
        }
    })

    function rewardPoint () {
        return (
            <View style={styles.rewardPointContainer}>
                <Text style={styles.rewardPointHeader}>
                    Rewards
                </Text>
                <Text style={styles.rewardPointText}>
                    You are 60 points away from your next reward!
                </Text>
                <View>
                    <ImageBackground
                        style={styles.rewardPointImage}
                        resizeMode="contain"
                        source={icons.reward_cup}
                    >
                        <View style={styles.rewardPointImageTextCont}>
                            <Text style={styles.rewardPointImageText}>
                                280
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        )
    }

    function rewardButton () {
        return (
            <View style={styles.rewardButtonContainer}>

                <CustomButton 
                    isPrimaryButton={true}
                    containerStyle={styles.rewardButton}
                    labelStyle={styles.rewardButtonText}
                    label='Scan in store'
                    onPress={() => navigation.navigate("Location") }/>

                <CustomButton  
                    isSecondaryButton={true}
                    containerStyle={styles.rewardButton} 
                    labelStyle={styles.rewardButtonText}
                    label='Redeem'
                    onPress={() => navigation.navigate("Location") }/>

            </View>
        )
    }

    function renderAvailableRewardsHeader () {
        return (
            <View style={{ marginBottom: SIZES.base, paddingHorizontal: SIZES.padding }}>
                <Text style={{...FONTS.h3, color: appTheme.textColor}}>
                    Available Rewards
                </Text>
            </View>
        )
    }

    return (
        <View style={ styles.container }>
            <HeaderBar/>
            
            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={{ paddingBottom: 110 }}
                showsVerticalScrollIndicator={false}>
                <View>

                    {/* Reward point */}
                    {rewardPoint()}

                    {/* Buttons */}
                    {rewardButton()}

                    {/* Header label */}
                    {renderAvailableRewardsHeader()}

                </View>
                {dummyData.availableRewards.map( (item, index ) => {
                    return (
                        <View
                            key={index}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.base,
                                borderRadius: SIZES.radius,
                                paddingVertical: SIZES.base,
                                backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray2
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: item.eligible ? COLORS.black : COLORS.lightGray2,
                                    // fontWeight: 'bold'
                                }}
                            >
                                {item.title}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme
    }
}

export default connect(mapStateToProps, null) (Rewards);