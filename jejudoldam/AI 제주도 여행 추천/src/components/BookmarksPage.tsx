import { Bookmark, User } from '../App';
import { PostCard } from './PostCard';
import { motion } from 'motion/react';
import { BookmarkX } from 'lucide-react';

interface BookmarksPageProps {
  bookmarks: Bookmark[];
  currentUser: User;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (post: any) => void;
}

export function BookmarksPage({ bookmarks, currentUser, onToggleLike, onToggleBookmark }: BookmarksPageProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-blue-900 mb-2">북마크</h2>
        <p className="text-gray-600">저장한 여행 경로를 확인하세요</p>
      </motion.div>

      <div className="space-y-6">
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BookmarkX className="size-16 mx-auto mb-4 text-gray-300" />
            <p>북마크한 여행 경로가 없습니다.</p>
            <p className="text-sm mt-2">마음에 드는 여행 경로를 북마크해보세요!</p>
          </div>
        ) : (
          bookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard
                post={bookmark.post}
                currentUser={currentUser}
                onToggleLike={onToggleLike}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={true}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
