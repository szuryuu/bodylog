export const useAuth = () => {
  const password = useCookie("app_password", {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: true,
    sameSite: "strict",
  });

  const isAuthenticated = computed(() => !!password.value);

  const login = (pass: string) => {
    password.value = pass;
  };

  const logout = () => {
    password.value = null;
  };

  const secureFetch = async (url: string, options: any = {}) => {
    if (!password.value) {
      throw new Error("Not authenticated");
    }

    return $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "X-App-Password": password.value,
      },
    });
  };

  return {
    isAuthenticated,
    login,
    logout,
    secureFetch,
  };
};
