import React from 'react';

import { Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container, Title } from './styles';

const DashBoard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Title> DashBoard</Title>
      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default DashBoard;
