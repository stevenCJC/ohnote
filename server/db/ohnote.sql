CREATE TABLE "booklist" ("boxid" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "list" TEXT, "userid" INTEGER);
CREATE TABLE "boxlist" ("userid" INTEGER PRIMARY KEY NOT NULL UNIQUE, "list" TEXT);
CREATE TABLE "log" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "url" TEXT, "domPath" TEXT, "message" TEXT, "extra" TEXT, "type" INTEGER);
CREATE TABLE "note" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "content" TEXT, "bookid" INTEGER, "boxid" INTEGER, "userid" INTEGER);
CREATE TABLE "notelist" ("bookid" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "list" TEXT, "userid" INTEGER, "boxid" INTEGER);
CREATE TABLE "setting" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "key" VARCHAR(255), "text" TEXT, "count" INTEGER);
CREATE TABLE "user" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "name" VARCHAR(64) NOT NULL, "pwd" VARCHAR(255) NOT NULL);
INSERT INTO "booklist" ( "boxid","list","userid" ) VALUES ( '48','[]','1' );
INSERT INTO "boxlist" ( "userid","list" ) VALUES ( '1','[{"name":"react +","id":48,"type":0}]' );
INSERT INTO "user" ( "id","name","pwd" ) VALUES ( '1','steven','202cb962ac59075b964b07152d234b70' );
