import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Text,
  List,
  ListItem,
  Flex,
  Heading,
  Button,
  Stack,
  HStack,
  Input,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { UserContext } from '../contexts/user';
import { auth } from '../firebase';
import {
  useAcceptShare,
  useAddShare,
  useRemoveShare,
  useSharing
} from '../hooks/settings-hooks';
import { Card, CardHeading, CardBody } from './card';
import { Loading } from './loading';

const Share = ({ userId, field, remove, approve, item }) => {
  const [removeShare, removeLoading] = useRemoveShare(userId);
  const [acceptShare, acceptLoading] = useAcceptShare(userId);

  const acceptShareOnClick = useCallback(
    () => acceptShare(item.id),
    [item, acceptShare]
  );
  const removeShareOnClick = useCallback(
    () => removeShare(item.id),
    [item, removeShare]
  );

  return (
    <ListItem>
      <Flex>
        <Box>
          <Text>{item[field]}</Text>
        </Box>
        <Box ml='auto'>
          <Stack direction='row' spacing={4}>
            {approve && (
              <Button
                colorScheme='green'
                isLoading={acceptLoading}
                onClick={acceptShareOnClick}
              >
                {'Accept'}
              </Button>
            )}
            {remove && (
              <Button
                colorScheme='red'
                isLoading={removeLoading}
                onClick={removeShareOnClick}
              >
                {'Remove'}
              </Button>
            )}
          </Stack>
        </Box>
      </Flex>
    </ListItem>
  );
};

const Content = ({ title, items, field, empty, remove, approve }) => {
  const userId = useContext(UserContext);

  return (
    <Box mt='4'>
      <Heading fontSize='xl' fontWeight='medium'>
        {title}
      </Heading>
      {!items.length && <Text>{empty}</Text>}
      <List>
        {items.map((item, i) => (
          <Share
            approve={approve}
            field={field}
            item={item}
            key={`share-${i}`}
            remove={remove}
            userId={userId}
          />
        ))}
      </List>
    </Box>
  );
};

const AddShare = () => {
  const userId = useContext(UserContext);
  const [addShare, loading] = useAddShare(userId);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const validate = useCallback(() => {
    if (!value) {
      setError(null);
      return false;
    }
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setError(null);
      return true;
    } else {
      setError('Please enter a valid email.');
      return true;
    }
  }, [value]);

  useEffect(() => {
    validate();
  }, [value, validate]);

  const submit = useCallback(() => {
    const result = validate();

    if (result) {
      addShare(value);
      setValue('');
    }
  }, [validate, addShare, setValue, value]);

  const onChange = useCallback((e) => setValue(e.target.value), [setValue]);

  return (
    <FormControl isInvalid={Boolean(error)} mt='4'>
      <HStack>
        <Input
          errorBorderColor='crimson'
          onChange={onChange}
          placeholder='your.name@email.com'
          value={value}
        />
        <Button isLoading={loading} onClick={submit}>
          {'Send'}
        </Button>
      </HStack>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

const Sharing = () => {
  const userId = useContext(UserContext);
  const [{ email }] = useAuthState(auth);

  const [invites, pending, current, loading] = useSharing(userId, email);

  return (
    <Card>
      <CardHeading>{'Share your list'}</CardHeading>
      <CardBody>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Content
              empty='Not shared with anyone 😢'
              field='email'
              items={current}
              remove
              title='Shared with'
            />
            <Content
              approve
              empty='No invites to approve yet! 👍'
              field='senderEmail'
              items={invites}
              remove
              title='Invites to approve'
            />
            <Content
              empty='No invites pending 🙌'
              field='requestedEmail'
              items={pending}
              remove
              title='Pending invites'
            />
            <AddShare />
          </>
        )}
      </CardBody>
    </Card>
  );
};

export { Sharing };
