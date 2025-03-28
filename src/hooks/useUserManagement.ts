
import { useState } from "react";
import { User } from "@/types/user";
import { MOCK_USERS } from "@/data/mockUsers";
import { useToast } from "@/hooks/use-toast";

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

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
    setUsers(users.filter((user) => user.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
  };

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      toast({
        title: "User updated",
        description: "The user has been updated successfully.",
      });
    } else {
      const newUser = {
        ...user,
        id: String(Date.now()), // Temporary ID for mock data
      };
      setUsers([...users, newUser]);
      toast({
        title: "User created",
        description: "The user has been created successfully.",
      });
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
