import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Input,
  HStack,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';

import { useAddItem } from '../hooks/grocery-list-hooks';
import { UserContext } from '../contexts/user';

const LIMIT = 40;

const AddItem = () => {
  const userId = useContext(UserContext);
  const [loading, addItem] = useAddItem(userId);
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const validate = useCallback(() => {
    if (!value) {
      setError(null);
      return false;
    }

    if (value?.length > LIMIT) {
      setError(`Enter an item shorter than ${LIMIT} characters`);
      return false;
    }

    setError(null);
    return true;
  }, [value]);

  useEffect(() => {
    validate();
  }, [value, validate]);

  const submit = useCallback(() => {
    const result = validate();
    if (result) {
      addItem(value);
      setValue('');
    }
  }, [value, addItem, validate]);

  const onButtonPress = useCallback(() => submit(), [submit]);

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const onEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        submit();
      }
    },
    [submit]
  );

  return (
    <HStack>
      <FormControl isInvalid={Boolean(error)}>
        <Input
          errorBorderColor='crimson'
          onChange={onChange}
          onKeyPress={onEnter}
          value={value}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>

      <Button isLoading={loading} onClick={onButtonPress}>
        {'Add'}
      </Button>
    </HStack>
  );
};

export { AddItem };
