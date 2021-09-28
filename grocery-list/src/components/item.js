import {Box, ListItem, Text, Flex} from "@chakra-ui/react"
import {ItemContext} from "../contexts/item"

import {Actions} from "./actions"

const Item = ({item}) => {
    const {name} = item;

    return (
        <ItemContext.Provider value={item}>
            <ListItem>
                <Flex>
                    <Box >
                        <Text>{name}</Text>
                    </Box>
                    <Box ml='auto'>
                        <Actions />
                    </Box>
                </Flex>

            </ListItem>
        </ItemContext.Provider>
    )
}

export {Item}