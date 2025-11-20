import { useState } from 'react';
import { TravelPreferenceForm } from './components/TravelPreferenceForm';
import { TravelRoute } from './components/TravelRoute';
import { Header } from './components/Header';
import { AuthPage } from './components/AuthPage';
import { FeedPage } from './components/FeedPage';
import { BookmarksPage } from './components/BookmarksPage';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';
import { motion } from 'motion/react';
import { Toaster } from './components/ui/sonner';

export interface Preferences {
  days: number;
  interests: string[];
  travelStyle: string;
  companions: string;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  imageQuery: string;
  region: string;
  tags: string[];
}

export interface DayRoute {
  day: number;
  places: Place[];
  region: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: string[];
  following: string[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  route: DayRoute[];
  preferences: Preferences;
  title: string;
  description: string;
  likes: string[];
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  post: Post;
  createdAt: Date;
}

export type PageType = 'planner' | 'feed' | 'bookmarks' | 'profile';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('planner');
  const [route, setRoute] = useState<DayRoute[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);

  // Mock data - will be replaced with Supabase
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: 'user1',
      userName: '제주러버',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      route: [],
      preferences: { days: 3, interests: ['nature', 'beach'], travelStyle: 'relaxed', companions: 'couple' },
      title: '연인과 함께하는 힐링 제주 3일',
      description: '바다와 자연을 만끽하며 여유롭게 즐긴 제주 여행 코스입니다. 특히 협재 해변에서의 일몰이 정말 아름다웠어요!',
      likes: ['user2', 'user3'],
      createdAt: new Date('2024-11-15')
    },
    {
      id: '2',
      userId: 'user2',
      userName: '여행중독자',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      route: [],
      preferences: { days: 5, interests: ['nature', 'culture', 'food'], travelStyle: 'active', companions: 'friends' },
      title: '친구들과 제주 완전정복 5일',
      description: '아침부터 밤까지 알차게 즐긴 제주 여행! 한라산 등반부터 동문시장 야시장까지, 제주의 모든 것을 경험했어요.',
      likes: ['user1'],
      createdAt: new Date('2024-11-17')
    }
  ]);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const handleGenerateRoute = async (prefs: Preferences) => {
    setIsGenerating(true);
    setPreferences(prefs);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedRoute = generateRouteBasedOnPreferences(prefs);
    setRoute(generatedRoute);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setRoute(null);
    setPreferences(null);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('planner');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('planner');
    setRoute(null);
  };

  const handleShareRoute = (title: string, description: string) => {
    if (!currentUser || !route || !preferences) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      route: route,
      preferences: preferences,
      title,
      description,
      likes: [],
      createdAt: new Date()
    };

    setPosts([newPost, ...posts]);
    setCurrentPage('feed');
  };

  const handleToggleLike = (postId: string) => {
    if (!currentUser) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const likes = post.likes.includes(currentUser.id)
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes };
      }
      return post;
    }));
  };

  const handleToggleBookmark = (post: Post) => {
    if (!currentUser) return;

    const existingBookmark = bookmarks.find(
      b => b.post.id === post.id && b.userId === currentUser.id
    );

    if (existingBookmark) {
      setBookmarks(bookmarks.filter(b => b.id !== existingBookmark.id));
    } else {
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        userId: currentUser.id,
        post,
        createdAt: new Date()
      };
      setBookmarks([newBookmark, ...bookmarks]);
    }
  };

  const isBookmarked = (postId: string): boolean => {
    if (!currentUser) return false;
    return bookmarks.some(b => b.post.id === postId && b.userId === currentUser.id);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          bookmarkCount={bookmarks.filter(b => b.userId === currentUser.id).length}
        />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          {currentPage === 'planner' && (
            <>
              {!route ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TravelPreferenceForm 
                    onGenerate={handleGenerateRoute} 
                    isGenerating={isGenerating}
                  />
                </motion.div>
              ) : (
                <TravelRoute 
                  route={route} 
                  onReset={handleReset}
                  onShare={handleShareRoute}
                  showShareButton={true}
                />
              )}
            </>
          )}

          {currentPage === 'feed' && (
            <FeedPage
              posts={posts}
              currentUser={currentUser}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {currentPage === 'bookmarks' && (
            <BookmarksPage
              bookmarks={bookmarks.filter(b => b.userId === currentUser.id)}
              currentUser={currentUser}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentPage === 'profile' && (
            <ProfilePage
              user={currentUser}
              posts={posts.filter(p => p.userId === currentUser.id)}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}
        </main>
      </div>

      <Toaster />
    </div>
  );
}

// AI-based route generation logic
function generateRouteBasedOnPreferences(preferences: Preferences): DayRoute[] {
  const allPlaces: Place[] = [
    {
      id: '1',
      name: '성산일출봉',
      category: 'nature',
      description: '유네스코 세계자연유산으로 지정된 화산 분화구. 일출 명소로 유명합니다.',
      duration: 120,
      imageQuery: 'seongsan ilchulbong jeju',
      region: 'east',
      tags: ['nature', 'hiking', 'sunrise']
    },
    {
      id: '2',
      name: '한라산 국립공원',
      category: 'nature',
      description: '제주도의 상징인 한라산. 다양한 등산 코스가 있습니다.',
      duration: 300,
      imageQuery: 'hallasan mountain jeju',
      region: 'center',
      tags: ['nature', 'hiking', 'adventure']
    },
    {
      id: '3',
      name: '우도',
      category: 'nature',
      description: '제주 동쪽의 작은 섬. 해안 절경과 땅콩 아이스크림이 유명합니다.',
      duration: 240,
      imageQuery: 'udo island jeju',
      region: 'east',
      tags: ['nature', 'beach', 'relaxation']
    },
    {
      id: '4',
      name: '협재 해수욕장',
      category: 'beach',
      description: '에메랄드빛 바다와 하얀 모래사장이 아름다운 해변입니다.',
      duration: 180,
      imageQuery: 'hyeopjae beach jeju',
      region: 'west',
      tags: ['beach', 'relaxation', 'swimming']
    },
    {
      id: '5',
      name: '만장굴',
      category: 'nature',
      description: '세계 최장의 용암동굴 중 하나. 신비로운 지하 세계를 경험할 수 있습니다.',
      duration: 90,
      imageQuery: 'manjanggul cave jeju',
      region: 'east',
      tags: ['nature', 'cave', 'adventure']
    },
    {
      id: '6',
      name: '제주 민속촌',
      category: 'culture',
      description: '제주의 전통 생활상을 재현한 민속촌. 100여 채의 전통 가옥이 있습니다.',
      duration: 120,
      imageQuery: 'jeju folk village',
      region: 'center',
      tags: ['culture', 'history', 'traditional']
    },
    {
      id: '7',
      name: '성읍민속마을',
      category: 'culture',
      description: '조선시대 제주 사람들의 생활상을 볼 수 있는 마을입니다.',
      duration: 90,
      imageQuery: 'seongeup folk village jeju',
      region: 'east',
      tags: ['culture', 'history', 'traditional']
    },
    {
      id: '8',
      name: '제주돌문화공원',
      category: 'culture',
      description: '제주의 돌 문화를 주제로 한 공원. 다양한 돌 조형물을 감상할 수 있습니다.',
      duration: 120,
      imageQuery: 'jeju stone park',
      region: 'center',
      tags: ['culture', 'art', 'park']
    },
    {
      id: '9',
      name: '동문시장',
      category: 'food',
      description: '제주의 전통 시장. 신선한 해산물과 향토 음식을 맛볼 수 있습니다.',
      duration: 120,
      imageQuery: 'dongmun market jeju',
      region: 'center',
      tags: ['food', 'shopping', 'local']
    },
    {
      id: '10',
      name: '애월 카페거리',
      category: 'cafe',
      description: '오션뷰 카페들이 즐비한 핫플레이스. 아름다운 바다를 보며 휴식할 수 있습니다.',
      duration: 90,
      imageQuery: 'aewol cafe street jeju',
      region: 'west',
      tags: ['cafe', 'relaxation', 'ocean']
    },
    {
      id: '11',
      name: '섭지코지',
      category: 'scenic',
      description: '아름다운 해안 절벽과 유채꽃밭이 있는 경승지입니다.',
      duration: 120,
      imageQuery: 'seopjikoji jeju',
      region: 'east',
      tags: ['scenic', 'photography', 'nature']
    },
    {
      id: '12',
      name: '천지연폭포',
      category: 'nature',
      description: '시원한 폭포와 울창한 숲이 어우러진 관광지입니다.',
      duration: 90,
      imageQuery: 'cheonjiyeon waterfall jeju',
      region: 'south',
      tags: ['nature', 'waterfall', 'relaxation']
    },
    {
      id: '13',
      name: '중문 색달해변',
      category: 'beach',
      description: '서핑하기 좋은 해변. 다양한 해양 액티비티를 즐길 수 있습니다.',
      duration: 180,
      imageQuery: 'jungmun beach jeju',
      region: 'south',
      tags: ['beach', 'surfing', 'activity']
    },
    {
      id: '14',
      name: '오설록 티뮤지엄',
      category: 'cafe',
      description: '녹차 박물관과 카페. 아름다운 녹차밭을 감상할 수 있습니다.',
      duration: 90,
      imageQuery: 'osulloc tea museum jeju',
      region: 'west',
      tags: ['cafe', 'tea', 'culture']
    },
    {
      id: '15',
      name: '주상절리대',
      category: 'nature',
      description: '현무암이 만든 장관. 파도가 부딪히는 모습이 장관입니다.',
      duration: 60,
      imageQuery: 'jusangjeolli cliff jeju',
      region: 'south',
      tags: ['nature', 'scenic', 'geology']
    },
    {
      id: '16',
      name: '카멜리아힐',
      category: 'garden',
      description: '동백꽃 정원. 사계절 아름다운 꽃과 조경을 감상할 수 있습니다.',
      duration: 90,
      imageQuery: 'camellia hill jeju',
      region: 'west',
      tags: ['garden', 'flowers', 'photography']
    }
  ];

  let selectedPlaces = allPlaces.filter(place => {
    return preferences.interests.some(interest => 
      place.tags.includes(interest.toLowerCase()) || 
      place.category === interest.toLowerCase()
    );
  });

  if (selectedPlaces.length === 0) {
    selectedPlaces = [...allPlaces];
  }

  if (preferences.travelStyle === 'relaxed') {
    selectedPlaces = selectedPlaces.filter(p => p.tags.includes('relaxation') || p.category === 'cafe' || p.category === 'beach');
    if (selectedPlaces.length < preferences.days * 3) {
      selectedPlaces = [...allPlaces.filter(p => p.category === 'beach' || p.category === 'cafe')];
    }
  } else if (preferences.travelStyle === 'active') {
    selectedPlaces = selectedPlaces.filter(p => p.tags.includes('hiking') || p.tags.includes('adventure') || p.tags.includes('activity'));
    if (selectedPlaces.length < preferences.days * 3) {
      selectedPlaces = [...allPlaces.filter(p => p.tags.includes('nature') || p.tags.includes('hiking'))];
    }
  }

  const regions = ['east', 'west', 'south', 'center'];
  const route: DayRoute[] = [];

  const placesPerDay = preferences.travelStyle === 'relaxed' ? 3 : preferences.travelStyle === 'moderate' ? 4 : 5;

  for (let day = 1; day <= preferences.days; day++) {
    const regionIndex = (day - 1) % regions.length;
    const region = regions[regionIndex];
    
    const regionPlaces = selectedPlaces
      .filter(p => p.region === region)
      .slice(0, placesPerDay);
    
    if (regionPlaces.length < placesPerDay) {
      const additionalPlaces = selectedPlaces
        .filter(p => !regionPlaces.includes(p))
        .slice(0, placesPerDay - regionPlaces.length);
      regionPlaces.push(...additionalPlaces);
    }

    route.push({
      day,
      places: regionPlaces,
      region: getRegionName(region)
    });

    selectedPlaces = selectedPlaces.filter(p => !regionPlaces.includes(p));
  }

  return route;
}

function getRegionName(region: string): string {
  const regionNames: { [key: string]: string } = {
    east: '동부 지역',
    west: '서부 지역',
    south: '남부 지역',
    center: '중부 지역'
  };
  return regionNames[region] || '제주';
}
