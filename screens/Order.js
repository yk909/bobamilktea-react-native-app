import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';

import { connect } from 'react-redux';

import { COLORS, SIZE, FONTS, dummyData, icons, SIZES } from '../constants';
import { IconButton, TabButton, VerticalTextButton } from '../components';

const Order = ({ navigation, appTheme, route }) => {
        
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [selectedLocation, setSelectedLocation] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState('Coffee');
    const [menu, setMenu] = React.useState(null);

    // That listens to selectedCategory state, if the state changes then useSatete fires the function
    React.useEffect(() => {
        let menuList = dummyData.menuList.filter( item => item.category == selectedCategory );
        setMenu( menuList );
    }, [selectedCategory])

    React.useEffect(() => {
        let { selectedLocation } = route.params;
        setSelectedLocation(selectedLocation)
    }, [])

    // const { selectedLocation } = route.params;

    const styles = StyleSheet.create({
        header: {
            backgroundColor: COLORS.purple,
            height: 200,
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
        container: {
            flex: 1,
            backgroundColor: appTheme.backgroundColor,
            marginTop: -25,
            paddingTop: SIZES.padding,
            borderTopLeftRadius: SIZES.radius2,
            borderTopRightRadius: SIZES.radius2,
        },
    })

    function renderHeader () {
        return (
            <SafeAreaView style={styles.header}>
                <IconButton label="Pick-Up Order" icon={icons.leftArrow} onPress={() => navigation.goBack()}/>
                <View
                    style={{
                        backgroundColor: COLORS.lightPink,
                        marginTop: SIZES.padding,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: SIZES.radius2,
                        height: 40,
                        width: 160
                    }}
                >
                    <Text 
                        style={{
                            color: COLORS.purple,
                            textAlign: 'center',
                            ...FONTS.h3,
                            fontSize: 18
                        }}
                    >
                        {selectedLocation?.title}
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    function renderTabButtons () {
        return (
            <View
            style={{
                flexDirection: "row",
                justifyContent: 'center',
                paddingHorizontal: SIZES.padding,
                alignItems: 'center' 
            }}
        >

            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                {/* Nearby */}
                <TabButton 
                    containerStyle={{
                        width: 60,
                    }}
                    label="Menu"
                    selected={selectedTab == 0 }
                    onPress={() => setSelectedTab(0) }
                />

                {/* Previous */}
                <TabButton 
                    containerStyle={{
                        width: 90
                    }}
                    label="Previous"
                    selected={selectedTab == 1 }
                    onPress={() => setSelectedTab(1) }
                />

                {/* Favorite */}
                <TabButton 
                    containerStyle={{
                        width: 90
                    }}
                    label="Favorite"
                    selected={selectedTab == 2 }
                    onPress={() => setSelectedTab(2) }
                />
            </View>

            <View style={{ backgroundColor: COLORS.primary, borderRadius: SIZES.radius2, width: 40, height: 40, justifyContent: 'center', marginLeft: SIZES.padding, }}>
                <Text style={{ ...FONTS.h3, color: COLORS.white, textAlign: 'center' }}>
                    0
                </Text>
            </View>

        </View>
        )
    }

    function renderSidebar() {
        return(
            <View 
                style={{
                    marginVertical: 10,
                    width: 65,
                    backgroundColor: COLORS.primary,
                    borderBottomRightRadius: SIZES.radius2 * 4,
                    borderTopRightRadius: SIZES.radius2 * 4,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <VerticalTextButton
                    label="Coffee"
                    selected={selectedCategory == "Coffee" }
                    onPress={() => setSelectedCategory("Coffee") }
                />
                <VerticalTextButton
                    containerStyle={{
                        marginTop: 50
                    }}
                    label="Snack"
                    selected={selectedCategory == "Snack" }
                    onPress={() => setSelectedCategory("Snack") }
                />
                <VerticalTextButton
                    containerStyle={{
                        marginTop: 70,
                        width: 100
                    }}
                    label="Smoothie"
                    selected={selectedCategory == "Smoothie" }
                    onPress={() => setSelectedCategory("Smoothie") }
                />
                <VerticalTextButton
                    containerStyle={{
                        marginTop: 80,
                        width: 100
                    }}
                    label="Specialtea"
                    selected={selectedCategory == "Specialtea" }
                    onPress={() => setSelectedCategory("Specialtea") }
                />
                <VerticalTextButton
                    containerStyle={{
                        marginTop: 80,
                        width: 100
                    }}
                    label="Milk Tea"
                    selected={selectedCategory == "Milk Tea" }
                    onPress={() => setSelectedCategory("Milk Tea") }
                />
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>

            {/* Header */}
            {renderHeader()}

            <View style={styles.container}>

                {/* Tabs */}
                {renderTabButtons()}

                {/* Sidebar | listing */}
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >

                    {/* Side bar */}
                    {renderSidebar()}

                    {/* Menu */}
                    <FlatList
                        data={menu}
                        keyExtractor={menu => menu.id}
                        contentContainerStyle={{
                            marginTop: SIZES.padding,
                            paddingBottom: 50,
                        }}
                        renderItem={ ({ item, index }) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => navigation.navigate("OrderDetail", { item: item })}
                                    style={{
                                        backgroundColor: 'black',
                                    }}
                                >
                                    <View
                                        style={{
                                            marginTop: index > 0 ? SIZES.padding : 0,
                                            height: 150,
                                            paddingHorizontal: SIZES.padding,
                                            padding: 0,
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: SIZES.padding,
                                                width: 130,
                                                height: 130,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: SIZES.radius,
                                                backgroundColor: COLORS.lightYellow,
                                                zIndex: 1,
                                                elevation: 1,
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    // transform: [{rotate: '-20deg'}]
                                                }}
                                                source={item.thumbnail}
                                            />
                                        </View>

                                        {/* Details */}
                                        <View
                                            style={{
                                                backgroundColor: COLORS.primary,
                                                borderRadius: SIZES.radius,
                                                paddingVertical: SIZES.base,
                                                width: '85%',
                                                height: '85%',
                                                paddingLeft: '35%',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    color: COLORS.white,
                                                    ...FONTS.h2,
                                                    fontSize: 20,
                                                    lineHeight: 25
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text 
                                                style={{
                                                    color: COLORS.lightYellow,
                                                    ...FONTS.h2,
                                                    fontSize: 18,
                                                    lineHeight: 25
                                                }}
                                            >
                                                {item.price}
                                            </Text>
                                        </View>

                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />

                </View>

            </View>

        </View>
    )
}


function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme
    }
}

export default connect(mapStateToProps, null) (Order);