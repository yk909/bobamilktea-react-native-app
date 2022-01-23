import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';

import { connect } from 'react-redux';

import { IconButton } from '../components';
import { COLORS, SIZES, FONTS, icons, dummyData } from '../constants';

const OrderDetail = ({ navigation, appTheme, route }) => {

    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState('16')
    const [selectedMilk, setSelectedMilk] = React.useState(0)
    const [selectedIce, setSelectedIce] = React.useState(25)
    const [selectedSugar, setSelectedSugar] = React.useState(0)

    React.useEffect(() => {
        let { item } = route.params;
        setSelectedItem(item);
    }, [])

    function milkButtonHandler (action) {
        if( action == "next" && selectedMilk < dummyData.milkList.length - 1 ) {
            setSelectedMilk(selectedMilk + 1 );
        } else if ( action == "prev" && selectedMilk > 0 ) {
            setSelectedMilk(selectedMilk - 1 );
        } else if ( action == "prev" && selectedMilk === 0 ) {
            setSelectedMilk(dummyData.milkList.length - 1 );
        } 
        else {
            setSelectedMilk(0);
        }
    }

    function iceButtonHandler (action) {
        if( action == "next" && selectedIce < 100 ) {
            setSelectedIce(selectedIce + 5 );
        } else if ( action == "prev" && selectedIce > 0 ) {
            setSelectedIce(selectedIce - 5 );
        }
    }

    function sugarButtonHandler (action) {
        if( action == "next" && selectedSugar < 10 ) {
            setSelectedSugar(selectedSugar + 1 );
        } else if ( action == "prev" && selectedSugar > 0 ) {
            setSelectedSugar(selectedSugar - 1 );
        }
    }

    const styles = StyleSheet.create({
        header: {
            height: '55%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: SIZES.base,

        },
    })

    function renderHeader () {
        return (
            <View style={styles.header}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 40,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomLeftRadius: 100,
                        backgroundColor: COLORS.primary,

                    }}
                >
                    <Image
                        source={selectedItem?.thumbnail}
                        resizeMode="contain"
                        style={{
                            width: SIZES.width * 0.5,
                            height: SIZES.width * 0.5,
                        }}
                    />
                    <View 
                        style={{
                            marginVertical: 10,
                            // height: '100%',
                            position: 'absolute',
                            right: 0,
                            width: 65,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View style={{ transform: [{rotate: '-90deg'}], alignItems: 'center', width: SIZES.width * 0.5 }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.lightYellow, letterSpacing: 5, textAlign: 'center' }}>{selectedItem?.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderDetail () {
        return (
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: SIZES.padding,
                    paddingBottom: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                }}
            >

                {/* Name */}
                <View>
                    <Text style={{ ...FONTS.h1, color: COLORS.red2 }}>{selectedItem?.name}</Text>
                    <Text style={{ ...FONTS.body3, color: appTheme.textColor, marginTop: SIZES.base }}>{selectedItem?.description}</Text>
                </View>

                {/* Size */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                    <Text style={{ flex: 1, ...FONTS.h2, color: COLORS.red2 }}>Pick size:</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setSelectedSize('12')}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <ImageBackground 
                                source={icons.coffee_cup}
                                style={{
                                    width: 80,
                                    height: 80,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                imageStyle={{
                                    tintColor:  selectedSize === '12' ? COLORS.primary :  COLORS.lightGray2
                                }}
                            >
                                <Text style={{...FONTS.body3, color: COLORS.secondary, fontWeight: 'bold'}}>
                                    12oz
                                </Text>
                            </ImageBackground>
                            <Text style={{...FONTS.body3, color: appTheme.textColor, fontWeight: 'bold'}}>
                                $4.50
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedSize('16')}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <ImageBackground 
                                source={icons.coffee_cup}
                                style={{
                                    width: 100,
                                    height: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                imageStyle={{
                                    tintColor: selectedSize === '16' ? COLORS.primary :  COLORS.lightGray2
                                }}
                            >
                                <Text style={{...FONTS.body3, color: COLORS.secondary, fontWeight: 'bold'}}>
                                    16oz
                                </Text>
                            </ImageBackground>
                            <Text style={{...FONTS.body3, color: appTheme.textColor, fontWeight: 'bold'}}>
                                $5.25
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* milk | other */}
                <View 
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                    }}
                >

                    {/* Milk */}
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                    >
                        <Text
                            style={{
                                color: appTheme.headerColor,
                                ...FONTS.h2,
                                fontSize: 20
                            }}
                        >
                            Milk
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: 100,
                                height: 100,
                                marginTop: SIZES.base,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                            }}
                        >
                            <IconButton 
                                icon={icons.leftArrow}
                                containerStyle={{
                                    marginLeft: -15,
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 3,
                                }}
                                iconStyle={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black,
                                }}
                                onPress={() => milkButtonHandler("prev")}
                            />
                            <Image
                                style={{
                                    width: 70,
                                    height: 70,
                                    tintColor: COLORS.white,
                                    flex: 1,
                                }} 
                                resizeMode="contain"
                                source={dummyData.milkList[selectedMilk].image}
                            />
                            <IconButton 
                                icon={icons.rightArrow}
                                containerStyle={{
                                    marginRight: -15,
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 3
                                }}
                                iconStyle={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black
                                }}
                                onPress={() => milkButtonHandler("next")}
                            />
                        </View>
                        <Text
                            style={{
                                color: appTheme.textColor,
                                ...FONTS.body3,
                                marginTop: SIZES.base
                            }}
                        >
                            {dummyData.milkList[selectedMilk].name}
                        </Text>
                    </View>

                    {/* Sugar */}
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                    >

                        {/* Sugar */}
                        <Text
                            style={{
                                color: appTheme.headerColor,
                                ...FONTS.h2,
                                fontSize: 20
                            }}
                        >
                            Sugar
                        </Text>
                        <View 
                            style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius,
                                width: 140,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: SIZES.base,
                                height: 50
                            }}
                        >
                            <IconButton 
                                icon={icons.leftArrow}
                                containerStyle={{
                                    marginLeft: -12,
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 3,
                                }}
                                iconStyle={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black,
                                }}
                                onPress={() => sugarButtonHandler("prev")}
                            />
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body3,
                                    fontSize: 18
                                }}
                            >
                                {selectedSugar} pc.
                            </Text>
                            <IconButton 
                                icon={icons.rightArrow}
                                containerStyle={{
                                    marginRight: -12,
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 3
                                }}
                                iconStyle={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black
                                }}
                                onPress={() => sugarButtonHandler("next")}
                            />
                        </View>

                        {/* Ice */}
                        <Text
                            style={{
                                color: appTheme.headerColor,
                                ...FONTS.h2,
                                fontSize: 20
                            }}
                        >
                            Ice
                        </Text>
                        <View 
                            style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius,
                                width: 140,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: SIZES.base,
                                height: 50
                            }}
                        >
                            <IconButton 
                                icon={icons.leftArrow}
                                containerStyle={{
                                    marginLeft: -12,
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 3,
                                }}
                                iconStyle={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black,
                                }}
                                onPress={() => iceButtonHandler("prev")}
                            />
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body3,
                                    fontSize: 18
                                }}
                            >
                                {selectedIce}%
                            </Text>
                            <IconButton 
                                icon={icons.rightArrow}
                                containerStyle={{
                                    marginRight: -12,
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderRadius: 3
                                }}
                                iconStyle={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black
                                }}
                                onPress={() => iceButtonHandler("next")}
                            />
                        </View>

                    </View>

                </View>

            </View>
        )
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: appTheme.backgroundColor }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    height: 850,
                    paddingBottom: 150
                }}
            >

                <IconButton containerStyle={{position: 'absolute', width: '100%', zIndex: 1, paddingTop: 40, left: SIZES.base}} icon={icons.leftArrow} iconStyle={{ tintColor: appTheme.textColor }} onPress={() => navigation.goBack()}/>
                {/* Header */}
                {renderHeader()}

                {/* Detail */}
                {renderDetail()}

            </ScrollView>
        </View>
    )
}


function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme
    }
}

export default connect(mapStateToProps, null) (OrderDetail);