import { validateAnimals, validateToys } from './validators';
import {isSubsequence, isSubarray, hasAllToysAnyOrder} from './utils';

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const person1Toys = brinquedosPessoa1
        ? brinquedosPessoa1.split(',').map(s => s.trim().toUpperCase()).filter(s => s !== '')
        : [];
      const person2Toys = brinquedosPessoa2
        ? brinquedosPessoa2.split(',').map(s => s.trim().toUpperCase()).filter(s => s !== '')
        : [];
      const animalsOrderRaw = ordemAnimais
        ? ordemAnimais.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

      const ANIMALS_DATA = {
        'REX': { name: 'Rex', tipo: 'cao', brinquedos: ['RATO', 'BOLA'] },
        'MIMI': { name: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
        'FOFO': { name: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
        'ZERO': { name: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
        'BOLA': { name: 'Bola', tipo: 'cao', brinquedos: ['CAIXA', 'NOVELO'] },
        'BEBE': { name: 'Bebe', tipo: 'cao', brinquedos: ['LASER', 'RATO', 'BOLA'] },
        'LOCO': { name: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
      };

      const VALID_TOYS = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);

      validateToys(person1Toys, VALID_TOYS);
      validateToys(person2Toys, VALID_TOYS);
      validateAnimals(animalsOrderRaw, ANIMALS_DATA);

      const animalsOrder = animalsOrderRaw.map(rawName => {
        const key = rawName.trim().toUpperCase();
        return ANIMALS_DATA[key];
      });

      let countP1 = 0;
      let countP2 = 0;
      const assignments = {}; 
      for (const animal of animalsOrder) {
        const fav = animal.brinquedos;
        let p1Eligible = false;
        let p2Eligible = false;

        if (countP1 < 3) {
          if (animal.name.toUpperCase() === 'LOCO') {
            if (countP1 >= 1) {
              p1Eligible = hasAllToysAnyOrder(person1Toys, fav);
            } else {
              p1Eligible = isSubsequence(person1Toys, fav);
            }
          } else {
            p1Eligible = isSubsequence(person1Toys, fav);
          }
        }
        if (countP2 < 3) {
          if (animal.name.toUpperCase() === 'LOCO') {
            if (countP2 >= 1) {
              p2Eligible = hasAllToysAnyOrder(person2Toys, fav);
            } else {
              p2Eligible = isSubsequence(person2Toys, fav);
            }
          } else {
            p2Eligible = isSubsequence(person2Toys, fav);
          }
        }

        let result;
        if (p1Eligible && p2Eligible) {
          result = 'abrigo';
        } else if (p1Eligible) {
          result = 'pessoa 1';
          countP1++;
        } else if (p2Eligible) {
          result = 'pessoa 2';
          countP2++;
        } else {
          result = 'abrigo';
        }

        assignments[animal.name] = result;
      }

      const lista = Object.keys(assignments)
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .map(name => `${name} - ${assignments[name]}`);

      return { lista };
    } catch (err) {
      return { erro: err.message || 'Erro desconhecido' };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
