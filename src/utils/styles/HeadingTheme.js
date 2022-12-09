import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const logo = defineStyle({
    fontFamily: "Black Han Sans",
})

const welcomeMessage = defineStyle({
    fontFamily: "Roboto Slab",
    color: '#F5F5F5',
    margin: '10% 0 4%',
    fontSize: '1.8rem'
})

const helperMessage = defineStyle({
    fontFamily: "Open Sans",
    color: '#D6D6D6'
})

const HeadingTheme = defineStyleConfig({
    variants: {
        "logo": logo,
        "welcomeMessage": welcomeMessage,
        "helperMessage": helperMessage,
    },
})
 
export default HeadingTheme;