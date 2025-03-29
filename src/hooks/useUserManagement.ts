
import { useState } from "react";
import { User } from "@/types/user";
import { useAppState } from "@/context/AppStateContext";

export function useUserManagement() {
  const { users, addUser, updateUser, deleteUser } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      updateUser(user);
    } else {
      addUser(user);
    }
    setIsFormOpen(false);
  };

  return {
    users: filteredUsers,
    searchQuery,
    selectedUser,
    isFormOpen,
    setIsFormOpen,
    handleSearch,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser
  };
}
