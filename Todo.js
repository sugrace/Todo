import React, { useState, useCallback } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    TextInput, 
    Dimensions,
    Platform, 
    TouchableOpacity
  } from 'react-native';

const { width, height } = Dimensions.get('window');


export default function Todo(){
const [isEditing, setIsEditing] = useState(false);
const [isComplete, setIsComplete] = useState(false);

const _toggleCompelete = useCallback(() => {
    setIsComplete( prevState => !prevState );
},[])

    return (
        <>
        <View style={styles.container}>
            <TouchableOpacity onPress={_toggleCompelete}>
                <View style={[
                    styles.circle, 
                    isComplete ? styles.completeCircle : styles.uncompleteCircle
                    ]}/>
            </TouchableOpacity>
            <Text style={styles.text}>hello i am todo</Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
    },
    circle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle:{
        borderColor:"#bbb"
    }, 
    uncompleteCircle:{
        borderColor:"#F23657"
    },  
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    }
})