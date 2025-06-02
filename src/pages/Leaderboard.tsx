
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, ArrowLeft, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Mock data - replace with real Supabase data
  const mockLeaderboard = [
    {
      id: 1,
      ideaName: "EcoTrack - Carbon Footprint Tracker",
      ownerName: "Sarah Chen",
      votes: 45,
      category: "Sustainability",
      avatar: "SC"
    },
    {
      id: 2,
      ideaName: "AI Code Review Assistant",
      ownerName: "Mike Johnson",
      votes: 38,
      category: "Developer Tools",
      avatar: "MJ"
    },
    {
      id: 3,
      ideaName: "Smart Office Energy Management",
      ownerName: "Emily Rodriguez",
      votes: 32,
      category: "IoT",
      avatar: "ER"
    },
    {
      id: 4,
      ideaName: "Employee Wellness Platform",
      ownerName: "David Kim",
      votes: 28,
      category: "Health & Wellness",
      avatar: "DK"
    },
    {
      id: 5,
      ideaName: "Virtual Reality Training Suite",
      ownerName: "Lisa Wang",
      votes: 25,
      category: "Education",
      avatar: "LW"
    }
  ];

  useEffect(() => {
    // In real app, fetch from Supabase
    setLeaderboardData(mockLeaderboard);
  }, []);

  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">{position}</div>;
    }
  };

  const getRankBorder = (position) => {
    switch (position) {
      case 1:
        return "border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50";
      case 2:
        return "border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50";
      case 3:
        return "border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50";
      default:
        return "border-gray-200 bg-white/60";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4 bg-white/60 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Hackathon Leaderboard</h1>
            <p className="text-lg text-gray-600">Real-time voting results</p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{leaderboardData.length}</div>
              <p className="text-sm text-gray-600">Total Ideas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {leaderboardData.reduce((sum, item) => sum + item.votes, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Votes</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">
                {leaderboardData.length > 0 ? leaderboardData[0]?.votes : 0}
              </div>
              <p className="text-sm text-gray-600">Highest Votes</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {leaderboardData.map((idea, index) => {
            const position = index + 1;
            return (
              <Card 
                key={idea.id} 
                className={`backdrop-blur-md border-2 shadow-xl transition-all duration-300 hover:shadow-2xl ${getRankBorder(position)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(position)}
                    </div>

                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {idea.avatar}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{idea.ideaName}</h3>
                          <p className="text-lg text-gray-700 mb-2">by {idea.ownerName}</p>
                          <Badge variant="secondary">{idea.category}</Badge>
                        </div>
                        
                        {/* Vote Count */}
                        <div className="text-right">
                          <div className="text-3xl font-bold text-purple-600">{idea.votes}</div>
                          <p className="text-sm text-gray-600">votes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 text-center space-y-4">
          <Button 
            onClick={() => navigate('/browse-ideas')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mr-4"
          >
            Browse All Ideas
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/create-idea')}
            className="bg-white/60 backdrop-blur-sm"
          >
            Submit Your Idea
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
