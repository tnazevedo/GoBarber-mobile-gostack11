import React, { useRef } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  const navigate = useNavigation();
  const formRef = useRef<FormHandles>(null);
  return (
    <>
      <KeyboardAvoidingView
        // ? Muito bom isso é para tratar o teclado e ajustar caso seja IOS
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title> Crie sua conta</Title>
            </View>
            <Form
              onSubmit={data => {
                console.log(data);
              }}
              ref={formRef}
            >
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigate.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para o logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
