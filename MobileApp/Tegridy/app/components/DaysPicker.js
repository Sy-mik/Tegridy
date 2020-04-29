import React from 'react';
import { Picker } from 'react-native';

export default function({value, callBack}){
    return (
    <Picker
    value={value}
    style={{ height: 50, width: 150 }}
    onValueChange={(itemValue) => callBack(itemValue)}
  >
    <Picker.Item label="Today" value="0" />
    <Picker.Item label="Tomorrow" value="1" />
    <Picker.Item label="In 2 days" value="2" />
    <Picker.Item label="In 3 days" value="3" />
    <Picker.Item label="In 4 days" value="4" />
    <Picker.Item label="In 5 days" value="5" />
    <Picker.Item label="In 6 Days" value="6" />
    <Picker.Item label="In 7 Days" value="7" />
  </Picker>
)}