import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const Cita = ({item, eliminarPaciente}) => {

    const dialogoEliminar = id => {
        console.log('eliminado...', id)
        eliminarPaciente(id)
    }
    return (
        <View style ={styles.cita}>
            <View>
                <Text style={styles.label} >Paciente: </Text>
                <Text style={styles.texto}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas: </Text>
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>
            <View>
                <Text style={styles.label}>Fecha: </Text>
                <Text style={styles.texto}>{item.fecha}</Text>
            </View>

            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textBtnEliminar}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#eeeeee',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: '2.5%',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    texto: {
        fontSize: 16,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: '#bd2000',
        marginVertical: 10,
        borderRadius: 10,
    },
    textBtnEliminar: {
        color: 'white',
        textAlign: 'center'
    },
  })

export default Cita;