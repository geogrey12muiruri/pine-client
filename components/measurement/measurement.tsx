import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'blazer', icon: 'shirt-outline' },
  { name: 'shirt', icon: 'shirt-outline' },
  { name: 'trouser', icon: 'man-outline' },
  { name: 'halfcoat', icon: 'cut-outline' },
  { name: 'skirt', icon: 'woman-outline' },
  { name: 'dress', icon: 'woman-outline' },
];

export default function Measurement() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hip: '',
    sleeve: '',
    length: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setMeasurements(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Submitted Measurements:', measurements);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Category</Text>
      <ScrollView horizontal style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity 
            key={category.name} 
            style={styles.category} 
            onPress={() => setSelectedCategory(category.name)}
          >
            <Ionicons 
              name={category.icon} 
              size={32} 
              color={selectedCategory === category.name ? 'blue' : 'black'}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {selectedCategory && (
        <>
          <Text style={styles.header}>Enter Your Measurements for {selectedCategory}</Text>
          <TextInput
            style={styles.input}
            placeholder="Chest (inches)"
            value={measurements.chest}
            onChangeText={value => handleInputChange('chest', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Waist (inches)"
            value={measurements.waist}
            onChangeText={value => handleInputChange('waist', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Hip (inches)"
            value={measurements.hip}
            onChangeText={value => handleInputChange('hip', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Sleeve (inches)"
            value={measurements.sleeve}
            onChangeText={value => handleInputChange('sleeve', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Length (inches)"
            value={measurements.length}
            onChangeText={value => handleInputChange('length', value)}
            keyboardType="numeric"
          />
          <Button title="Submit" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  category: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryText: {
    marginTop: 5,
    textTransform: 'capitalize',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
});
