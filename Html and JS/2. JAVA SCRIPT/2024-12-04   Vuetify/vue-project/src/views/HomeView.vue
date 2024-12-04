<template>
  <h1>Home</h1>
  <!-- html 取得路由資訊的寫法 -->
  <!-- route (取得資訊) 跟 router (使用路由操作跳頁) 有差 -->
  <h2>● name: {{ $route.name }}</h2>
  <h2>● path: {{ $route.path }}</h2>
  <h2>● apple: {{ $route.meta.apple }}</h2>
</template>
