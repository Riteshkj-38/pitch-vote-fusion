
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Heart, ArrowLeft, CheckCircle } from "lucide-react";

const Vote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [voted, setVoted] = useState(false);

  // Mock data
  const pitcher = {
    id: 1,
    name: "Sarah Chen",
    idea: "EcoTrack - Carbon Footprint Tracker",
    description: "AI-powered app that helps individuals and companies track their carbon footprint in real-time with personalized recommendations and gamification elements.",
    category: "Sustainability",
    votes: 23,
    avatar: "SC"
  };

  const handleVote = () => {
    if (rating === 0) return;
    
    // Mock vote submission
    console.log('Vote submitted:', { rating, feedback, pitcherId: id });
    setVoted(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (voted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-white/30 shadow-xl text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vote Submitted!</h2>
            <p className="text-gray-600 mb-4">Thank you for voting. Redirecting to main page...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4 bg-white/60 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </Button>
        </div>

        {/* Pitcher Info */}
        <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl mb-6">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {pitcher.avatar}
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">{pitcher.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">{pitcher.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-3">{pitcher.idea}</h3>
            <p className="text-gray-700 leading-relaxed">{pitcher.description}</p>
          </CardContent>
        </Card>

        {/* Voting Form */}
        <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Cast Your Vote
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Star Rating */}
            <div>
              <Label className="text-base font-medium mb-3 block">Rate this idea</Label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="group"
                  >
                    <Star 
                      className={`h-8 w-8 transition-colors ${
                        star <= rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 group-hover:text-yellow-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  You rated this idea {rating} star{rating !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Feedback */}
            <div>
              <Label htmlFor="feedback" className="text-base font-medium">
                Feedback (Optional)
              </Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts about this idea..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleVote}
              disabled={rating === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Vote
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vote;
