        // Alert.js

        function Alert({ type, message }) {
          const alertClass = `alert alert-${type}`; // e.g., 'alert alert-success'
          return <div className={alertClass}>{message}</div>;
        }

        export default Alert;

        // MyComponent.js
        import { useState } from 'react';
        import Alert from './Alert';

        function MyComponent() {
          const [alertInfo, setAlertInfo] = useState({ type: '', message: '' });

          const handleSuccess = () => {
            setAlertInfo({ type: 'success', message: 'Operation successful!' });
          };

          const handleError = () => {
            setAlertInfo({ type: 'error', message: 'Operation failed!' });
          };

          return (
            <div>
              <button onClick={handleSuccess}>Show Success</button>
              <button onClick={handleError}>Show Error</button>
              {alertInfo.message && (
                <Alert type={alertInfo.type} message={alertInfo.message} />
              )}
            </div>
          );
        }