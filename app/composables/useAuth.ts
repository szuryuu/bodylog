export const useAuth = () => {
    const isAuthenticated = useState<boolean>('isAuthenticated', () => false);
    const authCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax'
    });

    // Auto-check auth on composable initialization (client-side only)
    const checkAuth = () => {
        if (authCookie.value === 'logged_in') {
            isAuthenticated.value = true;
        } else {
            isAuthenticated.value = false;
        }
    };
    
    if (process.client) {
        checkAuth();
    }

    const login = async (password: string): Promise<boolean> => {
        try {
            const response = await $fetch('/api/auth/verify', {
                method: 'POST',
                body: { password: password } 
            });

            // @ts-ignore
            if (response.success) {
                authCookie.value = 'logged_in';
                
                await new Promise(resolve => setTimeout(resolve, 100));
                
                isAuthenticated.value = true;
                return true;
            }
            return false;
        } catch (error) {
            isAuthenticated.value = false;
            authCookie.value = null; 
            console.error("Login failed", error);
            return false;
        }
    };

    const logout = () => {
        isAuthenticated.value = false;
        authCookie.value = null;
        navigateTo('/login');
    };

    const secureFetch = async (url: string, options: any = {}) => {
        if (!isAuthenticated.value) {
            throw createError({ statusCode: 401, message: "Unauthorized" });
        }
        return await $fetch(url, options);
    };

    return {
        isAuthenticated,
        checkAuth,
        login,
        logout,
        secureFetch
    };
};
