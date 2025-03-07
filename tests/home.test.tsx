import { render, screen } from '@testing-library/react'

import { vi } from 'vitest'
import Page from '../app/page'

// vi.mock('@clerk/nextjs', () => {
//     // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
//     const mockedFunctions = {
//         auth: () =>
//             new Promise((resolve) =>
//                 resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
//             ),
//         ClerkProvider: ({ children }) => <div>{children}</div>,
//         useUser: () => ({
//             isSignedIn: true,
//             user: {
//                 id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
//                 fullName: 'Charles Harris',
//             },
//         }),
//     }
//
//     return mockedFunctions
// })
vi.mock('@clerk/nextjs', () => ({
    auth: () => ({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' }), // No Promise
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
        isSignedIn: true,
        user: {
            id: 'user_2sWUCNQU52niAbqmWZaOWFk124p',
            fullName: 'Alikhan Toleberdyyev',
        },
    }),
}))



test(`Home`, async () => {
    render(await Page())
    expect(screen.getByText('get started')).toBeTruthy()
})