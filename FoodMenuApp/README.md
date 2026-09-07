# 🍔 Food Menu App

A cross-platform mobile application developed using **React Native, Expo, and TypeScript** for managing food menu items. The application allows users to view, add, edit, and delete food items while retrieving and storing data through a REST API.

## 📱 Application Overview

The Food Menu App provides a simple and user-friendly interface for managing food menu items.

Users can:

* 🍽️ View available food items
* ➕ Add new food items
* ✏️ Edit existing food items
* 🗑️ Delete food items
* 🗂️ Browse food categories
* 🌐 Retrieve data from a REST API
* 💾 Store food data locally
* 📡 View previously cached data when offline
* ⏳ View loading states while data is being retrieved
* ⚠️ Receive error messages when API/network requests fail
* 📭 Handle empty menu states

## ✨ Features

### 🏠 Home Screen

The Home screen displays food items retrieved from the MockAPI REST API. Users can view the available menu items and access the main food management functions.

### 🗂️ Categories

The Categories screen allows users to browse food according to different categories, including:

* Burgers
* Pizza
* Pasta
* Healthy
* Desserts
* Drinks

### ➕ Add Food

Users can create a new food menu item by entering the required information. The application sends the new record to MockAPI using a **POST** request.

### ✏️ Edit Food

Existing food items can be modified through the Edit Food screen. The application uses a **PUT** request to update the selected record.

### 🗑️ Delete Food

Users can remove unwanted food items. The application sends a **DELETE** request to remove the selected record from MockAPI.

### 🌐 REST API Integration

The application uses **MockAPI** as the backend REST API.

The following operations are implemented:

| Operation     | HTTP Method | Purpose                   |
| ------------- | ----------- | ------------------------- |
| Retrieve food | GET         | Fetch food records        |
| Add food      | POST        | Create a new food record  |
| Edit food     | PUT         | Update an existing record |
| Delete food   | DELETE      | Remove a food record      |

### 💾 Local Storage

**AsyncStorage** is used for local data persistence. Food records retrieved from the API are cached locally on the device.

When the API cannot be reached, previously cached food data can be retrieved from local storage, allowing the application to provide offline access to previously loaded menu items.

### 📡 Offline Mode

The application supports offline data access by using previously cached food records.

When the device is disconnected from the internet, the application can display the cached menu data and indicate that the application is operating in offline mode.

### ⏳ Loading, Error and Empty States

The application handles different data states to improve the user experience:

* **Loading state** – displays an ActivityIndicator while API data is loading.
* **Error state** – displays an appropriate message when an API or network request fails.
* **Empty state** – informs the user when no food records are available.

## 🧭 Navigation

The application uses **Expo Router** for file-based navigation.

Main screens include:

```text
app/
├── index.tsx
├── categories.tsx
├── add-food.tsx
└── edit-food.tsx
```

The application provides navigation between the main Home and Categories areas, with additional screens for creating and editing food records.

## 🛠️ Technologies Used

* **React Native** – Mobile application development
* **Expo** – Development and build environment
* **TypeScript** – Programming language
* **Expo Router** – Navigation and routing
* **MockAPI** – REST API backend
* **AsyncStorage** – Local data persistence
* **React Hooks** – State management
* **JavaScript Fetch API** – REST API communication

## 📸 Application Screenshots

### 🏠 Home Screen

The Home screen displays the available food menu items retrieved from the REST API.

![Home Screen](screenshots/home.pngjpeg)

### 🗂️ Categories Screen

The Categories screen displays the available food categories.

![Categories Screen](screenshots/categories.jpeg)

### ➕ Add Food Screen

Users can add a new food item to the menu.

![Add Food Screen](screenshots/add-food.jpeg)

### ✏️ Edit Food Screen

Users can edit the details of an existing food item.

![Edit Food Screen](screenshots/edit-food.jpeg)

### 📡 Offline Mode

The application can display previously cached food data when the device is offline.

![Offline Mode](screenshots/offline.jpeg)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Expo
* Expo Go (for testing on a mobile device)

### Installation

Clone the repository:

```bash
git clone https://github.com/dushiliyanage-sudo/FoodMenuApp
```

Navigate to the project directory:

```bash
cd FoodMenuApp
```

Install the dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

You can then open the application using:

* Expo Go
* Android Emulator
* iOS Simulator
* Development build

## 📂 Project Structure

```text
FoodMenuApp/
│
├── app/
│   ├── index.tsx
│   ├── categories.tsx
│   ├── add-food.tsx
│   └── edit-food.tsx
│
├── components/
├── hooks/
├── assets/
├── package.json
├── app.json
└── README.md
```

> The exact folder structure may vary depending on the final implementation.

## 🔄 Application Data Flow

```text
User
  ↓
React Native Interface
  ↓
Screen / Component
  ↓
Fetch API Request
  ↓
MockAPI REST API
  ↓
Food Data
  ↓
React State
  ↓
User Interface

        ↘
      AsyncStorage
        ↓
   Cached Local Data
        ↓
    Offline Access
```

## 🧪 Testing

The application was tested for the main Sprint 2 functionality:

* GET food records
* POST new food records
* PUT existing food records
* DELETE food records
* Local data persistence using AsyncStorage
* Offline data access
* Loading state
* Error handling
* Empty state
* Navigation between screens
* Food category display

## 🎓 Assessment

This application was developed as part of:

**CSI2114 – Mobile Application Development**
**ACBT | Advanced Diploma of Computer Science | Curriculum 2026**

The application demonstrates REST API integration, CRUD functionality, local persistence, state management, navigation, and user interface design required for the Sprint 2 Feature-Complete App assessment.

## 👩‍💻 Author

**Food Menu App – Mobile Application Development**

---

⭐ If you found this project useful, feel free to explore the repository and its implementation.
