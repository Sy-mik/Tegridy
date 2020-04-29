
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function PlantTypeItem({ id, title, selected , onSelectItem}) {
  return (
    <TouchableOpacity
      onPress={() => onSelectItem(id, title)}
      style={{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor: '#fff',
            padding: 10,
            marginVertical: 4,
            marginHorizontal: 16,
            backgroundColor: selected ? '#dcdcd' : '#ffff' 
      }}
    >
      <Text style={{fontSize: 20}}>{title}
      </Text>
      <FontAwesome 
                  size={24}
                   name= {selected ? "circle" :"circle-o" } />
        
    </TouchableOpacity>
  );
}
