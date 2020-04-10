import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  AreaForm,
  AreaLogo,
  AreaInputs,
  AreaButton,
  AreaRegisterForgotedPassword,
  AreaLink,
} from './styles';
import { verifyEmail } from '../../utils';
import * as UsersActions from '../../store/modules/users/actions';
import Logo from '../../components/Logo';
import InputIcon from '../../components/InputIcon';
import Button from '../../components/ButtonIcon';
import Loader from '../../components/Loader';
import { icons } from '../../styles';

export default function Login() {
  const { loading, error, message } = useSelector(state => state.common);
  const dispatch = useDispatch();
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [showFieldState, setShowFieldState] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [errorMail, setErrorMail] = useState(null);

  useEffect(() => {
    dispatch(UsersActions.requestUserExist());
  }, []); //eslint-disable-line

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  function functionForgetSenha() {
    setTransitionVisible(!transitionVisible);
  }
  function requestLogin(emailParam, passwordParam) {
    dispatch(UsersActions.requestLogin(emailParam, passwordParam));
    setEmailState('');
    setPasswordState('');
  }
  function verifyMailFunction(value) {
    setErrorMail(verifyEmail(value));
  }
  return (
    <Container test={transitionVisible}>
      <AreaForm>
        <AreaLogo>
          <Logo title="Login" message={message} error={error} />
        </AreaLogo>

        <AreaInputs>
          <InputIcon
            placeholder="Digite seu usuário:"
            error={errorMail}
            value={emailState}
            functionOnChange={text => setEmailState(text)}
            functionOnEndingChange={() => verifyMailFunction(emailState)}
            icon={() => <icons.UserIcon size={18} />}
            typeInput="email"
          />
          <InputIcon
            placeholder="Digite sua senha:"
            functionOnChange={text => setPasswordState(text)}
            value={passwordState}
            functionOnClick={() => setShowFieldState(!showFieldState)}
            disabled={false}
            typeInput={showFieldState ? 'text' : 'password'}
            button
            icon={() =>
              showFieldState ? (
                <icons.EyeOpenIcon size={18} />
              ) : (
                <icons.EyeClosedIcon size={18} />
              )
            }
          />
        </AreaInputs>
        <AreaButton>
          <Button
            loading={loading}
            title="Entrar"
            disabled={errorMail === null || errorMail || loading}
            functionOnClick={() =>
              requestLogin(emailState.toLowerCase(), passwordState)
            }
          />
        </AreaButton>
        <AreaRegisterForgotedPassword>
          <AreaLink position>
            <Button
              disabled={loading}
              onClick={() => functionForgetSenha()}
              icon={() => <icons.UserForgotPassword size={18} />}
              title=""
            />
          </AreaLink>
          <AreaLink />
          <AreaLink position={false}>
            <Button
              disabled={loading}
              onClick={() => functionForgetSenha()}
              icon={() => <icons.UserPlusIcon size={18} />}
              title=""
            />
          </AreaLink>
        </AreaRegisterForgotedPassword>
      </AreaForm>
    </Container>
  );
}
