import React, { useEffect, useState } from 'react'

import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    FlatList, 
    KeyboardAvoidingView, 
    ActivityIndicator, 
    SectionList
} from 'react-native'
// import AsyncStorage from "@react-native-community/async-storage"

import nachos from '../data/nachos'
import ListItem, { Separator, SectionHeader } from '../components/ListItem'
import AddItem from '../components/AddItem'
import { useCurrentList } from '../util/ListManager'

export default ({ navigation }) => {
    const {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
    } = useCurrentList();

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    // console.log('cart', cart);

    return (
        <SafeAreaView style={{flex: 1 }}>
            <KeyboardAvoidingView style={{flex: 1 }}>
                <SectionList 
                    sections={[
                        {title: 'List', data: list},
                        {title: 'Cart', data: cart}
                    ]}
                    renderSectionHeader={({ section }) => (
                        <SectionHeader title={section.title} />
                    )}
                    renderItem={({ item, index }) => (
                    <ListItem 
                        name={item.name}
                        onFavouritePress={() => alert('todo: on favourite press')}
                        isFavourite={index < 2}
                        onAddedSwipe={() => addToCart(item)}
                        onDeleteSwipe={() => removeItem(item.id)}
                        onRowPress={() => {
                            navigation.navigate('ItemDetails', {
                                item
                            })
                        }}
                    />
                )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator></Separator>}
                    ListHeaderComponent={() => {
                        return (<AddItem 
                            onSubmitEditing= {({ nativeEvent: { text }}) => addItem(text)}
                        />)
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>)

};