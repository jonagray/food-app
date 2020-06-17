import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id)
  }, []);

  if (!result) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
      <View style={styles.detailStyle}>
        <Text>Phone: {result.display_phone}</Text>
        <Text>Address: {result.location.address1}</Text>
        {/* this doesn't necessarily return the correct day of the week */}
        <Text>Open Now? {result.hours[0].is_open_now ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    margin: 5,
    borderRadius: 4
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailStyle: {
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default ResultsShowScreen;