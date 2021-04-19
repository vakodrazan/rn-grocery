import React, { useEffect, useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
// import AsyncStorage from "@react-native-community/async-storage"

import nachos from '../data/nachos'
import ListItem, { Separator } from '../components/ListItem'
import AddItem from '../components/AddItem'
import { useCurrentList } from '../util/ListManager'

export default ({ navigation }) => {
    const {
        list,
        loading,
        addItem,
        removeItem
    } = useCurrentList();

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{flex: 1 }}>
            <KeyboardAvoidingView style={{flex: 1 }}>
                <FlatList data={list} renderItem={({ item, index }) => (
                    <ListItem 
                        name={item.name}
                        onFavouritePress={() => alert('todo: on favourite press')}
                        isFavourite={index < 2}
                        onAddedSwipe={() => removeItem(item.id)}
                        onDeleteSwipe={() => removeItem(item.id)}
                        onRowPress={() => {
                            navigation.navigate('ItemDetails')
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