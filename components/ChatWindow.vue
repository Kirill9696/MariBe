<template>
  <div class="chat-window dark">
    <div class="receiver">
      <div>
        <h3>{{ chat.name }}</h3>
      </div>
    </div>
    <div class="messages">
      <div v-for="message in chat.messages" :key="message.id" class="message">
        <strong v-if="message.sender === sender" class="sender you">You:</strong>
        <strong v-else class="sender">{{ message.sender }}:</strong>
        {{ message.text }}
      </div>
    </div>
    <div class="send">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..."
        style="background-color: white;" />
      <div>
        <button @click="addFriend"><img src="https://cdn-icons-png.flaticon.com/512/4175/4175032.png" alt=""
            class="go"></button>
      </div>
      <button @click="sendMessage"><img src="https://www.svgrepo.com/show/535600/rocket.svg" alt="" class="go"></button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChatWindow",
  props: {
    chat: Object,
    sender: String,
    socket: Object,
    friends: Array
  },
  data() {
    return {
      newMessage: "",
      friend: false
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.chat.messages.push({
          id: Date.now(),
          sender: "You",
          text: this.newMessage,
        });
        this.socket.emit('chat message', { sender: this.sender, text: this.newMessage, receiver: this.chat.name });
        this.newMessage = "";
      }
    },
    async addFriend() {
      const response = await $fetch('/api/messages/', {
        method: 'PATCH',
        body: {
          action: 'add',
          name: this.sender,
          friends: this.chat.name
        }
      });
      console.log(response);
      this.friend = true
      // Обработка ответа
    },
    async removeFriend() {
      const response = await $fetch('/api/messages/', {
        method: 'PATCH',
        body: {
          action: 'remove',
          name: this.sender,
          friends: this.chat.name
        }
      });
      console.log(response);
      this.friend = false
    }
  },
};
</script>

<style scoped>
.message {
  min-height: 40px;
  height: auto;
  width: auto;
  max-width: 100%;
  background-color: #f5f3f3;
  border-radius: 10px;
  overflow-wrap: anywhere;
  margin: 10px;
  padding: 10px;
  display: block;
}

.sender {
  font-size: 20px;
  color: #5a3d69;
  font-weight: 1000;
}

.you {
  color: #8a25bc
}

.chat-window {
  height: calc(100vh - 140px);
  width: 100%;
}

.chat-window .messages {
  height: 100%;
  overflow-y: auto;
  width: auto;
}

.chat-window input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 10px 0px 10px;
  border-radius: 10px;
}

.receiver {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f2f2f2;
  margin: 0px;
  height: 60px;
}

.receiver h3 {
  font-size: 40px;
  font-weight: 1000;
}

.send {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.send button {
  width: 37.6px;
  height: 37.6px;
  border: 1px solid #ccc;
  background-color: #ae22ce;
  margin: 10px 10px 0px 0px;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
}

.go {
  height: 18px;
  margin: auto;
}
</style>