import React, {useState} from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native'

import Cita from "./components/cita";
import Formulario from "./components/formulario";

const App = () => {
  const [mostrarForm, setMostrarForm] = useState(false)
  const [citas, setCitas] = useState([])

  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
      return citasActuales.filter( cita => cita.id !== id )
    })
  }
  
  //mostrar u ocultar formulario
  const hideForm = () => {
    setMostrarForm(!mostrarForm)    
  }

  //ocultar teclado
  const closeKeyboard = () => {
    Keyboard.dismiss()
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()} >
      <View style={styles.content}>
        <StatusBar backgroundColor='#222831' barStyle='light-content' />
        <Text style={styles.header}> Administrador de Citas </Text>
        <View>
          <TouchableHighlight onPress={ () => hideForm()} style={styles.btnEliminarCita}>
            <Text style={styles.textBtnEliminarCita}>{mostrarForm ? 'Cancelar y Volver' : 'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>
      
        <View style={styles.contentForm}>
          {mostrarForm ? (
            <>
              <Text style={styles.header}> Crea Nueva Cita </Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setMostrarForm={setMostrarForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.header}> {citas.length > 0 ? 'Administra tus Citas' : 'Agregue Citas'} </Text>

              <FlatList
                style={styles.listData}
                data={citas}
                renderItem={({item}) => <Cita item={item}
                                          eliminarPaciente={eliminarPaciente}
                                        />}
                keyExtractor={ cita => cita.id} 
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#222831',
    flex: 1,
  },
  contentForm: {
    flex: 1,
  },
  listData: {
    flex: 1,
  },
  header: {
    color: '#00adb5',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  btnEliminarCita: {
    padding: 10,
    backgroundColor: '#00adb5',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: '2%'
  },
  textBtnEliminarCita: {
    color: 'white',
    textAlign: 'center'
  },
})

export default App