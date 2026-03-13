# 駐車場予約システム DB設計

## users（住人）

| カラム名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | bigint PK | ○ | ユーザーID |
| building_number | int | ○ | 号棟 |
| room_number | int | ○ | 部屋番号 |
| name | varchar | ○ | 名前 |
| phone_number | varchar | ○ | 電話番号 |
| password_hash | varchar | ○ | パスワード（ハッシュ） |
| created_at | timestamp | ○ | 作成日時 |
| updated_at | timestamp | ○ | 更新日時 |

### 制約

- UNIQUE(building_number, room_number, phone_number)

### ログインキー

- building_number
- room_number
- phone_number
- password


---

## parking_spaces（駐車スペース）

| カラム名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | bigint PK | ○ | 駐車場ID |
| space_number | varchar | ○ | 駐車場番号 |
| created_at | timestamp | ○ | 作成日時 |

### 制約

- UNIQUE(space_number)


---

## reservations（予約）

| カラム名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | bigint PK | ○ | 予約ID |
| user_id | bigint FK | ○ | 予約者 |
| parking_space_id | bigint FK | ○ | 駐車場 |
| start_time | datetime | ○ | 利用開始 |
| end_time | datetime | ○ | 利用終了 |
| created_at | timestamp | ○ | 作成日時 |
| deleted_at | timestamp | | キャンセル日時（論理削除） |

### 外部キー

- user_id → users.id
- parking_space_id → parking_spaces.id

---

## 予約仕様

### 予約単位

- 30分単位

### 同時予約

- 同一ユーザー **最大2件まで**

### 予約時間

- **制限なし**

### 予約可能期間

- **制限なし**

### キャンセル

- deleted_at に日時を入れることで論理削除

---

## 予約重複防止ロジック

同じ parking_space_id で以下条件の予約が存在する場合は予約不可

```
start_time < existing_end_time
AND
end_time > existing_start_time
AND
deleted_at IS NULL
```