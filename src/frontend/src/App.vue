<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

/**
 * 入力値
 */
const buildingNumber = ref("");
const roomNumber = ref("");
const password = ref("");

/**
 * メッセージ
 */
const errorMessage = ref("");
const successMessage = ref("");

/**
 * ログイン処理
 * @returns void
 */
const login = async (): Promise<void> => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!validateLoginFields()) {
    errorMessage.value = "すべての項目を入力してください";
    return;
  }

  try {
    // TODO: URLは環境変数などで管理する
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      buildingNumber: Number(buildingNumber.value),
      roomNumber: Number(roomNumber.value),
      password: password.value,
    });

    const token = response.data.token;
    // token保存
    // TODO: セキュリティを考慮して、localStorage以外の方法も検討する
    localStorage.setItem("token", token);

    const isFirstLogin = response.data.isFirstLogin;
    if (isFirstLogin) {
      successMessage.value = "初回ログイン成功！パスワードを変更してください。";
      setTimeout(() => {
        window.location.href = "/change-password";
      }, 1000);
      return;
    }

    successMessage.value = "ログイン成功！";

    const role = response.data.user.role;

    // 次の画面へ（仮）
    setTimeout(() => {
      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/top";
      }
    }, 1000);
  } catch (error: any) {
    errorMessage.value = "ログインに失敗しました";
  }
};

/**
 * ログイン項目を検証する
 * @returns boolean
 */
const validateLoginFields = (): boolean => {
  if (!buildingNumber.value || !roomNumber.value || !password.value) {
    return false;
  }
  return true;
};
</script>

<template>
  <div style="max-width: 400px; margin: 50px auto">
    <h1>駐車場予約システム</h1>
    <h2>ログイン</h2>

    <div style="margin-bottom: 10px">
      <input v-model="buildingNumber" placeholder="号棟" type="number" />
    </div>

    <div style="margin-bottom: 10px">
      <input v-model="roomNumber" placeholder="部屋番号" type="number" />
    </div>

    <div style="margin-bottom: 10px">
      <input v-model="password" type="password" placeholder="パスワード" />
    </div>

    <button @click="login">ログイン</button>

    <p v-if="successMessage" style="color: green">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage" style="color: red">
      {{ errorMessage }}
    </p>
  </div>
</template>
