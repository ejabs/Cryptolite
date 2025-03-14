
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MealCard from '@/components/MealCard';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { swapMeal } from '@/lib/mealPlanGenerator';
import { toast } from 'sonner';

type MealType = {
  name: string;
  description: string;
  image?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

type DayMealsType = {
  breakfast: MealType;
  lunch: MealType;
  dinner: MealType;
  dessert?: MealType;
};

type WeeklyTimetableProps = {
  mealPlan: {
    [key: string]: DayMealsType;
  };
};

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const WeeklyTimetable = ({ mealPlan }: WeeklyTimetableProps) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentView, setCurrentView] = useState<'desktop' | 'mobile'>('desktop');
  const [localMealPlan, setLocalMealPlan] = useState(mealPlan);

  React.useEffect(() => {
    const handleResize = () => {
      setCurrentView(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSwapMeal = (day: string, mealType: string) => {
    const newMeal = swapMeal(day, mealType as keyof DayMealsType);
    
    // Update local meal plan
    setLocalMealPlan(prev => {
      const updated = {...prev};
      updated[day] = {...updated[day], [mealType]: newMeal};
      return updated;
    });
    
    toast.success(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} swapped successfully!`);
  };

  const handleNextDay = () => {
    setCurrentDay((prev) => (prev === 6 ? 0 : prev + 1));
  };

  const handlePrevDay = () => {
    setCurrentDay((prev) => (prev === 0 ? 6 : prev - 1));
  };

  // Mobile view shows one day at a time with navigation
  if (currentView === 'mobile') {
    const day = daysOfWeek[currentDay];
    const dayMeals = localMealPlan[day.toLowerCase()];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrevDay}
            className="text-food-spice hover:text-food-palm hover:bg-food-cream"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <h3 className="text-xl font-display font-bold text-food-spice">{day}</h3>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNextDay}
            className="text-food-spice hover:text-food-palm hover:bg-food-cream"
          >
            <ArrowRight size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <MealCard 
            title="Breakfast" 
            meal={dayMeals.breakfast} 
            onSwap={() => handleSwapMeal(day.toLowerCase(), 'breakfast')} 
          />
          <MealCard 
            title="Lunch" 
            meal={dayMeals.lunch} 
            onSwap={() => handleSwapMeal(day.toLowerCase(), 'lunch')} 
          />
          <MealCard 
            title="Dinner" 
            meal={dayMeals.dinner} 
            onSwap={() => handleSwapMeal(day.toLowerCase(), 'dinner')} 
          />
          {dayMeals.dessert && (
            <MealCard 
              title="Dessert" 
              meal={dayMeals.dessert} 
              onSwap={() => handleSwapMeal(day.toLowerCase(), 'dessert')} 
            />
          )}
        </div>
      </div>
    );
  }

  // Desktop view shows all days in a table/grid
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white">
            <th className="p-3 text-left font-display font-bold text-food-spice">Meal Type</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="p-3 text-center font-display font-bold text-food-spice">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-3 bg-white font-bold">Breakfast</td>
            {daysOfWeek.map((day) => {
              const meal = localMealPlan[day.toLowerCase()]?.breakfast;
              return (
                <td key={`${day}-breakfast`} className="p-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-white p-3 rounded shadow cursor-pointer hover:shadow-md transition-shadow text-center min-h-24 flex flex-col items-center justify-center">
                        <p className="font-medium text-food-spice">{meal?.name}</p>
                        <button className="mt-2 text-xs text-gray-500 hover:text-food-spice">View Details</button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{meal?.name}</DialogTitle>
                        <DialogDescription>{meal?.description}</DialogDescription>
                      </DialogHeader>
                      {meal?.image && (
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <Button 
                        onClick={() => handleSwapMeal(day.toLowerCase(), 'breakfast')}
                        variant="outline"
                        className="flex items-center gap-2 mt-2"
                      >
                        <RefreshCw size={16} />
                        <span>Swap Meal</span>
                      </Button>
                    </DialogContent>
                  </Dialog>
                </td>
              );
            })}
          </tr>

          <tr className="border-b border-gray-200">
            <td className="p-3 bg-white font-bold">Lunch</td>
            {daysOfWeek.map((day) => {
              const meal = localMealPlan[day.toLowerCase()]?.lunch;
              return (
                <td key={`${day}-lunch`} className="p-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-white p-3 rounded shadow cursor-pointer hover:shadow-md transition-shadow text-center min-h-24 flex flex-col items-center justify-center">
                        <p className="font-medium text-food-spice">{meal?.name}</p>
                        <button className="mt-2 text-xs text-gray-500 hover:text-food-spice">View Details</button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{meal?.name}</DialogTitle>
                        <DialogDescription>{meal?.description}</DialogDescription>
                      </DialogHeader>
                      {meal?.image && (
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <Button 
                        onClick={() => handleSwapMeal(day.toLowerCase(), 'lunch')}
                        variant="outline"
                        className="flex items-center gap-2 mt-2"
                      >
                        <RefreshCw size={16} />
                        <span>Swap Meal</span>
                      </Button>
                    </DialogContent>
                  </Dialog>
                </td>
              );
            })}
          </tr>

          <tr className="border-b border-gray-200">
            <td className="p-3 bg-white font-bold">Dinner</td>
            {daysOfWeek.map((day) => {
              const meal = localMealPlan[day.toLowerCase()]?.dinner;
              return (
                <td key={`${day}-dinner`} className="p-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-white p-3 rounded shadow cursor-pointer hover:shadow-md transition-shadow text-center min-h-24 flex flex-col items-center justify-center">
                        <p className="font-medium text-food-spice">{meal?.name}</p>
                        <button className="mt-2 text-xs text-gray-500 hover:text-food-spice">View Details</button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{meal?.name}</DialogTitle>
                        <DialogDescription>{meal?.description}</DialogDescription>
                      </DialogHeader>
                      {meal?.image && (
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <Button 
                        onClick={() => handleSwapMeal(day.toLowerCase(), 'dinner')}
                        variant="outline"
                        className="flex items-center gap-2 mt-2"
                      >
                        <RefreshCw size={16} />
                        <span>Swap Meal</span>
                      </Button>
                    </DialogContent>
                  </Dialog>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyTimetable;
