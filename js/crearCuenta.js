/**
 * capturar etiquetas para manipular datos 
 */
 const errores = document.getElementsByClassName("err")
 const nombre = document.getElementById("nombre")
 const email = document.getElementById("email")
 const password = document.getElementById("password")
 const password2 = document.getElementById("confirpassword")
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

 password2.addEventListener("click",(e)=>{
    e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
    errores[2].style.display="none"
})

password2.addEventListener("click",(e)=>{
    e.preventDefault() //El preventDefault se usa para que el form no envie la informacion hasta ser validada
    errores[3].style.display="none"
})
 
 const validar=()=>{
     let validaEmail = validarEmail(email.value)?"none":"block"
     let validaPassword = validarPassword(password.value)?"none":"block"
     let validaPassword2 = validarPassword(password2.value)?"none":"block"

     errores[0].style.display=validaEmail
     errores[1].style.display=validaPassword
     errores[2].style.display=validaPassword2
     
 }
 
 btn.addEventListener("click",(e)=>{
     e.preventDefault()
     validar()
     if(password.value==password2.value){
        if(validarEmail(email.value)&&validarPassword(password.value)){
            $.ajax({
                url:"http://localhost:8080/api/user/all",
                type:"GET",
                datatype:"JSON",
                success:function(usuarios){
                    if(usuarios.length==0){
                        GuardarUsuario()
                        alert("Cuenta creada de forma correcta")
                    }else{
                        let aux = true
                        for(i=0;i<usuarios.length;i++){
                            if(usuarios[i].email==email.value){
                                alert("No fue posible crear la cuenta")
                                aux = false;
                            }
                        }
                        if(aux){
                            GuardarUsuario() 
                            alert("Cuenta creada de forma correcta")
                        }
                        
                    }
                    
                }
                    
            
            });
         }    
     }else{
        errores[3].style.display="block"
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
 
 function GuardarUsuario(){
     let datos={
         email:email.value,
         password:password.value,
         name:nombre.value
     }
     let dataToSend=JSON.stringify(datos);
     $.ajax({
        url:"http://localhost:8080/api/user/new",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
        }
     })
 }

 function traerUsuarios() {
    $.ajax({
        url:"http://localhost:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            return respuesta;
            
        }
        });
}