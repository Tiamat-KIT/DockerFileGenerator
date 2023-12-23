import * as fs from 'fs';
import * as archiver from 'archiver';

function generateDevContainerFile(
  templateFilePath: string,
  userInput: any
): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(templateFilePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // テンプレートから必要な箇所に入力値を埋め込む
      const modifiedData = data.replace('{{PLACEHOLDER}}', userInput);

      // 新しいファイルを作成
      const newFilePath = 'generatedFile.txt';
      fs.writeFile(newFilePath, modifiedData, 'utf-8', (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(newFilePath);
      });
    });
  });
}

function createZipFile(files: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream('output.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 }, // 圧縮レベル
    });

    output.on('close', () => {
      resolve('output.zip');
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    files.forEach((file) => {
      archive.file(file, { name: file });
    });
    archive.finalize();
  });
}

// ユーザーからの入力を受け取る
const userInput = 'userInputValue'; // これはフォームから受け取った値と置き換えるべきです

// テンプレートファイルと入力値を利用してファイルを生成
generateDevContainerFile('template.txt', userInput)
  .then((filePath) => {
    // ファイルをzipにまとめてダウンロード
    return createZipFile([filePath]);
  })
  .then((zipFilePath) => {
    // zipファイルを提供する
    console.log('Download link:', zipFilePath); // ここではリンクを提供する方法を実装する必要があります
  })
  .catch((err) => {
    console.error('Error:', err);
  });
