import React from "react";
import CurrentList from "../screens/CurrentList";
import ItemDetails from "../screens/ItemDetails";
import FavouritesList from "../screens/FavouritesList";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, Text } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const currentListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CurrentList" component={CurrentList} />
            <Stack.Screen 
                name="ItemDetails" 
                component={ItemDetails} 
                options={({ route }) => {
                    return {
                        headerTitle: () => {
                            return <Text>{route.params.item.name}</Text>
                        }
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const FavouriteListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "FavouritesList"
                component={FavouritesList}
            />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                    screenOptions={({ route}) => ({
                        tabBarIcon: ({ color, focused }) => {
                            let image = require('../assets/icons/ios-list.png');
                            const { name } = route

                            if (name === "Current") {
                                image= Platform.select({
                                    ios: require('../assets/icons/ios-list.png'),
                                    android: require('../assets/icons/md-list.png'),
                                })
                            } else if (name === "Favourite") {
                                image= Platform.select({
                                    ios: focused 
                                        ? require('../assets/icons/ios-star.png')
                                        : require('../assets/icons/ios-star-outline.png'),
                                    android: focused 
                                        ? require('../assets/icons/md-star.png')
                                        : require('../assets/icons/md-star-outline.png'),
                                })
                            }

                            return (
                                <Image 
                                    source={image}
                                    resizeMode="contain"
                                    style={{ width: 25, tintColor: color}}
                                />
                            )
                        }
                    })}
                >
                <Tab.Screen name="Current" component={currentListStack} />
                <Tab.Screen name="Favourite" component={FavouriteListStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }


export default Tabs;