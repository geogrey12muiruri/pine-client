import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Button } from 'react-native';
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';
import BlazerMeasurement from '@/components/blazer/blazer'; // Assuming the path to your BlazerMeasurement component
import PantsMeasurement from '@/components/trouser/trouser'; // Adjust path as per your project structure
import ShirtMeasurement from '@/components/shirt/shirt';
import HalfCoatMeasurement from '@/components/halfcoat/halfcoat';
import SkirtMeasurement from '@/components/skirt/skirt';
import DressMeasurement from '@/components/dress/dress';
// import ShoesMeasurement from '@/components/shoes/shoes';


export default function MeasurementScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const categories = ['Blazer', 'Pants', 'Shirt', 'HalfCoat', 'Skirt', 'Dress', 'Shoes'];
  const popularDesigns = [
    { id: 1, name: 'Design 1', image: require('@/assets/images/threep.jpg') },
    { id: 2, name: 'Design 2', image: require('@/assets/images/threepiece.jpeg') },
    { id: 3, name: 'Design 3', image: require('@/assets/images/threep.jpg') },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleInputChange = (field, value) => {
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
    // Handle form submission logic
    console.log('Measurements submitted:', measurements);
    // Reset form after submission
    setMeasurements({
      chest: '',
      waist: '',
      hips: '',
      inseam: '',
    });
    setSelectedCategory(null);
  };

  return (
    <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontFamily: 'Raleway_700Bold' }]}>Measurement Screen</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { fontFamily: 'Raleway_700Bold' }]}>
          Choose an apparel to add Measurement
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryButton}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={[styles.categoryText, { fontFamily: 'Raleway_600SemiBold' }]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedCategory === 'Blazer' && (
          <BlazerMeasurement onSubmit={handleFormSubmit} />
        )}

{selectedCategory === 'Pants' && (
  <PantsMeasurement onSubmit={handleFormSubmit} />
)}

{selectedCategory === 'Shirt' && (
  <ShirtMeasurement onSubmit={handleFormSubmit} />
)}

{selectedCategory === 'HalfCoat' && (
  <HalfCoatMeasurement onSubmit={handleFormSubmit} />
)}

{selectedCategory === 'Skirt' && (
  <SkirtMeasurement onSubmit={handleFormSubmit} />
)}

{selectedCategory === 'Dress' && (
  <DressMeasurement onSubmit={handleFormSubmit} />
)}

{/* {selectedCategory === 'Shoes' && (
  <ShoesMeasurement onSubmit={handleFormSubmit} />
)} */}


        {!selectedCategory && (
          <>
            <Text style={[styles.popularTitle, { fontFamily: 'Raleway_700Bold' }]}>Popular Designs</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
              {popularDesigns.map((design) => (
                <TouchableOpacity key={design.id} style={styles.designCard}>
                  <Image source={design.image} style={styles.designImage} />
                  <Text style={[styles.designName, { fontFamily: 'Raleway_600SemiBold' }]}>
                    {design.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.popularTitle, { fontFamily: 'Raleway_700Bold' }]}>Accessories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
              {popularDesigns.map((design) => (
                <TouchableOpacity key={design.id} style={styles.designCard}>
                  <Image source={design.image} style={styles.designImage} />
                  <Text style={[styles.designName, { fontFamily: 'Raleway_600SemiBold' }]}>
                    {design.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2467EC',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    marginVertical: 20,
    textAlign: 'center',
  },
  categoryScroll: {
    marginBottom: 30,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#2467EC',
  },
  popularTitle: {
    fontSize: 22,
    marginBottom: 10,
  },
  popularScroll: {
    marginBottom: 20,
  },
  designCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  designImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  designName: {
    fontSize: 16,
    textAlign: 'center',
  },
});
