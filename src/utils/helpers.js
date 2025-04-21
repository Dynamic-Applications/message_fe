// import { getAuth } from "firebase/auth";

// export const getOtherPrivateChatMember = (chatData) => {
//     return chatData.data.members.find((id) => id !== getAuth().currentUser.uid);
// };

export const getOtherPrivateChatMember = (userId, chatMembers) => {
    const otherMember = chatMembers.find((member) => member.userId !== userId);
    return otherMember;
};
