import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const VerticalTextButton = ({ containerStyle, label, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                ...containerStyle,
                alignItems: 'center',
                transform: [{rotate: '-90deg'}]
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: selected ? COLORS.white : COLORS.lightGreen,
                    ...FONTS.h4,
                    fontSize: 20
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default VerticalTextButton;