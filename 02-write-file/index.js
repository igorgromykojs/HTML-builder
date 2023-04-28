const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'mynotes.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);
stdout.write('Введите текст!\n');
stdin.on('data', data => {
    const text = data.toString();
    process.exit();
  });
fs.appendFile(
    
    path.join(__dirname, 'mynotes.txt'),
    text,
    err => {
        if (err) throw err;
    }
);

