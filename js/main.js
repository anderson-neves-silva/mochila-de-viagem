
//capiturando o formulário pelo seu id e salvando em uma variável
const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
/*criando um array com os itens, mas verifico se há algo salvo lá, assim faço uma consuta lá, se não tiver nada lá crie um array 
vazio, precisamos transformar os dados para JS, porque antes transformamos eles para tipo string, para isso usamso o "JSON.parse",
agora no console após carregar a página mostra*/
const itens = JSON.parse(localStorage.getItem("itens")) || [];
//console.log(itens);

//iterando sobre os itens
itens.forEach(element => {
    criaElemento(element);
});

/*operação de um furmulario ser enviado e a de "submit", uso aqui um escutador de evento que nesse caso e o "submit", e quando 
acontecer esse evento ele irá executar algo para mim, aqui ao digitar os dados no input do form e clico, nada acontece, isso 
porque devemos interromper o comportamento padrão, e fazemos isso com o "preventDefault", note que passamos o evento como 
parâmetro nessa função, aqui precisamos pegar os dados de entrada nome e quantidade e tem diversas formas de fazer isso, mas 
aqui vamos pegar pelo alvo também conhecido como o "target" e em "elements" pois aqui é um objeto. 
aqui quando o formulário for submetido a função "criaElemento" é chamada passando o nome e quantidade e usamos a busca que pega
os elementos como parâmetros, agora o "submit" simplesmente chama a função "criaElemento".*/
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    //console.log(evento);

    /*fazendo uma refatoração da chamada do criaElemento, pois está chamando duas vezes, e crio duas variável para guardar o 
    nome e a quantidade.*/
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    /*tranformando a variável itemAtual em um objeto, com isso ao invés de enviarmos duas informações "nome e quantidade" 
    enviaremos para o "localStorage" apenas essa variável "itemAtual", mas dessa forma ele salva como tipo "object" e não
    é assim que precisamos, o "localStorage" só lê um arquivo do tipo "string/json", o que precisamos é transformar esse elemento
    ou objeto em uma "string" e fazemos isso usamos o método "JSON.stringify", assim ainda temos o mesmo problema de sobreescreve 
    os dados, para resolver isso fora da nosso função aqui criaremos um "arrey".*/
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    /*virificando se o item já existe no localStorage, vou fazer uma condicional que se verdadeira adiciona um "id" na 
    const "itemAtual", mas quando criamos um novo elemento não criamos "id" neles e para isso lá na função "criaElelemento" 
    devemos criar e será feito usando a propriedade do "data-attribute" e ele será colocado no elemento "strong" um atributo.*/
    const existe = itens.find(element => element.nome === nome.value);
    //console.log(existe);
    if (existe) {
        itemAtual.id = existe.id;
        /*nesse ponto aqui já temos uma referência aqui, toda vez que adicionamos um item e se ele existir mostra o id.*/
        //console.log(existe.id);

        atualizaElemento(itemAtual);

        /*para salvar os dados no localStorage precisamos achar a posição onde está o nosso conteúdo e sobreescreve, e essa posição
        é o "existe.id".*/
        itens[existe.id] = itemAtual;
    } else {
        itemAtual.id = itens.length;

        //evento.target[0].value;
        //console.log(evento.target.elements['nome'].value);
        //console.log(evento.target.elements['quantidade'].value);

        criaElemento(itemAtual);

        /*inserindo a variável "itemAtual" dentro do "array" de itens criando lá no início, e para isso uso o método "push" e 
        devemos passar a variável "itens" para o "localStorage" agora ele salva um array todos os dados que mandamos.*/
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    //registrando nome e quantidade no localStorage, só que dessa forma ao salvamos um outro valor ele sobreescreve o anterior.
    //localStorage.setItem("nome", nome);
    //localStorage.setItem("quantidade", quantidade);
    
    //limpando a entrada do nome e da quantidade.
    nome.value = "";
    quantidade.value = "";
});

/*vamos criar elementos com o JS e exibir na tela, por isso aqui crio uma função que cria elementos no "html", crio uma variável
de nome "novoItem" que guarda o "li" criado com o "createElement", e na variável "novoItem" eu adiciono uma nova classe com o
"classList" passando a classe "item", crio agora um "strong" por isso crio uma nova variável de nome "numeroItem", agora preciso
que "numeroItem" receba a quantidade e isso não é uma atribuição direta, nós estamos falando de uma tag do "html" por isso 
aqui usamos o "innerHTML", agora precisamos que o "novoItem" receba a quantidade e o nome, agora aparece um "li" no console e aqui
no innerHTML mostra um "object HTMLElement" é criado um objeto, quando criamos um elemento com o JS não adicionamos um elemento
dentro do outro como se fosse um conteúdo simples de html, para manipular esse objeto inteiro que foi criado usamos 
o "appendChild" ao invés do "innerHTML", é ele que vai inserir um elemento criado dentro do outro, agora sim note que no console
aparece a tag "strong" lá no innerHTML dentro da tag "li", agora preciso incrementar o novo item, agora posso usar o "innerHTML"
pois ele já recebeu o nosso objeto, precisamos acrescentar o nome, agora no console mostra o "innerHTML" com o strong e o nome
juntos, com isso já temos o nosso elemento criado, precisamos inserir ele na lista lá no html, e para isso criamos uma variável
que pega o id lista lá no html, e a lista recebe o "novoItem" completo, e com isso já conseguimos verificar visualmente lá no html
o nosso elemento adicionado na lista, apenas uma observação eu criei a variável lista dentro da função que "criaElemento" e toda
vez que a função e chamada ela vai criando essa variável novamente e não precisa ser assim eu movo ela lá para o início do código 
e ela só é chamada lá hora que precisa adicionar os elemento na tela.*/
function criaElemento(item) {
    //console.log(nome);
    //console.log(quantidade);

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    //console.log(numeroItem);
    //aqui está sendo criado o data-attribute "id" incremental e por isso colocamos "id" no item ficando assim "item.id".
    numeroItem.dataset.id = item.id;
    
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
    //console.log(novoItem);
}

/*aqui a função recebe um item e atualiza pelo data-attribute que criamos no elemento "strong".*/
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
    //console.log(document.querySelector("[data-id='"+item.id+"']"));
}
