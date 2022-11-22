import { renderHook, act } from "@testing-library/react-native";
import { AuthProvider, useAuth } from "../../hooks/auth";


describe('Auth Hook', () => {
    it('Should be able to sign in with Google Account existed', async () => {

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })
        // esse hook realmente é chamado e deve ser envolvido por uma função action,
        // pois atualiza um state e esse state é compartilhado para o context
        await act(() => {
            result.current.signInWhithGoogle();
        })

        expect(result.current.user).toBeTruthy();

    })
})