import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function ButtonLinkRouterDom({ link, children, ...rest }) {
  const history = useHistory();
  function handleClick() {
    history.push(link);
  }

  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
}
