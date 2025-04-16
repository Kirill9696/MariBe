<template>
    <div class="chat-list">
      <h3>Chats</h3>
      <hr>
      <div class="friends">
        <input type="checkbox" id="friends" v-model="onlyFriends">
        <label for="friends">Friends only</label>
      </div>
      <hr>
      <ul v-if="!onlyFriends">
        <li v-for="chat in chats" :key="chat.id" @click="selectChat(chat)">
          <div class="friends">
            <img src="https://static.bntu.by/bntu/new/staffs/photo_1943_6070b97c928ad81e9df75d6e5c9561b8.jpg">
            {{ chat.name }}
          </div>
        </li>
      </ul>
      <ul v-if="onlyFriends">
        <li v-for="chat in filteredChats" :key="chat.id" @click="selectChat(chat)">
          <div class="friends">
            <img src="https://static.bntu.by/bntu/new/staffs/photo_1943_6070b97c928ad81e9df75d6e5c9561b8.jpg">
            {{ chat.name }}
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      onlyFriends: false
    };
  },
    name: "ChatList",
    props: {
      chats: Array,
      friends: Array,
      username: Array
    },
    methods: {
      selectChat(chat) {
        this.$emit("chat-selected", chat);
      },
    },
    computed: {
    filteredChats() {
      const userFriends = this.chats.find(chat => chat.name == this.username).friends;
      return this.chats.filter(chat => userFriends.includes(chat.name) && chat.name !== this.username);
    }
  },
  };
  </script>
  
  <style scoped>
  .friends{
    display: flex;
  }
  .chat-list {
    padding: 15px;
    background-color: #f2f2f2;
    overflow-y: auto;
    height: 100vh;
  }
  .chat-list h3 {
    margin: 0;
    font-size: 18px;
  }
  .chat-list ul {
    list-style-type: none;
    padding: 0;
  }
  .chat-list li {
    padding: 10px;
    cursor: pointer;
  }
  .chat-list li:hover {
    background-color: #e0e0e0;
  }
  .chat-list img{
    border-radius: 50%;
    height: 20px;
    border: 1px solid black;
  }
  .friends{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 5px;
  }
  </style>