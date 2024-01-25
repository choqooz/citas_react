import { useState, useEffect } from "react";
import Error from "./Error";
useState;

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay un campo vacio");
      setError(true);
      return;
    }
    setError(false);

    // Construimos un objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId(),
    };

    if (paciente.id) {
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reseteamos form
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-m rounded-lg py-10 px-5"
      >
        {/* Se pasa como prop a lo que contiene la etiqueta Error, lo que esta dentro de la etiqueta, se conoce como children(prop), y se la puede utilizar en el componente usado (Error en este caso) */}
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            {" "}
            Nombre Mascota
          </label>
          <input
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            id="mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            {" "}
            Nombre Propietario
          </label>
          <input
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            {" "}
            Email
          </label>
          <input
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block text-gray-700 uppercase font-bold"
          >
            {" "}
            Alta
          </label>
          <input
            type="date"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            id="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <label
          htmlFor="sintomas"
          className="block text-gray-700 uppercase font-bold"
        >
          {" "}
          Sintomas
        </label>
        <textarea
          id="sintomas"
          className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
          placeholder="Describe los sintomas"
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
        />
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all mb-10"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
}

export default Formulario;
