import { FC } from 'react';
import styled from 'styled-components';
import { useLayoutStore } from '../../stores/layoutStore';

const Container = styled.div`
  bottom: 20px;
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
  z-index: 9999;
`;

const ToastWrapper = styled.div<{ $isError: boolean }>`
  align-items: center;
  color: white;
  display: flex;
  background-color: ${({ $isError, theme }) =>
    $isError ? 'rgba(199, 0, 0, 0.83)' : theme.highlight};
  padding: 10px 10px 10px 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

const Toast: FC = () => {
  const { closeToast, toast } = useLayoutStore();
  const { isError, message, visible } = toast;
  if (!visible || !message) return null;

  return (
    <Container role="alert">
      <ToastWrapper $isError={isError}>
        <span>{message}</span>
        {closeToast && (
          <CloseButton aria-label="Close" onClick={() => closeToast()}>
            ×
          </CloseButton>
        )}
      </ToastWrapper>
    </Container>
  );
};

export default Toast;
