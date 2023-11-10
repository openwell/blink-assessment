import React from 'react';
import { Input } from './Styles';

interface PropsType {
  type?: string;
  placeholder: string;
  value?: string;
  name?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Index(props: PropsType) {
  const { defaultValue } = props;
  return (
    <Input
      defaultValue={defaultValue}
      type="text"
      name="message"
      {...props}
      aria-label="Text Input Field"
    />
  );
}
