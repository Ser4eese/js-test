import html from './index.html?raw'

describe('Alert с объектом', () => {
  beforeAll(() => {
    document.body.innerHTML = html;
    vi.spyOn(window, 'alert').mockImplementation(() => { });
    require('./index.js');
  });

  test('Кнопка вызывает alert с объектом', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const button = document.getElementById('submitBtn');

    input1.value = 'test1';
    input2.value = 'test2';
    button.click();
    expect(window.alert).toHaveBeenCalledWith(
      JSON.stringify({ field1: 'test1', field2: 'test2' })
    );
  });
});