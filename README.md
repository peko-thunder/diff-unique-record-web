## Getting Started

### Environment

- Node: 20.10.0

### Install

```bash
npm install
```

### Start

```bash
npm run dev
```

Access to http://localhost:3000

Sample Site: https://diff-unique-record-web.vercel.app

## What is this

Unique Recordとは、キーの組み合わせによるユニークなデータです。  
このユニークなデータ配列を新旧で比較したい場面が多々あります。  
例えば、コード変更前後の出力データが同じか確認したい時です。  
テストコードに書かれたデータより、生のデータを使って検証したい時に使っています。  
他には、出力したCSVファイルの更新箇所を確認したい時にも有効です。

Unique record is unique data by combination key.  
There are many situations where I want to compare old and new versions of this unique data array.  
For example, when I want to check if the output data is the same before and after by code change.  
I use this when I want to verify using raw data rather than data written in test code.  
Other times, it is useful to check the updated part of the output CSV file.

## How to use

### 1. Input Data

新旧のテキストエリアにオブジェクト配列を文字列で入力してください。  
"SAMPLE"ボタンをクリックするとサンプルデータが設定されます。

Input the object array as a string in the old and new text areas.  
Click the "SAMPLE" button to set the sample data.

## 2. Select Unique Key

ユニークキーの組み合わせを選択してください。  
新旧のデータで共通するキーをセレクトボックスで選択できます。

Please select combination of unique keys.  
You can select keys that are common to both old and new data in the select box.

## 3. Select Diff Type

表示したい差分タイプを選択してください。  
データが多い場合のフィルタリングに使ってください。

Select the difference type you wish to view.  
Use this to filter when you have a lot of data.

- added: 新規に追加されたデータ
- removed: 旧データにしかなく、削除されたデータ
- updated: 新旧で存在するが、更新されたデータ
- unchanged: 新旧で存在し、更新されていないデータ

## Useful Features

### Parse File

"PARSE FILE"ボタンをクリックするとモーダルが開くので、比較したいCSVファイルを選んでください。  
ファイルをストレージに保存したり外部に送信する機能はありません

Click the "PARSE FILE" button to open a modal and select the CSV file you wish to compare.  
No ability to save files to storage or send them externally.
