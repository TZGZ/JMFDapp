import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JuegoMesaForense() {
  const preguntas = [
    {
      pregunta: "¿Qué es la evidencia digital?",
      opciones: [
        "Información almacenada o transmitida en formato digital",
        "Un documento impreso",
        "Un dispositivo sin información",
        "Una memoria RAM dañada"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Cuál es el objetivo principal de la informática forense?",
      opciones: [
        "Diseñar videojuegos",
        "Recuperar y analizar evidencia digital",
        "Instalar sistemas operativos",
        "Crear redes sociales"
      ],
      correcta: 1
    },
    {
      pregunta: "¿Qué dispositivo puede contener evidencia digital?",
      opciones: [
        "USB",
        "Disco duro",
        "Teléfono móvil",
        "Todos los anteriores"
      ],
      correcta: 3
    },
    {
      pregunta: "¿Qué significa preservar la evidencia digital?",
      opciones: [
        "Modificar los archivos",
        "Eliminar datos innecesarios",
        "Mantener la integridad de la información",
        "Compartir la evidencia"
      ],
      correcta: 2
    },
    {
      pregunta: "¿Qué herramienta ayuda a recuperar archivos eliminados?",
      opciones: [
        "Antivirus",
        "Software forense",
        "Procesador de texto",
        "Editor de imágenes"
      ],
      correcta: 1
    },
    {
      pregunta: "¿Qué tipo de ataque puede dejar evidencia digital?",
      opciones: [
        "Phishing",
        "Malware",
        "Ransomware",
        "Todos los anteriores"
      ],
      correcta: 3
    },
    {
      pregunta: "¿Qué es la cadena de custodia?",
      opciones: [
        "Proceso para proteger y registrar la evidencia",
        "Un tipo de cable de red",
        "Un programa de antivirus",
        "Una contraseña segura"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué especialista analiza la evidencia digital?",
      opciones: [
        "Diseñador gráfico",
        "Ingeniero civil",
        "Perito forense digital",
        "Administrador de ventas"
      ],
      correcta: 2
    },
    {
      pregunta: "¿Qué significa malware?",
      opciones: [
        "Programa malicioso",
        "Archivo multimedia",
        "Sistema operativo",
        "Conexión segura"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Cuál es una función del análisis forense digital?",
      opciones: [
        "Detectar y analizar incidentes",
        "Editar fotografías",
        "Aumentar la velocidad del internet",
        "Diseñar páginas web"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué es un hash en informática forense?",
      opciones: [
        "Un código para verificar integridad",
        "Un videojuego",
        "Una memoria USB",
        "Una red social"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué acción NO debe hacerse con evidencia digital?",
      opciones: [
        "Alterarla",
        "Documentarla",
        "Analizarla",
        "Respaldarla"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué sistema operativo es común en análisis forense?",
      opciones: [
        "Kali Linux",
        "Paint",
        "Excel",
        "Photoshop"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué es phishing?",
      opciones: [
        "Intento de robo de información mediante engaños",
        "Una base de datos",
        "Un lenguaje de programación",
        "Una impresora"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué puede analizarse en un correo electrónico forense?",
      opciones: [
        "Encabezados y origen",
        "Solo el color del texto",
        "El tamaño del monitor",
        "La batería del equipo"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué tipo de evidencia puede encontrarse en redes sociales?",
      opciones: [
        "Mensajes y publicaciones",
        "Solo imágenes",
        "Archivos físicos",
        "Ninguna"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué significa ransomware?",
      opciones: [
        "Software que secuestra información",
        "Programa de edición",
        "Controlador de impresora",
        "Aplicación musical"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Cuál es la finalidad de documentar evidencia?",
      opciones: [
        "Mantener registro detallado del proceso",
        "Hacer más lenta la investigación",
        "Eliminar información",
        "Reducir almacenamiento"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué componente almacena información permanentemente?",
      opciones: [
        "Disco duro",
        "Memoria caché",
        "Procesador",
        "Tarjeta gráfica"
      ],
      correcta: 0
    },
    {
      pregunta: "¿Qué evidencia puede existir en un navegador web?",
      opciones: [
        "Historial y cookies",
        "Solo fotografías",
        "Tamaño del gabinete",
        "Voltaje eléctrico"
      ],
      correcta: 0
    }
  ];

  const [jugador, setJugador] = React.useState(1);
  const [posiciones, setPosiciones] = React.useState([0, 0]);
  const [dado, setDado] = React.useState<number | null>(null);
  const [preguntaActual, setPreguntaActual] = React.useState<any>(null);
  const [mensaje, setMensaje] = React.useState("");
  const [ganador, setGanador] = React.useState<string | null>(null);
  const [preguntasUsadas, setPreguntasUsadas] = React.useState<number[]>([]);

  const totalCasillas = 20;

  const lanzarDado = () => {
    if (preguntaActual || ganador) return;

    const numero = Math.floor(Math.random() * 6) + 1;
    setDado(numero);

    const nuevasPosiciones = [...posiciones];
    nuevasPosiciones[jugador - 1] += numero;

    if (nuevasPosiciones[jugador - 1] >= totalCasillas - 1) {
      nuevasPosiciones[jugador - 1] = totalCasillas - 1;
      setPosiciones(nuevasPosiciones);
      setGanador(`Jugador ${jugador}`);
      return;
    }

    setPosiciones(nuevasPosiciones);

    let preguntasDisponibles = preguntas.filter(
      (_, index) => !preguntasUsadas.includes(index)
    );

    if (preguntasDisponibles.length === 0) {
      setPreguntasUsadas([]);
      preguntasDisponibles = preguntas;
    }

    const indiceOriginal = preguntas.findIndex(
      (p) => p === preguntasDisponibles[Math.floor(Math.random() * preguntasDisponibles.length)]
    );

    setPreguntasUsadas([...preguntasUsadas, indiceOriginal]);
    setPreguntaActual(preguntas[indiceOriginal]);
  };

  const responder = (indice: number) => {
    if (indice === preguntaActual.correcta) {
      setMensaje(`✅ Correcto. El Jugador ${jugador} mantiene su avance.`);
    } else {
      const nuevasPosiciones = [...posiciones];
      nuevasPosiciones[jugador - 1] = Math.max(0, nuevasPosiciones[jugador - 1] - 1);
      setPosiciones(nuevasPosiciones);
      setMensaje(`❌ Incorrecto. El Jugador ${jugador} retrocede una casilla.`);
    }

    setPreguntaActual(null);
    setJugador(jugador === 1 ? 2 : 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 flex flex-col items-center overflow-hidden relative">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold mb-4 text-center text-white drop-shadow-lg"
      >
        Juego de Mesa - Evidencia Forense Digital
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-8 text-xl text-center max-w-3xl text-slate-200"
      >
        Responde preguntas sobre informática forense y evidencia digital para avanzar en el tablero.
        El primer jugador en llegar a la meta gana.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-5 gap-5 mb-12 bg-white/5 p-6 rounded-[2rem] backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {Array.from({ length: totalCasillas }).map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08, y: -5 }}
            className={`w-24 h-24 rounded-[1.5rem] shadow-2xl border-2 flex flex-col items-center justify-center relative font-extrabold text-xl transition-all duration-500 ${
              posiciones[0] === index || posiciones[1] === index
                ? "bg-gradient-to-br from-cyan-500 to-blue-700 border-cyan-300 text-white scale-110"
                : "bg-white/90 border-slate-300 text-slate-800"
            }`}
          >
            <span className="absolute top-2 left-3 text-xs opacity-70">
              {index}
            </span>

            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-lg font-black">
              {index === totalCasillas - 1 ? "🏆" : "🎯"}
            </div>

            {posiciones[0] === index && (
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute -bottom-2 -left-2 text-3xl drop-shadow-2xl"
              >
                🔵
              </motion.div>
            )}

            {posiciones[1] === index && (
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute -bottom-2 -right-2 text-3xl drop-shadow-2xl"
              >
                🔴
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl w-full max-w-2xl text-white"
      >
        {ganador ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🏆 {ganador} ha ganado</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800 text-white px-6 py-3 rounded-2xl hover:scale-105 transition"
              onClick={() => {
                setJugador(1);
                setPosiciones([0, 0]);
                setGanador(null);
                setMensaje("");
                setDado(null);
                setPreguntasUsadas([]);
              }}
            >
              Reiniciar Juego
            </motion.button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 bg-black/20 rounded-3xl px-6 py-4 border border-white/10">
              <h2 className="text-3xl font-black text-cyan-300">Turno del Jugador {jugador}</h2>
              {dado !== null && <p className="text-xl font-bold text-white bg-cyan-500/20 px-4 py-2 rounded-2xl border border-cyan-400/20">🎲 Dado: {dado}</p>}
            </div>

            {!preguntaActual ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={lanzarDado}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-500 text-white py-5 rounded-[1.5rem] text-2xl font-black transition shadow-[0_0_30px_rgba(34,211,238,0.4)] tracking-wide"
              >
                Lanzar Dado
              </motion.button>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={preguntaActual.pregunta}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-cyan-300">
                    {preguntaActual.pregunta}
                  </h3>

                  <div className="grid gap-3">
                    {preguntaActual.opciones.map((opcion: string, index: number) => (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={index}
                        onClick={() => responder(index)}
                        className="bg-slate-900/40 border border-cyan-400/20 hover:bg-cyan-500 hover:text-white p-5 rounded-[1.5rem] text-left transition-all duration-300 shadow-xl hover:shadow-cyan-500/20 text-lg font-semibold"
                      >
                        {opcion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {mensaje && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 text-center text-xl font-bold text-cyan-300"
              >
                {mensaje}
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl p-8 max-w-4xl text-white"
      >
        <h2 className="text-3xl font-black mb-6 text-cyan-300">Características del Proyecto</h2>

        <ul className="list-disc ml-6 space-y-2 text-lg">
          <li>Juego de mesa interactivo basado en evidencia forense digital.</li>
          <li>Preguntas tipo trivia similares a Kahoot.</li>
          <li>Sistema de turnos para 2 jugadores.</li>
          <li>Movimiento mediante lanzamiento de dado.</li>
          <li>Retroceso por respuestas incorrectas.</li>
          <li>Diseño visual moderno y responsivo.</li>
          <li>Ideal para presentar como proyecto académico.</li>
        </ul>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute top-10 right-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"
      />
    </div>
  );
}
