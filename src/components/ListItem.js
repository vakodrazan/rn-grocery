import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from "react-native"
import Swipeable from 'react-native-gesture-handler/Swipeable';


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#69696969'
    },
    icon: {
        height: 30,
        tintColor: '#69696969',
        ...Platform.select({
            ios: { tintColor: 'blue' },
            android: { tintColor: 'red' },

        })
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    leftAction: {
        flex: 1,
        backgroundColor: '#388e3c',
        justifyContent: 'center',
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }
})

export const Separator = () => <View style={styles.separator} />

const leftActions = () => (
    <View style={styles.leftAction}>
        <Text style={styles.actionText}>Add to cart</Text>
    </View>
)

const ListItem = ({ name, onFavouritePress, isFavourite }) => {

    let starIcon

    if (isFavourite) {
        starIcon = Platform.select({
            ios: require('../assets/icons/ios-star.png'),
            android: require('../assets/icons/md-star.png'),
        })
    } else {

        starIcon = Platform.select({
            ios: require('../assets/icons/ios-star-outline.png'),
            android: require('../assets/icons/md-star-outline.png'),
        })
    }

    return (
        <Swipeable 
            renderLeftActions={leftActions}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{name}</Text>
                <TouchableOpacity onPress={onFavouritePress}>
                    <Image source={starIcon}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </Swipeable>
    )
}

export default ListItem