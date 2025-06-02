
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Lightbulb, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateIdea = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([
    { id: 1, title: '', description: '', category: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const addIdea = () => {
    if (ideas.length < 5) { // Max 5 ideas
      setIdeas([...ideas, { 
        id: Date.now(), 
        title: '', 
        description: '', 
        category: '' 
      }]);
    }
  };

  const removeIdea = (id) => {
    if (ideas.length > 1) {
      setIdeas(ideas.filter(idea => idea.id !== id));
    }
  };

  const updateIdea = (id, field, value) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, [field]: value } : idea
    ));
  };

  const handleSubmit = () => {
    // Validate that at least 3 ideas are filled
    const filledIdeas = ideas.filter(idea => 
      idea.title.trim() && idea.description.trim() && idea.category.trim()
    );
    
    if (filledIdeas.length < 3) {
      alert('Please submit at least 3 complete ideas');
      return;
    }

    // Mock submission - replace with Supabase
    console.log('Submitting ideas:', filledIdeas);
    setSubmitted(true);
  };

  const categories = [
    'Technology', 'Healthcare', 'Education', 'Sustainability', 
    'Finance', 'Gaming', 'Social Impact', 'Productivity', 
    'IoT', 'AI/ML', 'Developer Tools', 'Other'
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-white/80 backdrop-blur-md border-white/30 shadow-xl text-center">
          <CardContent className="pt-8 pb-6">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ideas Submitted!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for submitting your innovative ideas. Now it's time to explore and vote for other amazing ideas from your colleagues!
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/browse-ideas')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Browse & Vote for Ideas
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/leaderboard')}
                className="w-full"
              >
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">💡 Submit Your Ideas</h1>
            <p className="text-lg text-gray-600">Share your innovative ideas for the hackathon (minimum 3 required)</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Ideas Submitted</span>
              <span>{ideas.filter(idea => idea.title && idea.description && idea.category).length}/3 minimum</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, (ideas.filter(idea => idea.title && idea.description && idea.category).length / 3) * 100)}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Ideas Form */}
        <div className="space-y-6">
          {ideas.map((idea, index) => (
            <Card key={idea.id} className="bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                    Idea #{index + 1}
                  </CardTitle>
                  {ideas.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeIdea(idea.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`title-${idea.id}`}>Idea Title *</Label>
                  <Input
                    id={`title-${idea.id}`}
                    placeholder="Enter a catchy title for your idea"
                    value={idea.title}
                    onChange={(e) => updateIdea(idea.id, 'title', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${idea.id}`}>Description *</Label>
                  <Textarea
                    id={`description-${idea.id}`}
                    placeholder="Describe your idea in detail - what problem does it solve? How does it work?"
                    value={idea.description}
                    onChange={(e) => updateIdea(idea.id, 'description', e.target.value)}
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor={`category-${idea.id}`}>Category *</Label>
                  <select
                    id={`category-${idea.id}`}
                    value={idea.category}
                    onChange={(e) => updateIdea(idea.id, 'category', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {idea.title && idea.description && idea.category && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ Complete
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add More Ideas */}
        {ideas.length < 5 && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg mt-6">
            <CardContent className="pt-6">
              <Button
                variant="outline"
                onClick={addIdea}
                className="w-full border-dashed border-2 border-gray-300 h-16 text-gray-600 hover:text-gray-800"
              >
                <Plus className="h-6 w-6 mr-2" />
                Add Another Idea (Optional)
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmit}
            disabled={ideas.filter(idea => idea.title && idea.description && idea.category).length < 3}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg"
          >
            Submit Ideas ({ideas.filter(idea => idea.title && idea.description && idea.category).length}/3 minimum)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateIdea;
