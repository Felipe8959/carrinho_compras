let items = [];
let total = 0;

function addItem() {
    const itemName = document.getElementById('itemName').value;
    let itemPrice = document.getElementById('itemPrice').value.replace(/\D/g, ''); // Remover tudo exceto números
    itemPrice = parseFloat(itemPrice) / 100; // Converter para número e dividir por 100 para obter o valor em reais
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (!itemName || isNaN(itemPrice) || isNaN(itemQuantity)) {
        alert("Insira informações válidas.");
        return;
    }

    const item = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity
    };

    items.push(item);
    renderItems();
}


function deleteItem(index) {
    items.splice(index, 1);
    renderItems();
}

function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    let itemCount = 0;
    total = 0;

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2).replace('.', ',')}</td>
            <td>${item.quantity}</td>
            <td>
                <button onclick="deleteItem(${index})" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </td>
        `;
        itemList.appendChild(row);

        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    let limit = document.getElementById('limit').value;
    // Remove o R$ e outros caracteres não numéricos
    limit = parseFloat(limit.replace(/[^\d.,]/g, '').replace(',', '.'));
    const totalElement = document.getElementById('total');
    const percentage = (total / limit) * 100;

    totalElement.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');

    if (total >= limit) {
        totalElement.style.color = 'red';
    } else if (percentage >= 60) {
        totalElement.style.color = 'orange';
    } else {
        totalElement.style.color = 'green';
    }

    document.getElementById('itemCount').textContent = itemCount + " un";
}


function clearItems() {
    items = [];
    renderItems();
}


function formatInput(inputId) {
    // Formatação automática do preço enquanto o usuário digita
    document.getElementById(inputId).addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo exceto números
        value = (value / 100).toFixed(2); // Converter centavos em reais e limitar a 2 casas decimais
        e.target.value = 'R$ ' + value.replace('.', ','); // Adicionar o símbolo de moeda e substituir o ponto decimal por vírgula
    });

    // Validar para garantir que apenas números e um único ponto decimal sejam inseridos
    document.getElementById(inputId).addEventListener('keypress', function(e) {
        if (e.key === '.' && e.target.value.includes('.')) {
            e.preventDefault(); // Impedir a inserção de mais de um ponto decimal
        }
    });
}

formatInput('itemPrice');
formatInput('limit');

document.getElementById('limit').addEventListener('input', function() {
    renderItems();
});