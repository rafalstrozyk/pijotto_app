import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function ButtonLinkRouterDom({ children, link, ...rest }) {
  const history = useHistory();
  function handleClick() {
    history.push(link);
  }

  return (
    <Button data-testid="btn" {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
}

ButtonLinkRouterDom.propTypes = {
  link: PropTypes.string,
  children: PropTypes.any,
  rest: PropTypes.any,
};

ButtonLinkRouterDom.defaultProps = {
  link: '/',
};

export default ButtonLinkRouterDom;
