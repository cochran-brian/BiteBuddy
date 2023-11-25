import { StyleSheet, View, Text, TouchableHighlight, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore" 
import { db } from "../firebase/config"
import colors from '../config/colors';

const CELL_COUNT = 4;

export default function JoinBiteScreen({navigation}) {

    const [name, setName] = useState('');

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    async function handlePress() {
        // try{
        //     console.log(value)
        //     const snapshot = await getDocs(collection(db, "" + value))
        //     console.log("count: ", snapshot.data().count)
        //     //console.log(getDocs(collection(db, "8841")).data().count) 
        // } catch (error) {
        //     console.error(error)
        // }
        
    }

    return (
        <View 
        style={styles.container}>
            {/* <KeyboardAwareScrollView> */}

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
                    navigation.navigate('Survey')
                }}>
                    <Text 
                    style={styles.buttonText}>
                        TAKE SURVEY</Text>
                </TouchableHighlight>
            </View>

            {/* </KeyboardAwareScrollView> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    header:{
        color: 'black',
        fontFamily: 'Open Sans',
        fontSize: 45,
        marginTop: 20,
        alignSelf: 'center'
      },
    textInputView:{
        width: 300,
        height: 60,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#000000FF',
        textAlignVertical: 'center',
        textAlign: 'left',
        
    },
    textInput: {
        height: 55,
        fontFamily: 'Open Sans',
        fontSize: 24,
        fontWeight: 300,
        marginLeft: 10
    },
    inputFields: {
        display: 'block',
        marginBottom: '50%',
    },
    bottomButton:{
        width: 344,
        height: 54,
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