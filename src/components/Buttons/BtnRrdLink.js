import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function BtnRrdLink({ children, link }) {
  return (
    <Button color="primary" component={Link} to={link}>
      {children}
    </Button>
  );
}
