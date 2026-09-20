SHINY HOME COLLECTION v172 更新方法

1. このフォルダ内のファイルを、GitHubの同じ場所へ上書きします。
   ・index.html
   ・update.html
   ・service-worker.js
   ・v2/index.html
   ・v2/service-worker.js

2. GitHub Pagesへの反映後、次の更新ページを開きます。
   https://bk-pk.github.io/pokemon-shiny-home/update.html

3. 「v172へ更新する」を押します。

修正内容
・PCの保存容量が上限でも、＋1操作を中断しないよう修正
・捕獲、厳選追加、厳選終了も同じ安全保存方式へ修正
・データはIndexedDBと既存のカウンター同期へ引き続き保存
・既存のコレクション、個体情報、画像、回数、同期設定は変更しない

注意
・ブラウザの「サイトデータを削除」は実行しないでください。
・更新ページはアプリのキャッシュだけを解除します。
