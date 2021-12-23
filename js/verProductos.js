function crearTablaProductos(items){
    let myTable="<table class=' table table-hover table-dark '>";
    myTable+="<thead><th>Imagen</th><th>Referencia</th><th>Marca</th><th>Categoria</th><th>Descripción</th><th>Disponible</th><th>Precio</th><th>Cantidad</th></thead>"
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].photography+"</td>";
        myTable+="<td>"+items[i].reference+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].category+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td>"+items[i].availability+"</td>"
        myTable+="<td>"+items[i].price+"</td>"
        myTable+="<td>"+items[i].quantity+"</td>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#verProductos").append(myTable);
}

function mostrarProductos() {
    $.ajax({
        url:"http://localhost:8080/api/cleaningproduct/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#verProductos").empty()
            console.log(respuesta)
            crearTablaProductos(respuesta);
            
        }
        });
}