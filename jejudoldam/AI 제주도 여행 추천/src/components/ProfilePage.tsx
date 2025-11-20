import { useState } from 'react';
import { User, Post } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { PostCard } from './PostCard';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProfilePageProps {
  user: User;
  posts: Post[];
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (post: Post) => void;
  isBookmarked: (postId: string) => boolean;
}

export function ProfilePage({ user, posts, onToggleLike, onToggleBookmark, isBookmarked }: ProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = true; // In real app, compare with current user

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="size-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-blue-900 mb-1">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  
                  {!isOwnProfile && (
                    <Button
                      variant={isFollowing ? 'outline' : 'default'}
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={!isFollowing ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      <Users className="mr-2 size-4" />
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </Button>
                  )}
                </div>

                <p className="text-gray-700 mb-4">{user.bio}</p>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-semibold">{posts.length}</span>
                    <span className="text-gray-600 ml-1">게시글</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.followers.length}</span>
                    <span className="text-gray-600 ml-1">팔로워</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.following.length}</span>
                    <span className="text-gray-600 ml-1">팔로잉</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{posts.length}</p>
                  <p className="text-sm text-gray-600">공유한 여행</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Calendar className="size-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {posts.reduce((sum, post) => sum + post.preferences.days, 0)}
                  </p>
                  <p className="text-sm text-gray-600">총 여행 일수</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="size-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.followers.length}</p>
                  <p className="text-sm text-gray-600">팔로워</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Section */}
        <Card>
          <CardHeader>
            <CardTitle>공유한 여행 경로</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">게시글</TabsTrigger>
                <TabsTrigger value="liked">좋아요한 게시글</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-4 mt-4">
                {posts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>아직 공유한 여행 경로가 없습니다.</p>
                    <p className="text-sm mt-2">여행 플래너에서 경로를 만들고 공유해보세요!</p>
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
                        currentUser={user}
                        onToggleLike={onToggleLike}
                        onToggleBookmark={onToggleBookmark}
                        isBookmarked={isBookmarked(post.id)}
                      />
                    </motion.div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="liked" className="mt-4">
                <div className="text-center py-12 text-gray-500">
                  <p>좋아요한 게시글이 없습니다.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
