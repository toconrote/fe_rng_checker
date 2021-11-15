const GLANCE_OFFSET = 49

var randarr=[];          //乱数計算用配列
var nextarr=[];          //次の乱数表生成用
var mv=8;                //ファルコン法移動力
var prim=0;              //何個目の乱数から始めるか
var maxlen=10000;        //何個の乱数を発生させるか
var vv=[];               //乱数の値
var kouho_vv=[];         //レベルアップ候補乱数
var kouho_vv2=[];        //レベルアップ候補乱数
var search_vv=[];        //現在位置検索にヒットした乱数
var para=["HP","力","技","速さ","守備","魔防","幸運"];   //能力名 表示用
var prvn=["mhp","str","skl","spd","def","mdf","luc"];     //能力名 計算用
var prct=prvn.length;    //能力の数
var srchmax=100;         //現在位置検索表示数
var lvupmax=200;         //目標位置検索表示数

var battle_skill=[];     //戦闘能力
var battle_one_flags=[]; //戦闘フラグ
var battle_in_list=[];   //戦闘検索開始位置
var battle_le_list=[];   //戦闘乱数使用個数
var battle_index;        //戦闘検索乱数位置
var battle_stop;         //戦闘検索停止フラグ
var battle_chf=1;        //戦闘データ変更フラグ
var battle_turn;         //戦闘終了までのターン
var battle_turn_rzl=[];  //戦闘ターン毎の結果

