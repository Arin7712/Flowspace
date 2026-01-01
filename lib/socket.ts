import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ socket connected:", socket.id);

  const userId = socket.handshake.auth.userId;

  if (userId) {
    socket.join(userId);
    console.log(`👤 joined room: ${userId}`);
  }

  socket.on("disconnect", () => {
    console.log("❌ socket disconnected:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("🚀 Socket server running on port 3001");
});
