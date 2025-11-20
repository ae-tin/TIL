import { useState } from 'react';
import { DayRoute } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DayCard } from './DayCard';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface TravelRouteProps {
  route: DayRoute[];
  onReset: () => void;
  onShare?: (title: string, description: string) => void;
  showShareButton?: boolean;
}

export function TravelRoute({ route, onReset, onShare, showShareButton = false }: TravelRouteProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareTitle, setShareTitle] = useState('');
  const [shareDescription, setShareDescription] = useState('');

  const handleShare = () => {
    if (showShareButton && onShare) {
      setShowShareDialog(true);
    } else {
      toast.success('여행 경로가 클립보드에 복사되었습니다!');
      
      let shareText = '🌴 제주도 AI 맞춤 여행 경로 🌴\n\n';
      route.forEach(day => {
        shareText += `📅 Day ${day.day} - ${day.region}\n`;
        day.places.forEach((place, idx) => {
          shareText += `${idx + 1}. ${place.name}\n`;
        });
        shareText += '\n';
      });
      
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleShareSubmit = () => {
    if (!shareTitle.trim()) {
      toast.error('제목을 입력해주세요');
      return;
    }
    if (!shareDescription.trim()) {
      toast.error('설명을 입력해주세요');
      return;
    }

    if (onShare) {
      onShare(shareTitle, shareDescription);
      toast.success('여행 경로가 피드에 공유되었습니다!');
      setShowShareDialog(false);
      setShareTitle('');
      setShareDescription('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header Actions */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-blue-900">AI가 생성한 맞춤 여행 경로</h2>
            <p className="text-gray-600">총 {route.length}일 일정이 준비되었습니다</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 size-4" />
              {showShareButton ? '피드에 공유' : '공유하기'}
            </Button>
            <Button variant="outline" onClick={() => toast.success('PDF 다운로드 기능은 준비 중입니다!')}>
              <Download className="mr-2 size-4" />
              다운로드
            </Button>
            <Button variant="outline" onClick={onReset}>
              <ArrowLeft className="mr-2 size-4" />
              다시 만들기
            </Button>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-green-300 to-blue-300 hidden md:block" />
        
        {/* Day Cards */}
        <div className="space-y-8">
          {route.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DayCard day={day} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
        <h3 className="text-blue-900 mb-3">여행 팁 💡</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 각 장소의 운영시간을 미리 확인하세요</li>
          <li>• 제주도는 렌터카 이용을 추천드립니다</li>
          <li>• 날씨 변화가 심하니 우산과 외투를 준비하세요</li>
          <li>• 주말과 성수기에는 예약이 필수입니다</li>
        </ul>
      </Card>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>피드에 여행 경로 공유하기</DialogTitle>
            <DialogDescription>
              여행 경로에 대한 제목과 설명을 작성해주세요
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-title">제목</Label>
              <Input
                id="share-title"
                placeholder="예: 연인과 함께하는 힐링 제주 3일"
                value={shareTitle}
                onChange={(e) => setShareTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="share-description">설명</Label>
              <Textarea
                id="share-description"
                placeholder="여행 경로에 대한 간단한 설명을 작성해주세요..."
                rows={4}
                value={shareDescription}
                onChange={(e) => setShareDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              취소
            </Button>
            <Button onClick={handleShareSubmit} className="bg-blue-600 hover:bg-blue-700">
              공유하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}