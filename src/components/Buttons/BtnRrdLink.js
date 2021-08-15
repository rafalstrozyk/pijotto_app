import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function BtnRrdLink({
  children,
  link,
  functionOnClick,
  ...rest
}) {
  const history = useHistory();
  function handleClick() {
    history.push(link);
    functionOnClick();
  }
  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
}
