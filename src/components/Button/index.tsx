import React from 'react';
import { Button } from './Styles';

interface Props {
  text: string;
  editMode?: boolean;
}

export default function Index({ text, editMode }: Props) {
  return (
    <Button type="submit" aria-label="Submit Button">
      {editMode ? 'Edit ' : text}
    </Button>
  );
}
