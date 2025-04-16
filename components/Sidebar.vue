<template>
    <div class="sidebar">
      <div class="top">
        <div class="user">
          <img src="https://static.bntu.by/bntu/new/staffs/photo_1943_6070b97c928ad81e9df75d6e5c9561b8.jpg">
          <h4>{{ username }}</h4>
        </div>
        <ul>
          <li>Chats</li>
          <li></li>
          <li>Contacts</li>
          <li>Settings</li>
        </ul>
      </div>
      <div class="bottom">
        <h3>MariBe</h3>
        <h4>2025</h4>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
    props: {
    username: String
  }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background: linear-gradient(#5a3d69, #ae22ce);
    color: white;
    padding: 0px 15px 0px 20px;
    height: 100vh;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
  }
  .bottom{
    height: auto;
    margin-left: 15px;
    margin-bottom: 30px;
  }
  .bottom h3{
    font-size: 40px;
    font-weight: 1000;
    margin-bottom: 5px ;
  }
  .bottom h4{
    text-align: none;
    margin: 0px;
  }
  .sidebar ul {
    list-style-type: none;
    padding: 0;
    margin-top: 50px;
    margin-left: 15px;
    font-size: 25px;
    font-weight: 1000;
  }
  .sidebar li {
    margin: 15px 0;
    cursor: pointer;
  }
  .sidebar li:hover {
    text-decoration: underline;
  }
  .sidebar img{
    border-radius: 50%;
    height:70px;
    border: 3px solid black;
  }
  .user{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .user h4{
    text-align: center;
    font-size: 40px;
    font-weight: 1000;
    width: 100%;
  }
  .top{
    margin-top: 40px;
  }
  </style>