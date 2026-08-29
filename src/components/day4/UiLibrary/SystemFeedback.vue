<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const downloadProgress = ref(0)
const isDownloading = ref(false)

const confirmDelete = () => {
  ElMessageBox.confirm('이 작업을 수행하면 해당 파일을 영구히 삭제하시겠습니까?', '삭제 확인', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('🗑️ 파일이 안전하게 파쇄되었습니다.')
    })
    .catch(() => {
      ElMessage.info('❌ 삭제 작업이 취소되었습니다.')
    })
}

const startDownload = () => {
  if (isDownloading.value) return

  isDownloading.value = true
  downloadProgress.value = 0

  const timer = setInterval(() => {
    downloadProgress.value += 20

    if (downloadProgress.value >= 100) {
      clearInterval(timer)
      isDownloading.value = false
      ElMessage.success('📥 다운로드 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}
</script>

<template>
  <el-card class="feedback-card" shadow="hover">
    <template #header>
      <span>⚙️ 실습 3. 시스템 피드백 & 프로그레스 인터랙션</span>
    </template>

    <div class="button-group">
      <el-button type="danger" plain @click="confirmDelete"> 🗑️ 서버 파일 삭제 테스트 </el-button>

      <el-button type="primary" :loading="isDownloading" @click="startDownload">
        📥 데이터 동기화 시작
      </el-button>
    </div>

    <el-progress
      :percentage="downloadProgress"
      :status="downloadProgress === 100 ? 'success' : undefined"
    />
  </el-card>
</template>

<style scoped>
.feedback-card {
  max-width: 560px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
</style>
