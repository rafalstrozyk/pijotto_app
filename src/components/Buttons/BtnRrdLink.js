import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function BtnRrdLink({ children, link }) {
  return (
    <Button
      size="small"
      variant="contained"
      color="secondary"
      component={Link}
      to={link}
    >
      {children}
    </Button>
  );
}
