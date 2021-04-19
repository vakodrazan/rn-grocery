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


export const useCurrentList = () => {

    const [list, setList] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    const addItem = (text) => {
        const newList = [{ id: uuid(), name: text }, ...list]
        setList(newList)
        updateCurrentList(newList)

    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        updateCurrentList(newList)
    }

    const addToCart = (item) => {
        console.log(item);
        removeItem(item.id)
        const newCart = [item, ...cart]
        setCart(newCart)
        updateCurrentCart(newCart)
    }

    useEffect(() => {

        setTimeout(() => {
            Promise.all(

            [AsyncStorage.getItem('@@GrocerList/currentList'),
            AsyncStorage.getItem('@@GrocerList/currentCart')
        ])
                .then(([list, cartItems]) => [JSON.parse(list), JSON.parse(cartItems)])
                .then(([list, cartItems]) => {
                    if (list) {
                        setList(list)
                    }
                    if (cartItems) {
                        setCart(cartItems)
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
        addToCart

    }


}