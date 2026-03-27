# 駐車場予約システム 開発環境構築手順（完全版・初心者向け）

本ドキュメントは、本プロジェクトをローカル環境で動かすための手順を
**初学者でも迷わず実施できるレベルで丁寧にまとめたもの**です。

対象環境：Windows（Rancher Desktop + WSL2）

---

# 0. この手順でやること

最終的に以下の状態を作ります。

* Node.jsが使える
* Docker（Rancher Desktop）が使える
* PostgreSQLが起動している
* DBに接続できる
* Prismaが動く
* 開発の準備が完了している

---

# 1. 必要なツール

以下をインストールします。

| ツール             | 用途                    |
| --------------- | --------------------- |
| Node.js         | JavaScript実行環境（npm含む） |
| Rancher Desktop | Docker環境              |
| WSL2            | Linux環境（Dockerの土台）    |
| DBeaver         | DB確認ツール               |
| VSCode          | エディタ                  |

---

# 2. Node.js インストール

## 2.1 ダウンロード

以下からダウンロード
https://nodejs.org/

👉 「LTS」を選択

---

## 2.2 インストール

* ダウンロードしたファイルを実行
* 基本すべて「Next」でOK

---

## 2.3 確認

VSCodeまたはPowerShellで実行：

```bash
node -v
npm -v
```

---

## 2.4 npmエラーが出た場合（重要）

以下のエラーが出る場合：

```text
npm : このシステムではスクリプトの実行が無効になっている
```

---

### 対処方法

① PowerShellを「管理者として実行」
② 以下を実行

```powershell
Set-ExecutionPolicy RemoteSigned
```

③ 「Y」を入力
④ 再度確認

```bash
npm -v
```

---

# 3. WSL2 セットアップ（最重要）

## 3.1 なぜ必要？

DockerはWindows上では直接動かず、
**WSL2というLinux環境の上で動く**ため。

---

## 3.2 既存WSLの確認

```powershell
wsl -l -v
```

---

## 3.3 以下の場合はリセット推奨

* VERSIONが「1」
* エラーが出る
* 動作が怪しい

---

## 3.4 WSLを完全リセット（※データ削除）

```powershell
wsl --shutdown
wsl --unregister Ubuntu
```

---

## 3.5 WSLインストール

```powershell
wsl --install
```

---

## 3.6 再起動（必須）

👉 必ずPCを再起動する

---

## 3.7 Ubuntu初期設定

再起動後、以下を設定：

* ユーザー名（例：user）
* パスワード

---

## 3.8 確認

```powershell
wsl -l -v
```

👉 こうなればOK

```text
NAME      STATE    VERSION
Ubuntu    Running  2
```

---

# 4. Rancher Desktop インストール

## 4.1 ダウンロード

https://rancherdesktop.io/

---

## 4.2 インストール

* ダウンロードしたファイルを実行
* インストール完了まで待つ

---

## 4.3 初回起動時の設定（重要）

### Kubernetes

👉 OFF（チェック外す）

---

### Container Runtime

👉 dockerd（moby）を選択

---

## 4.4 起動完了を待つ

数分かかることあり

---

## 4.5 確認

```bash
docker -v
docker ps
```

エラーが出なければOK

---

# 5. PostgreSQL 起動（Docker）

## 5.1 コンテナ起動

```bash
docker run --name parking-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=parking \
  -p 5432:5432 \
  -d postgres
```

---

## 5.2 確認

```bash
docker ps
```

👉 「parking-db」が表示される

---

# 6. DBeaver インストール

## 6.1 ダウンロード

https://dbeaver.io/

---

## 6.2 インストール

* ダウンロードしたファイルを実行
* デフォルト設定でOK

---

## 6.3 DB接続

### 新規接続 → PostgreSQL選択

---

## 6.4 接続情報

| 項目       | 値         |
| -------- | --------- |
| Host     | localhost |
| Port     | 5432      |
| Database | parking   |
| User     | postgres  |
| Password | password  |

---

## 6.5 接続確認

* 接続成功する
* DBが見える

---

# 7. プロジェクト作成

```bash
mkdir parking-reservation
cd parking-reservation
git init
```

---

# 8. バックエンド作成

```bash
mkdir backend
cd backend
npm init -y
```

---

## 8.1 ライブラリインストール

```bash
npm install express cors dotenv jsonwebtoken bcrypt
npm install -D typescript ts-node-dev @types/node @types/express
```

---

## 8.2 TypeScript初期化

```bash
npx tsc --init
```

---

# 9. Prisma セットアップ

```bash
npm install prisma @prisma/client
npx prisma init
```

---

## 9.1 .env設定

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/parking"
```

---

## 9.2 接続確認

```bash
npx prisma studio
```

---

# 10. フロントエンド作成

```bash
cd ..
npm create vite@latest frontend
cd frontend
npm install
```

---

# 11. VSCode 拡張機能

以下をインストール：

* Prisma
* ESLint
* Prettier
* Thunder Client

---

# 12. 動作確認チェックリスト

すべてOKなら環境構築完了：

* node -v が動く
* npm -v が動く
* wsl -l -v が VERSION 2
* docker ps が動く
* PostgreSQLコンテナが起動している
* DBeaverで接続できる
* prisma studioが開く

---

# 13. よくあるエラー

## npmエラー

→ ExecutionPolicy変更

---

## WSLエラー

→ 再インストール

---

## dockerエラー

→ Rancher起動確認

---

# 14. 今後の流れ

環境構築が終わったら：

1. DB設計（Prisma）
2. ログイン機能
3. 予約機能
4. UI実装

---

# 15. 補足

## Kubernetesについて

今回は使用しない。

理由：

* ローカル開発では不要
* 設定が複雑
* リソース消費が大きい

---

# 16. まとめ

本手順を完了すれば、
**実務レベルの開発環境がローカルに構築される。**

---
