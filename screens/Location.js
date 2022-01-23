import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Image, FlatList } from 'react-native';

import { connect } from 'react-redux';

import { COLORS, SIZE, FONTS, dummyData, icons, SIZES } from '../constants';
import { IconButton, TabButton } from '../components';


const Location = ({ navigation, appTheme }) => {

    const [selectedTab, setSelectedTab] = React.useState(0);
    // const [bookmarked, setBookmark] = React.useState([]);
    
    const styles = StyleSheet.create({
        header: {
            backgroundColor: COLORS.purple,
            height: 120,
            paddingTop: 40,
            paddingHorizontal: SIZES.padding
        },
        detail: {
            flex: 1,
            marginTop: -25,
            borderTopRightRadius: SIZES.radius2,
            borderTopLeftRadius: SIZES.radius2,
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding,
            backgroundColor: appTheme.backgroundColor,
        },
    })

    function renderHeader () {
        return (
            <SafeAreaView style={styles.header}>
                <IconButton label="Locations" icon={icons.leftArrow} onPress={() => navigation.goBack()}/>
            </SafeAreaView>
        )
    }

    function renderTabSection () {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                }}
            >

                {/* Nearby */}
                <TabButton 
                    containerStyle={{
                        width: 110,
                    }}
                    label="Nearby"
                    selected={selectedTab == 0 }
                    onPress={() => setSelectedTab(0) }
                />

                {/* Previous */}
                <TabButton 
                    containerStyle={{
                        width: 110
                    }}
                    label="Previous"
                    selected={selectedTab == 1 }
                    onPress={() => setSelectedTab(1) }
                />

                {/* Favorite */}
                <TabButton 
                    containerStyle={{
                        width: 110
                    }}
                    label="Favorite"
                    selected={selectedTab == 2 }
                    onPress={() => setSelectedTab(2) }
                />

            </View>
        )
    }

    function renderSearchBar () {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.lightGreen,
                    alignItems: 'center',
                    borderRadius: 25
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        height: 50,
                        color: COLORS.black,
                        ...FONTS.body3,
                    }}
                    placeholder="Enter your city, state ot zip code"
                    placeholderTextColor={COLORS.lightGray2}
                />
                <Image 
                    source={icons.search}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.lightGray2
                    }}
                />
            </View>
        )
    }

    function renderLocationList () {
        return (
            <FlatList
                style={{
                    marginTop: SIZES.padding,
                    // paddingHorizontal: SIZES.padding,
                }}
                data={
                    selectedTab === 0 ?
                        dummyData.locations.sort( (x, y) => Number(y.bookmarked) - Number(x.bookmarked) )
                    : selectedTab === 1 ?
                        dummyData.locations.filter( item => item.id == 2 )
                    :
                        dummyData.locations.filter(item => Boolean(item.bookmarked))
                }
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={{
                            marginBottom: SIZES.padding,
                            borderRadius: SIZES.radius,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.base,
                            backgroundColor: appTheme.cardBackgroundColor
                        }}
                        onPress={() => navigation.navigate("Order", {selectedLocation: item})}
                    >

                        {/* Name and bookmark */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h2,
                                    color: appTheme.textColor,
                                }}
                            >
                                { item.title }
                            </Text>
                            <TouchableOpacity
                                // onPress={ () => {
                                //     if (bookmarked.includes(item.id)) {
                                //         setBookmark(bookmarked.filter(a => a !== item.id))
                                //     } else {
                                //         setBookmark( [...bookmarked, item.id] )
                                //     }
                                // } }
                            >
                                {/* { bookmarked.includes(item.id) ? */}
                                <Image 
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: item.bookmarked ? COLORS.red : appTheme.textColor
                                    }}
                                    source={item.bookmarked ? icons.bookmarkFilled : icons.bookmark}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Address | Hours */}
                        <View
                            style={{
                                marginTop: SIZES.base,
                                width: '80%'
                            }}
                        >
                            <Text
                                style={{
                                    color: appTheme.textColor,
                                    ...FONTS.body4,
                                    lineHeight: 20
                                }}
                            >
                                { item.address }
                            </Text>
                            <Text
                                style={{
                                    color: appTheme.textColor,
                                    ...FONTS.body5,
                                    marginTop: SIZES.base,
                                    lineHeight: 16
                                }}
                            >
                                { item.operation_hours }
                            </Text>
                        </View>

                        {/* Services */}
                        <View
                            style={{
                                flexDirection: 'row',
                                // justifyContent: 'center',
                                paddingVertical: SIZES.base
                            }}
                        >

                            {/* Pick up */}
                            <View
                                style={{
                                    borderColor: appTheme.textColor,
                                    borderWidth: 1,
                                    borderRadius: SIZES.radius2,
                                    paddingHorizontal: SIZES.base,
                                    // width: '50%',
                                    paddingVertical: SIZES.base / 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: appTheme.textColor,
                                        textAlign: 'center',
                                        ...FONTS.body4
                                    }}
                                >
                                    Pick-Up
                                </Text>
                            </View>

                            {/* Delivery */}
                            <View
                                style={{
                                    borderColor: appTheme.textColor,
                                    borderWidth: 1,
                                    paddingHorizontal: SIZES.base,
                                    // width: '50%',
                                    borderRadius: SIZES.radius2,
                                    paddingVertical: SIZES.base / 4,
                                    marginLeft: SIZES.base
                                }}
                            >
                                <Text
                                    style={{
                                        color: appTheme.textColor,
                                        textAlign: 'center',
                                        ...FONTS.body4
                                    }}
                                >
                                    Delivery
                                </Text>
                            </View>

                        </View>


                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <View style={{flex: 1}}>

            {/* Header */}
            {renderHeader()}

            {/* Detail */}
            <View style={styles.detail}>
                {renderTabSection()}
                {renderSearchBar()}
                {renderLocationList()}
            </View>

        </View>
    )
}


function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme
    }
}

export default connect(mapStateToProps, null) (Location);