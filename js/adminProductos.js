/**
 * capturar etiquetas para manipular datos 
 */

const reference = document.getElementById("reference")
const brand = document.getElementById("brand")
const category = document.getElementById("category")
const description = document.getElementById("description")
const availability = document.getElementsByName("availability")
const price = document.getElementById("price")
const quantity = document.getElementById("quantity")
const photography = document.getElementById("photography")

const btn = document.getElementById("guardar")
const btn2 = document.getElementById("ver")



btn.addEventListener("click", (e) => {
    e.preventDefault()


    $.ajax({
        url: "http://144.22.244.240:8080/api/cleaningproduct/all",
        type: "GET",
        datatype: "JSON",
        success: function (productos) {
            if (productos.length == 0) {
                GuardarProducto()
                alert("Producto creado de forma correcta")
                mostrarProductos()
            } else {
                let aux = true
                for (i = 0; i < productos.length; i++) {
                    if (productos[i].reference == reference.value) {
                        alert("No fue posible crear el producto")
                        aux = false;
                    }
                }
                if (aux) {
                    GuardarProducto()
                    alert("Producto creado de forma correcta")
                    mostrarProductos()
                }

            }

        }

    });

})


function GuardarProducto() {
    if (availability.value == "true") {
        availability.value = true
    } else {
        availability.value = false
    }

    let datos = {
        reference: reference.value,
        brand: brand.value,
        category: category.value,
        description: description.value,
        availability: availability.value,
        price: price.value,
        quantity: quantity.value,
        photography: photography.value

    }
    let dataToSend = JSON.stringify(datos);
    $.ajax({
        url: "http://144.22.244.240:8080/api/cleaningproduct/new",
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
    myTable += "<thead><th>Imagen Producto</th><th>Referencia</th><th>Marca</th><th>Categoria</th><th>Descripción</th><th>Disponible</th><th>Precio</th><th>Cantidad</th><th class='text-center' colspan='2'>Acciones</th></thead>"
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td><div><img src=" + items[i].photography + "></div></td>";
        myTable += "<td>" + items[i].reference + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].category + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td>" + items[i].availability + "</td>"
        myTable += "<td>" + items[i].price + "</td>"
        myTable += "<td>" + items[i].quantity + "</td>"
        myTable += `<td> <button class='btn btn-warning'onclick='activarModal("${items[i].reference}")'>Editar</button>`
        myTable += `<td> <button class='btn btn-danger'onclick='deleteProducto("${items[i].reference}")'>Eliminar</button>`
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#mostrarProductos").append(myTable);
}
const ProductosAMostrar = document.getElementById("mostrarProductos")
ProductosAMostrar.style.display = "none"

function mostrarProductos() {

    $.ajax({
        url: "http://144.22.244.240:8080/api/cleaningproduct/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#mostrarProductos").empty()
            console.log(respuesta)
            ProductosAMostrar.style.display = "block"
            crearTabla(respuesta);

        }
    });
}

const modal = document.getElementsByClassName("modal")
const myModalProducto = document.getElementById("myModalProducto")


const btnmodal = document.getElementById("btnmodalproducto")



const activarModal = (referencia) => {
    console.log(referencia)
    btnmodal.click()

    const reference2 = document.getElementById("reference2").value = `${referencia}`
    const brand2 = document.getElementById("brand2")
    const category2 = document.getElementById("category2")
    const description2 = document.getElementById("description2")
    const availability2 = document.getElementsByName("availability2")
    const price2 = document.getElementById("price2")
    const quantity2 = document.getElementById("quantity2")
    const photography2 = document.getElementById("photography2")
    const btnactualizar = document.getElementById("btnactualizarproducto")

    if (availability2.value == "true") {
        availability2.value = true
    } else {
        availability2.value = false
    }

    btnactualizar.addEventListener("click", (e) => {
        e.preventDefault()


        let datos = {
            reference: referencia,
            brand: brand2.value,
            category: category2.value,
            description: description2.value,
            availability: availability2.value,
            price: price2.value,
            quantity: quantity2.value,
            photography: photography2.value

        }

        actualizarProducto(datos)
        btnactualizar.dataset.dismiss = "modal"

    })
}

function actualizarProducto(usuario) {
    let dataToSend = JSON.stringify(usuario);
    $.ajax({
        url: "http://144.22.244.240:8080/api/cleaningproduct/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            alert("Actualizado exitoso.");
            mostrarProductos()
        }
    });
}

const deleteProducto = (referencia) => {
    
    let btnmodal2p = document.getElementById("btnmodal2")
    let btnBorrarp = document.getElementById("btneliminar1")

    btnmodal2p.click();

    btnBorrarp.addEventListener("click", (e) => {
        e.preventDefault()
        let myData = {
            id: referencia
        }
        let dataToSend = JSON.stringify(myData);
        console.log(dataToSend)
        $.ajax({
            url: "http://144.22.244.240:8080/api/cleaningproduct/" + referencia,
            type: "DELETE",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function () {

                alert("Producto eliminado.");
                mostrarProductos()
            }
        });
        btnBorrarp.dataset.dismiss = "modal"
    })


}

btn2.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarProductos()
})