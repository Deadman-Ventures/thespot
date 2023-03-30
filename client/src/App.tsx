import React from "react";
import { Outlet } from "react-router-dom";
import { ChakraProvider, Container, Heading, Stack } from "@chakra-ui/react"
import { theme } from "./theme";
import '@fontsource/chivo/400.css'
import '@fontsource/cabin/700.css'

export function App() {

    return (
        <>
            <ChakraProvider theme={theme}>
                <Container marginLeft={"5%"} marginRight={"5%"}>
                    <Stack>

                        <Heading
                            fontSize={'2xl'}
                            p={5}
                        >
                            the spot
                        </Heading>
                        <Outlet />
                    </Stack>
                </Container>
            </ChakraProvider>
        </>
    )
}