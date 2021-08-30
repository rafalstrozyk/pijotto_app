
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import  Button  from '@material-ui/core/Button';

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

ButtonLinkRouterDom.propTypes = {
  link: PropTypes.string,
  children: PropTypes.any,
  rest: PropTypes.any
}
