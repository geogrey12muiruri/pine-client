import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import useUser from "@/hooks/auth/useUser";
import { SERVER_URI } from "@/utils/uri";

interface Measurements {
  waist: string;
  length: string;
  thighs: string;
  hips: string;
  roundFly: string;
  legOpening: string;
  fly: string;
}

const Trouser: React.FC = () => {
  const { user } = useUser();
  const toast = useToast();
  const [formVisible, setFormVisible] = useState(true);
  const [measurements, setMeasurements] = useState<Measurements>({
    waist: '',
    length: '',
    thighs: '',
    hips: '',
    roundFly: '',
    legOpening: '',
    fly: '',
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

      const response = await axios.post(`${SERVER_URI}/api/v1/trousers`, {
        ...measurements,
        userId: user._id,
      });

      toast.show('Trouser measurements submitted successfully.', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });

      setMeasurements({
        waist: '',
        inseam: '',
        outseam: '',
        hip: '',
        thigh: '',
      });
    } catch (error) {
      let errorMessage = 'Failed to submit trouser measurements.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      toast.show(errorMessage, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      console.error('Error submitting trouser measurements:', error);
    }
  };

  return (
    <View style={styles.container}>
      {formVisible ? (
        <>
          <TextInput
            placeholder="Waist"
            onChangeText={(text) => handleInputChange('waist', text)}
            value={measurements.waist}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Length"
            onChangeText={(text) => handleInputChange('length', text)}
            value={measurements.length}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Thighs"
            onChangeText={(text) => handleInputChange('thighs', text)}
            value={measurements.thighs}
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
            placeholder="RoundFly"
            onChangeText={(text) => handleInputChange('roundFly', text)}
            value={measurements.roundFly}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="LegOpening"
            onChangeText={(text) => handleInputChange('legOpening', text)}
            value={measurements.legOpening}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Fly"
            onChangeText={(text) => handleInputChange('fly', text)}
            value={measurements.fly}
            style={styles.input}
          />
          <Button title="Submit Measurements" onPress={handleFormSubmit} />
        </>
      ) : (
        <Text style={styles.successMessage}>Trouser measurements submitted successfully. Please select another category.</Text>
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

export default Trouser;
