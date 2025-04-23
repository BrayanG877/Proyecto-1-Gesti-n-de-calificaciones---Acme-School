// Datos iniciales con un usuario de prueba para Profesor
let usuarios = [
    { id: "12345", nombre: "Admin", rol: "administrativo", email: "admin@acme.com", contraseña: "1234" },
    { id: "67890", nombre: "Profesor Juan", rol: "profesor", email: "profesor@acme.com", contraseña: "5678" }
];

let estudiantes = [];
let cursos = [];
let usuarioActual = null;
let cursoSeleccionado = null;

// Iniciar sesión
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const usuario = usuarios.find(u => u.email === email && u.contraseña === password);

    if (usuario) {
        usuarioActual = usuario;
        alert("Bienvenido " + usuario.nombre);
        document.getElementById("login").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("userName").textContent = usuario.nombre;
    } else {
        alert("Datos incorrectos!!");
    }
}

// Cerrar sesión y retornar al login
function logout() {
    usuarioActual = null;
    document.getElementById("login").style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "none";
    document.getElementById("asignarEstudiantes").style.display = "none";
}

// Mostrar funciones según el rol
function mostrarPanel() {
    if (!usuarioActual) return;
    document.getElementById("menu").style.display = "none";
    if (usuarioActual.rol.toLowerCase() === "administrativo") {
        document.getElementById("adminPanel").style.display = "block";
    } else if (usuarioActual.rol.toLowerCase() === "profesor") {
        document.getElementById("profesorPanel").style.display = "block";
    }
}

// Volver al login ("Iniciar sesión")
function volverMenu() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "none";
    document.getElementById("asignarEstudiantes").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("login").style.display = "block";
}

