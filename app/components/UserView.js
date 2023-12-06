import * as React from 'react';
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import colors from '../config/colors';
import { FontAwesome, FontAwesome5} from '@expo/vector-icons';

function UserView({ name, readyStatus, isHost}){
    return(
        <View style={styles.container}>
            <FontAwesome name="user" size={54} color="black" style = {styles.icon}/>
            <View style={styles.nameBox}>
                <Text style={styles.name}>{name}</Text>
            </View>

            <View style={{flex: 1, flexBasis: 'end'}}/>

            {readyStatus? <FontAwesome5 name="check" size={54} color={colors.primary} style = {styles.icon}/> : <FontAwesome5 name="clock" size={46} color={'black'} style = {styles.icon}/>}
            
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: Dimensions.get('screen').width * 0.9,
        height: 90,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    nameBox: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        width: '50%',
        height: '70%',
        justifyContent: 'center'
    },
    icon:{
        margin: 20
    },
    name:{
        fontFamily: 'Open Sans',
        fontSize: 18,
        marginLeft: 10
    }
    
});

export default UserView;