var ud=[
/*
["　↓聖魔↓","","","","","","",""],
["エイリーク",70,40,60,60,30,30,60],
["ゼト",85,50,45,45,40,30,25],
["ギリアム",90,40,30,30,55,20,30],
["フランツ",80,40,40,50,25,20,40],
["モルダ",85,40,50,45,25,25,20],
["ヴァネッサ",50,35,55,60,20,30,50],
["ロス",70,50,35,25,25,20,40],
["ガルシア",80,65,40,20,25,15,40],
["ネイミー",55,45,50,60,15,35,50],
["コーマ",75,40,40,65,25,20,45],
["アスレイ",55,60,50,40,15,60,25],
["ルーテ",45,70,30,45,15,45,45],
["ナターシャ",50,60,25,40,15,55,60],
["ヨシュア",80,30,55,55,20,20,30],
["エフラム",80,55,55,45,35,25,50],
["フォルデ",80,40,50,45,20,25,35],
["カイル",85,50,40,40,25,20,20],
["ターナ",65,45,40,65,20,25,60],
["アメリア",70,40,40,40,30,15,50],
["ヒーニアス",60,40,40,45,20,25,45],
["ジスト",90,45,40,30,35,25,30],
["テティス",85,5,10,70,30,75,80],
["マリカ",75,25,50,55,15,20,50],
["ラーチェル",45,60,45,50,15,50,65],
["ドズラ",85,50,35,40,30,25,30],
["サレフ",50,30,25,40,30,35,40],
["ユアン",50,55,40,35,15,40,50],
["クーガー",85,55,40,45,25,15,35],
["レナック",60,25,45,60,25,25,25],
["デュッセル",85,55,40,30,45,30,20],
["ノール",70,50,40,35,10,45,20],
["ミルラ",130,90,85,65,150,30,30],
["シレーネ",70,35,50,60,20,50,30],
["ケセルダ",85,50,45,45,30,20,20],
["オルソン",80,55,45,40,45,30,25],
["アーヴ",75,45,50,40,20,45,15],
["イシュメア",75,30,60,55,20,25,30],
["セライナ",85,40,55,40,20,25,25],
["グレン",85,40,50,45,25,40,20],
["ヘイデン",70,40,40,45,25,25,40],
["ヴァルター",80,40,55,50,20,20,15],
["ファード",85,55,40,30,45,25,25],
["リオン",85,50,10,10,10,15,30],
["　↓烈火↓","","","","","","",""],
*/
["エリウッド",80,45,50,40,30,35,45],
["ロウエン",90,30,30,30,40,30,50],
["マーカス",65,30,50,25,15,35,30],
["レベッカ",60,40,50,60,15,30,50],
["ドルカス",80,60,40,20,25,15,45],
["バアトル",85,50,35,40,30,25,30],
["ヘクトル",90,60,45,35,50,25,30],
["オズイン",90,40,30,30,55,30,35],
["セーラ",50,50,30,40,15,55,60],
["マシュー",75,30,40,70,25,20,50],
["ギィ",75,30,50,70,15,25,45],
["マリナス",120,0,90,90,30,15,100],
["エルク",65,40,40,50,20,40,30],
["プリシラ",45,40,50,40,15,50,65],
["リン",70,40,60,60,20,30,55],
["ウィル",75,50,50,40,20,25,40],
["ケント",85,40,50,45,25,25,20],
["セイン",80,60,35,40,20,20,35],
["フロリーナ",60,40,50,55,15,35,50],
["レイヴァン",85,55,40,45,25,15,35],
["ルセア",55,60,50,40,10,60,20],
["カナス",70,45,40,35,25,45,25],
["ダーツ",70,65,20,60,20,15,35],
["フィオーラ",70,35,60,50,20,50,30],
["ラガルト",60,25,45,60,25,25,60],
["ニニアン",85,5,5,70,30,70,80],
["イサドラ",75,30,35,50,20,25,45],
["ヒース",80,50,50,45,30,20,20],
["ラス",80,50,40,50,10,25,30],
["ホークアイ",50,40,30,25,20,35,40],
["ガイツ",85,50,30,40,20,20,40],
["ワレス",70,45,40,20,35,35,30],
["ファリナ",75,50,40,45,25,30,45],
["パント",50,30,20,40,30,35,40],
["ルイーズ",60,40,40,40,20,30,30],
["カレル",70,30,50,50,10,15,30],
["ハーケン",80,35,30,40,30,25,20],
["ニノ",55,50,55,60,15,50,45],
["ジャファル",65,15,40,35,30,30,20],
["ヴァイダ",60,45,25,40,25,15,30],
["カアラ",60,25,45,55,10,20,40],
["ニルス",85,5,5,70,30,70,80],
["レナート",60,40,30,35,20,40,15],
["アトス",0,0,0,0,0,0,0]
/*,
["　↓封印↓","","","","","","",""],
["ロイ",80,40,50,40,25,30,60],
["マーカス",60,25,20,25,15,20,20],
["アレン",85,45,40,45,25,10,40],
["ランス",80,40,45,50,20,15,35],
["ウォルト",80,40,50,40,20,10,40],
["ボールス",90,30,30,40,35,10,50],
["マリナス",100,0,50,50,20,5,100],
["エレン",45,50,30,20,5,60,70],
["ディーク",90,40,40,30,20,15,35],
["ワード",75,50,45,20,30,5,45],
["ロット",80,30,30,35,40,15,30],
["シャニー",45,30,55,60,10,25,60],
["チャド",85,50,50,80,25,15,60],
["ルゥ",50,40,50,50,15,30,35],
["クラリーネ",40,30,40,50,10,40,65],
["ルトガー",80,30,60,50,20,20,30],
["サウル",60,40,45,45,15,50,15],
["ドロシー",85,50,45,45,15,15,35],
["スー",55,30,55,65,10,15,50],
["ゼロット",75,25,20,20,30,15,15],
["トレック",85,40,30,35,30,5,50],
["ノア",75,30,45,30,30,10,40],
["アストール",90,35,40,50,20,20,15],
["リリーナ",45,75,20,35,10,35,50],
["ウェンディ",85,40,40,40,30,10,45],
["バース",100,60,25,20,40,2,20],
["オージェ",85,40,30,45,20,15,55],
["フィル",75,25,50,55,15,20,50],
["シン",75,45,50,50,10,15,25],
["ゴンザレス",90,60,15,50,25,5,35],
["ギース",85,50,30,40,20,10,40],
["クレイン",60,35,40,45,15,25,50],
["ティト",60,40,45,55,15,20,40],
["ララム",70,10,5,70,20,30,80],
["エキドナ",75,30,25,30,15,15,20],
["エルフィン",80,5,5,65,25,55,65],
["バアトル",70,40,20,30,20,5,20],
["レイ",55,45,55,40,15,35,15],
["キャス",80,40,45,85,15,20,50],
["ミレディ",75,50,50,45,20,5,25],
["パーシバル",75,30,25,35,20,10,20],
["セシリア",60,35,45,25,20,25,25],
["ソフィーヤ",60,55,40,30,20,55,20],
["イグレーヌ",70,35,25,35,10,5,20],
["ガレット",70,45,25,25,15,5,15],
["ファ",130,90,85,65,30,50,150],
["ヒュウ",75,30,30,45,20,15,25],
["ツァイス",80,60,50,35,25,5,20],
["ダグラス",60,30,30,30,30,5,20],
["ニイメ",25,15,15,15,15,20,5],
["ダヤン",55,20,20,15,10,10,20],
["ユーノ",50,20,35,30,10,10,45],
["ヨーデル",20,30,15,10,10,20,20],
["カレル",210,130,140,140,110,100,120]
*/
];
ud.sort();
if (!localStorage.ch) {
  var ud_obj = {};
  var ud_len = ud.length;
  for (var i=0;i<ud_len;i++){
    ud_obj[ud[i][0]] = {/*
      "成長率": {
        "mhp": ud[i][1],
        "str": ud[i][2],
        "skl": ud[i][3],
        "spd": ud[i][4],
        "def": ud[i][5],
        "mdf": ud[i][6],
        "luc": ud[i][7]
      },*/
      "ch": {
        "chmhp": 0,
        "chstr": 0,
        "chskl": 0,
        "chspd": 0,
        "chdef": 0,
        "chmdf": 0,
        "chluc": 0
      }
    };
  }
} else {
  ud_obj = JSON.parse(localStorage.ch);
}
var chlist = ["上昇しないとダメ", "", "どちらでもよい", "上昇しちゃダメ", "--MAX--"]
var unitindex=1; //初期選択ユニット
var killlist=[]; //瞬殺タイプ
killlist[0]=["ボス以外",50,1];
killlist[1]=["ボス",25,1];
killlist[2]=["ラスボス",25,0];
killlist[3]=["「封印」",0,0];
var skilllist=["なし","大盾","貫通","瞬殺","必的"]; //スキル
var armlist=["通常","２回攻撃","ＨＰ吸収","呪い","毒","石化"]; //武器
function rand_calc(){ //乱数計算
  randarr[0]=(((randarr[1]>>>5)+(randarr[2]<<11))^((randarr[3]<<1)+(randarr[2]>>>15)))&0xffff;
  randarr.unshift((randarr[0]*100)>>>16);randarr.pop();
  return randarr[0];
}
function rand_ins(){ //乱数を配列に入れる
  vv=[];
  for(var i=0;i<maxlen;i++){
    vv.push(rand_calc());
  }
  nextarr[0]=randarr[1];nextarr[1]=randarr[2];nextarr[2]=randarr[3];
  for(i=0;i<32;i++){
    vv.push(rand_calc());
  }
}
function init(){
  displaystyle('bttbl','btw');
  displaystyle('bttbl','btw');
  ch_OnChange(0);
  reset();
  document.getElementById("mainwindow").style.visibility="visible";
}
function next(){ //次の乱数
  var maxlenbak=maxlen;
  maxlen=parseInt(document.getElementById("rand_max").value);
  if(isNaN(maxlen)){ maxlen=maxlenbak; }
  if(maxlen<0){ maxlen=0; }
  if(window.confirm("乱数を"+(prim+maxlenbak)+"個からの"+(maxlen)+"個に変更します。\nよろしいですか？")){
    battle_in_list=[];
    battle_le_list=[];
    battle_chf=1;
    prim+=maxlenbak;
    next_vv();
  }else{
    document.getElementById("rand_max").value=maxlen=maxlenbak;
    document.getElementById("rand_start").value=prim;
  }
}
function next_vv(){ //次の乱数
  document.getElementById("rand_start").value=prim;
  document.getElementById("rand_max").value=maxlen;
  randarr[1]=nextarr[0];randarr[2]=nextarr[1];randarr[3]=nextarr[2];
  rand_ins();
  search_m_OnChange();
  Change_type();
  kouho_next(0);
  change_mv();
  createTable(0);
}
function reset(){ //再設定
  document.getElementById("rand_start").value=prim;
  document.getElementById("rand_max").value=maxlen;
  document.getElementById("view_val").value=prim;
  randarr[1]=0x3671;
  randarr[2]=0x90ea;
  randarr[3]=0x1496;
  for(var i=0;i<prim;i++){ rand_calc(); }
  rand_ins();
  search_m_OnChange();
  Change_type();
  kouho_next(0);
  change_mv();
  createTable(0);
}
function change_max(){ //乱数の個数変更
  var primbak=prim;
  var maxlenbak=maxlen;
  prim=parseInt(document.getElementById("rand_start").value);
  maxlen=parseInt(document.getElementById("rand_max").value);
  if(isNaN(prim)) { prim=primbak; }
  if(isNaN(maxlen)){ maxlen=maxlenbak; }
  if(prim<0){ prim=0; }
  if(maxlen<0){ maxlen=0; }
  if(window.confirm("乱数を"+prim+"個からの"+(maxlen)+"個に変更します。\nよろしいですか？")){
    battle_in_list=[];
    battle_le_list=[];
    battle_chf=1;
    reset();
  }else{
    document.getElementById("rand_max").value=maxlen=maxlenbak;
    document.getElementById("rand_start").value=prim=primbak;
  }
}
function view_val_f(){ //現在位置
  var i;
  var str;
  var index=parseInt(document.getElementById("view_val").value)-prim;
  if(isNaN(index)||index<0){ index=0; }
  ret=[];
  str="乱数値：";
  if(index>maxlen){ index=maxlen;}
  document.getElementById("view_val").value=index+prim;
  for(i=0;i<30;i++){
    ret.push("<span title='("+vv[index+i]+"+"+vv[index+i+1]+")/2="
      +(vv[index+i]+vv[index+i+1]>>1)+"'>"+String(vv[index+i]+100).slice(1)+"</span>");
  }
  str+=ret.join(" ")+"<br>Ｆ法：";
  var fc=0;
  for(i=0;i<30||fc;i++){
    if(vv[index+i]<50&&fc<mv-2){ fc++;}
    else{
      if(vv[index+i]<50){ fc++;}
      str+=fc.toString(36);
      fc=0;
    }
  }
  ret.push(str);
  document.getElementById("view_val_v").innerHTML=str;
  sub_val_f();
  lvup(0,0);
}
function view_val_updown(v){
  document.getElementById("view_val").value-=-v;
  view_val_f();
}
function lv_val_glance(){ //目標位置先読み
  var index;
  index=parseInt(document.getElementById("lv_val").value)-prim;
  if(document.getElementById("glance_ck").checked){
    index+=document.getElementById("glance").selectedIndex-GLANCE_OFFSET;
  }
  return index;
}
function glance_a(){ //先読み反映
  var index;
  index=parseInt(document.getElementById("lv_val").value);
  index+=document.getElementById("glance").selectedIndex-GLANCE_OFFSET;
  document.getElementById("lv_val").value=index;
  document.getElementById("glance_ck").checked=0;
  lv_val_f();
}
function lv_val_f(){ //目標位置
  var i;
  var str;
  ret=[];
  str="乱数値：";
  var index=parseInt(document.getElementById("lv_val").value)-prim;
  if(isNaN(index)||index<0){ index=0; }
  if(index<=0){ index=0; }
  if(index>maxlen){ index=maxlen; }
  document.getElementById("lv_val").value=index+prim;
  index=lv_val_glance();
  for(i=0;i<30;i++){
    if(index+i<0||index+i>maxlen+30){
      ret.push("--");
    } else {
      ret.push("<span title='("+vv[index+i]+"+"+vv[index+i+1]+")/2="
        +(vv[index+i]+vv[index+i+1]>>1)+"'>"+String(vv[index+i]+100).slice(1)+"</span>");
    }
  }
  str+=ret.join(" ")+"<br>Ｆ法： 横：";
  var fc=0;
  for(i=Math.max(-30,Math.min(0,-index));(i<0||fc)&&index+i<maxlen;i++){
    if(vv[index+i]<50&&fc<mv-2){ fc++;}
    else{
      if(vv[index+i]<50){ fc++;}
      if(i<0){ str+=fc.toString(36); }else{ str+="<span class=ov>"+fc.toString(36)+"</span>"; }
      fc=0;
    }
  }
  if(index+i>=maxlen){ str+="<span class=ov>?</span>"; }
  str+=" 縦：";
  fc=0;
  for(i=Math.max(-30,Math.min(0,-index));(i<0||fc)&&index+i<maxlen;i++){
    if(vv[index+i]>=50&&fc<mv-2){ fc++; }
    else{
      if(vv[index+i]>=50){ fc++;}
      if(i<0){ str+=fc.toString(36); }else{ str+="<span class=ov>"+fc.toString(36)+"</span>"; }
      fc=0;
    }
  }
  if(index+i>=maxlen){ str+="<span class=ov>?</span>"; }
  document.getElementById("lv_val_v").innerHTML=str;
  sub_val_f();
  var v=battle_view();
  if(document.getElementById("search_type").selectedIndex==0||document.getElementById("search_type").selectedIndex==3){ v=0; }
  lvup(1,v);
}
function lv_val_updown(v){
  document.getElementById("lv_val").value-=-v;
  lv_val_f();
}
function sub_val_f(){ //差
  var i;
  var val,hfal,vfal;
  var start=parseInt(document.getElementById("view_val").value)-prim;
  var last=lv_val_glance();
  var len=last-start;
  document.getElementById("sub_val").innerHTML=len;
  if(len<0||last>maxlen+30){
    document.getElementById("sub_hfal").innerHTML="　　　";
    document.getElementById("sub_vfal").innerHTML="　　　";
    return false;
  }
  fc=0;
  ft=0;
  lvv=0;
  for(i=0;i<len;i++){
    if(vv[start+i]<50&&fc<mv-2){ fc++;}
    else{
      ft++;fc=0;lvv=i+1;
    }
  }
  document.getElementById("sub_hfal").innerHTML=ft;
  if(i-lvv){ document.getElementById("sub_hfal").innerHTML+="(+"+(i-lvv)+")"; }
    else{ document.getElementById("sub_hfal").innerHTML+="　 　"; }
  fc=0;
  ft=0;
  lvv=0;
  for(i=0;i<len;i++){
    if(vv[start+i]>=50&&fc<mv-2){ fc++; }
    else{
      ft++;fc=0;lvv=i+1;
    }
  }
  document.getElementById("sub_vfal").innerHTML=ft;
  if(i-lvv){ document.getElementById("sub_vfal").innerHTML+="(+"+(i-lvv)+")"; }
    else{ document.getElementById("sub_vfal").innerHTML+="　 　"; }
}
function addw(i,v){
  if(vv[i]<100){
    return "["+v+"] 値："+String(vv[i]+100).slice(1)+" 位置："+(i+prim);
  } else {
    return "---";
  }
}
function lvup(flag,v){ //上昇量表示
  var index,i;
  var sumc=0;
  var sf=0;
  var sf_char=["","* ","** ","x"];
  var up=[];
  index=flag?lv_val_glance():(parseInt(document.getElementById("view_val").value)-prim);
  index+=v;
  var gr=[];
  for(i=0;i<prct;i++){
    gr[i]=parseInt(document.getElementById(prvn[i]).value);
    if(isNaN(gr[i])||gr[i]<0){ gr[i]=0; }
    up[i]=Math.floor(gr[i]/100);
    gr[i]%=100;
    if(vv[index+i]<gr[i]){ up[i]++; }
    sumc+=up[i];
  }
  if(!sumc){
    for(i=0;i<prct;i++){
      if(vv[index+i+7]<gr[i]){
        up[i]++;
        sumc++;
        sf=1;
        break;
      }
    }
  }
  if(!sumc){
    for(i=0;i<prct;i++){
      if(vv[index+i+14]<gr[i]){
        up[i]++;
        sumc++;
        sf=2;
        break;
      }
    }
  }
  if(!sumc){ sf=3; }
  if(flag){
    for(i=0;i<prct;i++){
      document.getElementById(prvn[i]+"pm").innerHTML=up[i]?(sf_char[sf]+"+"+up[i]):"";
      document.getElementById(prvn[i]+"pm").title=addw(index+i,para[i]+"+"+up[i]);
    }
  } else {
    for(i=0;i<prct;i++){
      document.getElementById(prvn[i]+"pl").innerHTML=up[i]?(sf_char[sf]+"+"+up[i]):"";
      document.getElementById(prvn[i]+"pl").title=addw(index+i,para[i]+"+"+up[i]);
    }
  }
}
function ch_OnChange(f){ //ユニット選択変更
  var j=document.getElementById("unitname").selectedIndex;
  document.getElementById("afua").checked=0;
  for(var i=0;i<prct;i++){
    document.getElementById(prvn[i]).value=ud[j][i+1];
  }
  obj = ud_obj[$("#unitname").val()]["ch"]
  for (const prop in obj){
    $("#"+prop).val(chlist[obj[prop]]);
  }
  if(f){ calc_lvlup(); }
}
function createTable(f){ //乱数表表示
  if(f){
    var ranvalue=[];
    var i;
    for(i=0;i<maxlen;i++){
      ranvalue.push((vv[i]<10)?("0"+vv[i]):(vv[i]));
    }
    document.getElementById("randnum").innerHTML=ranvalue.join(" ");
  }else{ document.getElementById("randnum").innerHTML=""; }
}
function ch_all(){ //一括変更
  if(document.getElementById("chall").selectedIndex){
    for(var i=0;i<prct;i++){
      document.getElementById("ch"+prvn[i]).selectedIndex=document.getElementById("chall").selectedIndex-1;
    }
    document.getElementById("chall").selectedIndex=0;
    calc_lvlup();
  }
}
function Change_type(){
  if(document.getElementById("search_type").selectedIndex==0){
    calc_lvlup_lv(1,0,0);
  }else if(document.getElementById("search_type").selectedIndex==1){
      kouho_vv=battle_in_list;
      kouho_show(battle_in_list);
  }else if(document.getElementById("search_type").selectedIndex==2){
    calc_lvlup_lv(0,battle_in_list,battle_le_list);
  }else if(document.getElementById("search_type").selectedIndex==3){
    document.getElementById("kouho").innerHTML="";
  }
  lvup(0,0);
  var v=0;
  if(document.getElementById("search_type").selectedIndex==1||document.getElementById("search_type").selectedIndex==2){ v=battle_view(); }
  lvup(1,v);
}
function calc_lvlup(){ //レベルアップ
  var i;
  if(document.getElementById("search_type").selectedIndex==2){
    calc_lvlup_lv(0,battle_in_list,battle_le_list);
  }else{
    document.getElementById("search_type").selectedIndex=0;
    calc_lvlup_lv(1,0,0);
  }
  lvup(0,0);
  var v=0;
  if(document.getElementById("search_type").selectedIndex==1||document.getElementById("search_type").selectedIndex==2){ v=battle_view(); }
  lvup(1,v);
  obj = ud_obj[$("#unitname").val()]["ch"]
  for (const prop in obj){
    obj[prop] = document.getElementById(prop).selectedIndex
  }
  localStorage.setItem("ch", JSON.stringify(ud_obj))
}
function kouho_show(ret){ //候補表示
  var cnt=ret.length;
  if(cnt>lvupmax){
    ret=ret.slice(0,lvupmax);
    ret.push("...");
  }
  document.getElementById("kouho").innerHTML=((battle_chf&&(document.getElementById("search_type").selectedIndex==1||
  document.getElementById("search_type").selectedIndex==2))?"検索が完了していません ":"")+
  (((cnt==0)?("見つかりませんでした"):("候補数："+cnt+"<br>"+  ret.join(" "))));
}
function afua_change(){ //アフア
  var i;
  for(var i=0;i<prct;i++){
    document.getElementById(prvn[i]).value=afua_plus(document.getElementById(prvn[i]).value);
  }
  calc_lvlup();
}
function afua_plus(i){ //アフア加算
  i=parseInt(i);
  i++;
  if(isNaN(i)){ i=""; }
  else if(i!=""){
    if(document.getElementById("afua").checked){ i+=5; }else{ i-=5; }
    i--;
    if(i<0){ i=0; }
  }
  return i;
}
function calc_lvlup_lv(all,btlcr_vv,cnt_vv){ //レベルアップ候補
  var i,j,k,l;
  var h=0;
  var sumc,sumt;
  var index;
  var f=[];
  var ret=[];
  kouho_vv=[];
  kouho_vv2=[];
  var minup=document.getElementById("growmin").selectedIndex;
  var maxup=document.getElementById("growmax").selectedIndex;
  var diff=[];
  var gr=[];
  j=0;k=0;
  for(i=0;i<prct;i++){
    gr[i]=parseInt(document.getElementById(prvn[i]).value);
    if(isNaN(gr[i])||gr[i]<0){ gr[i]=0; }
    diff[i]=document.getElementById("ch"+prvn[i]).selectedIndex;
    j+=diff[i]?0:1;
    k+=diff[i]==3?1:0;
    h+=Math.floor(Math.max(gr[i]-1,0)/100);
    gr[i]=gr[i]?((gr[i]+99)%100+1):0;
  }
  if(j>maxup){ maxup=document.getElementById("growmax").selectedIndex=j; }
  if(k>prct-minup){ minup=document.getElementById("growmin").selectedIndex=prct-k; }
  if(minup>maxup){ document.getElementById("kouho").innerHTML="条件が矛盾しています";return false;}
  var silent=document.getElementById("silent").checked?1:0;
  l=all?maxlen:btlcr_vv.length;
  for(k=0;k<l;k++){
    i=all?k:btlcr_vv[k]-prim+cnt_vv[k];
    index=0;
    sumc=0;
    sumt=h;
    for(j=0;j<prct;j++){
      index++;
      if(vv[i+j]<gr[j]){
        f[j]=diff[j]==3?0:1;
        sumt++;
        if(diff[j]!=4){ sumc++; }
      }else{
        f[j]=diff[j]==0?0:1;
      }
    }
    if(silent&&!sumt){
      for(j=0;j<prct;j++){
        index++;
        if(vv[i+j+prct]<gr[j]){
          f[j]=diff[j]==3?0:1;
          sumt++;
          if(diff[j]!=4){ sumc++; }
          break;
        }else{
          f[j]=diff[j]==0?0:1;
        }
      }
    }
    if(silent&&!sumt){
      for(j=0;j<prct;j++){
        index++;
        if(vv[i+j+prct*2]<gr[j]){
          f[j]=diff[j]==3?0:1;
          sumt++;
          if(diff[j]!=4){ sumc++; }
          break;
        }else{
          f[j]=diff[j]==0?0:1;
        }
      }
    }
    f[prct]=1;
    for(j=0;j<prct;j++){
      f[prct]&=f[j];
    }
    if(f[prct]&&sumc>=minup&&sumc<=maxup){
      ret.push(all?k+prim:btlcr_vv[k]);
      kouho_vv2[k]=(index<<1)+1;
    }else{
      kouho_vv2[k]=index<<1;
    }
  }
  kouho_vv=ret;
  kouho_show(ret);
}
function kouho_updown(v){ //前後の候補
  v-=0;
  var i;
  var nowval=parseInt(document.getElementById("lv_val").value);
  for(i=0;i<kouho_vv.length;i++){
    if(nowval<=kouho_vv[i]){ break; }
  }
  if(nowval<kouho_vv[i]&&v>0){ i--; }
  i+=v;
  if(i<0&&nowval>kouho_vv[0]){ document.getElementById("lv_val").value=kouho_vv[0];}
  else if(i>=kouho_vv.length&&nowval<kouho_vv[kouho_vv.length-1])
  { document.getElementById("lv_val").value=kouho_vv[kouho_vv.length-1];}
  else if(i<0||i>=kouho_vv.length){ return false;}
  else{ document.getElementById("lv_val").value=kouho_vv[i];}
  lv_val_f();
}
function kouho_next(f){ //現在の次の候補
  var i;
  var nowval=parseInt(document.getElementById("view_val").value);
  for(i=0;i<kouho_vv.length;i++){
    if(nowval<=kouho_vv[i]){ break; }
  }
  if(i<0&&nowval>kouho_vv[0]){ document.getElementById("lv_val").value=kouho_vv[0];}
  else if(i>=kouho_vv.length&&nowval<kouho_vv[kouho_vv.length-1])
  { document.getElementById("lv_val").value=kouho_vv[kouho_vv.length-1]; }
  else if(i<0||i>=kouho_vv.length){ return false; }
  else{ document.getElementById("lv_val").value=kouho_vv[i]; }
  if(f)lv_val_f();
}
function all_show(flag){ //全て表示
  var ret=flag?kouho_vv:search_vv;
  if(flag){ document.getElementById("kouho").innerHTML="候補数："+ret.length+"<br>"+ret.join(" "); }
  else{ document.getElementById("search_m_ret").innerHTML="候補数："+ret.length+"<br>"+ret.join(" "); }
}
function search_mx_OnChange(){ //現在位置検索ボタン
  var lox=document.getElementById("search_ma").value;
  search_vv=[];
  if(lox.length<4){
    document.getElementById("search_m_ret").innerHTML="４文字以上入力してください";
    document.getElementById("search_len").innerHTML="-";
    return false;
  }
  search_m_OnChange();
}
function search_m_OnChange(){ //現在位置検索
  var i,j;
  var cnt;
  var len;
  search_vv=[];
  var lox=document.getElementById("search_ma").value;
  var pl=document.getElementById("inpl").checked?1:0;
  if(!lox){
    document.getElementById("search_m_ret").innerHTML="";
    document.getElementById("search_len").innerHTML=0;
    return false;
  }
  var lox2=[];
  len=lox.length;
  for(i=0;i<len;i++){
    if(lox.charAt(i) == 'o'){ lox2.push(0);}
    else if(lox.charAt(i) == 'c'){ lox2.push(0);}
    else if(lox.charAt(i) == 'a'){ lox2.push(0);}
    else if(lox.charAt(i) == '○'){ lox2.push(0);}
    else if(lox.charAt(i) == '1'){ lox2.push(0);}
    else if(lox.charAt(i) == '4'){ lox2.push(0);}
    else if(lox.charAt(i) == '6'){ lox2.push(0);}
    else if(lox.charAt(i) == 'x'){ lox2.push(1);}
    else if(lox.charAt(i) == '×'){ lox2.push(1);}
    else if(lox.charAt(i) == 'd'){ lox2.push(1);}
    else if(lox.charAt(i) == '8'){ lox2.push(1);}
    else if(lox.charAt(i) == '2'){ lox2.push(1);}
  }
  var ret=[];
  len=lox2.length;
  document.getElementById("search_len").innerHTML=len;
  if(!len){ document.getElementById("search_m_ret").innerHTML="oかxを入力してください";return false; }
  var ret=[];
  for(i=0;i<maxlen;i++){
    for(j=0;j<len;j++){
      if(lox2[0+j]==0) { if(vv[i+j]<50) continue;} else { if(vv[i+j]>=50) continue; }
      break;
    }
    if(j==len){ ret.push(i+prim+pl*len); }
  }
  search_vv=ret;
  cnt=ret.length;
  if(cnt>srchmax){
    ret=ret.slice(0,srchmax);
    ret.push("...");
  }
  document.getElementById("search_m_ret").innerHTML=(cnt==0)?("ありません"):("候補数："+cnt+"<br>"+ret.join(" "));
}
function search_updown(v){ //次の位置
  v-=0;
  var i;
  var nowval=parseInt(document.getElementById("view_val").value);
  for(i=0;i<search_vv.length;i++){
    if(nowval<=search_vv[i]){ break; }
  }
  if(nowval<search_vv[i]&&v>0){ i--; }
  i+=v;
  if(i<0&&nowval>search_vv[0]){ document.getElementById("view_val").value=search_vv[0];}
  else if(i>=search_vv.length&&nowval<search_vv[search_vv.length-1])
  { document.getElementById("view_val").value=search_vv[search_vv.length-1];}
  else if(i<0||i>=search_vv.length){ return false;}
  else{ document.getElementById("view_val").value=search_vv[i];}
  view_val_f();
}
function change_mv(){ //移動力変更
  mv=document.getElementById("mv").selectedIndex+2;
  view_val_f();
  lv_val_f();
}
function battle_view(){ //戦闘結果表示
  var i;
  battle_stop=2;
  var index=lv_val_glance();
  var hp=[];
  hp[0]=document.getElementById("athp").selectedIndex+1;
  hp[1]=document.getElementById("dfhp").selectedIndex+1;
  hp[0]&=0xff;hp[1]&=0xff;
  if(hp[0]>127)hp[0]-=256;
  if(hp[1]>127)hp[1]-=256;
  document.getElementById("at1").innerHTML="";
  document.getElementById("at2").innerHTML="";
  document.getElementById("df1").innerHTML="";
  document.getElementById("df2").innerHTML="";
  document.getElementById("at3").innerHTML="";
  document.getElementById("at4").innerHTML="";
  document.getElementById("df3").innerHTML="";
  document.getElementById("df4").innerHTML="";
  battle_turn=0;
  battle_turn_rzl=[];
  battle_one_flags=[];
  battle_one_flags=[0,0,0,0,0,0,0,0,0,0,0];
  for(i=0;i<=document.getElementById("maxturn").selectedIndex;i++){
    battle_turn_rzl[i]=[];
    battle_attack(document.getElementById("triangle").checked?2:1,index,hp);
    battle_turn_rzl[i].push(0);
    battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
    index+=battle_one_flags[7];
    if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("atarm").selectedIndex==1){
      battle_attack(1,index,hp);
      battle_turn_rzl[i].push(1);
      battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
      index+=battle_one_flags[7];
    }
    if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("hangeki").checked){
      battle_attack(0,index,hp);
      battle_turn_rzl[i].push(2);
      battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
      index+=battle_one_flags[7];
      if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("dfarm").selectedIndex==1){
        battle_attack(0,index,hp);
        battle_turn_rzl[i].push(3);
        battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
        index+=battle_one_flags[7];
      }
    }
    if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("attsuigeki").checked){
      battle_attack(1,index,hp);
      battle_turn_rzl[i].push(4);
      battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
      index+=battle_one_flags[7];
      if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("atarm").selectedIndex==1){
        battle_attack(1,index,hp);
        battle_turn_rzl[i].push(5);
        battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
        index+=battle_one_flags[7];
      }
    }else if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("dftsuigeki").checked){
      battle_attack(0,index,hp);
      battle_turn_rzl[i].push(6);
      battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
      index+=battle_one_flags[7];
      if(!battle_one_flags[8]&&hp[0]&&hp[1]&&document.getElementById("dfarm").selectedIndex==1){
        battle_attack(0,index,hp);
        battle_turn_rzl[i].push(7);
        battle_turn_rzl[i]=battle_turn_rzl[i].concat(battle_one_flags);
        index+=battle_one_flags[7];
      }
    }
    if(index>vv.length){ break; }
    battle_turn_rzl[i]=battle_turn_rzl[i].concat(-1,hp[0],hp[1]);
    battle_turn++;
    if(!hp[1]||!hp[0]||battle_one_flags[8]){ break; }
  }
  battle_show_turn(0);
  document.getElementById("atexp").innerHTML=hp[0]?(battle_one_flags[9]?((hp[1]&0xff)?"未撃破":(battle_one_flags[5]?"瞬殺":"撃破")):1):0;
  document.getElementById("dfexp").innerHTML=hp[1]?(battle_one_flags[10]?((hp[0]&0xff)?"未撃破":(battle_one_flags[5]?"瞬殺":"撃破")):1):0;
  var v=index-lv_val_glance();
  document.getElementById("search_info").innerHTML="使用乱数："+v+"個";
  return v;
}
function battle_show_turn(t){ //戦闘結果文字列
  var i=0;
  if(battle_turn_rzl[t][i*12]==0){ document.getElementById("at1").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("at1").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==1){ document.getElementById("at2").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("at2").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==2){ document.getElementById("df1").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("df1").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==3){ document.getElementById("df2").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("df2").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==4){ document.getElementById("at3").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("at3").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==5){ document.getElementById("at4").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("at4").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==6){ document.getElementById("df3").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("df3").innerHTML="-"; }
  if(battle_turn_rzl[t][i*12]==7){ document.getElementById("df4").innerHTML=battle_show(t,i*12+1);i++; }
  else{ document.getElementById("df4").innerHTML="-"; }
  document.getElementById("atahp").innerHTML=battle_turn_rzl[t][i*12+1]<<24>>24;
  document.getElementById("dfahp").innerHTML=battle_turn_rzl[t][i*12+2]<<24>>24;
  document.getElementById("now_turn").innerHTML=t+1;
  document.getElementById("total_turn").innerHTML="/"+battle_turn;
}
function battle_show(t,n){ //戦闘結果文字列
  var str="";
  if(!battle_turn_rzl[t][n+0]){ str="ミス"; }
  else if(battle_turn_rzl[t][n+2]){ str=battle_turn_rzl[t][n+1]+battle_turn_rzl[t][n+6]?"的":"必的"; }
  else if(battle_turn_rzl[t][n+3]){ str=battle_turn_rzl[t][n+1]+battle_turn_rzl[t][n+6]?"盾":"大盾"; }
  else if(battle_turn_rzl[t][n+4]){ str=battle_turn_rzl[t][n+1]+battle_turn_rzl[t][n+6]?"貫":"貫通"; }
  if(battle_turn_rzl[t][n+0]){
    if(battle_turn_rzl[t][n+5]){ str+=str?"+瞬":(battle_turn_rzl[t][n+6]?"瞬":"瞬殺"); }
    else if(battle_turn_rzl[t][n+1]){ str+=str?"+必":(battle_turn_rzl[t][n+6]?"必":"必殺"); }
    if(battle_turn_rzl[t][n+6]){ str+=str?"+呪":"呪い"; }
  }
  if(!str)str="命中";
  return str;
}
function battle_turn_f(){ //戦闘ターン結果表示
  var t=parseInt(document.getElementById("now_turn").value)-1;
  if(isNaN(t)||t<0){ t=0; }else if(t>=battle_turn){ t=battle_turn-1; }
  battle_show_turn(t);
}
function battle_turn_updown(v){ //戦闘ターン変更
  v*=-1;
  document.getElementById("now_turn").value-=v;
  battle_turn_f();
}
function battle_attack(c,index,hp){ //攻撃
  var flag_meityuu=0;
  var flag_hissatsu=0;
  var flag_hitteki=0;
  var flag_ootate=0;
  var flag_kantsuu=0;
  var flag_shunsatsu=0;
  var flag_noroi=0;
  var skill=[]; //スキル：  0=なし、1=大盾、2=貫通、3=瞬殺、4=必的
  skill[0]=c?document.getElementById("atskill").selectedIndex:document.getElementById("dfskill").selectedIndex;
  skill[1]=c?document.getElementById("dfskill").selectedIndex:document.getElementById("atskill").selectedIndex;
  //武器：  0=通常、1=勇者系、2=リザイア、3=デビルアクス、4=毒系、5=ストーン
  var weapon=c?document.getElementById("atarm").selectedIndex:document.getElementById("dfarm").selectedIndex;
  var killable=c?document.getElementById("dfboss").selectedIndex:document.getElementById("atboss").selectedIndex;
  var kill_level=skill[0]==3?killlist[killable][1]:0;
  killable=killlist[killable][2];
  var att_level=(c?document.getElementById("atlvl").selectedIndex:document.getElementById("dflvl").selectedIndex)+1;
  var att_pow=c?document.getElementById("atdmg").selectedIndex:document.getElementById("dfdmg").selectedIndex;
  var att_def=c?document.getElementById("dfdef").selectedIndex:document.getElementById("atdef").selectedIndex;
  var att_hit=c?document.getElementById("athit").selectedIndex:document.getElementById("dfhit").selectedIndex;
  var att_crt=c?document.getElementById("atcrt").selectedIndex:document.getElementById("dfcrt").selectedIndex;
  var att_luck=c?document.getElementById("atluck").selectedIndex:document.getElementById("dfluck").selectedIndex;
  var cnt=index;
  if(skill[0]==4&&vv[cnt++]<att_level){ flag_hitteki=1;flag_meityuu=1; } //必的
  else if(((vv[cnt++]+vv[cnt++])>>1)<att_hit||c==2){ flag_meityuu=1; } //命中
  if(flag_meityuu){
    if(!flag_hitteki&&skill[1]==1&&weapon!=4&&weapon!=5&&vv[cnt++]<att_level){ flag_ootate=1; } //大盾
    else if(skill[0]==2&&vv[cnt++]<att_level){ flag_kantsuu=1; } //貫通
    if(vv[cnt++]<att_crt||c==2){ //必殺
      flag_hissatsu=1;
      if(killable&&vv[cnt++]<kill_level){ flag_shunsatsu=1; } //瞬殺
    }
    if(weapon==3&&vv[cnt++]<31-att_luck){ flag_noroi=1; } //呪い
    if(flag_kantsuu){ att_pow+=att_def; }
    if(flag_ootate){ att_pow=0; }
    if(flag_hissatsu){ att_pow*=3; }
    if(flag_shunsatsu){ att_pow=127; }
    if(att_pow>127){ att_pow=127; }
    if(flag_noroi){
      if(c){ hp[0]-=Math.min(hp[0],att_pow); }
      else{ hp[1]-=Math.min(hp[1],att_pow); }
    }
    else{
      if(c){
        if(weapon==2){
          hp[0]+=Math.min(hp[1]<<24>>24,att_pow);
          hp[0]=Math.min(hp[0]<<24>>24,document.getElementById("atmhp").selectedIndex+1);
        }
        hp[1]-=Math.min(hp[1],att_pow);
      }else{
        if(weapon==2){
          hp[1]+=Math.min(hp[0]<<24>>24,att_pow);
          hp[1]=Math.min(hp[1]<<24>>24,document.getElementById("dfmhp").selectedIndex+1);
        }
        hp[0]-=Math.min(hp[0],att_pow);
      }
    }
    if(att_pow){ if(c){ battle_one_flags[9]=1; }else{ battle_one_flags[10]=1; } }
  }
  battle_one_flags=[flag_meityuu,flag_hissatsu,flag_hitteki,flag_ootate,flag_kantsuu,flag_shunsatsu,flag_noroi,(cnt-index),((weapon==5&&flag_meityuu)?1:0),battle_one_flags[9],battle_one_flags[10]];
}
function battle_search(){ //戦闘乱数検索
  battle_in_list=[];
  battle_le_list=[];
  battle_index=parseInt(document.getElementById("view_val").value)-prim;
  battle_skill[0]=[];
  battle_skill[0][0]=document.getElementById("atdmg").selectedIndex;
  battle_skill[0][1]=document.getElementById("dfdef").selectedIndex;
  battle_skill[0][2]=document.getElementById("athit").selectedIndex;
  battle_skill[0][3]=document.getElementById("atcrt").selectedIndex;
  battle_skill[0][4]=document.getElementById("atlvl").selectedIndex+1;
  battle_skill[0][5]=document.getElementById("atluck").selectedIndex;
  battle_skill[0][6]=document.getElementById("atskill").selectedIndex;
  battle_skill[0][7]=document.getElementById("atarm").selectedIndex;
  battle_skill[0][8]=document.getElementById("dfboss").selectedIndex;
  battle_skill[0][9]=battle_skill[0][6]==3?killlist[battle_skill[0][8]][1]:0;
  battle_skill[0][8]=killlist[battle_skill[0][8]][2];
  battle_skill[0][10]=document.getElementById("athp").selectedIndex+1;
  battle_skill[0][11]=document.getElementById("atmhp").selectedIndex+1;
  battle_skill[0][12]=document.getElementById("athpmin").selectedIndex;
  battle_skill[0][13]=document.getElementById("athpmax").selectedIndex;
  if(battle_skill[0][13]==127){ battle_skill[0][13]=255; }
  battle_skill[0][14]=document.getElementById("atexp4").checked?0:1;
  battle_skill[0][14]<<=1;
  battle_skill[0][14]+=document.getElementById("atexp3").checked?0:1;
  battle_skill[0][14]<<=1;
  battle_skill[0][14]+=document.getElementById("atexp2").checked?0:1;
  battle_skill[0][14]<<=1;
  battle_skill[0][14]+=document.getElementById("atexp1").checked?0:1;
  battle_skill[0][14]<<=1;
  battle_skill[0][14]+=document.getElementById("atexp0").checked?0:1;
  battle_skill[1]=[];
  battle_skill[1][0]=document.getElementById("dfdmg").selectedIndex;
  battle_skill[1][1]=document.getElementById("atdef").selectedIndex;
  battle_skill[1][2]=document.getElementById("dfhit").selectedIndex;
  battle_skill[1][3]=document.getElementById("dfcrt").selectedIndex;
  battle_skill[1][4]=document.getElementById("dflvl").selectedIndex+1;
  battle_skill[1][5]=document.getElementById("dfluck").selectedIndex;
  battle_skill[1][6]=document.getElementById("dfskill").selectedIndex;
  battle_skill[1][7]=document.getElementById("dfarm").selectedIndex;
  battle_skill[1][8]=document.getElementById("atboss").selectedIndex;
  battle_skill[1][9]=battle_skill[0][6]==3?killlist[battle_skill[0][8]][1]:0;
  battle_skill[1][8]=killlist[battle_skill[1][8]][2];
  battle_skill[1][10]=document.getElementById("dfhp").selectedIndex+1;
  battle_skill[1][11]=document.getElementById("dfmhp").selectedIndex+1;
  battle_skill[1][12]=document.getElementById("dfhpmin").selectedIndex;
  battle_skill[1][13]=document.getElementById("dfhpmax").selectedIndex;
  if(battle_skill[1][13]==127){ battle_skill[1][13]=255; }
  battle_skill[1][14]=document.getElementById("dfexp4").checked?0:1;
  battle_skill[1][14]<<=1;
  battle_skill[1][14]+=document.getElementById("dfexp3").checked?0:1;
  battle_skill[1][14]<<=1;
  battle_skill[1][14]+=document.getElementById("dfexp2").checked?0:1;
  battle_skill[1][14]<<=1;
  battle_skill[1][14]+=document.getElementById("dfexp1").checked?0:1;
  battle_skill[1][14]<<=1;
  battle_skill[1][14]+=document.getElementById("dfexp0").checked?0:1;
  battle_skill[2]=[];
  battle_skill[2][0]=document.getElementById("triangle").checked;
  battle_skill[2][1]=document.getElementById("attsuigeki").checked;
  battle_skill[2][2]=document.getElementById("hangeki").checked;
  battle_skill[2][3]=document.getElementById("dftsuigeki").checked;
  battle_skill[2][4]=document.getElementById("maxturn").selectedIndex+1;
  battle_skill[2][5]=vv.length;
  battle_stop=0;
  if(maxlen){ battle_search_one(); }else{
    battle_chf=0;
    document.getElementById("search_info").innerHTML="完了";
    Change_type();
  }
}
function battle_search_one(){ //戦闘乱数検索１戦闘
  var i;
  var f;
  var hp=[];
  index=battle_index;
  hp[0]=battle_skill[0][10];
  hp[1]=battle_skill[1][10];
  battle_one_flags=[0,0,0,0,0,0,0,0,0,0,0];
  for(i=0;i<battle_skill[2][4];i++){
    battle_attack_s(battle_skill[2][0]?2:1,index,hp);
    index+=battle_one_flags[7];
    if(battle_skill[0][7]==1&&hp[1]&&hp[0]&&!battle_one_flags[8]){
      battle_attack_s(1,index,hp);
      index+=battle_one_flags[7];
    }
    if(battle_skill[2][2]&&hp[1]&&hp[0]&&!battle_one_flags[8]){
      battle_attack_s(0,index,hp);
      index+=battle_one_flags[7];
      if(battle_skill[1][7]==1&&hp[1]&&hp[0]&&!battle_one_flags[8]){
        battle_attack_s(0,index,hp);
        index+=battle_one_flags[7];
      }
    }
    if(battle_skill[2][1]&&hp[1]&&hp[0]&&!battle_one_flags[8]){
      battle_attack_s(1,index,hp);
      index+=battle_one_flags[7];
      if(hp[1]&&hp[0]&&battle_skill[0][7]==1&&!battle_one_flags[8]){
        battle_attack_s(1,index,hp);
        index+=battle_one_flags[7];
      }
    }else if(battle_skill[2][3]&&hp[1]&&hp[0]&&!battle_one_flags[8]){
      battle_attack_s(0,index,hp);
      index+=battle_one_flags[7];
      if(hp[1]&&hp[0]&&battle_skill[1][7]==1&&!battle_one_flags[8]){
        battle_attack_s(0,index,hp);
        index+=battle_one_flags[7];
      }
    }
    if(!hp[1]||!hp[0]||battle_one_flags[8]){ break; }
  }
  hp[0]&=0xff;hp[1]&=0xff;
  f=1;
  if(battle_stop==2){ f=0; }
  if(index>battle_skill[2][5]){ f=0; }
  if(hp[0]<battle_skill[0][12]||hp[0]>battle_skill[0][13]||hp[1]<battle_skill[1][12]||hp[1]>battle_skill[1][13]){ f=0; }
  if(f&&battle_skill[0][14]&(hp[0]?(battle_one_flags[9]?(hp[1]?4:(battle_one_flags[5]?16:8)):2):1)){ f=0; }
  if(f&&battle_skill[1][14]&(hp[1]?(battle_one_flags[10]?(hp[0]?4:(battle_one_flags[5]?16:8)):2):1)){ f=0; }
  if(f){
    battle_in_list.push(battle_index+prim);
    battle_le_list.push(index-battle_index);
  }
  battle_index++;
  if(!battle_stop&&battle_index<maxlen){
    document.getElementById("search_info").innerHTML=battle_index+"/"+maxlen;
    document.getElementById("kouho").innerHTML="候補数："+battle_in_list.length;
    window.setTimeout("battle_search_one()",0);
  }else{
    if(!battle_stop){ battle_chf=0; }
    i=battle_stop;
    if(document.getElementById("search_type").selectedIndex!=2){ document.getElementById("search_type").selectedIndex=1; }
    Change_type();
    document.getElementById("search_info").innerHTML=i?"停止":"完了";
  }
}
function battle_attack_s(c,index,hp){ //攻撃(検索)
  var s=c?0:1;
  var t=c?1:0;
  var flag_meityuu=0;
  var flag_hissatsu=0;
  var flag_hitteki=0;
  var flag_ootate=0;
  var flag_kantsuu=0;
  var flag_shunsatsu=0;
  var flag_noroi=0;
  var att_pow=battle_skill[s][0];
  var cnt=index;
  if(battle_skill[s][6]==4&&vv[cnt++]<battle_skill[s][4]){ flag_hitteki=1;flag_meityuu=1; }
  else if(((vv[cnt++]+vv[cnt++])>>1)<battle_skill[s][2]||c==2){ flag_meityuu=1; }
  if(flag_meityuu){
    if(!flag_hitteki&&battle_skill[t][6]==1&&battle_skill[s][7]!=4&&battle_skill[s][7]!=5&&vv[cnt++]<battle_skill[s][4])
    { flag_ootate=1; }
    else if(battle_skill[s][6]==2&&vv[cnt++]<battle_skill[s][4]){ flag_kantsuu=1; }
    if(vv[cnt++]<battle_skill[s][3]||c==2){
      flag_hissatsu=1;
      if(battle_skill[s][8]&&vv[cnt++]<battle_skill[s][9]){ flag_shunsatsu=1; }
    }
    if(battle_skill[s][7]==3&&vv[cnt++]<31-battle_skill[s][5]){ flag_noroi=1; }
    if(flag_kantsuu){ att_pow+=battle_skill[s][1]; }
    if(flag_ootate){ att_pow=0; }
    if(flag_hissatsu){ att_pow*=3; }
    if(flag_shunsatsu){ att_pow=127; }
    if(att_pow>127){ att_pow=127; }
    if(flag_noroi){ hp[s]-=Math.min(hp[s],att_pow); }
    else{
      if(battle_skill[s][7]==2){ hp[s]+=Math.min(hp[t]<<24>>24,att_pow);hp[s]=Math.min(hp[s]<<24>>24,battle_skill[s][11]); }
      hp[t]-=Math.min(hp[t],att_pow); }
    if(att_pow){ battle_one_flags[s+9]=1; }
  }
  battle_one_flags=[flag_meityuu,flag_hissatsu,flag_hitteki,flag_ootate,flag_kantsuu,flag_shunsatsu,flag_noroi,(cnt-index),((battle_skill[0][7]==5&&flag_meityuu)?1:0),battle_one_flags[9],battle_one_flags[10]];
}
function battle(){
  battle_chf=1;
  var v=battle_view();
  if(document.getElementById("search_type").selectedIndex==0||document.getElementById("search_type").selectedIndex==3){ v=0; }
  lvup(1,v);
}
function battle_ss(f){ //戦闘攻撃順
  if(f==0 && document.getElementById("attsuigeki").checked){ document.getElementById("dftsuigeki").checked=0; }
  else if(f==1 && !document.getElementById("hangeki").checked){ document.getElementById("dftsuigeki").checked=0; }
  else if(f==2 && document.getElementById("dftsuigeki").checked){ document.getElementById("attsuigeki").checked=0;document.getElementById("hangeki").checked=1 }
  battle();
}
function at_df_change(){ //攻防反転
  var temp;
  temp=document.getElementById("athp").selectedIndex;
  document.getElementById("athp").selectedIndex=document.getElementById("dfhp").selectedIndex;
  document.getElementById("dfhp").selectedIndex=temp;
  temp=document.getElementById("atmhp").selectedIndex;
  document.getElementById("atmhp").selectedIndex=document.getElementById("dfmhp").selectedIndex;
  document.getElementById("dfmhp").selectedIndex=temp;
  temp=document.getElementById("atdmg").selectedIndex;
  document.getElementById("atdmg").selectedIndex=document.getElementById("dfdmg").selectedIndex;
  document.getElementById("dfdmg").selectedIndex=temp;
  temp=document.getElementById("atdef").selectedIndex;
  document.getElementById("atdef").selectedIndex=document.getElementById("dfdef").selectedIndex;
  document.getElementById("dfdef").selectedIndex=temp;
  temp=document.getElementById("athit").selectedIndex;
  document.getElementById("athit").selectedIndex=document.getElementById("dfhit").selectedIndex;
  document.getElementById("dfhit").selectedIndex=temp;
  temp=document.getElementById("atcrt").selectedIndex;
  document.getElementById("atcrt").selectedIndex=document.getElementById("dfcrt").selectedIndex;
  document.getElementById("dfcrt").selectedIndex=temp;
  temp=document.getElementById("atlvl").selectedIndex;
  document.getElementById("atlvl").selectedIndex=document.getElementById("dflvl").selectedIndex;
  document.getElementById("dflvl").selectedIndex=temp;
  temp=document.getElementById("atluck").selectedIndex;
  document.getElementById("atluck").selectedIndex=document.getElementById("dfluck").selectedIndex;
  document.getElementById("dfluck").selectedIndex=temp;
  temp=document.getElementById("atskill").selectedIndex;
  document.getElementById("atskill").selectedIndex=document.getElementById("dfskill").selectedIndex;
  document.getElementById("dfskill").selectedIndex=temp;
  temp=document.getElementById("atarm").selectedIndex;
  document.getElementById("atarm").selectedIndex=document.getElementById("dfarm").selectedIndex;
  document.getElementById("dfarm").selectedIndex=temp;
  temp=document.getElementById("atboss").selectedIndex;
  document.getElementById("atboss").selectedIndex=document.getElementById("dfboss").selectedIndex;
  document.getElementById("dfboss").selectedIndex=temp;
  temp=document.getElementById("athpmin").selectedIndex;
  document.getElementById("athpmin").selectedIndex=document.getElementById("dfhpmin").selectedIndex;
  document.getElementById("dfhpmin").selectedIndex=temp;
  temp=document.getElementById("athpmax").selectedIndex;
  document.getElementById("athpmax").selectedIndex=document.getElementById("dfhpmax").selectedIndex;
  document.getElementById("dfhpmax").selectedIndex=temp;
  temp=document.getElementById("atexp0").checked;
  document.getElementById("atexp0").checked=document.getElementById("dfexp0").checked;
  document.getElementById("dfexp0").checked=temp;
  temp=document.getElementById("atexp1").checked;
  document.getElementById("atexp1").checked=document.getElementById("dfexp1").checked;
  document.getElementById("dfexp1").checked=temp;
  temp=document.getElementById("atexp2").checked;
  document.getElementById("atexp2").checked=document.getElementById("dfexp2").checked;
  document.getElementById("dfexp2").checked=temp;
  temp=document.getElementById("atexp3").checked;
  document.getElementById("atexp3").checked=document.getElementById("dfexp3").checked;
  document.getElementById("dfexp3").checked=temp;
  temp=document.getElementById("atexp4").checked;
  document.getElementById("atexp4").checked=document.getElementById("dfexp4").checked;
  document.getElementById("dfexp4").checked=temp;
  document.getElementById("triangle").checked=0;
  temp=document.getElementById("attsuigeki").checked;
  document.getElementById("attsuigeki").checked=document.getElementById("dftsuigeki").checked;
  document.getElementById("dftsuigeki").checked=document.getElementById("hangeki").checked?temp:0;
  battle();
}
function displaystyle(hlay,blay){
  if(document.getElementById(hlay).style.display){
    document.getElementById(hlay).style.display="";
    if(blay){ document.getElementById(blay).value="非表示"; }
  }else{
    document.getElementById(hlay).style.display="none";
    if(blay){ document.getElementById(blay).value="表示"; }
  }
}
function search_thread(){
  var i,j;
  var min,max;
  var l_type;
  var rvv=[];
  var rec=[];
  var t_rec=[];
  var renstr=[];
  var sv=[];
  var rstr=document.getElementById("search_mc").value;
  if(!rstr.length){ document.getElementById("kouho").innerHTML="";return; }
  rstr=rstr.replace(/\r\n/g, '\n');
  rvv=rstr.split("\n");
  for(i=0;i<rvv.length;i++){
    sv[i]=[];
    if(!rvv[i].length){ continue; }
    t_rec=rvv[i].replace(/\/\/.*/, '');
    t_rec=t_rec.replace(/[ 　\t]+/g, '');
    if(t_rec.match(/lvup/i)){
      sv[i].push(2,0,0);
    }else{
      rec=t_rec.split('|');
      for(j=0;j<rec.length;j++){
        if(rec[j].match(/:/)){
          t_rec=rec[j].split(':');
          l_type=1;renstr=t_rec[1];
        } else {
          l_type=0;renstr=rec[j];
        }
        if(!renstr.length){ continue; }
        if(renstr.match('-')){
          t_rec=renstr.split('-');
          min=parseInt(t_rec[0].length==0?0:t_rec[0]);max=parseInt(t_rec[1].length==0?99:t_rec[1]);
        }else{
          min=parseInt(renstr);max=parseInt(renstr);
        }
        if(isNaN(min)||isNaN(max)){
          if(confirm((i+1)+"行目の式の評価に失敗しました\n"+rvv[i]+"\nOK:無視 キャンセル:中断")){
            if(isNaN(min)){ min=0; }if(isNaN(max)){ max=99; }
          }else{ document.getElementById("kouho").innerHTML=(i+1)+"行目の式の評価に失敗しました";return; }
        }
        sv[i].push(l_type,min,max);
      }
    }
  }
  do_search_thread(sv);
  document.getElementById("search_type").selectedIndex=3;
  kouho_show(kouho_vv);
}
function do_search_thread(sv){
  var i,j,k;
  var p;
  var matchflag;
  calc_lvlup_lv(1,0,0);
  kouho_vv=[];
  for(i=0;i<maxlen;i++){
    p=0;
    for(j=0;j<sv.length;j++){
      matchflag=0;
      for(k=0;k*3<sv[j].length;k++){
        if(sv[j][k*3]==2){ //Lv
          if(kouho_vv2[i+j]&1){ matchflag=1; }
          p+=(kouho_vv2[i+j]>>1)-1;
        }else if(sv[j][k*3]==1){ //平均
          if(((vv[i+j+p]+vv[i+j+p+1])>>1)>=sv[j][k*3+1]&&
            ((vv[i+j+p]+vv[i+j+p+1])>>1)<=sv[j][k*3+2]){ matchflag=1; }
        }else{ //範囲
          if(vv[i+j+p]>=sv[j][k*3+1]&&vv[i+j+p]<=sv[j][k*3+2]){ matchflag=1; }
        }
        if(matchflag){ break; }
      }
      if(!sv[j].length){ matchflag=1; }
      if(!matchflag){ break; }
    }
    if(matchflag){ kouho_vv.push(i+prim); }
  }
}
function thread_lvup(){
  var str=document.getElementById("search_mc").value;
  if(str.length&&str.slice(str.length-1)!="\n"){ document.getElementById("search_mc").value+="\n" }
  document.getElementById("search_mc").value+="lvup()";
}
function create_options(id, start, n, selected){
  for(var i=start;i<n+start;i++){
    $("#"+id).append("<option>"+i+"</option>");
  }
  document.getElementById(id).selectedIndex=selected-start;
}
$(function(){
  $("select.autoOptions").each(function(){
    var data = $(this).attr("data-options").split(',')
    create_options($(this).attr("id"), Number(data[0]), Number(data[1]), Number(data[2]))
  });

  var unitSelect = $("#unitname")
  for(var i=0;i<ud.length;i++){
    unitSelect.append("<option>"+ud[i][0]+"</option>");
  }
  unitSelect[0].selectedIndex=unitindex;

  var prtbody = $("#prtable").children("tbody")
  for(var i=0;i<prct;i++){
    $("<tr>").appendTo(prtbody) 
      .append('<td class="view">'+para[i]+'：</td>')
      .append('<td><input type="text" id="'+prvn[i]+'" size="4" onchange="calc_lvlup();" class="view"></td>')
      .append('<td><select id="ch'+prvn[i]+'" onchange="calc_lvlup();"><option selected>上昇しないとダメ</option><option></option><option>どちらでもよい</option><option>上昇しちゃダメ</option><option>--MAX--</option></select></td>')
      .append('<td id="'+prvn[i]+'pl" class="view"></td>')
      .append('<td id="'+prvn[i]+'pm" class="view"></td>')
  }

  var scrollStart = $('section.target').offset().top-40;
  var distance = 0;
  
  $(document).scroll(function(){
    distance = $(this).scrollTop();
     
    if (scrollStart <= distance) {
      $('section.target').addClass('scroll-header');
    } else if (scrollStart >= distance) {
      $('section.target').removeClass('scroll-header');
    }
  });     
});
