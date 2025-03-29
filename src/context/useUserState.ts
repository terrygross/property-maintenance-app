
import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export const useUserState = () => {
  const { toast } = useToast();
  
  // Initialize state from localStorage if available, otherwise use empty array
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      return [];
    }
  });

  // Persist to localStorage whenever state changes with error handling
  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
      toast({
        title: "Error saving users",
        description: "There was an error saving your users. Please try again.",
        variant: "destructive"
      });
    }
  }, [users, toast]);

  // User operations
  const updateUser = (user: User) => {
    setUsers(prev => 
      prev.map(u => u.id === user.id ? user : u)
    );
    toast({
      title: "User updated",
      description: "The user has been updated successfully.",
    });
  };

  const addUser = (user: User) => {
    try {
      const newUser = {
        ...user,
        id: user.id || crypto.randomUUID(),
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: "User created",
        description: "The user has been created successfully.",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error adding user",
        description: "There was an error adding the user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
  };

  return {
    users,
    updateUser,
    addUser,
    deleteUser
  };
};
