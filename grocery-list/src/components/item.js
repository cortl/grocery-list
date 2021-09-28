import {ListItem} from "@chakra-ui/react"

const Item = ({item: {name}}) => {

    return (
        <ListItem>{name}</ListItem>
    )
}

export {Item}