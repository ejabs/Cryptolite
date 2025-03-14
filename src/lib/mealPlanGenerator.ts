
// Nigerian meal data by tribe
type Meal = {
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

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'dessert';

// Sample meal data
const yorubaMeals: Record<MealType, Meal[]> = {
  breakfast: [
    {
      name: "Akara and Pap",
      description: "Bean cakes served with sweet corn pap, a traditional Yoruba breakfast rich in protein.",
      nutrition: {
        calories: 350,
        protein: 15,
        carbs: 45,
        fat: 10
      }
    },
    {
      name: "Ewa Agoyin and Bread",
      description: "Mashed beans in spicy sauce served with bread, a filling breakfast option.",
      nutrition: {
        calories: 420,
        protein: 18,
        carbs: 65,
        fat: 8
      }
    },
    {
      name: "Bread and Egg Sauce",
      description: "Bread served with a rich tomato and egg sauce, topped with sautéed vegetables.",
      nutrition: {
        calories: 380,
        protein: 14,
        carbs: 50,
        fat: 12
      }
    }
  ],
  lunch: [
    {
      name: "Jollof Rice and Chicken",
      description: "Spicy rice cooked in tomato sauce with bell peppers and spices, served with grilled chicken.",
      nutrition: {
        calories: 550,
        protein: 28,
        carbs: 70,
        fat: 15
      }
    },
    {
      name: "Amala and Ewedu Soup",
      description: "Yam flour swallow served with jute leaf soup and assorted meat, a Yoruba classic.",
      nutrition: {
        calories: 480,
        protein: 22,
        carbs: 65,
        fat: 12
      }
    },
    {
      name: "Ofada Rice and Ayamase Sauce",
      description: "Local brown rice served with spicy green pepper sauce and assorted meats.",
      nutrition: {
        calories: 600,
        protein: 25,
        carbs: 75,
        fat: 18
      }
    }
  ],
  dinner: [
    {
      name: "Pounded Yam and Egusi Soup",
      description: "Smooth yam paste served with melon seed soup cooked with vegetables and fish.",
      nutrition: {
        calories: 620,
        protein: 30,
        carbs: 80,
        fat: 20
      }
    },
    {
      name: "Eba and Okra Soup",
      description: "Cassava meal served with slimy okra soup, fish, and meat.",
      nutrition: {
        calories: 520,
        protein: 25,
        carbs: 70,
        fat: 15
      }
    },
    {
      name: "Moin Moin and Dodo",
      description: "Steamed bean pudding served with fried plantains, a lighter dinner option.",
      nutrition: {
        calories: 450,
        protein: 18,
        carbs: 60,
        fat: 12
      }
    }
  ],
  dessert: [
    {
      name: "Adun (Coconut Candy)",
      description: "Sweet coconut treat made with sugar and spices.",
      nutrition: {
        calories: 180,
        protein: 2,
        carbs: 25,
        fat: 8
      }
    },
    {
      name: "Dodo Ikire",
      description: "Sweet over-ripe plantain snack deep-fried in palm oil.",
      nutrition: {
        calories: 220,
        protein: 1,
        carbs: 35,
        fat: 10
      }
    }
  ]
};

const igboMeals: Record<MealType, Meal[]> = {
  breakfast: [
    {
      name: "Akara and Akamu",
      description: "Bean cakes served with corn pap, an Igbo morning staple.",
      nutrition: {
        calories: 340,
        protein: 14,
        carbs: 47,
        fat: 9
      }
    },
    {
      name: "Abacha and Ugba",
      description: "African salad made with cassava and oil bean, a refreshing breakfast option.",
      nutrition: {
        calories: 300,
        protein: 12,
        carbs: 40,
        fat: 10
      }
    },
    {
      name: "Okpa",
      description: "Bambara nut pudding, a protein-rich breakfast eaten on its own.",
      nutrition: {
        calories: 320,
        protein: 16,
        carbs: 38,
        fat: 8
      }
    }
  ],
  lunch: [
    {
      name: "Ofe Onugbu and Fufu",
      description: "Bitter leaf soup served with cassava fufu, a traditional Igbo meal.",
      nutrition: {
        calories: 520,
        protein: 24,
        carbs: 68,
        fat: 16
      }
    },
    {
      name: "Ofe Akwu and Starch",
      description: "Palm nut soup served with cassava starch, rich in flavors and nutrients.",
      nutrition: {
        calories: 550,
        protein: 22,
        carbs: 70,
        fat: 18
      }
    },
    {
      name: "Oha Soup and Pounded Yam",
      description: "Delicate soup made with oha leaves served with pounded yam.",
      nutrition: {
        calories: 580,
        protein: 26,
        carbs: 75,
        fat: 15
      }
    }
  ],
  dinner: [
    {
      name: "Ji Mmanu (Fried Yam)",
      description: "Fried yam chunks served with spicy pepper sauce.",
      nutrition: {
        calories: 420,
        protein: 8,
        carbs: 65,
        fat: 14
      }
    },
    {
      name: "Ugba with Ukwa",
      description: "African oil bean seed salad with breadfruit, a light dinner option.",
      nutrition: {
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 12
      }
    },
    {
      name: "Utara Soup and Garri",
      description: "Water leaf soup served with cassava granules, easy to digest at night.",
      nutrition: {
        calories: 450,
        protein: 18,
        carbs: 60,
        fat: 10
      }
    }
  ],
  dessert: [
    {
      name: "Igbo Coconut Rice",
      description: "Sweet coconut rice dessert, flavored with cinnamon and nutmeg.",
      nutrition: {
        calories: 230,
        protein: 3,
        carbs: 38,
        fat: 7
      }
    },
    {
      name: "Kunu",
      description: "Sweet millet drink that can be served as a light dessert.",
      nutrition: {
        calories: 150,
        protein: 2,
        carbs: 30,
        fat: 1
      }
    }
  ]
};

const hausaMeals: Record<MealType, Meal[]> = {
  breakfast: [
    {
      name: "Kosai and Koko",
      description: "Northern bean cakes served with spiced millet porridge.",
      nutrition: {
        calories: 330,
        protein: 13,
        carbs: 45,
        fat: 8
      }
    },
    {
      name: "Masa and Suya",
      description: "Rice cakes served with spiced grilled meat, a hearty Hausa breakfast.",
      nutrition: {
        calories: 420,
        protein: 22,
        carbs: 50,
        fat: 14
      }
    },
    {
      name: "Fura da Nono",
      description: "Millet balls in soured milk, a traditional Hausa breakfast with probiotics.",
      nutrition: {
        calories: 280,
        protein: 10,
        carbs: 42,
        fat: 6
      }
    }
  ],
  lunch: [
    {
      name: "Tuwo Shinkafa and Miyan Kuka",
      description: "Rice pudding served with baobab leaf soup, a northern Nigerian classic.",
      nutrition: {
        calories: 510,
        protein: 18,
        carbs: 72,
        fat: 12
      }
    },
    {
      name: "Tuwo Masara and Miyan Taushe",
      description: "Corn flour pudding with pumpkin soup, rich in vitamins.",
      nutrition: {
        calories: 480,
        protein: 16,
        carbs: 70,
        fat: 10
      }
    },
    {
      name: "Danwake",
      description: "Bean and millet dumplings served with spicy oil, a filling lunch option.",
      nutrition: {
        calories: 450,
        protein: 20,
        carbs: 65,
        fat: 9
      }
    }
  ],
  dinner: [
    {
      name: "Kunun Gyada and Masa",
      description: "Groundnut rice pudding served with rice cakes, perfect for dinner.",
      nutrition: {
        calories: 420,
        protein: 15,
        carbs: 60,
        fat: 12
      }
    },
    {
      name: "Miyan Karkashi and Tuwon Dawa",
      description: "Spinach soup served with guinea corn pudding, nutritious and filling.",
      nutrition: {
        calories: 480,
        protein: 18,
        carbs: 64,
        fat: 13
      }
    },
    {
      name: "Waina and Miyan Yakuwa",
      description: "Rice cakes served with green leafy soup, light on the stomach for evening.",
      nutrition: {
        calories: 400,
        protein: 14,
        carbs: 58,
        fat: 10
      }
    }
  ],
  dessert: [
    {
      name: "Gurasa",
      description: "Northern Nigerian flatbread often served with honey or spiced dip.",
      nutrition: {
        calories: 200,
        protein: 4,
        carbs: 32,
        fat: 6
      }
    },
    {
      name: "Dakuwa",
      description: "Sweet groundnut and tiger nut snack, rich in healthy fats.",
      nutrition: {
        calories: 260,
        protein: 8,
        carbs: 20,
        fat: 18
      }
    }
  ]
};

// Helper function to get random meal from array
const getRandomMeal = (meals: Meal[]): Meal => {
  return meals[Math.floor(Math.random() * meals.length)];
};

// Function to generate meal plan based on user input
export const generateMealPlan = (userData: any) => {
  const { tribe, age, weight, height } = userData;
  
  // Select the appropriate meal database based on tribe
  let mealDatabase;
  switch (tribe.toLowerCase()) {
    case 'yoruba':
      mealDatabase = yorubaMeals;
      break;
    case 'igbo':
      mealDatabase = igboMeals;
      break;
    case 'hausa':
      mealDatabase = hausaMeals;
      break;
    default:
      // Default to Yoruba if no valid tribe is selected
      mealDatabase = yorubaMeals;
  }
  
  // Days of the week
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Generate meal plan for each day
  const mealPlan: Record<string, any> = {};
  
  days.forEach(day => {
    mealPlan[day] = {
      breakfast: getRandomMeal(mealDatabase.breakfast),
      lunch: getRandomMeal(mealDatabase.lunch),
      dinner: getRandomMeal(mealDatabase.dinner)
    };
    
    // Add dessert on some days
    if (['friday', 'saturday', 'sunday'].includes(day)) {
      mealPlan[day].dessert = getRandomMeal(mealDatabase.dessert);
    }
  });
  
  return mealPlan;
};

// Function to swap a meal
export const swapMeal = (day: string, mealType: MealType): Meal => {
  // Get user's tribe preference from localStorage
  const storedUserData = localStorage.getItem('userData');
  let mealDatabase;
  
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    
    switch (userData.tribe.toLowerCase()) {
      case 'yoruba':
        mealDatabase = yorubaMeals;
        break;
      case 'igbo':
        mealDatabase = igboMeals;
        break;
      case 'hausa':
        mealDatabase = hausaMeals;
        break;
      default:
        mealDatabase = yorubaMeals;
    }
  } else {
    // Default to Yoruba if no user data
    mealDatabase = yorubaMeals;
  }
  
  // Return a random meal of the specified type
  return getRandomMeal(mealDatabase[mealType]);
};
