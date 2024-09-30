const btn = document.getElementById('color-btn');
const message = document.getElementById('message');
const clearMessage = document.getElementById('clearmessage')
const clearRed = document.getElementById('red');
const coverRed = document.getElementById('red2');
const clearOrange = document.getElementById('orange');
const coverOrange = document.getElementById('orange2');
const clearYellow = document.getElementById('yellow');
const coverYellow = document.getElementById('yellow2');
const clearGreen = document.getElementById('green');
const coverGreen = document.getElementById('green2');
const clearBlue = document.getElementById('blue');
const coverBlue = document.getElementById('blue2');
const clearIndigo = document.getElementById('indigo');
const coverIndigo = document.getElementById('indigo2');
const clearPurple = document.getElementById('purple');
const coverPurple = document.getElementById('purple2');

const answer = ['赤', '橙', '黄', '緑', '青', '藍', '紫'];
const nearRed = ['あか','あかいろ', '赤色', 'red', 'Red', 'RED', 'レッド'];
const nearOrange = ['だいだい', 'だいだいいろ', '橙色', 'orange', 'Orange', 'ORANGE', 'オレンジ'];
const nearYellow = ['き', 'きいろ', '黄色', 'yellow', 'Yellow', 'YELLOW', 'イエロー'];
const nearGreen = ['みどり', 'みどりいろ', '緑色', 'green', 'Green', 'GREEN', 'グリーン'];
const nearBlue = ['あお', 'あおいろ', '青色', 'blue', 'Blue', 'BLUE', 'ブルー'];
const nearIndigo = ['あい', 'あいいろ', '藍色', 'indigo', 'Indigo', 'INDIGO', 'インディゴ'];
const nearPurple = ['むらさき', 'むらさきいろ', '紫色', 'purple', 'Purple', 'PURPLE', 'パープル'];
let textPool = [];

//ボタンを押すとイベント処理
btn.addEventListener('click', () => {
//入力内容に応じて虹を描画する関数を定義
const drowRainbow = () => {
  switch (text) {
    case '赤':
      clearRed.classList.add('trueRed');
      coverRed.classList.add('coverRed');
      break;
    case '橙':
      clearOrange.classList.add('trueOrange');
      coverOrange.classList.add('coverOrange');
      break;
    case '黄':
      clearYellow.classList.add('trueYellow');
      coverYellow.classList.add('coverYellow');
      break;
    case '緑':
      clearGreen.classList.add('trueGreen');
      coverGreen.classList.add('coverGreen');
      break;
    case '青':
      clearBlue.classList.add('trueBlue');
      coverBlue.classList.add('coverBlue');
      break;
    case '藍':
      clearIndigo.classList.add('trueIndigo');
      coverIndigo.classList.add('coverIndigo');
      break;
    case '紫':
      clearPurple.classList.add('truePurple');
      coverPurple.classList.add('coverPurple');
      break;
  }
}

  //タイマー機能用の変数を宣言
  let time = 60;

  //テキストボックスの内容を取得
  let text = document.forms.colorForm.textBox.value;
  //テキストボックスを空にする
  let textLog = document.forms.colorForm.textBox;
  textLog.value = '';  
  console.log(text);//確認用：入力内容を表示

  //入力内容が空の場合、エラーメッセージを表示
  if (text.trim() === '') {
    message.textContent = ('何か入力してください');
    return;
  }

  //近しい表現での入力を正解扱いにする為、入力内容がnear系の配列に含まれる場合は正解表現に変換する
  if (nearRed.includes(text)) {
    text = '赤';
    console.log('入力内容を赤に変換しました');//確認用
  }
  if (nearOrange.includes(text)) {
    text = '橙';
    console.log('入力内容を橙に変換しました');//確認用
  }
  if (nearYellow.includes(text)) {
    text = '黄';
    console.log('入力内容を黄に変換しました');//確認用
  }
  if (nearGreen.includes(text)) {
    text = '緑';
    console.log('入力内容を緑に変換しました');//確認用
  }
  if (nearBlue.includes(text)) {
    text = '青';
    console.log('入力内容を青に変換しました');//確認用
  }
  if (nearIndigo.includes(text)) {
    text = '藍';
    console.log('入力内容を藍に変換しました');//確認用
  }
  if (nearPurple.includes(text)) {
    text = '紫';
    console.log('入力内容を紫に変換しました');//確認用
  }


  //textPoolと入力内容を比較して、一致するものがあればエラーメッセージ＋入力無効にする
  if (textPool.includes(text)) {
    message.textContent = (text + 'は既に解答されています');
    return;
  }

  //正解内容と入力内容を比較して、一致するものがあればtextPoolに追加。一致しなければ残念メッセージを表示
  if (answer.includes(text)) {
    textPool.push(text);
    //textPoolの要素数をカウントし、7であればゲームクリア演出へ進む。6以下であれば残りの色数を表示＋虹の描画
    if (textPool.length >= 7) {
      message.textContent = ('お見事！　虹の七色をすべて答えられました！') ;
      drowRainbow(text);
      btn.style.display = 'none';
      clearMessage.style.display = 'inline';

      //クリア演出。赤と白の文字色変更とタイマーを利用し、点滅させて目立たせる
      const id = setInterval(() => {
        time--;
        console.log(time);//確認用
        clearMessage.style.color = 'white';

        setTimeout(() => {
          clearMessage.style.color = 'red';
        }, 500);

        if(time <= 0) {
          clearInterval(id);
        }
      }, 1000);
    }
    else {
      message.textContent = ('正解！　あと'+ (7 - textPool.length) +'色答えたらクリアです！');
      console.log(textPool);//確認用：textPoolの中身を表示
      drowRainbow(text);
    }
  }
  else {
    message.textContent = ('残念…' + text + 'は含まれません');
  }
})