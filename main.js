$(function () {
  //colorsオブジェクトを作成し、七色の各色をキーとし、別名を値として設定する
  const colors = {
    "赤": ["赤", "あか", "赤色", "あかいろ", "レッド", "red", "Red", "RED"],
    "橙": ["橙", "だいだい", "橙色", "だいだいいろ", "オレンジ", "orange", "Orange", "ORANGE"],
    "黄": ["黄", "き", "黄色", "きいろ", "イエロー", "yellow", "Yellow", "YELLOW"],
    "緑": ["緑", "みどり", "緑色", "みどりいろ", "グリーン", "green", "Green", "GREEN"],
    "青": ["青", "あお", "青色", "あおいろ", "ブルー", "blue", "Blue", "BLUE"],
    "藍": ["藍", "あい", "藍色", "あいいろ", "インディゴ", "indigo", "Indigo", "INDIGO"],
    "紫": ["紫", "むらさき", "紫色", "むらさきいろ", "パープル", "purple", "Purple", "PURPLE"]
  };

  //解答した色を保管しておく変数textPoolを宣言
  let textPool = [];

  //残りの色数で処理を分岐する関数を定義
  const colorCount = () => {
    switch (textPool.length) {
    case 1:
      $('#countmessage').text('残り6色です。まだまだ始まったばかり');
       break;
    case 2:
       $('#countmessage').text('残り5色です。この調子でいきましょう');
       break;
    case 3:
       $('#countmessage').text('残り4色です。半分正解までもう少し');
      break;
    case 4:
      $('#countmessage').text('残り3色です。折り返し地点を超えましたね！');
      break;
    case 5:
      $('#countmessage').text('残り2色です。そろそろ難しくなる頃合いです・・・');
      break;
    case 6:
      $('#countmessage').text('残り1色です。ここまで来たらあと一息、がんばりましょう！');
      break;
    case 7:
      $('h2, span, #textBox, #color-btn').css('display', 'none');
      $('p').css('display', 'inline');
      break;
    }
  }

  //虹を描画する関数を定義
  const drawRainbow = () => {
    //テキストプールに指定色があり、かつid追加済みでない場合にidを追加（無駄に何度も追加しない）
    if (textPool.includes('赤') && document.getElementById('trueRed') == null) {
      $('#red').append(`<div id='trueRed'></div>`, `<div id='coverRed'></div>`);
      $('#trueRed').animate({opacity: 1}, 1000);
    }
    if (textPool.includes('橙') && document.getElementById('trueOrange') == null) {
      $('#orange').append(`<div id='trueOrange'></div>`, `<div id='coverOrange'></div>`);
      $('#trueOrange').animate({opacity: 1}, 1000);
    }
    if (textPool.includes('黄') && document.getElementById('trueYellow') == null) {
      $('#yellow').append(`<div id='trueYellow'></div>`, `<div id='coverYellow'></div>`);
      $('#trueYellow').animate({opacity: 1}, 1000);
    }
    if (textPool.includes('緑') && document.getElementById('trueGreen') == null) {
      $('#green').append(`<div id='trueGreen'></div>`, `<div id='coverGreen'></div>`);
      $('#trueGreen').animate({opacity: 1}, 1000);
    }
    if (textPool.includes('青') && document.getElementById('trueBlue') == null) {
      $('#blue').append(`<div id='trueBlue'></div>`, `<div id='coverBlue'></div>`);
      $('#trueBlue').animate({opacity: 1}, 1000);
    }
    if (textPool.includes('藍') && document.getElementById('trueIndigo') == null) {
      $('#indigo').append(`<div id='trueIndigo'></div>`, `<div id='coverIndigo'></div>`);
      $('#trueIndigo').animate({opacity: 1}, 1000);
    }
    if (textPool.includes('紫') && document.getElementById('truePurple') == null) {
      $('#purple').append(`<div id='truePurple'></div>`, `<div id='coverPurple'></div>`);
      $('#truePurple').animate({opacity: 1}, 1000);
    }
  }

//ボタンクリックorエンター入力で発生するイベント処理の中身。入力内容を保存し、テキストボックスを空欄にする
  const getTextBox = () => {
    const inputColor = $('[name="textBox"]').val()
    $('[name="textBox"]').val('');

    if (inputColor.trim() === '') {
      $('#message').text('何も入力されていません');
      return;
    }

    //for...in文を用い、colorsオブジェクトのキー名称を定数keyに代入し、プロパティ数と同じ分だけ以降の処理を繰り返す
    for (const key in colors) {
      //colorsからkeyに対応した値を抜き出し、入力内容と一致するか確認する（赤→橙→黄→...紫）
      if (colors[key].includes(inputColor)) {
        //一致した場合、keyが既にtextPoolに追加されているか確認する。重複チェック。
        if (textPool.includes(key)) {
          $('#message').text(`${key}は既に解答されています`);
          break; //textPool追加済みだった場合、解答済みメッセージを表示し、breakで処理を終える
        }
        //重複チェックが問題なければkeyをtextPoolに追加し、正解メッセージを表示
        textPool.push(key);
        console.log(textPool); //確認用
        drawRainbow();
        colorCount();
        $('#message').text(`正解！ "${key}"は虹の色に含まれます`);
        break; //繰り返し処理途中で一致した場合、breakで処理を終える
      } else {
        $('#message').text(`残念！ "${inputColor}"は虹の色に含まれません`);
      }
    }
  }

  //ボタンクリックでイベント処理開始
  $('#color-btn').on('click', getTextBox);

  //エンターキー入力でも同様のイベントを開始
  $('#textBox').on('keydown', function(event) {
    if(event.key === 'Enter') {
      getTextBox();
      return false; //Enterキーが押されると送信処理が発生する為、falseで無効化している
    }
  });
})