// Registrar usuarios (solo para ejemplificar, generalmente se gestionan de otra forma)
function mostrarRegistroUsuarios() {
    const id = prompt("Número de Identificación:");
    const nombre = prompt("Nombre completo:");
    const rol = prompt("Cargo (Administrativo o Profesor):").toLowerCase();
    const email = prompt("Correo corporativo:");
    const password = prompt("Contraseña:");
    if (!id || !nombre || !rol || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    if (rol !== "administrativo" && rol !== "profesor") {
        alert("El cargo debe ser 'Administrativo' o 'Profesor'.");
        return;
    }
    usuarios.push({ id, nombre, rol, email, contraseña: password });
    alert(`Usuario ${nombre} registrado correctamente como ${rol.charAt(0).toUpperCase() + rol.slice(1)}.`);
}

// Registrar estudiantes
function mostrarRegistroEstudiantes() {
    const id = prompt("Número de Identificación:");
    const nombre = prompt("Nombre completo:");
    const email = prompt("Correo electrónico:");
    const fechaNacimiento = prompt("Fecha de nacimiento:");
    if (!id || !nombre || !email || !fechaNacimiento) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    estudiantes.push({ id, nombre, email, fechaNacimiento });
    alert(`Estudiante ${nombre} registrado correctamente.`);
}

// Crear cursos
function mostrarCreacionCursos() {
    const nombre = prompt("Nombre del curso:");
    const descripcion = prompt("Descripción del curso:");
    if (!nombre || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    cursos.push({ nombre, descripcion, estudiantes: [] });
    alert(`Curso ${nombre} creado correctamente.`);
}

// Asignar estudiantes a cursos: se muestra la lista de estudiantes y cursos en secciones separadas
function mostrarAsignarEstudiantes() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("asignarEstudiantes").style.display = "block";

    let listaEstudiantesHTML = "";
    estudiantes.forEach(estudiante => {
        listaEstudiantesHTML += `<p>${estudiante.nombre} 
            <button onclick="seleccionarEstudiante('${estudiante.id}')">Agregar al curso</button>
        </p>`;
    });
    // Actualizar el contenedor de estudiantes para asignación
    document.getElementById("listaEstudiantesAsignacion").innerHTML = listaEstudiantesHTML;

    let listaCursosHTML = "";
    cursos.forEach(curso => {
        listaCursosHTML += `<p>${curso.nombre} 
            <button onclick="seleccionarCurso('${curso.nombre}')">Seleccionar curso</button>
        </p>`;
    });
    document.getElementById("listaCursosAdmin").innerHTML = listaCursosHTML;
}

let estudianteSeleccionado = null;
let cursoSeleccionadoAdmin = null;
function seleccionarEstudiante(idEstudiante) {
    estudianteSeleccionado = estudiantes.find(s => s.id === idEstudiante);
    if (estudianteSeleccionado) {
        alert(`Estudiante ${estudianteSeleccionado.nombre} seleccionado.`);
    }
}
function seleccionarCurso(nombreCurso) {
    cursoSeleccionadoAdmin = cursos.find(c => c.nombre === nombreCurso);
    if (cursoSeleccionadoAdmin) {
        alert(`Curso ${cursoSeleccionadoAdmin.nombre} seleccionado.`);
        if (estudianteSeleccionado) {
            cursoSeleccionadoAdmin.estudiantes.push(estudianteSeleccionado);
            alert(`Estudiante ${estudianteSeleccionado.nombre} agregado a ${cursoSeleccionadoAdmin.nombre}.`);
            estudianteSeleccionado = null;
        } else {
            alert("Selecciona un estudiante primero.");
        }
    }
}
function volverAdminPanel() {
    document.getElementById("asignarEstudiantes").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
}

// Vista para el profesor: mostrar cursos en forma de tabla
function mostrarGestionCursos() {
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "block";

    let listaCursosHTML = "<table border='1'><tr><th>Curso</th><th>Opciones</th></tr>";
    cursos.forEach(curso => {
        listaCursosHTML += `<tr>
            <td>${curso.nombre}</td>
            <td><button onclick="calificarCurso('${curso.nombre}')">Calificar</button></td>
        </tr>`;
    });
    listaCursosHTML += "</table>";
    document.getElementById("listaCursos").innerHTML = listaCursosHTML;
}

// Vista para calificar: mostrar tabla con estudiantes y campos para notas
function calificarCurso(nombreCurso) {
    cursoSeleccionado = cursos.find(curso => curso.nombre === nombreCurso);
    if (!cursoSeleccionado) {
        alert("Curso no encontrado.");
        return;
    }
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "block";
    document.getElementById("cursoActual").textContent = `Calificando: ${cursoSeleccionado.nombre}`;

    let tablaHTML = `<table border='1'>
        <tr>
            <th>Estudiante</th>
            <th>Nota 1 (30%)</th>
            <th>Nota 2 (30%)</th>
            <th>Nota 3 (40%)</th>
            <th>Nota Final</th>
        </tr>`;
    cursoSeleccionado.estudiantes.forEach(estudiante => {
        tablaHTML += `<tr>
            <td>${estudiante.nombre}</td>
            <td><input type="number" id="nota1-${estudiante.id}" min="0" max="100" placeholder="0-100"></td>
            <td><input type="number" id="nota2-${estudiante.id}" min="0" max="100" placeholder="0-100"></td>
            <td><input type="number" id="nota3-${estudiante.id}" min="0" max="100" placeholder="0-100"></td>
            <td id="notaFinal-${estudiante.id}">Pendiente</td>
        </tr>`;
    });
    tablaHTML += `</table>
        <button onclick="guardarCalificaciones()">Guardar Calificaciones</button>
        <button onclick="volverGestionCursos()">Volver</button>`;
    document.getElementById("listaEstudiantesCalificaciones").innerHTML = tablaHTML;
}

// Guardar calificaciones y calcular la nota final con validaciones
function guardarCalificaciones() {
    cursoSeleccionado.estudiantes.forEach(estudiante => {
        const nota1 = parseFloat(document.getElementById(`nota1-${estudiante.id}`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`nota2-${estudiante.id}`).value) || 0;
        const nota3 = parseFloat(document.getElementById(`nota3-${estudiante.id}`).value) || 0;
        if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100) {
            alert(`Las notas deben estar entre 0 y 100. Verifica las notas de ${estudiante.nombre}.`);
            return;
        }
        estudiante.notaFinal = (nota1 * 0.3) + (nota2 * 0.3) + (nota3 * 0.4);
        document.getElementById(`notaFinal-${estudiante.id}`).textContent = estudiante.notaFinal.toFixed(2);
    });
    alert("Calificaciones guardadas correctamente.");
}

// Desde la vista de calificación, volver a la vista de gestión de cursos
function volverGestionCursos() {
    document.getElementById("gestionEstudiantes").style.display = "none";
    document.getElementById("gestionCursos").style.display = "block";
}
// Volver al panel de control del profesor desde la vista de "Mis Cursos"
function volverProfesorPanel() {
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("profesorPanel").style.display = "block";
}