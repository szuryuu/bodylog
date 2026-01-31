export const useAuth = () => {
    const isAuthenticated = useState<boolean>('isAuthenticated', () => false);
    const authCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax'
    });

    // Check Status
    const checkAuth = () => {
        if (authCookie.value) {
            isAuthenticated.value = true;
        }
    };

    const login = async (password: string): Promise<boolean> => {
        try {
            const response = await $fetch('/api/auth/verify', {
                method: 'POST',
                body: { password }
            });

            if (response.success) {
                isAuthenticated.value = true;
                authCookie.value = 'logged_in'; 
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

    // Helper
    const secureFetch = async (url: string, options: any = {}) => {
        if (!isAuthenticated.value) {
            throw createError({ statusCode: 401, message: "Unauthorized" });
        }
        
        return await $fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'x-auth-token': authCookie.value || ''
            }
        });
    };

    return {
        isAuthenticated,
        checkAuth,
        login,
        logout,
        secureFetch
    };
};
