import React, {
  useEffect,
  useState
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

import axios from "axios";

function Dashboard() {

  // =====================================
  // STATES
  // =====================================

  const [clientes, setClientes] =
    useState([]);

  const [alertas, setAlertas] =
    useState([]);

  const [monitoreo, setMonitoreo] =
    useState([]);

    const [modoOscuro, setModoOscuro] =
  useState(false);

  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {

  const intervalo = setInterval(() => {

    obtenerClientes();
    obtenerAlertas();
    obtenerMonitoreo();

  }, 5000);

  return () => clearInterval(intervalo);

}, []);


  // =====================================
  // CLIENTES
  // =====================================

  const obtenerClientes = async () => {

    try {

      const respuesta =
        await axios.get(
          "http://localhost:5000/clientes"
        );

      setClientes(respuesta.data);

    } catch (error) {

      console.log(error);

    }

  };


  // =====================================
  // ALERTAS
  // =====================================

  const obtenerAlertas = async () => {

    try {

      const respuesta =
        await axios.get(
          "http://localhost:5000/alertas"
        );

      setAlertas(respuesta.data);

    } catch (error) {

      console.log(error);

    }

  };


  // =====================================
  // MONITOREO
  // =====================================

  const obtenerMonitoreo = async () => {

    try {

      const respuesta =
        await axios.get(
          "http://localhost:5000/monitoreo"
        );

      setMonitoreo(respuesta.data);

    } catch (error) {

      console.log(error);

    }

  };


  // =====================================
  // COLORES ALERTAS
  // =====================================

  const colorAlerta = (tipo) => {

    if (tipo === "Crítica")
      return "#f44336";

    if (tipo === "Alta")
      return "#ff9800";

    if (tipo === "Media")
      return "#ffc107";

    return "#4caf50";

  };

  const datosEstados = [

  {
    nombre: "Activos",
    valor:
      clientes.filter(
        c => c.estado === "Activo"
      ).length
  },

  {
    nombre: "Caídos",
    valor:
      clientes.filter(
        c => c.estado !== "Activo"
      ).length
  }

];

const colores = [
  "#22c55e",
  "#ef4444"
];


const datosAlertas = [

  {
    tipo: "Alertas",
    cantidad: alertas.length
  },

  {
    tipo: "Monitoreos",
    cantidad: monitoreo.length
  }

];

const clientesOnline =
  clientes.filter(
    c => c.estado === "Activo"
  ).length;

const clientesOffline =
  clientes.filter(
    c => c.estado !== "Activo"
  ).length;


const porcentajeOnline =
  clientes.length > 0
    ? (
        clientesOnline /
        clientes.length * 100
      ).toFixed(0)
    : 0;


  return (

  <div style={{
    background:
  modoOscuro
    ? "#0f172a"
    : "#f4f6f9",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial"
  }}>

    <h1 style={{
      color:
  modoOscuro
    ? "white"
    : "#1e293b"
    }}>
      ConectaRural Enlaces
    </h1>

    <p style={{
      color: "#64748b"
    }}>
      Sistema administrativo de monitoreo de enlaces
    </p>

    <button

  onClick={() =>
    setModoOscuro(!modoOscuro)
  }

  style={{

    marginTop: "20px",

    padding: "10px 20px",

    border: "none",

    borderRadius: "10px",

    cursor: "pointer",

    background:
      modoOscuro
        ? "#e2e8f0"
        : "#1e293b",

    color:
      modoOscuro
        ? "black"
        : "white"

  }}
>

  {modoOscuro
    ? "☀️ Modo Claro"
    : "🌙 Modo Oscuro"}

</button>


  

    <h2>Panel Administrativo</h2>


    {/* =============================== */}
    {/* PANEL GENERAL RED */}
    {/* =============================== */}

    <div style={{

      background:
        modoOscuro
          ? "#1e293b"
          : "white",

      color:
        modoOscuro
          ? "white"
          : "black",

      padding: "25px",

      borderRadius: "15px",

      marginTop: "30px",

      boxShadow:
        "0 2px 10px rgba(0,0,0,0.2)"

    }}>

      <h2>
        🌐 Estado General de la Red
      </h2>

      <div style={{
        display: "flex",
        gap: "40px",
        marginTop: "20px",
        flexWrap: "wrap"
      }}>

        <div>

          <h3>
            🟢 Online
          </h3>

          <h1>
            {clientesOnline}
          </h1>

        </div>


        <div>

          <h3>
            🔴 Offline
          </h3>

          <h1>
            {clientesOffline}
          </h1>

        </div>


        <div>

          <h3>
            📊 Disponibilidad
          </h3>

          <h1>
            {porcentajeOnline}%
          </h1>

        </div>

      </div>

    </div>


    {/* ================================= */}
    {/* TARJETAS */}
    {/* ================================= */}

    <div style={{
      display: "flex",
      gap: "20px",
      marginTop: "30px",
      flexWrap: "wrap"
    }}>

      <div style={{
        background: "#2563eb",
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        width: "250px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}>

        <h2>Clientes</h2>

        <h1>
          {clientes.length}
        </h1>

      </div>


      <div style={{
        background: "#f59e0b",
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        width: "250px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}>

        <h2>Monitoreos</h2>

        <h1>
          {monitoreo.length}
        </h1>

      </div>


      <div style={{
        background: "#ef4444",
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        width: "250px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}>

        <h2>Alertas</h2>

        <h1>
          {alertas.length}
        </h1>

      </div>

    </div>


    {/* ================================= */}
    {/* CLIENTES */}
    {/* ================================= */}

    <div style={{
  display: "flex",
  gap: "30px",
  marginTop: "40px",
  flexWrap: "wrap"
}}>

  {/* ========================= */}
  {/* PIE CHART */}
  {/* ========================= */}

  <div style={{
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    width: "450px"
  }}>

    <h2>Estado de Clientes</h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <PieChart>

        <Pie
          data={datosEstados}
          dataKey="valor"
          nameKey="nombre"
          outerRadius={100}
          label
        >

          {datosEstados.map(
            (entry, index) => (

              <Cell
                key={index}
                fill={colores[index]}
              />

            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

  </div>


  {/* ========================= */}
  {/* BAR CHART */}
  {/* ========================= */}

  <div style={{
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    width: "500px"
  }}>

    <h2>Alertas y Monitoreo</h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <BarChart
        data={datosAlertas}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="tipo" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="cantidad"
          fill="#3b82f6"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

    <div style={{
      background: "white",
      marginTop: "40px",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>

      <h2>Clientes Registrados</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >

        <thead>

          <tr style={{
            background: "#e2e8f0"
          }}>

            <th style={{
              padding: "12px"
            }}>
              Nombre
            </th>

            <th>IP</th>

            <th>Ubicación</th>

            <th>Estado</th>

          </tr>

        </thead>


        <tbody>

          {clientes.map((cliente) => (

            <tr key={cliente._id}>

              <td style={{
                padding: "12px"
              }}>
                {cliente.nombre}
              </td>

              <td>{cliente.ip}</td>

              <td>{cliente.ubicacion}</td>

              <td>

                <span style={{
                  background:

                    cliente.estado === "Activo"
                        ? "#22c55e"

                    : cliente.estado === "Inestable"
                        ? "#f59e0b"

                    : cliente.estado === "Mantenimiento"
                        ? "#3b82f6"

                    : "#ef4444"
                }}>

                  {
                    cliente.estado === "Activo"
                        ? "🟢 Online"

                    : cliente.estado === "Inestable"
                        ? "🟠 Inestable"

                    : cliente.estado === "Mantenimiento"
                        ? "🔵 Mantenimiento"

                    : "🔴 Caído"
                    }

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>


    {/* ================================= */}
    {/* MONITOREO */}
    {/* ================================= */}

    <div style={{
      background: "white",
      marginTop: "40px",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>

      <h2>Monitoreo de Enlaces</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >

        <thead>

          <tr style={{
            background: "#e2e8f0"
          }}>

            <th>Cliente</th>
            <th>Latencia</th>
            <th>Consumo</th>
            <th>Estado</th>
            <th>Observación</th>

          </tr>

        </thead>


        <tbody>

          {monitoreo.map((item) => (

            <tr key={item._id}>

              <td>{item.cliente}</td>

              <td>{item.latencia}</td>

              <td>{item.consumo_red}</td>

              <td>

                <span style={{

                  background:
                    item.estado_enlace === "Activo"
                      ? "#22c55e"
                      : item.estado_enlace ===
                        "Inestable"
                      ? "#f59e0b"
                      : "#ef4444",

                  color: "white",

                  padding: "5px 10px",

                  borderRadius: "8px"

                }}>

                  {item.estado_enlace}

                </span>

              </td>

              <td>{item.observacion}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>


    {/* ================================= */}
    {/* ALERTAS */}
    {/* ================================= */}

    <div style={{
      marginTop: "40px"
    }}>

      <h2>Alertas del Sistema</h2>

      {alertas.map((alerta) => (

        <div
          key={alerta._id}

          style={{

            background:
              colorAlerta(alerta.tipo_alerta),

            color: "white",

            padding: "20px",

            borderRadius: "12px",

            marginTop: "15px",

            boxShadow:
              "0 2px 8px rgba(0,0,0,0.2)"

          }}
        >

          <h3>
            {alerta.tipo_alerta}
          </h3>

          <p>
            {alerta.mensaje}
          </p>

          <small>
            Cliente:
            {" "}
            {alerta.cliente}
          </small>

        </div>

      ))}

    </div>

  </div>

);

}

export default Dashboard;