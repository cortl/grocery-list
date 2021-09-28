import {Box, Text, List, ListItem, Flex, Heading, Button, Stack, HStack, Input, FormControl, FormErrorMessage} from "@chakra-ui/react"
import {useCallback, useContext, useEffect, useState} from "react"
import {useAuthState} from "react-firebase-hooks/auth"

import {UserContext} from "../contexts/user"
import {auth} from "../firebase"
import {useAcceptShare, useAddShare, useRemoveShare, useSharing} from "../hooks/settings-hooks"
import {Card, CardHeading, CardBody} from "./card"
import {Loading} from "./loading"

const Content = ({title, items, field, empty, remove, approve}) => {
    const userId = useContext(UserContext);

    const [removeShare, removeLoading] = useRemoveShare(userId)
    const [acceptShare, acceptLoading] = useAcceptShare(userId);

    return (
        <Box mt='4'>
            <Heading fontSize='xl' fontWeight='medium'>{title}</Heading>
            {!items.length && <Text>{empty}</Text>}
            <List>
                {items.map((item, i) => {
                    return (
                        <ListItem key={`${i}${field}`}>
                            <Flex>
                                <Box>
                                    <Text>{item[field]}</Text>
                                </Box>
                                <Box ml='auto'>
                                    <Stack direction="row" spacing={4}>
                                        {
                                            approve && (
                                                <Button
                                                    colorScheme='green'
                                                    isLoading={acceptLoading}
                                                    onClick={() => acceptShare(item.id)}
                                                >{'Accept'}
                                                </Button>
                                            )
                                        }
                                        {
                                            remove && (
                                                <Button
                                                    colorScheme='red'
                                                    isLoading={removeLoading}
                                                    onClick={() => removeShare(item.id)}
                                                >{'Remove'}
                                                </Button>
                                            )
                                        }
                                    </Stack>

                                </Box>
                            </Flex>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

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
            setError(null)
            return true;
        } else {
            setError('Please enter a valid email.')
            return true;
        }
    }, [value])

    useEffect(() => {
        validate();
    }, [value, validate])

    const submit = () => {
        const result = validate();

        if (result) {
            addShare(value)
            setValue('');
        }
    }

    return (
        <FormControl mt='4' isInvalid={Boolean(error)}>
            <HStack>
                <Input
                    id='add-share'
                    placeholder='your.name@email.com'
                    errorBorderColor="crimson"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <Button
                    isLoading={loading}
                    onClick={submit}
                >
                    {'Send'}
                </Button>
            </HStack>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}

const Sharing = () => {
    const userId = useContext(UserContext);
    const [{email}] = useAuthState(auth);

    const [invites, pending, current, loading] = useSharing(userId, email);

    return (
        <Card>
            <CardHeading>{'Share your list'}</CardHeading>
            <CardBody>
                {
                    loading
                        ? <Loading />
                        : (
                            <>
                                <Content
                                    title='Shared with'
                                    items={current}
                                    field='email'
                                    empty='Not shared with anyone 😢'
                                    remove
                                />
                                <Content
                                    title='Invites to approve'
                                    items={invites}
                                    field='senderEmail'
                                    empty='No invites to approve yet! 👍'
                                    approve
                                    remove
                                />
                                <Content
                                    title='Pending invites'
                                    items={pending}
                                    field='requestedEmail'
                                    empty='No invites pending 🙌'
                                    remove
                                />
                                <AddShare />
                            </>
                        )

                }
            </CardBody>
        </Card>
    )
}

export {Sharing}