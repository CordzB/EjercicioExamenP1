document.getElementById("calcularBtn").addEventListener("click", function() {
    let productos = [];
    let camposVacios = [];

    for (let i = 1; i <= 5; i++) {
        let input = document.getElementById(`producto${i}`);
        let valor = input.value.trim();

        if (valor === "" || isNaN(valor) || parseFloat(valor) < 0) {
            camposVacios.push(`Producto ${i}`);
            input.classList.add("is-invalid"); 
        } else {
            input.classList.remove("is-invalid");
            productos.push(parseFloat(valor));
        }
    }


    if (camposVacios.length > 0) {
        Swal.fire({
            icon: "error",
            title: "Campos vacíos o inválidos",
            html: `Por favor, revisa los siguientes campos:<br><strong>${camposVacios.join(", ")}</strong>`,
        });
        return;
    }


    let subtotal = productos.reduce((acc, curr) => acc + curr, 0);
    let descuento = 0;
    let porcentaje = "0%";

    if (subtotal >= 1000 && subtotal < 5000) {
        descuento = subtotal * 0.10;
        porcentaje = "10%";
    } else if (subtotal >= 5000 && subtotal < 9000) {
        descuento = subtotal * 0.20;
        porcentaje = "20%";
    } else if (subtotal >= 9000 && subtotal < 13000) {
        descuento = subtotal * 0.30;
        porcentaje = "30%";
    } else if (subtotal >= 13000) {
        descuento = subtotal * 0.40;
        porcentaje = "40%";
    }

    let total = subtotal - descuento;


    document.getElementById("subtotal").value = `L${subtotal.toFixed(2)}`;
    document.getElementById("descuento").value = `L${descuento.toFixed(2)}`;
    document.getElementById("totalPagar").value = `L${total.toFixed(2)}`;
    document.getElementById("label-descuento").innerText = `Descuento ${porcentaje}`;
});


document.getElementById("limpiarBtn").addEventListener("click", function() {
    document.getElementById("label-descuento").innerText = "Descuento 0%";

    for (let i = 1; i <= 5; i++) {
        document.getElementById(`producto${i}`).classList.remove("is-invalid");
    }
});
