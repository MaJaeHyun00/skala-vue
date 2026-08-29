<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

// 서버에서 받은 게시글 목록
const items = ref([])

// 입력창 값
const textInput = ref('')

// GET: 게시글 3개 가져오기
const handleRead = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { _limit: 3 },
    })

    items.value = response.data
  } catch (error) {
    console.error('GET 실패:', error)
  }
}

// POST: 입력한 제목으로 게시글 추가
const handleCreate = async () => {
  if (!textInput.value.trim()) {
    return
  }

  try {
    const payload = {
      title: textInput.value,
      body: 'Day 5 Axios 실습 내용',
      userId: 1,
    }

    const response = await axios.post(BASE_URL, payload)

    // 서버 응답을 화면 목록의 맨 앞에 추가
    items.value.unshift(response.data)
    textInput.value = ''
  } catch (error) {
    console.error('POST 실패:', error)
  }
}

// PUT: 선택한 게시글 제목 수정
const handleUpdate = async (id) => {
  try {
    const editPayload = {
      title: '✨ Axios로 수정한 제목',
      body: '수정 완료',
      userId: 1,
    }

    const response = await axios.put(`${BASE_URL}/${id}`, editPayload)

    const index = items.value.findIndex((item) => item.id === id)

    if (index !== -1) {
      items.value[index] = response.data
    }
  } catch (error) {
    console.error('PUT 실패:', error)
  }
}

// DELETE: 선택한 게시글을 화면에서 삭제
const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)

    items.value = items.value.filter((item) => item.id !== id)
  } catch (error) {
    console.error('DELETE 실패:', error)
  }
}

// 화면을 처음 열면 자동으로 GET 요청
onMounted(() => {
  handleRead()
})
</script>

<template>
  <section class="axios-json">
    <h2>📝 Axios JSON CRUD 실습</h2>
    <p class="description">JSONPlaceholder API에서 게시글 데이터를 가져옵니다.</p>

    <div class="input-zone">
      <input v-model="textInput" placeholder="저장할 게시글 제목을 입력하세요" />
      <button class="btn-post" @click="handleCreate">POST 추가</button>
    </div>

    <ul class="item-list">
      <li v-for="item in items" :key="item.id" class="item-card">
        <div>
          <span class="id-tag">ID: {{ item.id }}</span>
          <p>{{ item.title }}</p>
        </div>

        <div class="button-group">
          <button class="btn-put" @click="handleUpdate(item.id)">PUT 수정</button>
          <button class="btn-delete" @click="handleDelete(item.id)">DELETE 삭제</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.axios-json {
  padding: 20px;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  background-color: #f8fbff;
}

.axios-json h2 {
  margin-top: 0;
}

.description {
  color: #64748b;
}

.input-zone {
  display: flex;
  gap: 8px;
  margin: 20px 0;
}

.input-zone input {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.button-group {
  display: flex;
  gap: 6px;
}

button {
  padding: 8px 10px;
  border: 0;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.btn-post {
  background-color: #16a34a;
}

.btn-put {
  background-color: #eab308;
}

.btn-delete {
  background-color: #ef4444;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.item-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
}

.item-card p {
  margin: 5px 0 0;
}

.id-tag {
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 600px) {
  .input-zone,
  .item-card {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
