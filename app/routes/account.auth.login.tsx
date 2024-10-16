import LoginPage from '~/pages/login/LoginPage';
import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [
        { title: 'Olga Lucia Cortes - Iniciar Sesión' }
    ];
};
export default function Login() {
  return <LoginPage />;
}
