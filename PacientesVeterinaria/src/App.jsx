import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Headers"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const[pacientes, setPacientes] = useState([]) //Listado de todos los pacientes
  const[paciente, setPaciente] = useState({})// Un solo paciente
 

  useEffect( () =>  {//Con este useEffect lo que hago es obtener lo que hay en localStorage
    
    const obtenerLS = () =>{//?? QUiere decir que si no hay nada en LS entonces le agrega un arreglo vacio

      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      
      setPacientes(pacientesLS)
      //console.log(pacientesLS)
    }

    obtenerLS();

  }, []);// Cuando le paso un arreglo vacio, quiere decir que solamente se va a ejecutar una sola vez


  useEffect(() =>{
    localStorage.setItem('pacientes', JSON.stringify( pacientes ))
    //console.log(pacientes)
  }, [pacientes])


  //ELIMINAR UN PACIENTE
  const eliminarPaciente = (id)=>{
    
    // console.log('Eliminando paciente', id)
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id) //.filter nos permite sacar un elemento del arreglo
    setPacientes(pacientesActualizados)
  }
  

  return (
    <div className="container mx-auto mt-20">
      <Header/>

      <div className="mt-12 md:flex">
        <Formulario
          pacientes = {pacientes}
          setPacientes={setPacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPacientes
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente ={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
