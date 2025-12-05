<template>
  <div class="chat_layout">
    <HeaderBase>
      聊天页面
    </HeaderBase>

    <div class="chat_wrapper">
      <div class="chat_messages" ref="chat_container_ref">
        <div 
          v-for="msg in messages" 
          :key="msg.id"
          class="message_row"
          :class="msg.is_me ? 'row_me' : 'row_other'"
        >
          <div class="avatar_container">
            <el-avatar :size="36" :src="msg.is_me ? self_avatar : other_avatar" />
          </div>

          <div class="message_content">
            <div class="timestamp">{{ msg.create_time }}</div>
            <div class="bubble">
              {{ msg.content }}
            </div>
          </div>
        </div>
      </div>

      <div class="chat_input_area">
        <el-input
          v-model="input_content"
          class="input_box"
          @keyup.enter="handle_send"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          resize="none"
          placeholder="请输入消息..."
        />
        <el-button 
          type="primary" 
          @click="handle_send" 
          class="send_btn"
          :disabled="!input_content.trim()"
        >
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue';
import HeaderBase from '@/components/HeaderBase.vue';
import { ElInput, ElButton, ElAvatar } from 'element-plus';

interface ChatMessage {
  id: number;
  is_me: boolean;
  create_time: string;
  content: string;
}

const input_content = ref('');
const chat_container_ref = ref<HTMLElement | null>(null);

const self_avatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
const other_avatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    is_me: false,
    create_time: '10:00',
    content: 'Testing message'
  },
  {
    id: 2,
    is_me: true,
    create_time: '10:05',
    content: 'Received'
  }
]);

const scroll_to_bottom = async () => {
  await nextTick();
  if (chat_container_ref.value) {
    chat_container_ref.value.scrollTop = chat_container_ref.value.scrollHeight;
  }
};

const handle_send = () => {
  if (!input_content.value.trim()) {
    return;
  }

  const new_msg: ChatMessage = {
    id: Date.now(),
    is_me: true,
    create_time: new Date().toTimeString().slice(0, 5),
    content: input_content.value
  };

  messages.value.push(new_msg);
  input_content.value = '';
  scroll_to_bottom();
};

onMounted(() => {
  scroll_to_bottom();
});

</script>

<style scoped>
.chat_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  padding-top: 12vw;
  padding-bottom: 14vw;
}

.chat_wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
}

.chat_messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px; 
}

.message_row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.row_other {
  flex-direction: row;
}

.row_me {
  flex-direction: row-reverse;
}

.avatar_container {
  flex-shrink: 0;
  margin: 0 6px; 
}

.message_content {
  display: flex;
  flex-direction: column;
  max-width: 75%;
}

.row_other .message_content {
  align-items: flex-start;
}

.row_me .message_content {
  align-items: flex-end;
}

.timestamp {
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.bubble {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-all;
  position: relative;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.row_other .bubble {
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-top-left-radius: 0;
}

.row_me .bubble {
  background-color: #95d475;
  color: #303133;
  border-top-right-radius: 0;
}

.chat_input_area {
  padding: 8px 10px;
  background: #fff;
  border-top: 1px solid #dcdfe6;
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.input_box {
  flex: 1;
}

.send_btn {
  height: 32px; 
}
</style>