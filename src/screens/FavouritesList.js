import React from "react";
import { useCurrentList } from "../util/ListManager"
import { Text, SafeAreaView, KeyboardAvoidingView, SectionList } from 'react-native'

import ListItem, { SectionHeader, Separator } from '../components/ListItem'
import AsyncStorage from "@react-native-community/async-storage";

export default () => {
    const {
        loading,
        removeItem,
        addToCart,
        addToFavourite,
        favourite,
        isFavourite
    } = useCurrentList();

    if (loading) {
        return (<SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>)
    }

    console.log("Favourite", favourite);
    AsyncStorage.clear()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>

                <SectionList
                    sections={[
                        { title: 'Favourite', data: favourite },
                    ]}
                    renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
                    renderItem={({ item, index }) => (
                        <ListItem name={item.name}
                            onFavouritePress={() => addToFavourite(item)}
                            isFavourite={isFavourite}
                            onAddedSwipe={() => addToCart(item)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => {
                                // navigation.navigate('ItemDetails')
                                navigation.navigate('ItemDetails', {
                                    item,
                                });
                            }}
                        />

                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator></Separator>}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}