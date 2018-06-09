export default function (context) {
    console.log('middleware checked auth')
    if(!context.store.getters.isAuthenticated) {
        context.redirect('/admin/auth')
    }
}