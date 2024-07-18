import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";

interface Measurements {
  bust: string;
  underBust: string;
  waist: string;
  hips: string;
  fullLength: string;
  lengthFromWaist: string;
  lengthFromArmpits: string;
  armLength?: string;
  bicepsCircumference?: string;
  elbowCircumference?: string;
  wristCircumference?: string;
  designDescription: string;
  designImageUrl?: string;
}

const DressMeasurement: React.FC = () => {
  const { user } = useUser();
  const toast = useToast();
  const [formVisible, setFormVisible] = useState(true);
  const [measurements, setMeasurements] = useState<Measurements>({
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
    designDescription: '',
    designImageUrl: '',
  });

  const handleInputChange = (name: keyof Measurements, value: string) => {
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

      const response = await axios.post(`${SERVER_URI}/api/v1/dresses`, {
        ...measurements,
        userId: user._id,
      });

      toast.show('Dress measurements submitted successfully.', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });

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
        designDescription: '',
        designImageUrl: '',
      });
    } catch (error) {
      let errorMessage = 'Failed to submit dress measurements.';
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        errorMessage = error.response.data.message;
      }

      toast.show(errorMessage, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      console.error('Error submitting dress measurements:', error);
    }
  };

  return (
    <View style={styles.container}>
      {formVisible ? (
        <>
          <TextInput
            placeholder="Bust"
            onChangeText={(text) => handleInputChange('bust', text)}
            value={measurements.bust}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Under Bust"
            onChangeText={(text) => handleInputChange('underBust', text)}
            value={measurements.underBust}
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
            placeholder="Hips"
            onChangeText={(text) => handleInputChange('hips', text)}
            value={measurements.hips}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Full Length"
            onChangeText={(text) => handleInputChange('fullLength', text)}
            value={measurements.fullLength}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Length From Waist"
            onChangeText={(text) => handleInputChange('lengthFromWaist', text)}
            value={measurements.lengthFromWaist}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Length From Armpits"
            onChangeText={(text) => handleInputChange('lengthFromArmpits', text)}
            value={measurements.lengthFromArmpits}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Arm Length"
            onChangeText={(text) => handleInputChange('armLength', text)}
            value={measurements.armLength}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Biceps Circumference"
            onChangeText={(text) => handleInputChange('bicepsCircumference', text)}
            value={measurements.bicepsCircumference}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Elbow Circumference"
            onChangeText={(text) => handleInputChange('elbowCircumference', text)}
            value={measurements.elbowCircumference}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Wrist Circumference"
            onChangeText={(text) => handleInputChange('wristCircumference', text)}
            value={measurements.wristCircumference}
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
            placeholder="Design Image URL"
            onChangeText={(text) => handleInputChange('designImageUrl', text)}
            value={measurements.designImageUrl}
            style={styles.input}
          />
          <Button title="Submit Measurements" onPress={handleFormSubmit} />
        </>
      ) : (
        <Text style={styles.successMessage}>Dress measurements submitted successfully. Please select another category.</Text>
      )}
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
  successMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: 'green',
  },
});

export default DressMeasurement;
