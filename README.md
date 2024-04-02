## npm

> https://www.npmjs.com/package/diff-unique-record

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

### Access

- Local: http://localhost:3000
- Demo: https://diff-unique-record-web.vercel.app

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

## Use case

### Output test

私は複雑な計算処理をするWebアプリの開発担当をしています。  
入出力データ共に1000以上のデータを含んだ配列を扱っており、コード修正前後に影響がないかを確認したい場合があります。  
テストコードはありますが、DBのレコードやユーザー入力値などの変数を計算に使うため、テストで100%カバーできるとは限りません。  
実際の生データで、修正前後の計算結果を比較して、意図しない値になっていないかを確認するのが最善と考えています。  
そのデータ比較を行う際に、このWebツールを使うと簡単に変更箇所を確認することができます。  
またnpmパッケージも提供しているので、テストコードの中に組み込むことも可能です。

I am in charge of developing a web application that performs complex computational processing.  
Both input and output data are dealing with arrays containing 1000+ data, and I may want to check if there are any effects before and after code modification.  
We have test code, but since we use variables such as DB records and user input values for calculations, the test may not cover 100% of the data.  
We believe it is best to compare the calculation results before and after the modification with actual raw data to make sure that the values are not unintended.  
This web tool makes it easy to check the changes when comparing the data.  
We also provide an npm package so you can incorporate it into your test code.

### Changed record

ExcelやCSVファイルを使っていて、変更箇所を確認したい場合があります。  
例えば、取引先から提供されたExcelデータを元に作業している途中に、最新データを渡された時などだ。  
最新データを開くと中身がかなり変わっていることもある。例えば、レコード数, カラム, ソートなど。  
データの精度を重視するのに、データを確認しないまま、誤った集計結果を提出したことがある。  
カラムとソート順が同じなら、テキストベースの差分チェックツールを使うのが有効だが、このWebツールではユニークキーの組み合わせで比較しているので、簡単に変更箇所を確認できます。

There are times when you are working with an Excel or CSV file and want to see where changes have been made.  
For example, when you are in the middle of working with Excel data provided by a client and are given the latest data.  
When you open the latest data, the contents may have changed considerably. For example, the number of records, columns, sorting, etc.  
I have submitted incorrect tabulation results without checking the data, even though I value the accuracy of the data.  
If the columns and sort order are the same, a text-based difference checking tool would be useful, but this web tool compares by unique key combinations, so you can easily see the changes.

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

| DiffType | Desc | Default |
| :--- | :--- | :--- |
| added | 新規に追加されたデータ  | True |
| removed | 旧データにしかなく、削除されたデータ | True |
| updated | 新旧で存在するが、更新されたデータ | True |
| unchanged | 新旧で存在し、更新されていないデータ | False |

## Useful Features

### Parse File

"PARSE FILE"ボタンをクリックするとモーダルが開くので、比較したいCSVファイルを選んでください。  
ファイルをストレージに保存したり外部に送信する機能はありません

Click the "PARSE FILE" button to open a modal and select the CSV file you wish to compare.  
No ability to save files to storage or send them externally.
