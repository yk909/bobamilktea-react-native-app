import React from 'react';
import { View, Text, Image } from 'react-native';

import { FONTS, COLORS } from '../constants';

const TabIcon = ({ focused, icon, iconStyle, label, isMain }) => {
    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",

        }}>
            {isMain ?
            <>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: focused ? COLORS.yellow : COLORS.white1,
                        ...iconStyle
                    }}
                />
                {/* <Text style={{
                    color: focused? COLORS.yellow : COLORS.primary,
                    ...FONTS.h5
                }}>
                    {label}
                </Text> */}
            </>
            :
            <>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: focused ? COLORS.white1 : COLORS.secondary,
                        ...iconStyle
                    }}
                />
                {/* <Text style={{
                    color: focused? COLORS.white : COLORS.secondary,
                    ...FONTS.h5
                }}>
                    {label}
                </Text> */}
            </>
            }
        </View>
    )
}

export default TabIcon;