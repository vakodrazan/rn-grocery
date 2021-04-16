import React, { useEffect, useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
// import AsyncStorage from "@react-native-community/async-storage"

import nachos from '../data/nachos'
import ListItem, { Separator } from '../components/ListItem'
import AddItem from '../components/AddItem'
import { useCurrentList } from '../util/ListManager'
// import { v4 as uuid} from "uuid"

// const updateStoreCurrentList = (list) => {
//     AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
// }

export default () => {
    const {
        list,
        loading,
        addItem,
        removeItem
    } = useCurrentList();
    // const [list, setList] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const addItem = (text) => {
    //     const newList = [{id: uuid(), name: text}, ...list];
    //     setList(newList)
    //     updateStoreCurrentList(newList)
    // }

    // const removeItem = (id) => {
    //     const newList = list.filter(item => item.id !== id)
    //     setList(newList)
    //     updateStoreCurrentList(newList)
    // }

    // useEffect(() => {
    //     setTimeout(() => {
    //         AsyncStorage.getItem('@@GroceryList/currentList')
    //             .then(data => JSON.parse(data))
    //             .then(data => {
    //                 if (data) {
    //                     setList(data);
    //                 }
    //                 setLoading(false)
    //             })
    //     }, 1000);
    // }, [])

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