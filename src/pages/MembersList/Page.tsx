import React, { useState, useEffect } from 'react';
import { Member } from '../../services/memberService';
import './components/memberlist.css';

interface MemberListPageProps {
    members: Member[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAdd: (member: Member) => void;
    selectedMember: Member | null;
    onEditSubmit: (id: number, updatedMember: Member) => void;
}

const MemberListPage: React.FC<MemberListPageProps> = ({
                                                           members,
                                                           onEdit,
                                                           onDelete,
                                                           onAdd,
                                                           selectedMember,
                                                           onEditSubmit,
                                                       }) => {
    const [member, setMember] = useState<Member>(selectedMember || { id: 0, name: '', username: '', description: '', avatarUrl: '' });

    useEffect(() => {
        if (selectedMember) {
            setMember(selectedMember);
        } else {
            setMember({ id: 0, name: '', username: '', description: '', avatarUrl: '' });
        }
    }, [selectedMember]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedMember) {
            onEditSubmit(selectedMember.id, member);
        } else {
            onAdd(member);
        }
        setMember({ id: 0, name: '', username: '', description: '', avatarUrl: '' });
    };

    return (
        <div className="member-list-page">
            <h2>Members</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={member.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="username"
                    value={member.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    type="text"
                    name="description"
                    value={member.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="avatarUrl"
                    value={member.avatarUrl}
                    onChange={handleChange}
                    placeholder="Avatar URL"
                />
                <button type="submit">{selectedMember ? 'Edit' : 'Add'} Member</button>
            </form>
            <ul>
                {members.map((member) => (
                    <li key={member.id}>
                        {member.name} - {member.username}
                        <button onClick={() => onEdit(member.id)}>Edit</button>
                        <button onClick={() => onDelete(member.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberListPage;


// saved data when you decide to delete a user delete everything