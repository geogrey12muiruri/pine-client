import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";

interface HalfCoatMeasurements {
  length: string;
  shoulder: string;
  waist: string;
  designDescription: string;
  designImageUrl?: string;
}

const HalfCoat: React.FC = () => {
  const { user } = useUser();
  const toast = useToast();
  const [measurements, setMeasurements] = useState<HalfCoatMeasurements>({
    length: '',
    shoulder: '',
    waist: '',
    designDescription: '',
    designImageUrl: '',
  });

  const handleInputChange = (name: keyof HalfCoatMeasurements, value: string) => {
    setMeasurements((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      if (!user?._id) {
        Alert.alert('Error', 'User ID is missing.');
        return;
      }

      if (!measurements.designDescription) {
        Alert.alert('Error', 'Design specifications description is required.');
        return;
      }

      const response = await axios.post(`${SERVER_URI}/api/v1/halfcoats`, {
        userId: user._id,
        length: parseFloat(measurements.length),
        shoulder: parseFloat(measurements.shoulder),
        waist: parseFloat(measurements.waist),
        designDescription: measurements.designDescription,
        designImageUrl: measurements.designImageUrl, // Optional
      });

      toast.show('Half coat measurements submitted successfully.', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });

      setMeasurements({
        length: '',
        shoulder: '',
        waist: '',
        designDescription: '',
        designImageUrl: '',
      });
    } catch (error) {
      let errorMessage = 'Failed to submit half coat measurements.';
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        errorMessage = (error as any).response.data.message;
      }

      toast.show(errorMessage, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      console.error('Error submitting half coat measurements:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Length"
        onChangeText={(text) => handleInputChange('length', text)}
        value={measurements.length}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Shoulder"
        onChangeText={(text) => handleInputChange('shoulder', text)}
        value={measurements.shoulder}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Waist"
        onChangeText={(text) => handleInputChange('waist', text)}
        value={measurements.waist}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Design Description"
        onChangeText={(text) => handleInputChange('designDescription', text)}
        value={measurements.designDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Design Image URL (Optional)"
        onChangeText={(text) => handleInputChange('designImageUrl', text)}
        value={measurements.designImageUrl}
        style={styles.input}
      />
      <Button title="Submit Measurements" onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default HalfCoat;
