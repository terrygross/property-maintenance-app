
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Form
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole } from "@/types/user";
import { userFormSchema, UserFormValues, roleOptions } from "@/components/users/userFormConfig";
import UserPhotoUpload from "@/components/users/UserPhotoUpload";
import UserFormFields from "@/components/users/UserFormFields";

interface UserFormProps {
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
  defaultRole?: UserRole;
}

const UserForm = ({ 
  user, 
  onSave, 
  onCancel,
  defaultRole
}: UserFormProps) => {
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url || "");
  
  // Ensure defaultRole is compatible with form schema
  const safeDefaultRole = defaultRole && 
    ["admin", "maintenance_tech", "maintenance_manager", "reporter"].includes(defaultRole) ? 
    defaultRole as "admin" | "maintenance_tech" | "maintenance_manager" | "reporter" : 
    "maintenance_tech";
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      title: user?.title || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role ? 
        (["admin", "maintenance_tech", "maintenance_manager", "reporter"].includes(user.role) ? 
          user.role as "admin" | "maintenance_tech" | "maintenance_manager" | "reporter" : 
          "maintenance_tech") : 
        safeDefaultRole,
      photo_url: user?.photo_url || "",
    },
  });

  const handlePhotoChange = (url: string) => {
    setPhotoUrl(url);
    form.setValue("photo_url", url);
  };

  const onSubmit = (data: UserFormValues) => {
    const userData: User = {
      id: user?.id || "",
      first_name: data.first_name,
      last_name: data.last_name,
      title: data.title,
      email: data.email,
      phone: data.phone || "",
      role: data.role,
      photo_url: photoUrl || ""
    };
    
    onSave(userData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
        <div className="flex justify-center mb-6">
          <UserPhotoUpload 
            photoUrl={photoUrl}
            initials={`${form.watch("first_name")?.[0]}${form.watch("last_name")?.[0]}`}
            onPhotoChange={handlePhotoChange}
          />
        </div>

        <UserFormFields form={form} />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {user ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
