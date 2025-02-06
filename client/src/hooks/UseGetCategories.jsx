import React, { useEffect, useState } from 'react';
import { server } from '../axios';

export const UseGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getCategories = async () => {
    try {
      setIsLoading(true);
      console.log('about to hit endpoint');
      const { data, message, error } = (await server.get('/api/item/category'))
        .data;
      setIsLoading(false);
      if (error) {
        setErrorMessage(message);
        setIsLoading(false);
        return;
      }
      console.log('UseGetCategories data: ', data[1].options);
      setCategories(data[1].options);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occured while fetching data');
      setIsLoading(false);
      console.log('Error in UseGetCategories:', error);
      return;
    }
  };
  const updateCategories = async (newCategory, id) => {
    try {
      setIsLoading(true);
      setCategories([...categories, newCategory]);
      const { data, message, error } = await server.put(
        `/api/categories/:${id}`,
        categories,
      ).data;
      setIsLoading(false);
      if (error) {
        setErrorMessage(message);
        setIsLoading(false);
        return;
      }
      console.log('UseGetCategories data: ', data);
      setCategories(data[0].options);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occured while fetching data');
      setIsLoading(false);
      console.log('Error in UseGetCategories:', error);
      return;
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return {
    categories,
    errorMessage,
    isLoading,
    getCategories,
    updateCategories,
  };
};
