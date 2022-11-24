import { act, renderHook } from '@testing-library/react-hooks';
import { startAsync } from 'expo-auth-session';
import { AuthProvider, useAuth } from "../../hooks/auth";

// mock são usados para simular o comportamento de determinada biblioteca ou função

jest.mock('expo-auth-session');

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: async () => { }
}));



describe('Auth Hook', () => {
    it('Should be able to sign in with Google Account existed', async () => {

        const googleMocked = jest.mocked(startAsync as any);

        googleMocked.mockReturnValue({
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

        googleMocked.mockReturnValue({
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
    })

})