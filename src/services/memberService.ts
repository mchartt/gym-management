export interface Member {
    id: number;
    name: string;
    username: string;
    description: string;
    avatarUrl: string;
}

let members: Member[] = [
    // Aggiungi qui i tuoi membri fittizi
];

export const getMembers = () => members;

export const addMember = (member: Member) => {
    members.push(member);
};

export const editMember = (id: number, updatedMember: Member) => {
    members = members.map(member => (member.id === id ? updatedMember : member));
};

export const deleteMember = (id: number) => {
    members = members.filter(member => member.id !== id);
};

export const usernameExists = (username: string) => {
    return members.some(member => member.username === username);
};