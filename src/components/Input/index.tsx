import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}
// ? const Input: React.RefForwardingComponent<{},InputProps> = ({ name, icon, ...rest }, ref) => {
// ? Este formato é utilizado apenas quando eu preciso referenciar um elemento

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  // ? Apenas em casos muito especificos utilize isso é um hook para passar informações de um elemento filho para um pai

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // ? hack para fazer o campo do formulário se atualizar e  limpar o valor.

      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },

      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};
// ? Qualquer componente  interno que receba essa função referencia, passe a função abaixo por volta do elemento
export default forwardRef(Input);
