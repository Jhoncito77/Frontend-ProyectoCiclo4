function crearTabla(items){
    let myTable="<table class=' table table-hover table-dark '>";
    myTable+="<th>ID</th><th>Documento</th><th>Nombre</th><th>Dirección</th><th>Telefono</th><th>Correo electronico</th><th>Zona</th><th>Cargo</th>"
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].identification+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].address+"</td>";
        myTable+="<td>"+items[i].cellPhone+"</td>";
        myTable+="<td>"+items[i].email+"</td>"
        myTable+="<td>"+items[i].zone+"</td>"
        myTable+="<td>"+items[i].type+"</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#verUsuarios").append(myTable);
}

function mostrarUsuarios() {
    $.ajax({
        url:"http://144.22.244.240:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#verUsuarios").empty()
            console.log(respuesta)
            crearTabla(respuesta);
            
        }
        });
}

