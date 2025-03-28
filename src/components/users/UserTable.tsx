
import { User } from "@/types/user";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  const getRoleBadgeClass = (role: User['role']) => {
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

  const formatRoleDisplay = (role: User['role']): string => {
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

  return (
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
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
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
                        <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                          {formatRoleDisplay(user.role)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                    {formatRoleDisplay(user.role)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(user)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(user.id)}
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
  );
};

export default UserTable;
