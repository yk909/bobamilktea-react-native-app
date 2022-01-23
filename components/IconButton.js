import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const IconButton = ({ containerStyle, iconStyle, icon, label, onPress }) => {
    return (
        
        // <View style={{  paddingHorizontal: SIZES.padding }}>
        <View>
            <TouchableOpacity
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...containerStyle,
                }}
                onPress={onPress}
            >
                <Image 
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.white,
                        ...iconStyle,
                    }}
                    resizeMode="contain"
                    source={icon}
                />
                <Text style={{
                    ...FONTS.h1,
                    color: COLORS.white,
                }}>
                    { label }
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default IconButton;