import { StyleSheet, View, Text, TouchableHighlight, TextInput, ScrollView, Pressable } from 'react-native'
import { useState } from 'react'
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { collection, addDoc, setDoc, doc, getDocs, getCountFromServer, documentId } from "firebase/firestore" 
import { db } from "../firebase/config"
import colors from '../config/colors';

export default function JoinBiteScreen({ navigation }) {

    const CELL_COUNT = 4;

    const [name, setName] = useState('');

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    async function handlePress() {
        try{
            const col = collection(db, "" + value);
            const snapshot = await getCountFromServer(col)
            if(snapshot.data().count > 0) {
                console.log("we in boui")
                const querySnapshot = await getDocs(col);
                var arr = [];
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data());
                })
                
                navigation.navigate('Survey', {
                    data2: arr
                })


            } 
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View 
            style={styles.container}>
                <Pressable
                    onPress={() => Keyboard.dismiss()}>
                    <Text 
                        style={styles.header}>JOIN BITE</Text>
                    <View
                        style={styles.inputFields}>

                        <CodeField
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                            )}
                        />

                        <View style={[styles.textInputView, {marginTop: 123}]}>
                            <TextInput
                            style={styles.textInput}
                            onChangeText={(name) => setName(name)} placeholder='Name' autoCapitalize='words' keyboardType='default' />
                        </View>
                    </View>

                    <View>
                        <TouchableHighlight 
                            style={styles.bottomButton} 
                            underlayColor={colors.primaryDark} 
                            onPress={() => {
                                handlePress();
                                
                            }}>
                            <Text 
                                style={styles.buttonText}>
                                    TAKE SURVEY</Text>
                        </TouchableHighlight>
                    </View>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'space-around'
    },
    header:{
        color: 'black',
        fontFamily: 'Open Sans',
        fontSize: 45,
        marginTop: '60%',
        marginBottom: 25,
        alignSelf: 'center'
      },
    textInputView:{
        width: 300,
        height: 60,
        borderRadius: 10,
        borderWidth: 3,
        marginTop: 25,
        borderColor: '#000000FF',
        textAlignVertical: 'center',
        textAlign: 'left',
        alignSelf: 'center'
        
    },
    textInput: {
        height: 55,
        fontFamily: 'Open Sans',
        fontSize: 24,
        fontWeight: 300,
        marginLeft: 10,
    },
    inputFields: {
        display: 'block',
        marginBottom: '35%',
    },
    bottomButton:{
        width: 344,
        height: 70,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
      },
    buttonText:{
        color: 'white', 
        fontFamily: 'Open Sans', 
        fontSize: 20
    },
    codeFieldRoot: {
        marginBottom: -100
    },
    cell: {
        width: 60,
        height: 80,
        lineHeight: 38,
        fontSize: 32,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#000000FF',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginHorizontal: 8,
        paddingBottom: 20,
        paddingTop: 15
        
    },
    focusCell: {
        borderColor: colors.primary,
    },
});