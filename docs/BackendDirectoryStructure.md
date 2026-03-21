# バックエンド ディレクトリ構成（クリーンアーキテクチャ）

本プロジェクトでは、責務分離と保守性を重視し、クリーンアーキテクチャをベースとした構成を採用する。

---

## 📁 ディレクトリ構成

```
backend/
  src/
    index.ts

    presentation/
      routes/
      controllers/
      middleware/

    application/
      usecases/
      dto/

    domain/
      entities/
      repositories/

    infrastructure/
      prisma/
      repositories/

    shared/
      utils/
      errors/
```

---

## 🧠 各レイヤーの役割

### ■ presentation（プレゼンテーション層）

外部（クライアント）とのインターフェースを担う層。
Expressと直接やり取りを行う。

#### 役割

* HTTPリクエストの受け取り
* 入力値の受け取り・最低限のバリデーション
* UseCaseの呼び出し
* HTTPレスポンスの返却

#### 構成

```
presentation/
  routes/        # ルーティング定義
  controllers/   # リクエスト処理
  middleware/    # 認証・共通処理
```

---

### ■ application（アプリケーション層）

ビジネスロジックを実装する層。
システムの振る舞い（ユースケース）を定義する。

#### 役割

* 業務ロジックの実装
* ドメインのルールに基づいた処理
* トランザクション制御
* Repositoryを通じたデータ操作

#### 構成

```
application/
  usecases/   # ユースケース単位の処理
  dto/        # データ転送オブジェクト
```

---

### ■ domain（ドメイン層）

システムの本質的なルール・概念を定義する層。
他の層に依存しない最も重要な層。

#### 役割

* Entity（ドメインモデル）の定義
* Repositoryインターフェースの定義
* ビジネスルールの表現

#### 構成

```
domain/
  entities/       # User, Reservationなど
  repositories/   # Repositoryのinterface定義
```

---

### ■ infrastructure（インフラストラクチャ層）

外部技術（DBなど）との接続を担う層。

#### 役割

* データベースアクセス（Prisma）
* Repositoryの具体実装
* 外部サービスとの連携

#### 構成

```
infrastructure/
  prisma/        # Prismaクライアント
  repositories/  # Repository実装
```

---

### ■ shared（共通層）

全レイヤーで共通利用する処理を配置する層。

#### 役割

* 共通ユーティリティ
* エラーハンドリング
* 日付処理など

#### 構成

```
shared/
  utils/   # 共通関数
  errors/  # カスタムエラー
```

---

## 🔁 依存関係（重要）

依存関係は以下の方向のみ許可する。

```
presentation → application → domain
                  ↓
            infrastructure
```

### ルール

* domainは他の層に依存しない
* applicationはdomainに依存する
* infrastructureはdomainのinterfaceを実装する
* presentationはapplicationにのみ依存する

---

## 🔥 設計上の重要ポイント

### ① ビジネスロジックはUseCaseに集約する

* Controllerにはロジックを書かない
* DB操作も直接書かない

---

### ② RepositoryでDBアクセスを抽象化する

* domainでinterface定義
* infrastructureで実装

---

### ③ フレームワーク依存を外側に寄せる

* ExpressやPrismaは内側に持ち込まない
* 変更に強い構造にする

---

### ④ 単一責任を守る

* Controller：入出力のみ
* UseCase：業務処理のみ
* Repository：データ操作のみ

---

## 📌 補足

本構成は以下の特徴を持つ。

* テストしやすい
* 保守性が高い
* 実務に近い構成
* スケーラブル

---
