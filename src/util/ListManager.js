import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage"
import 'react-native-get-random-values'
import { v4 as uuid} from "uuid"

const updateStoreCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

const updateStoreCurrentCart = (cart) => {
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(cart))
}

export const useCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list];
        setList(newList)
        updateStoreCurrentList(newList)
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        updateStoreCurrentList(newList)
    }

    const addToCart = (item) => {
        removeItem(item.id)
        const newCart = [item, ...cart];
        setCart(newCart)
        updateStoreCurrentCart(newCart);
    }

    useEffect(() => {
        setTimeout(() => {
            Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'),
                AsyncStorage.getItem('@@GroceryList/currentCart')
            ])
                .then(([list, cartItem]) => [JSON.parse(list), JSON.parse(cartItem)])
                .then(([list, cartItem]) => {
                    if (list) {
                        setList(list);
                    }
                    if (cartItem) {
                        setCart(cartItem);
                    }
                    setLoading(false)
                })
        }, 1000);
    }, [])

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart, 
        addToCart,
    }
}