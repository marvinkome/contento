import React from 'react';
import FormSection from './components/FormSection';
import AboutSection from '../components/about';
import './styles.scss';

export default class RegistrationPage extends React.Component {
    render() {
        return (
            <main data-testid="registration-page" className="auth__register_container">
                <FormSection />
                <AboutSection />
            </main>
        );
    }
}