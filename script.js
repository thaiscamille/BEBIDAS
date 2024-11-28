const tabela = document.getElementById("tabela_bebidas")
const bebidas = JSON.parse(localStorage.getItem("Bebidas"))

if (!bebidas) {
    localStorage.setItem("Bebidas", JSON.stringify([]))
    // location.reload()
}

for (let index = 0; index < bebidas.length; index++) {
    const bebidas= bebidas[index];
    const linha = `
        <tr>
            <td>${bebidas.id}</td>
            <td>${bebidas.nome}</td>
            <td>${bebidas.quantidade}</td>
            <td>${bebidas.Descrição}</td>
            <td class="text-center">
                <div class="btn btn-warning" onClick="editarbebidas(${bebidas.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarbebidas(${bebidas.id})">Apagar</div>
            </td>
        </tr>
    `
    tabela.innerHTML += linha
}

function editarbebidas(id) {
    const bebidas = procurabebidasById(id)
    // abrir modal do id modal_cadastro
    var modal = new bootstrap.Modal(document.getElementById('modal_edicao'));
    const nomeeditar = document.getElementById("nome-editar")
    const quantidadeeditar = document.getElementById("quantidade-editar")
    const Descriçãoeditar = document.getElementById("descrição-editar")

    emaileditar.value =bebidas.nome
    senhaeditar.value = bebidas.quantdade
    senha2editar.value = bebidas.descrição

    modal.show(); // 
}

function apagarbebidas(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá desfazer está ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            const bebidasAremover = bebidas.findIndex(bebidas => bebidas.id == id)
            bebidas.splice(bebidasAremover, 1)
            localStorage.setItem('bebidas', JSON.stringify(bebidas))
            // location.reload()
        }
      });
}

const adicionar_bebidas = document.getElementById("bebidas")

adicionar_bebidas.addEventListener("submit", (event) => {
    event.preventDefault()
    const quantiadedigitada = document.getElementById("quantidade-adicionar").value
    const descriçãodigitada = document.getElementById("descrição-adicionar").value 
    const nomelDigitado = document.getElementById("nome-adicionar").value

    console.log(quantidadeDigitada, descriçãodigitada, nomeDigitado)

    let bebidas = JSON.parse(localStorage.getItem("bebidas"))
    const ultimoID = bebidas[bebidas.length -1]?.id || 0
    const bebidasAdd = {
        id: ultimoID + 1,
        Nome: nomeDigitado ,
        quantidade: quantidadeDigitada
    
    }
    
    bebidas.push(bebidasAdd)
    localStorage.setItem('bebidas', JSON.stringify(bebidas))
    // location.reload()
})

function procurabebidasBynome (nomeDigitado) {
    const bebidas = JSON.parse(localStorage.getItem("bebidas"))
    const found = bebidas.find((bebidas) => {
        return bebidas.nome == nomeDigitado 
    })
    return found
}

function procurabebidasById(id) {
    const bebidas = JSON.parse(localStorage.getItem("bebidas"))
    const found = bebidas.find((bebidas) => {
        return bebidas.id == id 
    })
    return found
}