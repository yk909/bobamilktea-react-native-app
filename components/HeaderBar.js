import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { toggleTheme } from '../store/theme/themeActions';

import { COLORS, SIZES, icons, FONTS } from '../constants';

const HeaderBar = ( { toggleTheme, appTheme } ) => {

    function toggleThemeOnPress () {
        if(appTheme.name == 'light') {
            return toggleTheme('dark');
        } else {
            return toggleTheme('light');
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Greetings */}
            <View style={ styles.greetingsContainer }>
                <Text style={styles.greetingsText}>
                    Bohdan, 
                </Text>
                <Text style={styles.greetingsText}>
                    Welcome back!
                </Text>
            </View>

            {/* Toggle button */}
            <TouchableOpacity onPress={() => { toggleThemeOnPress() }} style={styles.toggleButtonContainer}>
                {/* Sun */}
                <View style={[ styles.iconContainer, appTheme.name == "light" && styles.selectedLightModeStyle ]}>
                    <Image source={icons.sunny} style={ styles.icon }/>
                </View>
                {/* Moon */}
                <View style={ [ styles.iconContainer, appTheme.name == "dark" && styles.selectedNightModeStyle ] }>
                    <Image source={icons.night} style={ styles.icon }/>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        height: 150,
        width: "100%",
        backgroundColor: COLORS.purple,
        paddingTop: 20,
        flexDirection: 'row'
    },
    greetingsContainer: {
        flex: 1,
        paddingLeft: SIZES.padding,
        paddingTop: SIZES.padding / 2,
    },
    greetingsText: {
        color: COLORS.white,
        ...FONTS.h2
    },
    toggleButtonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        borderRadius: 20,
        margin: SIZES.padding,
        backgroundColor: COLORS.lightPurple,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 25,
        width: 25,
        tintColor: COLORS.white
    },
    selectedNightModeStyle: {
        borderRadius: 20,
        backgroundColor: COLORS.secondary
    },
    selectedLightModeStyle: {
        borderRadius: 20,
        backgroundColor: COLORS.yellow
    }
})

function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => {
            return dispatch(toggleTheme(themeType))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HeaderBar);