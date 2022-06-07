import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        color: 'white',
        height: 50,
        width: '70%',
        marginTop: 40,
        marginLeft: '5%',
        marginRight: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#6C8EBF',
        borderWidth: 2,
        backgroundColor: '#002552',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    imageUtalca: {
        resizeMode: "center",
        height: 500,
        width: '100%',
    },
    header: {
        heigh: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
  
    },
    text: {
        fontSize: 17, 
        fontWeight: '400', 
        color: 'white',
    },
    textButton: {
        color: "black",
        fontSize: 20,
        textAlign: "justify",
    },
    textTitle: {
        color: "white",
        fontSize: 26,
        textAlign: "center",
        marginTop: 20,
    },
    touchable:{
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    button: {
        marginTop: 40,
        alignItems: "center",
        width: '38%',
        marginLeft: '30%',
        borderColor: '#002552',
        backgroundColor: '#6C8EBF',
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        marginVertical: 10,
        borderWidth: 2,
        fontSize: 26,
    }
})