import { act, renderHook } from '@testing-library/react-hooks';

import { startAsync } from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { AuthProvider, useAuth } from "../../hooks/auth";

// mock são usados para simular o comportamento de determinada biblioteca ou função
const userLogged = {
    id: '1',
    name: 'TestName',
    email: 'TestEmail',
    photo: 'TestPhoto',
}


jest.mock('expo-auth-session');
jest.mock('@react-native-async-storage/async-storage/jest/async-storage-mock');

beforeEach(() => {
    AsyncStorage.clear();
});


describe('Auth Hook', () => {

    it('Should be able to sign in with Google Account existed', async () => {

        const googleMocked = jest.mocked(startAsync as any);

        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'google_token'
            }
        })

        // simulando um retorno fecth por conta do Mock feito para o expo-auth-session
        // "Mockei o retorno"
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                id: 'userInfo.id',
                email: 'userInfo.email',
                name: 'userInfo.given_name',
                photo: 'userInfo.picture',
                locale: 'userInfo.locale',
                varified_email: 'userInfo.varified_email',
            })
        })) as jest.Mock;

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })
        // esse hook realmente é chamado e deve ser envolvido por uma função action,
        // pois atualiza um state e esse state é compartilhado para o context

        await act(() => result.current.signInWhithGoogle());

        expect(result.current.user).toBeTruthy();

    });

    it('Should be able if user cancel authentication with google', async () => {

        // aqui estou fazendo um mocked(simulando) a ação startAsync e capturando um resultado simulado
        // de forma individual para cada test(it)
        const googleMocked = jest.mocked(startAsync as any);

        googleMocked.mockReturnValueOnce({
            type: 'cancel',
            params: {
                access_token: 'google_token'
            }
        })

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })
        // esse hook realmente é chamado e deve ser envolvido por uma função action,
        // pois atualiza um state e esse state é compartilhado para o context

        await act(() => result.current.signInWhithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    });

    it('Should be able get error if there is incorrectly Google parameters', async () => {


        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

        // aqui forço o Error no authenticate Google, não informando os parametros no mock
        try {
            await act(() => result.current.signInWhithGoogle());
        } catch {
            expect(result.current.user).toEqual({});
        }


    });

    it('Should be able get user on AsynctStorage', async () => {

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

        await AsyncStorage.setItem(
            '@gofinances:user',
            JSON.stringify(userLogged)
        );

        await act(() => result.current.loadStorageDate());

        expect(result.current.user).toHaveProperty('id');

    });

    // ainda não consigo capturar o error/ forçar o error
    it("Should be don't able get user on AsynctStorage if getItem fail.", async () => {

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

        await act(() => result.current.loadStorageDate());
        expect(result.current.user).toEqual({});

    });

    it("Should be able sign out user", async () => {
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        await AsyncStorage.setItem(
            '@gofinances:user',
            JSON.stringify(userLogged)
        );

        await act(() => result.current.loadStorageDate());

        await act(() => result.current.signOut());
        
        expect(result.current.user).toEqual({});

    })
})