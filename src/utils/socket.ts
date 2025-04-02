import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000"; // Update when deploying

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Connected to WebSocket Server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket Server");
        });

        socket.on("connect_error", (err) => {
            console.error("Connection Error:", err);
        });
    }
    return socket;
};

// Ensure socket is always available when needed
export const getSocket = (): Socket => {
    if (!socket) {
        console.warn("Socket not initialized! Initializing now...");
        return initializeSocket();
    }
    return socket;
};
