import PropTypes from 'prop-types';
import { AuthProvider } from '../../contexts/AuthContext';
import { FirestoreProvider } from '../../contexts/FirestoreContext';
import { AppStateProvider } from '../../contexts/AppStateContext';
import ThemeContainer from './ThemeContainer';

function Providers({ children }) {
  return (
    <AppStateProvider>
      <AuthProvider>
        <FirestoreProvider>
          <ThemeContainer>{children}</ThemeContainer>
        </FirestoreProvider>
      </AuthProvider>
    </AppStateProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.any,
};

export default Providers;
