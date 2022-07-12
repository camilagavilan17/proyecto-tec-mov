import React from 'react';
import { Appbar } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

const getTitle = (screenName) => {
  switch(screenName) {
    case 'Forms':
      return 'Formularios';
    case 'Account':
      return 'Cuenta';
    case 'Appointments':
      return 'Citas medicas';
    case 'Medicines':
      return 'Medicamentos';
  }
}

const Header = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title={getTitle(useRoute().name)} />
    </Appbar.Header>
  );
}

export default Header;
