
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  tribe: z.string().min(1, { message: 'Please select your tribe' }),
  age: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Please enter a valid age',
  }),
  weight: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Please enter a valid weight in kg',
  }),
  height: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Please enter a valid height in cm',
  }),
});

type UserFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

const UserForm = ({ onSubmit }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tribe: '',
      age: '',
      weight: '',
      height: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success('Form submitted successfully!');
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="tribe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tribe</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your tribe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yoruba">Yoruba</SelectItem>
                  <SelectItem value="igbo">Igbo</SelectItem>
                  <SelectItem value="hausa">Hausa</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                We'll customize your meal plan based on your tribe's cuisine.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Enter your age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your weight in kg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your height in cm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-food-spice hover:bg-food-palm transition-colors"
        >
          Generate My Meal Plan
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
