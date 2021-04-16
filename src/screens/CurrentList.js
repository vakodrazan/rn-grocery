import React, { useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native'

import nachos from '../data/nachos'
import ListItem, { Separator } from '../components/ListItem'
import AddItem from '../components/AddItem'
import { v4 as uuid} from "uuid"

export default () => {
    const [list, setList] = useState(nachos)

    const addItem = (text) => {
        setList([{id: uuid(), name: text}, ...list])
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
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