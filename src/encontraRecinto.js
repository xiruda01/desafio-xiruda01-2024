function encontrarRecinto(animal, quantidade) {
    // Verificar se o animal é válido
    const animaisValidos = {
      LEAO: { tamanho: 3, bioma: 'savana' },
      LEOPARDO: { tamanho: 2, bioma: 'savana' },
      CROCODILO: { tamanho: 3, bioma: 'rio' },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
      GAZELA: { tamanho: 2, bioma: 'savana' },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
    };
  
    if (!animaisValidos[animal]) {
      return { erro: 'Animal inválido' };
    }
  
    // Verificar se a quantidade é válida
    if (quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }
  
    // Recintos existentes
    const recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistente: ['MACACO', 'MACACO', 'MACACO'] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistente: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistente: ['GAZELA'] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistente: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistente: ['LEAO'] }
    ];
  
    // Encontrar recintos viáveis
    const recintosViaveis = [];
    for (const recinto of recintos) {
      const tamanhoOcupado = recinto.animaisExistente.reduce((acc, animal) => acc + animaisValidos[animal].tamanho, 0);
      const tamanhoLivre = recinto.tamanhoTotal - tamanhoOcupado;
  
      // Verificar se o recinto é adequado para o animal
      if (animaisValidos[animal].bioma.includes(recinto.bioma) && tamanhoLivre >= quantidade * animaisValidos[animal].tamanho) {
        // Verificar regras adicionais
        if (animal === 'HIPOPOTAMO' && !recinto.bioma.includes('rio')) {
          continue;
        }
        if (animal === 'MACACO' && recinto.animaisExistente.length === 0) {
          continue;
        }
        if (recinto.animaisExistente.some(animalExistente => animaisValidos[animalExistente].tamanho > animaisValidos[animal].tamanho)) {
          continue;
        }
  
        // Calcular espaço livre e total
        const espaçoLivre = tamanhoLivre - quantidade * animaisValidos[animal].tamanho;
        const espaçoTotal = recinto.tamanhoTotal;
  
        // Adicionar recinto viável à lista
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${espaçoTotal})`);
      }
    }
  
    // Retornar resultado
    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    } else {
      return { recintosViaveis };
    }
  }