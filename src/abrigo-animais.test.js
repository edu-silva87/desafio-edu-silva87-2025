import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado na lista de uma pessoa', () => {
  const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'RATO,BOLA', 'Rex');
  expect(resultado.erro).toBe('Brinquedo inválido');
  expect(resultado.lista).toBeFalsy();
});

test('Deve atribuir Loco a pessoa que já tem companhia mesmo quando os brinquedos estão em ordem diferente', () => {
  const resultado = new AbrigoAnimais().encontraPessoas('RATO,SKATE,BOLA', '', 'Rex,Loco');

  expect(resultado.erro).toBeFalsy();
  expect(resultado.lista.length).toBe(2);
  expect(resultado.lista[0]).toBe('Loco - pessoa 1');
  expect(resultado.lista[1]).toBe('Rex - pessoa 1');
});

test('Deve rejeitar animal duplicado na lista de ordem', () => {
  const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Rex');
  expect(resultado.erro).toBe('Animal inválido');
  expect(resultado.lista).toBeFalsy();
});

});
