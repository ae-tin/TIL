import { useState } from 'react';
import { Place } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, MapPin, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface PlaceCardProps {
  place: Place;
  order: number;
}

export function PlaceCard({ place, order }: PlaceCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const hours = Math.floor(place.duration / 60);
  const minutes = place.duration % 60;

  // Map image queries to actual images
  const imageMap: { [key: string]: string } = {
    'seongsan ilchulbong jeju': 'https://images.unsplash.com/photo-1616798249081-30877e213b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW9uZ3NhbiUyMGlsY2h1bGJvbmclMjBqZWp1fGVufDF8fHx8MTc2MzUyNzMxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    'hallasan mountain jeju': 'https://images.unsplash.com/photo-1740329289226-9bf3e3eaa8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxsYXNhbiUyMG1vdW50YWluJTIwamVqdXxlbnwxfHx8fDE3NjM1MjczMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'udo island jeju': 'https://images.unsplash.com/photo-1700419193663-e138f21dc410?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZG8lMjBpc2xhbmQlMjBqZWp1fGVufDF8fHx8MTc2MzUyNzMyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    'hyeopjae beach jeju': 'https://images.unsplash.com/photo-1742826887940-e154c0aff836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWVvcGphZSUyMGJlYWNoJTIwamVqdXxlbnwxfHx8fDE3NjM1MjczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'manjanggul cave jeju': 'https://images.unsplash.com/photo-1509689266740-ecc1b3c3de2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5qYW5nZ3VsJTIwY2F2ZSUyMGplanV8ZW58MXx8fHwxNzYzNTI3MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'jeju folk village': 'https://images.unsplash.com/photo-1733779736912-34175bdde948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWp1JTIwZm9sayUyMHZpbGxhZ2V8ZW58MXx8fHwxNjM1MjczMjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden cursor-pointer h-full hover:shadow-lg transition-shadow" onClick={() => setShowDetails(true)}>
          <div className="relative">
            <ImageWithFallback
              src={imageMap[place.imageQuery] || `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400`}
              alt={place.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2">
              <Badge className="bg-blue-600">
                {order}
              </Badge>
            </div>
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                {getCategoryEmoji(place.category)} {getCategoryLabel(place.category)}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-3">
            <CardTitle className="flex items-start justify-between gap-2">
              <span>{place.name}</span>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {place.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{hours > 0 ? `${hours}시간 ` : ''}{minutes}분</span>
              </div>
              <button 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
              >
                <Info className="size-4" />
                <span>상세정보</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="size-5 text-blue-600" />
              {place.name}
            </DialogTitle>
            <DialogDescription>
              {getCategoryEmoji(place.category)} {getCategoryLabel(place.category)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <ImageWithFallback
              src={imageMap[place.imageQuery] || `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800`}
              alt={place.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div>
              <h4 className="mb-2">소개</h4>
              <p className="text-gray-600">{place.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="mb-2">추천 소요시간</h4>
                <p className="text-gray-600">
                  {hours > 0 ? `${hours}시간 ` : ''}{minutes}분
                </p>
              </div>
              <div>
                <h4 className="mb-2">위치</h4>
                <p className="text-gray-600">{place.region}</p>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2">태그</h4>
              <div className="flex flex-wrap gap-2">
                {place.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="mb-2">여행 팁</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 방문 전 영업시간을 확인하세요</li>
                <li>• 주차 공간을 미리 확인하는 것이 좋습니다</li>
                <li>• 성수기에는 사전 예약을 권장합니다</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: { [key: string]: string } = {
    nature: '🌿',
    beach: '🏖️',
    culture: '🏛️',
    food: '🍜',
    cafe: '☕',
    scenic: '🌅',
    garden: '🌺'
  };
  return emojiMap[category] || '📍';
}

function getCategoryLabel(category: string): string {
  const labelMap: { [key: string]: string } = {
    nature: '자연',
    beach: '해변',
    culture: '문화',
    food: '맛집',
    cafe: '카페',
    scenic: '경관',
    garden: '정원'
  };
  return labelMap[category] || '관광지';
}
