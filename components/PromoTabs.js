import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const PromoTabs = ({ appTheme, title, isActive }) => {

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
            alignItems: 'center',
            justifyContent: 'center',
            height: 40
        },
        titleText: {
            color: appTheme.textColor,
            ...FONTS.h3,
        }
    })

    return (
        <TouchableOpacity onPress={()=>{console.log(title)}}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default PromoTabs;