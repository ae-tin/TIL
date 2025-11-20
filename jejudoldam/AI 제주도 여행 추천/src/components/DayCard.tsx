import { DayRoute } from '../App';
import { Card } from './ui/card';
import { PlaceCard } from './PlaceCard';
import { MapPin, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface DayCardProps {
  day: DayRoute;
}

export function DayCard({ day }: DayCardProps) {
  const totalDuration = day.places.reduce((sum, place) => sum + place.duration, 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <div className="relative">
      {/* Day Badge */}
      <div className="flex items-start gap-4 md:gap-6 mb-4">
        <div className="relative z-10 flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg">
            <div className="text-center">
              <div className="text-xs">Day</div>
              <div className="font-bold">{day.day}</div>
            </div>
          </div>
        </div>

        <Card className="flex-1 p-4 bg-white/50 backdrop-blur">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-blue-600" />
              <h3 className="text-blue-900">{day.region}</h3>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-blue-100">
                <Calendar className="mr-1 size-3" />
                {day.places.length}개 장소
              </Badge>
              <Badge variant="secondary" className="bg-green-100">
                ⏱️ 약 {hours > 0 ? `${hours}시간 ` : ''}{minutes}분
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Places Grid */}
      <div className="md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {day.places.map((place, index) => (
          <PlaceCard key={place.id} place={place} order={index + 1} />
        ))}
      </div>
    </div>
  );
}
