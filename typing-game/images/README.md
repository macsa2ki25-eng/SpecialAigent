# images/

ポケモン以外のキャラ画像（マイクラなど）を置く場所です。

## 使い方

### ポケモン
ステージ6では PokeAPI から自動で画像を取得します（インターネット接続が必要）。
オフラインで使いたい場合や、自分で用意した画像を優先したい場合は以下に置いてください：

```
images/pokemon/<slug>.png
```

slug は `js/words.js` の `STAGE6_POKEMON` で定義されています。例：
- `images/pokemon/pikachu.png`
- `images/pokemon/charmander.png`
- `images/pokemon/snorlax.png`

PokeAPI が利用できないときは自動でこちらにフォールバックします。

### マイクラ等の追加キャラ
将来ステージを追加する場合は `images/minecraft/` などのサブフォルダを作って画像を置き、
`js/words.js` 内で `img: 'images/minecraft/creeper.png'` のようにパスを指定してください。

## 推奨フォーマット
- PNG（透過推奨）
- 縦横とも 200px 程度
- ファイル名は半角英数（slug）
