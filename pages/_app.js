import '../styles/globals.css'
import { Provider } from 'react-redux'
import { wrapper } from "@/store/store.js";

function MyApp({ Component, pageProps, ...rest }) {
    const { store } = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>)
}

export default MyApp
