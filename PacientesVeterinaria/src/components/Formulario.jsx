import { useState, useEffect } from "react"
import Error from "./Error"
const Formulario = ({pacientes,setPacientes, paciente, setPaciente}) => {
  
  
  const[nombreMascota, setNombreMascota] = useState('')
  const[propietario, setPropietario] = useState('')
  const[email, setEmail] = useState('')
  const[fecha, setFecha] = useState('')
  const[sintomas, setSintomas] = useState('')
  
  //Error
  const[error, setError] = useState(false)
  
  //Enviando la información del objeto a el formulario con ayuda del UseEffect
  useEffect(()=>{
    if(Object.keys(paciente).length > 0){ //Una forma de comprobar si un arreglo está vacio
      setNombreMascota(paciente.nombreMascota);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])


  //Generar Id Unico
  const generarId = ()=>{
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha
  }


  const handleSubmit = (e)=>{
    e.preventDefault();

    //Validación del formulario
      if([nombreMascota, propietario, email, fecha,sintomas].includes('')){

        setError(true);
        return
      }
      setError(false)

      //Objeto de pacientes

      const objetoPaciente = {
        nombreMascota, 
        propietario, 
        email, 
        fecha,
        sintomas,
      }


      //Verificando si estamos editando o agregando un nuevo registro
      if(paciente.id){
        //Editando un registro
        //console.log(objetoPaciente)
        objetoPaciente.id = paciente.id
        const pacientesActucalizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
        setPacientes(pacientesActucalizados)
        setPaciente({})

      }else{
        //Agregando un nuevo registro
        objetoPaciente.id=generarId()

        //Tomando una copia del arreglo original y obteniendo los datos de objetoPaciente
        setPacientes([...pacientes, objetoPaciente])
      }



      //Reiniciando el formulario
      setNombreMascota('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
  }
  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center">Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mt-10 mb-10">
        
        {error && <Error mensaje = 'Todos los campos son obligatorios'/> }

        {/* Div para la mascota */}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombreMascota}
            onChange={(e)=> setNombreMascota(e.target.value)}
            />
        </div>
        {/* Div para el propietario */}
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange= {(e)=> setPropietario(e.target.value) } 
            />
        </div>
        {/* Div para el correo */}
        <div className="mb-5">
          <label htmlFor="Email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input 
            id="Email"
            type="email" 
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
        </div>
        {/* Div para la fecha de salida */}
        <div className="mb-5">
          <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha de salida</label>
          <input 
            id="fecha"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e)=> setFecha(e.target.value)}
            />
        </div>
        {/* Div para la fecha de salida */}
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea 
            id="sintomas" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e)=> setSintomas(e.target.value)}
            />
        </div>
        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
          value={paciente.id ? 'Editar Paciente' : 'Agregar pacientes'}//"paciente.id"= Si en el objeto de paciente hay un Id    //Cuando le doy editar paciente,saldra como texto editar paciente. Si no hay saldra agregar paciente
          />
      </form>
    </div>
  )
}

export default Formulario