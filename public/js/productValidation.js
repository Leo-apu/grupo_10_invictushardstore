let productForm = document.querySelector('form');

productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let errors = [];

    
    let productName = document.getElementById('name').value;
    if (!validator.isLength(productName, { min: 5 })) {
        errors.push('El nombre del producto debe tener al menos 5 caracteres.');
    }

    
    let productDescription = document.getElementById('description').value;
    if (!validator.isLength(productDescription, { min: 20 })) {
        errors.push('La descripción del producto debe tener al menos 20 caracteres.');
    }

    
    let productImage = document.getElementById('img').files[0];
    if (!productImage || !isValidExtension(productImage.name)) {
        errors.push('Seleccione un archivo de imagen válido (jpg, jpeg, png, gif)');
    }

    if (errors.length > 0) {
        
        limpiarErrores();
        errors.forEach(error => {
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
    errorContainer.style.paddingLeft = '20px';
    errorContainer.style.marginTop = '15px';
    errorMessage.style.color = 'crimson';
    errorMessage.style.paddingBottom = '5px';
    errorMessage.style.textAlign = 'left';
    errorMessage.style.marginLeft = '25px';
    errorMessage.style.fontSize = '17px';
    errorContainer.appendChild(errorMessage);
}

function limpiarErrores() {
    let errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
}
