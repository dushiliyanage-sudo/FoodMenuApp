import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = [
  {
    name: 'Burgers',
    icon: 'fast-food-outline' as const,
    description: 'Juicy burgers and tasty sandwiches',
  },
  {
    name: 'Pizza',
    icon: 'pizza-outline' as const,
    description: 'Fresh and delicious pizzas',
  },
  {
    name: 'Pasta',
    icon: 'restaurant-outline' as const,
    description: 'Delicious pasta dishes',
  },
  {
    name: 'Healthy',
    icon: 'leaf-outline' as const,
    description: 'Fresh and healthy meals',
  },
  {
    name: 'Desserts',
    icon: 'ice-cream-outline' as const,
    description: 'Sweet treats and desserts',
  },
  {
    name: 'Drinks',
    icon: 'cafe-outline' as const,
    description: 'Refreshing drinks',
  },
];

export default function CategoriesScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons
            name="grid-outline"
            size={32}
            color="#e67e22"
          />
        </View>

        <View>
          <Text style={styles.title}>
            Categories
          </Text>

          <Text style={styles.subtitle}>
            Find your favourite food
          </Text>
        </View>
      </View>

      {/* Welcome Card */}

      <View style={styles.welcomeCard}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>
            What are you craving? 🍽️
          </Text>

          <Text style={styles.welcomeDescription}>
            Browse our food categories and
            discover delicious choices.
          </Text>
        </View>

        <Ionicons
          name="restaurant"
          size={62}
          color="#e67e22"
        />
      </View>

      {/* Categories */}

      <Text style={styles.sectionTitle}>
        Food Categories
      </Text>

      <View style={styles.categoryGrid}>
        {categories.map((category) => (
          <View
            key={category.name}
            style={styles.categoryCard}
          >
            <View style={styles.categoryIcon}>
              <Ionicons
                name={category.icon}
                size={30}
                color="#e67e22"
              />
            </View>

            <Text style={styles.categoryName}>
              {category.name}
            </Text>

            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actionCard}>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/add-food')}
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name="add-circle-outline"
              size={25}
              color="#27ae60"
            />
          </View>

          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>
              Add New Food
            </Text>

            <Text style={styles.actionDescription}>
              Add a new item to your menu
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/')}
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name="restaurant-outline"
              size={25}
              color="#e67e22"
            />
          </View>

          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>
              View Full Menu
            </Text>

            <Text style={styles.actionDescription}>
              View and manage all food items
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />
        </TouchableOpacity>

      </View>

      {/* App Information */}

      <Text style={styles.sectionTitle}>
        About Food Menu
      </Text>

      <View style={styles.infoCard}>

        <View style={styles.infoIcon}>
          <Ionicons
            name="information-circle-outline"
            size={30}
            color="#e67e22"
          />
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>
            Food Menu Management
          </Text>

          <Text style={styles.infoText}>
            This application allows users to
            view, add, edit and delete food
            records through a REST API.
          </Text>
        </View>

      </View>

      {/* Features */}

      <View style={styles.featuresCard}>

        <View style={styles.feature}>
          <Ionicons
            name="cloud-outline"
            size={22}
            color="#2980b9"
          />

          <Text style={styles.featureText}>
            REST API
          </Text>
        </View>

        <View style={styles.feature}>
          <Ionicons
            name="create-outline"
            size={22}
            color="#2980b9"
          />

          <Text style={styles.featureText}>
            CRUD Operations
          </Text>
        </View>

        <View style={styles.feature}>
          <Ionicons
            name="cloud-offline-outline"
            size={22}
            color="#8e44ad"
          />

          <Text style={styles.featureText}>
            Offline Storage
          </Text>
        </View>

      </View>

      <View style={styles.bottomSpace} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
  },

  headerIcon: {
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

  welcomeCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#fff0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  welcomeText: {
    flex: 1,
    marginRight: 10,
  },

  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  welcomeDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 5,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  categoryCard: {
    width: '46%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: '2%',
    marginBottom: 12,
    elevation: 2,
  },

  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  categoryName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },

  categoryDescription: {
    fontSize: 12,
    color: '#777',
    lineHeight: 17,
  },

  actionCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 25,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  actionText: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  actionDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
  },

  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    elevation: 2,
    marginBottom: 12,
  },

  infoIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },

  infoText: {
    fontSize: 13,
    color: '#777',
    lineHeight: 19,
  },

  featuresCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  feature: {
    alignItems: 'center',
    flex: 1,
  },

  featureText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },

  bottomSpace: {
    height: 40,
  },
});