import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  Dimensions,
  Platform, 
  ScrollView
} from 'react-native';
import Todo from './Todo';


const { height, width } = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo ] = useState('');
  


  const _controllNewToDo = useCallback((text) => {
    setNewToDo(text);
  },[])


  return (
    <>
    <View style={styles.container}>
    <StatusBar barStyle='light-content' backgroundColor={'transparent'} translucent={true}/>
      <Text style={styles.title}>Kawai To Do</Text>
      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder={"New To Do"} 
          value={newToDo}
          onChangeText={_controllNewToDo}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          <Todo/>
        </ScrollView>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "400",
    marginBottom : 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor:"rgb(50, 50, 50)",
        shadowRadius: 5,
        shadowOffset:{
          heigth: -1,
          width: 0
        }
      },
      android:{
        elevation: 3
      }
    })
  },
  input:{
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 25
  },
  toDos:{
    alignItems: "center"
  }
});
