import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
`;

const FormContainer = styled.div`
    display: flex;
    width: 772px;
    flex-direction: column;
    padding: 40px;
`;

const Title = styled.h1`
    color: #1d1d1d;
    font-size: 28px;
    margin-bottom: 30px;
    text-align: center;
`;

const Row = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 700;
    color: #1d1d1d;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #d5d5d5;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: #14a800;
    }
`;

const PasswordWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const EyeButton = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #666;
`;

const Select = styled.select`
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #d5d5d5;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    background: white;
    box-sizing: border-box;
    cursor: pointer;

    &:focus {
        border-color: #14a800;
    }
`;

const CheckboxRow = styled.label`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 16px;
    cursor: pointer;
    font-size: 14px;
    color: #1d1d1d;
    line-height: 1.4;
`;

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: #14a800;
    cursor: pointer;
`;

const Link = styled.a`
    color: #14a800;
    text-decoration: underline;
    cursor: pointer;
`;

const SubmitButton = styled.button`
    width: 60%;
    padding: 14px;
    background: #14a800;
    color: white;
    border: none;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin: 20px auto 16px;
    display: block;

    &:hover {
        background: #118a00;
    }
`;

const BottomText = styled.p`
    text-align: center;
    font-size: 14px;
    color: #1d1d1d;
`;

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container>
            <FormContainer>
                <Title>Sign up to find work you love</Title>

                <Row>
                    <FieldGroup>
                        <Label>First name</Label>
                        <Input type="text" />
                    </FieldGroup>
                    <FieldGroup>
                        <Label>Last name</Label>
                        <Input type="text" />
                    </FieldGroup>
                </Row>

                <FieldGroup>
                    <Label>Email</Label>
                    <Input type="email" />
                </FieldGroup>

                <FieldGroup>
                    <Label>Password</Label>
                    <PasswordWrapper>
                        <Input
                            type={showPassword ? 'texts' : 'password'}
                            placeholder="Password (8 or more characters)"
                        />
                        <EyeButton
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? '👁' : '👁‍🗨'}
                        </EyeButton>
                    </PasswordWrapper>
                </FieldGroup>

                <FieldGroup>
                    <Label>Country</Label>
                    <Select>
                        <option>Azerbaijan</option>
                        <option>Turkey</option>
                        <option>United States</option>
                        <option>Germany</option>
                        <option>United Kingdom</option>
                    </Select>
                </FieldGroup>

                <CheckboxRow>
                    <Checkbox type="checkbox" defaultChecked />
                    <span>Send me helpful emails to find rewarding work and job leads.</span>
                </CheckboxRow>

                <CheckboxRow>
                    <Checkbox type="checkbox" />
                    <span>
                        Yes, I understand and agree to the <Link href="#">Upwork Terms of Service</Link>, including the <Link href="#">User Agreement</Link> and <Link href="#">Privacy Policy</Link>.
                    </span>
                </CheckboxRow>

                <SubmitButton>Create my account</SubmitButton>

                <BottomText>
                    Already have an account? <Link href="#">Log In</Link>
                </BottomText>
            </FormContainer>
        </Container>
    );
};

export default SignUp