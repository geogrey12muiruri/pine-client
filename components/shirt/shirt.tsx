import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';

// Assuming ShirtModel is imported from Mongoose or defined similarly
// const ShirtModel = ...

interface Props {
  onSubmit: () => void; // Define the onSubmit function signature as needed
}

const ShirtMeasurement: React.FC<Props> = ({ onSubmit }) => {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const [measurements, setMeasurements] = useState({
    neckRound: '',
    sleeve: '',
    shoulder: '',
    chest: '',
    shirtLength: '',
    bicepsAround: '',
    wristAround: '',
    designDescription: '',
    designImageUrl: '', // Optionally, if you include image upload
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
    if (measurements.neckRound === '' || measurements.sleeve === '' || measurements.shoulder === '' ||
        measurements.chest === '' || measurements.shirtLength === '' || measurements.bicepsAround === '' ||
        measurements.wristAround === '' || measurements.designDescription === '') {
      // Handle validation error
      console.error('Please fill out all required fields.');
      return;
    }

    // Handle form submission logic (e.g., save to database using ShirtModel)
    // Example: Save measurements to database
    console.log('Measurements submitted:', measurements);
    // Reset form after submission
    setMeasurements({
      neckRound: '',
      sleeve: '',
      shoulder: '',
      chest: '',
      shirtLength: '',
      bicepsAround: '',
      wristAround: '',
      designDescription: '',
      designImageUrl: '',
    });

    // Call onSubmit function passed from parent component
    onSubmit();
  };

  return (
    <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.formTitle, { fontFamily: 'Raleway_700Bold' }]}>Shirt Measurement Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Neck Round (cm)"
          value={measurements.neckRound}
          onChangeText={(text) => handleInputChange('neckRound', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sleeve (cm)"
          value={measurements.sleeve}
          onChangeText={(text) => handleInputChange('sleeve', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Shoulder (cm)"
          value={measurements.shoulder}
          onChangeText={(text) => handleInputChange('shoulder', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Chest (cm)"
          value={measurements.chest}
          onChangeText={(text) => handleInputChange('chest', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Shirt Length (cm)"
          value={measurements.shirtLength}
          onChangeText={(text) => handleInputChange('shirtLength', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Biceps Around (cm)"
          value={measurements.bicepsAround}
          onChangeText={(text) => handleInputChange('bicepsAround', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Wrist Around (cm)"
          value={measurements.wristAround}
          onChangeText={(text) => handleInputChange('wristAround', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Design Description"
          value={measurements.designDescription}
          onChangeText={(text) => handleInputChange('designDescription', text)}
        />
        {/* Optional: Include image upload */}
        {/* <TextInput
          style={styles.input}
          placeholder="Design Image URL"
          value={measurements.designImageUrl}
          onChangeText={(text) => handleInputChange('designImageUrl', text)}
        /> */}
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

export default ShirtMeasurement;
