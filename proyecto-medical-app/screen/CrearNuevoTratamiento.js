import React, {useState} from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {styles} from '../estilos/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native-web';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CrearNuevoTratamiento({navigation, route}) {
    //1=cefaleo, 2=estomacal
    const tipoTratamiento = route.params.tipo[0];
    var tipo = '';
    if(tipoTratamiento==1){
        tipo = 'cefaleo';
    }
    else if(tipoTratamiento==2){
        tipo = 'estomacal';
    }
    //usuario id
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    //navegacion
    //const navigation = useNavigation();

    const [nombre, setNombre] = useState('');

    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());

    const [mode, setMode] = useState('date');

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
   
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        setDate(currentDate);
        setShow(false);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
        setText(fDate);
    }
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setShow2(Platform.OS === 'ios');

        setDate2(currentDate);
        setShow2(false);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
        setText2(fDate);
    }
    const showMode = (currentMode) => {
        console.log("date");
        console.log(currentMode);
        setShow(true);
        setMode(currentMode);
    }
    const showMode2 = (currentMode) => {
        console.log("date");
        console.log(currentMode);
        setShow2(true);
        setMode(currentMode);
    }
    const pressCrear = async () => {
        console.log("Nombre:");
        console.log(nombre);
        console.log("Press crear");
        console.log(date);
        console.log(date2);
        const newTreatment = {
            name: nombre,
            initDate: date,
            endDate: date2,
            refuser: userid,
            tipoTratamiento: tipo,
            formulariosCreados: false,
        }
        try {
            await addDoc(collection(db, 'tratamientos'), newTreatment);
           
        }catch(e){
            console.log(e);
        } finally{
            setNombre('');
        }
        navigation.navigate('Mis tratamientos');
    
    }
    return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
            <Text style={styles.textTitle}>Crear tratamiento</Text>
            <Text style={styles.text}>Nombre del tratamiento</Text>
            <TextInput style={styles.input} onChangeText={(val) => setNombre(val)}/>
            {text.length>0 &&<Text style={styles.text}>{text}</Text>}
            <TouchableOpacity onPress={() => showMode('date')} style={[styles.touchable, { backgroundColor: '#1B72B5'}]}>
                <Text style={styles.text}>Seleccionar fecha inicio</Text>
            </TouchableOpacity>
            {text2.length>0 && <Text style={styles.text}>{text2}</Text>}
            <TouchableOpacity onPress={() => showMode2('date')} style={[styles.touchable, { backgroundColor: '#1B72B5'}]}>
                <Text style={styles.text}>Seleccionar fecha termino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pressCrear()} style={[styles.touchable, { backgroundColor: 'green'}]}>
                <Text style={styles.text}>Crear</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                testID= 'dateTimePicker'
                value= {date}
                mode={mode}
                is24Hour={true}
                display= 'default'
                onChange= {onChange}
            />
            )}
            {show2 && (
                <DateTimePicker
                testID= 'dateTimePicker'
                value= {date2}
                mode={mode}
                is24Hour={true}
                display= 'default'
                onChange= {onChange2}
            />
            )}
        </View>
    );
}
