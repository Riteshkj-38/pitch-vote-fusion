
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Star, User, Heart, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrowseIdeas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ideas, setIdeas] = useState([]);
  const [userVotes, setUserVotes] = useState([]); // Track what user has voted for
  const currentUserId = 'current-user-123'; // Mock current user

  // Mock data - replace with Supabase
  const mockIdeas = [
    {
      id: 1,
      title: "EcoTrack - Carbon Footprint Tracker",
      description: "AI-powered app that helps individuals and companies track their carbon footprint in real-time with personalized recommendations and gamification elements.",
      category: "Sustainability",
      owner: "Sarah Chen",
      ownerId: "user-123",
      votes: 23,
      avatar: "SC"
    },
    {
      id: 2,
      title: "AI Code Review Assistant",
      description: "Intelligent code review tool that provides instant feedback, detects bugs, and suggests improvements using machine learning.",
      category: "Developer Tools",
      owner: "Mike Johnson",
      ownerId: "user-456",
      votes: 18,
      avatar: "MJ"
    },
    {
      id: 3,
      title: "Smart Office Energy Management",
      description: "IoT-based system to optimize energy consumption in office buildings through smart sensors and automated controls.",
      category: "IoT",
      owner: "Emily Rodriguez",
      ownerId: "user-789",
      votes: 15,
      avatar: "ER"
    },
    {
      id: 4,
      title: "Employee Wellness Platform",
      description: "Comprehensive platform for tracking employee wellbeing, mental health resources, and promoting work-life balance.",
      category: "Health & Wellness",
      owner: "David Kim",
      ownerId: "user-321",
      votes: 12,
      avatar: "DK"
    },
    {
      id: 5,
      title: "Virtual Reality Training Suite",
      description: "Immersive VR training modules for employee onboarding and skill development across various departments.",
      category: "Education",
      owner: "Lisa Wang",
      ownerId: "user-654",
      votes: 9,
      avatar: "LW"
    }
  ];

  const categories = ['All', 'Technology', 'Healthcare', 'Education', 'Sustainability', 'Finance', 'Developer Tools', 'IoT', 'Health & Wellness'];

  useEffect(() => {
    // In real app, fetch from Supabase
    setIdeas(mockIdeas);
    setUserVotes(['1', '3']); // Mock user has already voted for ideas 1 and 3
  }, []);

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const notOwnIdea = idea.ownerId !== currentUserId; // Can't vote for own ideas
    
    return matchesSearch && matchesCategory && notOwnIdea;
  });

  const handleVote = (ideaId) => {
    if (userVotes.includes(ideaId.toString())) {
      // Remove vote
      setUserVotes(userVotes.filter(id => id !== ideaId.toString()));
      setIdeas(ideas.map(idea => 
        idea.id === ideaId ? { ...idea, votes: idea.votes - 1 } : idea
      ));
    } else {
      // Add vote
      setUserVotes([...userVotes, ideaId.toString()]);
      setIdeas(ideas.map(idea => 
        idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
      ));
    }
    
    // In real app, update Supabase
    console.log('Vote updated for idea:', ideaId);
  };

  const hasVoted = (ideaId) => userVotes.includes(ideaId.toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-6xl">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Browse & Vote for Ideas</h1>
            <p className="text-lg text-gray-600">Discover amazing ideas from your colleagues and cast your votes!</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search ideas, owners, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredIdeas.length} idea{filteredIdeas.length !== 1 ? 's' : ''} 
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </div>
          </CardContent>
        </Card>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{idea.category}</Badge>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{idea.votes}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{idea.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm line-clamp-3">{idea.description}</p>
                
                {/* Owner Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {idea.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{idea.owner}</span>
                    </div>
                  </div>
                </div>
                
                {/* Vote Button */}
                <Button
                  onClick={() => handleVote(idea.id)}
                  className={`w-full transition-all duration-300 ${
                    hasVoted(idea.id)
                      ? 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${hasVoted(idea.id) ? 'fill-current' : ''}`} />
                  {hasVoted(idea.id) ? 'Voted!' : 'Vote for this idea'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredIdeas.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
            <CardContent className="pt-8 pb-6 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or category filter
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer Actions */}
        <div className="mt-8 text-center space-y-4">
          <Button 
            onClick={() => navigate('/leaderboard')}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 mr-4"
          >
            View Leaderboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/create-idea')}
            className="bg-white/60 backdrop-blur-sm"
          >
            Submit Your Ideas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseIdeas;
