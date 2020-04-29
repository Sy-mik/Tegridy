import React from 'react';
import {Picker} from 'react-native';


export default function({value, callBack}){
    return (
    <Picker
    value={value}
    style={{ height: 50, width: 150 }}
    onValueChange={(itemValue) => { callBack(itemValue) }}
  >
    <Picker.Item label="0" value="0" />
    <Picker.Item label="1" value="1" />
    <Picker.Item label="2" value="2" />
    <Picker.Item label="3" value="3" />
    <Picker.Item label="4" value="4" />
    <Picker.Item label="5" value="5" />
    <Picker.Item label="6" value="6" />
    <Picker.Item label="7" value="7" />
    <Picker.Item label="8" value="8" />
    <Picker.Item label="9" value="9" />
    <Picker.Item label="10" value="10" />
    <Picker.Item label="11" value="11" />
    <Picker.Item label="12" value="12" />
    <Picker.Item label="13" value="13" />
    <Picker.Item label="14" value="14" />
    <Picker.Item label="15" value="15" />
    <Picker.Item label="16" value="16" />
    <Picker.Item label="17" value="17" />
    <Picker.Item label="18" value="18" />
    <Picker.Item label="19" value="19" />
    <Picker.Item label="20" value="20" />
    <Picker.Item label="21" value="21" />
    <Picker.Item label="22" value="22" />
    <Picker.Item label="23" value="23" />
  </Picker>
)}