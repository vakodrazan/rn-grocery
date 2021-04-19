import React from "react";
import CurrentList from "../screens/CurrentList";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const currentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Current List" component={CurrentList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default currentListStack