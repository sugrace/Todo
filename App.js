import React, { useState, useCallback, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  Dimensions,
  Platform, 
  ScrollView,
  AsyncStorage
} from 'react-native';
import { AppLoading } from "expo";
import Todo from './Todo';


const { height, width } = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo ] = useState('');
  const [loadedToDos, setLoadedToDos] = useState(false);
  const [toDos, setToDos] = useState({});
  useEffect(() => {
    _loadToDos();
  },[]);

  const _controllNewToDo = useCallback((text) => {
    setNewToDo(text);
  },[])
 

  const _loadToDos   = useCallback( async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      setToDos(JSON.parse(toDos));
      setLoadedToDos(true);
    } catch (error) {
      console.log(error)
    }
  },[])

  const _addToDo  = useCallback(() => {
    if(newToDo !== ''){
      const ID = Math.floor(Math.random() * 100000 ) ;
      const newToDoObject = {
        [ID]:{
          id: ID,
          isCompleted: false,
          text: newToDo,
          createdAt: Date.now(),
        }
      }
      setToDos((prevState)=>{
        _saveToDos({...prevState, ...newToDoObject})
        return {...prevState, ...newToDoObject};
      })
    }
  },[newToDo])

  const _deleteToDo = useCallback((id) => {
    setToDos((prevState)=>{
      delete prevState[id];
      _saveToDos(prevState)
      return {...prevState};
    });
  },[])

  
  const _updateToDo = useCallback((id, text) => {
    setToDos((prevState)=>{
      prevState[id].text = text; 
      _saveToDos(prevState)
      return {...prevState};
    });
  },[])

  const _saveToDos = useCallback((newToDos) => {
    const _saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  },[])

  const _uncompleteToDo = useCallback((newToDos) => {
    setToDos((prevState)=>{
      prevState[id].isCompleted = true; 
      _saveToDos(prevState)
      return {...prevState};
    });
  },[])

  const _completeToDo = useCallback((newToDos) => {
    setToDos((prevState)=>{
      prevState[id].isCompleted = false; 
      _saveToDos(prevState)
      return {...prevState};
    });
  },[])

  if(!loadedToDos){
    return <AppLoading/>
  }


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
          onSubmitEditing={_addToDo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          {Object.values(toDos).sort((a, b)=> b.createdAt - a.createdAt).map((toDo)=>{
            return <Todo key={toDo.id}
                         deleteToDo={_deleteToDo}
                         uncompleteToDo={_uncompleteToDo}
                         completeToDo={_completeToDo}
                         updateToDo={_updateToDo}
                         {...toDo}
                    />}
            )
          }
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
