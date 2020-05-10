import React, { useState, useCallback } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    TextInput, 
    Dimensions,
    Platform, 
    TouchableOpacity,
  } from 'react-native';

const { width, height } = Dimensions.get('window');


export default function Todo(props){
const [isEditing, setIsEditing] = useState(false);
const [isCompleted, setisCompleted] = useState(false);
const [toDoValue, setToDoValue] = useState(false);

const _toggleCompelete = useCallback((event) => {
    event.stopPropagation();
    setisCompleted( prevState => !prevState );
},[])

const _startEditing = useCallback((event)=>{
    event.stopPropagation();
    setIsEditing(true);
    setToDoValue(props.text)
},[])

const _finishEditing = useCallback((event)=>{
    event.stopPropagation();
    props.updateToDo(props.id, toDoValue);
    setIsEditing(false);
},[toDoValue])

const _controllInput = useCallback((text)=>{
    setToDoValue(text);
},[])




    return (
        <>
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={_toggleCompelete}>
                    <View style={[
                        styles.circle, 
                        isCompleted ? styles.completeCircle : styles.uncompleteCircle
                        ]}/>
                </TouchableOpacity>
                {isEditing ? (
                <TextInput style={[
                            styles.text,
                            styles.input, 
                            isCompleted ? styles.completedText : styles.uncompletedText
                        ]} 
                        value={toDoValue} 
                        multiline={true}
                        onChangeText={_controllInput}
                />) 
                : 
                (
                    <Text style={[styles.text, isCompleted ? styles.completedText: styles.uncompletedText]}>{props.text}</Text>
                )}
                
            </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={_finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>finishEditing</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={_startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={(event)=>{
                                            event.stopPropagation();
                                            props.deleteToDo(props.id)
                                            }}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>x</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    )} 
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
        justifyContent: "space-between"
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
    },
    completedText : {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection : "row",
        alignItems: "center",
        width: width / 2 ,
    },
    actions:{
        flexDirection: "row"
    },  
    actionContainer:{
        marginVertical: 10,
        marginHorizontal: 10,
    },
    input : {
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5
    }
})