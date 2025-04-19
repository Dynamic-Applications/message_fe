import ChatsListItem from "./ChatsListItem";
// import { useContext } from "react";
import { useState, useEffect } from "react";
import { StyledList } from "./ChatsList.styled";
// import { UserContext } from "../../../hooks/Context";

export default function ChatsList() {
    // const { user } = useContext(UserContext);
    const [chatsList, setChatsList] = useState([]);

    const subscribeChats = async () => {
        const response = await fetch("/api/chats");
        const data = await response.json();
        setChatsList(data);
    };



    useEffect(() => {
        const unsubscribeChats = subscribeChats();

        return () => {
            unsubscribeChats();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledList>
            {chatsList.map((chatData) => (
                <ChatsListItem key={chatData.id} chatData={chatData} />
            ))}
        </StyledList>
    );
}