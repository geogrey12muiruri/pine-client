import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";

interface BlazerMeasurements {
  chest: string;
  sleeve: string;
  waist: string;
  shoulders: string;
  length: string;
  wrist: string;
  muscle: string;
  designSpecifications: {
    description: string;
    imageUrl?: string;
  };
}

const BlazerMeasurement: React.FC = () => {
  const { user } = useUser();
  const toast = useToast();

  const [measurements, setMeasurements] = useState<BlazerMeasurements>({
    chest: '',
    sleeve: '',
    waist: '',
    shoulders: '',
    length: '',
    wrist: '',
    muscle: '',
    designSpecifications: {
      description: '',
      imageUrl: '',
    },
  });

  const handleInputChange = (field: keyof BlazerMeasurements, value: string) => {
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [field]: value,
    }));
  };

  const handleDesignSpecChange = (field: keyof BlazerMeasurements['designSpecifications'], value: string) => {
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      designSpecifications: {
        ...prevMeasurements.designSpecifications,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleDesignSpecChange('imageUrl', result.uri);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (!user?._id) {
        Alert.alert('Error', 'User ID is missing.');
        return;
      }
  
      const res = await axios.post(`${SERVER_URI}/api/v1/blazers`, {
        ...measurements,
        userId: user._id,
      });
  
      toast.show('Blazer measurements submitted successfully.', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
  
      setMeasurements({
        chest: '',
        sleeve: '',
        waist: '',
        shoulders: '',
        length: '',
        wrist: '',
        muscle: '',
        designSpecifications: {
          description: '',
          imageUrl: '',
        },
      });
    } catch (error) {
      let errorMessage = 'Failed to submit blazer measurements.';
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
      console.error('Error submitting blazer measurements:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add Measurements for Blazer</Text>
      <TextInput
        style={styles.input}
        placeholder="Chest"
        value={measurements.chest}
        onChangeText={(text) => handleInputChange('chest', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sleeve"
        value={measurements.sleeve}
        onChangeText={(text) => handleInputChange('sleeve', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Waist"
        value={measurements.waist}
        onChangeText={(text) => handleInputChange('waist', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Shoulders"
        value={measurements.shoulders}
        onChangeText={(text) => handleInputChange('shoulders', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Length"
        value={measurements.length}
        onChangeText={(text) => handleInputChange('length', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Wrist"
        value={measurements.wrist}
        onChangeText={(text) => handleInputChange('wrist', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Muscle"
        value={measurements.muscle}
        onChangeText={(text) => handleInputChange('muscle', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Design Specifications"
        value={measurements.designSpecifications.description}
        onChangeText={(text) => handleDesignSpecChange('description', text)}
        multiline
      />
      <Button title="Upload Image" onPress={handleImageUpload} />
      {measurements.designSpecifications.imageUrl ? (
        <Image source={{ uri: measurements.designSpecifications.imageUrl }} style={styles.imagePreview} />
      ) : null}
      <Button title="Submit Measurements" onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 20,
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
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default BlazerMeasurement;
