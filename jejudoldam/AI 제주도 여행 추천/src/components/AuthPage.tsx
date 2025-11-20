import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Palmtree, Sparkles } from 'lucide-react';
import { User } from '../App';
import { motion } from 'motion/react';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - will be replaced with Supabase auth
    const mockUser: User = {
      id: 'user_' + Date.now(),
      name: loginEmail.split('@')[0],
      email: loginEmail,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginEmail}`,
      bio: '제주도를 사랑하는 여행자입니다.',
      followers: [],
      following: []
    };
    
    onLogin(mockUser);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock signup - will be replaced with Supabase auth
    const mockUser: User = {
      id: 'user_' + Date.now(),
      name: signupName,
      email: signupEmail,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${signupEmail}`,
      bio: '제주도를 사랑하는 여행자입니다.',
      followers: [],
      following: []
    };
    
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
            <Palmtree className="size-12" />
            <Sparkles className="size-8" />
          </div>
          <h1 className="text-blue-900 mb-2">제주도 AI 여행 플래너</h1>
          <p className="text-gray-600">당신만을 위한 맞춤 여행 경로를 추천해드립니다</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>환영합니다</CardTitle>
            <CardDescription>로그인하여 여행 계획을 시작하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">로그인</TabsTrigger>
                <TabsTrigger value="signup">회원가입</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">이메일</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">비밀번호</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                    로그인
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">이름</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="홍길동"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                    회원가입
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          데모 버전: 아무 이메일이나 입력하여 시작하세요
        </p>
      </motion.div>
    </div>
  );
}
