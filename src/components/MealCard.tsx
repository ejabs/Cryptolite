
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RefreshCw } from 'lucide-react';

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

type MealCardProps = {
  title: string;
  meal: MealType;
  onSwap: () => void;
};

const MealCard = ({ title, meal, onSwap }: MealCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-food-spice">{title}</CardTitle>
        <CardDescription className="text-sm">{meal.name}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto text-left text-gray-700 hover:text-food-spice">
              View details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{meal.name}</DialogTitle>
              <DialogDescription>{meal.description}</DialogDescription>
            </DialogHeader>
            {meal.image && (
              <div className="aspect-video overflow-hidden rounded-md">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
              </div>
            )}
            {meal.nutrition && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Nutrition Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-food-cream p-2 rounded">
                    <p className="font-medium">Calories</p>
                    <p>{meal.nutrition.calories} kcal</p>
                  </div>
                  <div className="bg-food-cream p-2 rounded">
                    <p className="font-medium">Protein</p>
                    <p>{meal.nutrition.protein}g</p>
                  </div>
                  <div className="bg-food-cream p-2 rounded">
                    <p className="font-medium">Carbs</p>
                    <p>{meal.nutrition.carbs}g</p>
                  </div>
                  <div className="bg-food-cream p-2 rounded">
                    <p className="font-medium">Fat</p>
                    <p>{meal.nutrition.fat}g</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-food-spice text-food-spice hover:bg-food-spice hover:text-white"
          onClick={onSwap}
        >
          <RefreshCw size={14} className="mr-2" />
          Swap Meal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
