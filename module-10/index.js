document.getElementById('submitBtn').addEventListener('click', () => {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    alert(JSON.stringify({ field1: input1.value, field2: input2.value }))
});