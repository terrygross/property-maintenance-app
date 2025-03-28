
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_USERS } from "@/data/mockUsers";
import { User } from "@/types/user";
import UserTable from "@/components/users/UserTable";
import UserSearchBar from "@/components/users/UserSearchBar";
import UserFormDialog from "@/components/users/UserFormDialog";

const UserManagement = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <UserSearchBar 
          searchQuery={searchQuery} 
          onSearch={handleSearch} 
        />
        <Button onClick={handleAddUser} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UserTable 
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <UserFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        selectedUser={selectedUser}
        onSave={handleSaveUser}
        onCancel={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default UserManagement;
