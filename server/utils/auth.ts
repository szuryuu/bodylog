export function requireAuth(event: any) {
    const token = getCookie(event, 'auth_token');
    if (!token || token !== 'logged_in') {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }
}
