import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';

// Assuming DressModel is imported from Mongoose or defined similarly
// const DressModel = ...

interface Props {
  onSubmit: () => void; // Define the onSubmit function signature as needed
}

const DressMeasurement: React.FC<Props> = ({ onSubmit }) => {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const [measurements, setMeasurements] = useState({
    bust: '',
    underBust: '',
    waist: '',
    hips: '',
    fullLength: '',
    lengthFromWaist: '',
    lengthFromArmpits: '',
    armLength: '',
    bicepsCircumference: '',
    elbowCircumference: '',
    wristCircumference: '',
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
      measurements.bust === '' ||
      measurements.underBust === '' ||
      measurements.waist === '' ||
      measurements.hips === '' ||
      measurements.fullLength === '' ||
      measurements.lengthFromWaist === '' ||
      measurements.lengthFromArmpits === '' ||
      measurements.description === ''
    ) {
      // Handle validation error
      console.error('Please fill out all required fields.');
      return;
    }

    // Handle form submission logic (e.g., save to database using DressModel)
    // Example: Save measurements to database
    console.log('Measurements submitted:', measurements);
    // Reset form after submission
    setMeasurements({
      bust: '',
      underBust: '',
      waist: '',
      hips: '',
      fullLength: '',
      lengthFromWaist: '',
      lengthFromArmpits: '',
      armLength: '',
      bicepsCircumference: '',
      elbowCircumference: '',
      wristCircumference: '',
      description: '',
    });

    // Call onSubmit function passed from parent component
    onSubmit();
  };

  return (
    <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.formTitle, { fontFamily: 'Raleway_700Bold' }]}>Dress Measurement Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Bust (cm)"
          value={measurements.bust}
          onChangeText={(text) => handleInputChange('bust', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Under Bust (cm)"
          value={measurements.underBust}
          onChangeText={(text) => handleInputChange('underBust', text)}
        />
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
          placeholder="Full Length (cm)"
          value={measurements.fullLength}
          onChangeText={(text) => handleInputChange('fullLength', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Length from Waist (cm)"
          value={measurements.lengthFromWaist}
          onChangeText={(text) => handleInputChange('lengthFromWaist', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Length from Armpits (cm)"
          value={measurements.lengthFromArmpits}
          onChangeText={(text) => handleInputChange('lengthFromArmpits', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Arm Length (cm)"
          value={measurements.armLength}
          onChangeText={(text) => handleInputChange('armLength', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Biceps Circumference (cm)"
          value={measurements.bicepsCircumference}
          onChangeText={(text) => handleInputChange('bicepsCircumference', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Elbow Circumference (cm)"
          value={measurements.elbowCircumference}
          onChangeText={(text) => handleInputChange('elbowCircumference', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Wrist Circumference (cm)"
          value={measurements.wristCircumference}
          onChangeText={(text) => handleInputChange('wristCircumference', text)}
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

export default DressMeasurement;
