import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";

const Formulario = ({citas, setCitas, setMostrarForm}) => {
    
    //estados de todos los input
    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [telefono, setTelefono] = useState('')
    const [hora, setHora] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')

    //estados de visibilidad de los pickers
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    //modal Date
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
  
    //modal Time
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    //confirmaciones de fecha u hora
    const handleConfirmDate = (date) => {
        const optionDate = { year: 'numeric', month: 'long', day: '2-digit'}
        setFecha(date.toLocaleDateString('es-ES', optionDate))
        hideDatePicker();
    };  

    const handleConfirmTime = (time) => {
        const opcionesTime = { hour: 'numeric', minute: '2-digit', hour12: false}
        setHora(time.toLocaleString('en-US', opcionesTime))
        hideTimePicker();
    };

    //crear nueva cita

    const createNew = () => {
        console.log('nueva cita creada...')
        //validaciones
        if (paciente.trim() === '' || 
            propietario.trim() === '' || 
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === '')
            {
                //la validacion fallo
                alertFail()
                    return
            }
        // creando una cita
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
        cita.id = shortid.generate()

        //agregar citas
        const citasNuevas = [...citas, cita]
        setCitas(citasNuevas)
        
        //ocultar y resetear formulario
        setMostrarForm(false)

    }

    const alertFail = () => {
        Alert.alert(
            'Error', // Titulo de la alerta
            'Todos los campos son obligatorios', // mensaje de la alerta
            [{
                text: 'OK' //arreglo de los botones
            }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}> Paciente: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => setPaciente(texto)}
                        placeholder={'Ingrese el nombre de la mascota'}
                    />
                </View>
                <View>
                    <Text style={styles.label}> Propietario: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => setPropietario(texto)}
                        placeholder={'Ingrese su nombre y apellido'}
                    />
                </View>
                <View>
                    <Text style={styles.label}> Telefono: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => setTelefono(texto)}    
                        keyboardType={'numeric'}
                        placeholder={'Ej.: +01 123 456 7890'}
                    />
                </View>
                <View>
                    <Text style={styles.label}> Fecha: </Text>
                    <Button title="Selecciona Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                    <Text style={styles.labelFH}>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}> Hora: </Text>
                    <Button title="Selecciona la Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        is24Hour
                    />
                    <Text style={styles.labelFH}>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}> Sintomas: </Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={texto => setSintomas(texto)}
                        placeholder={'Ingrese posibles sintomas del paciente'}
                    />
                </View>
                <View>
                <TouchableHighlight onPress={ () => createNew()} style={styles.btnEliminarCita}>
                    <Text style={styles.textBtnEliminarCita}>Crear Nueva Cita</Text>
                </TouchableHighlight>
            </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: '2.5%',
        borderRadius: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        paddingHorizontal: 7,
    },
    labelFH: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        paddingHorizontal: 7,
        textAlign: 'center',
    },
    input: {
        marginTop: 10,
        height: 45,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    btnEliminarCita: {
        padding: 10,
        backgroundColor: '#00adb5',
        marginVertical: 10,
        borderRadius: 10,
    },
    textBtnEliminarCita: {
        color: 'white',
        textAlign: 'center'
    },
})

export default Formulario;