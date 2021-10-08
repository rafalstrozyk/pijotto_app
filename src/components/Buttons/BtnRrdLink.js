import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function BtnRrdLink({ children, link, functionOnClick, ...rest }) {
  const history = useHistory();
  function handleClick() {
    history.push(link);
    functionOnClick();
  }
  return (
    <Button data-testid="btn" {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
}

BtnRrdLink.propTypes = {
  link: PropTypes.string,
  children: PropTypes.any,
  functionOnClick: PropTypes.func,
  rest: PropTypes.any,
};

BtnRrdLink.defaultProps = {
  link: '/',
  functionOnClick: () => {
    return;
  },
};
export default BtnRrdLink;
