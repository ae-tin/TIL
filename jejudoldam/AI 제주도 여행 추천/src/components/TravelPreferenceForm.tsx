import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Preferences } from '../App';
import { Calendar, Users, Heart, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TravelPreferenceFormProps {
  onGenerate: (preferences: Preferences) => void;
  isGenerating: boolean;
}

export function TravelPreferenceForm({ onGenerate, isGenerating }: TravelPreferenceFormProps) {
  const [days, setDays] = useState<number>(3);
  const [interests, setInterests] = useState<string[]>(['nature']);
  const [travelStyle, setTravelStyle] = useState<string>('moderate');
  const [companions, setCompanions] = useState<string>('solo');

  const interestOptions = [
    { id: 'nature', label: '자연 & 경관', icon: '🌴' },
    { id: 'beach', label: '해변 & 바다', icon: '🏖️' },
    { id: 'culture', label: '문화 & 역사', icon: '🏛️' },
    { id: 'food', label: '맛집 & 카페', icon: '🍜' },
    { id: 'activity', label: '액티비티', icon: '🏄' },
    { id: 'photography', label: '포토스팟', icon: '📸' },
  ];

  const handleInterestToggle = (interestId: string) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (interests.length === 0) {
      alert('최소 1개 이상의 관심사를 선택해주세요.');
      return;
    }

    onGenerate({
      days,
      interests,
      travelStyle,
      companions
    });
  };

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-6 text-blue-600" />
          여행 선호도 입력
        </CardTitle>
        <CardDescription>
          선호하시는 여행 스타일을 선택하시면 AI가 최적의 경로를 생성합니다
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Days Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-blue-600" />
              <Label>여행 기간: {days}일</Label>
            </div>
            <Slider
              value={[days]}
              onValueChange={(value) => setDays(value[0])}
              min={1}
              max={7}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1일</span>
              <span>7일</span>
            </div>
          </div>

          {/* Interests Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="size-5 text-blue-600" />
              <Label>관심사 (중복 선택 가능)</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <label
                    className={`
                      flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${interests.includes(option.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <Checkbox
                      checked={interests.includes(option.id)}
                      onCheckedChange={() => handleInterestToggle(option.id)}
                    />
                    <span className="text-xl">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </label>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div className="space-y-4">
            <Label>여행 스타일</Label>
            <RadioGroup value={travelStyle} onValueChange={setTravelStyle}>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer hover:border-blue-300 transition-all">
                  <RadioGroupItem value="relaxed" id="relaxed" />
                  <div className="flex-1">
                    <div>여유로운 여행</div>
                    <div className="text-sm text-gray-500">느긋하게 힐링하며 여행하고 싶어요</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer hover:border-blue-300 transition-all">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <div className="flex-1">
                    <div>적당한 여행</div>
                    <div className="text-sm text-gray-500">여유와 활동의 균형을 맞추고 싶어요</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer hover:border-blue-300 transition-all">
                  <RadioGroupItem value="active" id="active" />
                  <div className="flex-1">
                    <div>활동적인 여행</div>
                    <div className="text-sm text-gray-500">많은 곳을 방문하고 다양한 경험을 하고 싶어요</div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Companions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-blue-600" />
              <Label>동행 유형</Label>
            </div>
            <RadioGroup value={companions} onValueChange={setCompanions}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'solo', label: '혼자' },
                  { value: 'couple', label: '연인' },
                  { value: 'family', label: '가족' },
                  { value: 'friends', label: '친구들' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer hover:border-blue-300 transition-all"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                AI가 경로를 생성하는 중...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-5" />
                맞춤 여행 경로 생성하기
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
