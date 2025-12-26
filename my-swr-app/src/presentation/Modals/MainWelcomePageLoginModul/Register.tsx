import React, { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../../../data/api/authApi';

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 32px;
  border: 1px solid #e5e7eb;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Message = styled.p<{ $success?: boolean }>`
  font-size: 0.875rem;
  color: ${({ $success }) => ($success ? '#059669' : '#dc2626')};
  margin: 0;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 48px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #d1d5db;
`;

const DividerText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 48px;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Замени на свою функцию
  const requestEmailVerification = async (email: string) => {
    await registerUser(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await requestEmailVerification(email);
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <TitleSection>
          <Title>Sign in or create an account</Title>
          <Subtitle>
            You can sign in using your Booking.com account to access our services.
          </Subtitle>
        </TitleSection>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </InputGroup>

          {message && (
            <Message $success={message.includes('sent')}>
              {message}
            </Message>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Continue with Email'}
          </SubmitButton>
        </Form>

        <Divider>
          <DividerLine />
          <DividerText>or use one of these options</DividerText>
          <DividerLine />
        </Divider>

        <GoogleButton type="button">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </GoogleButton>
      </Card>
    </Container>
  );
};

export default LoginForm;