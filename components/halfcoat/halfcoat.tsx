import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useFonts, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';

export default function HalfCoatMeasurement({ onSubmit }) {
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
  });

  const [measurements, setMeasurements] = useState({
    length: '',
    shoulder: '',
    waist: '',
    description: '',
  });

  const handleInputChange = (field, value) => {
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate measurements here if needed
    onSubmit(measurements);
    setMeasurements({
      length: '',
      shoulder: '',
      waist: '',
      description: '',
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Raleway_600SemiBold' }]}>
        Half Coat Measurements
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Length (cm)"
          keyboardType="numeric"
          value={measurements.length}
          onChangeText={(text) => handleInputChange('length', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Shoulder (cm)"
          keyboardType="numeric"
          value={measurements.shoulder}
          onChangeText={(text) => handleInputChange('shoulder', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Waist (cm)"
          keyboardType="numeric"
          value={measurements.waist}
          onChangeText={(text) => handleInputChange('waist', text)}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          multiline
          value={measurements.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={!measurements.length || !measurements.shoulder || !measurements.waist || !measurements.description}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
