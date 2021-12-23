function traerUsuarios() {
    $.ajax({
        url:"http://144.22.244.240:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            
            
        }
        });
}


/**
 * capturar etiquetas para manipular datos 
 */
const errores = document.getElementsByClassName("err")
const email = document.getElementById("email")
const password = document.getElementById("password")
const btn=document.getElementById("entrar")

/**
 * ocultar los mensajes de alerta
 */

for(let i=0;i<errores.length;i++){
    errores[i].style.display="none"
}

email.addEventListener("click",(e)=>{
    e.preventDefault()
    errores[0].style.display="none"
})

password.addEventListener("click",(e)=>{
    e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
    errores[1].style.display="none"
})

const validar=()=>{
    let validaEmail = validarEmail(email.value)?"none":"block"
    let validaPassword = validarPassword(password.value)?"none":"block"
    errores[0].style.display=validaEmail
    errores[1].style.display=validaPassword
}

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    validar()
    if(validarEmail(email.value)&&validarPassword(password.value)){
        $.ajax({
            url:"http://144.22.244.240:8080/api/user/all",
            type:"GET",
            datatype:"JSON",
            success:function(usuarios){
                console.log(usuarios)
                if(usuarios.length==0){
                    alert("No existen usuarios registrados, favor de registrarse")
                }else{
                    let aux = true
                    let nombre = ""
                    for(let i=0;i<usuarios.length;i++) {
                        if(email.value==usuarios[i].email&&password.value==usuarios[i].password){
                            aux = true;
                            nombre = usuarios[i].name;
                            type = usuarios[i].type;
                            break;
                        }else{
                            aux = false;
                        }
                    }
                    if(aux){
                        alert(`Bienvenido ${type} ${nombre}`)
                        window.location.href="../Menu.html"
                    }else{
                        alert("Usuario no registrado")
                    }
                }
            }
        
        })
    }    
        
})


/**
 * Funcion validar email
 * @param {*} email input de entrada email
 * @returns true or false
 */
const validarEmail=( email )=> 
{
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
const validarPassword=(password)=>{
    /**
     * valida El Password Mínimo ocho caracteres, al menos una letra mayúscula,
                  una letra minúscula, un número y un carácter especial:
     */

    var regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password) ? true : false;
}
