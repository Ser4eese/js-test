import html from './index.html?raw'

describe('Верстка', () => {
  beforeAll(() => {
    document.body.innerHTML = html;
  });

  test('Должны быть два инпута и кнопка', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const button = document.getElementById('submitBtn');

    expect(input1).not.toBeNull();
    expect(input2).not.toBeNull();
    expect(button).not.toBeNull();
    expect(button.tagName).toBe('BUTTON');
  });
});