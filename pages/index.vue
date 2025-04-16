<template>
    <form @submit.prevent="handleConnect()" v-if="!isLogged">
        <div class="login">
            <div class="text">
                <h3>MariBe</h3>
                <input type="text" name="" id="" placeholder="Имя" v-model="username" class="item">
                <button class="btn item" type="submit" @click="getUsers()">Войти</button>
            </div>
        </div>
    </form>
    <div class="app" v-if="isLogged">
        <Sidebar :username="username" />
        <div class="content">
            <ChatList :chats="chats" :friends="friends" :username="username" @chat-selected="setSelectedChat" />
            <ChatWindow v-if="selectedChat" :chat="selectedChat" :sender="username" :socket="socket"
                :friend="friend" />
        </div>
    </div>
</template>

<script>
import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar.vue";
import ChatList from "../components/ChatList.vue";
import ChatWindow from "../components/ChatWindow.vue";

export default {
    name: "App",
    components: {
        Sidebar,
        ChatList,
        ChatWindow,
    },
    data() {
        return {
            chats: null,
            // [
            //     {  name: "Ivan", messages: [] },
            //     {  name: "Kirill", messages: [] },
            //     {  name: "Masha", messages: [] },
            // ],
            selectedChat: null,
            username: '',
            isLogged: false,
            socket: null,
            friends: [],
            friend: null
        };
    },
    methods: {
        getFriends() {
            let user = this.chats.find(chat => chat.name == this.username);
            let newFriends = [];
            if (user) {
                newFriends = user.friends
            }
            this.friends = newFriends
            console.log(this.friends)
        },
        get() {
            console.log(this.friends)
        },

        async getUsers() {
            let response = await $fetch(`/api/messages/`);
            this.chats = response;
            console.log(this.chats);
            this.getFriends()
        },
        setSelectedChat(chat) {
            this.selectedChat = chat;
            this.loadMessages();
        },
        async loadMessages() {
            let { data } = await useFetch(`/api/messages/${this.username}?sender=${this.selectedChat.name}`);
            this.selectedChat.messages = data;
        },
        handleConnect() {
            if (this.username.length > 0) {
                const toast = useToast();
                this.isLogged = true;
                this.socket = io("ws://localhost:3000");
                this.socket.emit('logged_in', { username: this.username });
                console.log('я работаю');
                this.socket.on('chat message', (data) => {
                    this.chats.find((chat) => chat.name === data.sender).messages.push({ text: data.text, sender: data.sender, receiver: data.receiver });
                    toast.add({ title: data.text })
                });
            }
        }
    },
};
</script>

<style>
body {
    margin: 0px;
}

.app {
    display: flex;
}

* {
    font-family: 'Big Shoulders Stencil';
}

.content {
    flex: 1;
    display: flex;
}

.login {
    display: flex;
    justify-content: center;
    margin: 50px;
}

.text {
    width: 200px;
    border: 2px solid #ae22ce;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

.text h3 {
    text-align: center;
}

.item {
    width: 100%;
    height: 30px;
    border-radius: 20px;
    text-align: center;
}

textarea {
    height: 100%;
    max-width: 100%;
}

.btn {
    display: inline-block;
    padding: .75rem 1.25rem;
    border-radius: 10rem;
    color: #ffffff;
    background-color: #000000;
    font-size: 1rem;
    letter-spacing: .15rem;
    position: relative;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;
    height: auto;
}
</style>