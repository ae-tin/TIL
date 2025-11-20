import { PageType } from '../App';
import { Button } from './ui/button';
import { Compass, Home, Bookmark, User } from 'lucide-react';
import { Badge } from './ui/badge';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  bookmarkCount: number;
}

export function Sidebar({ currentPage, onPageChange, bookmarkCount }: SidebarProps) {
  const menuItems = [
    { id: 'planner' as PageType, label: '여행 플래너', icon: Home },
    { id: 'feed' as PageType, label: '피드', icon: Compass },
    { id: 'bookmarks' as PageType, label: '북마크', icon: Bookmark, count: bookmarkCount },
    { id: 'profile' as PageType, label: '프로필', icon: User },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white/50 backdrop-blur-sm sticky top-[73px] h-[calc(100vh-73px)] p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start ${isActive ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="mr-2 size-5" />
              {item.label}
              {item.count !== undefined && item.count > 0 && (
                <Badge className="ml-auto" variant={isActive ? 'secondary' : 'outline'}>
                  {item.count}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
