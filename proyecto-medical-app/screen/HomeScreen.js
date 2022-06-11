import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Appbar } from 'react-native-paper';
import { Provider as PaperProvider, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const onPressHandler = () =>{
    navigation.navigate('Image')
  }
  return (
    <PaperProvider>
      <Appbar >
   <Appbar.Action
     icon="archive"
     onPress={(onPressHandler) => navigation.navigate('Image')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar>
  {/* <Pressable>
    onPress={onPressHandler}
    style{({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}
<Text>
  Captura de receta
</Text>
  </Pressable> */}

  <Card>
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/600' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
    </PaperProvider>
  );
}


