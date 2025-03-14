import html from './index.html?raw'
describe('Вывод данных', () => {
  beforeAll(() => {
    document.body.innerHTML = html;
    require('./index.js');
  });

  test('Кнопка выводит значения инпутов', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const button = document.getElementById('submitBtn');
    const output = document.getElementById('output');

    input1.value = 'Hello';
    input2.value = 'World';
    button.click();
    expect(output.textContent).toBe('Hello World');

    input1.value = '';
    input2.value = '';
    button.click();
    expect(output.textContent).toBe('Пусто');
  });
});