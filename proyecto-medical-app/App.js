import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './database/Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const FormsList = () => {
  const [forms, setForms] = useState([])

  const obtenerFormularios= async () => {
    const formularios = await getDocs(collection(db, 'formularios'));
    formularios.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        forms.push(doc.data());
    });
    console.log(forms);
  }

  useEffect(() => {
    obtenerFormularios();
  },[])

  return (
    forms.length > 0 ? forms.map(form => {
      <View>
          <Text>Lista de formularios</Text>
          <Text>{form.nombre}</Text>
      </View>
    }) : <Text>Sin datos</Text>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Proyecto moviles</Text>
        <FormsList/>
      <StatusBar style="auto" />
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
});
