
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserSearchBarProps {
  searchQuery: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserSearchBar = ({ searchQuery, onSearch }: UserSearchBarProps) => {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={onSearch}
        className="pl-8"
      />
    </div>
  );
};

export default UserSearchBar;
