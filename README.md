ここに載せる
---
http://doc.excale.net/getting_started/getting_started_with_node.html

参考
---
http://iwa4.hatenablog.com/entry/2013/07/11/135503

追加例
---

db.dictionaries.save({english:"dog",japanese:"犬"})
db.dictionaries.save({english:"cat",japanese:"猫"})


URLアクセス例
---
http://localhost:1337/dictionary/getJapanese/dog

vuforia.excale.net/getJapanese/pen/

excaleへのアップロード
--
tar -czf ../vuforiaapp.tar.gz ./*
