import {Box, Stack, Text} from "@chakra-ui/layout"

const Card = ({children}) => {
    return (
        <Stack boxShadow="md" mb='6' borderRadius="lg">
            {children}
        </Stack>
    )
}

const CardHeading = ({children}) => {
    return (
        <Stack borderBottom={'1px'} borderColor={'gray.200'}>
            <Text pl='4' pt='2' pb='2' fontWeight="semibold" fontSize='2xl'>{children}</Text>
        </Stack >
    )
}

const CardBody = ({children}) => {
    return (<Box p='4' spacing='3'>{children}</Box>);
}

export {Card, CardHeading, CardBody};