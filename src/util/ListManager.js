import AsyncStorage from '@react-native-community/async-storage'
import "react-native-get-random-values";
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react'


const updateCurrentList = (list) => {
    AsyncStorage.setItem("@@GrocerList/currentList", JSON.stringify(list))
}
const updateCurrentCart = (list) => {
    AsyncStorage.setItem("@@GrocerList/currentCart", JSON.stringify(list))
}

const updateCurrentFavourite = (favourite) => {
    AsyncStorage.setItem("@@GrocerList/currentFavourite", JSON.stringify(favourite))
}


export const useCurrentList = () => {

    const [list, setList] = useState([])
    const [cart, setCart] = useState([])
    const [favourite, setFavourite] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFavourite, setIsFvourite] = useState(false)

    const addItem = (text) => {
        const newList = [{ id: uuid(), name: text }, ...list]
        setList(newList)
        updateCurrentList(newList)

    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList)
        updateCurrentList(newList)
    }

    const addToCart = (item) => {
        removeItem(item.id)
        const newCart = [item, ...cart]
        setCart(newCart)
        updateCurrentCart(newCart)
    }

    const addToFavourite = (item) => {
        const newFavourite = [item, ...favourite]
        setFavourite(newFavourite)
        updateCurrentFavourite(newFavourite)
    }

    useEffect(() => {

        setTimeout(() => {
            Promise.all(

            [AsyncStorage.getItem('@@GrocerList/currentList'),
            AsyncStorage.getItem('@@GrocerList/currentCart'),
            AsyncStorage.getItem('@@GrocerList/currentFavourite')
        ])
                .then(([list, cartItems, favouriteItem]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(favouriteItem)])
                .then(([list, cartItems, favouriteItem]) => {
                    if (list) {
                        setList(list)
                    }
                    if (cartItems) {
                        setCart(cartItems)
                    }
                    if (favouriteItem) {
                        setFavourite(favouriteItem)
                    }

                    setLoading(false)
                })
        }, 2000)
    }, [])

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        addToFavourite,
        favourite,
        isFavourite
    }


}