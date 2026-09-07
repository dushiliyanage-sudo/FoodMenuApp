import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Food = {
  ID: string;
  name: string;
  price: number;
  category: string;
};

const API_URL =
  'https://6a8e7121a12b7de8cc0e9aaf.mockapi.io/api/v1/FOOD';

const STORAGE_KEY = '@food_menu';

export default function HomeScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState('');

  // ==========================================
  // SAVE DATA TO ASYNC STORAGE
  // ==========================================

  const saveFoodsLocally = async (data: Food[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (error) {
      console.log('Local save error:', error);
    }
  };

  // ==========================================
  // GET DATA FROM ASYNC STORAGE
  // ==========================================

  const getLocalFoods = async (): Promise<Food[]> => {
    try {
      const storedFoods =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (storedFoods) {
        return JSON.parse(storedFoods);
      }

      return [];
    } catch (error) {
      console.log('Local read error:', error);
      return [];
    }
  };

  // ==========================================
  // GET FOODS FROM API
  // ==========================================

  const fetchFoods = async () => {
    try {
      setError('');
      setOffline(false);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: Food[] = await response.json();

      setFoods(data);

      // Save latest API data locally
      await saveFoodsLocally(data);

      setOffline(false);
      setError('');
    } catch (error) {
      console.log('API Error:', error);

      // API unavailable
      setOffline(true);

      // Try local storage
      const localFoods = await getLocalFoods();

      if (localFoods.length > 0) {
        setFoods(localFoods);
        setError(
          'Internet unavailable. Showing saved menu.'
        );
      } else {
        setFoods([]);
        setError(
          'No internet connection and no saved food data is available.'
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // LOAD DATA WHEN SCREEN OPENS
  // ==========================================

  useFocusEffect(
    useCallback(() => {
      fetchFoods();
    }, [])
  );

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFoods();
  };

  // ==========================================
  // DELETE FOOD
  // ==========================================

  const deleteFood = (
    id: string,
    name: string
  ) => {
    Alert.alert(
      'Delete Food',
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',

          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/${id}`,
                {
                  method: 'DELETE',
                }
              );

              if (!response.ok) {
                throw new Error(
                  'Delete request failed'
                );
              }

              const updatedFoods = foods.filter(
                (food) => food.ID !== id
              );

              setFoods(updatedFoods);

              // Update local storage
              await saveFoodsLocally(updatedFoods);

              Alert.alert(
                'Success',
                `${name} deleted successfully.`
              );
            } catch (error) {
              Alert.alert(
                'Error',
                'Unable to delete food. Please check your internet connection.'
              );
            }
          },
        },
      ]
    );
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <View style={styles.center}>
        <View style={styles.loadingIcon}>
          <Ionicons
            name="fast-food-outline"
            size={55}
            color="#e67e22"
          />
        </View>

        <ActivityIndicator
          size="large"
          color="#e67e22"
          style={styles.loader}
        />

        <Text style={styles.message}>
          Loading menu...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* ======================================
          HEADER
      ====================================== */}

      <View style={styles.header}>
        <View style={styles.titleContainer}>

          <View style={styles.logo}>
            <Ionicons
              name="fast-food"
              size={30}
              color="#e67e22"
            />
          </View>

          <View>
            <Text style={styles.title}>
              Food Menu
            </Text>

            <Text style={styles.subtitle}>
              Delicious food at your fingertips
            </Text>
          </View>

        </View>
      </View>

      {/* ======================================
          OFFLINE MODE BANNER
      ====================================== */}

      {offline && (
        <View style={styles.offlineBanner}>

          <View style={styles.offlineIcon}>
            <Ionicons
              name="cloud-offline-outline"
              size={23}
              color="#856404"
            />
          </View>

          <View style={styles.offlineContent}>

            <Text style={styles.offlineTitle}>
              OFFLINE MODE
            </Text>

            <Text style={styles.offlineText}>
              {foods.length > 0
                ? 'Showing your saved food menu.'
                : 'Internet connection is unavailable.'}
            </Text>

          </View>

        </View>
      )}

      {/* ======================================
          ONLINE MODE
      ====================================== */}

      {!offline && (
        <View style={styles.onlineBanner}>

          <Ionicons
            name="cloud-done-outline"
            size={20}
            color="#287a3d"
          />

          <Text style={styles.onlineText}>
            Online • Menu is up to date
          </Text>

        </View>
      )}

      {/* ======================================
          ERROR WITH NO DATA
      ====================================== */}

      {foods.length === 0 && error !== '' ? (

        <View style={styles.center}>

          <Ionicons
            name="restaurant-outline"
            size={70}
            color="#aaa"
          />

          <Text style={styles.errorTitle}>
            No Food Data Available
          </Text>

          <Text style={styles.error}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchFoods}
          >

            <Ionicons
              name="refresh"
              size={20}
              color="white"
            />

            <Text style={styles.buttonText}>
              Try Again
            </Text>

          </TouchableOpacity>

        </View>

      ) : (

        <>

          {/* ======================================
              MENU HEADER
          ====================================== */}

          <View style={styles.menuHeader}>

            <Text style={styles.menuTitle}>
              Available Foods
            </Text>

            <View style={styles.countBadge}>

              <Text style={styles.countText}>
                {foods.length}
              </Text>

            </View>

          </View>

          {/* ======================================
              FOOD LIST
          ====================================== */}

          <FlatList
            data={foods}
            keyExtractor={(item) => item.ID}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={styles.list}

            renderItem={({ item }) => (

              <View style={styles.foodCard}>

                {/* Food Icon */}

                <View style={styles.foodIcon}>

                  <Ionicons
                    name="restaurant"
                    size={28}
                    color="#e67e22"
                  />

                </View>

                {/* Food Information */}

                <View style={styles.foodInfo}>

                  <Text
                    style={styles.foodName}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  {/* Price */}

                  <View style={styles.detailRow}>

                    <Ionicons
                      name="pricetag-outline"
                      size={16}
                      color="#777"
                    />

                    <Text style={styles.price}>
                      Rs. {item.price}
                    </Text>

                  </View>

                  {/* Category */}

                  <View style={styles.detailRow}>

                    <Ionicons
                      name="grid-outline"
                      size={16}
                      color="#777"
                    />

                    <Text style={styles.category}>
                      {item.category}
                    </Text>

                  </View>

                </View>

                {/* =================================
                    ACTION BUTTONS
                ================================= */}

                <View style={styles.actionButtons}>

                  {/* EDIT */}

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                      router.push({
                        pathname: '/edit-food',
                        params: {
                          id: item.ID,
                          name: item.name,
                          price: String(item.price),
                          category: item.category,
                        },
                      })
                    }
                  >

                    <Ionicons
                      name="create-outline"
                      size={20}
                      color="white"
                    />

                  </TouchableOpacity>

                  {/* DELETE */}

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      deleteFood(
                        item.ID,
                        item.name
                      )
                    }
                  >

                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="white"
                    />

                  </TouchableOpacity>

                </View>

              </View>
            )}
          />

        </>
      )}

      {/* ======================================
          ADD FOOD BUTTON
      ====================================== */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push('/add-food')
        }
      >

        <Ionicons
          name="add-circle-outline"
          size={25}
          color="white"
        />

        <Text style={styles.addButtonText}>
          Add Food
        </Text>

      </TouchableOpacity>

    </View>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 55,
    backgroundColor: '#f7f7f7',
  },

  header: {
    marginBottom: 15,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  /* OFFLINE */

  offlineBanner: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: '#ffe69c',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  offlineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffecb5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  offlineContent: {
    flex: 1,
    marginLeft: 10,
  },

  offlineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
  },

  offlineText: {
    fontSize: 12,
    color: '#856404',
    marginTop: 2,
  },

  /* ONLINE */

  onlineBanner: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  onlineText: {
    color: '#287a3d',
    marginLeft: 7,
    fontSize: 13,
    fontWeight: '600',
  },

  /* MENU */

  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  countBadge: {
    backgroundColor: '#e67e22',
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  countText: {
    color: 'white',
    fontWeight: 'bold',
  },

  list: {
    paddingBottom: 10,
  },

  /* FOOD CARD */

  foodCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  foodIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#fff0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  foodInfo: {
    flex: 1,
    marginRight: 8,
  },

  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  price: {
    fontSize: 15,
    color: '#333',
    marginLeft: 6,
    fontWeight: '600',
  },

  category: {
    fontSize: 14,
    color: '#777',
    marginLeft: 6,
  },

  /* ACTION BUTTONS */

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ADD */

  addButton: {
    height: 55,
    backgroundColor: '#e67e22',
    borderRadius: 15,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  addButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  /* CENTER */

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#f7f7f7',
  },

  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loader: {
    marginTop: 20,
  },

  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },

  /* ERROR */

  errorTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
    textAlign: 'center',
  },

  error: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },

  retryButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 7,
  },

});