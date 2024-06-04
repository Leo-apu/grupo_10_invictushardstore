let registroForm = document.querySelector('#registroForm');
registroForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.querySelector('#nombre').value;
    let apellido = document.querySelector('#apellido').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let imgInput = document.querySelector('#img');
    let img = imgInput.files[0]; // Obtener el primer archivo seleccionado

    let errores = []; // Lista para almacenar mensajes de error

    if (!validator.isLength(nombre, { min: 2 })) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!validator.isLength(apellido, { min: 2 })) {
        errores.push('El apellido debe tener al menos 2 caracteres');
    }

    if (!validator.isEmail(email)) {
        errores.push('El correo electrónico no es válido');
    }

    if (!validator.isLength(password, { min: 8 })) {
        errores.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (!img || !isValidExtension(img.name)) {
        errores.push('Seleccione un archivo de imagen válido (jpg, jpeg, png, gif)');
    }

    if (errores.length > 0) {
        // Si hay errores, mostrar todos los mensajes de error
        limpiarErrores();
        errores.forEach(error => {
            mostrarMensajeDeError(error);
        });
        return;
    }

    
    this.submit();
});

function isValidExtension(filename) {
    let validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    let extension = filename.split('.').pop().toLowerCase();
    return validExtensions.includes(extension);
}

function mostrarMensajeDeError(message) {
    let errorContainer = document.getElementById('errorContainer');
    let errorMessage = document.createElement('li');
    errorMessage.innerText = message;
    errorMessage.style.color = 'crimson';
    errorMessage.style.paddingBottom = '5px';
    errorMessage.style.textAlign = 'left';
    errorMessage.style.marginLeft = '25px';
    errorMessage.style.fontSize = '17px';
    errorContainer.appendChild(errorMessage);
}

function limpiarErrores() {
    let errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = ''; // Limpiar el contenido del contenedor de errores
}
