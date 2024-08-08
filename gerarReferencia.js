function gerarReferencia(entidade, subentidade, id, valor) {
    
    //entidade deve ter 5 dígitos
    if (entidade.length !== 5) {
        throw new Error("A entidade deve ter exatamente 5 dígitos.");
    }

    //subentidade deve ter 3 digitos
    if (subentidade.length !== 3) {
        throw new Error("A subentidade deve ter exatamente 3 dígitos.");
    }

    //id deve ter entre 1 e 4 digitos
    if (id.length > 4 || id.length < 1) {
        throw new Error("O id deve ter entre 1 e 4 dígitos.");
    }

    //valor deve ter entre 1 e 8 dígitos (usar ponto para separar as ultimas duas casas decimais)
    if (valor.length > 9 || valor.length < 1) {
        throw new Error("O valor deve entre 1 e 8 dígitos.");
    }

    // Formatar o valor com 2 casas decimais e sem vírgula
    const valorFormatado = String(Math.round(parseFloat(valor) * 100)).padStart(8, '0');

    //id do cliente ou código interno será completado com zero a esquerda caso tenha menos de 4 dígitos
    const idFormatado = String(id).padStart(4, '0');

    // Concatenar todos os campos
    const entrada = entidade + subentidade + idFormatado + valorFormatado;

    // Calcular os dígitos de controle
    const digitosControle = calcularDigitosControle(entrada);

    // Formatar os dígitos de controle
    const digitosControleFormatados = String(digitosControle).padStart(2, '0');

    // Retornar a referência formatada
    return subentidade + idFormatado + digitosControleFormatados;
}

function calcularDigitosControle(entrada) {
    const pesos = [51, 73, 17, 89, 38, 62, 45, 53, 15, 50, 5, 49, 34, 81, 76, 27, 90, 9, 30, 3];
    let soma = 0;

    for (let i = 0; i < entrada.length; i++) {
        soma += parseInt(entrada[i]) * pesos[i];
    }

    return 98 - (soma % 97);
}

module.exports = { gerarReferencia };