SHINY HOME COLLECTION v161 / OBS実用版

■ 3DSだけで配信するとき
OBSのブラウザソース:
https://bk-pk.github.io/pokemon-shiny-home/obs-3ds.html
幅 1920 / 高さ 1080

このブラウザソースを一番上に置きます。
その下に3DSキャプチャ映像を置いてください。

透明窓の位置（1920×1080キャンバス）
・3DS上画面: X=318 / Y=174 / W=762 / H=338
・3DS下画面: X=420 / Y=571 / W=574 / H=251

偽トロ等の1つのキャプチャ画面に上下画面が含まれている場合は、
OBSで同じキャプチャソースを2つ複製し、それぞれクロップして上記位置へ合わせます。

■ 自動更新されるもの
・対象ポケモンの色違い画像
・GAME
・METHOD
・回数
・基本確率
・ひかるおまもり
・記録方式
・厳選条件
・BW2図鑑 あと○匹

SHINY HOME COLLECTIONの普段の厳選カウンターと同じデータを使います。
配信用の別カウンターはありません。

■ 3DSのみ版の仕様
全国図鑑は表示しません。BW2図鑑だけ表示します。

■ 位置確認
obs-3ds.html?debug=1
で透明な上画面・下画面の位置にガイド枠を表示できます。

■ Supabase
v160で supabase_obs_setup.sql を実行済みなら追加SQLは不要です。
未実行なら同梱SQLを一度実行してください。


=== v162 Switch + 3DS 合同OBSレイアウト ===
ブラウザソースURL:
https://bk-pk.github.io/pokemon-shiny-home/obs-dual.html

OBSブラウザソース: 1920 x 1080
このブラウザソースを一番上に置き、その下に Switchキャプチャ、3DS上画面、3DS下画面を配置します。
位置合わせ用: obs-dual.html?debug=1

透明窓（1920x1080基準）:
Switch: x=118, y=167, w=782, h=517
3DS上: x=1092, y=170, w=353, h=228
3DS下: x=1113, y=465, w=299, h=210

自動表示:
・Switch GAME / METHOD / 回数 / 色違い画像
・3DS GAME / METHOD / 回数 / 色違い画像
・Switch HUNT INFO（確率・おまもり・条件）
・3DS HUNT INFO（確率・おまもり・記録方式・条件）
・全国図鑑 あと○匹
・BW2図鑑 あと○匹

普段のSHINY HOME COLLECTIONの厳選カウンターを使い、別の配信用カウンターは作りません。
