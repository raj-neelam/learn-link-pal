
import { Button } from "@/components/ui/button";
import { Chrome } from 'lucide-react';

interface GoogleSignInButtonProps {
  onSignIn: (userData: any) => void;
  size?: 'default' | 'lg';
  variant?: 'default' | 'secondary';
}

export const GoogleSignInButton = ({ onSignIn, size = 'default', variant = 'default' }: GoogleSignInButtonProps) => {
  const handleSignIn = () => {
    // Simulate Google Sign-in
    // In a real app, this would integrate with Google OAuth
    const mockUser = {
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@university.edu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    };
    
    setTimeout(() => {
      onSignIn(mockUser);
    }, 1000);
  };

  const buttonVariant = variant === 'secondary' ? 'outline' : 'default';
  const buttonClass = variant === 'secondary' 
    ? 'bg-white text-gray-900 hover:bg-gray-50 border-white' 
    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300';

  return (
    <Button 
      onClick={handleSignIn}
      size={size}
      className={buttonClass}
    >
      <Chrome className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
};
