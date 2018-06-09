export default function (context) {
    console.log('middleware just auth')
    context.store.dispatch('initAuth', context.req);
}