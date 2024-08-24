const express = require("express");
const router = express.Router();

// appの代わりにrouterを使う
// また、このルーティングのみにミドルウェアを記述するなら第二引数に指定
router.get('/', middleLogger,  (req, res) => {
    res.send('ユーザー一覧です');
});

router.get('/info', (req, res) => {
    res.send('ユーザー情報です');
});

// /:idで、ランダムidを入力したら、req.params.idで取得できる
router.get("/:id", (req, res) => res.send(`${req.params.id}のユーザー情報を取得しました`));

// ※server.jsにも同様の記述をしているが、もしuserのみミドルウェアを適用するならここに記述する
function middleLogger(req,res,next) {
    console.log(req.originalUrl);
    next();
}

// module.exportsでrouterをどこでも使えるようにする
module.exports = router;