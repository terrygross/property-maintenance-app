import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Search, UserPlus, Pencil, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import UserForm from "./UserForm";
import { UserRole } from "@/types/user";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  phone: string;
  photo_url: string;
  role: UserRole;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    title: "Senior Maintenance Technician",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    photo_url: "https://i.pravatar.cc/150?u=john",
    role: "maintenance_tech",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    title: "Maintenance Manager",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    photo_url: "https://i.pravatar.cc/150?u=jane",
    role: "maintenance_manager",
  },
  {
    id: "3",
    first_name: "Robert",
    last_name: "Johnson",
    title: "HVAC Contractor",
    email: "robert.johnson@example.com",
    phone: "555-567-8901",
    photo_url: "https://i.pravatar.cc/150?u=robert",
    role: "contractor",
  },
  {
    id: "4",
    first_name: "Sarah",
    last_name: "Williams",
    title: "Admin",
    email: "sarah.williams@example.com",
    phone: "555-234-5678",
    photo_url: "https://i.pravatar.cc/150?u=sarah",
    role: "admin",
  },
  {
    id: "5",
    first_name: "Michael",
    last_name: "Brown",
    title: "Plumbing Contractor",
    email: "michael.brown@example.com",
    phone: "555-345-6789",
    photo_url: "https://i.pravatar.cc/150?u=michael",
    role: "contractor",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const isDesktop = !useIsMobile();

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

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "maintenance_manager":
        return "bg-blue-100 text-blue-800";
      case "maintenance_tech":
        return "bg-green-100 text-green-800";
      case "contractor":
        return "bg-orange-100 text-orange-800";
      case "reporter":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatRoleDisplay = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "Admin";
      case "maintenance_manager":
        return "Maintenance Manager";
      case "maintenance_tech":
        return "Maintenance Tech";
      case "contractor":
        return "Contractor";
      case "reporter":
        return "Reporter";
      default:
        return role;
    }
  };

  const FormComponent = isDesktop
    ? Dialog
    : Drawer;
  
  const FormTrigger = isDesktop
    ? DialogTrigger
    : DrawerTrigger;
  
  const FormContent = isDesktop
    ? DialogContent
    : DrawerContent;
  
  const FormHeader = isDesktop
    ? DialogHeader
    : DrawerHeader;
  
  const FormTitle = isDesktop
    ? DialogTitle
    : DrawerTitle;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <Button onClick={handleAddUser} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Title</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.photo_url} alt={`${user.first_name} ${user.last_name}`} />
                        <AvatarFallback>
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{`${user.first_name} ${user.last_name}`}</div>
                        <div className="md:hidden text-sm text-muted-foreground">{user.email}</div>
                        <div className="md:hidden text-xs">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                            {formatRoleDisplay(user.role)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                      {formatRoleDisplay(user.role)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <FormComponent open={isFormOpen} onOpenChange={setIsFormOpen}>
        <FormHeader>
          <FormTitle>{selectedUser ? "Edit User" : "Add New User"}</FormTitle>
        </FormHeader>
        <FormContent>
          <UserForm 
            user={selectedUser} 
            onSave={handleSaveUser} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </FormContent>
      </FormComponent>
    </div>
  );
};

export default UserManagement;
