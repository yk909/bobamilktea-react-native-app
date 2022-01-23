import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Animated } from 'react-native';

import { connect } from 'react-redux';

import { COLORS, SIZE, FONTS, SIZES, dummyData, icons, constants } from '../constants';
import { HeaderBar, CustomButton } from '../components';

const promoTabs = constants.promoTabs.map((promoTab) => ({
    ...promoTab,
    ref: React.createRef()
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
    // console.log(measureLayout)

    // 48 is the padding left \ right 24 + 24 = 48
    const inputRange = promoTabs.map((_, i) => i * SIZES.width);

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map( measure => measure.width )
    })

    const tabIndicatorXoffset = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map( measure => measure.x )
    })

    console.log(tabIndicatorXoffset)

    return (
        <Animated.View 
            style={{
                position: 'absolute', 
                height: '100%', 
                width: tabIndicatorWidth,
                marginLeft: tabIndicatorXoffset,
                left: 0, 
                borderRadius: SIZES.radius, 
                backgroundColor: COLORS.primary
            }}>
            
        </Animated.View>
    )
}

const Tabs = ({ appTheme, scrollX, onPromoTabPress }) => {

    const [measureLayout, setMesureLayout] = React.useState([]);
    const containerRef = React.useRef();

    const tabPosition = Animated.divide(scrollX, SIZES.width);

    React.useEffect(() => {
        let ml = []

        promoTabs.forEach(promo => {
            promo.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    // console.log(x, y, width, height)

                    ml.push({
                        x, y, width, height
                    })

                    if(ml.length === promoTabs.length) {
                        setMesureLayout(ml);
                    }
                }
            )
        })

    }, [containerRef.current])

    return (
        <View style={{ paddingHorizontal: SIZES.padding}}>
            <View ref={containerRef} 
            style={{
                // width: '100%',
                marginTop: SIZES.base,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: appTheme.tabBackgroundColor,
                borderRadius: SIZES.radius,
            }}>

                {/* Header - Tabs */}
                { measureLayout.length > 0 &&
                    <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
                }

                {promoTabs.map((item, index) => {

                    const taxtColor = tabPosition.interpolate({
                        inputRange: [ index - 1, index, index + 1 ],
                        outputRange: [appTheme.textColor, COLORS.white, appTheme.textColor],
                        extrapolate: 'clamp'
                    })

                    return (
                        <TouchableOpacity
                            key={`PromoTab-${index}`}
                            onPress={ () => onPromoTabPress(index) }
                            style={{
                                // backgroundColor: 'black',
                            }}>
                            <View 
                                ref={item.ref}
                                style={{
                                    paddingHorizontal: 16,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40
                                }}>
                                <Animated.Text style={{
                                    color: taxtColor,
                                    ...FONTS.h3,
                                }}>
                                    {item.title}
                                </Animated.Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </View>
        </View>
    )
}

const Home = ({ navigation, appTheme }) => {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const promoScrollViewRef = React.useRef();

    const onPromoTabPress = React.useCallback(promoTabIndex => {
        promoScrollViewRef?.current?.scrollToOffset({
            offset: promoTabIndex * SIZES.width
        })
    })

    const styles = StyleSheet.create({
        // Home Container
        scrollView: {
            flex: 1,
            marginTop: -25,
            borderTopLeftRadius: SIZES.radius2,
            borderTopRightRadius: SIZES.radius2,
            backgroundColor: appTheme.backgroundColor,
            // paddingHorizontal: SIZES.padding
        },
        availableRewardsContainer: {
            flexDirection: 'row',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            height: 100
        },
        // Reward Cup Style
        rewardCupContainer: {
            width: 100,
            height: '100%',
            alignItems:'center',
            justifyContent: 'center',
            borderTopLeftRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            backgroundColor: COLORS.pink,
        },
        rewardCupImage: {
            width: 85,
            height: 85,
            alignItems: 'center',
            justifyContent: 'center',
            marginright: 12
        },
        rewardCupText: {
            width: 30,
            height: 30,
            borderRadius: SIZES.radius2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack
        },
        rewardDetailsContainer: {
            flex: 1,
            alignItems:'center',
            justifyContent: 'center',
            marginLeft: -10,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightPink,
        },
        rewardDetailsText: {
            marginTop: 5,
            paddingHorizontal: SIZES.base,
            paddingVertical: SIZES.base / 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary
        },
        // Promo Style
        promoContainer: {
            width: '100%',
            marginTop: SIZES.base,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: appTheme.tabBackgroundColor,
            borderRadius: SIZES.radius
        }
    })

    function renderAvailableRewards () {
        return (
            <TouchableOpacity style={ styles.availableRewardsContainer } onPress={() => navigation.navigate("Rewards")} >

                {/* Reward Cup  */}
                <View style={styles.rewardCupContainer}>
                    <ImageBackground source={ icons.reward_cup } resizeMode="cover" style={styles.rewardCupImage}>
                        <View style={styles.rewardCupText}>
                            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                                280
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* Reward Details  */}
                <View style={styles.rewardDetailsContainer}>
                    <Text style={{ color: COLORS.primary, ...FONTS.h2, fontSize: 20 }}>
                        Available Rewards
                    </Text>

                    <View style={ styles.rewardDetailsText }>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>150 points - $2.50 off</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )
    }

    function renderPromo () {
        
        return (
            <View style={{flex: 1}}>
                
                <Tabs scrollX={scrollX} appTheme={appTheme} onPromoTabPress={onPromoTabPress}/>

                {/* Detail */}
                <Animated.FlatList 
                    ref={promoScrollViewRef}
                    data={dummyData.promos}
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })}
                    renderItem={ ({item, index}) => {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', width: SIZES.width, paddingTop: SIZES.padding }}>

                                {/* Image */}
                                    <Image 
                                    resizeMode='contain'
                                    style={{ width: "75%", height: 150, borderRadius: 100, alignSelf: 'center'}} 
                                    source={{uri: item.image}}/>

                                {/* Name */}
                                <Text style={{ color: COLORS.red, textAlign: 'center', ...FONTS.h2, paddingTop: SIZES.base }}>
                                    {item.name}
                                </Text>

                                {/* Description */}
                                <Text style={{ color: appTheme.textColor, textAlign: 'center', ...FONTS.h5 }}>
                                    {item.description}
                                </Text>

                                {/* Calories */}
                                <Text style={{ color: appTheme.textColor, textAlign: 'center', ...FONTS.h5 }}>
                                    Calories: {item.calories}
                                </Text>

                                {/* Button */}
                                <CustomButton
                                    label="Order Now"
                                    isPrimaryButton={true}
                                    containerStyle={{
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        width: 150,
                                        alignSelf: 'center',
                                        paddingHorizontal: SIZES.padding
                                    }}
                                    labelStyle={{
                                        ...FONTS.h3
                                    }}
                                    onPress={() => {navigation.navigate("Location")}}
                                />

                            </View>
                        )
                    }}
                />
            </View>
        )
        
    }

    return (
        <>
            <HeaderBar/>
            
            <ScrollView style={ styles.scrollView } contentContainerStyle={{ flex: 1, paddingBottom: 120 }}>
                
                {/* Rewards */}
                { renderAvailableRewards() }

                {/* Promo */}
                { renderPromo() }

            </ScrollView>
        </>
    )
}

function mapStateToProps (state) {
    return {
        appTheme: state.themeReducer.appTheme
    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default  connect(mapStateToProps, mapDispatchToProps) (Home);