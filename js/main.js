
//capiturando o formulário pelo seu id e salvando em uma variável
const form = document.getElementById("novoItem");
/*
operação de um furmulario ser enviado e a de submit, uso aqui um escutador de evento que nesse caso e o submit, e quando 
acontecer esse evento ele irá executar algo para mim, aqui ao dicitar os dados no input do form e clico nada acontece, isso porque
devemos interromper o comportamento padrão, e fazemos isso com o "preventDefault", note que passamos o evento como parâmetro nessa
função, aqui precisamos pegar os dados de entrada nome e quantidade e tem diversas formas de fazer isso mas aqui vamos pegar pelo 
alvo também conhecido como "target" e em "elements" pois aqui é um objeto   
*/
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    console.log(evento);

    evento.target[0].value;
    console.log(evento.target.elements['nome'].value);
    console.log(evento.target.elements['quantidade'].value);
});
