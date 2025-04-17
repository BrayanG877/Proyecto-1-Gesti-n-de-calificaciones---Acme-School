let usuarios = [
    { id: "12345", nombre: "Admin", rol: "Administrativo", email: "admin@acme.com", contraseña: "1234" }
];
let estudiantes = [];
let cursos = [];
let usuarioActual = null;
let cursoSeleccionado = null;

// Función para iniciar sesión
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

// Función para cerrar sesión
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

// Mostrar funciones según el rol del usuario
function mostrarPanel() {
    if (!usuarioActual) return;
    document.getElementById("menu").style.display = "none";

    if (usuarioActual.rol === "Administrativo") {
        document.getElementById("adminPanel").style.display = "block";
    } else if (usuarioActual.rol === "Profesor") {
        document.getElementById("profesorPanel").style.display = "block";
    }
}

// Volver al menú principal
function volverMenu() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "none";
}

// Función para registrar usuarios (solo administrativos)
function mostrarRegistroUsuarios() {
    const id = prompt("Número de Identificación:");
    const nombre = prompt("Nombre completo:");
    const rol = prompt("Cargo (Administrativo o Profesor):");
    const email = prompt("Correo corporativo:");
    const password = prompt("Contraseña:");

    if (!id || !nombre || !rol || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    usuarios.push({ id, nombre, rol, email, contraseña: password });
    alert(`Usuario ${nombre} registrado correctamente como ${rol}`);
}

// Función para registrar estudiantes
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

// Función para crear cursos
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

// Función para asignar estudiantes a cursos
function mostrarAsignarEstudiantes() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("asignarEstudiantes").style.display = "block";

    let listaEstudiantesHTML = "";
    estudiantes.forEach(estudiante => {
        listaEstudiantesHTML += `<p>${estudiante.nombre} 
            <button onclick="seleccionarEstudiante('${estudiante.id}')">Agregar al curso</button>
        </p>`;
    });

    document.getElementById("listaEstudiantes").innerHTML = listaEstudiantesHTML;

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
            estudianteSeleccionado = null; // Reiniciar selección
        } else {
            alert("Selecciona un estudiante primero.");
        }
    }
}

function volverAdminPanel() {
    document.getElementById("asignarEstudiantes").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
}

// Mostrar los cursos que el profesor gestiona
function mostrarGestionCursos() {
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "block";

    let listaCursosHTML = "";
    cursos.forEach(curso => {
        listaCursosHTML += `<p>${curso.nombre} 
            <button onclick="gestionarCurso('${curso.nombre}')">Gestionar este curso</button>
        </p>`;
    });

    document.getElementById("listaCursos").innerHTML = listaCursosHTML;
}

// Mostrar estudiantes dentro de un curso y permitir calificación
function gestionarCurso(nombreCurso) {
    cursoSeleccionado = cursos.find(c => c.nombre === nombreCurso);

    if (!cursoSeleccionado) {
        alert("Curso no encontrado.");
        return;
    }

    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "block";
    document.getElementById("cursoActual").textContent = cursoSeleccionado.nombre;

    let listaEstudiantesHTML = "";
    cursoSeleccionado.estudiantes.forEach(estudiante => {
        listaEstudiantesHTML += `<p>${estudiante.nombre}  
            <input type="number" id="nota1-${estudiante.id}" min="0" max="100" placeholder="Nota 1 (30%)">
            <input type="number" id="nota2-${estudiante.id}" min="0" max="100" placeholder="Nota 2 (30%)">
            <input type="number" id="nota3-${estudiante.id}" min="0" max="100" placeholder="Nota 3 (40%)">
        </p>`;
    });

    document.getElementById("listaEstudiantes").innerHTML = listaEstudiantesHTML;
}

// Guardar notas y calcular la nota final
function guardarNotas() {
    cursoSeleccionado.estudiantes.forEach(estudiante => {
        const nota1 = parseFloat(document.getElementById(`nota1-${estudiante.id}`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`nota2-${estudiante.id}`).value) || 0;
        const nota3 = parseFloat(document.getElementById(`nota3-${estudiante.id}`).value) || 0;

        estudiante.notaFinal = (nota1 * 0.3) + (nota2 * 0.3) + (nota3 * 0.4);
    });

    alert("Notas guardadas correctamente.");
}