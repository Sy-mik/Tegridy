import React, { useState } from 'react';
import {  TextInput, Text, View, StyleSheet} from 'react-native';

export default function({label, callback, value}){
    return (
<View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={styles.textInputField}
            onChangeText={(text) => callback(text)}
            value={value}
          />
</View>
    )}

const styles = StyleSheet.create({
    inputContainer: {
      marginLeft: 16,
      marginTop: 20
    },
    inputLabel: {
      margin: 2,
      color: '#808080'
    },
    textInputField: {
      height: 40,
      width: 200,
      borderColor: 'gray',
      fontSize: 20,
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 20
    },
  });
    