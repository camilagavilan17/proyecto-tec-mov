import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} >
                <TouchableOpacity style={styles.button}>
                    <Text>Configuración</Text>
                </TouchableOpacity>
                <Divider />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    }
});

export default CustomDrawer;