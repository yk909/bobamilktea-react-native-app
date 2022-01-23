import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, BottomTabBar, Platform } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { Path } from 'react-native-svg'

import { Home, Rewards } from "../screens";
import { TabIcon } from "../components";

import { COLORS, SIZES, icons } from "../constants";

const Tab = createBottomTabNavigator();

const CustomTabBar = ( props ) => {
    return (
        <View>
            <View style={{
                position:'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 30,
                backgroundColor: COLORS.gray3
            }} />
            <BottomTabBar 
                {...props.props}
            />
        </View>
    )
}

const CustomTabBarButton = ({ containerStyle, isFloat, children, onPress }) => {
    if ( isFloat ) {
        return (
            <View
                style={{
                    frex: 1,
                    alignItems: 'center'
                }}
            >
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={90}
                    height={61}
                    viewBox="0 0 90 61"
                >
                    <Path
                        d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
                        fill="#4d4d4d"
                        fillRule="evenodd"
                    />
                </Svg>
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        position: 'absolute',
                        top: -40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <View
                    style={{
                        flex: 1,
                        height: 60,
                        backgroundColor: COLORS.gray3,
                        ...containerStyle
                    }}
                >
                    {children}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: COLORS.transparent,
                    borderTopColor: COLORS.transparent,
                    height: (Platform.OS == "android") ? 60 : 80
                },
            }}
            // tabBar={(props) => {
            //     <CustomTabBar 
            //         props={props}
            //     />
            // }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.home}
                                label="Home"
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            {...props}
                            containerStyle={{
                                borderTopLeftRadius: SIZES.radius2
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={Rewards}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.reward_cup}
                                label="Home"
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            {...props}
                            containerStyle={{
                                marginRight: -.25
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Add"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.add}
                                label="Home"
                                isMain={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            {...props}
                            isFloat={true}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.heart}
                                label="Home"
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            {...props}
                            containerStyle={{
                                marginLeft: -.25
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon 
                                focused={focused}
                                icon={icons.profile}
                                label="Home"
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <CustomTabBarButton
                            {...props}
                            containerStyle={{
                                borderTopRightRadius: SIZES.radius2
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;