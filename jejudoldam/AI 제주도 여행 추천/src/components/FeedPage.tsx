import { Post, User } from '../App';
import { PostCard } from './PostCard';
import { motion } from 'motion/react';

interface FeedPageProps {
  posts: Post[];
  currentUser: User;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (post: Post) => void;
  isBookmarked: (postId: string) => boolean;
}

export function FeedPage({ posts, currentUser, onToggleLike, onToggleBookmark, isBookmarked }: FeedPageProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-blue-900 mb-2">여행 피드</h2>
        <p className="text-gray-600">다른 여행자들의 제주 여행 경로를 둘러보세요</p>
      </motion.div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>아직 공유된 여행 경로가 없습니다.</p>
            <p className="text-sm mt-2">첫 번째로 여행 경로를 공유해보세요!</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard
                post={post}
                currentUser={currentUser}
                onToggleLike={onToggleLike}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={isBookmarked(post.id)}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
