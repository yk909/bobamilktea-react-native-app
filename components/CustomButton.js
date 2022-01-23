import React from 'react';
import { TouchableOpacity, Text, View,  } from 'react-native';

import { COLORS, SIZES } from '../constants';

const CustomButton = ({ containerStyle, labelStyle, label, onPress, isPrimaryButton, isSecondaryButton }) => {

    return (
        <TouchableOpacity 
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isPrimaryButton ? COLORS.primary : COLORS.transparent,
                borderColor: isSecondaryButton ? COLORS.primary : COLORS.transparent,
                borderRadius: SIZES.radius,
                borderWidth: isSecondaryButton ? 1 : 0,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Text 
                style={{
                    ...labelStyle,
                    color: isPrimaryButton ? COLORS.white : COLORS.primary
                }}
            >
                { label }
            </Text>
        </TouchableOpacity>
    )

}

export default CustomButton;