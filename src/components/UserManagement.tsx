
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import UserSearchBar from "@/components/users/UserSearchBar";
import UserFormDialog from "@/components/users/UserFormDialog";
import { useUserManagement } from "@/hooks/useUserManagement";

const UserManagement = () => {
  const {
    users,
    searchQuery,
    selectedUser,
    isFormOpen,
    setIsFormOpen,
    handleSearch,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser
  } = useUserManagement();

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
        users={users}
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
