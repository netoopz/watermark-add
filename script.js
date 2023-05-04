function adicionarMarcaAgua() {
    // Obter o texto, imagem e posição
    var texto = document.getElementById("texto").value;
    var imagem = document.getElementById("imagem").files[0];
    var posicao = document.getElementById("posicao").value;

    // Criar objeto FileReader para ler a imagem
    var reader = new FileReader();

    // Quando a imagem é carregada
    reader.onload = function(event) {
        // Criar uma nova imagem com a imagem carregada
        var imagemCarregada = new Image();
        imagemCarregada.src = event.target.result;

        // Quando a nova imagem é carregada
        imagemCarregada.onload = function() {
            // Criar o canvas
            var canvas = document.createElement("canvas");
            canvas.width = imagemCarregada.width;
            canvas.height = imagemCarregada.height;

            // Desenhar a imagem no canvas
            var contexto = canvas.getContext("2d");
            contexto.drawImage(imagemCarregada, 0, 0);

            // Adicionar o texto como marca d'água
            contexto.font = document.getElementById("tamanho").value + "px Arial";
            contexto.fillStyle = document.getElementById("cor").value;
            contexto.fillText(texto, getPosicaoX(posicao, contexto, texto), getPosicaoY(posicao, contexto, texto));

            // Obter a imagem com a marca d'água
            var imagemMarcada = document.getElementById("imagemMarcada");
            imagemMarcada.src = canvas.toDataURL();

            // Exibir a imagem com a marca d'água
            imagemMarcada.style.display = "block";
        }
    }

    // Ler a imagem como URL de dados
    reader.readAsDataURL(imagem);
}

// Função para obter a posição X da marca d'água
function getPosicaoX(posicao, contexto, texto) {
    switch (posicao) {
        case "top-left":
        case "bottom-left":
            return 10;
        case "top-right":
        case "bottom-right":
            return contexto.canvas.width - contexto.measureText(texto).width - 10;
        case "center":
            return (contexto.canvas.width - contexto.measureText(texto).width) / 2;
    }
}

// Função para obter a posição Y da marca d'água
function getPosicaoY(posicao, contexto, texto) {
    switch (posicao) {
        case "top-left":
        case "top-right":
            return parseInt(contexto.font) + 10;
        case "bottom-left":
        case "bottom-right":
            return contexto.canvas.height - 10;
        case "center":
            return (contexto.canvas.height + parseInt(contexto.font)) / 2;
    }
}
