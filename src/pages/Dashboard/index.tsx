import React, { useCallback, useEffect, useState } from 'react';

import { Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from 'src/services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}
const DashBoard: React.FC = () => {
  // Sempre que for armazenar array num estado ou objeto no estado criar uma interface
  const [providers, setProviders] = useState<Provider[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);
  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item }) => <UserName>{item.name}</UserName>}
        />
      </Header>
    </Container>
  );
};

export default DashBoard;
