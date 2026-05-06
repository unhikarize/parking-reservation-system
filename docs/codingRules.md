# コーディング規約

## 1. 共通ルール

### 1.1 JSDoc

- クラス・関数・メソッドには必ずJSDocを記載する
- 引数・戻り値は必ず明記する
- 戻り値がない場合でも `@returns void` を記載する

例：
/\*\*

- ユーザーを取得する
- @param userId ユーザーID
- @returns ユーザー情報
  \*/

---

### 1.2 命名規則

- 変数・関数：camelCase
- クラス・型：PascalCase
- 定数：UPPER_SNAKE_CASE
- boolean：is / has / can で始める

例：
isActive
hasPermission
canEdit

---

### 1.3 import

- importは絶対パス（エイリアス）を使用する
- 相対パス（../../）は禁止

例：
import { User } from '@/domain/entities/User'

---

### 1.4 フォーマット

- インデント：スペース4
- セミコロン：必須
- シングルクォートを使用
- Prettierで自動整形する

---

### 1.5 型定義

- anyは禁止（やむを得ない場合のみコメントで理由を書く）
- 型は明示する（推論に頼りすぎない）
- interfaceを基本とし、必要に応じてtypeを使用

---

### 1.6 関数

- 1関数1責務
- ネストは最大2〜3階層まで
- 早期returnを使う（ネストを深くしない）

---

### 1.7 エラーハンドリング

- try/catchは必要最小限にする
- catchでは必ずログ出力を行う
- ユーザー向けメッセージと内部エラーを分離する

---

## 2. フロントエンド（Vue + TypeScript）

### 2.1 コンポーネント構成

- Composition APIを使用する
- script setupを使用する
- 1コンポーネント1責務

---

### 2.2 ファイル構成

- components：再利用可能な部品
- pages：画面単位
- composables：ロジックの共通化
- api：API通信処理
- store：状態管理（必要に応じて Pinia など）
- utils：ユーティリティ関数
- types：型定義

> フロントエンドはこのようなシンプルで拡張しやすい構成を基本とする

---

### 2.3 Props / Emits

- Propsは必ず型定義する
- Emitsも型定義する

---

### 2.4 状態管理

- ローカル状態を優先
- グローバル状態は必要最小限（Pinia等）

---

### 2.5 API通信

- axiosはラッパー関数を作成する
- API呼び出しはコンポーネントに直接書かない

---

### 2.6 テンプレート

- ロジックはtemplateに書かない
- v-ifのネストは避ける
- keyは必ず指定する

---

## 3. バックエンド（Node.js + Express + Prisma）

### 3.1 レイヤー構造

- presentation（controller）
- application（useCase）
- domain（entity）
- infrastructure（repository）

依存関係は以下の方向のみ：
presentation → application → domain

---

### 3.2 Controller

- リクエストの受け取りとレスポンス返却のみ
- ビジネスロジックは禁止

---

### 3.3 UseCase

- ビジネスロジックを記述する
- 外部依存はrepository経由で扱う

---

### 3.4 Repository

- DBアクセスのみを担当する
- Prismaはrepository内でのみ使用する

---

### 3.5 DTO

- APIの入出力はDTOで定義する
- entityをそのまま返さない

---

### 3.6 エラーハンドリング

- カスタムエラークラスを使用する
- HTTPステータスコードは定数化する

例：
HttpStatus.OK = 200

---

### 3.7 トランザクション

- 複数テーブル操作は必ずトランザクションを使用する
- 競合が起きる処理（予約など）は排他制御を考慮する

---

### 3.8 ログ

- console.logは禁止（開発時を除く）
- loggerを使用する

---

### 3.9 セキュリティ

- 環境変数は.envで管理する
- JWT_SECRETなどはコードに直接書かない
- バリデーションは必ず実施する

---

## 4. Git運用（推奨）

- mainへの直接pushは禁止
- featureブランチで開発する
- PRを作成してマージする

ブランチ例：
feature/login-api
feature/reservation-create

---

## 5. コメント

- 「何をしているか」ではなく「なぜそうしているか」を書く
- 不要なコメントは書かない

悪い例：
// ユーザーを取得する

良い例：
// 同時予約防止のためトランザクション内で取得する
