import React, { useRef } from 'react'
import { StyleSheet, TextInput, View } from "react-native"

const styles = StyleSheet.create({

    input: {
        backgroundColor: '#fff',
        fontSize: 18,
        padding: 10,
        borderRadius: 3
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        fontSize: 10,
        padding: 10,
        borderRadius: 3
    },

})

const AddItem = ({ onSubmitEditing, style, ...rest }) => {

    const input = useRef(null)
    return (
        <View style={styles.container}>
            <TextInput
                ref={input}
                style={[styles.input, style]} onSubmitEditing={(evt) => {
                    if (onSubmitEditing) {
                        onSubmitEditing(evt)
                    }
                    input.current.clear()
                }}
                placeholder={'Add item...'}
                {...rest}
            />
        </View>
    )
}

export default AddItem