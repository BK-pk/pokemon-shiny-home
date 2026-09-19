#!/usr/bin/env node
const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const required=[
  'SYNC_CONTRACT_V1',
  'window.requestCollectionAutoSync=queue',
  'window.syncHuntCounterValue=queueCounter',
  'collectionAuto:true',
  'huntAuto:true',
  "cloudId(c){return c.userId+'::collection-auto-v1'}",
  "screenshots:'device-local'"
  ,"let forceFullMobile=false"
  ,"unmark(EDIT_KEY,row.pokemon_id)"
  ,"unmark(EDIT_KEY,id);mark(SYNC_KEY,id,remoteAt)"
  ,"shinyHome2CounterSyncRepair_v162"
];
const missing=required.filter(x=>!html.includes(x));
if(missing.length){
  console.error('同期仕様検査失敗。削除された必須処理:',missing.join(', '));
  process.exit(1);
}
if(html.includes('collection stays manual')||html.includes('コレクション・画像：手動同期のみ')){
  console.error('同期仕様検査失敗。手動同期へ戻す古い指定が残っています。');
  process.exit(1);
}
if(html.includes("forceFullMobile=localStorage.getItem('shinyHome2ForceFullMobile_v1')")){
  console.error('同期仕様検査失敗。スマホ管理画面の永続化が復活しています。');
  process.exit(1);
}
console.log('同期仕様検査OK: コレクション自動同期 / 厳選自動同期 / 画像端末保存');
