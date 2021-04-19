import React from "react";
import CurrentList from "../screens/CurrentList";
import ItemDetails from "../screens/ItemDetails";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const currentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList} />
                <Stack.Screen name="ItemDetails" component={ItemDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default currentListStack