// nodemonはexpressの構築に必要でホットリロードしてくれる
const express = require("express");
const app = express(); // インスタンス化してexpressを使えるようにする
const userRouter = require("./routes/user"); // パスを指定してルーターを読み込む

const PORT = 3000;

// expressは上から下に読み込まれる
// render関数などはサイクルと止めてしまうので、その前にミドルウェアは読み込む必要があるので、上に記述する

// 下の方で記述したミドルウェアを読み込む
app.use(middleLogger);

// 静的なファイルを読み込むときは、staticを指定しその中にpublicを指定すると、publicフォルダが読み込まれる
app.use(express.static('public'));

// expressで用意されているテンプレートエンジン(dbで用意したデータをhtmlとして表示する)
// 事前にnpm i ejsでダウンロードしておく
app.set("view engine", "ejs");

// 第一引数はwebapiのエンドポイント、ルーティングの設計ができるって感じ
app.get("/", (req,res) => {
    // console.log('hello');
    // res.send('<h1>こんにちは</h1>');
    // res.sendStatus(500);
    // res.status(500).json({msg: "これエラーちゃうん？"});

    // ejs(テンプレートエンジン)を読み込ませる記述
    // 本来ならtextの部分はdbから取得したもの
    res.render("index", { text: "Node.jsとExpress" }); // renderはサイクルがストップする
});

// ※下記のエンドポイントはuserの部分が共通なので、それをまとめるためにroutesフォルダを作成し、user.jsに記述
// app.get('/user', (req, res) => {
//     res.send('ユーザー一覧です');
// });

// app.get('/user/info', (req, res) => {
//     res.send('ユーザー情報です');
// });
// ここまで

// ルーティング
// 第一引数のエンドポイントは共通で使い、後のエンドポイント設計はuserRouterに任せる
app.use('/user', userRouter);

// ミドルウェア（ミドルウェアはサイクルを止めてはいけない）
// 本来は認証などのアルゴリズムが記述されるが今回はログのみ
function middleLogger(req,res,next) {
    console.log(req.originalUrl);
    // next関数は実行を止めない、サイクルを止めない
    next();
}
    

app.listen(PORT, () => console.log("server start"))