import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { history, store, persistor } from '../../redux/store';
import PublicRoutes from '../../routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { PersistGate } from 'redux-persist/integration/react'

const THEME = createMuiTheme({
    typography: {
        fontFamily: 'Inter',
        button: {
            textTransform: 'none'
        }
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={THEME}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <PublicRoutes history={history} />
                        </div>
                    </PersistGate>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
export default App;
