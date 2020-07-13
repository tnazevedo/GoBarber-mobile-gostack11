import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  View,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  BackButton,
  UserAvatarButton,
  Title,
  UserAvatar,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

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
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title> Meu Perfil</Title>
            </View>
            <Form onSubmit={() => {}} ref={formRef}>
              <Input
                autoCorrect
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                secureTextEntry
                textContentType="newPassword" // onTimeCode preenche o campo com o código que vc recebe sms
                returnKeyType="next"
                onSubmitEditing={() => newPasswordInputRef.current?.focus()}
                containerStyle={{ marginTop: 16 }}
              />
              <Input
                ref={newPasswordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                secureTextEntry
                textContentType="newPassword" // onTimeCode preenche o campo com o código que vc recebe sms
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar nova Senha"
                secureTextEntry
                textContentType="newPassword" // onTimeCode preenche o campo com o código que vc recebe sms
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
