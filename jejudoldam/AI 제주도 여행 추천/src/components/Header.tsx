import { Palmtree, Sparkles, LogOut } from 'lucide-react';
import { User } from '../App';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-blue-600">
              <Palmtree className="size-8" />
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="text-blue-900">제주도 AI 여행 플래너</h1>
              <p className="text-gray-600 text-sm">당신만을 위한 맞춤 여행 경로를 추천해드립니다</p>
            </div>
          </div>

          {user && onLogout && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="size-4 mr-1" />
                로그아웃
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}