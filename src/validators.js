export function validateAnimals(animalsNames, validAnimalsMap) {
  const seen = new Set();
  for (const rawName of animalsNames) {
    const name = rawName.trim();
    const key = name.toUpperCase();

    if (!validAnimalsMap[key]) {
      throw new Error('Animal inválido');
    }

    if (seen.has(key)) {
      throw new Error('Animal inválido');
    }

    seen.add(key);
  }
}

export function validateToys(toyList, validToys) {
  const seen = new Set();
  for (const toy of toyList) {
    if (!validToys.has(toy)) {
      throw new Error('Brinquedo inválido');
    }

    if (seen.has(toy)) {
      throw new Error('Brinquedo inválido');
    }

    seen.add(toy);
  }
}

