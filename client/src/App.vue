<template>
  <div class="w-full h-full bg-gray-100 p-2">
    <h1 class="text-3xl font-bold text-gray-800">メッセージ送信テスト</h1>
    <div class="my-4 border-2 border-blue-900 rounded p-4">
      <input type="text" v-model="message" />
      <button
        class="inline-block bg-yellow-400 ml-1 rounded px-5 py-1 shadow"
        @click="sendMessage"
      >
        送信
      </button>
    </div>
    <p v-for="(message, idx) in messages" :key="idx">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import io from "socket.io-client";

@Options({
  components: {}
})
export default class Home extends Vue {
  message = "hello!";

  io = io("http://localhost", {
    transports: ["websocket"]
  });
  socket = this.io.connect();

  sendMessage(): void {
    console.log({ message: this.message });
    this.socket.emit("input_event", this.message);
  }

  mounted(): void {
    this.socket.on("broadcast_event", data => {
      console.log("receive", data);
      this.$store.dispatch("receiveMessage", data);
    });
  }

  get messages(): { message: string }[] {
    return this.$store.getters.messages;
  }

  beforeUnmount(): void {
    this.socket.disconnect();
  }
}
</script>
