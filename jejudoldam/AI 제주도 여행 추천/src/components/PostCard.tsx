import { Post, User } from '../App';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, Bookmark, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (post: Post) => void;
  isBookmarked: boolean;
}

export function PostCard({ post, currentUser, onToggleLike, onToggleBookmark, isBookmarked }: PostCardProps) {
  const isLiked = post.likes.includes(currentUser.id);
  const totalDays = post.preferences.days;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.userAvatar} alt={post.userName} />
              <AvatarFallback>{post.userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.userName}</p>
              <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100">
            <Calendar className="mr-1 size-3" />
            {totalDays}일 여행
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2">{post.title}</h3>
          <p className="text-gray-600">{post.description}</p>
        </div>

        {/* Preferences Tags */}
        <div className="flex flex-wrap gap-2">
          {post.preferences.interests.map(interest => (
            <Badge key={interest} variant="outline">
              #{interest}
            </Badge>
          ))}
          <Badge variant="outline">
            {post.preferences.travelStyle === 'relaxed' ? '여유로운' : 
             post.preferences.travelStyle === 'moderate' ? '적당한' : '활동적인'}
          </Badge>
        </div>

        {/* Route Preview */}
        {post.route.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
              <MapPin className="size-4 text-blue-600" />
              <span>여행 경로 미리보기</span>
            </div>
            <div className="space-y-2">
              {post.route.slice(0, 2).map(day => (
                <div key={day.day} className="text-sm">
                  <span className="font-semibold text-blue-600">Day {day.day}</span>
                  <span className="text-gray-600"> - {day.region}</span>
                  <div className="ml-4 mt-1 space-y-1">
                    {day.places.slice(0, 3).map((place, idx) => (
                      <div key={place.id} className="text-gray-600">
                        {idx + 1}. {place.name}
                      </div>
                    ))}
                    {day.places.length > 3 && (
                      <div className="text-gray-400">
                        + {day.places.length - 3}개 더보기
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {post.route.length > 2 && (
                <div className="text-sm text-gray-400 text-center pt-2">
                  + Day {post.route.length - 2}개 더보기
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleLike(post.id)}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`mr-1 size-4 ${isLiked ? 'fill-red-500' : ''}`} />
              좋아요 {post.likes.length > 0 && `(${post.likes.length})`}
            </Button>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleBookmark(post)}
              className={isBookmarked ? 'text-blue-600' : ''}
            >
              <Bookmark className={`mr-1 size-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
              북마크
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
