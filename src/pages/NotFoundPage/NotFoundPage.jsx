import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <p>
      Sorry, page is not found! Please back to <Link to="/">home page</Link>!
    </p>
  );
}
