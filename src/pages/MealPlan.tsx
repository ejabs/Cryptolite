
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeeklyTimetable from '@/components/WeeklyTimetable';
import { Button } from '@/components/ui/button';
import { Download, Printer, RefreshCw } from 'lucide-react';
import { generateMealPlan } from '@/lib/mealPlanGenerator';
import { toast } from 'sonner';

type UserData = {
  tribe: string;
  age: string;
  weight: string;
  height: string;
};

const MealPlan = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    
    if (!storedUserData) {
      // Redirect to home if no user data
      navigate('/');
      toast.error('Please fill in your details first');
      return;
    }
    
    const parsedUserData = JSON.parse(storedUserData);
    setUserData(parsedUserData);
    
    // Generate meal plan based on user data
    const generatedMealPlan = generateMealPlan(parsedUserData);
    setMealPlan(generatedMealPlan);
    setLoading(false);
  }, [navigate]);

  const handleRegeneratePlan = () => {
    setLoading(true);
    setTimeout(() => {
      if (userData) {
        const newMealPlan = generateMealPlan(userData);
        setMealPlan(newMealPlan);
        setLoading(false);
        toast.success('New meal plan generated!');
      }
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or image file
    toast.success('Meal plan downloaded!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-food-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-food-spice mx-auto mb-4"></div>
            <h2 className="text-2xl font-display font-bold text-food-spice">Generating Your Meal Plan...</h2>
            <p className="text-gray-600 mt-2">Customizing delicious Nigerian dishes just for you</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-food-cream">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-food-spice mb-2">Your Weekly Meal Plan</h1>
            {userData && (
              <p className="text-gray-700">
                Personalized for {userData.tribe.charAt(0).toUpperCase() + userData.tribe.slice(1)} cuisine, 
                Age: {userData.age}, Weight: {userData.weight}kg, Height: {userData.height}cm
              </p>
            )}
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-food-spice text-food-spice hover:bg-food-spice hover:text-white"
              onClick={handleRegeneratePlan}
            >
              <RefreshCw size={16} />
              <span>Regenerate</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-food-spice text-food-spice hover:bg-food-spice hover:text-white"
              onClick={handlePrint}
            >
              <Printer size={16} />
              <span>Print</span>
            </Button>
            <Button 
              className="flex items-center gap-2 bg-food-spice hover:bg-food-palm"
              onClick={handleDownload}
            >
              <Download size={16} />
              <span>Download</span>
            </Button>
          </div>
        </div>
        
        {mealPlan && <WeeklyTimetable mealPlan={mealPlan} />}
        
      </main>
      <Footer />
    </div>
  );
};

export default MealPlan;
