# 駐車場予約システム DB設計

## users（住人）

| カラム名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | bigint PK | ○ | ユーザーID |
| role | varchar(20) | ○ | USER / ADMIN（DEFAULT 'USER'） |
| building_number | int | ○ | 号棟 |
| room_number | int | ○ | 部屋番号 |
| name | varchar(50) | ○ | 名前 |
| is_first_login | boolean | ○ | 初回ログインフラグ（DEFAULT true） |
| password_hash | varchar(255) | ○ | パスワード（ハッシュ） |
| created_at | timestamptz | ○ | 作成日時 |
| updated_at | timestamptz | ○ | 更新日時 |

### 制約

- UNIQUE(building_number, room_number)

### ログインキー

- building_number
- room_number
- password

---

## parking_spaces（駐車スペース）

| カラム名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | bigint PK | ○ | 駐車場ID |
| space_number | varchar(10) | ○ | 駐車場番号（例：A-1, 来-1） |
| available | boolean | ○ | 利用可能フラグ（DEFAULT true） |
| created_at | timestamptz | ○ | 作成日時 |

### 制約

- UNIQUE(space_number)

---

## reservations（予約）

| カラム名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | bigint PK | ○ | 予約ID |
| user_id | bigint FK | ○ | 予約者 |
| parking_space_id | bigint FK | ○ | 駐車場 |
| car_number | varchar(4) | ○ | 車のナンバー（1〜4桁の数字） |
| start_time | timestamptz | ○ | 利用開始 |
| end_time | timestamptz | ○ | 利用終了 |
| created_at | timestamptz | ○ | 作成日時 |
| deleted_at | timestamptz | | キャンセル日時（論理削除） |

### 外部キー

- user_id → users.id（ON DELETE CASCADE）
- parking_space_id → parking_spaces.id

---

## インデックス

```sql
CREATE INDEX idx_reservations_space_time
ON reservations (parking_space_id, start_time, end_time)
WHERE deleted_at IS NULL;