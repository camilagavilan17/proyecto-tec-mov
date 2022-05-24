import React from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';


import { useNavigation } from '@react-navigation/native';
 
export default function LoginScreen() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Cuenta creada!')
      Alert.alert("Cuenta creada!")
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert("Error de autentificación")
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Conectado!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
      Alert.alert("Correo o contraseña equivocada!")
    })
  }
  return (
    <View style={styles.container}>
      <Image source={require("../assets/fondo2.jpg")} style={[styles.Image, StyleSheet.absoluteFill]} />
      <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
      <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 120, position: 'absolute', transform: [{rotate: '25deg'}] }}></View>
      <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 120 ,position: 'absolute', borderRadius: 50, transform: [{rotate: '50deg'}] }}></View>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}> 
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={require("../assets/mario.png")} style={styles.profilePicture} />
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>E-mail</Text>
              <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="Correo@gmail.com" />
            </View>
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Contraseña</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="Contraseña" secureTextEntry={true}/>
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Conectarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#6792F090'}]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {

    flex:1,
    resizeMode: 'cover',
    justifyContent:'center',
 
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  }


});