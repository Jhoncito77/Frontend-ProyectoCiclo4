/**
 * capturar etiquetas para manipular datos 
 */
const errores = document.getElementsByClassName("err")
const id = document.getElementById("id")
const identification = document.getElementById("identification")
const nombre = document.getElementById("nombre")
const address = document.getElementById("address")
const cellPhone = document.getElementById("cellPhone")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("confirpassword")
const zone = document.getElementById("zone")
const type = document.getElementById("type")
const btn = document.getElementById("entrar")
const btn2 = document.getElementById("ver")

console.log(errores)
/**
 * ocultar los mensajes de alerta
 */

for (let i = 0; i < errores.length; i++) {
    errores[i].style.display = "none"
}

email.addEventListener("click", (e) => {
    e.preventDefault()
    errores[0].style.display = "none"
})

password.addEventListener("click", (e) => {
    e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
    errores[1].style.display = "none"
})

password2.addEventListener("click", (e) => {
    e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
    errores[2].style.display = "none"
})

password2.addEventListener("click", (e) => {
    e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
    errores[3].style.display = "none"
})

const validar = () => {
    let validaEmail = validarEmail(email.value) ? "none" : "block"
    let validaPassword = validarPassword(password.value) ? "none" : "block"
    let validaPassword2 = validarPassword(password2.value) ? "none" : "block"

    errores[0].style.display = validaEmail
    errores[1].style.display = validaPassword
    errores[2].style.display = validaPassword2

}



btn.addEventListener("click", (e) => {
    e.preventDefault()
    validar()
    if (password.value == password2.value) {
        if (validarEmail(email.value) && validarPassword(password.value)) {
            $.ajax({
                url: "http://144.22.244.240:8080/api/user/all",
                type: "GET",
                datatype: "JSON",
                success: function (usuarios) {
                    if (usuarios.length == 0) {
                        GuardarUsuario()
                        alert("Cuenta creada de forma correcta")
                        mostrarUsuarios()
                    } else {
                        let aux = true
                        for (i = 0; i < usuarios.length; i++) {
                            if (usuarios[i].email == email.value) {
                                alert("No fue posible crear la cuenta")
                                aux = false;
                            }
                        }
                        if (aux) {
                            GuardarUsuario()
                            alert("Cuenta creada de forma correcta")
                            mostrarUsuarios()
                        }

                    }

                }


            });
        }
    } else {
        errores[3].style.display = "block"
    }

})


/**
 * Funcion validar email
 * @param {*} email input de entrada email
 * @returns true or false
 */
const validarEmail = (email) => {
    /**
     * valida email
     */
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

/**
 * Funcion para validar password
 * @param {*} password input de entrada password
 * @returns true or false
 */
const validarPassword = (password) => {
    /**
     * valida El Password Mínimo ocho caracteres, al menos una letra mayúscula,
                  una letra minúscula, un número y un carácter especial:
     */

    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password) ? true : false;
}

function GuardarUsuario() {
    let datos = {
        id: id.value,
        identification: identification.value,
        name: nombre.value,
        address: address.value,
        cellPhone: cellPhone.value,
        email: email.value,
        password: password.value,
        zone: zone.value,
        type: type.value

    }
    let dataToSend = JSON.stringify(datos);
    $.ajax({
        url: "http://144.22.244.240:8080/api/user/new",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
        }
    })
}


function crearTabla(items) {
    let myTable = "<table class=' table table-hover table-dark '>";
    myTable += "<thead><th>ID</th><th>Documento</th><th>Nombre</th><th>Dirección</th><th>Telefono</th><th>Correo electronico</th><th>Zona</th><th>Cargo</th><th class='text-center' colspan='2'>Acciones</th></thead>"
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].identification + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].address + "</td>";
        myTable += "<td>" + items[i].cellPhone + "</td>";
        myTable += "<td>" + items[i].email + "</td>"
        myTable += "<td>" + items[i].zone + "</td>"
        myTable += "<td>" + items[i].type + "</td>"
        myTable += "<td> <button class='btn btn-warning'onclick='activarModal(" + items[i].id + ")'>Editar</button>";
        myTable += "<td> <button class='btn btn-danger'onclick='deleteUsuario(" + items[i].id + ")'>Eliminar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#mostrarUsuarios").append(myTable);
}
const usuariosAMostrar = document.getElementById("mostrarUsuarios")
usuariosAMostrar.style.display = "none"

function mostrarUsuarios() {

    $.ajax({
        url: "http://144.22.244.240:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#mostrarUsuarios").empty()
            console.log(respuesta)
            usuariosAMostrar.style.display = "block"
            crearTabla(respuesta);

        }
    });
}

const modal = document.getElementsByClassName("modal")
const myModal = document.getElementById("myModal")


const btnmodal = document.getElementById("btnmodal")



const activarModal = (idUsuario) => {

    btnmodal.click()
    const err2 = document.getElementsByClassName("err 2")
    const id2 = document.getElementById("id2").value = idUsuario
    const identification2 = document.getElementById("identification2")
    const nombre2 = document.getElementById("nombre2")
    const address2 = document.getElementById("address2")
    const cellPhone2 = document.getElementById("cellPhone2")
    const email2 = document.getElementById("email2")
    const password3 = document.getElementById("password3")
    const confirpassword2 = document.getElementById("confirpassword2")
    const zone2 = document.getElementById("zone2")
    const type2 = document.getElementById("type2")
    const btnactualizar = document.getElementById("btnactualizar")

    const validarModal = () => {
        let validaEmail = validarEmail(email2.value) ? "none" : "block"
        let validaPassword = validarPassword(password3.value) ? "none" : "block"
        let validaPassword2 = validarPassword(confirpassword2.value) ? "none" : "block"

        err2[0].style.display = validaEmail
        err2[1].style.display = validaPassword
        err2[2].style.display = validaPassword2

    }

    email2.addEventListener("click", (e) => {
        e.preventDefault()
        err2[0].style.display = "none"
    })

    password3.addEventListener("click", (e) => {
        e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
        err2[1].style.display = "none"
    })

    confirpassword2.addEventListener("click", (e) => {
        e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
        err2[2].style.display = "none"
        err2[3].style.display = "none"
    })



    btnactualizar.addEventListener("click", (e) => {
        e.preventDefault()
        validarModal()

        if (password3.value == confirpassword2.value) {
            let datos = {
                id: idUsuario,
                identification: identification2.value,
                name: nombre2.value,
                address: address2.value,
                cellPhone: cellPhone2.value,
                email: email2.value,
                password: password3.value,
                zone: zone2.value,
                type: type2.value

            }

            actualizarUsuario(datos)
            btnactualizar.dataset.dismiss = "modal"

            


        } else {
            err2[3].style.display = "block"
        }
    })
}

function actualizarUsuario(usuario) {
    let dataToSend = JSON.stringify(usuario);
    $.ajax({
        url: "http://144.22.244.240:8080/api/user/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            alert("Actualizado exitoso.");
            mostrarUsuarios()
        }
    });
}

const deleteUsuario = (idUsuario) => {
    let btnmodal2 = document.getElementById("btnmodal2")
    let btnBorrar = document.getElementById("btneliminar1")
    btnmodal2.click()
    btnBorrar.addEventListener("click", (e) => {
        e.preventDefault()
        let myData={
            id:idUsuario
        }
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://144.22.244.240:8080/api/user/"+idUsuario,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(){
                
                alert("Usuario eliminado.");
                mostrarUsuarios()
            }
            });
            btnBorrar.dataset.dismiss = "modal"    
    })

    
}

btn2.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarUsuarios()
})