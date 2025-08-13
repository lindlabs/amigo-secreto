let amigos = [];

function validarNombre(nombre) {
    // Expresión regular que solo permite letras (incluyendo acentos) y espacios
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-mensaje');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    } else {
        alert(mensaje);
    }
}

function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (nombreAmigo === '') {
        mostrarError('Por favor ingresa un nombre');
        return;
    }
    
    // Validar que solo contenga letras y espacios
    if (!validarNombre(nombreAmigo)) {
        mostrarError('Por favor ingresa solo letras y espacios');
        return;
    }
    
    // Agregar el nombre a la lista
    amigos.push(nombreAmigo);
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
    
    // Enfocar el campo de entrada para facilitar la entrada de más nombres
    inputAmigo.focus();
}

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpiar la lista actual
    listaAmigos.innerHTML = '';
    
    // Agregar cada amigo a la lista
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.className = 'name-item';
        
        // Agregar botón para eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '×';
        botonEliminar.className = 'delete-button';
        botonEliminar.onclick = () => eliminarAmigo(index);
        
        li.appendChild(botonEliminar);
        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    // Eliminar el amigo del array
    amigos.splice(index, 1);
    
    // Actualizar la lista visual
    actualizarListaAmigos();
}

function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    
    // Validar que haya al menos un amigo en la lista
    if (amigos.length === 0) {
        resultado.innerHTML = '<li class="result-item">Por favor agrega al menos un amigo</li>';
        return;
    }
    
    // Seleccionar un amigo al azar
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSeleccionado = amigos[indiceAleatorio];
    
    // Mostrar el resultado con animación
    resultado.innerHTML = '';
    const resultadoItem = document.createElement('li');
    resultadoItem.className = 'result-item highlight';
    resultadoItem.textContent = `¡${amigoSeleccionado} es el amigo secreto!`;
    resultado.appendChild(resultadoItem);
    
    // Desplazarse al resultado
    resultado.scrollIntoView({ behavior: 'smooth' });
}

// Permitir agregar amigos presionando Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});
