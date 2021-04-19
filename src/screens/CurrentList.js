import React, { useEffect, useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import ListItem, { Separator } from '../components/ListItem'
import AddItem from '../components/AddItem'
import { useCurrentList } from '../util/ListManager';

export default ({navigation}) => {
    const { list,
        loading,
        addItem,
        removeItem } = useCurrentList()


    if (loading) {
        return (<SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>

                <FlatList data={list} renderItem={({ item, index }) => (
                    <ListItem name={item.name}
                        onFavouritePress={() => console.log('favvvvv')}
                        isFavourite={index < 2}
                        onAddedSwipe={() => removeItem(item.id)}
                        onDeleteSwipe={() => removeItem(item.id)}
onRowPress={()=>{
    // navigation.navigate('ItemDetails')
    navigation.navigate('ItemDetails', {
     item,
      });
}}
                    />

                )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator></Separator>}
                    ListHeaderComponent={() => <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)} />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>)
};