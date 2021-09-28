import {useCallback, useContext, useEffect, useState} from "react"
import {Button} from "@chakra-ui/button"
import {Input} from "@chakra-ui/input"
import {HStack} from "@chakra-ui/layout"
import {FormControl, FormErrorMessage} from "@chakra-ui/form-control";

import {useAddItem} from "../hooks/grocery-list-hooks";
import {UserContext} from "../contexts/user";

const LIMIT = 40;

const AddItem = () => {
    const userId = useContext(UserContext)
    const [loading, addItem] = useAddItem(userId);
    const [error, setError] = useState(false);
    const [value, setValue] = useState('');

    const validate = useCallback(() => {
        if (!value) {
            setError(null)
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
        validate()
    }, [value, validate])

    const submit = () => {
        const result = validate();
        if (result) {
            addItem(value);
            setValue('');
        }
    }

    const onButtonPress = () => submit();

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    }

    return (
        <HStack>
            <FormControl isInvalid={Boolean(error)}>
                <Input
                    id='add'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={onEnter}
                    errorBorderColor="crimson"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>

            <Button isLoading={loading} onClick={onButtonPress}>{'Add'}</Button>
        </HStack>
    )
}

export {AddItem}