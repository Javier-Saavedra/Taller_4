document.addEventListener("DOMContentLoaded", function () {
  const sudokuBoard = document.getElementById("tabla-sudoku");
  const medidaCuadricula = 9;

  generarTableroSudoku();

  document.getElementById("btnresolver").addEventListener("click", resolverSudoku);
  document.getElementById("btnreiniciar").addEventListener("click", reiniciarJuego);

  // Función para generar un tablero de Sudoku válido
  function generarTableroSudoku() {
      sudokuBoard.innerHTML = ""; // Limpiar el tablero antes de generar uno nuevo
      const tablero = generarPuzzleSudoku();
      for (let fila = 0; fila < medidaCuadricula; fila++) {
          const nuevaFila = document.createElement("tr");
          for (let col = 0; col < medidaCuadricula; col++) {
              const celda = document.createElement("td");
              const input = document.createElement("input");
              input.type = "text";
              input.className = "celda";
              input.id = `celda-${fila}-${col}`;
              input.maxLength = 1;
              input.addEventListener("input", function (event) {
                  // Solo permitir números del 1 al 9 
                  const valor = event.target.value;
                  if (!/^[1-9]?$/.test(valor)) {
                      event.target.value = "";
                  }
              });

              input.value = tablero[fila][col] === 0 ? "" : tablero[fila][col]; // Asignar valores iniciales al tablero
              if (tablero[fila][col] !== 0) {
                  input.readOnly = true; // Hacer que las celdas iniciales sean de solo lectura
              }
              celda.appendChild(input);
              nuevaFila.appendChild(celda);
          }
          sudokuBoard.appendChild(nuevaFila);
      }
  }

  // Función para validar si el tablero cumple con las reglas del Sudoku

  // Función para generar un puzzle de Sudoku
  function generarPuzzleSudoku() {
    const tablero = [];
    for (let fila = 0; fila < medidaCuadricula; fila++) {
      tablero[fila] = [];
      for (let col = 0; col < medidaCuadricula; col++) {
        tablero[fila][col] = 0;
      }
    }
    resolverSudokuAlgoritmo(tablero); // Resolver el sudoku para obtener un tablero completo
    eliminarCeldas(tablero, 40); // Eliminar algunas celdas para crear un puzzle
    return tablero;
  }

  // Función para eliminar celdas del tablero para crear un puzzle
  function eliminarCeldas(tablero, cantidad) {
    let celdasEliminadas = 0;
    while (celdasEliminadas < cantidad) {
      const fila = Math.floor(Math.random() * medidaCuadricula);
      const col = Math.floor(Math.random() * medidaCuadricula);
      if (tablero[fila][col] !== 0) {
        tablero[fila][col] = 0;
        celdasEliminadas++;
      }
    }
  }

  // Función para generar un tablero inicial de Sudoku vacío

  // Función para resolver el Sudoku con un algoritmo
  function resolverSudokuAlgoritmo(tablero) {
    const vacio = buscarCeldaVacia(tablero);

    if (!vacio) {
      // Si no hay celdas vacías, el Sudoku está resuelto
      return true;
    }

    const fila = vacio[0];
    const col = vacio[1];

    // Crear un array con números aleatorios del 1 al 9
    const numerosAleatorios = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(numerosAleatorios); // Mezclar los números aleatoriamente

    // Probar números aleatorios en la celda vacía
    for (const num of numerosAleatorios) {
      // Verificar si el número es válido en esta posición
      if (verificarConflictos(tablero, fila, col, num)) {
        // Si es válido, asignarlo y resolver el Sudoku recursivamente
        tablero[fila][col] = num;

        if (resolverSudokuAlgoritmo(tablero)) {
          return true; // Sudoku resuelto
        }

        // Si no se puede resolver con este número, retroceder
        tablero[fila][col] = 0;
      }
    }

    // No se encontró ningún número válido para esta celda
    return false;
  }

  // Función para mezclar un array aleatoriamente (algoritmo de Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Función para resolver el Sudoku
  function resolverSudoku() {
    const tablero = obtenerTablero();

    if (resolverSudokuAlgoritmo(tablero)) {
      actualizarTablero(tablero);
    } else {
      alert("No se pudo resolver el Sudoku. Verifique la entrada.");
    }
  }

  // Función para obtener el tablero actual desde la interfaz de usuario
  function obtenerTablero() {
    const tablero = [];
    for (let fila = 0; fila < medidaCuadricula; fila++) {
      tablero[fila] = [];
      for (let col = 0; col < medidaCuadricula; col++) {
        const celdaId = `celda-${fila}-${col}`;
        const celdaValor = document.getElementById(celdaId).value;
        tablero[fila][col] = celdaValor !== "" ? parseInt(celdaValor) : 0;
      }
    }
    return tablero;
  }

  // Función para reiniciar el juego
  function reiniciarJuego() {
    generarTableroSudoku();
  }

  // Función para actualizar el tablero con los valores resueltos
  function actualizarTablero(tablero) {
    for (let fila = 0; fila < medidaCuadricula; fila++) {
      for (let col = 0; col < medidaCuadricula; col++) {
        const celdaId = `celda-${fila}-${col}`;
        const celda = document.getElementById(celdaId);
        celda.value = tablero[fila][col];
      }
    }
  }

  // Función para buscar una celda vacía en el tablero
  function buscarCeldaVacia(tablero) {
    for (let fila = 0; fila < medidaCuadricula; fila++) {
      for (let col = 0; col < medidaCuadricula; col++) {
        if (tablero[fila][col] === 0) {
          return [fila, col]; // Devolver la posición de la celda vacía
        }
      }
    }
    return null; // Si no se encuentran celdas vacías, devolver null
  }

  // Función para verificar si un número es válido en una posición específica del tablero
  function verificarConflictos(tablero, fila, col, num) {
    // Verificar fila
    for (let i = 0; i < medidaCuadricula; i++) {
      if (tablero[fila][i] === num && i !== col) {
        return false; // Hay conflicto en la fila
      }
    }

    // Verificar columna
    for (let i = 0; i < medidaCuadricula; i++) {
      if (tablero[i][col] === num && i !== fila) {
        return false; // Hay conflicto en la columna
      }
    }

    // Verificar subcuadrícula 3x3
    const subCuadriculaFilaInicio = Math.floor(fila / 3) * 3;
    const subCuadriculaColInicio = Math.floor(col / 3) * 3;
    for (
      let i = subCuadriculaFilaInicio;
      i < subCuadriculaFilaInicio + 3;
      i++
    ) {
      for (
        let j = subCuadriculaColInicio;
        j < subCuadriculaColInicio + 3;
        j++
      ) {
        if (tablero[i][j] === num && i !== fila && j !== col) {
          return false; // Hay conflicto en la subcuadrícula 3x3
        }
      }
    }

    return true; // No hay conflictos
  }
});
