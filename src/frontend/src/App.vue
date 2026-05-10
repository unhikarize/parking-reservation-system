<script setup lang="ts">
import { loginApi } from "@/api/auth";
import { UI_MESSAGES } from "@/constants/messages";
import { toUserFacingErrorMessage } from "@/utils/errorMapper";
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
    errorMessage.value = UI_MESSAGES.REQUIRED_FIELDS;
    return;
  }

  try {
    const response = await loginApi({
      buildingNumber: Number(buildingNumber.value),
      roomNumber: Number(roomNumber.value),
      password: password.value,
    });

    const token = response.token;
    localStorage.setItem("token", token);

    const isFirstLogin = response.user.isFirstLogin;
    if (isFirstLogin) {
      successMessage.value = UI_MESSAGES.FIRST_LOGIN_SUCCESS;
      setTimeout(() => {
        window.location.href = "/change-password";
      }, 1000);
      return;
    }

    successMessage.value = UI_MESSAGES.LOGIN_SUCCESS;

    const role = response.user.role;

    setTimeout(() => {
      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/top";
      }
    }, 1000);
  } catch (error: unknown) {
    errorMessage.value = toUserFacingErrorMessage(error);
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
    <h1>{{ UI_MESSAGES.APP_TITLE }}</h1>
    <h2>{{ UI_MESSAGES.LOGIN_TITLE }}</h2>

    <div style="margin-bottom: 10px">
      <input
        v-model="buildingNumber"
        :placeholder="UI_MESSAGES.BUILDING_PLACEHOLDER"
        type="number"
      />
    </div>

    <div style="margin-bottom: 10px">
      <input
        v-model="roomNumber"
        :placeholder="UI_MESSAGES.ROOM_PLACEHOLDER"
        type="number"
      />
    </div>

    <div style="margin-bottom: 10px">
      <input
        v-model="password"
        type="password"
        :placeholder="UI_MESSAGES.PASSWORD_PLACEHOLDER"
      />
    </div>

    <button @click="login">{{ UI_MESSAGES.LOGIN_BUTTON }}</button>

    <p v-if="successMessage" style="color: green">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage" style="color: red">
      {{ errorMessage }}
    </p>
  </div>
</template>
