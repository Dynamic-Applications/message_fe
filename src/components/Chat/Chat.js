import TopPanel from "./TopPanel/TopPanel";
import ChatInput from "./ChatInput/ChatInput";
import ChatContent from "./ChatContent/ChatContent";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching messages from a server
        setTimeout(() => {
            setMessages([
                { id: 1, text: "Hello!", sender: "user" },
                { id: 2, text: "Hi there!", sender: "bot" },
            ]);
            setLoading(false);
        }, 1000);
    }, [chatId]);

    return (
        <Box
            backgroundColor="bgPrimary.main"
            display="flex"
            flexDirection="column"
            height="100vh"
            width="100vw"
        >
            <TopPanel chatId={chatId} />
            <ChatContent messages={messages} loading={loading} />
            <ChatInput />
        </Box>
    );
}