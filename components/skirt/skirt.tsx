import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';

// Assuming SkirtModel is imported from Mongoose or defined similarly
// const SkirtModel = ...

interface Props {
  onSubmit: () => void; // Define the onSubmit function signature as needed
}

const SkirtMeasurement: React.FC<Props> = ({ onSubmit }) => {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const [measurements, setMeasurements] = useState({
    waist: '',
    hips: '',
    legCircumference: '',
    length: '',
    description: '',
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
    // Validate form data here if needed
    // Example: Ensure all required fields are filled
    if (
      measurements.waist === '' ||
      measurements.hips === '' ||
      measurements.legCircumference === '' ||
      measurements.length === '' ||
      measurements.description === ''
    ) {
      // Handle validation error
      console.error('Please fill out all required fields.');
      return;
    }

    // Handle form submission logic (e.g., save to database using SkirtModel)
    // Example: Save measurements to database
    console.log('Measurements submitted:', measurements);
    // Reset form after submission
    setMeasurements({
      waist: '',
      hips: '',
      legCircumference: '',
      length: '',
      description: '',
    });

    // Call onSubmit function passed from parent component
    onSubmit();
  };

  return (
    <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.formTitle, { fontFamily: 'Raleway_700Bold' }]}>Skirt Measurement Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Waist (cm)"
          value={measurements.waist}
          onChangeText={(text) => handleInputChange('waist', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hips (cm)"
          value={measurements.hips}
          onChangeText={(text) => handleInputChange('hips', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Leg Circumference (cm)"
          value={measurements.legCircumference}
          onChangeText={(text) => handleInputChange('legCircumference', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Length (cm)"
          value={measurements.length}
          onChangeText={(text) => handleInputChange('length', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={measurements.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <Button title="Submit Measurements" onPress={handleFormSubmit} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#2467EC',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default SkirtMeasurement;
