import React, {useEffect, useState} from 'react';
import { StyleSheet,  FlatList, View, Text, Image, TouchableOpacity
 } from 'react-native';

 import { AntDesign } from '@expo/vector-icons';
 import { useNavigation } from '@react-navigation/native';
import { GetPlants } from '../services/apiCalls';
import { fetchScheduled, fetchPlants } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";
import FetchPlants from '../store/FetchPlants';

export default function PlantList(){ 
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dataReducer = useSelector((state) => state.userPlantsReducer);
  const { data } = dataReducer;

  const [list, setList] = React.useState([]);
 
  useEffect(() => {
  FetchPlants(dispatch) 
 },[]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
    <Text
      onPress={() => navigation.push('Choose Type')}
      style={{ marginRight: 16, fontSize: 18, fontWeight: '500' }}
      >
        Add
    </Text>),
    });
  }, []);

 function Item({item}){
  return (
    <TouchableOpacity
    onPress ={()=> navigation.push('Plant',{plant:item})}>  
  <View style={{flex:1, margin:20, flexDirection:'row', justifyContent:'space-between'}}>
  <View style={{flex:1, flexDirection:'row'}}>
    <Image
        style={{width:80, height:80, borderRadius:15, }}
        source={{uri: item.imageUri}}
      />
  <View style={{alignSelf:'center'}}>
    <Text style={{fontSize:20, marginLeft:20}} >{item.name}</Text>
    </View>
    </View>

  <View style={{alignSelf:'center'}}>
    <AntDesign
    color="gray"
      name="right"
      size={24}>
    </AntDesign>
  </View>
</View> 
</TouchableOpacity> )
}

  return (
    <FlatList
    data={data}
    renderItem={({ item }) => <Item item={item}></Item>}
    keyExtractor={item => item.id}
  />
 )}
 

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});
