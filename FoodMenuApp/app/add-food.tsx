import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const API_URL =
  'https://6a8e7121a12b7de8cc0e9aaf.mockapi.io/api/v1/FOOD';

const STORAGE_KEY = '@food_menu';

export default function AddFoodScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const addFood = async () => {
    // Check empty fields
    if (
      name.trim() === '' ||
      price.trim() === '' ||
      category.trim() === ''
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all fields.'
      );
      return;
    }

    // Check price
    const numericPrice = Number(price);

    if (
      isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price.'
      );
      return;
    }

    try {
      setLoading(true);

      // POST request to MockAPI
      const response = await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: name.trim(),
          price: numericPrice,
          category: category.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(
          'Failed to add food'
        );
      }

      // Get newly created food
      const newFood = await response.json();

      // Get existing local data
      const storedFoods =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      let existingFoods: any[] = [];

      if (storedFoods) {
        existingFoods = JSON.parse(
          storedFoods
        );
      }

      // Add new food to local data
      const updatedFoods = [
        ...existingFoods,
        newFood,
      ];

      // Save updated data locally
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedFoods)
      );

      // Clear fields
      setName('');
      setPrice('');
      setCategory('');

      Alert.alert(
        'Success',
        'Food item added successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );

    } catch (error) {
      console.log(
        'Add food error:',
        error
      );

      Alert.alert(
        'Error',
        'Unable to add food. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#333"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Add New Food
        </Text>

      </View>

      <Text style={styles.subtitle}>
        Add a new item to your food menu
      </Text>

      {/* Food Name */}

      <Text style={styles.label}>
        Food Name
      </Text>

      <View style={styles.inputContainer}>

        <Ionicons
          name="restaurant-outline"
          size={21}
          color="#777"
        />

        <TextInput
          style={styles.input}
          placeholder="e.g. Chicken Burger"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

      </View>

      {/* Price */}

      <Text style={styles.label}>
        Price
      </Text>

      <View style={styles.inputContainer}>

        <Ionicons
          name="pricetag-outline"
          size={21}
          color="#777"
        />

        <TextInput
          style={styles.input}
          placeholder="e.g. 1200"
          placeholderTextColor="#999"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

      </View>

      {/* Category */}

      <Text style={styles.label}>
        Category
      </Text>

      <View style={styles.inputContainer}>

        <Ionicons
          name="grid-outline"
          size={21}
          color="#777"
        />

        <TextInput
          style={styles.input}
          placeholder="e.g. Burger"
          placeholderTextColor="#999"
          value={category}
          onChangeText={setCategory}
        />

      </View>

      {/* Add Button */}

      <TouchableOpacity
        style={[
          styles.addButton,
          loading && styles.disabledButton,
        ]}
        onPress={addFood}
        disabled={loading}
      >

        <Ionicons
          name="add-circle-outline"
          size={24}
          color="white"
        />

        <Text style={styles.buttonText}>
          {loading
            ? 'Adding...'
            : 'Add Food'}
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f7f7f7',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    marginRight: 10,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    color: '#777',
    marginTop: 8,
    marginBottom: 25,
    fontSize: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
    color: '#333',
  },

  inputContainer: {
    height: 52,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },

  addButton: {
    height: 55,
    backgroundColor: '#e67e22',
    borderRadius: 12,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});